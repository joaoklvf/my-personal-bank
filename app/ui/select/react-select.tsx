import React from 'react';
import Select, { StylesConfig, Props } from 'react-select';
import { SelectComponentProps } from './select-type';

type ReactSelectProps<T> = SelectComponentProps<T> & Omit<Props<T>, "options">


const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const ReactSelectComponent = <T,>({ dataLabel, dataValue, dataBackGroundColor, dataColor, options, ...props }: ReactSelectProps<T>) => {
  const colourStyles: StylesConfig<T> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', borderColor: 'rgb(229 231 235)' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? undefined : data[dataBackGroundColor!] as string,
        color: isDisabled ? '#ccc' : data[dataColor!] as string,
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data[dataBackGroundColor!] as string) }),
  };

  return <Select
    options={options ?? []}
    styles={colourStyles}
    getOptionLabel={(data) => data[dataLabel] as string}
    getOptionValue={(data) => data[dataValue] as string}
    placeholder={'Selecione'}
    instanceId={props.id}
    {...props}
  />;
};