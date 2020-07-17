import dayjs from 'dayjs';
import React, { FC, ReactElement, ReactNode } from 'react';

import LocaleContext from './LocaleContext';
import Dialog from '../Dialog';

interface ILocaleProviderProps {
  children: ReactNode;
  locale: any;
}

export const LocaleProvider: FC<ILocaleProviderProps> = (
  props: ILocaleProviderProps,
): ReactElement<ILocaleProviderProps> => {
  const { children, locale } = props;
  dayjs.locale(locale.dayjsLocaleKey);
  Dialog.config({ locale });

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;
