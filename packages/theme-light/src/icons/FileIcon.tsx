import React from 'react';
import { SvgIcon, ISvgProps } from '../components/SvgIcon';

const FileIcon = React.forwardRef<SVGSVGElement, ISvgProps>((props, ref) => (
  <SvgIcon ref={ref} viewBox="0 0 1024 1024" {...props}>
    <path d="M21.333 42.667h376.384a21.333 21.333 0 0113.515 4.821l222.87 182.357a21.333 21.333 0 0013.514 4.822h355.05A21.333 21.333 0 011024 256v704a21.333 21.333 0 01-21.333 21.333H21.333A21.333 21.333 0 010 960V64a21.333 21.333 0 0121.333-21.333z" />
  </SvgIcon>
));

export default FileIcon;

export { FileIcon };
