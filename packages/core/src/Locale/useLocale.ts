import dayjs from 'dayjs';
import React from 'react';

import LocaleContext from './LocaleContext';
import defaultLocale from './resource/default';

dayjs.locale(defaultLocale.dayjsLocaleKey);

export function useLocale() {
  const localeObj = React.useContext(LocaleContext) || defaultLocale;
  let preset;
  if (dayjs.locale(preset!) !== localeObj.dayjsLocaleKey) {
    dayjs.locale(localeObj.dayjsLocaleKey);
  }

  return localeObj;
}

export default useLocale;
