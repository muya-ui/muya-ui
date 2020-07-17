import deepmerge from 'deepmerge';
import { EventEmitter } from 'events';

import {
  checkWebp,
  IImgSuffix,
  imgSuffix,
  IRectIntersectRect,
  multiRun,
  setRectIntersectContainer,
  wait,
} from '@muya-ui/utils';

import { IImgCheckFn, IImgOption, IImgPool, IImgPoolSettings, IPoolCheckEvent } from './types';

const kssPrefix = ['kss.ksyun.com', 'kssws.ks-cdn.com', '-ks3.kujiale.com'];
/**
 * 判断是否是金山云的地址
 * @param url 地址
 */
export function isKss(url: string) {
  let isKss = false;
  kssPrefix.forEach(prefix => {
    if (url.indexOf(prefix) !== -1) {
      isKss = true;
    }
  });
  return isKss;
}

/**
 * clean 图片后缀
 * @param src 图片原始地址
 * @param oss 阿里云 or 金山云
 */
export function cleanSrc(src: string, oss?: 'ali' | 'kss') {
  if (oss === 'kss') {
    return src.replace(/@base@tag.*$/, '');
  }
  return src.replace(/@.*$/, '').replace(/\?x-oss-process.*$/, '');
}

export function extractFromSrc(src: string, regStr: string) {
  const reg = new RegExp(regStr);
  let external = '';
  src.replace(reg, ($0: string) => {
    external = $0;
    return '';
  });
  return external;
}

export const defaultImgPoolSettings: IImgPoolSettings = {
  options: {
    wait: 'on',
    resize: 'off',
    clean: 'auto',
    lazy: 'on',
    oss: 'auto',
    suffix: 'on',
  },
  concurrent: 6,
  throttleTime: 80,
  suffixs: {
    resizeMode: 'fill',
    ratio: window.devicePixelRatio || 1,
  },
  // defaultImg:
  //   '//qhstaticssl.kujiale.com/newt/23/image/png/1565749312620/129F060E504FDCDAEE29088AB181D326.png',
  // defaultImgStyle: {
  //   backgroundRepeat: 'repeat',
  //   backgroundSize: '100px 100px',
  // },
  checkRegion: {
    top: -0.3,
    bottom: 0.3,
    left: -0.5,
    right: 0.5,
  },
  getImgSrc: (src: string, suffixs: IImgSuffix, options: IImgOption) => {
    if (options.suffix === 'off') {
      return src;
    }
    let ossType: 'kss' | 'ali';
    if (options.oss === 'auto') {
      ossType = isKss(src) ? 'kss' : 'ali';
    } else {
      ossType = options.oss!;
    }

    let innerSrc = src;
    if (options.clean !== 'off') {
      innerSrc = cleanSrc(src, ossType);
      if (options.clean !== 'auto' && options.clean) {
        let external = suffixs.external || '';
        external += extractFromSrc(src, options.clean);
        suffixs.external = external;
      }
    }
    const innerSuffix = imgSuffix(suffixs, ossType);
    return `${innerSrc}${innerSuffix}`;
  },
};

export default class ImgPool extends EventEmitter implements IImgPool {
  scrollCheckFns: Set<IImgCheckFn> = new Set();
  resizeCheckFns: Set<IImgCheckFn> = new Set();
  private _poolStatus: 'none' | 'ready' = 'none';
  private _lastCheckTime: number = -1;
  private _isChecking = false;
  private _lastEventTimer: number = -1;
  private _name: string;
  private _settings: IImgPoolSettings = defaultImgPoolSettings;

  constructor(name?: string) {
    super();
    this._name = name || 'default';
    this.setMaxListeners(30);
  }

  async throttleCheck(e: IPoolCheckEvent) {
    // 正在执行也不继续
    if (this._isChecking) {
      return;
    }
    this._isChecking = true;
    const { throttleTime } = this._settings;

    // 第一次触发的时候，delay 一次
    if (this._lastCheckTime < 0) {
      this._lastCheckTime = Date.now();
      await wait.time(throttleTime!);
    }

    const now = Date.now();
    // 如果具体上传检查结束还不到 100 ms 也不执行检查
    if (now - this._lastCheckTime < throttleTime!) {
      this._isChecking = false;
      return;
    }

    await this.check(e).catch(() => {});
    this._isChecking = false;
    this._lastCheckTime = Date.now();
  }

  debounceCheck(e: IPoolCheckEvent) {
    window.clearTimeout(this._lastEventTimer);
    this._lastEventTimer = window.setTimeout(() => {
      this.check(e).catch(() => {});
    }, this._settings.throttleTime);
  }

  async setup(settings?: Partial<IImgPoolSettings>) {
    if (settings) {
      const { getImgSrc, ...oldSettings } = this._settings;
      const { getImgSrc: newGetImgSrc, ...inputSettings } = settings;
      const newSettings: Partial<IImgPoolSettings> = deepmerge(oldSettings, inputSettings);
      newSettings.getImgSrc = newGetImgSrc || getImgSrc;
      this._settings = newSettings as IImgPoolSettings;
    }
    const scrollFn = () => {
      this.throttleCheck({ type: 'scroll' });
    };
    const resizeFn = () => {
      this._resetRectIntersect();
      this.throttleCheck({ type: 'resize' });
      this.debounceCheck({ type: 'resize' });
    };
    window.addEventListener('scroll', scrollFn, true);
    window.addEventListener('resize', resizeFn);
    this._destroyFn = () => {
      window.removeEventListener('scroll', scrollFn, true);
      window.removeEventListener('resize', resizeFn);
    };
    this._resetRectIntersect();
    if (this._settings.maxListeners) {
      this.setMaxListeners(this._settings.maxListeners);
    }

    const { suffixs } = this._settings;
    if (!suffixs.format && suffixs.webp === undefined) {
      suffixs.webp = await checkWebp();
    }
    this._poolStatus = 'ready';
    this.emit('pool_ready');
  }

  async check(e: IPoolCheckEvent) {
    await this.waitReady();
    if (e.type === 'resize') {
      await this._runFns(this.resizeCheckFns);
    } else {
      await this._runFns(this.scrollCheckFns);
    }
  }

  waitReady() {
    if (this._poolStatus !== 'ready') {
      return new Promise(resolve => {
        this.once('pool_ready', resolve);
      });
    }
    return Promise.resolve();
  }

  destroy() {
    this._poolStatus = 'none';
    this._destroyFn();
  }

  rectIntersect(el: HTMLElement) {
    const rect = this.getRect(el);
    const intersect = this._rectIntersect(rect);

    return { rect, intersect };
  }

  getSuffixs(suffixs: IImgSuffix, rect: Pick<ClientRect, 'width' | 'height'>) {
    const defaultSuffixs = this._settings.suffixs!;
    const result = {
      width: suffixs.width || rect.width || defaultSuffixs.width,
      height: suffixs.height || rect.height || defaultSuffixs.height,
      webp: suffixs.webp !== undefined ? suffixs.webp : defaultSuffixs.webp,
      format: suffixs.format || defaultSuffixs.format,
      resizeMode: suffixs.resizeMode || defaultSuffixs.resizeMode,
      ratio: suffixs.ratio || defaultSuffixs.ratio,
      blur: suffixs.blur || defaultSuffixs.blur,
      q: suffixs.q || defaultSuffixs.q,
      Q: suffixs.Q || defaultSuffixs.Q,
      external: suffixs.external || defaultSuffixs.external,
    };
    return result;
  }

  reset(settings?: Partial<IImgPoolSettings>) {
    this.destroy();
    return this.setup(settings);
  }

  getImgSrc(src: string, suffixs: IImgSuffix, options: IImgOption) {
    const { getImgSrc, options: poolOpts } = this.settings;
    const innerOpt = {
      clean: options.clean || poolOpts!.clean,
      oss: options.oss || poolOpts!.oss,
      suffix: options.suffix || poolOpts!.suffix,
    };

    return getImgSrc(src, suffixs, innerOpt);
  }

  getRect(el: HTMLElement): ClientRect {
    return el.getBoundingClientRect();
  }

  private _destroyFn = () => {};
  private async _runFns(fnSet: Set<IImgCheckFn>) {
    if (fnSet.size === 0) {
      return;
    }
    const fns = Array.from(fnSet.values());
    await multiRun(
      fns,
      async (fn: IImgCheckFn) => {
        await fn();
      },
      this._settings.concurrent,
    );
  }

  private _resetRectIntersect() {
    const { checkRegion } = this._settings;
    this._rectIntersect = setRectIntersectContainer(checkRegion, {
      width: window.innerWidth,
      height: window.innerHeight,
      top: 0,
      left: 0,
    });
  }

  private _rectIntersect: (rect: IRectIntersectRect) => boolean = () => false;

  get poolStatus() {
    return this._poolStatus;
  }

  get settings() {
    return this._settings;
  }

  get name() {
    return this._name;
  }
}
