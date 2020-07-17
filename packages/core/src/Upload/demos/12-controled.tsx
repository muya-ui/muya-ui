import React, { useState } from 'react';
import { Upload, postFile, Button, UploadResult, IUploadFile } from '@muya-ui/core';

export default function Controled() {
  const [uploadFiles, setFiles] = useState<IUploadFile[]>([
    {
      uid: '1',
      status: 'success',
      filename: '从后端拿的图片',
      body: {
        url:
          '//qhstaticssl.kujiale.com/newt/29/image/jpeg/1577687050426/B7FFC6EA5CDC5690C971EF4E20F229DF.jpg',
      },
    },
  ]);
  const handleChange = (files: IUploadFile[]) => {
    console.log(files);
    setFiles(files);
  };
  return (
    <Upload
      request={option =>
        postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
      }
      uploadFiles={uploadFiles}
      onChange={handleChange}
    >
      {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
        return (
          <div>
            <input {...getInputProps()} />
            <Button {...getRootProps()} type="primary">
              点击上传
            </Button>
            <div>
              {uploadFiles.map(file => (
                <UploadResult
                  {...getResultProps({ file })}
                  previewFile={() => file.body && file.body.url}
                  style={{ marginTop: '10px' }}
                  key={file.uid}
                />
              ))}
            </div>
          </div>
        );
      }}
    </Upload>
  );
}

export const meta = {
  title: '受控模式',
  desc: '传入`uploadFiles`和`onChange`事件，即可将组件变为完全受控模式',
};
