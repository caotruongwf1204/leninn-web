const URL_API = `https://api-leninn.vercel.app/lenin`;

const getApi = async (URL_API) => {
  const response = await axios.get(URL_API);

  relate(response.data);
}
getApi(URL_API);



const relate = (data) => {
  const detailRelate = document.querySelector("#relate-js");
  let HTML = ``;
  data.forEach((item, index) => {
    if(index > 3) {
      return
    }
    const priceCall = item.price;
    const productPrice = priceCall.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    HTML = HTML + `
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
        detailRelate.innerHTML = HTML;
  });
};
relate();
