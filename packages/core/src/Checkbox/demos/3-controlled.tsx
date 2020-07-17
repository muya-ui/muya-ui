import React, { useState } from 'react';

import { Button, Checkbox } from '@muya-ui/core';

export default function ControlledDemo() {
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(true);

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)}
        disabled={disabled}
      >
        {checked ? 'Checked' : 'Unchecked'}-{disabled ? 'Disabled' : 'Enable'}
      </Checkbox>
      <br />
      <br />
      <div>
        <Button
          size="s"
          type="primary"
          onClick={() => setChecked(!checked)}
          style={{ marginRight: '10px' }}
        >
          {checked ? 'Uncheck' : 'Check'}
        </Button>
        <Button size="s" type="primary" onClick={() => setDisabled(!disabled)}>
          {disabled ? 'Enable' : 'Disable'}
        </Button>
      </div>
    </div>
  );
}

export const meta = {
  title: '受控的Checkbox',
  desc: '联动checkbox',
};
