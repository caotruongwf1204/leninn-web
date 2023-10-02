document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  let currentValueInput = 1;

  const API_DETAI = `http://localhost:3000/lenin/${id}`;

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
    // console.log("numberItemnumberItem", numberItem);

    const listProducts = oldListProd || [];
    // console.log("OOOOOOOOOOOOO", productId)
    // console.log("listProducts", listProducts)
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
          }
        }
      } else {
        listProducts.push(product)
      }
    } else {
      listProducts.push(product)
    }

    // console.log("existingItem", listProducts)

    localStorage.setItem('products', JSON.stringify(listProducts));

  }





  // quantity
  const addNumbers = () => {
    const minus = document.querySelector('.nav-detail-minus');
    const plus = document.querySelector('.nav-detail-plus');
    const numbersInput = document.querySelector('.detail-input');

    plus.addEventListener('click', () => {
      // Tăng giá trị số trong input
      const currentValue = parseInt(numbersInput.value);
      numbersInput.value = currentValue + 1;
      // console.log("?????", typeof numbersInput.value)
      currentValueInput = numbersInput.value
      // console.log('inputValue', currentValueInput)

    });
    minus.addEventListener('click', () => {
      // Giảm giá trị số trong input
      const currentValue = parseInt(numbersInput.value);
      if (currentValue > 1) numbersInput.value = currentValue - 1;
      currentValueInput = numbersInput.value

      // console.log('minus', currentValueInput)
    });

  };
  addNumbers();





  // size
  const parentElement = document.getElementById("size-select");
  const childElements = parentElement.querySelectorAll("option");
  childElements.forEach((element) => {
    console.log(element);
  });






  // add to cart
  const addToCart = document.querySelector('.detail-add');
  addToCart.addEventListener('click', () => {
    console.log('Add to Cart');
    addToLocalStorage(id, dataJson, currentValueInput, "M")
    document.querySelector('.cart-quantity').innerHTML = dataJson.length;
  })

  const btnCart = document.querySelector('.detail-buy');
  btnCart.addEventListener('click', () => {
    console.log("dataJson", dataJson);
    addToLocalStorage(id, dataJson, currentValueInput, "M")

    // console.log("getData", localStorage.getItem('products'))
    window.location.href = 'cart.html';
  })



  document.querySelector('.cart-quantity').innerHTML = listProducts.length;
});