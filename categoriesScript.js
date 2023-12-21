document.addEventListener("DOMContentLoaded", function () {
  const categoryContainer = document.getElementById("category-container");

  var cartProductCount = document.getElementById("cart-count");
  cartProductCount.innerHTML = localStorage.length;
  // Fetch product data from the JSON file
  fetch("https://dummyjson.com/products/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      // console.log(products);
      products.forEach((product) => {
        const productCard = createCategoryCard(product);
        categoryContainer.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching category data:", error.message);
      categoryContainer.innerHTML =
        "Error fetching category data. Please try again later.";
    });
});

function scrollToTargetDiv(targetId, divId) {
  targetId = targetId.substring(1);
  var targetDiv = document.getElementById(`${targetId}`);
  if (targetDiv) {
    targetDiv.scrollIntoView({ behavior: "smooth" });
  }
}

var globalArray = [];
function createCategoryCard(product) {
  const card = document.createElement("div");
  card.classList.add("category-card");
  card.classList.add("slider-item");
  card.classList.add(`${product}`);

  globalArray.push(`${product}`);

  card.setAttribute("id", `${product}`);
  var divId = product;

  const name = document.createElement("h2");
  name.innerHTML = product;

  const desc = document.createElement("p");
  desc.innerHTML = "Starting ar $9";

  const button = document.createElement("button");
  button.textContent = "SHOP NOW";

  button.setAttribute("id", "myButton");
  button.setAttribute("class", "btn");

  var flag = 0;

  button.addEventListener("click", function (event) {
    var myDiv = document.getElementById("product-slider-container");

    // Check if the div is currently disabled
    if (myDiv.classList.contains("disabled")) {
      // Enable the div
      myDiv.classList.remove("disabled");
      myDiv.style.pointerEvents = "auto";
      flag = 1;
    }

    showFirstThreeProducts(
      event.target.parentNode.classList[
        event.target.parentNode.classList.length - 1
      ]
    );
  });

  card.appendChild(name);
  card.appendChild(desc);
  card.appendChild(button);

  if (window.location.hash) {
    scrollToTargetDiv(window.location.hash.toString(), divId);
  }
  return card;
}

const slider = document.getElementById("category-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let currentIndex = 0;

nextButton.addEventListener("click", () => {
  if (currentIndex < slider.children.length - 3) {
    currentIndex++;
    updateSlider();
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

function updateSlider() {
  const translateValue = -currentIndex * 33.33; // 33.33 is the width of each item
  slider.style.transform = `translateX(${translateValue}%)`;
}

function showFirstThreeProducts(classes) {
  console.log(classes);
  const productContainer = document.getElementById("product-container");
  fetch(`https://dummyjson.com/products/category/${classes}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      var allProductsList = products.products;
      productContainer.innerHTML = "";
      allProductsList.forEach((product) => {
        const productCard = createProductCard(product, classes);
        productContainer.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching product data:", error.message);
      productContainer.innerHTML =
        "Error fetching product data. Please try again later.";
    });
}

function createProductCard(product, classes) {
  const productItem = document.createElement("div");
  productItem.classList.add("product-card");
  productItem.classList.add("product-slider-item");
  productItem.classList.add(`${product.category + product.id}`);

  const imgContainer = document.createElement("div");
  imgContainer.style = "width: 100%;height: 70%;";
  const img = document.createElement("img");
  img.src = product.images[0];
  img.style = "width: 100%;height: 100%;";
  imgContainer.appendChild(img);

  const brand = document.createElement("p");
  brand.innerHTML = product.brand;

  const title = document.createElement("h3");
  title.innerHTML = product.title;

  const rating = document.createElement("div");
  console.log(product.rating);
  var productRating = parseInt(product.rating);
  var remainingRating = (product.rating - parseInt(product.rating)).toFixed(1);

  rating.setAttribute("id", "starRatingContainer");
  for (var i = 1; i <= productRating; i++) {
    var starIcon = document.createElement("i");
    starIcon.classList.add("fas", "fa-star");
    starIcon.classList.add("checked");
    rating.appendChild(starIcon);
  }
  if (remainingRating > 0.5) {
    var starIcon = document.createElement("span");
    starIcon.innerHTML = "1/2";
    rating.appendChild(starIcon);
  }

  // Append the star icon to the container

  const oldPrice = document.createElement("span");
  var discount = parseFloat(product.discountPercentage);
  var newCalculatedPrice = (
    parseFloat(product.price) -
    (discount / 100) * parseFloat(product.price)
  ).toFixed(2);

  // oldPrice.innerHTML = product.discountPercentage;
  oldPrice.innerHTML = "$" + product.price + " ";
  oldPrice.style.textDecoration = "line-through";

  const priceContainer = document.createElement("div");
  const actualPrice = document.createElement("span");
  actualPrice.innerHTML = "$" + newCalculatedPrice + " ";

  var spacer = document.createElement("span");
  spacer.style = "margin-right: 10px;";

  priceContainer.appendChild(actualPrice);
  priceContainer.appendChild(spacer);
  priceContainer.appendChild(oldPrice);
  priceContainer.style = "display:flex ; flex-direction:row";

  const button = document.createElement("button");
  button.textContent = "Show Product";
  button.style =
    "background-color: #DADA09; color:black; width:100%; height: 8%;border: 1px solid #F0F0F0; cursor:pointer";

  button.addEventListener("mouseover", function () {
    button.style.backgroundColor = "#2980b9";
  });

  // Remove the hover effect dynamically
  button.addEventListener("mouseout", function () {
    button.style.backgroundColor = "#DADA09";
  });

  // button.setAttribute("id", "myButton");
  // button.setAttribute("class", "btn");

  button.addEventListener("click", function (event) {
    var newClasses =
      event.target.parentNode.classList[
        event.target.parentNode.classList.length - 1
      ];
    console.log(newClasses);
    var numericContent = newClasses.replace(/[^\d]/g, "");
    console.log(numericContent);
    var floatingPageContainer = document.getElementById(
      "floatingPageContainer"
    );
    var closeFloatingPageButton = document.getElementById("closeFloatingPage");

    var allContainer = document.getElementById("allContainer");
    floatingPageContainer.style.display = "block";
    allContainer.style.display = "none";

    // Close floating page on close button click
    closeFloatingPageButton.addEventListener("click", function () {
      floatingPageContainer.style.display = "none";
      allContainer.style.display = "block";
    });

    showProductDetails(numericContent);
  });

  productItem.appendChild(imgContainer);
  productItem.appendChild(brand);
  productItem.appendChild(title);
  productItem.appendChild(rating);
  productItem.appendChild(priceContainer);
  productItem.appendChild(button);

  return productItem;
}

const productSlider = document.getElementById("product-container");
const productPrevButton = document.getElementById("prevProduct");
const productNextButton = document.getElementById("nextProduct");
let productCurrentIndex = 0;

productNextButton.addEventListener("click", () => {
  if (productCurrentIndex < productSlider.children.length - 3) {
    productCurrentIndex++;
    updateProductSlider();
  }
});

productPrevButton.addEventListener("click", () => {
  if (productCurrentIndex > 0) {
    productCurrentIndex--;
    updateProductSlider();
  }
});

function updateProductSlider() {
  const translateValue = -productCurrentIndex * 33.33; // 33.33 is the width of each item
  productSlider.style.transform = `translateX(${translateValue}%)`;
}

function showProductDetails(classes) {
  var productDetailsCard = document.getElementById(
    "floating-product-details-card"
  );
  fetch(`https://dummyjson.com/products/${classes}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      console.log(products);
      productDetailsCard.innerHTML = "";
      const productCard = createProductDetailsCard(products, classes);
      productDetailsCard.appendChild(productCard);
    })
    .catch((error) => {
      console.error("Error fetching product data:", error.message);
      productDetailsCard.innerHTML =
        "Error fetching product data. Please try again later.";
    });
}

function createProductDetailsCard(product, classes) {
  const productDetailsItemCard = document.createElement("div");
  productDetailsItemCard.classList.add("floating-product-card");
  productDetailsItemCard.style = "display:flex;width: 100%;height: 100%;";

  const img = document.createElement("img");
  img.src = product.images[0];
  img.style = "height: 100%;width: 60%;";

  const details = document.createElement("div");

  const title = document.createElement("p");
  title.innerHTML = product.title;
  title.style.fontWeight = "bolder;";

  const rating = document.createElement("p");
  rating.innerHTML = "Rating : " + product.rating;

  const oldPrice = document.createElement("p");
  var discount = parseFloat(product.discountPercentage);
  var newCalculatedPrice = (
    parseFloat(product.price) -
    (discount / 100) * parseFloat(product.price)
  ).toFixed(2);

  // oldPrice.innerHTML = product.discountPercentage;
  oldPrice.innerHTML = "$" + product.price + " ";
  oldPrice.style.textDecoration = "line-through";
  oldPrice.style.fontSize = "17px";

  const actualPrice = document.createElement("p");
  actualPrice.innerHTML = "$" + newCalculatedPrice + " ";
  actualPrice.style = "color: #FF7A86;";

  const category = document.createElement("p");
  category.innerHTML = "Category : " + product.category;

  const brand = document.createElement("p");
  brand.innerHTML = "Brand : " + product.brand;

  const desc = document.createElement("p");
  desc.innerHTML = product.description;
  desc.style.fontStyle = "italic";
  desc.style.fontSize = "18px";

  const button = document.createElement("button");
  button.textContent = "Add to cart";
  button.style =
    "background-color: #007BFF; color:white; width:100%; height: 10%;border: 1px solid #F0F0F0; cursor:pointer";

  button.addEventListener("mouseover", function () {
    button.style.backgroundColor = "#2980b9";
  });

  // Remove the hover effect dynamically
  button.addEventListener("mouseout", function () {
    button.style.backgroundColor = "#007BFF";
  });

  // button.setAttribute("id", "myButton");
  // button.setAttribute("class", "btn");

  button.addEventListener("click", function (event) {
    var cartData = {
      id: product.id,
      name: product.title,
      price: newCalculatedPrice,
      count: 1,
      img: product.images,
      totalPrice: newCalculatedPrice,
    };

    // Convert JSON object to a string using JSON.stringify
    var cartJsonString = JSON.stringify(cartData);

    // Store the string in localStorage with a key
    localStorage.setItem(product.title.replace(/\s/g, ""), cartJsonString);
    var cartProductCount = document.getElementById("cart-count");
    cartProductCount.innerHTML = localStorage.length;
  });

  details.appendChild(title);
  details.appendChild(oldPrice);
  details.appendChild(actualPrice);
  details.appendChild(rating);
  details.appendChild(category);
  details.appendChild(brand);
  details.appendChild(brand);
  details.appendChild(desc);
  details.appendChild(button);
  details.style =
    "display: flex;flex-direction: column;justify-content: space-evenly;margin-left: 10px;font-size: 25px;width:40%";

  productDetailsItemCard.appendChild(img);
  productDetailsItemCard.appendChild(details);
  return productDetailsItemCard;
}
