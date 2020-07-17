import { RefObject, useRef, useState } from 'react';

import { useAfterEffect, useEffectOnce } from '@muya-ui/utils';

import forkHandler from '../utils/forkHandler';
import { INotificationListProps } from './types';

type IProps = Pick<
  INotificationListProps,
  'onMouseEnter' | 'onMouseLeave' | 'fullScreen' | 'position' | 'expireQueue' | 'hoverStop'
>;
export default function useNotificationList(
  props: IProps,
  containerRef: RefObject<HTMLDivElement>,
) {
  const { onMouseEnter, onMouseLeave, position, expireQueue, hoverStop, fullScreen } = props;
  const poolTimeout = expireQueue.setting.timeout;
  const [items, setItems] = useState(expireQueue.items);
  const update = () => {
    const { items: newItems } = expireQueue;
    setItems(newItems);
    if (newItems.length) {
      expireQueue.tick();
    }
  };

  useEffectOnce(() => {
    expireQueue.on('update', update);
    update();
    return () => {
      expireQueue.removeListener('update', update);
    };
  });

  const lastMax = useRef(expireQueue.setting.max);
  useAfterEffect(() => {
    if (containerRef.current && fullScreen) {
      const { top, bottom } = containerRef.current.getBoundingClientRect();
      if (top < 0 || bottom > window.innerHeight) {
        if (position.includes('top')) {
          expireQueue.shift();
        } else {
          expireQueue.pop();
        }
        lastMax.current = expireQueue.setting.max;
        expireQueue.reset({ max: expireQueue.length });
      } else {
        expireQueue.reset({ max: lastMax.current });
      }
    }
  }, poolTimeout);

  const handleMouseEnter = forkHandler(() => {
    if (hoverStop) {
      expireQueue.stop();
    }
  }, onMouseEnter);
  const handleMouseLeave = forkHandler(() => {
    if (hoverStop) {
      expireQueue.tick();
    }
  }, onMouseLeave);
  return { items, handleMouseEnter, handleMouseLeave, setItems };
}
