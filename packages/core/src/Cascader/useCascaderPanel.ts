import arrayTreeFilter from 'array-tree-filter';
import { MutableRefObject, useCallback, useEffect, useMemo } from 'react';
import { isEmpty } from 'lodash';

import { ICascaderOptionType, ICascaderPanelProps } from './types';

export default function useCascaderPanel(
  props: ICascaderPanelProps,
  activeOptionsRef: MutableRefObject<HTMLElement[]>,
) {
  const { options, activeValue, fieldNames, visible } = props;

  const activeOptions = useMemo((): Array<ICascaderOptionType> => {
    return arrayTreeFilter(options, (o, level) => o[fieldNames.value] === activeValue[level], {
      childrenKeyName: fieldNames.children,
    });
  }, [activeValue, fieldNames.children, fieldNames.value, options]);

  const showOptions = useMemo((): Array<Array<ICascaderOptionType>> => {
    const result = activeOptions
      .map(activeOption => activeOption[fieldNames.children])
      .filter(activeOption => !isEmpty(activeOption)) as Array<Array<ICascaderOptionType>>;
    result.unshift(options);
    return result;
  }, [activeOptions, fieldNames.children, options]);

  const isActiveOption = useCallback(
    (option: ICascaderOptionType, menuIndex: number) =>
      activeValue[menuIndex] === option[fieldNames.value],
    [activeValue, fieldNames.value],
  );

  useEffect(() => {
    if (visible) {
      const optionsLength = showOptions.length;
      for (let i = 0; i < optionsLength; i++) {
        const option = activeOptionsRef.current[i];
        if (option && option.parentNode) {
          (option.parentNode as HTMLUListElement).scrollTop = option.offsetTop;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return {
    isActiveOption,
    showOptions,
  };
}
