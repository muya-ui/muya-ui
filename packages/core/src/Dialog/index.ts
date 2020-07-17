import Actions from './Actions';
import Alert, { alert, config, error, info, success, warning } from './Alert';
import Base from './Base';
import Content from './Content';
import Title from './Title';

export const Dialog = {
  Base,
  Title,
  Content,
  Actions,
  Alert,
  alert,
  config,
  success,
  info,
  warning,
  error,
};

export default Dialog;
export * from './types';
