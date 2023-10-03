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





    //total
    totalPrice += response.data.price * parseInt(dataParse[i].numberProduct);
    let total = document.querySelector(".cart-mn span:first-child");
    let totalAll = document.querySelector(".cart-mn-all span:first-child");
    let formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(totalPrice);
    total.textContent = formattedPrice;
    totalAll.textContent = formattedPrice;

    response.data.numberItems = dataParse[i].numberProduct;
    response.data.size = dataParse[i].size;
    listCartItems.push(response.data);
  }
  products(listCartItems);
};



const products = (data) => {
  const cartListing = document.querySelector("#cart-show-js");
  let HTML = ``;

  data.forEach((item) => {
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
          const currentValue = parseInt(numbersInput[index].value) || 1;
          numbersInput[index].value = currentValue + 1;
        });

      })


      minus.forEach((item, index) => {
        item.addEventListener('click', () => {
          const currentValue = parseInt(numbersInput[index].value) || 1;
          if (currentValue > 1) {
            numbersInput[index].value = currentValue - 1;
          }
        });
      })

    };
    addNumbers();



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
        });
      });

    }
    removeCartItem()
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