// Объявление переменных
var startScreen = document.querySelector('.sc');
var list = document.querySelector('.sc__list');
var menu = document.querySelector('.nav__menu');
var main = document.querySelector('.main'); 

list.addEventListener('click', handleListClick);
menu.addEventListener('click', handleNavMenuClick);
startScreen.addEventListener('transitionend', handleTransitionEnd);

// Обработчик клика на стартовом экране
function handleListClick(e) {
    // Выходим если клик был не по ссылке
    if (e.target.tagName !== 'A') {
        return;
    }
    
    // data-section атрибут используется для связи ссылок на стартовом экране с разделами лэндинга
    var section = e.target.dataset.section;
    
    setStartScreenHidden();
    setMenuItemActive(section);
    setSectionVisible(section);
    e.preventDefault();
}

// Обработчик клика в верхнем меню
function handleNavMenuClick(e) {
    // Выходим если клик был не по ссылке
    if (e.target.tagName !== 'A') {
        return;
    }

    // data-section атрибут используется для связи ссылок навигационного меню с разделами лэндинга
    var section = e.target.dataset.section;
    
    setMenuItemActive(section);
    setSectionVisible(section);
    e.preventDefault();
}

// Скрывает из dom-дерева узел стартового экрана после завершения анимации
function handleTransitionEnd(e) {
    this.style.display = 'none';
}

// Навешивает класс для анимации скрытия стартового экрана
function setStartScreenHidden() {
    startScreen.classList.add('sc--hidden');
}

// Подсвечивает активный элемент меню
function setMenuItemActive(section) {
    var oldActive = menu.querySelector('.nav__link--active');
    var currentActive = menu.querySelector(`a[data-section=${section}]`);
    
    if (oldActive) oldActive.classList.remove('nav__link--active');
    if (currentActive) currentActive.classList.add('nav__link--active');
}

// Отображает текущий раздел
function setSectionVisible(section) {
    var oldActive = main.querySelector('.section--visible');
    var currentActive = main.querySelector(`section[data-section=${section}]`);
    
    if (oldActive) {
        oldActive.classList.remove('section--visible');
        oldActive.style.display = '';
    }

    if (currentActive) {
        currentActive.style.display = 'block';
        
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                currentActive.classList.add('section--visible');
            })
        });
    }
}
