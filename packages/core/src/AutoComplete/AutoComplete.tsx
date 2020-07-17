import React, { ReactElement, Ref, useCallback, useMemo } from 'react';

import Input from '../Input';
import useLocale from '../Locale/useLocale';
import { IOptionElement, IOptionElements, Option, Select } from '../Select';
import { isSelectChildNode } from '../Select/utils';
import { ICustomStylePropMap } from '../types';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import InputElement from './InputElement';
import {
  IAutoCompleteDataSourceObjItem,
  IAutoCompleteProps,
  IAutoCompleteStyleKeys,
} from './types';

const selectIconNode = <></>;

const AutoComplete = memoForwardRef((props: IAutoCompleteProps, ref: Ref<HTMLDivElement>) => {
  const local = useLocale();
  const {
    dataSource,
    children,
    size = 'm',
    backfill = false,
    filterOption = true,
    defaultActiveFirstOption = true,
    placeholder = local['AutoComplete.placeholder'],
    styles,
    className,
    style,
    ...restProps
  } = props;
  const defaultStyles = useMemo<ICustomStylePropMap<IAutoCompleteStyleKeys>>(
    () => ({
      inputWrapper: 'inputWrapper',
    }),
    [],
  );
  const innerStyles = useStyles('auto-complete', defaultStyles, styles);
  const getInputElement = useCallback(() => {
    const element =
      children && React.isValidElement(children) && children.type !== Option ? (
        React.Children.only(children)
      ) : (
        <Input />
      );
    const elementProps = { ...(element as React.ReactElement<any>).props };
    delete elementProps.children;
    return <InputElement {...elementProps}>{element}</InputElement>;
  }, [children]);

  const options = useMemo(() => {
    const childArray = React.Children.toArray(children as ReactElement);
    if (childArray.length && isSelectChildNode(childArray[0])) {
      return children;
    } else {
      return dataSource
        ? dataSource.map(item => {
            switch (typeof item) {
              case 'string':
                return (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                );
              case 'object':
                return (
                  <Option
                    key={(item as IAutoCompleteDataSourceObjItem).value}
                    value={(item as IAutoCompleteDataSourceObjItem).value}
                  >
                    {(item as IAutoCompleteDataSourceObjItem).label}
                  </Option>
                );
              default:
                throw new Error(
                  'AutoComplete[dataSource] only supports type `string[] | Object[]`.',
                );
            }
          })
        : [];
    }
  }, [children, dataSource]) as IOptionElement | IOptionElements;

  return (
    <Select
      {...(restProps as any)}
      className={[innerStyles.inputWrapper.className, className].join(' ').trim()}
      style={{ ...innerStyles.inputWrapper.style, ...style }}
      size={size}
      backfill={backfill}
      filterOption={filterOption}
      defaultActiveFirstOption={defaultActiveFirstOption}
      placeholder={placeholder}
      ref={ref}
      mode="default"
      showSearch={true}
      labelInValue={false}
      reservedSearchResult={false}
      hideExpandIcon={true}
      selectedIcon={selectIconNode}
      getInputElement={getInputElement}
    >
      {options}
    </Select>
  );
});

(AutoComplete as any).__MUYA_AUTOCOMPLETE = true;

export default AutoComplete;
