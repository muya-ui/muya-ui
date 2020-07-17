import { createGlobalStyle } from 'styled-components';

export const DocButtonStyle = createGlobalStyle`
  .doc-button-container {
    display: flex;
    align-items: center;
  }
  .doc-button-container > [class*='Button'] {
    margin-bottom: 12px;
  }
  .doc-button-row [class*='Button'] {
    margin: 0 0 12px 0;
  }
`;
