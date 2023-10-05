const dataStorage = localStorage.getItem("products");
const dataParse = JSON.parse(dataStorage);
// console.log("getDataLocalstorage", dataParse);
let totalPrice = 0;
let listCartItems = [];

const getData = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  let currentValueInput = 1;
  // document.querySelector('.cart-quantity').innerHTML = dataParse.length;


  for (let i = 0; i < dataParse.length; i++) {
    const API_DETAIL_CART = `https://api-leninn.vercel.app/lenin/${dataParse[i].id}`;
    const response = await axios.get(API_DETAIL_CART);





    // //total
    // totalPrice += response.data.price * parseInt(dataParse[i].numberProduct);
    // let total = document.querySelector(".cart-mn span:first-child");
    // let totalAll = document.querySelector(".cart-mn-all span:first-child");
    // let formattedPrice = new Intl.NumberFormat('vi-VN', {
    //   style: 'currency',
    //   currency: 'VND'
    // }).format(totalPrice);
    // total.textContent = formattedPrice;
    // totalAll.textContent = formattedPrice;

    response.data.numberItems = dataParse[i].numberProduct;
    response.data.size = dataParse[i].size;
    listCartItems.push(response.data);
  }
  products(listCartItems);
};



const products = (data) => {
  const cartListing = document.querySelector("#cart-show-js");

  data.forEach((item) => {
    const cartRow = document.createElement("tr");
    cartRow.classList.add("table-mobile");

    const number = item.price * item.numberItems;

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
        </div>
      </td>
      <td>
        <div class="detail-quantity">
          Số lượng :
          <div class="nav-detail">
            <button class="nav-detail-minus">-</button>
            <input class="detail-input" type="number" readonly value=${item.numberItems}>
            <button class="nav-detail-plus">+</button>
          </div>
        </div>
      </td>
      <td class="cart-price"><p>${number}</p></td>
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

      plus.addEventListener('click', () => {
        const currentValue = parseInt(numbersInput.value) || 1;
        numbersInput.value = currentValue + 1;
        const newNumber = item.price * parseInt(numbersInput.value);
        // const newFormattedNumber = newNumber.toLocaleString("vi-VN", {
        //   style: "currency",
        //   currency: "VND",
        // });
        cartPrice.textContent = newNumber;

        updateLocalStorageQuantity(item.id, parseInt(numbersInput.value));

        updateTotal();
      });

      minus.addEventListener('click', () => {
        const currentValue = parseInt(numbersInput.value) || 1;
        if (currentValue > 1) {
          numbersInput.value = currentValue - 1;
          const newNumber = item.price * parseInt(numbersInput.value);
          // const newFormattedNumber = newNumber.toLocaleString("vi-VN", {
          //   style: "currency",
          //   currency: "VND",
          // });
          cartPrice.textContent = newNumber;


          updateLocalStorageQuantity(item.id, parseInt(numbersInput.value));

          updateTotal();
        }
      });
    };
    addNumbers();
    
    
    const updateLocalStorageQuantity = (itemId, newQuantity) => {
      const storedData = JSON.parse(localStorage.getItem('products'));
      const updatedData = storedData.map((product) => {
        if (product.id === itemId) {
          product.numberItems = newQuantity;
        }
        return product;
      });

      localStorage.setItem('products', JSON.stringify(updatedData));
      console.log('updatedData', JSON.stringify(updatedData));
    };





    // remove item
    const removeCartItem = () => {
      const removeItem = document.querySelectorAll(".cart-close");
      removeItem.forEach((item, index) => {
        item.addEventListener("click", () => {
          const currentIndex = index;
          const lasteredArr = dataParse.slice();

          lasteredArr.forEach((item, arrIndex) => {
            if (currentIndex === arrIndex) {
              lasteredArr.splice(arrIndex, 1);
            }
          });

          localStorage.clear();
          localStorage.setItem('products', JSON.stringify(lasteredArr));
          products(lasteredArr);
          location.reload();
          updateTotal();
        });
      });





      // remove item mobile
      const removeItemMobile = document.querySelectorAll(".remove-card");

      removeItemMobile.forEach((item, index) => {
        item.addEventListener("click", () => {
          const currentIndex = index;
          const lasteredArr = dataParse.slice();

          lasteredArr.forEach((item, arrIndex) => {
            if (currentIndex === arrIndex) {
              lasteredArr.splice(arrIndex, 1);
            }
          });

          localStorage.clear();
          localStorage.setItem('products', JSON.stringify(lasteredArr));
          products(lasteredArr);
          location.reload();
          updateTotal();
        });
      });

    }
    removeCartItem()






    //total
    const updateTotal = () => {
      let totalPrice = 0;
      const cartRows = document.querySelectorAll(".table-mobile");

      cartRows.forEach((cartRow) => {
        const priceElement = cartRow.querySelector(".cart-price p");
        const quantityElement = cartRow.querySelector(".detail-input");
        const price = parseFloat(priceElement.textContent.replace("₫", "").replace(",", ""));
        const quantity = parseInt(quantityElement.value);

        if (!isNaN(price) && !isNaN(quantity)) {
          totalPrice += price;
        }
      });

      const formattedTotalPrice = totalPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",

      });
      document.querySelector(".cart-mn span:first-child").textContent = formattedTotalPrice;
      document.querySelector(".cart-mn-all span:first-child").textContent = formattedTotalPrice;
    };
    updateTotal();

  });
};
getData();










// submit
const submitItem = () => {
  const submit = document.querySelector(".btn-money");
  const discout = document.querySelector(".btn-discout");

  if (dataParse.length > 0) {
    submit.style.backgroundColor = '#000000';
    discout.style.backgroundColor = '#000000';
  } else {
    submit.style.backgroundColor = '';
    discout.style.backgroundColor = '';
  }



  submit.addEventListener("click", () => {
    console.log("??????????");
    if (dataParse.length > 0) {
      localStorage.clear();
      window.location.href = "index.html";
    }
  });

}
submitItem()


const showText = document.querySelector('.show-text');
if (dataParse.length > 0) {
  showText.style.display = 'none';
} else {
  showText.style.display = '';
}




document.querySelector('.cart-quantity').innerHTML = dataParse.length;