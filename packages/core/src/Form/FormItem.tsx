import { ValidateError } from 'async-validator';
import { isNaN } from 'lodash';
import React, { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useForkRef, usePrevious } from '@muya-ui/utils';
import { SelectIcon, CloseIcon } from '@muya-ui/theme-light';

import Animation from '../Animation';
import { isNotCompleteNumber } from '../InputNumber/utils';
import { Omit } from '../types';
import Typography from '../Typography';
import addPx from '../utils/addPx';
import mergeStyleItem from '../utils/mergeStyleItem';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';

import { useFormContext } from './FormContext';
import {
  StyledError,
  StyledFormItem,
  StyledInnerLabel,
  StyledInputWrapper,
  StyledLabel,
  StyledRequiredWrapper,
} from './styled';
import {
  IFormBag,
  IFormItemProps,
  IFormInstantEditingConfig,
  IFormInstantEditingRenderProps,
} from './types';
import { getIn } from './utils';
import Space from '../Space';
import Button from '../Button';
import Spin from '../Spin';

function defaultGetValueFromEvent(e: any) {
  if (!e || !e.target) {
    return e;
  }
  const { target } = e;
  return target.type === 'checkbox' ? target.checked : target.value;
}

function defaultInstantEditingContentRender(value: any) {
  return <Typography.Text>{String(value)}</Typography.Text>;
}

function defaultInstantEditingRender(props: IFormInstantEditingRenderProps) {
  const {
    layout,
    inputNode,
    validating,
    isEditing,
    value,
    size,
    confirm,
    cancel,
    edit,
    renderContent,
  } = props;
  return (
    <>
      <Space
        style={{
          alignItems: layout === 'vertical' ? 'flex-end' : 'center',
          display: isEditing ? undefined : 'none',
        }}
        direction={layout}
      >
        {inputNode}
        <Space>
          {validating ? (
            <Spin />
          ) : (
            <>
              <Button onClick={confirm} size={size} shape="square">
                <SelectIcon />
              </Button>
              <Button onClick={cancel} size={size} shape="square">
                <CloseIcon />
              </Button>
            </>
          )}
        </Space>
      </Space>
      <div
        style={{
          display: !isEditing ? undefined : 'none',
        }}
        onClick={edit}
      >
        {renderContent(value)}
      </div>
    </>
  );
}

export function getValueFromInputNumberEvent(s: string, n: number) {
  return isNotCompleteNumber(s) || isNaN(n) ? s : n;
}

interface IFormItemMemoProps<Values>
  extends Omit<IFormItemProps<Values>, 'values'>,
    Pick<
      IFormBag<Values>,
      | 'setFieldTouched'
      | 'setFieldValue'
      | 'size'
      | 'hasFeedback'
      | 'status'
      | 'registerFieldRules'
      | 'unregisterFieldRules'
      | 'registerFieldProps'
      | 'unregisterFieldProps'
      | 'requiredTipAlignLeft'
      | 'noError'
      | 'validateField'
      | 'setFieldError'
      | 'inlineSpacing'
    > {
  currentValue?: any;
  currentError?: ValidateError[];
  id?: string;
  instantEditing?: IFormInstantEditingConfig;
}

const FormItemMemo = React.memo(function FormItemPure(props: IFormItemMemoProps<any>) {
  const theme = useTheme();
  const { requiredTip, defaultLabelWidth } = theme.components.Form;
  const {
    getValueFromEvent: getValueFromEventProp,
    hideRequiredTip = false,
    validateOnBlur = true,
    validateOnChange = true,
    valuePropName = 'value',
    trigger = 'onChange',
    inline = false,
    hasFeedback = false,
    labelWidth = defaultLabelWidth,
    size = 'm',
    labelPosition = 'right',
    children,
    styles,
    label,
    rule,
    name,
    currentError,
    currentValue,
    instantEditing,
    inlineSpacing = theme.components.Form.inlineFormItemMarginRight[size],

    // formBag
    setFieldTouched,
    setFieldValue,
    normalize,
    id,
    status,
    requiredTipAlignLeft,
    registerFieldRules,
    unregisterFieldRules,
    unregisterFieldProps,
    registerFieldProps,
    validateField,
    setFieldError,
    noError,
    ...other
  } = props;

  const prevError = usePrevious(currentError);
  const [isEditing, setIsEditing] = useState(false);
  const [instantEditingValue, setInstantEditingValue] = useState(currentValue);
  const [instantValidating, setInstantValidating] = useState(false);
  const instantEditingWrapperRef = useRef<HTMLDivElement | null>(null);
  const finalError = currentError || prevError;
  const inputRef = useRef<any>();
  const handleRef = useForkRef(inputRef, children.ref);

  // 某些自定义的组件，原生label的点击行为无法与之联动，此处手动调用它的click、focus方法
  const handleLabelClick = useCallback(() => {
    if (!inputRef.current) return;
    if (typeof inputRef.current.click === 'function') {
      inputRef.current.click();
    } else if (typeof inputRef.current.focus === 'function') {
      inputRef.current.focus();
    }
  }, []);

  const handleInstantEditingConfirm = useCallback(() => {
    if (!name) return;
    setInstantValidating(true);
    validateField(name, instantEditingValue)
      .then(() => {
        setFieldValue(name, instantEditingValue, false);
        setIsEditing(false);
        setInstantValidating(false);
      })
      .catch(() => {
        setInstantValidating(false);
      });
  }, [name, setFieldValue, instantEditingValue, validateField]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleInstantEditingCancel = useCallback(() => {
    if (!name) return;
    setIsEditing(false);
    setInstantEditingValue(currentValue);
    setFieldError(name);
  }, [currentValue, name, setFieldError]);

  const defaultStyles = useMemo(
    () => ({
      error: '',
      errorParagraph: '',
      label: '',
      innerLabel: '',
      inputWrapper: '',
      requiredWrapper: '',
    }),
    [],
  );

  const getValueFromEvent = useMemo(() => {
    if (getValueFromEventProp) {
      // 优先使用传入的方法
      return getValueFromEventProp;
    }
    if (children && children.type && children.type.__MUYA_INPUTNUMBER) {
      // InputNumber
      return getValueFromInputNumberEvent;
    }
    return defaultGetValueFromEvent;
  }, [children, getValueFromEventProp]);

  const innerStyles = useStyles('formitem', defaultStyles, styles);

  // inline模式下 & 外部没有传label，则不渲染label容器
  // 非inline模式下，总是渲染label容器，因为垂直方向需要保持左对齐
  const inlineAndNoLabel = inline && !label;

  const {
    onChange,
    onBlur,
  }: { onChange?: (...args: any[]) => void; onBlur?: (e: React.MouseEvent) => void } =
    children.props || {};

  const handleBlur = useCallback(
    (e: React.MouseEvent) => {
      if (name) {
        if (instantEditing) {
          setFieldTouched(name, true, false);
          if (validateOnBlur) {
            validateField(name, instantEditingValue);
          }
        } else {
          setFieldTouched(name, true, validateOnBlur);
        }
      }
      if (onBlur) {
        onBlur(e);
      }
    },
    [
      name,
      instantEditing,
      validateOnBlur,
      instantEditingValue,
      onBlur,
      setFieldTouched,
      validateField,
    ],
  );

  const handleChange = useCallback(
    (...rest) => {
      let value = getValueFromEvent(...rest);
      if (normalize) {
        value = normalize(value, currentValue);
      }

      if (isNaN(value)) {
        value = '';
      }

      if (instantEditing) {
        setInstantEditingValue(value);
        if (validateOnChange) {
          validateField(name, value);
        }
      } else if (name) {
        setFieldValue(name, value, validateOnChange);
      }

      if (onChange) {
        onChange(...rest);
      }
    },
    [
      currentValue,
      getValueFromEvent,
      instantEditing,
      name,
      normalize,
      onChange,
      setFieldValue,
      validateField,
      validateOnChange,
    ],
  );

  const isRequire = rule
    ? Array.isArray(rule)
      ? rule.some(r => r.required)
      : rule.required || false
    : false;

  const requiredTipNode = useMemo(() => {
    if (!isRequire || hideRequiredTip || !name) {
      if (requiredTipAlignLeft) {
        const styleItem = mergeStyleItem(
          { style: { visibility: 'hidden' } },
          innerStyles.requiredWrapper,
        );
        return <StyledRequiredWrapper {...styleItem}>{requiredTip}</StyledRequiredWrapper>;
      } else {
        return null;
      }
    }
    return (
      <StyledRequiredWrapper {...innerStyles.requiredWrapper}>{requiredTip}</StyledRequiredWrapper>
    );
  }, [
    hideRequiredTip,
    innerStyles.requiredWrapper,
    isRequire,
    name,
    requiredTip,
    requiredTipAlignLeft,
  ]);

  const labelWithoutName = useMemo(
    () => (
      <StyledLabel {...innerStyles.label}>
        {requiredTipNode}
        {label}
      </StyledLabel>
    ),
    [innerStyles.label, label, requiredTipNode],
  );

  const labelWithName = useMemo(() => {
    return (
      <StyledLabel {...innerStyles.label} htmlFor={id} onClick={handleLabelClick}>
        <StyledInnerLabel {...innerStyles.innerLabel}>
          {requiredTipNode}
          {label}
        </StyledInnerLabel>
      </StyledLabel>
    );
  }, [handleLabelClick, id, innerStyles.innerLabel, innerStyles.label, label, requiredTipNode]);

  const memoErrorNode = useMemo(() => {
    if (noError) {
      return null;
    }
    return (
      <StyledError {...innerStyles.error}>
        <Animation.Slide in={!!currentError}>
          <div>
            {/*
            内容方面，当前错误不存在的情况下，使用上次的错误数据
            这么做是为了错误消失时的动画
          */}
            {finalError &&
              finalError.map(e => (
                <Typography.Paragraph {...innerStyles.errorParagraph} type="error" key={e.message}>
                  {e.message}
                </Typography.Paragraph>
              ))}
          </div>
        </Animation.Slide>
      </StyledError>
    );
  }, [currentError, finalError, innerStyles.error, innerStyles.errorParagraph, noError]);

  const inputChildren = useMemo(() => {
    if (name) {
      const childProps = {
        size,
        id,
        ref: handleRef,
        status: status || currentError ? 'error' : undefined,
        ...children.props,
        [trigger]: handleChange,
        [valuePropName]: currentValue,
        onBlur: handleBlur,
      };

      if (
        children.type &&
        (children.type.__MUYA_INPUT ||
          children.type.__MUYA_INPUTNUMBER ||
          children.type.__MUYA_SELECT ||
          children.type.__MUYA_AUTOCOMPLETE ||
          children.type.__MUYA_CASCADER ||
          children.type.__MUYA_TREESELECT ||
          children.type.__MUYA_DATEPICKER ||
          children.type.__MUYA_TIMEPICKER)
      ) {
        childProps.hasFeedback = hasFeedback;
      }

      if (instantEditing) {
        const {
          renderContent = defaultInstantEditingContentRender,
          render = defaultInstantEditingRender,
          layout = 'horizontal',
        } = instantEditing;
        childProps[valuePropName] = instantEditingValue;
        const inputNode = cloneElement(children, childProps);
        return (
          <>
            <StyledInputWrapper {...innerStyles.inputWrapper}>
              {inlineAndNoLabel ? null : labelWithName}
              <div ref={instantEditingWrapperRef}>
                {render({
                  inputNode,
                  validating: instantValidating,
                  value: currentValue,
                  isEditing,
                  layout,
                  size,
                  renderContent,
                  cancel: handleInstantEditingCancel,
                  confirm: handleInstantEditingConfirm,
                  edit: handleEdit,
                })}
              </div>
            </StyledInputWrapper>
            {memoErrorNode}
          </>
        );
      }

      return (
        <>
          <StyledInputWrapper {...innerStyles.inputWrapper}>
            {inlineAndNoLabel ? null : labelWithName}
            {cloneElement(children, childProps)}
          </StyledInputWrapper>
          {memoErrorNode}
        </>
      );
    }
    return (
      <StyledInputWrapper {...innerStyles.inputWrapper}>
        {inlineAndNoLabel ? null : labelWithoutName}
        {children}
      </StyledInputWrapper>
    );
  }, [
    name,
    innerStyles.inputWrapper,
    inlineAndNoLabel,
    labelWithoutName,
    children,
    size,
    id,
    handleRef,
    status,
    currentError,
    trigger,
    handleChange,
    valuePropName,
    currentValue,
    handleBlur,
    instantEditing,
    labelWithName,
    memoErrorNode,
    hasFeedback,
    instantEditingValue,
    instantValidating,
    isEditing,
    handleInstantEditingCancel,
    handleInstantEditingConfirm,
    handleEdit,
  ]);

  // 注册校验规则
  useEffect(() => {
    if (rule && name) {
      registerFieldRules(name, rule);
      registerFieldProps(name, props);
    }

    return () => {
      if (rule && name) {
        unregisterFieldRules(name);
        unregisterFieldProps(name);
      }
    };
  }, [name, props, registerFieldProps, registerFieldRules, rule, unregisterFieldProps, unregisterFieldRules]);

  useEffect(() => {
    const handleClickAway = (e: any) => {
      if (
        document.documentElement &&
        document.documentElement.contains(e.target) &&
        instantEditingWrapperRef.current &&
        !instantEditingWrapperRef.current.contains(e.target)
      ) {
        handleInstantEditingCancel();
      }
    };
    if (instantEditing && !instantEditing.disableClickAway) {
      document.addEventListener('click', handleClickAway);
    }
    return () => {
      if (instantEditing && !instantEditing.disableClickAway) {
        document.removeEventListener('click', handleClickAway);
      }
    };
  }, [handleInstantEditingCancel, instantEditing]);

  return (
    <StyledFormItem
      $inline={inline}
      $labelPosition={labelPosition}
      $labelWidth={addPx(labelWidth)}
      $size={size}
      $theme={theme}
      $inlineAndNoLabel={inlineAndNoLabel}
      $inlineSpacing={inlineSpacing}
      {...other}
    >
      {inputChildren}
    </StyledFormItem>
  );
});

export default function FormItem<Values>(props: IFormItemProps<Values>) {
  const formBag = useFormContext<Values>();

  const {
    id: idProp,
    inline: inlineProp,
    labelPosition,
    labelWidth,
    name,
    noError: noErrorProp,
    instantEditing: instantEditingProp,
    inlineSpacing: inlineSpacingProp,
    ...other
  } = props;

  const {
    setFieldTouched,
    setFieldValue,
    registerFieldRules,
    unregisterFieldRules,
    registerFieldProps,
    unregisterFieldProps,
    validateField,
    setFieldError,
    hasFeedback,
    size,
    status,
    values,
    errors,
    labelPosition: outerLabelPosition,
    requiredTipAlignLeft = false,
    labelWidth: outerLabelWidth,
    inline: outerInline,
    instantEditing: outerInstantEditing,
    inlineSpacing: outerInlineSpacing,
    noError,
  } = formBag;

  const getInstantEditingConfig = useCallback(
    (instantEditing?: IFormInstantEditingConfig | boolean) => {
      if (typeof instantEditing === 'boolean') {
        if (instantEditing) {
          return {};
        }
        return undefined;
      }
      return instantEditing;
    },
    [],
  );
  const finalLabelWidth =
    typeof labelWidth === 'number' ? labelWidth : labelWidth || outerLabelWidth;
  const inlineSpacing =
    typeof inlineSpacingProp === 'number' ? inlineSpacingProp : outerInlineSpacing;
  const finalLabelPosition = labelPosition || outerLabelPosition;
  const inline = inlineProp || outerInline;
  const currentError = name ? errors[name] : undefined;
  const id = idProp || name;
  const finalNoError = noErrorProp || noError;
  const finalInstantEditing = useMemo(() => {
    const outerInstantEditingConfig = getInstantEditingConfig(outerInstantEditing);
    const instantEditingPropConfig = getInstantEditingConfig(instantEditingProp);
    if (outerInstantEditingConfig || instantEditingPropConfig) {
      return {
        ...outerInstantEditingConfig,
        ...instantEditingPropConfig,
      };
    }
    return;
  }, [getInstantEditingConfig, instantEditingProp, outerInstantEditing]);

  return (
    <FormItemMemo
      id={id}
      name={name}
      currentValue={name && getIn(values, name)}
      currentError={currentError}
      labelWidth={finalLabelWidth}
      labelPosition={finalLabelPosition}
      inline={inline}
      setFieldTouched={setFieldTouched}
      setFieldValue={setFieldValue}
      registerFieldRules={registerFieldRules}
      unregisterFieldRules={unregisterFieldRules}
      registerFieldProps={registerFieldProps as any}
      unregisterFieldProps={unregisterFieldProps}
      validateField={validateField}
      setFieldError={setFieldError}
      requiredTipAlignLeft={requiredTipAlignLeft}
      instantEditing={finalInstantEditing}
      size={size}
      hasFeedback={hasFeedback}
      status={status}
      noError={finalNoError}
      inlineSpacing={inlineSpacing}
      {...other}
    />
  );
}
