import { CloseIcon, muyaThemeLight } from '@muya-ui/theme-light';
import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';

import Actions from './Actions';
import { AlertActionButton, AlertActionInlineButton } from './AlertActionButton';
import Base from './Base';
import Content from './Content';
import { IDialogAlertProps, IDialogItem, IDialogAlertSugarProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';
import useLocale from '../Locale/useLocale';
import LocaleContext from '../Locale/LocaleContext';

const StyledActions = styled(Actions)`
  ${props => {
    return css`
      padding: ${props.theme.components.Dialog.actions.paddingForAlert};
    `;
  }}
`;

const StyledIconWrapper = styled(AlertActionInlineButton)`
  && {
    position: absolute;
    right: ${props => props.theme.components.Dialog.title.closeIconRight}px;
    top: ${props => props.theme.components.Dialog.title.closeIconTop}px;
    padding: 0;
  }
`;

const Alert = memoForwardRef<HTMLDivElement, IDialogAlertProps>((props, ref) => {
  const local = useLocale();
  const {
    confirmText = local['Modal.okText'],
    cancelText,
    confirmButtonType = 'primary',
    onConfirm,
    onCancel,
    title,
    text,
    icon,
    type = 'info',
    size = 's',
    open,
    styles,
    onClose,
    closeIcon,
    hideClose = true,
    tipAction,
    confirmButtonProps,
    cancelButtonProps,
    closeFn,
    ...other
  } = props;
  const theme = useTheme();
  const innerStyles = useStyles(
    'dialog-alert',
    {
      content: '',
      actions: '',
    },
    styles,
  );
  const confirmButton = confirmText ? (
    <AlertActionButton
      closeAlert={closeFn}
      type={confirmButtonType}
      actionFn={onConfirm}
      {...confirmButtonProps}
    >
      {confirmText}
    </AlertActionButton>
  ) : null;
  const cancelButton = cancelText ? (
    <AlertActionButton
      closeAlert={closeFn}
      type="secondary"
      plain
      actionFn={onCancel}
      {...cancelButtonProps}
    >
      {cancelText}
    </AlertActionButton>
  ) : null;
  const Close = theme.components.Dialog.title.closeIcon || CloseIcon;

  return (
    <Base ref={ref} open={open} size={size} {...other}>
      <Content
        {...innerStyles.content}
        type={type}
        title={title}
        text={text}
        icon={icon}
        size={size}
      />
      <StyledActions {...innerStyles.actions} theme={theme} tipAction={tipAction}>
        {cancelButton}
        {confirmButton}
      </StyledActions>
      {!hideClose && (
        <StyledIconWrapper
          closeAlert={closeFn}
          actionFn={onClose}
          size={size}
          theme={theme}
          type="weak"
          weakLevel={1}
        >
          {closeIcon || <Close />}
        </StyledIconWrapper>
      )}
    </Base>
  );
});

const dialogItemList: IDialogItem[] = [];

let defaultConfig: Partial<IDialogAlertSugarProps> = {
  theme: muyaThemeLight,
};

const alert = (config: Partial<IDialogAlertSugarProps>) => {
  const div = document.createElement('div');

  let mergedConfig = {
    ...defaultConfig,
    ...config,
  };

  let currentConfig = mergedConfig as IDialogAlertSugarProps;

  function render(props: IDialogAlertSugarProps) {
    const { theme: innerTheme, locale, ...other } = props;
    const children = (
      <ThemeProvider theme={innerTheme}>
        <Alert open closeFn={close} onExited={destroy} {...other} />
      </ThemeProvider>
    );
    if (locale) {
      ReactDOM.render(
        <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>,
        div,
      );
      return;
    }
    ReactDOM.render(children, div);
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      open: false,
    };
    render(currentConfig);
  }

  function open() {
    currentConfig = {
      ...currentConfig,
      open: true,
    };
    render(currentConfig);
  }

  function destroy() {
    return ReactDOM.unmountComponentAtNode(div);
  }

  function update(newConfig: Partial<IDialogAlertSugarProps>) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };
    render(currentConfig);
  }

  render(currentConfig);

  const item: IDialogItem = {
    update,
    close,
    open,
    destroy,
    getConfig: () => currentConfig,
  };

  dialogItemList.push(item);

  return item;
};

/**
 *
 * 修改配置
 * @param {Partial<IDialogAlertProps>} newConfig
 */
const config = (newConfig: Partial<IDialogAlertSugarProps>) => {
  // 首先修改默认配置，后续创建的实例都会使用新的默认配置
  defaultConfig = {
    ...defaultConfig,
    ...newConfig,
  };

  // 已经创建了的实例，也需要更新配置
  dialogItemList.forEach(item => item.update(newConfig));
};

const success = (props: Partial<IDialogAlertSugarProps>) => alert({ type: 'success', ...props });
const info = (props: Partial<IDialogAlertSugarProps>) => alert({ type: 'info', ...props });
const warning = (props: Partial<IDialogAlertSugarProps>) => alert({ type: 'warning', ...props });
const error = (props: Partial<IDialogAlertSugarProps>) => alert({ type: 'error', ...props });

export default Alert;
export { alert, config, success, info, warning, error };
