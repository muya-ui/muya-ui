import { mount } from 'enzyme';
import React, { useContext } from 'react';

import ImgContainer from './ImgContainer';
import ImgPoolContext, { imgPool } from './ImgPoolContext';

test('测试 ImgContainer', () => {
  const TestImg = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    const pool = useContext(ImgPoolContext);
    expect(pool !== imgPool).toBe(true);
    return <div ref={ref}></div>;
  });
  const w = mount(
    <ImgContainer>
      <TestImg />
    </ImgContainer>,
  );
  w.unmount();
});
