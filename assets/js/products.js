const URL_API = `https://api-leninn.vercel.app/lenin`;
let listData = [];


const dataStorage = localStorage.getItem("products");
const dataParse = JSON.parse(dataStorage);

// if (dataParse) {
//   document.querySelector('.cart-quantity').innerHTML = dataParse.length;
// } else {
//   // Xử lý khi không có dữ liệu trong localStorage
// }


const getApi = async (URL_API) => {
  const response = await axios.get(URL_API);
  listData = response.data;
  products(response.data);
  document.querySelector('.cart-quantity').innerHTML = dataParse.length;
};
getApi(URL_API);

// products
const products = (data) => {
  // renderHtml(data);
  const productsListing = document.querySelector("#listing-product-js");
  let HTML = ``;
data.forEach((item) => {
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

// const renderHtml = (listProduct) => {
//   const productsListing = document.querySelector("#listing-product-js");

//   let HTML = ``;
//   return listProduct.forEach((item) => {
//     const priceCall = item.price;
//     const productPrice = priceCall.toLocaleString("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     });
//     HTML += `
//     <div class="col-6 col-sm-6 col-md-3">
//       <a href="./detail.html?id=${item.id}">
//         <div class="card">
//           <img class="card-img" src="${item.img}" alt="">
//           <div class="card-body">
//             <div class="content">
//               <div div class="card-title">${item.title}</div>
//               <div class="price">${productPrice}</div>
//             </div>
//           </div>
//         </div>
//       </a>
//     </div>
//    `;
//     productsListing.innerHTML = HTML;
//   });
// };

const filterList = (type) => {
  let data = [];
  for (item of listData) {
    if (item.type === type) data.push(item);
  }
  products(data);
};

const filterAll = document.querySelector("#btn-all");
// console.log("sdfgsdf", filterAll);
filterAll.addEventListener('click', () => {
  products(listData)
})


const filterProduct = (itemName, indexName) => {
  const filterBtn = document.querySelector(`${itemName}`);
  filterBtn.addEventListener("click", () => {
    filterList(indexName);
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


// producst list
const listPro = () => {
  const producstList = document.querySelectorAll('.btn-list');

  producstList.forEach((button, index) => {

    button.addEventListener('click', () => {
      producstList.forEach((item) => {
        item.classList.remove('active-list');
        button.classList.add('active-list');
      });
    });
  })
};
listPro();
