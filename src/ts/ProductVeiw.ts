import { Storage } from "./Storage";
import { Category } from "./CategoryView";

export interface Product {
  id?: string;
  title: string;
  category: string;
  quantity: number;
  creatAt?: string;
}

// 1. add new product
// 2. creat DOM producs
// 3. delete
// 4. edit
// 5. search
// 6. sort

const addNewProductBtn = document.querySelector(
  "#add-new-product-btn"
) as HTMLButtonElement;

const productTitle = document.querySelector(
  "#product-title"
) as HTMLInputElement;
const productQuantity = document.querySelector(
  "#product-quantity"
) as HTMLInputElement;
const productCategory = document.querySelector(
  "#product-category"
) as HTMLSelectElement;
const searchInput = document.querySelector("#search") as HTMLInputElement;
const sort = document.querySelector("#sort") as HTMLSelectElement;

const modal = document.querySelector("#modal") as HTMLDivElement;
const modalBackDray = document.querySelector(
  "#modal-back-dray"
) as HTMLDivElement;
const updateProductModalBtn = document.querySelector(
  "#update-product-modal-btn"
) as HTMLButtonElement;
const cancelModalBtn = document.querySelector(
  "#cancel-modal-btn"
) as HTMLButtonElement;

const productTitleModal = document.querySelector(
  "#product-title-modal"
) as HTMLInputElement;
const productQuantityModal = document.querySelector(
  "#product-quantity-modal"
) as HTMLInputElement;
const productCategoryModal = document.querySelector(
  "#product-category-modal"
) as HTMLSelectElement;

const headingQuantityProduct = document.querySelector(
  "#badge"
) as HTMLSpanElement;
const productList = document.querySelector(".product-list") as HTMLDivElement;
const productListBox = document.querySelector(
  ".products-list-box"
) as HTMLDivElement;

class ProductView {
  products: Product[] = [];
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    sort.addEventListener("change", (e) => this.sortProducts(e));

    modalBackDray.addEventListener("click", (e) => this.closeEditModal());
    updateProductModalBtn.addEventListener("click", (e) => this.editProduct(e));
    cancelModalBtn.addEventListener("click", (e) => this.closeEditModal());
  }

  addNewProduct(e: Event): void {
    const title = productTitle.value.trim();
    const quantity = +productQuantity.value.trim();
    const category = productCategory.value;

    if (!title || !quantity || quantity === 0 || !category) return;

    Storage.savedProduct({ title, quantity, category });

    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = "";

    this.products = Storage.getAllProducts();
    this.creatProductList();
  }

  setProducts(): void {
    this.products = Storage.getAllProducts();
  }

  creatProductList(): void {
    let result = ``;

    this.products.forEach((product: Product) => {
      const category = Storage.getAllCategories().find(
        (c: Category) => c.id === product.category
      );

      result += `<div class="flex justify-between">
            <div class="">
                <span class="text-slate-300 font-bold">${product.title}</span>
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-slate-400 text-xs sm:text-sm">${new Date(
                  product.creatAt as string
                ).toLocaleDateString("fa-IR")}</span>
                <span class="text-slate-600 text-xs sm:text-sm border border-slate-600 rounded-xl px-2 py-.5">${
                  category?.title
                }</span>
                <span class="bg-slate-500 text-slate-300 text-xs sm:text-sm w-5 sm:w-7 h-5 sm:h-7 flex items-center justify-center border-2 border-slate-300 rounded-full">${
                  product.quantity
                }</span>
                <button class="text-slate-400 text-xs sm:text-sm" id="delete-btn" data-product-id="${
                  product.id
                }">delete</button>
                <button class="text-slate-300 text-xs sm:text-sm" id="edit-btn" data-product-id="${
                  product.id
                }">edit</button>
            </div>
        </div>`;
    });

    productList.innerHTML = result;

    if (Storage.getAllProducts().length === 0)
      productListBox.classList.add("hidden");
    else productListBox.classList.remove("hidden");

    const deleteProductBtn = document.querySelectorAll("#delete-btn");
    deleteProductBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => this.deleteProduct(e));
    });

    const editProductBtn = document.querySelectorAll("#edit-btn");
    editProductBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => this.showEditModal(e));
    });

    this.setHeadingQuantityProduct();
  }

  searchProducts(e: Event): void {
    const searchValue = (e.target as HTMLInputElement).value;
    const savedProducts = Storage.getAllProducts();

    const filterdProducts = savedProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase().trim())
    );

    this.products = filterdProducts;

    this.creatProductList();
  }

  sortProducts(e: Event): void {
    const sortValue = (e.target as HTMLSelectElement).value;

    if (sortValue === "newest") {
      this.products = this.products.sort((a: Product, b: Product) =>
        new Date(a.creatAt as string) > new Date(b.creatAt as string) ? -1 : 1
      );
    } else if (sortValue === "oldest") {
      this.products = this.products.sort((a: Product, b: Product) =>
        new Date(a.creatAt as string) > new Date(b.creatAt as string) ? 1 : -1
      );
    }

    this.creatProductList();
  }

  deleteProduct(e: Event): void {
    const id = (e.target as HTMLButtonElement).dataset.productId as string;

    Storage.deleteProduct(id);
    this.setProducts();
    this.creatProductList();
  }

  showEditModal(e: Event): void {
    const id = (e.target as HTMLButtonElement).dataset.productId as string;

    modal.classList.remove("-top-full");
    modal.classList.add("top-1/4");
    modalBackDray.classList.remove("hidden");

    this.setProductEdit(id);
  }

  closeEditModal(): void {
    modal.classList.remove("top-1/4");
    modal.classList.add("-top-full");

    modalBackDray.classList.add("hidden");
  }

  setProductEdit(id: string): void {
    updateProductModalBtn.dataset.productId = id;

    const product = this.products.find((product: Product) => product.id === id);
    if (product) {
      productTitleModal.value = product.title;
      productQuantityModal.value = `${product.quantity}`;
      productCategoryModal.value = product.category;
    }
  }

  editProduct(e: Event): void {
    const id = (e.target as HTMLButtonElement).dataset.productId as string;

    const title = productTitleModal.value.trim();
    const quantity = +productQuantityModal.value.trim();
    const category = productCategoryModal.value;

    if (!title || !quantity || quantity === 0 || !category) return;

    Storage.savedProduct({ id, title, quantity, category });
    this.products = Storage.getAllProducts();
    this.creatProductList();

    this.closeEditModal();
  }

  setHeadingQuantityProduct(): void {
    if (this.products.length > 0) {
      headingQuantityProduct.classList.remove("hidden");
      const quantityProdcut = this.products.reduce(
        (accu, curr: Product) => accu + curr.quantity,
        0
      );
      headingQuantityProduct.innerText = `${quantityProdcut}`;
    } else {
      headingQuantityProduct.classList.add("hidden");
    }
  }
}

export default new ProductView();
