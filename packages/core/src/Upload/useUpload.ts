import { uniqBy } from 'lodash';
import { useCallback, useReducer } from 'react';
import { DropEvent, useDropzone } from 'react-dropzone';

import { multiRun } from '@muya-ui/utils';

import { IUploadAction, IUploadFile, IUploadOptions, IUploadState } from './types';
import getUid from './uid';

export default function useUpload(props: IUploadOptions): IUploadState {
  const {
    request,
    beforeUpload,
    beforeUploadAll,
    limit = 10,
    onDrop,
    uploadFiles: uploadFilesProp,
    onChange,
    ...dropzoneProps
  } = props;
  const isControlled = 'uploadFiles' in props;
  const [innerUploadFiles, dispatch] = useReducer(reducer, []);

  const uploadFiles = uploadFilesProp && isControlled ? uploadFilesProp : innerUploadFiles;

  function reducer(state: IUploadFile[], action: IUploadAction): IUploadFile[] {
    const { type, data } = action;
    const prevUploadFiles = uploadFilesProp && isControlled ? uploadFilesProp : state;
    switch (type) {
      case 'create': {
        const newUploadFiles = uniqBy([...prevUploadFiles, data], 'uid');
        onChange && onChange(newUploadFiles);
        return newUploadFiles;
      }
      case 'update': {
        const newUploadFiles = prevUploadFiles.map(file => {
          if (file.uid === data.uid) {
            return {
              ...file,
              ...data,
            };
          }
          return file;
        });
        onChange && onChange(newUploadFiles);
        return newUploadFiles;
      }
      case 'delete': {
        const newUploadFiles = prevUploadFiles.filter(f => f.uid !== data.uid);
        onChange && onChange(newUploadFiles);
        data.abort && data.abort();
        return newUploadFiles;
      }
      default:
        return state;
    }
  }

  const post = useCallback(
    async (file: File, existedUploadFile?: IUploadFile) => {
      let uploadFile: IUploadFile = existedUploadFile
        ? // 已存在的UploadFile重新上传时，将状态重置
          { ...existedUploadFile, status: 'uploading', percent: 0, error: null, body: null }
        : // 上传新的文件，新建全新的UploadFile
          {
            uid: getUid(),
            percent: 0,
            status: 'uploading',
            originFile: file,
            filename: file.name,
          };

      // 上传前的操作
      if (beforeUpload) {
        const res = await beforeUpload(uploadFile);
        if (typeof res !== 'boolean') {
          uploadFile = res; // 使用修改过的uploadFile
        } else if (res === false) {
          return; // 返回false阻止上传行为
        }
      }

      dispatch({
        type: existedUploadFile ? 'update' : 'create',
        data: uploadFile,
      });

      return new Promise((resolve, reject) => {
        const { abort } = request({
          file,

          onProgress(e) {
            const { total, loaded } = e;
            let percent = 0;
            if (total > 0) {
              percent = (loaded / total) * 100;
              percent = parseFloat(percent.toFixed(1));
            }
            dispatch({
              type: 'update',
              data: {
                ...uploadFile,
                total,
                loaded,
                percent,
                abort,
                status: 'uploading',
              },
            });
          },

          onError(e) {
            dispatch({
              type: 'update',
              data: {
                ...uploadFile,
                abort,
                error: e,
                status: 'error',
              },
            });
            reject(e);
          },

          onSuccess(body) {
            dispatch({
              type: 'update',
              data: {
                ...uploadFile,
                percent: 100,
                body,
                abort,
                status: 'success',
              },
            });
            resolve(body);
          },
        });
        dispatch({
          type: 'update',
          data: {
            ...uploadFile,
            abort,
          },
        });
      });
    },
    [beforeUpload, request],
  );

  const dropzoneState = useDropzone({
    onDrop: useCallback<(acceptedFiles: File[], rejectedFiles: File[], e: DropEvent) => void>(
      (acceptedFiles, rejectedFiles, e) => {
        let files = [...acceptedFiles];
        if (onDrop) {
          onDrop(acceptedFiles, rejectedFiles, e);
        }
        if (beforeUploadAll) {
          const res = beforeUploadAll(files, uploadFiles);
          if (typeof res !== 'boolean') {
            files = res; // 使用返回的files
          } else if (res === false) {
            return; // 返回false阻止上传行为
          }
        }
        multiRun(files, post, limit);
      },
      [beforeUploadAll, limit, onDrop, post, uploadFiles],
    ),
    ...dropzoneProps,
  });

  const { getRootProps, isDragActive } = dropzoneState;

  return {
    ...dropzoneState,
    manualUpload(files: File[]) {
      return multiRun(files, post, limit);
    },
    uploadFiles,
    dispatchUploadAction: dispatch,
    getRootProps: useCallback(
      (...rest) => getRootProps({ isDragActive, disabled: dropzoneProps.disabled, ...rest }),
      [isDragActive, getRootProps, dropzoneProps],
    ),
    getResultProps: props => ({
      onRemove: () => {
        props.file.abort && props.file.abort();
        dispatch({ type: 'delete', data: props.file });
      },
      onRetry: () => {
        props.file.originFile && post(props.file.originFile, props.file);
      },
      filename:
        props.file.filename || (props.file.originFile ? props.file.originFile.name : undefined),
      ...props,
    }),
  };
}
