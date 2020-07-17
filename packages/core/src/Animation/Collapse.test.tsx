import React, { useState } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';

import { cleanup, fireEvent, render } from '@testing-library/react';

import Collapse from './Collapse';

const CollapseDemo = (props: Partial<TransitionProps>) => {
  const { onEnter, onExit } = props;
  const [open, setOpen] = useState(true);
  return (
    <>
      <Collapse in={open} onEnter={onEnter} onExit={onExit}>
        <img
          src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
          style={{
            width: '80%',
            height: '80%',
          }}
        />
      </Collapse>
      <button data-testid="button" onClick={() => setOpen(!open)}></button>
    </>
  );
};

test('test Collapse onEnter and onExit', () => {
  const onEnter = jest.fn(() => {});
  const onExit = jest.fn(() => {});
  const { getByTestId } = render(<CollapseDemo onEnter={onEnter} onExit={onExit} />);
  expect(onEnter).toBeCalledTimes(1);
  const button = getByTestId('button');
  fireEvent.click(button);
  expect(onExit).toBeCalledTimes(1);
  cleanup();
});
