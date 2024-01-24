const searchForm = document.querySelector('.search-bar');
const searchInput = document.querySelector('.input-search');
const resultSpan = document.querySelector('.search-text');
const search = searchInput.value.trim();


searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = `/search.html?q=${search}`;
});
resultSpan.textContent = search;

const initialSearch = new URLSearchParams(window.location.search).get('q');
searchInput.value = initialSearch || '';
const searchMessage = document.querySelector('.no-results');

const getApi = async () => {
    const search = searchInput.value.trim();
    const URL_API = `https://api-leninn.vercel.app/lenin${
        search ? `?title_like=${search}&` : "?"
    }`;

    const response = await axios.get(URL_API);
    const data = response.data;
        products(data);
    if (data.length > 0) {
        products(data);
        searchMessage.style.display = 'none';
    } else {
        productsListing.innerHTML = '';
        searchMessage.style.display = 'block';
    }

    console.log(data);
};

const productsListing = document.querySelector("#listing-product-js");

const products = (data) => {
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
                                <div class="card-title">${item.title}</div>
                                <div class="price">${productPrice}</div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
    });

    productsListing.innerHTML = HTML;
};
getApi();