import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

import { useEventCallback } from '@muya-ui/utils';
import { AddIcon, CloseIcon, EditIcon } from '@muya-ui/theme-light';
import { Input, Tag, Tooltip, useTheme } from '@muya-ui/core';

const MaskWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  color: #ccc;
  display: flex;
  align-items: center;

  > div {
    width: 2px;
    height: 10px;
    margin: 0 8px;
    background-color: #ccc;
  }

  svg {
    cursor: pointer;
  }
`;

export default function GroupDemo() {
  const [tags, setTags] = useState(['标签一', '标签二', '标签三']);
  const [editIndex, setEditIndex] = useState(-1);
  const [showEditIndex, setShowEditIndex] = useState(-1);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleClose = useEventCallback(
    (removedTag: string) => {
      setTags(tags.filter((tag: string) => tag !== removedTag));
    },
    [tags],
  );

  const showInput = useCallback(() => {
    setInputVisible(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputConfirm = useEventCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.keyCode === 13) {
        if (editIndex > -1) {
          tags[editIndex] = inputValue;
          setTags(tags);
          setInputValue('');
          setEditIndex(-1);
          return;
        }
        if (inputValue && tags.indexOf(inputValue) === -1) {
          setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
      }
    },
    [inputValue, tags],
  );

  const handleBlur = useEventCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (editIndex > -1) {
        tags[editIndex] = inputValue;
        setTags(tags);
        setInputValue('');
        setEditIndex(-1);
        setShowEditIndex(-1);
        return;
      }
      if (!e.currentTarget.value) {
        setInputVisible(false);
        return;
      }
      if (inputValue && tags.indexOf(inputValue) === -1) {
        setTags([...tags, inputValue]);
        setInputVisible(false);
        setInputValue('');
      }
    },
    [inputValue, tags],
  );

  const handleClick = useCallback((index: number, tag: string) => {
    setEditIndex(index);
    setInputValue(tag);
  }, []);

  return (
    <>
      {tags.map((tag, index) => {
        const tagElem =
          index === editIndex ? (
            <Input
              key={tag}
              ref={inputRef}
              type="text"
              style={{ borderRadius: theme.size.spec.borderRadius.s5, width: 100 }}
              size="s"
              autoFocus
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyPress={handleInputConfirm}
            />
          ) : tag.length > 20 ? (
            <Tooltip key={tag} title={tag} triggerActions={['hover']} placement="top">
              <Tag
                key={tag}
                size="l"
                hoverable={false}
                style={{
                  maxWidth: 154,
                  minWidth: 66,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={() => setShowEditIndex(index)}
                onMouseLeave={() => setShowEditIndex(-1)}
              >
                {tag.slice(0, 20) + '...'}
                {showEditIndex === index ? (
                  <MaskWrapper>
                    <IconWrapper>
                      <EditIcon onClick={() => handleClick(index, tag)} />
                      <div />
                      <CloseIcon onClick={() => handleClose(tag)} />
                    </IconWrapper>
                  </MaskWrapper>
                ) : null}
              </Tag>
            </Tooltip>
          ) : (
            <Tag
              key={tag}
              size="l"
              hoverable={false}
              style={{
                maxWidth: 154,
                minWidth: 66,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setShowEditIndex(index)}
              onMouseLeave={() => setShowEditIndex(-1)}
            >
              {tag}
              {showEditIndex === index ? (
                <MaskWrapper>
                  <IconWrapper>
                    <EditIcon onClick={() => handleClick(index, tag)} />
                    <div />
                    <CloseIcon onClick={() => handleClose(tag)} />
                  </IconWrapper>
                </MaskWrapper>
              ) : null}
            </Tag>
          );
        return tagElem;
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          style={{ borderRadius: theme.size.spec.borderRadius.s5, width: 100 }}
          size="s"
          autoFocus
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyPress={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          size="l"
          onClick={showInput}
          bordered
          color={theme.colors.spec.light}
          colorInverse={false}
        >
          <AddIcon /> 添加标签
        </Tag>
      )}
    </>
  );
}

export const meta = {
  title: '标签组',
  desc: '用数组生成一组标签，可以动态添加、删除及编辑。',
};
