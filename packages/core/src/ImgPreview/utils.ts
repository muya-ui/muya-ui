import warning from 'warning';

export const getValidDefaultIndex = (index: number, size: number) => {
  if (size === 0) {
    return 0;
  }
  if (index < 0) {
    warning(false, '[ImgPreview]: defaultIndex must greater than or equal to 0');
    return 0;
  }
  if (index >= size) {
    warning(false, `[ImgPreview]: defaultIndex must Less than ${size}`);
    return index % size;
  }
  return index;
};

export const getContainerSize = (width: number, occupyHeight: number) => {
  return {
    width,
    height: window.innerHeight - occupyHeight,
  };
};
