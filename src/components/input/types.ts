import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  placeholder?: string;
}
