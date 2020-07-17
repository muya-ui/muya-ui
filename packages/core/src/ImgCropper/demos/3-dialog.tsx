import React from 'react';
import styled from 'styled-components';

import { useEventCallback } from '@muya-ui/utils';
import {
  Button,
  Dialog,
  IImgCropperElement,
  ImgCropper,
  postFile,
  useUpload,
  UploadResult,
} from '@muya-ui/core';

const Container = styled.div`
  display: flex;
`;

const Preview = styled.div`
  padding-top: 20px;
`;

export default function BasicDemo() {
  const [currentImg, setImg] = React.useState('');
  const [currentFilename, setCurrentFilename] = React.useState('');
  const [show, setShow] = React.useState(false);

  const cropRef = React.useRef<IImgCropperElement>(null);
  const { uploadFiles, getResultProps, getInputProps, getRootProps, manualUpload } = useUpload({
    beforeUploadAll(files: File[]) {
      if (files.length) {
        const currentFile = files[0];
        const url = window.URL.createObjectURL(currentFile);
        setImg(url);
        setCurrentFilename(currentFile.name);
        setShow(true);
      }
      return false;
    },
    request: option =>
      postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' }),
  });

  const handleClose = useEventCallback(() => {
    setShow(false);
  });
  const handleCrop = useEventCallback(() => {
    // 可以按比例放大你要的图，默认是 1倍
    const radio = 2;
    cropRef.current!.getImg(radio)!.toBlob(blob => {
      if (!blob) {
        console.log('no blob');
        return;
      }
      const newFile = new File([blob], currentFilename);
      // 并手动触发 Upload 的上传逻辑
      manualUpload([newFile]);
      setShow(false);
    });
  });
  return (
    <div>
      <Button {...getRootProps()} type="primary">
        <input {...getInputProps()} />
        上传头像
      </Button>
      <Container>
        {uploadFiles.map(file => (
          <UploadResult
            {...getResultProps({ file })}
            type="picture"
            style={{ marginTop: '10px' }}
            key={file.uid}
          />
        ))}
      </Container>

      <Dialog.Base open={show} onClose={handleClose} disableSize>
        <Dialog.Title onClose={handleClose}>头像上传</Dialog.Title>
        <Dialog.Content>
          <ImgCropper shape="round" size={[200, 200]} src={currentImg} ref={cropRef} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={handleCrop} type="primary">
            保存
          </Button>
        </Dialog.Actions>
      </Dialog.Base>
    </div>
  );
}

export const meta = {
  title: '头像上传案例',
  desc: '头像上传案例',
};
