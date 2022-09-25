// ! Task
// 1.Создать программу, которая запрашивает у пользователя данные для участия в конкурсе на вакансию программиста.
// 1.1 Запрашивать: name, position(frontend, backend, engineer), skills(JS, React, Rest API), work experience, salary, photo.
// 1.2.Сохранять эти данные в localStorage.
// 1.3.Сделать отображения кандидата в карточке из бутстрапа.
// 1.4.Добавить возможность изменять данные
// 1.5.Удалять кандидата(карточку)

function initStorage() {
  if (!localStorage.getItem("products-data")) {
    localStorage.setItem("products-data", "[]");
  }
}
initStorage();

function setProductsToStorage(products) {
  localStorage.setItem("products-data", JSON.stringify(products));
}

function getProductsFromStorage() {
  let products = JSON.parse(localStorage.getItem("products-data"));
  return products;
}

// read
function render(data = getProductsFromStorage()) {
  let container = document.querySelector(".container");
  container.innerHTML = "";
  // let data = getProductsFromStorage();
  data.forEach((item, index) => {
    container.innerHTML += `
      <div class="card" style="width: 18rem;" id="${index}">
          <img src="${item.url}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text"><b>Position</b>: ${item.position}</p>
              <p class="card-text"><b>Skills</b>: ${item.skills}</p>
              <p class="card-text"><b>Work experience</b>: ${item.number}</p>
              <p class="card-text"><b>Salary</b>: ${item.price}$</p>
              <a href="#" class="btn btn-danger" id="delete-product-btn">Delete</a>
              <a href="#" class="btn btn-success"id="update-product-btn"data-bs-toggle="modal"
              data-bs-target="#staticBackdrop">Update</a>
          </div>
      </div>
      `;
  });
  if (data.length === 0) return;
  addDeleteEvent();
  addUpdateEvent();
}
render();

// create
function createProduct() {
  let imgInp = document.querySelector("#product-url-inp");
  let titleInp = document.querySelector("#product-title-inp");
  let positionInp = document.querySelector("#position-title-inp");
  let skillsInp = document.querySelector("#skills-title-inp");
  let workInp = document.querySelector("#product-work-inp");
  let priceInp = document.querySelector("#product-price-inp");

  let productObj = {
    url: imgInp.value,
    title: titleInp.value,
    position: positionInp.value,
    skills: skillsInp.value,
    work: workInp.value,
    price: priceInp.value,
  };

  let products = getProductsFromStorage();
  products.push(productObj);
  setProductsToStorage(products);

  imgInp.value = "";
  titleInp.value = "";
  positionInp.value = "";
  skillsInp.value = "";
  workInp.value = "";
  priceInp.value = "";

  render();
}
let addProductBtn = document.querySelector("#add-product-btn");
addProductBtn.addEventListener("click", createProduct);

// delete
function deleteProduct(e) {
  let productId = e.target.parentNode.parentNode.id;
  let products = getProductsFromStorage();
  products.splice(productId, 1);
  setProductsToStorage(products);
  render();
}

function addDeleteEvent() {
  let deleteBtns = document.querySelectorAll("#delete-product-btn");
  deleteBtns.forEach(item => item.addEventListener("click", deleteProduct));
}

//update
let imgInp = document.querySelector("#product-url-inp");
let titleInp = document.querySelector("#product-title-inp");
let positionInp = document.querySelector("#position-title-inp");
let skillsInp = document.querySelector("#skills-title-inp");
let workInp = document.querySelector("#product-work-inp");
let priceInp = document.querySelector("#product-price-inp");
let saveChangesBtn = document.querySelector("#save-changes-btn");
console.log(imgInp);

function getOneProductById(id) {
  let productObj = getProductsFromStorage()[+id];
  return productObj;
}

function updateProduct(e) {
  let productId = e.target.parentNode.parentNode.id;
  let productObj = getOneProductById(productId);
  imgInp.value = productObj.url;
  titleInp.value = productObj.title;
  positionInp.value = productObj.position;
  skillsInp.value = productObj.skills;
  workInp.value = productObj.number;
  priceInp.value = productObj.price;
  saveChangesBtn.setAttribute("id", productId);
}

function saveChanges(e) {
  if (!saveChangesBtn.id) return;
  let products = getProductsFromStorage();
  let productObj = products[+saveChangesBtn.id];
  productObj.url = imgInp.value;
  productObj.title = titleInp.value;
  productObj.position = positionInp.value;
  productObj.skills = skillsInp.value;
  productObj.number = workInp.value;
  productObj.price = priceInp.value;
  setProductsToStorage(products);
  imgInp.value = "";
  titleInp.value = "";
  positionInp = "";
  skillsInp = "";
  workInp = "";
  priceInp.value = "";
  saveChangesBtn.removeAttribute("id");
  render();
}

saveChangesBtn.addEventListener("click", saveChanges);

function addUpdateEvent() {
  let updateBtns = document.querySelectorAll("#update-product-btn");
  updateBtns.forEach(item => {
    item.addEventListener("click", updateProduct);
  });
}

// search
let searchInp = document.querySelector("#search-inp");
searchInp.addEventListener("input", e => {
  let products = getProductsFromStorage();
  products = products.filter(item => {
    return (
      item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
  });
  render((data = products));
});
