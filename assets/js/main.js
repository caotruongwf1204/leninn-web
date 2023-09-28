document.addEventListener('DOMContentLoaded', () => {
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
      // console.log(button);
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

  
});