import { mount } from 'enzyme';
import React from 'react';
import mockConsole from 'test/utils/mockConsole';
import { useLocale, LocaleProvider } from './index';
import zh_CN from './resource/zh_CN';

describe('LocaleProvider', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });

  test('should provide the locale with specified resource', () => {
    const ref: React.RefObject<HTMLSpanElement> = React.createRef();
    const text = () => ref.current!.textContent;
    function Test() {
      const locale = useLocale();
      return <span ref={ref}>{locale.locale}</span>;
    }

    mount(
      <LocaleProvider locale={{ locale: 'foo' }}>
        <Test />
      </LocaleProvider>,
    );
    expect(text()).toBe('foo');
  });

  test('should provide the locale with default zh_CN', () => {
    const ref: React.RefObject<HTMLSpanElement> = React.createRef();
    const text = () => ref.current!.textContent;
    function Test() {
      const locale = useLocale();

      return <span ref={ref}>{locale.locale}</span>;
    }

    mount(<Test />);
    expect(text()).toBe(zh_CN.locale);
  });

  test('should provide the closest locale with nested used', () => {
    const ref: React.RefObject<HTMLSpanElement> = React.createRef();
    const text = () => ref.current!.textContent;
    function Test() {
      const locale = useLocale();

      return <span ref={ref}>{locale.locale}</span>;
    }

    mount(
      <LocaleProvider locale={{ locale: 'foo' }}>
        <LocaleProvider locale={{ locale: 'bar' }}>
          <Test />
        </LocaleProvider>
      </LocaleProvider>,
    );
    expect(text()).toBe('bar');
  });
});
