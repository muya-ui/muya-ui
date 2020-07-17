import { createGlobalStyle } from 'styled-components';

export const DocDropdownStyle = createGlobalStyle`
  .doc-button-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .doc-button-container > [class*='Button'] {
    transition: all .3s;
    margin-bottom: 12px;
  }
  .doc-button-container > [class*='StyledDropdownButtonGroup'] {
    transition: all .3s;
    margin-right: 12px;
  }
  .doc-button-row [class*='Button'] {
    margin-bottom: 12px;
  }
`;
