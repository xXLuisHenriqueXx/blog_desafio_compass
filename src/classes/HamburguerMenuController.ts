export class HamburguerMenuController {
  private hamburguerMenuButton: HTMLButtonElement;
  private hamburguerMenuItems: HTMLElement;
  private isMenuOpen = false;

  constructor() {
    this.hamburguerMenuButton = document.querySelector(
      "nav button"
    ) as HTMLButtonElement;
    this.hamburguerMenuItems = document.querySelector(
      "#menu-items"
    ) as HTMLElement;
    this.initialize();
  }

  private initialize(): void {
    this.hamburguerMenuButton.addEventListener("click", () => {
      this.toggleMenu();
    });
  }

  private toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.hamburguerMenuItems.style.display = this.isMenuOpen ? "block" : "none";
  }
}
