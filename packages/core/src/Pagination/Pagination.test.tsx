import { mount } from 'enzyme';
import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import Pagination from './Pagination';

describe('pagination-test', () => {
  test('should mount and test onChange', () => {
    const onChange = sinon.stub();
    const wrapper = mount(<Pagination totalRecords={60} onChange={onChange} />);
    expect(
      wrapper
        .find('ul')
        .childAt(1)
        .text(),
    ).toEqual('1');

    // 同一个页码，不触发 onChange
    wrapper
      .find('ul')
      .childAt(1)
      .simulate('click');
    wrapper
      .find('ul')
      .childAt(4)
      .simulate('click');
    expect(() => {
      sinon.assert.calledOnce(onChange);
    }).not.toThrow();
  });

  test('shound onChange ok when page clicked', () => {
    let page = 1;
    const wrap = mount(
      <Pagination
        totalRecords={60}
        isDarkBackground
        onChange={value => {
          page = value;
        }}
        styles={{
          wrapper: 'pagination-test-wrapper',
        }}
      />,
    );
    wrap
      .find('ul')
      .childAt(4)
      .simulate('click');
    expect(page).toEqual(4);
    expect(wrap.find('ul.pagination-test-wrapper')).toHaveLength(1);
  });

  test('should controlled current value with onChange', () => {
    function Com() {
      const [value, setValue] = useState(10);
      return <Pagination current={value} totalRecords={200} onChange={value => setValue(value)} />;
    }
    const wrapper = mount(<Com />);
    wrapper
      .find('ul')
      .childAt(3)
      .simulate('click');
    expect(
      wrapper
        .find('ul')
        .childAt(3)
        .text(),
    ).toEqual('6');
  });

  test('shound amount page number be right when set pageSize', () => {
    const wrapper = mount(<Pagination totalRecords={60} pageSize={5} />);
    expect(
      wrapper
        .find('ul')
        .childAt(7)
        .text(),
    ).toEqual('12');
  });

  test('should onChange ok when simple=true', () => {
    let page = 1;
    const wrapper = mount(
      <Pagination
        totalRecords={200}
        simple
        onChange={value => {
          page = value;
        }}
      />,
    );
    wrapper
      .find('li')
      .last()
      .simulate('click');
    expect(page).toEqual(2);
    expect(
      wrapper
        .find('span')
        .first()
        .text(),
    ).toEqual('2');
  });

  test('should onChange ok when fastForward and fastBackward', () => {
    let page = 1;
    const wrapper = mount(
      <Pagination
        totalRecords={200}
        onChange={value => {
          page = value;
        }}
      />,
    );
    wrapper
      .find('StyledMoreIcon')
      .first()
      .simulate('click');
    expect(page).toEqual(6);
    wrapper
      .find('StyledJumpIcon')
      .last()
      .simulate('click');
    expect(page).toEqual(11);
    wrapper
      .find('StyledJumpIcon')
      .first()
      .simulate('click');
    expect(page).toEqual(6);
  });

  test('should jump and onChange ok when showQuickJumper=true', () => {
    let page = 1;
    const wrapper = mount(
      <Pagination
        totalRecords={200}
        showQuickJumper
        onChange={value => {
          page = value;
        }}
      />,
    );
    wrapper.find('input').simulate('change', { target: { value: '7' } });
    wrapper.find('input').simulate('keydown', { keyCode: 13 });
    wrapper.find('input').simulate('blur');
    expect(page).toEqual(7);
    expect(
      wrapper
        .find('ul')
        .childAt(3)
        .text(),
    ).toEqual('5');
  });

  test('[simple]: should jump and onChange ok when showQuickJumper=true', () => {
    let simplePage = 1;
    const simpleWrapper = mount(
      <Pagination
        totalRecords={200}
        simple
        showQuickJumper
        onChange={value => {
          simplePage = value;
        }}
      />,
    );
    simpleWrapper.find('input').simulate('change', { target: { value: '7' } });
    simpleWrapper.find('input').simulate('keydown', { keyCode: 13 });
    simpleWrapper.find('input').simulate('blur');
    expect(simplePage).toEqual(7);
  });

  test('should not overflow when beyond max or min', () => {
    let page = 20;
    const wrapper = mount(
      <Pagination
        totalRecords={100}
        defaultCurrent={20}
        showQuickJumper
        onChange={value => {
          page = value;
        }}
      />,
    );
    expect(
      wrapper
        .find('ul')
        .childAt(7)
        .text(),
    ).toEqual('10');
    wrapper.find('input').simulate('change', { target: { value: '30' } });
    wrapper.find('input').simulate('blur');
    expect(page).toEqual(10);
    wrapper.find('input').simulate('change', { target: { value: '0' } });
    wrapper.find('input').simulate('blur');
    expect(page).toEqual(1);
  });
});

describe('Snapshots', () => {
  test('Snapshots should be matched in the base case', () => {
    const tree = renderer.create(<Pagination />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('normal different size', () => {
    const tree = renderer
      .create(
        <div>
          <Pagination size="s" showQuickJumper />
          <Pagination size="m" showQuickJumper />
          <Pagination size="l" showQuickJumper />
          <Pagination size="xl" showQuickJumper />
        </div>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('simple different size', () => {
    const tree = renderer
      .create(
        <div>
          <Pagination size="s" simple />
          <Pagination size="m" simple />
          <Pagination size="l" simple />
          <Pagination size="xl" simple />
        </div>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('show page size changer', () => {
    const tree = renderer.create(<Pagination showPageSizeChanger />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('深色背景', () => {
    const tree = renderer.create(<Pagination isDarkBackground />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('受控', () => {
    const tree = renderer
      .create(<Pagination current={4} pageSize={20} totalRecords={300} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
