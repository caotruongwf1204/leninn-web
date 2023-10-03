document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  let currentValueInput = 1;

  const API_DETAI = `https://api-leninn.vercel.app/lenin/${id}`;

  const getApi = async (URL_API) => {
    const response = await axios.get(URL_API);

    showDetailJs(response.data);
    document.querySelector('.cart-quantity').innerHTML = dataJson.length;
  }
  getApi(API_DETAI);

  const showDetailImg = document.querySelector('#detail-show-img');
  const showDetailInfo = document.querySelector('#detail-show-info');


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
  }





  // add local storage
  const getData = localStorage.getItem('products');
  const dataJson = JSON.parse(getData);

  const addToLocalStorage = (productId, oldListProd, numberItem, size) => {

    const listProducts = oldListProd || [];
    const product = {
      "id": productId,
      "numberProduct": numberItem,
      "size": size
    }
    let existingItem;
    if (listProducts.length > 0) {

      existingItem = oldListProd.find(item => item.id === product.id);
      if (existingItem) {
        for (let i = 0; i < listProducts.length; i++) {
          if (listProducts[i].id === productId) {
            listProducts[i].numberProduct = (parseInt(listProducts[i].numberProduct) + parseInt(numberItem)).toString();
            listProducts[i].size = size;
          }
        }
      } else {
        listProducts.push(product)
      }
    } else {
      listProducts.push(product)
    }

    localStorage.setItem('products', JSON.stringify(listProducts));

  }

  // size
  const sizeInput = () => {
    const selectElement = document.getElementById("size-select");
    selectElement.addEventListener("change", () => {
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const size = selectedOption.value;
        addToLocalStorage(id, dataJson, currentValueInput, size);
        console.log(size);
    });
  };
  sizeInput()



  // quantity
  const addNumbers = () => {
    const minus = document.querySelector('.nav-detail-minus');
    const plus = document.querySelector('.nav-detail-plus');
    const numbersInput = document.querySelector('.detail-input');

    plus.addEventListener('click', () => {
      // Tăng giá trị số trong input
      const currentValue = parseInt(numbersInput.value);
      numbersInput.value = currentValue + 1;
      currentValueInput = numbersInput.value

    });
    minus.addEventListener('click', () => {
      // Giảm giá trị số trong input
      const currentValue = parseInt(numbersInput.value);
      if (currentValue > 1) numbersInput.value = currentValue - 1;
      currentValueInput = numbersInput.value
    });

  };
  addNumbers();





  // add to cart
  const addToCart = document.querySelector('.detail-add');
  addToCart.addEventListener('click', () => {
    console.log("dfsdf", dataJson);
    addToLocalStorage(id, dataJson, currentValueInput, size)
    document.querySelector('.cart-quantity').innerHTML = dataJson.length;
  })

  const btnCart = document.querySelector('.detail-buy');
  btnCart.addEventListener('click', () => {
    console.log("dataJson", dataJson);
    window.location.href = 'cart.html';
    addToLocalStorage(id, dataJson, currentValueInput, size)
  })



  document.querySelector('.cart-quantity').innerHTML = listProducts.length;
});