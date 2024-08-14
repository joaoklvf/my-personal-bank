import { formatDecimal, removePointsFromDecimalString } from "@/app/lib/utils";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "type">

type MaskTypes = 'decimal';

interface InputMaskProps extends InputProps {
  mask: MaskTypes
}

const handleInputChange: { [key in MaskTypes]: (value: string) => string } = {
  'decimal': formatDecimal,
};

export const InputMask = (props: InputMaskProps) => {
  return (
    <input
      {...props}
      onChange={(e) => {
        const newValue = removePointsFromDecimalString(e.target.value);
        if (Number.isNaN(Number(newValue)))
          return;

        e.target.value = handleInputChange[props.mask](newValue);
        props.onChange && props.onChange(e);
      }}
    />
  );
}