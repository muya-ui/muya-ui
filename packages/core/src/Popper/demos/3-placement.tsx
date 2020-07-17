import React from 'react';
import styled from 'styled-components';

import { Animation, Button, IPopperPlacement, Popper } from '@muya-ui/core';

const StyledP = styled.p`
  display: flex;
  justify-content: center;
  color: #333;
  padding: 10px;
  align-items: center;
  background: #f2f2f2;
  height: 40px;
  margin: 0;
`;

interface IBoxProps {
  onChange?: (placement: IPopperPlacement, event: React.MouseEvent) => void;
}
interface IItemProps extends IBoxProps {
  placement: IPopperPlacement;
}

const StyledBox = styled.div`
  width: 500px;
  transform: scale(0.9);
  transform-origin: top left;
  .item {
    margin: 4px;
    padding: 0 4px;
  }
  .top-row,
  .bottom-row {
    margin: -4px 0 -4px 88px;
  }

  .middle-row {
    display: flex;
  }
  .left-col,
  .right-col {
    display: flex;
    flex-direction: column;
  }
  .right-col {
    margin-left: 272px;
  }
`;

const Item = (props: IItemProps) => {
  const { placement, onChange } = props;
  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      onChange && onChange(placement, event);
    },
    [onChange, placement],
  );
  return (
    <Button className="item" size="s" width={88} onClick={handleClick} disableSiblingMargin>
      {placement}
    </Button>
  );
};

const Box = (props: IBoxProps) => {
  return (
    <StyledBox>
      <div className="top-row">
        <Item placement="top-start" {...props} />
        <Item placement="top" {...props} />
        <Item placement="top-end" {...props} />
      </div>
      <div className="middle-row">
        <div className="left-col">
          <Item placement="left-start" {...props} />
          <Item placement="left" {...props} />
          <Item placement="left-end" {...props} />
        </div>
        <div className="right-col">
          <Item placement="right-start" {...props} />
          <Item placement="right" {...props} />
          <Item placement="right-end" {...props} />
        </div>
      </div>
      <div className="bottom-row">
        <Item placement="bottom-start" {...props} />
        <Item placement="bottom" {...props} />
        <Item placement="bottom-end" {...props} />
      </div>
    </StyledBox>
  );
};

export default function PlacementDemo() {
  const [anchorEl, setAnchorEl] = React.useState<React.MouseEvent['currentTarget']>();
  const [placement, setPlacement] = React.useState<IPopperPlacement>('top');
  const handleOnChange = React.useCallback(
    (newPlacement: IPopperPlacement, event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setPlacement(newPlacement);
    },
    [],
  );

  return (
    <>
      <Popper placement={placement} open={!!anchorEl} anchorEl={anchorEl} transition>
        {({ transitionProps }) => {
          const { timeout, ...other } = transitionProps || {};
          return (
            <Animation.Fade {...other}>
              <StyledP>Who Are You? I am Iron Man!</StyledP>
            </Animation.Fade>
          );
        }}
      </Popper>
      <Box onChange={handleOnChange} />
    </>
  );
}

export const meta = {
  title: 'Popper placement',
  desc: 'placement有top/right/bottom/left四个基准位，每个位置后可以追加-start/end',
};
