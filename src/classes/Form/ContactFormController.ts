import { BaseFormController } from "./BaseFormController";

export class ContactFormController extends BaseFormController<
  [string, string, string, string, boolean]
> {
  private firstNameInput: HTMLInputElement;
  private lastNameInput: HTMLInputElement;
  private emailInput: HTMLInputElement;
  private messageTextarea: HTMLTextAreaElement;
  private agreeCheckbox: HTMLInputElement;

  constructor() {
    super("#contact-form");

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

    this.initialize();
  }

  protected setupValidation(): void {
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
  protected gatherUserInput():
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

  protected clearInputs() {
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
}
