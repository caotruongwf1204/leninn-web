document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-bar');
  const searchInput = document.querySelector('.input-search');

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const search = searchInput.value.trim();
    window.location.href = `/search.html?q=${search}`;
  });

  const initialSearch = new URLSearchParams(window.location.search).get('q');
  searchInput.value = initialSearch || '';


  const products = JSON.parse(localStorage.getItem("products")) || [];
  const cartQuantity = document.querySelector('.cart-quantity');
  cartQuantity.textContent = products.length;


  const changeTitleColorOnScroll = () => {
    const title = document.querySelector('.header');
    const scrollPosition = window.scrollY;

    const scrollThreshold = 10;

    if (scrollPosition > scrollThreshold) {

      title.style.backgroundColor = '#000';
    } else {
      title.style.backgroundColor = '';
    }
  };
  window.onscroll = changeTitleColorOnScroll;





  // poppup menu mobile
  const menuMobile = () => {
    const iconMenu = document.querySelector('.menu-mobile');
    const poppupMenuMobile = document.querySelector('.popup-menu-mobile');
    const loginMobile = document.querySelector('.login-mobile');
    iconMenu.addEventListener('click', () => {
      poppupMenuMobile.classList.toggle("change-show");
      poppupMenuMobile.style.transition = ".3s";
    });
    loginMobile.addEventListener('click', () => {
      poppupMenuMobile.classList.toggle("change-show");
    });

  };
  menuMobile();



  // products-menu-mobile
  const productsMenuMobile = () => {
    const productsMenu = document.querySelector('.products-menu-mobile');
    const subMenuMobile = document.querySelector('.sub-menu-mobile');
    productsMenu.addEventListener('click', () => {
      subMenuMobile.classList.toggle("change-shows")
    })
  }
  productsMenuMobile();


  // search bar
  const searchBar = () => {
    const searchIcon = document.querySelector('.search')
    const search = document.querySelector('.search-bar')
    searchIcon.addEventListener('click', () => {
      search.classList.toggle('show-search');
      search.style.transition = ".3s ease-in-out";
    })
  }
  searchBar();






  // search bar mobile
  const searchBarMobile = () => {
    const searchIconMobile = document.querySelector('.search-mobile')
    const searchMobile = document.querySelector('.search-bar-mobile')
    searchIconMobile.addEventListener('click', () => {
      searchMobile.classList.toggle('show-search-mobile');
      searchMobile.style.transition = ".3s ease-in-out";
    })
  }
  searchBarMobile();


});



const btnScrollToTop = document.querySelector('.scroll-up');
const scrollThreshold = 100;

const updateButtonVisibility = () => {
  if (window.scrollY > scrollThreshold) {
    btnScrollToTop.style.display = 'flex';
  } else {
    btnScrollToTop.style.display = 'none';
  }
};
window.addEventListener('scroll', updateButtonVisibility);

btnScrollToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



// login
const login = () => {
  const user = document.querySelector('.user');
  const loginMain = document.querySelector('.login-main');
  const close = document.querySelector('.close');
  const loginMobile = document.querySelector('.login-mobile');
  user.addEventListener('click', () => {
    loginMain.style.display = 'flex';
  });

  loginMobile.addEventListener('click', () => {
    loginMain.style.display = 'flex';
  });

  close.addEventListener('click', () => {
    loginMain.style.display = 'none';
  });
  loginMain.addEventListener('click', (event) => {
    if (event.target.classList.contains('login-main') === true) {
      loginMain.style.display = 'none';
    }
  });
};
login();




// tabs login
const tabsLogin = () => {
  const btnSign = document.querySelectorAll('.btn-sign');
  const formLogin = document.querySelectorAll('.form-login');

  btnSign.forEach((button, index) => {

    button.addEventListener('click', () => {

      // xoa active button
      btnSign.forEach((item) => {
        item.classList.remove('active');
      });

      // xoa active formLogin
      formLogin.forEach((value) => {
        value.classList.remove('active');
      });

      // them lai
      button.classList.add('active');
      formLogin[index].classList.add('active');
    })
  })
};
tabsLogin();