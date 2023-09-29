const dataStorage = localStorage.getItem("products");
const dataParse = JSON.parse(dataStorage);
// console.log("getDataLocalstorage", dataParse);
let totalPrice = 0;
let listCartItems = [];

const getData = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  // let currentValueInput = 1;
document.querySelector('.cart-quantity').innerHTML = dataParse.length;
  // console.log("4444444", dataParse[0]);

  for (let i = 0; i < dataParse.length; i++) {
    console.log("dataStorage: ", dataParse[i].id);
    const API_DETAIL_CART = `http://localhost:3000/lenin/${dataParse[i].id}`;
    const response = await axios.get(API_DETAIL_CART);
    // console.log("response", typeof response.data.price);
    // console.log("response2", typeof parseInt(dataParse[i].numberProduct));
    totalPrice += response.data.price * parseInt(dataParse[i].numberProduct);



    // console.log("?????????total", totalPrice);
    let total = document.querySelector(".cart-mn span:first-child");
    let totalAll = document.querySelector(".cart-mn-all span:first-child");
    let formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(totalPrice);
    total.textContent = formattedPrice;
    // console.log(totalPrice);
    totalAll.textContent = formattedPrice;

    response.data.numberItems = dataParse[i].numberProduct;
    response.data.size = dataParse[i].size;
    listCartItems.push(response.data);
  }

  // console.log("555555555", listCartItems);
  products(listCartItems);
};


// console.log("66666666", listCartItems);
const products = (data) => {
  const cartListing = document.querySelector("#cart-show-js");
  let HTML = ``;

  data.forEach((item) => {
    // console.log("item.price", item.price);
    // console.log("item.numberItems", item.numberItems);
    const number = item.price * item.numberItems;
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    HTML += `
      <tr class="table-mobile">
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
                  <div>
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
                    <td><div class="cart-price">${formattedNumber}</div></td>
                    <td class="remove">
                      <div class="cart-close">
                        <i class="fa-solid fa-trash-can"></i>
                      </div>
      </tr>
    `;
    cartListing.innerHTML = HTML;



    const addNumbers = () => {
      const minus = document.querySelectorAll('.nav-detail-minus');
      const plus = document.querySelectorAll('.nav-detail-plus');
      const numbersInput = document.querySelectorAll('.detail-input');
      // console.log(plus);
      plus.forEach((item, index) => {
        item.addEventListener('click', () => {
          // Tăng giá trị số trong input
          // const currentValue = parseInt(numbersInput.value);
          // numbersInput.value = currentValue + 1;
          // console.log("?????", typeof numbersInput.value)
          // currentValueInput = numbersInput.value
          // console.log('inputValue', currentValueInput)
          const currentValue = parseInt(numbersInput[index].value) || 0;
          numbersInput[index].value = currentValue + 1;
          // console.log('inputValue', numbersInput[index].value);
          // document.querySelector('.cart-price').innerHTML = currentValue*;
          // let currentPrice;
          // const currentIndex = index
          // console.log('currentIndex', currentIndex);
          // for (item of listCartItems) {
          //   if (currentIndex === index) {
          //     currentPrice = item.price
          //     console.log('currentPricesdgsdfsdsd', currentPrice)
          //   }
          //   console.log('index', index);
          // }
          // console.log('currentPrice', currentPrice*currentValue);

        });

      })


      minus.forEach((item) => {
        item.addEventListener('click', () => {
          // Giảm giá trị số trong input
          const currentValue = parseInt(numbersInput.value);
          if (currentValue > 1) numbersInput.value = currentValue - 1;
          currentValueInput = numbersInput.value
          // console.log('minus', currentValueInput)
        });
      })

    };
    addNumbers();



    const removeItem = document.querySelectorAll(".cart-close");
    removeItem.forEach((item, index) => {
      item.addEventListener("click", () => {
        const currentIndex = index;
        const lasteredArr = dataParse
        // console.log("Clicked on item at index:", currentIndex);
        // console.log("Data for this item:", lasteredArr[index]);

        for (item of lasteredArr) {
          if (currentIndex === index) {
            lasteredArr.splice(index, 1)
            console.log("dfsdsf")
          }
        }
        localStorage.clear()
        localStorage.setItem('products', JSON.stringify(lasteredArr));
        products(lasteredArr)
        location.reload();
      })
    })


  });
};

getData();




const submit = document.querySelector(".btn-money");
submit.addEventListener("click", () => {
  // console.log("??????????");
  localStorage.clear();
  window.location.href = "index.html";
});
