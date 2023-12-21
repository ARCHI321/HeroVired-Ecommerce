document.addEventListener("DOMContentLoaded", function () {
  var cartLength = localStorage.length;
  var cartContainer = document.getElementById("cart-container");
  var totalAmountItem = 0;
  for (var i = 0; i < cartLength; i++) {
    var product = localStorage.key(i);
    var productdata = JSON.parse(localStorage.getItem(product));
    var cartItem = document.createElement("div");
    cartItem.classList.add(`${productdata.name.replace(/\s/g, "")}`);
    cartItem.setAttribute("id", "cart-item");
    // cartItem.setAttribute("class", `${productdata.name.replace(/\s/g, "")}`);

    var leftSide = document.createElement("div");
    const img = document.createElement("img");
    img.src = productdata.img[1];
    img.style.width = "100%";

    var inp = document.createElement("input");
    inp.value = productdata.count;
    inp.readOnly = true;
    inp.setAttribute("id", "input" + `${productdata.name.replace(/\s/g, "")}`);
    inp.style.textAlign = "center";

    var quantityChange = document.createElement("div");
    var btnInc = document.createElement("button");
    btnInc.textContent = "+";
    btnInc.addEventListener("click", function (event) {
      incrementCount(event);
    });

    var btnDesc = document.createElement("button");
    btnDesc.textContent = "-";

    btnDesc.addEventListener("click", function (event) {
      decrementCount(event);
    });

    quantityChange.appendChild(btnDesc);
    quantityChange.appendChild(inp);
    quantityChange.appendChild(btnInc);

    var secDiv = document.createElement("div");

    var title = document.createElement("h3");
    title.innerHTML = productdata.name;
    var price = document.createElement("p");
    price.innerHTML = "Price: " + "$" + productdata.totalPrice;
    price.setAttribute(
      "id",
      "price" + `${productdata.name.replace(/\s/g, "")}`
    );
    var quantity = document.createElement("p");
    quantity.innerHTML = "Quantity " + productdata.count;
    quantity.setAttribute(
      "id",
      "quantity" + `${productdata.name.replace(/\s/g, "")}`
    );
    // console.log(productdata.totalPrice);
    totalAmountItem = parseFloat(
      parseInt(totalAmountItem) + parseInt(productdata.totalPrice)
    ).toFixed(2);
    // console.log(totalAmountItem + productdata.totalPrice);
    // console.log(totalAmountItem);

    leftSide.appendChild(img);
    leftSide.appendChild(quantityChange);
    leftSide.style.display = "flex";
    leftSide.style.flexDirection = "column";
    leftSide.style.width = "50%";
    leftSide.style.height = "100%";

    secDiv.appendChild(title);
    secDiv.appendChild(price);
    secDiv.appendChild(quantity);

    cartItem.appendChild(leftSide);
    cartItem.appendChild(secDiv);

    cartContainer.insertBefore(cartItem, cartContainer.firstChild);
  }

  document.getElementById("totalAmount").innerHTML = totalAmountItem;
});

function sumOfPrices() {
  var cartLength = localStorage.length;
  var totalAmountItem = 0;
  for (var i = 0; i < cartLength; i++) {
    var product = localStorage.key(i);
    var productdata = JSON.parse(localStorage.getItem(product));
    totalAmountItem = parseFloat(
      parseInt(totalAmountItem) + parseInt(productdata.totalPrice)
    ).toFixed(2);
  }
  return totalAmountItem;
}

function incrementCount(e) {
  var newData = JSON.parse(
    localStorage.getItem(e.target.parentNode.parentNode.parentNode.classList[0])
  );
  var count = newData.count;
  count += 1;
  newData.count = count;
  localStorage.setItem(
    e.target.parentNode.parentNode.parentNode.classList[0],
    JSON.stringify(newData)
  );
  document.getElementById(
    "input" + `${e.target.parentNode.parentNode.parentNode.classList[0]}`
  ).value = count;
  document.getElementById(
    "quantity" + `${e.target.parentNode.parentNode.parentNode.classList[0]}`
  ).innerHTML = "Quantity : " + count;

  var price = newData.price;
  newData.totalPrice = parseFloat(price * count)
    .toFixed(2)
    .toString();
  localStorage.setItem(
    e.target.parentNode.parentNode.parentNode.classList[0],
    JSON.stringify(newData)
  );
  document.getElementById(
    "price" + `${e.target.parentNode.parentNode.parentNode.classList[0]}`
  ).innerHTML = "Price : " + "$" + newData.totalPrice;

  // console.log(
  //   e.target.parentNode.parentNode.parentNode.classList[0],
  //   count,
  //   newData.totalPrice
  // );

  document.getElementById("totalAmount").innerHTML = sumOfPrices();
}

function decrementCount(e) {
  var newData = JSON.parse(
    localStorage.getItem(e.target.parentNode.parentNode.parentNode.classList[0])
  );
  var count = newData.count;
  var prevCount = newData.count;
  if (count > 1) count -= 1;
  else {
    var deleteDiv = document.getElementsByClassName(
      e.target.parentNode.parentNode.parentNode.classList[0]
    )[0];
    localStorage.removeItem(
      e.target.parentNode.parentNode.parentNode.classList[0]
    );
    document.getElementById("totalAmount").innerHTML = sumOfPrices();
    // console.log(deleteDiv);
    deleteDiv.innerHTML = "";
    // console.log(e.target.parentNode.parentNode.parentNode.classList[0]);

    return "";
  }
  newData.count = count;
  localStorage.setItem(
    e.target.parentNode.parentNode.parentNode.classList[0],
    JSON.stringify(newData)
  );

  document.getElementById(
    "input" + `${e.target.parentNode.parentNode.parentNode.classList[0]}`
  ).value = count;
  document.getElementById(
    "quantity" + `${e.target.parentNode.parentNode.parentNode.classList[0]}`
  ).innerHTML = "Quantity: " + count;

  var totalPrice = newData.totalPrice;
  var price = newData.price;
  for (var i = 1; i <= prevCount - count; i++) {
    totalPrice = totalPrice - price;
  }
  newData.totalPrice = parseFloat(totalPrice).toFixed(2).toString();
  localStorage.setItem(
    e.target.parentNode.parentNode.parentNode.classList[0],
    JSON.stringify(newData)
  );
  document.getElementById(
    "price" + `${e.target.parentNode.parentNode.parentNode.classList[0]}`
  ).innerHTML = "Price : " + "$" + newData.totalPrice;

  document.getElementById("totalAmount").innerHTML = sumOfPrices();
}

function clearCart() {
  alert("Thank you for shopping with us.");
  var cartLength = localStorage.length;
  var totalAmountItem = 0;
  for (var i = 0; i < cartLength; i++) {
    var product = localStorage.key(i);
    var elementToRemove = document.querySelector("." + `${product}`);

    // Check if the element exists before attempting to remove it
    if (elementToRemove) {
      // Remove the element
      elementToRemove.remove();
    } else {
      console.log("Element not found");
    }
  }

  localStorage.clear();
  document.getElementById("totalAmount").innerHTML = sumOfPrices();
}
