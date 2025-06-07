(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  // function mobileNavToogle() {
  //   document.querySelector('body').classList.toggle('mobile-nav-active');
  //   mobileNavToggleBtn.classList.toggle('bi-list');
  //   mobileNavToggleBtn.classList.toggle('bi-x');
  // }
  // mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  // document.querySelectorAll('#navmenu a').forEach(navmenu => {
  //   navmenu.addEventListener('click', () => {
  //     if (document.querySelector('.mobile-nav-active')) {
  //       mobileNavToogle();
  //     }
  //   });

  // });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.food-list'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.food-list'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);



  // Пульсация кнопок слайда
  function updateButtonPulsation(swiper) {
    const nextBtn = document.querySelector('.swiper-menu-button-next');
    const prevBtn = document.querySelector('.swiper-menu-button-prev');

    // Удаляем пульсацию со всех
    nextBtn.classList.remove('pulsating');
    prevBtn.classList.remove('pulsating');

    // Добавляем только если можно нажать
    if (!swiper.isEnd) {
      nextBtn.classList.add('pulsating');
    }
    if (!swiper.isBeginning) {
      prevBtn.classList.add('pulsating');
    }
  }

  // Инициализация
  const swiper = new Swiper('.swiper-menu', {
    loop: false,
    slidesPerView: 2, // По умолчанию (до 768px)
    spaceBetween: 30,
    pagination: {
      el: ".swiper-menu-paggination",
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-menu-button-next',
      prevEl: '.swiper-menu-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 3 // От 768px и выше
      },
      1200: {
        slidesPerView: 4 // От 768px и выше
      },
      1400: {
        slidesPerView: 5 // От 768px и выше
      }
    },
    on: {
      init: function () {
        updateButtonPulsation(this);
      },
      slideChange: function () {
        updateButtonPulsation(this);
      },
    },
  });


  // Яндекс карта
  ymaps.ready(init);

  function init() {
    const myMap = new ymaps.Map("map", {
      center: [54.380015, 48.578532], // Москва, можешь подставить свои координаты
      zoom: 18
    });

   const myPlacemark = new ymaps.Placemark(
      [54.380015, 48.578532],
      {
      hintContent: 'Кафе AMBAR — уютное место в центре города',
      balloonContent: `
        <strong>Кафе AMBAR</strong><br>
        Идеальное место для душевных встреч, вкусных обедов и тёплых вечеров.<br>
        Ждём вас ежедневно!<br><br>
        <a href="https://taxi.yandex.ru/ru_ru?utm_source=yamaps&utm_medium=api&gfrom=%2C&gto=54.380015%2C48.578532&level&ref=2334695&tariff&referrer=appmetrica_tracking_id%3D241755468559577482%26ym_tracking_id%3D3086361319693819511" 
          target="_blank" 
          style="display:inline-block;padding:8px 12px;background:#cda45e;color:#000;text-decoration:none;border-radius:4px;font-weight:bold;">
          🚕 Доехать на такси
        </a>
      `
        },
      {
        iconLayout: 'default#image',
        iconImageHref: './assets/img/yandex.png', // сюда — иконка с псевдо-3D-эффектом
        iconImageSize: [100, 100],
        iconImageOffset: [-75, -120]
      }
    );
    myMap.geoObjects.add(myPlacemark);
  }

  
  // Меню бургер
  const menuBurgerWrapper = document.querySelector('.menu-burger-wrapper');
  const menuBurger = document.querySelector('.menu-burger');
  const navMenu = document.getElementById('navmenu');
  const navMenuUl = document.getElementById('navmenu-ul');
  const navMenuUlLi = document.querySelectorAll('#navmenu-ul > li');
  

  // Обработчик для клика на menuBurgerWraper
  menuBurgerWrapper.addEventListener('click', function () {
    if (menuBurger.classList.contains('active')) {
      menuBurger.classList.remove('active');
      navMenuUl.classList.remove('active');
      document.body.style.overflow = ''; 
        setTimeout(() => {
        navMenu.classList.remove('active');
      }, 300);
    } else {
      menuBurger.classList.add('active');
      navMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Задержка примерно 100 мс (можешь уменьшить до 50, если нужно быстрее)
      setTimeout(() => {
        navMenuUl.classList.add('active');
      }, 300);
    }
  });

  navMenuUlLi.forEach(li => {
    li.addEventListener('click', function () {

    menuBurger.classList.remove('active');
    navMenuUl.classList.remove('active');
    document.body.style.overflow = ''; 
      setTimeout(() => {
      navMenu.classList.remove('active');
    }, 300);

    })
  })



  // Переключение модальных окн
  // Вход
  const buttonAccount = document.querySelector('.account');
  const authModal = document.querySelector('.auth-modal-container');
  const authModalClose = document.querySelectorAll('.auth-modal-close');

  // Регистрация
  const buttonReg = document.querySelector('.auth-modal-reg');
  const regModal = document.querySelector('.reg-modal-container');
  const regModalBack = document.querySelector('.reg-modal-back');
 
  buttonAccount.addEventListener('click', function (event) {
    event.stopPropagation(); // Чтобы клик по кнопке не закрывал модалку
    if (authModal.classList.contains('active')) {
      authModal.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      authModal.classList.add('active')
      document.body.style.overflow = 'hidden';
    }
  });


  // Закрытие при клике вне модалки, вне кнопки и при клике на крестик
  document.addEventListener('click', function (event) {
    let clickedCloseButton = false;

    // Проверим, кликнули ли по одному из крестиков
    authModalClose.forEach(button => {
      if (button.contains(event.target)) {
        clickedCloseButton = true;
      }
    });

    if (clickedCloseButton) {
      authModal.classList.remove('active');
      regModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  buttonReg.addEventListener('click', function(event){
    event.preventDefault(); // <--- это остановит скролл вверх
    if (authModal.classList.contains('active')){
      authModal.classList.remove('active');
      setTimeout(() => {
        regModal.classList.add('active');
      }, 300);
    }
  });


  regModalBack.addEventListener('click', function(){
      regModal.classList.remove('active');
      setTimeout(() => {
        authModal.classList.add('active');
      }, 300);
  })


  // Модальное окно корзины
  const buttonCart = document.querySelector('.cart');
  const cartModal = document.querySelector('.cart-modal-container');

  buttonCart.addEventListener('click', function(){
    if (cartModal.classList.contains('active')){
      cartModal.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      cartModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  })

  const cartModalClose = document.querySelector('.cart-modal-close');
  cartModalClose.addEventListener('click', function(){
    if (cartModal.classList.contains('active')){
      cartModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  })


  // Модальноле окно офромление заказа
  // Выбор доставки
  document.querySelectorAll('input[name="delivery_method"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        const val = radio.value;
        document.getElementById('dinein-block').style.display = val === 'dinein' ? 'grid' : 'none';
        document.getElementById('delivery-address').style.display = val === 'delivery' ? 'grid' : 'none';
        document.getElementById('pickup-point').style.display = val === 'pickup' ? 'grid' : 'none';
    });
  });

  const checkoutModal = document.querySelector('.checkout-modal-container');
  const cartModalBtn = document.querySelector('.cart-modal-design');
  const checkoutModalClose = document.querySelector('.checkout-modal-close');

  cartModalBtn.addEventListener('click', function(){
    cartModal.classList.remove('active');
     setTimeout(() => {
        checkoutModal.classList.add('active');
     }, 300);
  })

  checkoutModalClose.addEventListener('click', function(){
     checkoutModal.classList.remove('active');
     document.body.style.overflow = '';
  })





  // Модальное окно времени и даты + стол
  const checkoutFormTable = document.querySelector('.checkout-form-table');
  const dateModal = document.querySelector('.date-modal-container');
  const dateModalClose = document.querySelector('.date-modal-close');
  checkoutFormTable.addEventListener('click', function(event){
    event.preventDefault();
    checkoutModal.classList.remove('active');
    setTimeout(() => {
        dateModal.classList.add('active');
     }, 300);
  })
  
  dateModalClose.addEventListener('click', function(){
    dateModal.classList.remove('active');
    setTimeout(() => {
      checkoutModal.classList.add('active');
    }, 300)
  })



 
  // Модальное окно столов
  const table = document.getElementById('table');
  const tableModalChoese = document.getElementById('table-modal');

  const tableModal = document.querySelector('.table-modal-container');
  const closeModal = document.querySelector('.table-modal-close');
  const tableChose = document.querySelector('.table-modal-chose');

  let modalFlag = null;
  let activeInput = null;

  if(table) {
    table.addEventListener('click', function(event){
      event.preventDefault();
      document.body.style.overflow = 'hidden';
      tableModal.classList.add('active')
      modalFlag = true;
      activeInput = event.currentTarget;
    });
  }
 

  if(tableModalChoese){
    tableModalChoese.addEventListener('click', function(event){
      event.preventDefault();
      dateModal.classList.remove('active');
      setTimeout(() => {
          tableModal.classList.add('active');
      }, 300)
      activeInput = event.currentTarget;
    })
  }
  
  

  if(closeModal){
  closeModal.addEventListener('click', function(){
        if (modalFlag) {
          tableModal.classList.remove('active');
          document.body.style.overflow = '';
          tableChose.style.height = '0px';
          modalFlag = null;
        } else {
          tableModal.classList.remove('active');
          setTimeout(() => {
            dateModal.classList.add('active');
          }, 300)
          modalFlag = null;
        }
    })
  }


  // Переключатель этажей 
  const modalToggle = document.querySelector('.table-modal-toggle');
  const modalCircly = document.querySelector('.table-modal-circly');
  const modalFloor = document.querySelector('.table-modal-floor');

  const floorOne = document.querySelector('.floor-one');
  const floorTwo = document.querySelector('.floor-two');


  if(modalToggle){
    modalToggle.addEventListener('click', function () {
      if (modalCircly.classList.contains('active')){
          modalCircly.classList.remove('active');
          modalFloor.textContent = "1 этаж";
          floorOne.style.display = 'flex';
          floorTwo.style.display = 'none'
      } else {
          modalCircly.classList.add('active');
          modalFloor.textContent = "2 этаж";
          floorOne.style.display = 'none';
          floorTwo.style.display = 'flex'
      }
    })
  }
  


  // Выбор стола
  document.querySelectorAll('.table-option').forEach(item => {
    item.addEventListener('click', function() {
      tableChose.style.height = '34px'
      const tableName = this.dataset.table;
      tableChose.addEventListener('click', function(){
        activeInput.value = tableName;
        tableChose.style.height = '0px';
        tableModal.classList.remove('active');
        document.body.style.overflow = '';
        if (!modalFlag) {
          setTimeout(() => {
            dateModal.classList.add('active');
          }, 300)
        }
      })
    });
  });
  
  

   

  // Пикер даты
  flatpickr(".date", {
    dateFormat: "d.m.Y",
    locale: "ru",
    allowInput: false,
    disableMobile: true, // 💥 отключает системный календарь даже на телефоне
  });

  // Пикер времени
  flatpickr(".time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    locale: "ru",
    allowInput: false,
    disableMobile: true, // 💥 обязательно!
  });



  // Валидация формы бронирования стола
  const formTable = document.getElementById('table-form');
  
  const mainDate = document.getElementById('date');
  const mainTime = document.getElementById('time');
  const mainTable = document.getElementById('table');

  const mainDateError = document.getElementById('date-error');
  const mainTimeError = document.getElementById('time-error');
  const mainTableError = document.getElementById('table-error');

  const svgDate = document.getElementById('date-svg');
  const svgTime = document.getElementById('time-svg');
  const svgTable = document.getElementById('table-svg');

  formTable.addEventListener('submit', function (e) {
  let valid = true;

    // Проверка даты
    if (!mainDate.value.trim()) {
      mainDate.classList.add('error');
      mainDateError.style.height = '20px';
      svgDate.style.fill = '#e57373'
      valid = false;
    } else {
      mainDate.classList.remove('error');
      mainDateError.style.height = '0px';
      svgDate.style.fill = '#cda45e'
    }

    // Проверка времени
    if (!mainTime.value.trim()) {
      mainTime.classList.add('error');
      mainTimeError.style.height = '20px'
      svgTime.style.fill = '#e57373'
      valid = false;
    } else {
      mainTime.classList.remove('error');
      mainTimeError.style.height = '0px';
      svgTime.style.fill = '#cda45e'
    }

    // Проверка стола
    if (!mainTable.value.trim()) {
      mainTable.classList.add('error');
      mainTableError.style.height = '20px'
      svgTable.style.fill = '#e57373'
      valid = false;
    } else {
      mainTable.classList.remove('error');
      mainTableError.style.height = '0px';
      svgTable.style.fill = '#cda45e'
    }

    // Если есть хотя бы одна ошибка — не отправлять форму
    if (!valid) {
      e.preventDefault();
      return; // Выход из обработчика
    }
  });


  // Валидация формы бронирования стола модальное окно
  const formTableModal = document.getElementById('table-form-modal');
  
  const modalDate = document.getElementById('date-modal');
  const modalTime = document.getElementById('time-modal');
  const modalTable = document.getElementById('table-modal');

  const modalDateError = document.getElementById('date-error-modal');
  const modalTimeError = document.getElementById('time-error-modal');
  const modalTableError = document.getElementById('table-error-modal');

  const svgDateModal = document.getElementById('date-svg-modal');
  const svgTimeModal = document.getElementById('time-svg-modal');
  const svgTableModal = document.getElementById('table-svg-modal');

  formTableModal.addEventListener('submit', function (e) {
    let valid = true;

    // Проверка даты
    if (!modalDate.value.trim()) {
      modalDate.classList.add('error');
      modalDateError.style.height = '20px';
      svgDateModal.style.fill = '#e57373'
      valid = false;
    } else {
      modalDate.classList.remove('error');
      modalDateError.style.height = '0px';
      svgDateModal.style.fill = '#cda45e'
    }

    // Проверка времени
    if (!modalTime.value.trim()) {
      modalTime.classList.add('error');
      modalTimeError.style.height = '20px'
      svgTimeModal.style.fill = '#e57373'
      valid = false;
    } else {
      modalTime.classList.remove('error');
      modalTimeError.style.height = '0px';
      svgTimeModal.style.fill = '#cda45e'
    }

    // Проверка стола
    if (!modalTable.value.trim()) {
      modalTable.classList.add('error');
      modalTableError.style.height = '20px'
      svgTableModal.style.fill = '#e57373'
      valid = false;
    } else {
      modalTable.classList.remove('error');
      modalTableError.style.height = '0px';
      svgTableModal.style.fill = '#cda45e'
    }

    // Если есть хотя бы одна ошибка — не отправлять форму
    if (!valid) {
      e.preventDefault();
      return; // Выход из обработчика
    }

    e.preventDefault();
    // Выполняем переход, если форма валидна
    dateModal.classList.remove('active');
    setTimeout(() => {
      checkoutModal.classList.add('active');
    }, 300);
  });

})();

