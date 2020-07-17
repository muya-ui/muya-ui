import deepmerge from 'deepmerge';

import {
  IBreakpoints,
  IColors,
  IComponents,
  IOpacity,
  IShadows,
  ISize,
  ISpacing,
  ITheme,
  IThemeWithoutComponents,
  ITransition,
  ITypography,
  IZIndex,
} from '../interfaces';
import { breakpointsSpec } from '../tokens/breakpoints';
import { colorsPattern, colorsSpec, createColorsPattern } from '../tokens/colors';
import createAlertToken from '../tokens/components/createAlertToken';
import createBadgeToken from '../tokens/components/createBadgeToken';
import createBaseMenuToken from '../tokens/components/createBaseMenuToken';
import createBreadcrumbsToken from '../tokens/components/createBreadcrumbsToken';
import createButtonToken from '../tokens/components/createButtonToken';
import createCalendarToken from '../tokens/components/createCalendarToken';
import createCardToken from '../tokens/components/createCardToken';
import createCarouselToken from '../tokens/components/createCarouselToken';
import createCascaderToken from '../tokens/components/createCascaderToken';
import createCheckboxToken from '../tokens/components/createCheckboxToken';
import createDatePickerToken from '../tokens/components/createDatePickerToken';
import createDialogToken from '../tokens/components/createDialogToken';
import createDropdownToken from '../tokens/components/createDropdownToken';
import createFormToken from '../tokens/components/createFormToken';
import createGuideToken from '../tokens/components/createGuideToken';
import createImgCropperToken from '../tokens/components/createImgCropperToken';
import createImgPreviewToken from '../tokens/components/createImgPreviewToken';
import createImgToken from '../tokens/components/createImgToken';
import createInputNumberToken from '../tokens/components/createInputNumberToken';
import createInputToken from '../tokens/components/createInputToken';
import createMenuToken from '../tokens/components/createMenuToken';
import createNotificationToken from '../tokens/components/createNotificationToken';
import createPaginationToken from '../tokens/components/createPaginationToken';
import createPopconfirmToken from '../tokens/components/createPopconfirmToken';
import createPopoverCardToken from '../tokens/components/createPopoverCardToken';
import createProgressToken from '../tokens/components/createProgressToken';
import createRadioToken from '../tokens/components/createRadioToken';
import createResultToken from '../tokens/components/createResultToken';
import createSelectToken from '../tokens/components/createSelectToken';
import createSkeletonToken from '../tokens/components/createSkeletonToken';
import createSliderToken from '../tokens/components/createSliderToken';
import createSpinToken from '../tokens/components/createSpinToken';
import createStepsToken from '../tokens/components/createStepsToken';
import createSwitchToken from '../tokens/components/createSwitchToken';
import createTableToken from '../tokens/components/createTableToken';
import createTabsToken from '../tokens/components/createTabsToken';
import createTagToken from '../tokens/components/createTagToken';
import createTimePickerToken from '../tokens/components/createTimePickerToken';
import createTooltipToken from '../tokens/components/createTooltipToken';
import createTreeSelectToken from '../tokens/components/createTreeSelectToken';
import createTreeToken from '../tokens/components/createTreeToken';
import createTypographyToken from '../tokens/components/createTypographyToken';
import createUploadToken from '../tokens/components/createUploadToken';
import createCollapseToken from '../tokens/components/createCollapseToken';
import createScrollViewToken from '../tokens/components/createScrollViewToken';
import { opacityPattern, opacitySpec } from '../tokens/opacity';
import { shadowsPattern, shadowsSpec } from '../tokens/shadows';
import { sizePattern, sizeSpec } from '../tokens/size';
import { spacingPattern, spacingSpec } from '../tokens/spacing';
import { transitionPattern, transitionSpec } from '../tokens/transition';
import { typographySpec } from '../tokens/typography';
import { zIndexPattern, zIndexSpec } from '../tokens/zIndex';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

const overwriteArrayMerge = (destinationArray: any[], sourceArray: any[]) => sourceArray;

function createThemeWithoutComponents(outertheme: DeepPartial<IThemeWithoutComponents>): ITheme {
  const prefix = outertheme.prefix || 'muya';
  const themeName = outertheme.themeName || 'muya-theme-light';
  const breakpoints = deepmerge(
    {
      spec: breakpointsSpec,
    },
    outertheme.breakpoints || {},
    { arrayMerge: overwriteArrayMerge },
  ) as IBreakpoints;

  const colors = deepmerge(
    {
      spec: colorsSpec,
      pattern: colorsPattern,
    },
    outertheme.colors || {},
    { arrayMerge: overwriteArrayMerge },
  ) as IColors;

  const opacity = deepmerge(
    {
      spec: opacitySpec,
      pattern: opacityPattern,
    },
    outertheme.opacity || {},
    { arrayMerge: overwriteArrayMerge },
  ) as IOpacity;

  const shadows = deepmerge(
    {
      spec: shadowsSpec,
      pattern: shadowsPattern,
    },
    outertheme.shadows || {},
    { arrayMerge: overwriteArrayMerge },
  ) as IShadows;

  const size = deepmerge(
    {
      spec: sizeSpec,
      pattern: sizePattern,
    },
    outertheme.size || {},
    { arrayMerge: overwriteArrayMerge },
  ) as ISize;

  const spacing = deepmerge(
    {
      spec: spacingSpec,
      pattern: spacingPattern,
    },
    outertheme.spacing || {},
    { arrayMerge: overwriteArrayMerge },
  ) as ISpacing;

  const transition = deepmerge(
    {
      spec: transitionSpec,
      pattern: transitionPattern,
    },
    outertheme.transition || {},
    { arrayMerge: overwriteArrayMerge },
  ) as ITransition;

  const typography = deepmerge(
    {
      spec: typographySpec,
    },
    outertheme.typography || {},
    { arrayMerge: overwriteArrayMerge },
  ) as ITypography;

  const zIndex = deepmerge(
    {
      spec: zIndexSpec,
      pattern: zIndexPattern,
    },
    outertheme.zIndex || {},
    { arrayMerge: overwriteArrayMerge },
  ) as IZIndex;

  const themeWithoutComponents: IThemeWithoutComponents = {
    themeName,
    prefix,
    breakpoints,
    colors,
    opacity,
    shadows,
    size,
    spacing,
    transition,
    typography,
    zIndex,
  };

  let components: IComponents = {
    Alert: createAlertToken(themeWithoutComponents),
    Badge: createBadgeToken(themeWithoutComponents),
    BaseMenu: createBaseMenuToken(themeWithoutComponents),
    Breadcrumbs: createBreadcrumbsToken(themeWithoutComponents),
    Button: createButtonToken(themeWithoutComponents),
    Calendar: createCalendarToken(themeWithoutComponents),
    Card: createCardToken(themeWithoutComponents),
    Carousel: createCarouselToken(themeWithoutComponents),
    Cascader: createCascaderToken(themeWithoutComponents),
    Checkbox: createCheckboxToken(themeWithoutComponents),
    DatePicker: createDatePickerToken(themeWithoutComponents),
    Dialog: createDialogToken(themeWithoutComponents),
    Dropdown: createDropdownToken(themeWithoutComponents),
    Form: createFormToken(themeWithoutComponents),
    Guide: createGuideToken(themeWithoutComponents),
    ImgCropper: createImgCropperToken(themeWithoutComponents),
    ImgPreview: createImgPreviewToken(themeWithoutComponents),
    Input: createInputToken(themeWithoutComponents),
    InputNumber: createInputNumberToken(themeWithoutComponents),
    Menu: createMenuToken(themeWithoutComponents),
    Notification: createNotificationToken(themeWithoutComponents),
    Pagination: createPaginationToken(themeWithoutComponents),
    Popconfirm: createPopconfirmToken(themeWithoutComponents),
    PopoverCard: createPopoverCardToken(themeWithoutComponents),
    Progress: createProgressToken(themeWithoutComponents),
    Radio: createRadioToken(themeWithoutComponents),
    Result: createResultToken(themeWithoutComponents),
    ScrollView: createScrollViewToken(themeWithoutComponents),
    Select: createSelectToken(themeWithoutComponents),
    Skeleton: createSkeletonToken(themeWithoutComponents),
    Spin: createSpinToken(themeWithoutComponents),
    Steps: createStepsToken(themeWithoutComponents),
    Switch: createSwitchToken(themeWithoutComponents),
    Slider: createSliderToken(themeWithoutComponents),
    Table: createTableToken(themeWithoutComponents),
    Tabs: createTabsToken(themeWithoutComponents),
    Tag: createTagToken(themeWithoutComponents),
    Tooltip: createTooltipToken(themeWithoutComponents),
    Tree: createTreeToken(themeWithoutComponents),
    TreeSelect: createTreeSelectToken(themeWithoutComponents),
    Typography: createTypographyToken(),
    Upload: createUploadToken(themeWithoutComponents),
    TimePicker: createTimePickerToken(themeWithoutComponents),
    Img: createImgToken(themeWithoutComponents),
    Collapse: createCollapseToken(themeWithoutComponents),
  };

  return {
    components,
    ...themeWithoutComponents,
  };
}

export function createThemeColors(
  argSpec: DeepPartial<IColors['spec']>,
  argPattern?: DeepPartial<IColors['pattern']>,
): IColors {
  const spec = deepmerge(colorsSpec, argSpec, {
    arrayMerge: overwriteArrayMerge,
  }) as IColors['spec'];
  const buildPattern = createColorsPattern(spec);
  let pattern = buildPattern;
  if (argPattern) {
    pattern = deepmerge(buildPattern, argPattern, {
      arrayMerge: overwriteArrayMerge,
    }) as IColors['pattern'];
  }
  return { spec, pattern };
}

export const muyaThemeLight = createThemeWithoutComponents({});

type IUpdateComponents = (newTheme: IThemeWithoutComponents) => DeepPartial<IComponents>;

export default function createTheme(
  outertheme?: DeepPartial<IThemeWithoutComponents> | IUpdateComponents,
  outerComponents?: IUpdateComponents,
): ITheme {
  let theme = muyaThemeLight;
  let updateFn = outerComponents;
  if (outertheme && typeof outertheme === 'object') {
    theme = createThemeWithoutComponents(outertheme);
  } else if (outertheme && typeof outertheme === 'function') {
    updateFn = outertheme as IUpdateComponents;
  }

  if (updateFn) {
    const { components, ...themeWithoutComponents } = theme;
    let newComponents = components;
    const outerComs = updateFn(themeWithoutComponents) as DeepPartial<IComponents>;
    newComponents = deepmerge(components, outerComs, { arrayMerge: overwriteArrayMerge });

    return {
      ...themeWithoutComponents,
      components: newComponents,
    };
  }

  return theme;
}
