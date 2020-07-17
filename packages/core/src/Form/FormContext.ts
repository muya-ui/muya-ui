import { createContext, useContext } from 'react';
import { IFormBag } from './types';

const PrivateFormContext = createContext<IFormBag<any>>(undefined as any);
export const FormProvider = PrivateFormContext.Provider;
export const FormConsumer = PrivateFormContext.Consumer;

export function useFormContext<Values>() {
  const formBag = useContext<IFormBag<Values>>(PrivateFormContext);

  return formBag;
}
