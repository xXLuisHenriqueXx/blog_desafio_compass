import { BaseFormController } from "./BaseFormController";

export class FooterFormController extends BaseFormController<[string]> {
  private emailInput: HTMLInputElement;

  constructor() {
    super("#news-form");

    this.emailInput = document.querySelector("#news-email") as HTMLInputElement;

    this.initialize();
  }

  protected setupValidation(): void {
    this.setupFieldValidation(this.emailInput, {
      required: true,
      isEmail: true,
    });
  }

  protected gatherUserInput(): [string] | undefined {
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

  protected clearInputs() {
    this.accessedFields.clear();
    this.emailInput.classList.remove("error");

    this.emailInput.value = "";
  }
}
