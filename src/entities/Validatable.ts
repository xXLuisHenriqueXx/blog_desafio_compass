export interface IValidatable {
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isChecked?: boolean;
}
