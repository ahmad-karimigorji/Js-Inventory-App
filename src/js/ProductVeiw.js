import { Storage } from "./Storage.js";

// 1. add new product
// 2. creat DOM producs
// 3. delete
// 4. edit
// 5. search
// 6. sort

const addNewProductBtn = document.querySelector("#add-new-product-btn");
const searchInput = document.querySelector("#search");
const sort = document.querySelector("#sort");

const modal = document.querySelector("#modal");
const modalBackDray = document.querySelector("#modal-back-dray");
const updateProductModalBtn = document.querySelector(
  "#update-product-modal-btn"
);
const cancelModalBtn = document.querySelector("#cancel-modal-btn");

const productTitleModal = document.querySelector("#product-title-modal");
const productQuantityModal = document.querySelector("#product-quantity-modal");
const productCategoryModal = document.querySelector("#product-category-modal");

const headingQuantityProduct = document.querySelector("#badge");

class ProductView {
  constructor() {
    this.products = [];

    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    sort.addEventListener("change", (e) => this.sortProducts(e));

    modalBackDray.addEventListener("click", (e) => this.closeEditModal(e));
    updateProductModalBtn.addEventListener("click", (e) => this.editProduct(e));
    cancelModalBtn.addEventListener("click", (e) => this.closeEditModal(e));
  }

  addNewProduct(e) {
    const title = document.querySelector("#product-title").value.trim();
    const quantity = document.querySelector("#product-quantity").value.trim();
    const category = document.querySelector("#product-category").value;

    if (!title || !quantity || parseInt(quantity) === 0 || !category) return;

    Storage.savedProduct({ title, quantity, category });

    document.querySelector("#product-title").value = "";
    document.querySelector("#product-quantity").value = "";
    document.querySelector("#product-category").value = "";

    this.products = Storage.getAllProducts();
    this.creatProductList();
  }

  setProducts() {
    this.products = Storage.getAllProducts();
  }

  creatProductList() {
    const productList = document.querySelector(".product-list");
    const productListBox = document.querySelector(".products-list-box");

    let result = ``;

    this.products.forEach((element) => {
      const category = Storage.getAllCategories().find(
        (c) => c.id === parseInt(element.category)
      );

      result += `<div class="flex justify-between">
            <div class="">
                <span class="text-slate-300 font-bold">${element.title}</span>
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-slate-400 text-xs sm:text-sm">${new Date(
                  element.creatAt
                ).toLocaleDateString("fa-IR")}</span>
                <span class="text-slate-600 text-xs sm:text-sm border border-slate-600 rounded-xl px-2 py-.5">${
                  category.title
                }</span>
                <span class="bg-slate-500 text-slate-300 text-xs sm:text-sm w-5 sm:w-7 h-5 sm:h-7 flex items-center justify-center border-2 border-slate-300 rounded-full">${
                  element.quantity
                }</span>
                <button class="text-slate-400 text-xs sm:text-sm" id="delete-btn" data-product-id="${
                  element.id
                }">delete</button>
                <button class="text-slate-300 text-xs sm:text-sm" id="edit-btn" data-product-id="${
                  element.id
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

  searchProducts(e) {
    const searchValue = e.target.value;
    const savedProducts = Storage.getAllProducts();

    const filterdProducts = savedProducts.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase().trim())
    );

    this.products = filterdProducts;

    this.creatProductList();
  }

  sortProducts(e) {
    const sortValue = e.target.value;

    if (sortValue === "newest") {
      this.products = this.products.sort((a, b) =>
        new Date(a.creatAt) > new Date(b.creatAt) ? -1 : 1
      );
    } else if (sortValue === "oldest") {
      this.products = this.products.sort((a, b) =>
        new Date(a.creatAt) > new Date(b.creatAt) ? 1 : -1
      );
    }

    this.creatProductList();
  }

  deleteProduct(e) {
    const id = e.target.dataset.productId;

    Storage.deleteProduct(id);
    this.setProducts();
    this.creatProductList();
  }

  showEditModal(e) {
    const id = e.target.dataset.productId;

    modal.classList.remove("-top-full");
    modal.classList.add("top-1/4");
    modalBackDray.classList.remove("hidden");

    this.setProductEdit(id);
  }

  closeEditModal() {
    modal.classList.remove("top-1/4");
    modal.classList.add("-top-full");

    modalBackDray.classList.add("hidden");
  }

  setProductEdit(id) {
    updateProductModalBtn.dataset.productId = id;

    const product = this.products.find((item) => item.id === parseInt(id));

    productTitleModal.value = product.title;
    productQuantityModal.value = product.quantity;
    productCategoryModal.value = product.category;
  }

  editProduct(e) {
    const id = e.target.dataset.productId;

    const title = productTitleModal.value.trim();
    const quantity = productQuantityModal.value.trim();
    const category = productCategoryModal.value;

    if (!title || !quantity || parseInt(quantity) === 0 || !category) return;

    Storage.savedProduct({ id, title, quantity, category });
    this.products = Storage.getAllProducts();
    this.creatProductList();

    this.closeEditModal();
  }

  setHeadingQuantityProduct() {

    if (this.products.length > 0) {
      headingQuantityProduct.classList.remove('hidden')
      const quantityProdcut = this.products.reduce(
        (accu, curr) => accu + parseInt(curr.quantity),
        0
      )
      headingQuantityProduct.innerText = quantityProdcut;
    }else {
      headingQuantityProduct.classList.add('hidden')

      }
  }
}

export default new ProductView();
