import React, { Children, cloneElement, Ref, useCallback } from 'react';

import useTheme from '../utils/useTheme';
import { StyledStepsWrapper } from './styled';
import { IStepProps, IStepsProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';

export default memoForwardRef((props: IStepsProps, ref: Ref<HTMLDivElement>) => {
  const { onChange, current = 0, children, status: currentStatus, size = 'm', ...other } = props;
  const theme = useTheme();

  const onStepClick = useCallback(
    (next: number) => {
      if (onChange && current !== next) {
        onChange(next);
      }
    },
    [current, onChange],
  );

  return (
    <StyledStepsWrapper theme={theme} ref={ref} {...other}>
      {Children.map(children, (child, index) => {
        // 默认等待中
        let status: IStepProps['status'] = 'wait';

        if (index === current) {
          // 进行中
          status = currentStatus || 'process';
        }

        if (index < current) {
          // 已完成
          status = 'finish';
        }

        const childProps: IStepProps = {
          status,
          stepNumber: index,
          ...child.props,
          size,
          onStepClick: onChange && onStepClick,
        };

        return cloneElement(child, childProps);
      })}
    </StyledStepsWrapper>
  );
});
