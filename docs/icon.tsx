import React from 'react';
import * as DefaultIcons from '@muya-ui/theme-light/lib/icons';
import * as UpIcons from '@qunhe/muya-theme-up/lib/icons';
import * as CoohomIcons from '@qunhe/muya-theme-coohom/lib/icons';
// import * as PanguIcons from '@qunhe/muya-theme-pangu/lib/icons';
import { ISvgProps } from '@muya-ui/theme-light';
import { Row, Col, Typography, toast } from '@muya-ui/core';
import { chunk } from 'lodash';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';

const StyledContent = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;
  padding: 0 8px;
`;

const StyledP = styled(Typography.Paragraph)`
  padding-top: 4px;
  padding-bottom: 20px;
  width: 100%;
  align-self: stretch;
  text-align: center;
`;

type IIconMap = Record<string, React.FunctionComponent<ISvgProps>>;
interface IIconListProps {
  iconMap: IIconMap;
  packageName: string;
}

function IconList(props: IIconListProps) {
  const { iconMap, packageName } = props;
  const list = chunk(
    Object.keys(iconMap).map(k => {
      iconMap[k].displayName = k;
      return iconMap[k];
    }),
    6,
  );
  const generateCopyText = (packageName: string, iconName?: string) => {
    return `import { ${iconName} } from '${packageName}'`;
  };
  return (
    <div>
      {list.map((l, index) => (
        <Row key={index}>
          {l.map((IconComp, cIndex) => (
            <Col span={4} key={cIndex}>
              <CopyToClipboard
                text={generateCopyText(packageName, IconComp.displayName)}
                onCopy={() => toast.success('代码成功复制到剪贴板')}
              >
                <StyledContent>
                  <IconComp style={{ width: '80%' }} />
                  <StyledP strong fontSize="s3" ellipsis>
                    {IconComp.displayName}
                  </StyledP>
                </StyledContent>
              </CopyToClipboard>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}

export function DefaultIconList() {
  return <IconList iconMap={DefaultIcons} packageName="@muya-ui/theme-light" />;
}

export function UpIconList() {
  return <IconList iconMap={UpIcons} packageName="@qunhe/muya-theme-up" />;
}

export function CoohomIconList() {
  return <IconList iconMap={CoohomIcons} packageName="@qunhe/muya-theme-coohom" />;
}

// export function PanguIconList() {
//   return <IconList iconMap={PanguIcons} packageName="@qunhe/muya-theme-pangu" />;
// }
