import { useEventCallback, useForkRef, useMountedRef } from '@muya-ui/utils';

import { EventEmitter } from 'events';

import { isBoolean } from 'lodash';

import PopperJS from 'popper.js';

import React, {
  ComponentType,
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import ReactDOM from 'react-dom';

import Animation from '../Animation';
import Popper from '../Popper';
import { IReactElementWithRef } from '../types';
import getSlideDirection from '../utils/getSlideDirection';
import memoForwardRef from '../utils/memoForwardRef';
import { StyledArrow } from '../styled/components/Arrow';

import {
  defaultArrowMargin,
  defaultArrowWidth,
  IMainPlacements,
  ISubPlacements,
  StyledTriggerWrapper,
} from './styled';
import { ITriggerAction, ITriggerProps } from './types';

const ctx = new EventEmitter();

ctx.setMaxListeners(30);

document.addEventListener('click', e => {
  ctx.emit('click_away', e);
});

const Trigger = memoForwardRef<HTMLDivElement, ITriggerProps>((props, ref) => {
  const {
    triggerId,
    children,
    triggerActions,
    triggerAction,
    enterDelay = 0,
    leaveDelay = 0,
    onVisibleChange,
    onClickAway,
    open: openProp = false,
    defaultOpen = false,
    outsideCloseable = true,
    placement = 'bottom',
    popperProps = {},
    TransitionComponent = Animation.Slide as ComponentType<any>,
    transitionProps,
    container,
    popup,
    offset,
    hideArrow = false,
    arrowStyle = {},
    onEscapeKeyDown,
    popperNodeRef,
    escapeKeyCloseable = true,
    arrowPointAtCenter = false,
    flip = true,
    ...rest
  } = props;

  const [childIsFocusVisible, setChildIsFocusVisible] = useState(false);
  const [openState, setOpenState] = useState(defaultOpen);
  const [childNode, setChildNode] = useState<any>();
  const [realPlacement, setRealPlacement] = useState(placement);
  const [direction, setDirection] = useState(getSlideDirection(placement));
  const enterTimer = useRef<number>();
  const leaveTimer = useRef<number>();
  const mountedRef = useMountedRef();
  // 优先级：triggerActions > triggerAction > 默认值：['hover']
  const finalTriggerActions: ITriggerAction[] = useMemo(() => {
    if (triggerActions) {
      return triggerActions;
    } else if (triggerAction) {
      return [triggerAction];
    }
    return ['hover'];
  }, [triggerAction, triggerActions]);

  // 处理子节点的ref
  const handleOwnRef = React.useCallback(instance => {
    // eslint-disable-next-line react/no-find-dom-node
    setChildNode(ReactDOM.findDOMNode(instance));
  }, []);
  const handleChildrenRef = useForkRef(children.ref, handleOwnRef);
  const handleRef = useForkRef(handleChildrenRef, ref);

  // 处理popper弹出层节点的ref
  const popperRef = useRef<HTMLDivElement>(null);
  const handlePopperRef = useForkRef(popperRef, popperNodeRef);

  const other = rest as any; // other会全量透传给children，类型无法确定，因此为any
  const defaultId = useRef<string>();

  const isControlled = 'open' in props;
  const open = isControlled ? openProp : openState;

  const getContainer = useCallback(() => {
    if (typeof container === 'function') {
      return container(childNode);
    } else {
      return container;
    }
  }, [childNode, container]);

  const handleOpen = useCallback(() => {
    if (!isControlled) {
      setOpenState(true);
    }
    if (onVisibleChange && !open) {
      onVisibleChange(true);
    }
  }, [isControlled, onVisibleChange, open]);

  const handleClose = useEventCallback(() => {
    if (!isControlled) {
      setOpenState(false);
    }

    if (onVisibleChange && open) {
      onVisibleChange(false);
    }
  });

  const handleEnter = useEventCallback((e: React.SyntheticEvent) => {
    const childrenProps = children.props;

    if (e.type === 'mouseenter') {
      if (childrenProps.onMouseEnter) {
        childrenProps.onMouseEnter(e);
      }

      if (other.onMouseEnter) {
        other.onMouseEnter(e);
      }
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    e.persist();
    enterTimer.current = setTimeout(() => {
      handleOpen();
    }, enterDelay);
  }, []);

  const handleBlur = useEventCallback(() => {
    if (childIsFocusVisible) {
      setChildIsFocusVisible(false);
    }
  }, []);

  const handleFocus = useEventCallback((e: React.FocusEvent) => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    /* istanbul ignore if */
    if (!childNode) {
      setChildNode(e.currentTarget);
    }

    setChildIsFocusVisible(true);
    handleEnter(e);

    const childrenProps = children.props;
    if (childrenProps.onFocus) {
      childrenProps.onFocus(e);
    }
    if (other.onFocus) {
      other.onFocus(e);
    }
  }, []);

  const handleLeave = useEventCallback((e: React.SyntheticEvent) => {
    const childrenProps = children.props;

    if (e.type === 'blur') {
      if (childrenProps.onBlur) {
        childrenProps.onBlur(e);
      }

      if (other.onBlur) {
        other.onBlur(e);
      }
      handleBlur();
    }

    if (e.type === 'mouseleave') {
      if (childrenProps.onMouseLeave) {
        childrenProps.onMouseLeave(e);
      }

      if (other.onMouseLeave) {
        other.onMouseLeave(e);
      }
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    e.persist();
    leaveTimer.current = setTimeout(() => {
      handleClose();
    }, leaveDelay);
  }, []);

  const handleClick = useEventCallback((e: React.MouseEvent) => {
    const childrenProps = children.props;
    if (childrenProps.onClick) {
      childrenProps.onClick(e);
    }
    if (other.onClick) {
      other.onClick(e);
    }
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  }, []);

  const handleKeyDown = useEventCallback((event: KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();

    // 按下ESC键触发的回调
    if (event.key === 'Escape') {
      onEscapeKeyDown && onEscapeKeyDown(event);
      if (escapeKeyCloseable) {
        // childNode should blur
        childNode && childNode.blur();
        // hide trigger
        handleClose();
      }
    }

    if (children.props.onKeyDown) {
      children.props.onKeyDown(event);
    }
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }
  }, []);

  const onPopperCreate = useCallback(
    (data: PopperJS.Data) => {
      if (data.placement !== realPlacement) {
        setRealPlacement(data.placement);
        setDirection(getSlideDirection(data.placement));
      }
      if (popperProps.popperOptions && popperProps.popperOptions.onCreate) {
        popperProps.popperOptions.onCreate(data);
      }
    },
    [popperProps.popperOptions, realPlacement],
  );

  const handleClickAway = React.useCallback(
    event => {
      // Ignore events that have been `event.preventDefault()` marked.
      /* istanbul ignore if */
      if (event.defaultPrevented) {
        return;
      }

      // IE 11 support, which trigger the handleClickAway even after the unbind
      /* istanbul ignore if */
      if (!mountedRef.current) {
        return;
      }

      /* istanbul ignore if */
      if (!childNode) {
        return;
      }

      const doc = (childNode && childNode.ownerDocument) || document;

      if (
        doc.documentElement &&
        doc.documentElement.contains(event.target) &&
        !childNode.contains(event.target) && // 子节点不包含event.target
        !(popperRef.current && popperRef.current.contains(event.target)) // Popper节点不包含event.target
      ) {
        onClickAway && onClickAway(event);
        if (outsideCloseable) {
          handleClose();
        }
      }
    },
    [childNode, handleClose, mountedRef, onClickAway, outsideCloseable],
  );

  React.useEffect(() => {
    if (!defaultId.current) {
      defaultId.current = `muya-trigger-${Math.round(Math.random() * 1e5)}`;
    }
    if (finalTriggerActions.indexOf('click') > -1) {
      /**
       * FIXME: 原生的 addEventListener，在 rerender 时表现不正常，暂时用此写法
       */
      ctx.on('click_away', handleClickAway);
      // document.addEventListener('click', handleClickAway);

      return () => {
        ctx.removeListener('click_away', handleClickAway);
        // document.removeEventListener('click', handleClickAway);
      };
    }

    return () => {
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
    };
  }, [finalTriggerActions, handleClickAway]);

  const childrenProps = {
    'aria-describedby': open ? triggerId || defaultId.current : null,
    ...other,
    ...children.props,
  };

  const interactiveWrapperListeners: any = {};

  if (!other.disabled) {
    if (finalTriggerActions.indexOf('hover') > -1) {
      childrenProps.onMouseEnter = handleEnter;
      childrenProps.onMouseLeave = handleLeave;
      interactiveWrapperListeners.onMouseEnter = handleEnter;
      interactiveWrapperListeners.onMouseLeave = handleLeave;
    }

    if (finalTriggerActions.indexOf('focus') > -1) {
      childrenProps.onFocus = handleFocus;
      childrenProps.onBlur = handleLeave;
      childrenProps.onKeyDown = handleKeyDown;
      interactiveWrapperListeners.onFocus = childrenProps.onFocus;
      interactiveWrapperListeners.onBlur = childrenProps.onBlur;
    }

    if (finalTriggerActions.indexOf('click') > -1) {
      childrenProps.onClick = handleClick;
      childrenProps.onKeyDown = handleKeyDown;
    }
  }

  // Fix Tooltip won't hide at disabled button
  // mouse events don't trigger at disabled button in Chrome
  const getDisabledCompatibleChildren = (element: IReactElementWithRef) => {
    // Muya Button用span包裹会导致样式问题，直接使用span类型的Button即可
    if ((element.type as any).__MUYA_BUTTON && element.props.disabled) {
      return React.cloneElement(element, { ref: handleRef, component: 'span', ...childrenProps });
    }
    if (element.type === 'button' && element.props.disabled) {
      const displayStyle =
        element.props.style && element.props.style.display
          ? element.props.style.display
          : 'inline-block';
      const child = React.cloneElement(element, {
        style: {
          ...element.props.style,
          pointerEvents: 'none',
        },
      });
      const spanStyle: CSSProperties = {
        display: displayStyle,
        cursor: 'not-allowed',
      };
      return React.createElement(
        'span',
        {
          ref: handleRef,
          ...childrenProps,
          style: spanStyle,
          // children: child,
        },
        child,
      );
    }
    return React.cloneElement(element, { ref: handleRef, ...childrenProps });
  };

  // arrowPointAtCenter逻辑
  let offsetEnable = false;
  let flipSetting: PopperJS.Modifiers['flip'] = useMemo(() => {
    return isBoolean(flip) ? { enabled: flip } : flip;
  }, [flip]);
  let offsetValue = 0;
  const mainPlacement = placement.split('-')[0] as IMainPlacements;
  const subPlacement = placement.split('-')[1] as ISubPlacements;

  if (subPlacement && childNode) {
    const arrowMargin = arrowStyle.margin || defaultArrowMargin;
    const arrowWidth = arrowStyle.width || defaultArrowWidth;
    const { width, height } = childNode.getBoundingClientRect();
    const elementHalf =
      (mainPlacement === 'top' || mainPlacement === 'bottom' ? width : height) / 2;
    const arrowHalf = arrowWidth / 2;
    const rawOffsetValue = elementHalf - arrowHalf - arrowMargin; // 偏移量
    const autoCenter = rawOffsetValue <= 0; // 元素宽度过小时，箭头自动居中

    if (arrowPointAtCenter || autoCenter) {
      flipSetting.enabled = false; // Popper.js中若要开启offset，需要先关闭flip
      offsetEnable = true;
      offsetValue = subPlacement === 'start' ? rawOffsetValue : -rawOffsetValue;
    }
  }

  const modifiers = useMemo(() => {
    return {
      ...popperProps.modifiers,
      flip: flipSetting,
      offset: {
        enabled: offsetEnable,
        offset: offsetValue,
      },
    };
  }, [flipSetting, offsetEnable, offsetValue, popperProps.modifiers]);

  const popperOptions = useMemo(() => {
    return {
      ...popperProps.popperOptions,
      onCreate: onPopperCreate,
    };
  }, [onPopperCreate, popperProps.popperOptions]);

  return (
    <>
      {getDisabledCompatibleChildren(children)}
      <Popper
        ref={handlePopperRef}
        placement={placement}
        anchorEl={childNode}
        open={childNode ? open : false}
        id={childrenProps['aria-describedby']}
        container={getContainer}
        transition
        transitionProps={transitionProps}
        {...interactiveWrapperListeners}
        {...popperProps}
        modifiers={modifiers}
        popperOptions={popperOptions}
      >
        {({ transitionProps }) => (
          <TransitionComponent direction={direction} {...transitionProps}>
            <StyledTriggerWrapper
              placement={realPlacement}
              offset={offset}
              hideArrow={hideArrow}
              arrowStyle={arrowStyle}
            >
              {popup}
              {!hideArrow && <StyledArrow placement={realPlacement} arrowStyle={arrowStyle} />}
            </StyledTriggerWrapper>
          </TransitionComponent>
        )}
      </Popper>
    </>
  );
});

export default Trigger;
