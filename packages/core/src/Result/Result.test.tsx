import React from 'react';
import renderer from 'react-test-renderer';

import { IResultIconType, TimeIcon } from '@muya-ui/theme-light';
import { Button, Link } from '@muya-ui/core';

import Result from './Result';
import { IResultProps } from './types';

let id = 0;

const renderResult = ({
  title,
  subTitle,
  type,
  extra,
  reason,
  vertical,
  icon,
  iconSize,
}: IResultProps) => (
  <Result
    key={id++}
    title={title}
    subTitle={subTitle}
    type={type}
    extra={extra}
    reason={reason}
    vertical={vertical}
    icon={icon}
    iconSize={iconSize}
  />
);

const Buttons = (
  <>
    <Button plain={false}>次按钮</Button>
    <Button type="primary">主按钮</Button>
  </>
);

const Reason = (
  <>
    错误原因
    <Link
      href="/"
      style={{
        margin: '0 5px',
        textDecoration: 'none',
        color: '#1a7af8',
      }}
    >
      文字链
    </Link>
  </>
);

const customIcon = <TimeIcon fontSize={50} />;

describe('Result Component', () => {
  it('should Result Component mount success', () => {
    const wrapper = renderer
      .create(
        renderResult({
          title: '提示',
          subTitle: '提示文案',
          type: 'success',
          extra: Buttons,
          reason: Reason,
          iconSize: 100,
        }),
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render different type', () => {
    const wrapper = renderer
      .create(
        <>
          {['success', 'error', 'warning', 'info', 'forbidden', 'empty', 'emptySmall'].map(item =>
            renderResult({
              type: item as IResultIconType | IResultIconType,
            }),
          )}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render default text', () => {
    const wrapper = renderer
      .create(
        <>
          {['forbidden', 'empty', 'emptySmall'].map(item =>
            renderResult({
              type: item as IResultIconType | IResultIconType,
            }),
          )}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render different layout', () => {
    const wrapper = renderer
      .create(
        <>
          {renderResult({
            type: 'success',
            vertical: false,
            title: '提示',
            subTitle: '提示文案',
          })}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render custom icon', () => {
    const wrapper = renderer
      .create(
        <>
          {renderResult({
            icon: customIcon,
            iconSize: 100,
          })}
          {renderResult({
            icon:
              '//qhstaticssl.kujiale.com/newt/23/image/png/1565749312620/129F060E504FDCDAEE29088AB181D326.png',
            iconSize: 100,
          })}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
