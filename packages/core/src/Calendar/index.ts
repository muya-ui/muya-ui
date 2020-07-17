import * as calendarPanelUtils from './calendarPanelUtils';
import * as utils from './utils';

// @TODO 下一个大版本去掉
const calendarUtils = {
  ...utils,
  ...calendarPanelUtils,
};
export { calendarUtils };
export * from './types';
export { default } from './Calendar';
export { default as Calendar } from './Calendar';
export { default as RangeCalendar } from './RangeCalendar';
