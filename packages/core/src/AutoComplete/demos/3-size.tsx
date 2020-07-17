import React, { useState } from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import {
  AutoComplete,
  Button,
  ButtonGroup,
  IAutoCompleteDataSourceItem,
  ISelectOptionState,
  Row,
  Typography,
} from '@muya-ui/core';

export default function SizeDemo() {
  const [size, setSize] = useState<IComponentSizeSpec>('m');
  const [dataSource, setDataSource] = useState<IAutoCompleteDataSourceItem[]>([]);

  const onSelect = (value: ISelectOptionState) => {
    console.log('onSelect: ', value);
  };

  const onSearch = (searchText: string) => {
    setDataSource(!searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)]);
  };

  return (
    <>
      <Typography.Title style={{ marginBottom: '12px' }} level={5}>
        点击切换尺寸：
      </Typography.Title>
      <Row>
        <ButtonGroup>
          <Button plain={size !== 'xl'} onClick={() => setSize('xl')}>
            xl
          </Button>
          <Button plain={size !== 'l'} onClick={() => setSize('l')}>
            l
          </Button>
          <Button plain={size !== 'm'} onClick={() => setSize('m')}>
            m
          </Button>
          <Button plain={size !== 's'} onClick={() => setSize('s')}>
            s
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        <AutoComplete size={size} dataSource={dataSource} onSelect={onSelect} onSearch={onSearch} />
      </Row>
    </>
  );
}

export const meta = {
  title: '尺寸',
  desc: '尺寸，可以是 xl 、l 、m 、s 。',
};
