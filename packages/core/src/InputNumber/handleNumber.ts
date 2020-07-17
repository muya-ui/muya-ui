import { isNotCompleteNumber, isValidProps } from './utils';

interface IProps {
  inputValue: string | number;
  min: number;
  max: number;
  precision: number;
}

const handleNumber = (props: IProps) => {
  const { min, max, precision, inputValue } = props;

  const toNumber = (num: string) => {
    // num.length > 16 => This is to prevent input of large numbers
    const numberIsTooLarge = num && num.length > 16;
    if (isNotCompleteNumber(num) || numberIsTooLarge) {
      return num;
    }
    if (isValidProps(precision) && precision >= 0) {
      return Math.round(Number(num) * Math.pow(10, precision)) / Math.pow(10, precision);
    }
    return Number(num);
  };

  const getValidValue = (data: string | number | undefined) => {
    if (!isValidProps(data)) return '';
    let val = parseFloat(data as string);
    if (isNaN(val)) {
      return '';
    }
    if (val < min) {
      val = min;
    }
    if (val > max) {
      val = max;
    }
    return val.toString();
  };

  const getCurrentValidValue = (value: string) => {
    let val;
    if (value === '') {
      val = '';
    } else if (!isNotCompleteNumber(parseFloat(value))) {
      val = getValidValue(value);
    } else {
      val = inputValue;
    }
    return toNumber(val!.toString());
  };

  return {
    getCurrentValidValue,
    toNumber,
    getValidValue,
  };
};

export default handleNumber;
