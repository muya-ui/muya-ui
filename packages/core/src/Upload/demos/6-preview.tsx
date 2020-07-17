import React from 'react';
import { Upload, postFile, Button, UploadResult, Typography } from '@muya-ui/core';

export default function Preview() {
  return (
    <Upload
      request={option =>
        postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
      }
    >
      {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
        return (
          <div>
            <input {...getInputProps()} />
            <Typography.Paragraph>
              试着上传图片 and 非图片 文件，查看自定义预览图的逻辑
            </Typography.Paragraph>
            <Button {...getRootProps()} type="primary">
              点击上传
            </Button>
            <div>
              {uploadFiles.map(file => (
                <UploadResult
                  {...getResultProps({ file })}
                  previewFile={() => {
                    if (file.originFile && file.originFile.type.includes('image')) {
                      return ''; // UploadResult对图片文件会自定设置预览图，返回空字符串即可
                    }
                    return '//qhstaticssl.kujiale.com/newt/29/image/png/1567069346213/A8C6DECED7C868F1E57AC115EA1D5BAA.png';
                  }}
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
  title: '自定义上传结果预览图',
  desc: '上述例子中，如果是图片类型的文件，使用图片原图，对其他文件使用自定义的预览图',
};
