import type { TEntitie } from "../types/Entitie";

export abstract class BaseCardsController<
  T extends TEntitie,
  U extends HTMLElement,
> {
  protected elements: T[] = [];
  protected container: U;
  protected dataFile: string;
  protected dataKey: string;

  constructor(containerSelector: string, dataFile: string, dataKey: string) {
    this.dataFile = dataFile;
    this.dataKey = dataKey;
    this.container = document.querySelector(containerSelector) as U;

    this.initialize();
  }

  protected async initialize(): Promise<void> {
    await this.loadElements();
    this.setupListeners();
    this.render();
  }

  protected async loadElements(): Promise<void> {
    try {
      const response = await fetch(`../src/data/${this.dataFile}`);
      const data = await response.json();

      this.elements = data[this.dataKey];
    } catch (error) {
      console.error(`Error loading data frrom ${this.dataFile}: `, error);
    }
  }

  protected abstract setupListeners(): void;
  protected abstract render(): void;
}
