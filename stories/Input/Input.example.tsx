import { useState } from 'react';
import { Input, InputProps } from '@/index';

const InputDemo = ({ variant, type, disabled }: InputProps) => {
  const [value, setValue] = useState('');
  const handleOnClear = () => {
    setValue('');
  };
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <Input
      value={value}
      variant={variant}
      type={type}
      onClear={handleOnClear}
      onChange={handleOnChange}
      disabled={disabled}
    />
  );
};
export { InputDemo };
