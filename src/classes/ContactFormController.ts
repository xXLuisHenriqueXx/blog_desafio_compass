import type { IValidatable } from "../entities/Validatable";
import { Validator } from "../utils/Validator";

export class ContactFormController {
  private form: HTMLFormElement;
  private firstNameInput: HTMLInputElement;
  private lastNameInput: HTMLInputElement;
  private emailInput: HTMLInputElement;
  private messageTextarea: HTMLTextAreaElement;
  private agreeCheckbox: HTMLInputElement;
  private accessedFields: Set<HTMLElement> = new Set();

  constructor() {
    this.form = document.querySelector("#contact-form") as HTMLFormElement;
    this.firstNameInput = document.querySelector(
      "#first-name"
    ) as HTMLInputElement;
    this.lastNameInput = document.querySelector(
      "#last-name"
    ) as HTMLInputElement;
    this.emailInput = document.querySelector("#email") as HTMLInputElement;
    this.messageTextarea = document.querySelector(
      "#message"
    ) as HTMLTextAreaElement;
    this.agreeCheckbox = document.querySelector("#agree") as HTMLInputElement;

    this.setupValidation();
    this.configure();
  }

  private setupValidation(): void {
    this.setupFieldValidation(this.firstNameInput, {
      required: true,
      minLength: 1,
      maxLength: 20,
    });

    this.setupFieldValidation(this.lastNameInput, {
      required: true,
      minLength: 1,
      maxLength: 20,
    });

    this.setupFieldValidation(this.emailInput, {
      required: true,
      isEmail: true,
    });

    this.setupFieldValidation(this.messageTextarea, {
      required: true,
      minLength: 1,
      maxLength: 255,
    });
  }

  private setupFieldValidation(
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

  private validateField(
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

  private gatherUserInput():
    | [string, string, string, string, boolean]
    | undefined {
    const enteredFirstName = this.firstNameInput.value;
    const enteredLastName = this.lastNameInput.value;
    const enteredEmail = this.emailInput.value;
    const enteredMessage = this.messageTextarea.value;
    const enteredAgree = this.agreeCheckbox.checked;

    this.accessedFields.add(this.firstNameInput);
    this.accessedFields.add(this.lastNameInput);
    this.accessedFields.add(this.emailInput);
    this.accessedFields.add(this.messageTextarea);
    this.accessedFields.add(this.agreeCheckbox);

    const firstNameValidatable = this.validateField(this.firstNameInput, {
      value: enteredFirstName,
      required: true,
      minLength: 1,
      maxLength: 20,
    });

    const lastNameValidatable = this.validateField(this.lastNameInput, {
      value: enteredLastName,
      required: true,
      minLength: 1,
      maxLength: 20,
    });

    const emailValidatable = this.validateField(this.emailInput, {
      value: enteredEmail,
      required: true,
      isEmail: true,
    });

    const messageValidatable = this.validateField(this.messageTextarea, {
      value: enteredMessage,
      required: true,
      minLength: 1,
      maxLength: 255,
    });

    const agreeValidatable = this.validateField(this.agreeCheckbox, {
      value: enteredAgree.toString(),
      isChecked: true,
    });

    if (
      firstNameValidatable &&
      lastNameValidatable &&
      emailValidatable &&
      messageValidatable &&
      agreeValidatable
    ) {
      return [
        enteredFirstName,
        enteredLastName,
        enteredEmail,
        enteredMessage,
        enteredAgree,
      ];
    }
    return undefined;
  }

  private clearInputs() {
    this.firstNameInput.value = "";
    this.lastNameInput.value = "";
    this.emailInput.value = "";
    this.messageTextarea.value = "";
    this.agreeCheckbox.checked = false;

    this.accessedFields.clear();
    this.firstNameInput.classList.remove("error");
    this.lastNameInput.classList.remove("error");
    this.emailInput.classList.remove("error");
    this.messageTextarea.classList.remove("error");
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
