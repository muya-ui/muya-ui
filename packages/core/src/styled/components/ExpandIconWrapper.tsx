import { cloneElement } from 'react';

import { IThemedBaseProps } from '../../types';
import withTheme from '../../utils/withTheme';

export interface IExpandIconProps extends IThemedBaseProps {
  width?: number;
  height?: number;
  color?: string;
  children: React.ReactElement;
}

const ExpandIconWrapper = (props: IExpandIconProps) => {
  const {
    children,
    theme: {
      size: {
        pattern: {
          expandIcon: { width, height },
        },
      },
      colors,
    },
  } = props;
  return cloneElement(children, {
    style: {
      width: props.width || width,
      height: props.height || height,
      color: props.color || colors.pattern.icon.normal,
    },
  });
};

export default withTheme(ExpandIconWrapper);
