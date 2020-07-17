import { renderHook, act } from '@testing-library/react-hooks';
import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';
import useForm from './useForm';
import { IFormProps } from './types';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});

const defaultValues = { name: 'ww' };
interface Values {
  name: string;
}
describe('useForm', () => {
  test('should return correct state', () => {
    const { result } = renderHook((props: IFormProps<Values> = {}) => useForm(props));
    expect(result.current.values).toEqual({});
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isValidating).toBe(false);
    expect(result.current.submitCount).toBe(0);
    expect(result.current.status).toBe(undefined);
  });

  test('test helpers', () => {
    const onChange = sinon.spy();
    const { result } = renderHook((props: IFormProps<Values> = {}) =>
      useForm({
        ...props,
        onChange,
      }),
    );
    act(() => {
      result.current.setSubmitting(true);
      result.current.setStatus('error');
      result.current.setTouched({ name: true });
      result.current.setFieldTouched('name', false);
      result.current.setFieldTouched('name', undefined, false);
      result.current.setFieldValue('name', 'set');
      result.current.setFieldValue('name', 'set', false);
    });
    expect(onChange.called).toBe(true);
    expect(result.current.isSubmitting).toBe(true);
    expect(result.current.status).toBe('error');
    expect(result.current.touched.name).toBe(true);
    expect(result.current.values.name).toBe('set');
  });

  test('should accept defaultValue to be state.values', () => {
    const { result } = renderHook((props: IFormProps<Values> = {}) =>
      useForm({
        defaultValues,
        ...props,
      }),
    );
    expect(result.current.values).toEqual(defaultValues);
  });

  test('should reset form state', () => {
    const { result, rerender } = renderHook((props: IFormProps<Values> = {}) =>
      useForm({
        defaultValues,
        ...props,
      }),
    );
    act(() => {
      result.current.setValues({
        name: 'other',
      });
    });
    rerender({ validateOnChange: false });
    act(() => {
      result.current.setValues({
        name: 'other',
      });
    });
    act(() => {
      result.current.setFieldError('name', [
        {
          message: 'name has error',
          field: 'name',
        },
      ]);
    });
    expect(result.current.values).toEqual({ name: 'other' });
    expect(result.current.errors.name).toEqual([
      {
        message: 'name has error',
        field: 'name',
      },
    ]);

    // Reset Form
    act(() => {
      result.current.resetForm();
    });
    expect(result.current.values).toEqual(defaultValues);
    expect(result.current.errors).toEqual({});

    // Reset Form with new State
    act(() => {
      result.current.resetForm({
        values: {
          name: 'reset',
        },
        touched: {
          name: true,
        },
        errors: {
          name: [
            {
              message: 'name has error',
              field: 'name',
            },
          ],
        },
        submitCount: 1,
        status: 'error',
      });
    });

    expect(result.current.values).toEqual({ name: 'reset' });
    expect(result.current.errors.name).toEqual([
      {
        message: 'name has error',
        field: 'name',
      },
    ]);
    expect(result.current.touched.name).toBe(true);
    expect(result.current.status).toBe('error');
    expect(result.current.submitCount).toBe(1);

    act(() => {
      result.current.resetForm({
        submitCount: '',
      });
    });
    expect(result.current.submitCount).toBe(0);
  });

  test('test form validation', async () => {
    const { result } = renderHook((props: IFormProps<Values> = {}) =>
      useForm({
        ...props,
        defaultValues,
      }),
    );
    const errorObj = {
      fields: {
        name: [{ field: 'name', message: 'namerequired' }],
      },
      errors: [{ field: 'name', message: 'namerequired' }],
    };
    act(() => {
      result.current.registerFieldRules('name', {
        type: 'string',
        required: true,
        message: 'namerequired',
      });
    });
    await expect(result.current.validateField('name')).resolves.toBe(undefined);
    await expect(result.current.validateForm()).resolves.toBe(undefined);
    act(() => {
      result.current.setFieldValue('name', '');
    });

    await expect(result.current.validateField('name')).rejects.toEqual(errorObj);
    await expect(result.current.validateForm()).rejects.toEqual(errorObj);
  });

  test('test form submit', async () => {
    const onSubmit = sinon.spy();
    const onReset = sinon.spy();
    const e = {
      preventDefault() {},
      stopPropagation() {},
    };
    const { result } = renderHook((props: IFormProps<Values> = {}) =>
      useForm({
        ...props,
        defaultValues,
        onSubmit,
        onReset,
      }),
    );
    act(() => {
      result.current.registerFieldRules('name', {
        type: 'string',
        required: true,
        message: 'namerequired',
      });
    });
    await expect(result.current.handleSubmit(e)).resolves.toBe(undefined);
    expect(result.current.submitCount).toBe(1);
    expect(onSubmit.calledOnce).toBe(true);
    act(() => {
      result.current.setFieldValue('name', '');
    });
    await result.current.handleSubmit(e);
    expect(result.current.submitCount).toBe(2);
    expect(onSubmit.calledTwice).toBe(false);

    result.current.handleReset(e);
    expect(result.current.values).toEqual(defaultValues);
    expect(onReset.calledOnce).toBe(true);
  });
});
