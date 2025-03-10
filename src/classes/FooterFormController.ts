import type { IValidatable } from "../entities/Validatable";
import { Validator } from "../utils/Validator";

export class FooterFormController {
  private form: HTMLFormElement;
  private emailInput: HTMLInputElement;

  constructor() {
    this.form = document.querySelector("#news-form") as HTMLFormElement;
    this.emailInput = document.querySelector("#news-email") as HTMLInputElement;

    this.configure();
  }

  private gatherUserInput(): [string] | undefined {
    const enteredEmail = this.emailInput.value;

    const emailValidatable: IValidatable = {
      value: enteredEmail,
      required: true,
      isEmail: true,
    };

    if (!Validator(emailValidatable)) {
      alert("Invalid input, please try again!");
      return;
    }

    return [enteredEmail];
  }

  private clearInputs() {
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
