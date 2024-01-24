const urlParams = new URLSearchParams(window.location.search);
type = urlParams.get("type");

const URL_API = `https://api-leninn.vercel.app/lenin/${ type ? `?type=${type}` : ""}`;


const getApi = async (URL_API) => {
  const response = await axios.get(URL_API);
  listData = response.data;
  products(response.data);
};
getApi(URL_API);


// products
const products = (data) => {
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

// producst list
const listPro = () => {
  const productsList = document.querySelectorAll('.btn-list');
  const currentType = getCurrentTypeFromURL();

  productsList.forEach(link => {
    const type = link.getAttribute('href').split('=')[1];
    const newHref = (type !== undefined) ? `/products.html?type=${type}` : '/products.html';
    link.setAttribute('href', newHref);

    if ((type === currentType && type !== undefined) || (type === undefined && currentType === '/products.html')) {
      link.classList.add('active-list');
    } else {
      link.classList.remove('active-list');
    }
  });
};

const getCurrentTypeFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('type') || '/products.html';
};

listPro();