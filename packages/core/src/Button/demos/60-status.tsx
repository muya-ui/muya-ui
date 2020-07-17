import React from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup, InlineButton, MaskButton, Typography } from '@muya-ui/core';

const StatusRow = styled.div`
  margin: 0 0 12px 0;
`;

type IStatus = 'busy' | 'loading' | 'disabled' | 'normal';
const descMap: Record<IStatus, string> = {
  normal: '正常状态',
  disabled: '按钮不可用',
  busy: '按钮暂时不可用，一般用于表达当前操作在等待请求或者操作的过程中',
  loading: '按钮加载中，一般用于表达当前操作在等待请求的过程中',
};
export default function StatusDemo() {
  const [status, setStatus] = React.useState<IStatus>('normal');
  const desc = descMap[status];
  const disabled = status === 'disabled';
  const loading = status === 'loading';
  const busy = status === 'busy';
  const onClick = (switchStatus: IStatus) => () => {
    if (status === switchStatus) {
      setStatus('normal');
    } else {
      setStatus(switchStatus);
    }
  };
  return (
    <div>
      <StatusRow>
        <ButtonGroup plain>
          <Button onClick={onClick('disabled')} selected={status === 'disabled'}>
            {disabled ? '取消禁用' : '禁用按钮'}
          </Button>
          <Button onClick={onClick('busy')} selected={status === 'busy'}>
            {busy ? '取消busy' : '设置busy'}
          </Button>
          <Button onClick={onClick('loading')} selected={status === 'loading'}>
            {loading ? '取消loading' : '设置loading'}
          </Button>
        </ButtonGroup>
      </StatusRow>
      <StatusRow>
        <Button type="primary" disabled={disabled} busy={busy} loading={loading} plain>
          button
        </Button>
      </StatusRow>
      <StatusRow>
        <InlineButton disabled={disabled} busy={busy} loading={loading}>
          inline button
        </InlineButton>
      </StatusRow>
      <StatusRow>
        <MaskButton disabled={disabled} busy={busy} loading={loading}>
          mask button
        </MaskButton>
      </StatusRow>
      <StatusRow>
        <ButtonGroup type="primary" plain disabled={disabled} busy={busy || loading}>
          <Button>xl</Button>
          <Button>l</Button>
          <Button>m</Button>
          <Button>s</Button>
        </ButtonGroup>
      </StatusRow>
      <Typography.Paragraph>{desc}</Typography.Paragraph>
    </div>
  );
}

export const meta = {
  title: '按钮的状态',
  desc: '按钮的状态',
};
