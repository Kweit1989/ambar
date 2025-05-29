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
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
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

})();

