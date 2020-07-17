import React from 'react';
import renderer from 'react-test-renderer';

import Fade from './Fade';

test('should render correctly', () => {
  const tree = renderer
    .create(
      <Fade in={true}>
        <img
          src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
          style={{
            width: '80%',
            height: '80%',
          }}
        />
      </Fade>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
