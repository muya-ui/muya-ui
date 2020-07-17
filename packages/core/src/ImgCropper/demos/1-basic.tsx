import React from 'react';
import styled from 'styled-components';

import {
  Button,
  IImgCropperElement,
  ImgCropper,
  postFile,
  Typography,
  useUpload,
} from '@muya-ui/core';

const Container = styled.div`
  display: flex;
`;

const Row = styled.div`
  margin-top: 10px;
`;

const Preview = styled.div`
  padding-left: 20px;
`;

const imgSrc =
  '//qhyxpicoss.kujiale.com/dev/2019/10/16/L3D186S21ENDIC4WSRVSGQKPMLUF3P3WO888_1920x1080.jpg';

export default function BasicDemo() {
  const [cropImg, setCropImg] = React.useState('');
  const [currentImg, setImg] = React.useState(imgSrc);
  const cropRef = React.useRef<IImgCropperElement>(null);
  const { getInputProps, getRootProps, manualUpload } = useUpload({
    beforeUploadAll(files: File[]) {
      if (files.length) {
        const url = window.URL.createObjectURL(files[0]);
        setImg(url);
      }
      return false;
    },
    request: option =>
      postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' }),
  });
  return (
    <div>
      <Container>
        <ImgCropper src={currentImg} ref={cropRef} />
        {cropImg && (
          <Preview>
            <Typography.Title>生成的图片</Typography.Title>
            <img src={cropImg} />
          </Preview>
        )}
      </Container>
      <Row>
        <Button {...getRootProps()}>
          <input {...getInputProps()} />
          重新上传
        </Button>
        <Button
          onClick={() => {
            // 可以按比例放大你要的图，默认是 1倍
            const radio = 1;
            cropRef.current!.getImg(radio)!.toBlob(blob => {
              const url = window.URL.createObjectURL(blob);
              setCropImg(url);
              // 并手动触发 Upload 的上传逻辑
              manualUpload([blob as File]);
            });
          }}
        >
          生成剪裁图片
        </Button>
      </Row>
    </div>
  );
}

export const meta = {
  title: '基础使用方法',
  desc: '图片剪裁',
};
