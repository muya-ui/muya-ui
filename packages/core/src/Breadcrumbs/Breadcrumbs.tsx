import React, { useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { GuildRightIcon } from '@muya-ui/theme-light';

import { IButtonType, InlineButton } from '../Button';
import { ICustomStylePropMap } from '../types';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { withThemeForStyled } from '../utils/withTheme';
import { IBreadcrumbsProps, IBreadcrumbsStyleKeys } from './types';

const separatorWrapperCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
const SeparatorWrapper = styled.span`
  ${separatorWrapperCss}
`;

const SeparatorHeadWrapper = styled.span`
  ${separatorWrapperCss}
`;

const StyledHeadSeparator = styled.span`
  display: inline-flex;
  align-items: center;
`;
const BaseNode = styled.div``;

const BreadcrumbsPure = memoForwardRef<HTMLDivElement, IBreadcrumbsProps>((props, ref) => {
  const {
    size = 'm',
    fontWeight,
    separators,
    children,
    items,
    headItem,
    styles,
    ...otherProps
  } = props;
  const theme = useTheme();
  const token = theme.components.Breadcrumbs;
  const DefaultSeparator = token.separator || GuildRightIcon;
  const childNum = React.Children.count(children);
  const separatorSize = token.separatorSize[size];
  const defaultStyles = useMemo<ICustomStylePropMap<IBreadcrumbsStyleKeys>>(
    () => ({
      item: '',
      headSeparator: '',
      separator: '',
    }),
    [],
  );
  const innerStyles = useStyles('breadcrumbs', defaultStyles, styles);
  const innerSeparators = useMemo(() => {
    if (!separators && headItem) {
      return ['|', '>'];
    }
    return separators || ['>'];
  }, [headItem, separators]);
  const innerItems = useMemo(() => {
    if (headItem && items) {
      items.unshift(headItem);
    }
    return items;
  }, [headItem, items]);

  const renderSeparator = useCallback(
    (key: '>' | '|' | React.ReactNode) => {
      if (key === '|') {
        return (
          <SeparatorHeadWrapper {...innerStyles.headSeparator}>
            <StyledHeadSeparator />
          </SeparatorHeadWrapper>
        );
      } else if (key === '>') {
        return (
          <SeparatorWrapper {...innerStyles.separator}>
            <DefaultSeparator style={{ width: separatorSize, height: separatorSize }} />
          </SeparatorWrapper>
        );
      }
      return key;
    },
    [innerStyles.headSeparator, innerStyles.separator, separatorSize],
  );

  const separatorLastIndex = innerSeparators.length - 1;

  const finalNode = useMemo(() => {
    if (childNum) {
      const parentPropsForChildren = {
        size,
        fontWeight,
      };
      return React.Children.map(children, (child, childIndex) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const cloneNode = React.cloneElement(child, {
          ...parentPropsForChildren,
          ...child.props,
        });
        let innerNode;
        if (childIndex < childNum - 1) {
          const separatorKey = innerSeparators[childIndex] || innerSeparators[separatorLastIndex];
          innerNode = renderSeparator(separatorKey);
        }

        return (
          <React.Fragment key={childIndex}>
            {cloneNode}
            {innerNode}
          </React.Fragment>
        );
      });
    } else if (innerItems && innerItems.length) {
      return innerItems.map((item, itemIndex) => {
        let innerNode;
        const isLast = itemIndex === innerItems.length - 1;
        const { label: itemLabel, url: itemUrl, ...otherItemProps } = item;
        let href;
        let buttonType: IButtonType = 'normal';
        let constant = isLast;
        if (!isLast) {
          href = itemUrl;
          const separatorKey = innerSeparators[itemIndex] || innerSeparators[separatorLastIndex];
          innerNode = renderSeparator(separatorKey);
          buttonType = 'secondary';
        }
        return (
          <React.Fragment key={itemIndex}>
            <InlineButton
              {...innerStyles.item}
              {...otherItemProps}
              fontWeight="lighter"
              type={buttonType}
              constant={constant}
              size={size}
              href={href}
            >
              {itemLabel}
            </InlineButton>
            {innerNode}
          </React.Fragment>
        );
      });
    }
  }, [
    childNum,
    children,
    fontWeight,
    innerItems,
    innerSeparators,
    innerStyles.item,
    renderSeparator,
    separatorLastIndex,
    size,
  ]);

  return (
    <BaseNode {...otherProps} ref={ref}>
      {finalNode}
    </BaseNode>
  );
});

const BreadcrumbsWithoutDefaultTheme = styled(BreadcrumbsPure)<IBreadcrumbsProps>`
  position: relative;
  display: flex;
  align-items: center;
  ${props => {
    const size = props.size || 'm';
    const token = props.theme.components.Breadcrumbs;
    const separatorSize = token.separatorSize[size];
    return css`
      color: ${token.separatorColor};

      & ${SeparatorHeadWrapper} {
        width: ${token.separatorHeadWidth}px;
      }

      & ${SeparatorWrapper} {
        width: ${token.separatorWidth}px;
      }

      & ${StyledHeadSeparator} {
        border-left: 1px solid ${token.separatorColor};
        height: ${separatorSize}px;
      }
    `;
  }}
`;

const Breadcrumbs = withThemeForStyled(BreadcrumbsWithoutDefaultTheme);

export default Breadcrumbs;
