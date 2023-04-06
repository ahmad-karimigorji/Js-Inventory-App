import { Storage } from "./Storage.js";

// 1. add new category
// 2. creat DOM category
// 3. cancel new category

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category-btn");
const canselBtn = document.querySelector("#cansel-btn");

const categoryForm = document.querySelector("#category-form");
const addNewCategoryToggle = document.querySelector("#add-new-category-toggle");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    canselBtn.addEventListener("click", (e) => this.cancelAddNewCategory(e));
    addNewCategoryToggle.addEventListener("click", (e) =>
      this.categoryToggle(e)
    );
  }

  addNewCategory(e) {
    const title = categoryTitle.value.trim();
    const description = categoryDescription.value.trim();

    if (!title || !description) return;

    Storage.savedCategory({ title, description });

    categoryTitle.value = "";
    categoryDescription.value = "";

    this.creatCategoriesList();
    this.categoryToggle();
  }

  creatCategoriesList() {
    const savedCategories = Storage.getAllCategories();
    const productCategory = document.querySelector("#product-category");
    const productCategoryModal = document.querySelector(
      "#product-category-modal"
    );

    let result = `<option class="bg-slate-500 text-slate-200" value="" selected>select a category</option>`;

    savedCategories.forEach((element) => {
      result += `<option class="bg-slate-500 text-slate-200" value="${element.id}">${element.title}</option>`;
    });

    productCategory.innerHTML = result;
    productCategoryModal.innerHTML = result;
  }

  cancelAddNewCategory(e) {
    categoryTitle.value = "";
    categoryDescription.value = "";
    this.categoryToggle();
  }

  categoryToggle() {
    addNewCategoryToggle.classList.toggle("hidden");
    categoryForm.classList.toggle("hidden");
  }
}

export default new CategoryView();
