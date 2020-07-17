import { isNumber } from 'lodash';
import PopperJS from 'popper.js';
import React, { FunctionComponentElement, ReactElement } from 'react';

import addPx from '../utils/addPx';

export type ILoopCallback = (child: ReactElement, index: number) => void;

/**
 * 获取菜单节点的 eventKey
 */
export function getKeyFromChildrenIndex(
  child: ReactElement,
  parentEventKey: string | void,
  index: number,
) {
  const prefix = parentEventKey || '';
  if (child.key) {
    return `${child.key}`;
  }
  return `${prefix}_item_${index}`;
}

/**
 * 递归子节点寻找是否有子节点的 key 存在于 keys 数组中，用于计算子节点是否选中
 **/
export function loopMenuItemRecursively(
  children: ReactElement | ReactElement[],
  keys: string[],
  ret: { find: boolean },
) {
  if (!children || ret.find) {
    return;
  }
  React.Children.forEach(children, (child: ReactElement) => {
    if (child) {
      const construct = (child as FunctionComponentElement<any>).type;
      if (
        !construct ||
        !(
          construct.displayName === 'SubMenu' ||
          construct.displayName === 'MenuItem' ||
          construct.displayName === 'MenuItemGroup' ||
          construct.displayName === 'MenuDivider'
        )
      ) {
        return;
      }
      if (keys.indexOf(`${child.key}`) !== -1) {
        ret.find = true;
      } else if (child.props && child.props.children) {
        loopMenuItemRecursively(child.props.children, keys, ret);
      }
    }
  });
}

/**
 * 过滤掉外层包裹的 div、fragment 等非合法的菜单节点
 */
export function getValidChildElement(child: any): any {
  if (child) {
    const construct = (child as FunctionComponentElement<any>).type;
    if (
      !construct ||
      !(
        construct.displayName === 'SubMenu' ||
        construct.displayName === 'MenuItem' ||
        construct.displayName === 'MenuItemGroup' ||
        construct.displayName === 'MenuDivider'
      )
    ) {
      if (child.props && child.props.children) {
        return getValidChildElements(child.props.children);
      }
    }
    return child;
  }
}

/**
 * 从 children 中解析出合法的菜单节点
 */
export function getValidChildElements(children: any) {
  let result: ReactElement[] = [];
  React.Children.forEach(children, (child: ReactElement) => {
    const elements = getValidChildElement(child);
    if (Array.isArray(elements)) {
      result = result.concat(elements);
    } else if (elements) {
      result = result.concat([elements]);
    }
  });
  return result;
}

function setStyles(element: Element, styles: any) {
  Object.keys(styles).forEach(function(prop) {
    if (
      ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 &&
      isNumber(styles[prop])
    ) {
      // @ts-ignore
      element.style[prop] = addPx(styles[prop]);
    } else {
      // @ts-ignore
      element.style[prop] = styles[prop];
    }
  });
}

function setAttributes(element: Element, attributes: any) {
  Object.keys(attributes).forEach(function(prop) {
    let value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

export function applyStyle(data: PopperJS.Data) {
  const popperNode = data.instance.popper as HTMLElement;
  const refNode = data.instance.reference as HTMLElement;
  const subMenuNode = refNode.parentElement;
  if (subMenuNode) {
    const parentMenuNode = subMenuNode.parentElement;
    if (parentMenuNode) {
      const parentTop = parentMenuNode.scrollTop + parentMenuNode.offsetTop;
      const subMenuBottom =
        parentMenuNode.offsetHeight +
        parentMenuNode.scrollTop +
        parentMenuNode.offsetTop -
        subMenuNode.offsetTop;
      const popperHeight = popperNode.clientHeight - 8;
      const { left, top } = data.offsets.popper;
      // 上边界溢出
      if (subMenuNode.offsetTop < parentTop) {
        data.styles.transform = `translate3d(${left}px, ${top +
          parentTop -
          subMenuNode.offsetTop}px, 0)`;
        // 下边界溢出
      } else if (subMenuBottom < popperHeight) {
        data.styles.transform = `translate3d(${left}px, ${top -
          popperHeight +
          subMenuBottom}px, 0)`;
      }
    }
  }
  setStyles(data.instance.popper, data.styles);
  setAttributes(data.instance.popper, data.attributes);
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }
  return data;
}
