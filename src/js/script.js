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