import React, { useState } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';

import { cleanup, fireEvent, render } from '@testing-library/react';

import Grow from './Grow';

const GrowDemo = (props: Partial<TransitionProps>) => {
  const { onEnter, onExit } = props;
  const [open, setOpen] = useState(true);
  return (
    <>
      <Grow in={open} onEnter={onEnter} onExit={onExit}>
        <img
          src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
          style={{
            width: '80%',
            height: '80%',
          }}
        />
      </Grow>
      <button data-testid="button" onClick={() => setOpen(!open)}></button>
    </>
  );
};

test('test Grow onEnter and onExit', () => {
  const onEnter = jest.fn(() => {});
  const onExit = jest.fn(() => {});
  const { getByTestId } = render(<GrowDemo onEnter={onEnter} onExit={onExit} />);
  expect(onEnter).toBeCalledTimes(1);
  const button = getByTestId('button');
  fireEvent.click(button);
  expect(onExit).toBeCalledTimes(1);
  cleanup();
});
