import React, { useState, useCallback } from 'react';
import { IDialogAlertActionFn } from './types';
import Button, { InlineButton, IButtonProps, IInlineButtonProps } from '../Button';

interface IAlertActionButtonProps extends IButtonProps {
  actionFn?: IDialogAlertActionFn;
  closeAlert?: Function;
}

interface IAlertActionInlineButtonProps extends IInlineButtonProps {
  actionFn?: IDialogAlertActionFn;
  closeAlert?: Function;
}

const useActionButton = (props: IAlertActionButtonProps) => {
  const [loadingState, setLoading] = useState(false);
  const { actionFn, closeAlert, loading: loadingProp, onClick, ...other } = props;
  const loading = 'loading' in props ? loadingProp : loadingState;
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // 首先调用外部传入的onClick
      if (onClick) {
        onClick(e as any);
      }

      // 没有传入actionFn，关闭弹窗
      if (!actionFn) {
        closeAlert && closeAlert();
        return;
      }
      const res = actionFn(e);

      // 返回falsy不关闭
      if (!res) return;

      // Promise resolve后关闭
      if (res.then) {
        setLoading(true);
        res.then(
          (...args: any[]) => {
            setLoading(false);
            if (args[0] !== false) {
              closeAlert && closeAlert(...args);
            }
          },
          (e: Error) => {
            // Emit error when catch promise reject
            console.error(e);
            setLoading(false);
          },
        );
      } else {
        closeAlert && closeAlert(e);
      }
    },
    [actionFn, closeAlert, onClick],
  );

  return {
    ...other,
    onClick: handleClick,
    loading,
  };
};

const AlertActionButton = React.memo((props: IAlertActionButtonProps) => {
  const buttonProps = useActionButton(props);

  return <Button {...buttonProps} />;
});

const AlertActionInlineButton = React.memo((props: IAlertActionInlineButtonProps) => {
  const buttonProps = useActionButton(props);

  return <InlineButton {...buttonProps} />;
});

export { AlertActionButton, AlertActionInlineButton };
