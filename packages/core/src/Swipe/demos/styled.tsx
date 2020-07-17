import { createGlobalStyle } from 'styled-components';

export const DocSwipeStyle = createGlobalStyle`
  .doc-button-container {
    display: flex;
    align-items: center;
  }
  .doc-button-container > [class*='Button'] {
    transition: all .3s;
    margin-bottom: 12px;
  }
  .doc-button-row [class*='Button'] {
    margin-bottom: 12px;
  }
`;
