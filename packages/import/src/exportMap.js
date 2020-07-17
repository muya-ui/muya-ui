/**
 * 存储每个包特殊的导出映射关系
 */
module.exports = {
  '@muya-ui/utils': {
    setRef: 'hooks/useForkRef',
    forkRef: 'hooks/useForkRef',
    setCanWebp: 'utils/checkWebp',
    setHasCheck: 'utils/checkWebp',
    aliSuffixCore: 'utils/imgSuffix',
    aliSuffix: 'utils/imgSuffix',
    kssSuffix: 'utils/imgSuffix',
    getRectValue: 'utils/rectIntersect',
    initRectIntersectContainer: 'utils/rectIntersect',
    setRectIntersectContainer: 'utils/rectIntersect',
  },
  '@muya-ui/theme-light': {
    createThemeColors: 'theme',
    StyledSvg: 'components/SvgIcon',
    SvgIcon: 'components/SvgIcon',
    breakpointKeys: 'utils',
  },
  '@muya-ui/core': {
    useTheme: 'utils/useTheme',
    withTheme: 'utils/withTheme',
    withThemeForStyled: 'utils/withTheme',
    useStyles: 'utils/useStyles',
    portalUtils: 'Portal',
    LoopSwipe: 'Swipe',
    useSwipe: 'Swipe',
    useLoopSwipe: 'Swipe',
    withAnimation: 'Animation',
    AutoCompleteItem: 'AutoComplete',
    ButtonGroup: 'Button',
    MaskButton: 'Button',
    InlineButton: 'Button',
    RangeCalendar: 'Calendar',
    calendarUtils: 'Calendar',
    PagerButton: 'Carousel',
    IndexIndicator: 'Carousel',
    CheckboxGroup: 'Checkbox',
    RangeDatePicker: 'DatePicker',
    DropdownButton: 'Dropdown',
    Col: 'Grid',
    Row: 'Grid',
    ImgPool: 'Img',
    ImgPoolContext: 'Img',
    ImgPoolProvider: 'Img',
    ImgContainer: 'Img',
    useImg: 'Img',
    ImgPure: 'Img',
    ImgDiv: 'Img',
    ImgSpan: 'Img',
    Picture: 'Img',
    ImgImg: 'Img',
    RangeInput: 'Input',
    TagsInput: 'Input',
    inputUtils: 'Input',
    MenuDivider: 'Menu',
    MenuItem: 'Menu',
    MenuItemGroup: 'Menu',
    SubMenu: 'Menu',
    ExpireQueue: 'Notification',
    ToastItem: 'Notification',
    NotificationItem: 'Notification',
    notification: 'Notification',
    NotificationList: 'Notification',
    RadioGroup: 'Radio',
    Option: 'Select',
    OptionGroup: 'Select',
    OptionDivider: 'Select',
    Step: 'Steps',
    RangeSlider: 'Slider',
    Tab: 'Tabs',
    CheckableTag: 'Tag',
    UploadCard: 'Upload',
    UploadResult: 'Upload',
    FormItem: 'Form',
    useForm: 'Form',
    FormProvider: 'Form',
    FormConsumer: 'Form',
    useFormContext: 'Form',
    useUpload: 'Upload',
    postFile: 'Upload',
    Card: 'Card',
    CheckBoxCard: 'Card',
    CardWrapper: 'Card',
    CommonCard: 'Card',
    useLocale: 'Locale/useLocale',
    LocaleProvider: 'Locale/LocaleProvider',
  },
  '@muya-ui/theme-dark': {},
};
