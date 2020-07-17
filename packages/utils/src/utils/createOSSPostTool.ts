import { Omit } from '../types';

const CDN_HOST = '//qhstaticssl.kujiale.com';
interface IAjaxOption {
  method: string;
  url: string;
  json?: boolean;
}

export type IOSSPostToolStatus = 'ok' | 'fail';
// oss授权数据结构
export interface IOSSPostToolSTS {
  /** OSS STS 详见：[阿里云OSS PostObject](https://help.aliyun.com/document_detail/31988.html) */
  accessKeyId: string;
  /** OSS STS 详见：[阿里云OSS PostObject](https://help.aliyun.com/document_detail/31988.html) */
  securityToken: string;
  /** OSS STS 详见：[阿里云OSS PostObject](https://help.aliyun.com/document_detail/31988.html) */
  expiration: string;
  /** OSS STS 详见：[阿里云OSS PostObject](https://help.aliyun.com/document_detail/31988.html) */
  signature: string;
  /** OSS STS 详见：[阿里云OSS PostObject](https://help.aliyun.com/document_detail/31988.html) */
  key: string;
  /** OSS STS 详见：[阿里云OSS PostObject](https://help.aliyun.com/document_detail/31988.html) */
  policy: string;
  /** OSS STS 详见：[阿里云OSS PostObject](https://help.aliyun.com/document_detail/31988.html) */
  callback?: string;
}

export interface IOSSPostToolOption {
  /**
   * oss cdn域名
   *
   * @type {string}
   * @memberof IOSSPostToolOption
   */
  cdnHost: string;
  /**
   * 获取oss授权凭证的接口路径
   *
   * @type {string}
   * @memberof IOSSPostToolOption
   */
  apiSTS: string;
  /**
   * 文件存放的oss域名
   *
   * @type {string}
   * @memberof IOSSPostToolOption
   */
  apiOSSPost: string;
  /**
   * 文件前缀
   *
   * @type {string}
   * @memberof IOSSPostToolOption
   */
  ossPre: string;
}

export interface IOSSPostToolUploadToOSSParams {
  /** 参见 IOSSPostToolSTS */
  sts: IOSSPostToolSTS;
  /** 文件对象 */
  file: File;
  /** 文件唯一名称 */
  fileKey: string;
  /** 进度事件 */
  onProgress?(e: ProgressEvent): void;
  /** 获取 XMLHttpRequest */
  getRequest?(xhr: XMLHttpRequest): void;
}

export interface IOSSPostToolUploadParams
  extends Omit<IOSSPostToolUploadToOSSParams, 'sts' | 'fileKey'> {
  /** 唯一名称，注意如果要传的话，也利用 `getUniqueKey` 先获取一个唯一值   */
  key?: string;
  /** 是否要后缀 */
  ext?: string;
}

export interface IOSSPostToolResult {
  /** 上传的状态 */
  status: IOSSPostToolStatus;
  /** 返回的文件CDN地址 */
  url: string;
  /** 唯一Key的值 */
  key: string;
}

export interface IOSSPostTool {
  /** 获取STS */
  getSTS(): Promise<IOSSPostToolSTS>;
  /** 获取唯一值 */
  getUniqueKey(): Promise<string>;
  /** 上传到OSS */
  upload(args: IOSSPostToolUploadParams): Promise<IOSSPostToolResult>;
  /** 最终的上传，只有需要自己传特殊的STS的时候才需要用 */
  uploadToOSS(args: IOSSPostToolUploadToOSSParams): Promise<Pick<IOSSPostToolResult, 'status'>>;
}

let id = 0;

// 只是一个简单的发送，别简单拿来用！
// 必须保证是JSON返回的
function ajax({ method, url, json = false }: IAjaxOption) {
  return new Promise<any>(resolve => {
    const request = new XMLHttpRequest();
    request.open(method, url, true);
    if (json) {
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const resData = request.responseText ? JSON.parse(request.responseText) : {};
        resolve(resData);
      } else {
        resolve({ c: '-1' });
      }
    };
    request.onerror = () => {
      resolve({ c: '-1' });
    };
    if (json) {
      request.send(JSON.stringify(json));
    } else {
      request.send();
    }
  });
}

// 这个函数因为依赖于后端接口并且是必须登录的，过多Mock的单测限定没那么多的意义
// 所以请注意查看Demo中的集成测试
export function createOSSPostTool(opt?: Partial<IOSSPostToolOption>): IOSSPostTool {
  const priVar: IOSSPostToolOption = {
    cdnHost: CDN_HOST,
    apiSTS: '/api/college/aliyun/sts',
    apiOSSPost: '//qhstatic.oss-cn-hangzhou.aliyuncs.com',
    ossPre: 'siteassets',
    ...opt,
  };

  // 获取AliOSS临时凭证
  let stsCache: IOSSPostToolSTS;
  let stsExpiration: number;

  const tool: IOSSPostTool = {
    getSTS: () => {
      // eslint-disable-next-line
      return new Promise<IOSSPostToolSTS>(async (resolve, reject) => {
        // 缓存一下零时凭证
        if (Date.now() < stsExpiration && stsCache) {
          resolve(stsCache);
          return;
        }
        const { apiSTS } = priVar;
        const res = await ajax({ method: 'GET', url: apiSTS }).catch(() =>
          reject(new Error('get sts fail')),
        );
        const sts: IOSSPostToolSTS = res.d ? res.d : res;
        if (sts && sts.expiration) {
          stsExpiration = new Date(sts.expiration).getTime();
          stsCache = sts;
          resolve(stsCache);
        } else {
          reject(new Error('get sts not right'));
        }
      });
    },

    async getUniqueKey() {
      const { key } = await tool.getSTS();
      const { ossPre } = priVar;
      return `${ossPre}/${key}-${Date.now()}-${++id}`;
    },

    // 上传到OSS
    uploadToOSS({ sts, file, fileKey, onProgress, getRequest }) {
      const {
        accessKeyId,
        policy,
        signature,
        callback,
        // securityToken,
      } = sts;
      const formData = new FormData(); // eslint-disable-line
      formData.append('OSSAccessKeyId', accessKeyId);
      formData.append('policy', policy);
      formData.append('key', fileKey);
      formData.append('Signature', signature);
      formData.append('success_action_status', '201');
      if (callback) {
        formData.append('callback', callback);
      }
      formData.append('file', file);

      const { apiOSSPost } = priVar;
      return new Promise(resolve => {
        const request = new XMLHttpRequest();
        getRequest && getRequest(request);
        request.open('POST', apiOSSPost, true);
        request.onload = () => {
          if (request.status > 199 && request.status < 300) {
            resolve({ status: 'ok' });
          } else {
            resolve({ status: 'fail' });
          }
        };
        request.onerror = () => {
          resolve({ status: 'fail' });
        };
        request.onprogress = e => {
          onProgress && onProgress(e);
        };
        request.send(formData);
      });
    },
    async upload({ file, key, ext, onProgress, getRequest }) {
      const sts = await tool.getSTS();
      let localFileKey = key;
      if (!localFileKey) {
        localFileKey = await tool.getUniqueKey();
      }
      if (ext && file.name && file.name.indexOf('.') !== -1) {
        const names = file.name.split('.');
        const extName = names.pop() || '';
        if (/^[a-zA-Z]*$/.test(extName)) {
          localFileKey = `${localFileKey}.${extName}`;
        }
      }
      const { status } = await tool.uploadToOSS({
        sts,
        file,
        fileKey: localFileKey,
        onProgress,
        getRequest,
      });

      const { cdnHost } = priVar;
      return {
        status,
        url: `${cdnHost}/${localFileKey}`,
        key: localFileKey,
      };
    },
  };

  return tool;
}

export default createOSSPostTool;
