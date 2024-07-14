"use strict";
// ! SideBar Movement
$("#closeBtn").click(function () {
  $(".navbar-links").animate({ width: "0px" }, 500);
  $("li").animate({ top: "0" }, 500);
  $(this).hide(100);
  $("#openBtn").show(100);
});

$("#openBtn").click(function () {
  $(".navbar-links").animate({ width: "244px" }, 500);
  $(this).hide(100);
  $("li").animate({ top: "300" }, 500);
  $("#closeBtn").show(100);
});
// ! ///////////////////

// &&&&& HTML Elements &&&&&&
let mealContainer = document.querySelector("#mealContainer");
let searchContainer = document.querySelector("#searchContainer");
let contactContainer = document.querySelector("#contactContainer");
let categoriesContainer = document.querySelector("#categoriesContainer");
let areaContainer = document.querySelector("#areaContainer");
let ingContainer = document.querySelector("#ingContainer");
let detailsContainer = document.querySelector("#detailsContainer");
let loader = document.querySelector(".loading");
// &&&&& HTML Elements &&&&&&&& ///

// ************** EVENTS **********************

const categories = document.querySelector("#categories");
categories.addEventListener("click", function () {
  getCategories();
});

const area = document.querySelector("#area");
area.addEventListener("click", function () {
  getArea();
});

const ingredients = document.querySelector("#ingredients");
ingredients.addEventListener("click", function () {
  getIngredients();
});

const contact = document.querySelector("#contactUs");

contact.addEventListener("click", function () {
  getContact();
});

const search = document.querySelector("#search");

search.addEventListener("click", function () {
  makeSearch();
});

// ************** EVENTS **********************

// ^ Fuctions

// ^ Function to clear container

function clearContainer() {
  mealContainer.innerHTML = "";
  searchContainer.innerHTML = "";
  contactContainer.innerHTML = "";
  categoriesContainer.innerHTML = "";
  areaContainer.innerHTML = "";
  ingContainer.innerHTML = "";
  detailsContainer.innerHTML = "";
}

// & Function  to Get Meals then Fnc To Display
async function getMeal() {
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  const response = await Api.json();
  console.log(response);
  displayMeal(response.meals);
}
function displayMeal(data) {
  let mealBox = "";
  for (let i = 0; i < data.length; i++) {
    mealBox += `
    <div class="col-md-3">
              <div onclick="getMealDetails('${data[i].idMeal}')"  class="meal-content position-relative overflow-hidden">
                <div class="overlay text-center d-flex align-items-center justify-content-center overflow-hidden"  >
                  <h3>${data[i].strMeal}</h3>
                </div>
                <img src="${data[i].strMealThumb}" class="w-100 rounded-3" alt="" />
              </div>
            </div>
    `;
  }
  mealContainer.innerHTML = mealBox;
}
getMeal();

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// ^ Function to Get Meal Details then Fnc to Display

async function getMealDetails(id) {
  clearContainer();
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const response = await Api.json();
  console.log(response);
  displayMealDetails(response.meals[0]);
}

function displayMealDetails(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  // let tags = meal.strTags.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let detailsBox = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2 class="text-center text-white">${meal.strMeal}</h2>
          </div>
          <div class="col-md-8 text-white">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${ingredients}
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
              </div>
   <button class="btn btn-primary rounded-3 w-25 mx-auto"><a href="./index.html" class="text-decoration-none text-white">Back To Home  </a></button> 
              `;

  detailsContainer.innerHTML = detailsBox;
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ! Function to get Categories Then Fnc to Display
async function getCategories() {
  loader.classList.remove("d-none");
  clearContainer();
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const response = await Api.json();
  loader.classList.add("d-none");
  displayCategories(response.categories);
}

function displayCategories(data) {
  let categoryBox = "";
  for (let i = 0; i < data.length; i++) {
    categoryBox += `
          <div class="col-sm-12 col-md-3">
                <div class="category-content position-relative overflow-hidden" onclick="getCategoryMeals('${data[i].strCategory}')" >
                  <div class="overlay text-center">
                    <h3>${data[i].strCategory}</h3>
                    <p>
                    ${data[i].strCategoryDescription}
                    </p>
                  </div>
                  <img
                    src= '${data[i].strCategoryThumb}'
                    class="w-100 rounded-3"
                    alt="beef"
                  />
                </div>
              </div>
          `;
  }
  categoriesContainer.innerHTML = categoryBox;
}

// ! ////////////////////////////////////
// ! ////////////////////////////////////

// ! Function to get Category Meal Details

async function getCategoryMeals(category) {
  loader.classList.remove("d-none");
  clearContainer();
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const response = await Api.json();
  loader.classList.add("d-none");
  displayMeal(response.meals.slice(0, 20));
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// ~ Function to get Areas and then Func to display

async function getArea() {
  loader.classList.remove("d-none");
  clearContainer();
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const response = await Api.json();
  loader.classList.add("d-none");

  displayArea(response.meals);
}

function displayArea(data) {
  let areaBox = "";
  for (let i = 0; i < data.length; i++) {
    areaBox += `
         <div class="col-sm-12 col-md-3 text-white text-center ">
              <div class="area-content" onclick="getAreaMeals('${data[i].strArea}')">
              <a class="text-white">
                <i class="fa-solid fa-house-laptop fa-4x"></i
              ></a>
              <h3>${data[i].strArea}</h3>
              </div>
            </div>`;
  }
  areaContainer.innerHTML = areaBox;
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~ Function to get Area Meal Details

async function getAreaMeals(area) {
  clearContainer();
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const response = await Api.json();
  console.log(response);
  displayMeal(response.meals.slice(0, 20));
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// * Function to get Ingredients and then Func to display

async function getIngredients() {
  loader.classList.remove("d-none");
  clearContainer();
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const response = await Api.json();
  loader.classList.add("d-none");
  console.log(response);
  displayIng(response.meals.splice(0, 20));
}

function displayIng(data) {
  let ingBox = "";
  for (let i = 0; i < data.length; i++) {
    ingBox += `
             <div class="col-sm-12 col-md-3 ">
              <div class="ingredients-content text-white text-center" onclick="getIngredientsMeals('${
                data[i].strIngredient
              }')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${data[i].strIngredient}</h3>
                <p>
                ${data[i].strDescription.split(" ").slice(0, 20).join(" ")}
                </p>
              </div>
            </div>
        `;
  }
  ingContainer.innerHTML = ingBox;
}

// ***********************************************************
// ***********************************************************

// * Function to get Ingredients Meal Details

async function getIngredientsMeals(ing) {
  clearContainer();
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );
  const response = await Api.json();
  console.log(response);
  displayMeal(response.meals.slice(0, 20));
}

// *******************************************
// *******************************************

//! Contact Us section
let submitBtn;
let nameAlert;
let emailAlert;
let ageAlert;
let phoneAlert;
let passwordAlert;
let repasswordAlert;
function getContact() {
  clearContainer();
  contactContainer.innerHTML = `
    <form>
          <div class="form-contact min-vh-100 d-flex flex-column justify-content-center align-items-center"  >
              <div class="w-50 text-center py-5">
                <div class="row g-4">
                  <div class="col-md-6">
                    <input type="text"
                      placeholder="Enter Your Name"
                      id="nameInput"
                      onkeyup="inputsValidation()"
                      name="name"
                      class="form-control"
                    />
                    <div class="nameAlert alert alert-danger mt-2 w-100 d-none ">
                      please Enter a valid name (Special characters and numbers not allowed)
                    </div>
                  </div>
                  <div class="col-md-6">
                    <input  type="email"
                      placeholder="Enter Your Email"
                      id="emailInput"
                      onkeyup="inputsValidation()"
                      name="email"
                      class="form-control"
                    />
                    <div class="emailAlert alert alert-danger mt-2 w-100 d-none ">
                      Email not valid *exemple@yyy.zzz 
                    </div>
                  </div>
                  <div class="col-md-6">
                    <input  type="phone"
                      placeholder="Enter Your Phone"
                      id="phoneInput"
                      onkeyup="inputsValidation()"
                      name="phone"
                      class="form-control"
                    />
                    <div class="phoneAlert alert alert-danger mt-2 w-100 d-none ">
                      please Enter a valid phone
                    </div>
                  </div>
                  <div class="col-md-6">
                    <input  type="number"
                      placeholder="Enter Your Age"
                      id="ageInput"
                      onkeyup="inputsValidation()"
                      name="number"
                      class="form-control"
                    />
                    <div class="ageAlert alert alert-danger mt-2 w-100  d-none">
                      please Enter a valid age
                    </div>
                  </div>
                  <div class="col-md-6">
                    <input  type="password"
                      placeholder="Enter Your Password"
                      id="passwordInput"
                      onkeyup="inputsValidation()"
                      name="password"
                      class="form-control"
                    />
                    <div class="passwordAlert alert alert-danger mt-2 w-100 d-none ">
                       Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                  </div>
                  <div class="col-md-6">
                    <input  type="password"
                      placeholder="Repassword"
                      id="repasswordInput"
                      onkeyup="inputsValidation()"
                      name="repassword"
                      class="form-control"
                    />
                    <div class="repasswordAlert alert alert-danger mt-2 w-100 d-none ">
                      Enter valid repassword 
                    </div>
                  </div>
                  <button
                    id="submitBtn"
                    disabled
                    class="btn btn-outline-danger px-2 mt-3 mx-auto"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
          `;
  submitBtn = document.querySelector("#submitBtn");
  let nameInput = document.querySelector("#nameInput");
  let emailInput = document.querySelector("#emailInput");
  let phoneInput = document.querySelector("#phoneInput");
  let ageInput = document.querySelector("#ageInput");
  let passwordInput = document.querySelector("#passwordInput");
  let repasswordInput = document.querySelector("#repasswordInput");

  nameAlert = document.querySelector(".nameAlert");
  emailAlert = document.querySelector(".emailAlert");
  phoneAlert = document.querySelector(".phoneAlert");
  ageAlert = document.querySelector(".ageAlert");
  passwordAlert = document.querySelector(".passwordAlert");
  repasswordAlert = document.querySelector(".repasswordAlert");

  nameInput.addEventListener("focus", () => {
    nameInputTouched = true;
  });
  emailInput.addEventListener("focus", () => {
    emailInputTouched = true;
  });
  phoneInput.addEventListener("focus", () => {
    phoneInputTouched = true;
  });
  ageInput.addEventListener("focus", () => {
    ageInputTouched = true;
  });
  passwordInput.addEventListener("focus", () => {
    passwordInputTouched = true;
  });
  repasswordInput.addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

//! Contact HTML Elements

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(nameInput.value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailInput.value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    phoneInput.value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value);
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value);
}

function repasswordValidation() {
  return repasswordInput.value == passwordInput.value;
}

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      nameAlert.classList.replace("d-block", "d-none");
    } else {
      nameAlert.classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      emailAlert.classList.replace("d-block", "d-none");
    } else {
      emailAlert.classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      phoneAlert.classList.replace("d-block", "d-none");
    } else {
      phoneAlert.classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      ageAlert.classList.replace("d-block", "d-none");
    } else {
      ageAlert.classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      passwordAlert.classList.replace("d-block", "d-none");
    } else {
      passwordAlert.classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      repasswordAlert.classList.replace("d-block", "d-none");
    } else {
      repasswordAlert.classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// ?????????? Search Section ????????????????

function makeSearch() {
  clearContainer();
  searchContainer.innerHTML = `
    <div class="container d-flex align-items-center justify-content-center  mt-5">
      <div class ="row p-5 text-center"> 
        <div class = "col-md-6">
          <input
            class="form-control  bg-transparent fw-bolder text-white"
            onkeyup = "searchByName(this.value)"
            type="text"
            placeholder="Search By Name"
            name="name"
            id="sName"
          />
          </div>
          <div class = "col-md-6">
          <input
            class="form-control  bg-transparent fw-bolder text-white ms-4"
            type="text"
            placeholder="Search By First Letter"
            onkeyup = "searchByFirst(this.value)"
            maxlength = "1"
            name="fisrtLetter"
            id="fName"
          />
          </div>
        </div>
        </div>
  `;
}

async function searchByName(term) {
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  const response = await Api.json();
  response.meals ? displayMeal(response.meals) : displayMeal([]);
}

async function searchByFirst(term) {
  term == "" ? (term = "a") : "";
  const Api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  const response = await Api.json();

  response.meals ? displayMeal(response.meals) : displayMeal([]);
}
// ???????????????????????????
