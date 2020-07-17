export type IImgFormatType = 'jpg' | 'png' | 'bmp' | 'gif' | 'webp' | 'tiff';

export interface IImgSuffixBlur {
  r: number;
  s: number;
}

export interface IImgSuffix {
  /**
   * 图片的宽度，如果是 'auto' 那么将会设为自动。P.S. 这里指图片后缀的设置
   * 比如，width={100} ，阿里云的后缀会处理成：?x-oss-process=image/resize,m_fill,w_100
   */
  width?: number | 'auto';
  /**
   * 图片的高度，如果是 'auto' 那么将会设为自动。P.S. 这里指图片后缀的设置
   * 比如，height={100} ，阿里云的后缀会处理成：?x-oss-process=image/resize,m_fill,h_100
   */
  height?: number | 'auto';
  /**
   * 是否使用 webp 格式的图片
   */
  webp?: boolean;
  /**
   * 设置图片文件格式
   */
  format?: IImgFormatType;
  /**
   * 设置图片缩放的格式
   */
  resizeMode?: 'lfit' | 'mfit' | 'fill';
  /**
   * 设置图片适配 设备像素比
   */
  ratio?: number;
  /**
   * 设置模糊
   */
  blur?: IImgSuffixBlur;
  /**
   * 图片相对质量
   */
  q?: number;
  /**
   * 图片绝对质量，金山云没有这个
   */
  Q?: number;
  /**
   * 额外的后缀
   */
  external?: string;
}

export function aliSuffixCore(config: any) {
  const actions = Object.keys(config);

  const actionArr = actions.map(actionName => {
    const actionConfig = config[actionName];
    const params = [];
    params.push(actionName);

    const subParamNames = Object.keys(actionConfig);
    subParamNames.forEach(paramName => {
      const v = actionConfig[paramName];
      if (v !== '') {
        params.push(`${paramName}_${v}`);
      } else {
        params.push(paramName);
      }
    });
    return params.join(',');
  });

  return actionArr.length ? `?x-oss-process=image/${actionArr.join('/')}` : '';
}

function getAliResize(c: IImgSuffix) {
  const resize: any = {};
  if (c.resizeMode) {
    resize.m = c.resizeMode;
  }

  if (resize && c.width !== 'auto' && c.width && c.ratio) {
    let finalW = Math.floor(c.width * c.ratio);
    finalW = Math.min(finalW, 4096);
    resize.w = finalW;
  }
  if (resize && c.height !== 'auto' && c.height && c.ratio) {
    let finalH = Math.floor(c.height * c.ratio);
    finalH = Math.min(finalH, 4096);
    resize.h = finalH;
  }
  return resize;
}

export function aliSuffix(c: IImgSuffix) {
  const config: any = {};
  if ((c.width !== 'auto' || c.height !== 'auto') && (c.width || c.height)) {
    config.resize = getAliResize(c);
  }
  if (c.format) {
    config.format = {};
    config.format[c.format] = '';
  } else if (c.webp) {
    config.format = { webp: '' };
  }

  if (c.Q) {
    config.quality = { Q: c.Q };
  } else if (c.q) {
    config.quality = { q: c.q };
  }

  if (c.blur) {
    config.blur = c.blur;
  }

  const suffix = aliSuffixCore(config);

  if (c.external && suffix !== '') {
    return `${suffix}${c.external}`;
  }
  if (c.external && suffix === '') {
    return `?x-oss-process=image/${c.external}`;
  }

  return suffix;
}

export function kssSuffix(c: IImgSuffix) {
  const suffixs = [];
  if ((c.width !== 'auto' || c.height !== 'auto') && (c.width || c.height)) {
    if (c.resizeMode === 'lfit') {
      suffixs.push('&m=0');
    } else if (c.resizeMode === 'mfit') {
      suffixs.push('&m=1');
    } else if (c.resizeMode === 'fill') {
      suffixs.push('&m=1&c=1');
    }
    if (c.width !== 'auto' && c.width && c.ratio) {
      let finalW = Math.floor(c.width * c.ratio);
      finalW = Math.min(finalW, 4096);
      suffixs.push(`&w=${finalW}`);
    }
    if (c.height !== 'auto' && c.height && c.ratio) {
      let finalH = Math.floor(c.height * c.ratio);
      finalH = Math.min(finalH, 4096);
      suffixs.push(`&h=${finalH}`);
    }
  }
  if (c.format) {
    suffixs.push(`&F=${c.format}`);
  } else if (c.webp) {
    suffixs.push('&F=webp');
  }

  if (c.q) {
    suffixs.push(`&q=${c.q}`);
  }

  if (c.external) {
    suffixs.push(c.external);
  }

  if (suffixs.length) {
    suffixs.unshift('@base@tag=imgScale');
  }

  return suffixs.join('');
}

/**
 * 处理图片后缀
 * @param c 图片后缀皮遏制
 * @param type ali or kss 阿里云、或者金山云
 */
export function imgSuffix(c: IImgSuffix, type?: 'ali' | 'kss') {
  if (type === 'kss') {
    return kssSuffix(c);
  }

  return aliSuffix(c);
}

export default imgSuffix;
