import type { IValidatable } from "../entities/Validatable";
import { Validator } from "../utils/Validator";

export class ContactFormController {
  private form: HTMLFormElement;
  private firstNameInput: HTMLInputElement;
  private lastNameInput: HTMLInputElement;
  private emailInput: HTMLInputElement;
  private messageTextarea: HTMLTextAreaElement;
  private agreeCheckbox: HTMLInputElement;

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

    this.configure();
  }

  private gatherUserInput():
    | [string, string, string, string, boolean]
    | undefined {
    const enteredFirstName = this.firstNameInput.value;
    const enteredLastName = this.lastNameInput.value;
    const enteredEmail = this.emailInput.value;
    const enteredMessage = this.messageTextarea.value;
    const enteredAgree = this.agreeCheckbox.checked;

    const firtNameValidatable: IValidatable = {
      value: enteredFirstName,
      required: true,
      minLength: 1,
      maxLength: 20,
    };

    const lastNameValidatable: IValidatable = {
      value: enteredLastName,
      required: true,
      minLength: 1,
      maxLength: 20,
    };

    const emailValidatable: IValidatable = {
      value: enteredEmail,
      required: true,
      isEmail: true,
    };

    const messageValidatable: IValidatable = {
      value: enteredMessage,
      required: true,
      minLength: 1,
      maxLength: 255,
    };

    const agreeValidatable: IValidatable = {
      value: enteredAgree.toString(),
      isChecked: true,
    };

    if (
      !Validator(firtNameValidatable) ||
      !Validator(lastNameValidatable) ||
      !Validator(emailValidatable) ||
      !Validator(messageValidatable) ||
      !Validator(agreeValidatable)
    ) {
      alert("Invalid input, please try again!");
      return;
    }

    return [
      enteredFirstName,
      enteredLastName,
      enteredEmail,
      enteredMessage,
      enteredAgree,
    ];
  }

  private clearInputs() {
    this.firstNameInput.value = "";
    this.lastNameInput.value = "";
    this.emailInput.value = "";
    this.messageTextarea.value = "";
    this.agreeCheckbox.checked = false;
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
