import { createGlobalStyle } from 'styled-components';

export const DocAlertStyle = createGlobalStyle`
  .doc-alert-container {
    .item {
      display: flex;
      margin-bottom: 20px;

      .title {
        width: 150px;
      }

      .alert-wp {
        flex: 1;
      }

      .alert {
        flex: 1;
        width: 100%;

        & + .alert {
          margin-top: 10px;
        }
      }
    }
  }
`;
