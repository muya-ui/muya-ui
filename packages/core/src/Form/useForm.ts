import { useEventCallback } from '@muya-ui/utils';

import Schema, { ErrorList, FieldErrorList, Rules } from 'async-validator';

import { isFunction } from 'lodash';

import React, { useCallback, useReducer, useRef } from 'react';

import {
  IFormBag,
  IFormHelpers,
  IFormProps,
  IFormState,
  IFormTouched,
  IFormItemProps,
} from './types';
import { getIn, setIn, setNestedObjectValues } from './utils';

export type IFormMessage<Values> =
  | { type: 'SUBMIT_ATTEMPT' }
  | { type: 'SUBMIT_FAILURE' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SET_ISVALIDATING'; payload: boolean }
  | { type: 'SET_ISSUBMITTING'; payload: boolean }
  | { type: 'SET_VALUES'; payload: Values }
  | { type: 'SET_FIELD_VALUE'; payload: { field: string; value?: any } }
  | { type: 'SET_FIELD_TOUCHED'; payload: { field: string; value?: boolean } }
  | { type: 'SET_FIELD_ERROR'; payload: { field: string; value?: ErrorList } }
  | { type: 'SET_TOUCHED'; payload: IFormTouched<Values> }
  | { type: 'SET_ERRORS'; payload: FieldErrorList }
  | { type: 'SET_STATUS'; payload: any }
  | { type: 'SET_FORM_STATE'; payload: IFormState<Values> }
  | { type: 'RESET_FORM'; payload: IFormState<Values> };

// State reducer
function formReducer<Values>(state: IFormState<Values>, msg: IFormMessage<Values>) {
  switch (msg.type) {
    case 'SET_VALUES':
      return { ...state, values: msg.payload };
    case 'SET_TOUCHED':
      return { ...state, touched: msg.payload };
    case 'SET_ERRORS':
      return { ...state, errors: msg.payload };
    case 'SET_STATUS':
      return { ...state, status: msg.payload };
    case 'SET_ISSUBMITTING':
      return { ...state, isSubmitting: msg.payload };
    case 'SET_ISVALIDATING':
      return { ...state, isValidating: msg.payload };
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: setIn(state.values, msg.payload.field, msg.payload.value),
      };
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        touched: setIn(state.touched, msg.payload.field, msg.payload.value),
      };
    case 'SET_FIELD_ERROR': {
      const newErrors = {
        ...state.errors,
        [msg.payload.field]: msg.payload.value,
      };
      return {
        ...state,
        errors: newErrors as FieldErrorList,
      };
    }
    case 'RESET_FORM':
    case 'SET_FORM_STATE':
      return { ...state, ...msg.payload };
    case 'SUBMIT_ATTEMPT':
      return {
        ...state,
        touched: setNestedObjectValues<IFormTouched<Values>>(state.values, true),
        isSubmitting: true,
        submitCount: state.submitCount + 1,
      };
    case 'SUBMIT_FAILURE':
      return {
        ...state,
        isSubmitting: false,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
}

// Initial empty states // objects
const emptyErrors: FieldErrorList = {};
const emptyTouched: IFormTouched<unknown> = {};
const emptyValues = {};

export default function useForm<Values>(props: IFormProps<Values>): IFormBag<Values> {
  const {
    onChange,
    values: valuesProp,
    defaultValues = emptyValues as Values,
    defaultErrors = emptyErrors,
    defaultTouched = emptyTouched,
    defaultStatus,
    validateOnBlur = true,
    validateOnChange = true,
    onSubmit,
    onReset,
    children,
  } = props;
  const defaultValuesRef = useRef(defaultValues);
  const defaultErrorsRef = useRef(defaultErrors);
  const defaultTouchedRef = useRef(defaultTouched);
  const defaultStatusRef = useRef(defaultStatus);
  const isControlled = 'values' in props;

  const [state, dispatch] = useReducer<React.Reducer<IFormState<Values>, IFormMessage<Values>>>(
    formReducer,
    {
      values: defaultValues,
      errors: defaultErrors,
      touched: defaultTouched,
      isSubmitting: false,
      isValidating: false,
      submitCount: 0,
      status: defaultStatus,
    },
  );

  const fieldRules = useRef<Rules>({});
  const fieldProps = useRef<Record<string, IFormItemProps<Values>>>({});
  // 受控模式情况使用props中的values，非受控使用state.values
  const currentValues = isControlled && valuesProp ? valuesProp : state.values;

  const resetForm = useEventCallback(
    (nextState?: Partial<IFormState<Values>>) => {
      const values = nextState && nextState.values ? nextState.values : defaultValuesRef.current;
      const errors =
        nextState && nextState.errors
          ? nextState.errors
          : defaultErrorsRef.current
          ? defaultErrorsRef.current
          : defaultErrors || {};
      const touched =
        nextState && nextState.touched
          ? nextState.touched
          : defaultTouchedRef.current
          ? defaultTouchedRef.current
          : defaultTouched || {};
      const status =
        nextState && nextState.status
          ? nextState.status
          : defaultStatusRef.current
          ? defaultStatusRef.current
          : defaultStatus;
      defaultValuesRef.current = values;
      defaultErrorsRef.current = errors;
      defaultTouchedRef.current = touched;
      defaultStatusRef.current = status;

      dispatch({
        type: 'RESET_FORM',
        payload: {
          isSubmitting: !!nextState && !!nextState.isSubmitting,
          errors,
          touched,
          status,
          values,
          isValidating: !!nextState && !!nextState.isValidating,
          submitCount:
            !!nextState && !!nextState.submitCount && typeof nextState.submitCount === 'number'
              ? nextState.submitCount
              : 0,
        },
      });

      onChange && onChange(values, helpers);
    },
    [defaultErrors, defaultTouched, defaultStatus, onChange],
  );

  const registerFieldRules = useCallback((name: string, rule: Rules[string]) => {
    fieldRules.current[name] = rule;
  }, []);

  const unregisterFieldRules = useCallback((name: string) => {
    delete fieldRules.current[name];
  }, []);

  const registerFieldProps = useCallback((name: string, props: IFormItemProps<Values>) => {
    fieldProps.current[name] = props;
  }, []);

  const unregisterFieldProps = useCallback((name: string) => {
    delete fieldProps.current[name];
  }, []);

  const setStatus = useCallback((status: any) => {
    dispatch({ type: 'SET_STATUS', payload: status });
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: 'SET_ISSUBMITTING', payload: isSubmitting });
  }, []);

  const setErrors = useCallback((errors: FieldErrorList) => {
    dispatch({ type: 'SET_ERRORS', payload: errors });
  }, []);

  const setFieldError = useCallback((field: string, value?: ErrorList) => {
    dispatch({
      type: 'SET_FIELD_ERROR',
      payload: { field, value },
    });
  }, []);

  // 表单整体校验
  const validateForm = useEventCallback(
    (newValues?: Values) => {
      const values = newValues || currentValues;
      dispatch({ type: 'SET_ISVALIDATING', payload: true });
      // 校验所有已注册过Rule的Field
      const allValues: Record<string, any> = {};
      Object.keys(fieldRules.current).forEach(field => {
        const value = getIn(values, field);
        allValues[field] = value;
      });
      const validator = new Schema(fieldRules.current);
      return validator.validate(allValues, {}, (_errors, fieldErrors) => {
        dispatch({ type: 'SET_ISVALIDATING', payload: false });
        setErrors(fieldErrors || {});
      });
    },
    [currentValues, setErrors],
  );

  // 校验单个表单项
  const validateField = useEventCallback(
    (field: string, outerValue?: any) => {
      const rule = fieldRules.current[field];
      const currentFieldProps = fieldProps.current[field];
      const validateFirst = currentFieldProps ? currentFieldProps.validateFirst : false;
      const value = outerValue === undefined ? getIn(currentValues, field) : outerValue;
      if (rule) {
        dispatch({ type: 'SET_ISVALIDATING', payload: true });
        const validator = new Schema({ [field]: rule });
        return validator.validate({ [field]: value }, { first: validateFirst }, errors => {
          dispatch({ type: 'SET_ISVALIDATING', payload: false });
          setFieldError(field, errors);
        });
      }
      return Promise.resolve();
    },
    [currentValues],
  );

  const setTouched = useCallback(
    (touched: IFormTouched<Values>) => {
      dispatch({ type: 'SET_TOUCHED', payload: touched });
      if (validateOnBlur) {
        validateForm();
      }
    },
    [validateForm, validateOnBlur],
  );

  const setValues = useEventCallback(
    (values: Values, shouldValidate: boolean = true) => {
      dispatch({ type: 'SET_VALUES', payload: values });
      onChange && onChange(values, helpers);
      if (validateOnChange && shouldValidate) {
        validateForm(values);
      }
    },
    [onChange, validateOnChange, validateForm],
  );

  const setFieldValue = useEventCallback(
    (field: string, value: any, shouldValidate: boolean = true) => {
      dispatch({
        type: 'SET_FIELD_VALUE',
        payload: {
          field,
          value,
        },
      });
      onChange && onChange(setIn(currentValues, field, value), helpers, field, value);
      return validateOnChange && shouldValidate ? validateField(field, value) : Promise.resolve();
    },
    [currentValues, onChange, validateField, validateOnChange],
  );

  const setFieldTouched = useCallback(
    (field: string, touched: boolean = true, shouldValidate: boolean = true) => {
      dispatch({
        type: 'SET_FIELD_TOUCHED',
        payload: {
          field,
          value: touched,
        },
      });
      return validateOnBlur && shouldValidate ? validateField(field) : Promise.resolve();
    },
    [validateField, validateOnBlur],
  );

  const helpers: IFormHelpers<Values> = {
    resetForm,
    validateForm,
    validateField,
    setErrors,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    setStatus,
    setSubmitting,
    setTouched,
    setValues,
    registerFieldRules,
    unregisterFieldRules,
    registerFieldProps,
    unregisterFieldProps,
  };

  const submitForm = useCallback(() => {
    dispatch({ type: 'SUBMIT_ATTEMPT' });
    return validateForm()
      .then(() => {
        dispatch({ type: 'SUBMIT_SUCCESS' });
        onSubmit && onSubmit(currentValues, helpers);
      })
      .catch(() => {
        dispatch({ type: 'SUBMIT_FAILURE' });
      });
  }, [currentValues, helpers, onSubmit, validateForm]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (e && e.preventDefault && isFunction(e.preventDefault)) {
        e.preventDefault();
      }

      if (e && e.stopPropagation && isFunction(e.stopPropagation)) {
        e.stopPropagation();
      }

      return submitForm();
    },
    [submitForm],
  );

  const handleReset = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (e && e.preventDefault && isFunction(e.preventDefault)) {
        e.preventDefault();
      }

      if (e && e.stopPropagation && isFunction(e.stopPropagation)) {
        e.stopPropagation();
      }

      if (onReset) {
        onReset(currentValues, helpers);
      }
      resetForm();
    },
    [currentValues, helpers, onReset, resetForm],
  );

  return {
    ...state,
    ...helpers,
    ...props,
    handleReset,
    handleSubmit,
    children,
    defaultStatus: defaultStatusRef.current,
    defaultErrors: defaultErrorsRef.current,
    defaultTouched: defaultTouchedRef.current,
    defaultValues: defaultValuesRef.current,
    validateOnBlur,
    validateOnChange,
    onSubmit,
    onReset,
  };
}
