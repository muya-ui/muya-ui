import { css } from 'styled-components';

import { IItemInteractionStatus, IItemStatus } from '@muya-ui/theme-light';

export interface IItemMixinToken {
  background: Record<IItemInteractionStatus, string>;
  color: Record<IItemInteractionStatus, string>;
  fontWeight: Record<IItemStatus, number>;
}

export function itemNormalStyle(token: IItemMixinToken) {
  return css`
    color: ${token.color.normal};
    background-color: ${token.background.normal};
    font-weight: ${token.fontWeight.normal};
    &:hover {
      color: ${token.color.hover};
      background-color: ${token.background.hover};
    }
    &:active {
      color: ${token.color.clicked};
      background-color: ${token.background.clicked};
    }
  `;
}

export function itemSelectedStyle(token: IItemMixinToken) {
  return css`
    color: ${token.color.selected};
    background-color: ${token.background.selected};
    font-weight: ${token.fontWeight.selected};
    &:hover {
      color: ${token.color.selectedHover};
      background-color: ${token.background.selectedHover};
    }
    &:active {
      color: ${token.color.selectedClicked};
      background-color: ${token.background.selectedClicked};
    }
  `;
}

export function itemDisabledStyle(token: IItemMixinToken) {
  return css`
    color: ${token.color.disabled};
    background-color: ${token.background.disabled};
    font-weight: ${token.fontWeight.disabled};
    cursor: not-allowed;
    user-select: none;
    &:hover {
      color: ${token.color.disabled};
      background-color: ${token.background.disabled};
    }
    &:active {
      color: ${token.color.disabled};
      background-color: ${token.background.disabled};
    }
  `;
}
