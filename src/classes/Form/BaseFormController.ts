import type { IValidatable } from "../../entities/Validatable";
import { Validator } from "../../utils/Validator";

export abstract class BaseFormController<T> {
  protected form: HTMLFormElement;
  protected accessedFields: Set<HTMLElement> = new Set();

  constructor(formSelector: string) {
    this.form = document.querySelector(formSelector) as HTMLFormElement;

    this.configure();
  }

  protected initialize(): void {
    this.setupValidation();
  }

  protected abstract setupValidation(): void;

  protected abstract gatherUserInput(): T | undefined;

  protected abstract clearInputs(): void;

  protected setupFieldValidation(
    element: HTMLInputElement | HTMLTextAreaElement,
    rules: Omit<IValidatable, "value">
  ): void {
    element.addEventListener("input", () => {
      this.accessedFields.add(element);
      this.validateField(element, {
        ...rules,
        value: element.value,
      });
    });

    element.addEventListener("blur", () => {
      this.accessedFields.add(element);
      this.validateField(element, {
        ...rules,
        value: element.value,
      });
    });
  }

  protected validateField(
    element: HTMLInputElement | HTMLTextAreaElement,
    validatable: IValidatable
  ): boolean {
    const isValid = Validator(validatable);

    if (this.accessedFields.has(element)) {
      if (isValid) {
        element.classList.remove("error");
      } else {
        element.classList.add("error");
      }
    }

    return isValid;
  }

  protected submitHandler(event: Event): void {
    event.preventDefault();

    const userInput = this.gatherUserInput();

    if (userInput !== undefined) {
      console.log(userInput);
      this.clearInputs();
    }
  }

  protected configure(): void {
    this.form.addEventListener("submit", this.submitHandler.bind(this));
  }
}
