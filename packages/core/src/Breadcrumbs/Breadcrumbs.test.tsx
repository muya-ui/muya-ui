import React from 'react';
import renderer from 'react-test-renderer';

import Breadcrumbs from './Breadcrumbs';

test('测试 Breadcrumbs 正常情况', () => {
  const tree = renderer
    .create(
      <>
        <Breadcrumbs
          items={[
            { label: 'ss', url: 'ss' },
            { label: 'ss', url: 'ss' },
            { label: 'ss', url: 'ss' },
          ]}
        />
        <Breadcrumbs
          headItem={{ label: 'sdf' }}
          items={[
            { label: 'ss', url: 'ss' },
            { label: 'ss', url: 'ss' },
            { label: 'ss', url: 'ss' },
          ]}
        />
        <Breadcrumbs
          separators={[
            '|',
            '>',
            '|',
            <span
              key="nn"
              style={{
                display: 'inline-flex',
                width: 13,
                justifyContent: 'center',
              }}
            >
              s
            </span>,
          ]}
        >
          <span>sss</span>
          <span>sss</span>
          <span>sss</span>
        </Breadcrumbs>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
