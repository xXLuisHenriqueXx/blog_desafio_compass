import type { IValidatable } from "../entities/Validatable";

export const Validator = ({
  required,
  value,
  minLength,
  maxLength,
  isEmail,
  isChecked,
}: IValidatable): boolean => {
  const inputValue = value.toString().trim();

  if (required && inputValue.length === 0) return false;

  if (minLength != null && inputValue.length < minLength) return false;

  if (maxLength != null && inputValue.length > maxLength) return false;

  if (isEmail) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(inputValue)) return false;
  }

  if (isChecked && !inputValue) return false;

  return true;
};
