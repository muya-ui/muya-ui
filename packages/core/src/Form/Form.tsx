import React from 'react';
import { IFormProps } from './types';
import useForm from './useForm';
import { FormProvider, useFormContext } from './FormContext';

export default function Form<Values>(props: IFormProps<Values>) {
  const { children, formBagRef, independent = false } = props;
  const innerFormBag = useForm(props);
  const formBagFromContext = useFormContext<Values>();
  // 如果Form被嵌套在另一个Form里面, 并且没有设置independent，此时使用外层Form的数据
  const isNestedForm = !!formBagFromContext && !independent;
  const formBag = isNestedForm ? formBagFromContext : innerFormBag;

  const finalChildren = typeof children === 'function' ? children(formBag) : children;

  // 通过Ref将formBag传递出去
  React.useImperativeHandle(formBagRef, () => formBag);

  // Form嵌套情况，不需要渲染Provider和form标签
  if (isNestedForm) {
    return finalChildren;
  }

  const { handleReset, handleSubmit, formProps, style, className, autoComplete = 'off' } = formBag;
  return (
    <FormProvider value={formBag}>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        style={style}
        className={className}
        autoComplete={autoComplete}
        {...formProps}
      >
        {finalChildren}
      </form>
    </FormProvider>
  );
}
