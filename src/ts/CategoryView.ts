import { Storage } from "./Storage";

export interface Category {
  id?: string;
  title: string;
  description: string;
  creatAt?: string;
}

// 1. add new category
// 2. creat DOM category
// 3. cancel new category

const categoryTitle = document.querySelector(
  "#category-title"
) as HTMLInputElement;
const categoryDescription = document.querySelector(
  "#category-description"
) as HTMLTextAreaElement;
const addNewCategoryBtn = document.querySelector(
  "#add-new-category-btn"
) as HTMLButtonElement;
const canselBtn = document.querySelector("#cansel-btn") as HTMLButtonElement;

const categoryForm = document.querySelector("#category-form") as HTMLDivElement;
const addNewCategoryToggle = document.querySelector(
  "#add-new-category-toggle"
) as HTMLButtonElement;

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    canselBtn.addEventListener("click", (e) => this.cancelAddNewCategory(e));
    addNewCategoryToggle.addEventListener("click", (e) =>
      this.categoryToggle()
    );
  }

  addNewCategory(e: Event): void {
    const title = categoryTitle.value.trim();
    const description = categoryDescription.value.trim();

    if (!title || !description) return;

    Storage.savedCategory({ title, description });

    categoryTitle.value = "";
    categoryDescription.value = "";

    this.creatCategoriesList();
    this.categoryToggle();
  }

  creatCategoriesList(): void {
    const savedCategories = Storage.getAllCategories();
    const productCategory = document.querySelector(
      "#product-category"
    ) as HTMLSelectElement;
    const productCategoryModal = document.querySelector(
      "#product-category-modal"
    ) as HTMLSelectElement;

    let result = `<option class="bg-slate-500 text-slate-200" value="" selected>select a category</option>`;

    savedCategories.forEach((category: Category) => {
      result += `<option class="bg-slate-500 text-slate-200" value="${category.id}">${category.title}</option>`;
    });

    productCategory.innerHTML = result;
    productCategoryModal.innerHTML = result;
  }

  cancelAddNewCategory(e: Event): void {
    categoryTitle.value = "";
    categoryDescription.value = "";
    this.categoryToggle();
  }

  categoryToggle(): void {
    addNewCategoryToggle.classList.toggle("hidden");
    categoryForm.classList.toggle("hidden");
  }
}

export default new CategoryView();
