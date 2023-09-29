const URL_API = `http://localhost:3000/lenin`;
let listData = [];


const dataStorage = localStorage.getItem("products");
const dataParse = JSON.parse(dataStorage);


const getApi = async (URL_API) => {

  document.querySelector('.cart-quantity').innerHTML = dataParse.length;

  const response = await axios.get(URL_API);
  listData = response.data;
  products(response.data);
};
getApi(URL_API);

// products
const products = (data) => {
  renderHtml(data);
};

const renderHtml = (listProduct) => {
  const productsListing = document.querySelector("#listing-product-js");

  let HTML = ``;
  return listProduct.forEach((item) => {
    const priceCall = item.price;
    const productPrice = priceCall.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    HTML += `
    <div class="col-6 col-sm-6 col-md-3">
      <a href="./detail.html?id=${item.id}">
        <div class="card">
          <img class="card-img" src="${item.img}" alt="">
          <div class="card-body">
            <div class="content">
              <div div class="card-title">${item.title}</div>
              <div class="price">${productPrice}</div>
            </div>
          </div>
        </div>
      </a>
    </div>
   `;
    productsListing.innerHTML = HTML;
  });
};

const filterList = (type) => {
  let listProduct = [];
  for (item of listData) {
    if (item.type === type) listProduct.push(item);
  }
  renderHtml(listProduct);
};

const filterAll = document.querySelector("#btn-all");
console.log("sdfgsdf", filterAll);
filterAll.addEventListener('click', () => {
  renderHtml(listData)
})


const filterProduct = (queryName, typeName) => {
  const filterBtn = document.querySelector(`${queryName}`);
  filterBtn.addEventListener("click", () => {
    // console.log("////////", typeName);
    filterList(typeName);
  });
};

filterProduct("#btn-hat", "hat");
filterProduct("#btn-tee", "tee");
filterProduct("#btn-denim", "shirt");
filterProduct("#btn-jacket", "jacket");
filterProduct("#btn-hoodie", "hoodie");
filterProduct("#btn-blazer", "blazer");
filterProduct("#btn-pants", "pants");
filterProduct("#btn-jeans", "jeans");
filterProduct("#btn-shorts", "short");
filterProduct("#btn-deck", "deck");




