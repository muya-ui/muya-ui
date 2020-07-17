import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { ReminderIcon } from '@muya-ui/theme-light';
import { Checkbox, Tooltip, useTheme } from '@muya-ui/core';

const StyledIcon = styled(ReminderIcon)`
  ${props => css`
    color: ${props.theme.colors.pattern.icon.normal};
    margin-left: ${props.theme.spacing.spec.s2}px;
  `}
`;

export default function DefaultDemo() {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      autoFocus
      checked={checked}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)}
    >
      <span>
        Checkbox
        <Tooltip title="提示">
          <StyledIcon theme={theme} />
        </Tooltip>
      </span>
    </Checkbox>
  );
}

export const meta = {
  title: '基本用法',
  desc: '简单的checkbox',
};
