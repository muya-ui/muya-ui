import { colorUtils, createTheme, createThemeColors } from '@muya-ui/theme-light';

export function createDarkTheme() {
  const darkSpec = {
    light: 'rgba(0,0,0,1)',
    dark: 'rgba(255,255,255,1)',
    // 中性色
    neutral10: {
      normal: 'rgba(255,255,255,0.04)',
      hover: 'rgba(255,255,255,0.08)',
      click: 'rgba(255,255,255,0.06)',
    },
    neutral9: {
      normal: 'rgba(255,255,255,0.08)',
      hover: 'rgba(230,230,230,0.16)',
      click: 'rgba(230,230,230,0.12)',
    },
    neutral8: {
      normal: 'rgba(255,255,255,0.12)',
      hover: 'rgba(230,230,230,0.2)',
      click: 'rgba(230,230,230,0.16)',
    },
    neutral7: {
      normal: 'rgba(255,255,255,0.16)',
      hover: 'rgba(247,247,247,0.24)',
      click: 'rgba(247,247,247,0.2)',
    },
    neutral6: {
      normal: 'rgba(255,255,255,0.2)',
      hover: 'rgba(255,255,255,0.12)',
      click: 'rgba(255,255,255,0.16)',
    },
    neutral5: {
      normal: 'rgba(255,255,255,0.3)',
      hover: 'rgba(255,255,255,0.22)',
      click: 'rgba(255,255,255,0.26)',
    },
    neutral4: {
      normal: 'rgba(255,255,255,0.5)',
      hover: 'rgba(255,255,255,0.42)',
      click: 'rgba(255,255,255,0.46)',
    },
    neutral3: {
      normal: 'rgba(255,255,255,0.7)',
      hover: 'rgba(255,255,255,0.62)',
      click: 'rgba(255,255,255,0.66)',
    },
    neutral2: {
      normal: 'rgba(255,255,255,0.8)',
      hover: 'rgba(255,255,255,0.72)',
      click: 'rgba(255,255,255,0.76)',
    },
    neutral1: {
      normal: 'rgba(255,255,255,0.9)',
      hover: 'rgba(255,255,255,0.82)',
      click: 'rgba(255,255,255,0.86)',
    },
  };

  const darkPattern = {
    background: {
      global: '#232529',
      higher: '#3d3e43',
      block: darkSpec.neutral10.normal,
      selectedBlock: darkSpec.neutral9.normal,
      disabled: darkSpec.neutral10.normal,
      divider: darkSpec.neutral7.normal,
      mask: darkSpec.light,
    },
  };

  return createTheme(
    {
      themeName: 'muya-theme-dark',
      prefix: 'muya-dark',
      colors: createThemeColors(darkSpec, darkPattern),
      shadows: {
        spec: {
          s1: {
            normal: '0 0 24px 0 rgba(0,0,0,0.12)',
            hover: '0 0 24px 0 rgba(0,0,0,0.20)',
          },
          s2: {
            normal: '0 0 12px 0 rgba(0,0,0,0.16)',
            hover: '0 0 12px 0 rgba(0,0,0,0.24)',
          },
        },
        pattern: {
          popper: {
            normal: '0 0 12px 0 rgba(0,0,0,0.16)',
            hover: '0 0 12px 0 rgba(0,0,0,0.24)',
          },
        },
      },
    },
    ({ colors, opacity }) => {
      const { spec: colorsSpec } = colors;
      return {
        Tooltip: {
          bgColor: colorsSpec.neutral1.normal,
        },
        Dialog: {
          maskBgColor: colorUtils.transparentize(opacity.pattern.mask, colorsSpec.light),
          content: {
            typeIconBgColor: {
              error: colorsSpec.dark,
              success: colorsSpec.dark,
              warning: colorsSpec.dark,
            },
          },
        },
        Carousel: {
          PagerButton: {
            bgColor: colorsSpec.light,
            iconColor: colorsSpec.dark,
          },
        },
        Button: {
          defaultColor: colorsSpec.dark,
          textColor: {
            strong: colorsSpec.light,
            normal: colorsSpec.light,
            secondary: colorsSpec.light,
            weak: colorsSpec.light,
          },
          statusOpacity: {
            hover: opacity.spec.s8,
            click: opacity.spec.s7,
          },
        },
        Badge: {
          color: colorsSpec.light,
        },
        Calendar: {
          item: {
            color: {
              selected: colorsSpec.dark,
            },
          },
        },
        Table: {
          headOrFooterBackground: '#343539',
          leftFixedColumnBoxShadow: '6px 0 6px 0px rgba(0, 0, 0, 0.16)',
          rightFixedColumnBoxShadow: '-6px 0 6px 0px rgba(0, 0, 0, 0.16)',
        },
        Skeleton: {
          backgroundColor: colorsSpec.neutral10.normal,
          activeBackgroundColor: colorsSpec.neutral9.normal,
        },
        BaseMenu: {
          group: {
            background: 'transparent',
          },
          item: {
            background: {
              normal: 'transparent',
              hover: colorsSpec.neutral10.normal,
              clicked: colorsSpec.neutral10.normal,
              selected: colorsSpec.neutral10.normal,
              selectedHover: colorsSpec.neutral9.normal,
              selectedClicked: colorsSpec.neutral10.normal,
              disabled: 'transparent',
            },
            color: {
              normal: colorsSpec.dark,
              hover: colorsSpec.dark,
              click: colorsSpec.dark,
              selected: colorsSpec.brand,
              selectedHover: colorsSpec.brand,
              selectedClicked: colorsSpec.brand,
              disabled: colorsSpec.dark,
            },
          },
        },
        Menu: {
          background: 'transparent',
          wrapper: {
            background: colors.pattern.background.global,
          },
          group: {
            background: 'transparent',
          },
          item: {
            background: {
              normal: 'transparent',
              hover: colorsSpec.neutral10.normal,
              clicked: colorsSpec.neutral10.normal,
              selected: colorsSpec.neutral10.normal,
              selectedHover: colorsSpec.neutral9.normal,
              selectedClicked: colorsSpec.neutral10.normal,
              disabled: 'transparent',
            },
            color: {
              normal: colorsSpec.dark,
              hover: colorsSpec.dark,
              click: colorsSpec.dark,
              selected: colorsSpec.brand,
              selectedHover: colorsSpec.brand,
              selectedClicked: colorsSpec.brand,
              disabled: colorsSpec.neutral6.normal,
            },
            horizontalBackground: {
              normal: 'transparent',
              hover: 'transparent',
              clicked: 'transparent',
              selected: 'transparent',
              selectedHover: 'transparent',
              selectedClicked: 'transparent',
              disabled: 'transparent',
            },
            horizontalColor: {
              normal: colorsSpec.dark,
              hover: colorsSpec.brand,
              click: colorsSpec.brand,
              selected: colorsSpec.brand,
              selectedHover: colorsSpec.brand,
              selectedClicked: colorsSpec.brand,
              disabled: colorsSpec.neutral6.normal,
            },
          },
          subMenu: {
            background: {
              normal: 'transparent',
              hover: colorsSpec.neutral10.normal,
              clicked: colorsSpec.neutral10.normal,
              selected: colorsSpec.neutral10.normal,
              selectedHover: colorsSpec.neutral9.normal,
              selectedClicked: colorsSpec.neutral10.normal,
              disabled: 'transparent',
            },
            color: {
              normal: colorsSpec.dark,
              hover: colorsSpec.dark,
              click: colorsSpec.dark,
              selected: colorsSpec.brand,
              selectedHover: colorsSpec.brand,
              selectedClicked: colorsSpec.brand,
              disabled: colorsSpec.neutral6.normal,
            },
            horizontalBackground: {
              normal: 'transparent',
              hover: 'transparent',
              clicked: 'transparent',
              selected: 'transparent',
              selectedHover: 'transparent',
              selectedClicked: 'transparent',
              disabled: 'transparent',
            },
            horizontalColor: {
              normal: colorsSpec.dark,
              hover: colorsSpec.brand,
              click: colorsSpec.brand,
              selected: colorsSpec.brand,
              selectedHover: colorsSpec.brand,
              selectedClicked: colorsSpec.brand,
              disabled: colorsSpec.neutral6.normal,
            },
          },
        },
        Checkbox: {
          iconBgColor: 'transparent',
        },
        Alert: {
          icon: {
            bgColor: {
              error: colorsSpec.dark,
              warning: colorsSpec.dark,
              success: colorsSpec.dark,
            },
          },
        },
        Radio: {
          checkedCenterBg: colorsSpec.light,
        },
        Switch: {
          circleBackground: colorsSpec.dark,
        },
        Pagination: {
          numberColor: {
            normal: colorsSpec.dark,
            hover: colorsSpec.dark,
            current: colorsSpec.dark,
          },
        },
        Notification: {
          iconBgColor: {
            error: colorsSpec.dark,
            success: colorsSpec.dark,
            warning: colorsSpec.dark,
          },
        },
        Result: {
          typeIcon: {
            empty:
              '//qhstaticssl.kujiale.com/newt/100759/image/svgxml/1573020737298/EDF2B708E25D13F3B1BB3B6FF683B8C6.svg',
            forbidden:
              '//qhstaticssl.kujiale.com/newt/100759/image/svgxml/1573020737347/B460EA52AD05BC105361D252CCF192D3.svg',
            emptySmall:
              '//qhstaticssl.kujiale.com/newt/100759/image/svgxml/1573020737375/D2A2D33D745A5E31296C6187191D73A8.svg',
          },
        },
        Slider: {
          circleColor: colorsSpec.dark,
        },
        ImgCropper: {
          borderColor: colorsSpec.dark,
          maskColor: colorUtils.transparentize(0.5, colorsSpec.light),
        },
        Cascader: {
          item: {
            background: {
              normal: 'transparent',
              hover: colorsSpec.neutral10.normal,
              clicked: colorsSpec.neutral10.normal,
              selected: colorsSpec.neutral10.normal,
              selectedHover: colorsSpec.neutral9.normal,
              selectedClicked: colorsSpec.neutral10.normal,
              disabled: 'transparent',
            },
            color: {
              normal: colorsSpec.dark,
              hover: colorsSpec.dark,
              click: colorsSpec.dark,
              selected: colorsSpec.brand,
              selectedHover: colorsSpec.brand,
              selectedClicked: colorsSpec.brand,
              disabled: colorsSpec.dark,
            },
          },
        },
        Tree: {
          background: {
            normal: 'transparent',
            hover: colorsSpec.neutral10.normal,
            clicked: colorsSpec.neutral10.normal,
            selected: colorsSpec.neutral10.normal,
            selectedHover: colorsSpec.neutral9.normal,
            selectedClicked: colorsSpec.neutral10.normal,
            disabled: 'transparent',
          },
          color: {
            normal: colorsSpec.dark,
            hover: colorsSpec.dark,
            click: colorsSpec.dark,
            selected: colorsSpec.brand,
            selectedHover: colorsSpec.brand,
            selectedClicked: colorsSpec.brand,
            disabled: colorsSpec.dark,
          },
        },
      };
    },
  );
}

export default createDarkTheme();
