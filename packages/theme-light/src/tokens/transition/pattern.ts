import { duration, easing } from './spec';

const pattern = {
  easing: {
    enter: easing.easeOut,
    leave: easing.easeIn,
    status: easing.easeInOut,
  },
  duration: {
    popper: duration.normal,
    dialog: duration.slow,
    status: duration.fast,
  },
};

export default pattern;
