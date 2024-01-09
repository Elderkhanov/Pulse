const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});


function tab () {
    const catalogTab = document.querySelectorAll('.catalog__tab');
    const catalogWrapper = document.querySelectorAll('.catalog__wrapper');
    let tabName;

    catalogTab.forEach(item => {
        item.addEventListener('click', selectTab);
    });

    function selectTab() {
        catalogTab.forEach(item => {
            item.classList.remove('catalog__tab-active');
        });
        this.classList.add('catalog__tab-active');
        tabName = this.getAttribute('data-tab-name');
        selectContent(tabName);
    }

    function selectContent (tabName) {
        catalogWrapper.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('catalog__wrapper-active') : item.classList.remove('catalog__wrapper-active');
        });
    }

}
tab();

function info() {
    const catalogItem = document.querySelectorAll('.catalog__cart-item');
    const catalogCart = document.querySelectorAll('.catalog__cart');
    const catalogItemBack = document.querySelectorAll('.catalog__cart-item-back');
    const catalogInfo = document.querySelectorAll('.catalog__cart-info');

    function toggleContent(list) {
        list.forEach((item, i) => {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                catalogItem[i].classList.toggle('catalog__cart-item-active');
            });
        });
    }
    toggleContent(catalogItemBack);
    toggleContent(catalogInfo);
}
info();


// modal

const dataCons = document.querySelectorAll('[data-modal=consultation]');
const overlay = document.querySelector('.overlay');
const modalClose = document.querySelectorAll('.modal__close');
const modalMini = document.querySelectorAll('.btn-cart');
const catalogTitle = document.querySelectorAll('.catalog__cart-title');
const btnSubmit = document.querySelectorAll('btn-submit');

modalClose.forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.overlay, #consultation, #thanks, #order').style.display = 'none';
    });
});

dataCons.forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('#order').style.display = 'none';
        overlay.style.display = 'block';
        document.querySelector('#consultation').style.display = 'block';
    });
});

modalMini.forEach((item, i) => {
    item.addEventListener('click', function() {
        document.querySelector('#order .modal__descr').textContent = catalogTitle[i].textContent;
        document.querySelector('#consultation').style.display = 'none';
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('#order').style.display = 'block';
    });
});

//Валидация форм

$(document).ready(function(){

    function validateForms(form){
      $(form).validate({
          rules: {
              name: {
                  required: true,
                  minlength: 2
              },
              phone: "required",
              email: {
                  required: true,
                  email: true
              }
          },
          messages: {
              name: {
                  required: "Пожалуйста, введите свое имя",
                  minlength: jQuery.validator.format("Введите {0} символа!")
                },
              phone: "Пожалуйста, введите свой номер телефона",
              email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильно введен адрес почты"
              }
          }
      });
  
      
  };
  
  validateForms('#consultation-form');
  validateForms('#consultation .feed-form');
  validateForms('#order .feed-form');
  
  // маска ввода номера
  
  $('input[name=phone]').mask("+7 (999) 999-99-99");
  
  // Реализация отправки писем через php
  
  $('form').submit(function(e) {
    e.preventDefault();
  
    if (!$(this).valid()) {
      return;
    }
  
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function() {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();
      $('form').trigger('reset');
    });
    return false;
  });
  
    //скрытие кнопки вверх до определенного значения 
  
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });
  
    //Плавный скролл
  
    $("a[href^='#up']").click(function() {
      const _href = $(this).attr('href');
      $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
      return false;
    });
  
  });