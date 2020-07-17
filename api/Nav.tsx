import React, { useState } from 'react';
import { ISelectValueType, Option, Select } from '@muya-ui/core';
import { muyaThemeDark } from '@muya-ui/theme-dark';
import { muyaThemeLight } from '@muya-ui/theme-light';

interface Props {
  useTheme: Function;
  eventBus: Function;
}

export default function Navs({ useTheme, eventBus }: Props) {
  const { theme, switchTheme } = useTheme();
  const [codeTheme, setCodeTheme] = useState(localStorage.getItem('codeTheme') || '默认代码主题');
  const codeThemes = ['默认代码主题', 'material', 'panda-syntax'];
  const themes = {
    light: muyaThemeLight,
    dark: muyaThemeDark,
  };
  const themeOptions = [
    {
      value: 'light',
      label: '亮主题',
    },
    {
      value: 'dark',
      label: '暗主题',
    },
  ];
  const handleSelect = (value: ISelectValueType) => {
    switchTheme(value as string);
    eventBus.$emit('changeTheme', value, { [value]: themes[value] });
  };
  const handleCodeThemeSelect = (value: ISelectValueType) => {
    setCodeTheme(value as string);
    localStorage.setItem('codeTheme', value as string);
    location.reload();
  };

  return (
    <div
      style={{
        position: 'absolute',
        right: '20px',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Select
        style={{ marginRight: 20 }}
        width={140}
        value={codeTheme}
        onChange={handleCodeThemeSelect}
      >
        {codeThemes.map(item => (
          <Option value={item} key={item}>
            {item}
          </Option>
        ))}
      </Select>
      <Select value={theme} width={140} onChange={handleSelect}>
        {themeOptions.map(item => (
          <Option value={item.value} key={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}
