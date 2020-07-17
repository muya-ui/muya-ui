import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';

dayjs.extend(LocalizedFormat);

const LocaleContext = React.createContext(null);

export default LocaleContext;
