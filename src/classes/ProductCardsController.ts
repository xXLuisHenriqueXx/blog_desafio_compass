import type { IProduct } from "../entities/Product";

export class ProductCardsController {
  private products: IProduct[] = [];
  private currentFilter = "Random";
  private productsContainer: HTMLElement;
  private searchInput: HTMLInputElement;
  private searchInputMobile: HTMLInputElement;

  constructor() {
    this.productsContainer = document.querySelector(
      "#product-cards"
    ) as HTMLElement;
    this.searchInput = document.querySelector(
      "#search-shop"
    ) as HTMLInputElement;
    this.searchInputMobile = document.querySelector(
      "#search-shop-mobile"
    ) as HTMLInputElement;
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.loadProducts();
    this.setupListeners();
    this.render();
  }

  private async loadProducts(): Promise<void> {
    try {
      const { products } = await fetch("../src/data/shop_products.json").then(
        response => response.json()
      );
      this.products = products;
    } catch (error) {
      console.error("Erro ao carregar os produtos", error);
    }
  }

  private setupListeners(): void {
    const filterItems = document.querySelectorAll("nav ul li");
    for (const item of filterItems) {
      item.addEventListener("click", () => {
        this.currentFilter = item.textContent?.trim() || "Random";
        this.updateActiveFilter(item as HTMLElement);
        this.render();
      });
    }

    this.searchInput.addEventListener("input", () => {
      this.render();
    });

    this.searchInputMobile.addEventListener("input", () => {
      this.render();
    });
  }

  private updateActiveFilter(selectedItem: HTMLElement): void {
    const filterItems = document.querySelectorAll("nav ul li");
    for (const item of filterItems) {
      item.classList.remove("active");
    }
    selectedItem.classList.add("active");
  }

  private filterProducts(): IProduct[] {
    let filteredProducts = this.products;

    const searchValue = this.searchInput.value.trim().toLowerCase();
    if (searchValue) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchValue)
      );
    }

    const searchValueMobile = this.searchInputMobile.value.trim().toLowerCase();
    if (searchValueMobile) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchValueMobile)
      );
    }

    if (this.currentFilter !== "Random") {
      filteredProducts = filteredProducts.filter(product =>
        product.categories.includes(this.currentFilter.toLowerCase())
      );
    }

    return filteredProducts;
  }

  private formatPrice(price: number): string {
    return `$${(price).toFixed(2)}`;
  }

  private render(): void {
    const filteredProducts = this.filterProducts();
    if (!filteredProducts.length) {
      this.productsContainer.innerHTML =
        "<p>Sorry we couldn't find any products that match your search. Please try again.</p>";
      return;
    }

    const productsCards = filteredProducts
      .map(
        product =>
          `
        <div class="product-card">
          <img src="assets/${product.image}" alt="${product.name}">
          <div class="product-info">
            <div>
              <p>₦ ${this.formatPrice(product.price)}</p>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6.87497C9.375 1.03247 2.5 5.34372 2.5 11.4225C2.5 17.5 7.525 20.7387 11.2025 23.6387C12.5 24.6612 13.75 25.625 15 25.625" stroke-width="1.5" stroke-linecap="round"/>
                <path opacity="0.5" d="M15 6.87497C20.625 1.03247 27.5 5.34372 27.5 11.4225C27.5 17.5012 22.475 20.74 18.7975 23.64C17.5 24.6612 16.25 25.625 15 25.625" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>

            <div>
              <h2>${product.name}</h2>
              <p>${product.description}</p>
            </div>
            
            <div>
              <button>+ 1 -</button>
              <button>Add to cart</button>
            </div>
          </div>
        </div>
        `
      )
      .join("");

    this.productsContainer.innerHTML = productsCards;
  }
}
