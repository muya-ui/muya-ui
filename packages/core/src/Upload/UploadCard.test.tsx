import React from 'react';
import mount from 'react-test-renderer';
import UploadCard from './UploadCard';
import { AddIcon } from '@muya-ui/theme-light';

describe('UploadCard component', () => {
  it('should render normal', function() {
    const wrapper = mount
      .create(
        <UploadCard width={96} height={96} title="点击上传" subtitle="子标题" icon={<AddIcon />} />,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render current size', function() {
    const wrapper = mount
      .create(
        <>
          <UploadCard size="s" />
          <UploadCard size="m" />
          <UploadCard size="l" />
          <UploadCard size="xl" />
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render disabled style', function() {
    const wrapper = mount.create(<UploadCard disabled />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render drag style', function() {
    const wrapper = mount.create(<UploadCard draggable />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render customer children', function() {
    const wrapper = mount
      .create(
        <UploadCard>
          <input type="text" />
        </UploadCard>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
