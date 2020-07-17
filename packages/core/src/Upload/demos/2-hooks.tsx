import React from 'react';

import { UploadIcon } from '@muya-ui/theme-light';
import { postFile, Typography, UploadCard, UploadResult, useUpload } from '@muya-ui/core';

const { Text } = Typography;

export default function Hooks() {
  const { getInputProps, getRootProps, uploadFiles, getResultProps } = useUpload({
    request: option =>
      postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' }),
  });

  return (
    <div>
      <UploadCard
        {...getRootProps()}
        width={336}
        height={160}
        icon={<UploadIcon fontSize={24} />}
        title="将文件拖拽到此处，或点击上传"
        subtitle="支持balabala、balabala类型的文件"
      >
        <input {...getInputProps()} />
      </UploadCard>
      <div>
        {uploadFiles.map(file => (
          <UploadResult
            style={{ marginTop: '10px', width: '336px' }}
            {...getResultProps({ file })}
            key={file.uid}
          />
        ))}
      </div>
    </div>
  );
}

export const meta = {
  title: '提供`useUpload`hooks',
  desc: '`useUpload`的入参与`Upload`组件一致，使用hooks可以使代码更加简洁',
};
