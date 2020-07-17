import { mount } from 'enzyme';
import React from 'react';
import mockConsole from 'test/utils/mockConsole';

import { muyaThemeLight } from '@muya-ui/theme-light';

import ThemeProvider from './ThemeProvider';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});

test('测试 ThemeProvider', () => {
  mount(<ThemeProvider theme={muyaThemeLight} />);
});
