import { Placement } from 'popper.js';

export default function(placement: Placement) {
  if (placement.indexOf('left') > -1) return 'right';
  if (placement.indexOf('right') > -1) return 'left';
  if (placement.indexOf('bottom') > -1) return 'up';
  if (placement.indexOf('top') > -1) return 'down';
  return 'up';
}
