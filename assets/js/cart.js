document.addEventListener("DOMContentLoaded", () => {

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const cartListing = document.querySelector("#cart-show-js");
  let totalPrice = 0;

  products.forEach((item) => {
    const cartRow = document.createElement("tr");
    cartRow.classList.add("table-mobile");


    cartRow.innerHTML = `
      <td class="table-mobile-products">
        <div class="cart-pro-show">
          <div class="cart-pro-img">
            <img src="${item.img}" alt="">
            <span class="remove-card">X</span>
          </div>
          <div class="cart-pro-title">
            <span>${item.title}</span>
            <div class="cart-pro-size">
              <span>[${item.size}]</span>
            </div>
          </div>
          <td class="product-price"><p>${item.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}</p></td>
        </div>
      </td>
      <td>
        <div class="detail-quantity">
          Số lượng :
          <div class="nav-detail">
            <button class="nav-detail-minus">-</button>
            <input class="detail-input" type="number" readonly value=${item.quantity}>
            <button class="nav-detail-plus">+</button>
          </div>
        </div>
      </td>
      <td class="cart-price"><p>${(item.price*item.quantity).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}</p></td>
      <td class="remove">
        <div class="cart-close">
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </td>
    `;
    cartListing.appendChild(cartRow);



    // quantily

    const addNumbers = () => {
      const minus = cartRow.querySelector('.nav-detail-minus');
      const plus = cartRow.querySelector('.nav-detail-plus');
      const numbersInput = cartRow.querySelector('.detail-input');
      const cartPrice = cartRow.querySelector('.cart-price p');

      plus.addEventListener("click", () => {
        const productId = item.id;
        const currentValue = parseInt(numbersInput.value) || 1;
        numbersInput.value = currentValue + 1;

        const newNumber = item.price * parseInt(numbersInput.value);

        for (let i = 0; i < products.length; i++) {
          if (products[i].id == productId) {
            products[i].quantity = parseInt(numbersInput.value);
          }
        }

        localStorage.setItem("products", JSON.stringify(products));
        cartPrice.textContent = newNumber;
        updateTotal()

      });

      minus.addEventListener('click', () => {
        const currentValue = parseInt(numbersInput.value) || 1;
        if (currentValue > 1) {
          const productId = item.id;
          numbersInput.value = currentValue - 1;

          const newNumber = item.price * parseInt(numbersInput.value);

          for (let i = 0; i < products.length; i++) {
            ;
            if (products[i].id == productId) {
              products[i].quantity = parseInt(numbersInput.value);
            }
          }

          localStorage.setItem("products", JSON.stringify(products));
          cartPrice.textContent = newNumber;
        }
        updateTotal()
      });

    };
    addNumbers();



    // remove item
    const removeCartItem = () => {
      const removeItemButtons = document.querySelectorAll(".cart-close");

      removeItemButtons.forEach((item) => {
        item.addEventListener("click", () => {
          const cartRow = item.closest('.table-mobile');

          if (cartRow) {
            const index = Array.from(cartRow.parentNode.children).indexOf(cartRow);
            if (index >= 0) {
              const confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này không ?");

              if (confirmDelete) {
                cartRow.remove();

                if (index < products.length) {
                  products.splice(index, 1);
                  localStorage.setItem('products', JSON.stringify(products));
                }
                updateTotal();
                updateCartQuantity();
              }
            }
          }
        });
      });

      // Remove item for mobile
      const removeItemMobile = document.querySelectorAll(".remove-card");
      removeItemMobile.forEach((item) => {
        item.addEventListener("click", () => {
          const cartRow = item.closest('.table-mobile');

          if (cartRow) {
            const index = Array.from(cartRow.parentNode.children).indexOf(cartRow);
            if (index >= 0) {
              const confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này không ?");

              if (confirmDelete) {
                cartRow.remove();

                if (index < products.length) {
                  products.splice(index, 1);
                  localStorage.setItem('products', JSON.stringify(products));
                }
                updateTotal();
                updateCartQuantity();
              }
            }
          }
        });
      });
    };
    removeCartItem()






    //total
    const updateTotal = () => {
      totalPrice = 0;
      products.forEach((item) => {
        const price = item.price;
        const quantity = item.quantity;
        if (!isNaN(price) && !isNaN(quantity)) {
          totalPrice += price * quantity;
        }
      });
      const formattedTotalPrice = totalPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      document.querySelector(".cart-mn span:first-child").textContent = formattedTotalPrice;
      document.querySelector(".cart-mn-all span:first-child").textContent = formattedTotalPrice;

    };
    updateTotal()



    const updateCartQuantity = () => {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const cartQuantity = document.querySelector('.cart-quantity');
      cartQuantity.textContent = products.length;
      // show text cart table
      const showText = document.querySelector('.show-text');
      if (products.length > 0) {
        showText.style.display = 'none';
      } else {
        showText.style.display = '';
      }

      // submit
      const submit = document.querySelector(".btn-money");
      const discout = document.querySelector(".btn-discout");

      if (products.length > 0) {
        submit.style.backgroundColor = '#000000';
        discout.style.backgroundColor = '#000000';
      } else {
        submit.style.backgroundColor = '';
        discout.style.backgroundColor = '';
        updateCartQuantity();
      }
      submit.addEventListener("click", () => {
        console.log("??????????");
        if (products.length > 0) {
          localStorage.clear();
          window.location.href = "index.html";
        }
      });
    };
    updateCartQuantity();
  });
});