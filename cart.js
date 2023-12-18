document.addEventListener("DOMContentLoaded", function () {
  var cartLength = localStorage.length;
  var cartContainer = document.getElementById("cart-container");
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
    img.style.width = "50%";

    var inp = document.createElement("input");
    inp.value = productdata.count;
    inp.readOnly = true;
    inp.setAttribute("id", "input");
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
    price.innerHTML = "Price: " + "$" + productdata.price;
    price.setAttribute("id", "price");
    var quantity = document.createElement("p");
    quantity.innerHTML = "Quantity " + productdata.count;
    quantity.setAttribute("id", "quantity");

    leftSide.appendChild(img);
    leftSide.appendChild(quantityChange);
    leftSide.style.display = "flex";
    leftSide.style.flexDirection = "column";

    secDiv.appendChild(title);
    secDiv.appendChild(price);
    secDiv.appendChild(quantity);

    cartItem.appendChild(leftSide);
    cartItem.appendChild(secDiv);

    cartContainer.insertBefore(cartItem, cartContainer.firstChild);
  }

  function incrementCount(e) {
    var newData = JSON.parse(
      localStorage.getItem(
        e.target.parentNode.parentNode.parentNode.classList[0]
      )
    );
    var count = newData.count;
    count += 1;
    newData.count = count;
    localStorage.setItem(
      e.target.parentNode.parentNode.parentNode.classList[0],
      JSON.stringify(newData)
    );
    document.getElementById("input").value = count;
    document.getElementById("quantity").innerHTML = "Quantity : " + count;

    var price = newData.price;
    newData.totalPrice = parseFloat(price * count)
      .toFixed(2)
      .toString();
    localStorage.setItem(
      e.target.parentNode.parentNode.parentNode.classList[0],
      JSON.stringify(newData)
    );
    document.getElementById("price").innerHTML =
      "Price : " + "$" + newData.totalPrice;
  }

  //   function decrementCount(e) {
  //     var newData = JSON.parse(
  //       localStorage.getItem(
  //         e.target.parentNode.parentNode.parentNode.classList[0]
  //       )
  //     );
  //     var count = newData.count;
  //     count -= 1;
  //     newData.count = count;
  //     localStorage.setItem(
  //       e.target.parentNode.parentNode.parentNode.classList[0],
  //       JSON.stringify(newData)
  //     );

  //     if (count <= 1) {
  //       count = 1;
  //       document.getElementById("input").value = count;
  //       document.getElementById("quantity").innerHTML = "Quantity : " + count;

  //       var price = newData.price;
  //       price = parseFloat(price / count)
  //         .toFixed(2)
  //         .toString();
  //       localStorage.setItem(
  //         e.target.parentNode.parentNode.parentNode.classList[0],
  //         JSON.stringify(newData)
  //       );
  //       document.getElementById("price").innerHTML = "Price : " + "$" + price;
  //     } else {
  //       document.getElementById("input").value = count;
  //       document.getElementById("quantity").innerHTML = "Quantity : " + count;

  //       var price = newData.price;
  //       price = parseFloat(price / count)
  //         .toFixed(2)
  //         .toString();
  //       localStorage.setItem(
  //         e.target.parentNode.parentNode.parentNode.classList[0],
  //         JSON.stringify(newData)
  //       );
  //       document.getElementById("price").innerHTML = "Price : " + "$" + price;
  //     }

  //     console.log(count, price);
  //   }
});
