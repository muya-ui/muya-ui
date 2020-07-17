import { IInputTagValue, ITagInputRemoveEvent } from '../Input/types';
import { ITreeNodeKey } from '../Tree/types';
import { ITreeSelectInputProps } from './types';

export default function useTreeSelectInput(props: ITreeSelectInputProps) {
  const {
    value,
    treeKeyEntities,
    isSearchMode,
    onInput,
    onInputChange,
    onSearch,
    onDeselect,
  } = props;

  const getInputLabel = (): string | number => {
    let selectNodeKey = value[0];
    const nodeEntity = treeKeyEntities[selectNodeKey];
    if (nodeEntity) {
      return `${nodeEntity.node.title}`;
    }
    return '';
  };

  const getTagText = (value: IInputTagValue) => {
    let key = value as ITreeNodeKey;
    if (treeKeyEntities[key]) {
      return treeKeyEntities[key].node.title;
    }
    return '';
  };

  // tag event
  const handleRemoveTag = (value: IInputTagValue, index: number, e: ITagInputRemoveEvent) => {
    onDeselect(value as ITreeNodeKey, e);
  };

  // input event
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newInputValue = (e.target as HTMLInputElement).value;
    onInputChange(newInputValue);
    if (isSearchMode && onSearch) {
      onSearch(newInputValue);
    }
    if (onInput) {
      onInput(e);
    }
  };

  return {
    getInputLabel,
    getTagText,
    handleRemoveTag,
    handleInput,
  };
}
