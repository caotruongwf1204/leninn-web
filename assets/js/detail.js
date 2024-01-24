document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');


  const API_DETAI = `https://api-leninn.vercel.app/lenin/${id}`;

  const getApi = async (URL_API) => {
    const response = await axios.get(URL_API);

    showDetailJs(response.data);
  }
  getApi(API_DETAI);

  const showDetailImg = document.querySelector('#detail-show-img');
  const showDetailInfo = document.querySelector('#detail-show-info');
  const showNotification = document.querySelector('.show-Notification');


  const showDetailJs = (item) => {
    const detailImg = item.img;
    const detailTitle = item.title;
    const priceCall = item.price;
    const detailPrice = priceCall.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    const detailDes1 = item.description1;
    const detailDes2 = item.description2;
    const detailDes3 = item.description3;
    const detailDes4 = item.description4;

    showDetailImg.innerHTML = `
      <img class="detail-image" src="${detailImg}" alt="">
      <div class="slide-img">
        <img src="${detailImg}" alt="">
        <img src="${detailImg}" alt="">
        <img src="${detailImg}" alt="">
        <img src="${detailImg}" alt="">
      </div>
    `;

    showDetailInfo.innerHTML = `
      <h1>${detailTitle}</h1>
      <div class="price">${detailPrice}</div>
      <div class="content">
        <p>${detailDes1}</p>
        <p>${detailDes2}</p>
        <p>${detailDes3}</p>
        <p>${detailDes4}</p>
      </div>
    `;
    showNotification.innerHTML = `
    <div class="show-text">THÊM VÀO GIỎ HÀNG</div>
    <div class="show-products">
      <div class="show-img-product">
        <img src="${detailImg}" alt="">
      </div>
      <span class="show-text-products">${detailTitle}</span>
    </div>
    <button class="show-btn-cart"><a href="./cart.html">VÀO GIỎ HÀNG</a></button>
    `;


    // add local storage
    const addProductToLocalStorage = (item, quantity, size) => {
      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

      const existingProductIndex = existingProducts.findIndex(
        (product) => product.id === item.id
      );

      if (existingProductIndex >= 0) {
        existingProducts[existingProductIndex].size = size;
        existingProducts[existingProductIndex].quantity += quantity;
      } else {
        existingProducts.push({
          id: item.id,
          img: detailImg,
          title: detailTitle,
          price: priceCall,
          quantity: quantity,
          size: size,
        });
      }
      localStorage.setItem("products", JSON.stringify(existingProducts));
    };

    const addToCart = () => {
      const addToCartBtn = document.querySelector('.detail-add');
      const sizeSelect = document.getElementById("size-select");
      const poppupSize = document.querySelector(".poppup-size");

      addToCartBtn.addEventListener('click', () => {
        const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        const size = selectedOption.value;

        if (size === "CHỌN") {
          poppupSize.style.top = '100px';
          poppupSize.style.transition = ".3s ease-in-out";
          setTimeout(() => {
            poppupSize.style.top = '-100px';
          }, 3000);
        } else {
          showNotification.style.top = '100px';
          showNotification.style.transition = ".3s ease-in-out";
          setTimeout(() => {
            showNotification.style.top = '-100px';
          }, 3000);
          addProductToLocalStorage(item, currentValueInput, size);
        }

      });

      const btnCart = document.querySelector('.detail-buy');
      btnCart.addEventListener('click', () => {
        const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        const size = selectedOption.value;

        if (size === "CHỌN") {
          poppupSize.style.top = '100px';
          poppupSize.style.transition = ".3s ease-in-out";
          setTimeout(() => {
            poppupSize.style.top = '-100px';
          }, 3000);
        } else {
          window.location.href = 'cart.html';
          addProductToLocalStorage(item, currentValueInput, size);
        }

      });
    };
    addToCart();
  }
  // quantity
  let currentValueInput = 1;

  const addNumbers = () => {
    const minus = document.querySelector('.nav-detail-minus');
    const plus = document.querySelector('.nav-detail-plus');
    const numbersInput = document.querySelector('.detail-input');

    plus.addEventListener('click', () => {
      const currentValue = parseInt(numbersInput.value);
      numbersInput.value = currentValue + 1;
      currentValueInput = parseInt(numbersInput.value);
    });

    minus.addEventListener('click', () => {
      const currentValue = parseInt(numbersInput.value);
      if (currentValue > 1) {
        numbersInput.value = currentValue - 1;
        currentValueInput = parseInt(numbersInput.value);
      }
    });
  };
  addNumbers();
});