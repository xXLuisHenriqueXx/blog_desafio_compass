import type { IValidatable } from "../entities/Validatable";
import { Validator } from "../utils/Validator";

export class FooterFormController {
  private form: HTMLFormElement;
  private emailInput: HTMLInputElement;
  private accessedFields: Set<HTMLElement> = new Set();

  constructor() {
    this.form = document.querySelector("#news-form") as HTMLFormElement;
    this.emailInput = document.querySelector("#news-email") as HTMLInputElement;

    this.setupValidation();
    this.configure();
  }

  private setupValidation(): void {
    this.setupFieldValidation(this.emailInput, {
      required: true,
      isEmail: true,
    });
  }

  private setupFieldValidation(
    element: HTMLInputElement,
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

  private validateField(
    element: HTMLInputElement,
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

  private gatherUserInput(): [string] | undefined {
    const enteredEmail = this.emailInput.value;

    this.accessedFields.add(this.emailInput);

    const emailValidatable = this.validateField(this.emailInput, {
      value: enteredEmail,
      required: true,
      isEmail: true,
    });

    if (emailValidatable) return [enteredEmail];

    return undefined;
  }

  private clearInputs() {
    this.accessedFields.clear();
    this.emailInput.classList.remove("error");

    this.emailInput.value = "";
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      console.log(userInput);
      this.clearInputs();
    }
  }

  private configure() {
    this.form.addEventListener("submit", this.submitHandler.bind(this));
  }
}
