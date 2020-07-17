import { IUploadPostFileProps } from './types';

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

const post = (props: IUploadPostFileProps) => {
  const xhr = new XMLHttpRequest();

  if (xhr.upload) {
    const { onProgress } = props;
    xhr.upload.onprogress = onProgress;
  }

  const formData = new FormData();

  if (props.data) {
    const { data } = props;
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
  }

  formData.append(props.filename || props.file.name, props.file);
  xhr.onerror = function onerror(e) {
    props.onError(e);
  };

  xhr.onload = function onload(e) {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return props.onError && props.onError(e);
    }

    props.onSuccess(getBody(xhr));
  };

  xhr.open('post', props.action, true);

  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
  if (props.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = props.headers || {};

  // when set headers['X-Requested-With'] = null , can close default XHR header
  // see https://github.com/react-component/upload/issues/33
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
};

export default post;
