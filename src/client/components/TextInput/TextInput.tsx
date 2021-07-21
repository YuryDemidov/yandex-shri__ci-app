import React, { useState } from 'react';

import { Button } from '../Button/Button';
import { SvgIcon } from '../Svg/SvgIcon';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './TextInput.module.scss';

interface TextInputProps {
  id: string;
  className?: string;
  name: string;
  initialValue?: string;
  type?: string;
  labelTextBefore: string;
  labelTextAfter?: string;
  placeholder?: string;
  isRequired?: boolean;
  hasClearButton?: boolean;
}

export const TextInput = ({
  id,
  className,
  name,
  initialValue = '',
  type = 'text',
  labelTextBefore,
  labelTextAfter,
  placeholder,
  isRequired,
  hasClearButton,
}: TextInputProps): JSX.Element => {
  const [value, setValue] = useState(`${initialValue}`);

  useStyles(styles);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const clearInput = () => {
    setValue('');
  };

  return (
    <div className={`text-input${isRequired ? ' text-input_required' : ''}${className ? ` ${className}` : ''}`}>
      <label className="text-input__label text-input__label_before" htmlFor={id}>
        {labelTextBefore}
      </label>
      <div className="text-input__wrap">
        <input
          id={id}
          className={`text-input__input${hasClearButton ? ' text-input__input_clear-button' : ''}`}
          name={name}
          value={value}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          required={isRequired}
          onChange={handleChange}
        />
        {hasClearButton && value.trim().length ? (
          <Button
            content={<SvgIcon id={`icon-clear`} width={16} height={16} />}
            modifiers={['clear']}
            ariaLabel="Clear input"
            clickHandler={clearInput}
          />
        ) : null}
      </div>
      {labelTextAfter && (
        <label className="text-input__label" htmlFor={id}>
          {labelTextAfter}
        </label>
      )}
    </div>
  );
};
