'use client';

import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  id?: string;
  name?: string;
  defaultValue?: Date;
  className?: string;
}

export const DatePicker = (props: DatePickerProps) => {
  const initialDate = props.defaultValue ?? new Date();
  const [startDate, setStartDate] = useState<Date | null>(initialDate);

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat={'dd/MM/yyyy'}
      {...props}
    />
  );
};