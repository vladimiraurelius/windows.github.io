document.addEventListener('DOMContentLoaded', () => {
// Прокрутка страницы
    const links = document.querySelectorAll('.header__list-link');
    const linksParent = document.querySelector('.header__list');
    const buttonOrder = document.querySelector('.about__button');

    function onActiveLink(i=0) {
        links.forEach((item) => item.classList.remove('header__list-link--active'));
        links[i].classList.add('header__list-link--active');
    }

    function scrollToPlace(){
        
        let element = document.querySelector('.header__list-link--active');
        let place = document.querySelector(element.hash);  
            

        if('scrollBehavior' in document.body.style){
            window.scrollTo({
                top: place.offsetTop - 60,
                behavior: "smooth"
            });
        } 
        else{
            window.scrollTo(0, place.offsetTop - 60);
        }
    }    

    linksParent.addEventListener('click', (event) =>{        
        const target = event.target;       

        if (target && target.classList.contains('header__list-link')) {
            links.forEach((item, i) => {
                if (target == item){
                    event.preventDefault();                                        
                    onActiveLink(i);
                    scrollToPlace();                                       
                }
            });
        }
        
    });

    buttonOrder.addEventListener('click', (e) => {
        e.preventDefault();
        onActiveLink(3);
        scrollToPlace();
    });
    
    onActiveLink();
    scrollToPlace();

// Управление модальным окном

    const popupButtons = document.querySelectorAll('.service__eye');
    const popupButtonsParent = document.querySelector('.services__items');
    const popup = document.querySelector('.popup');
    const popupContent = document.querySelector('.popup__content')
    const container = document.querySelector('.container');

    popupButtonsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('service__eye')) {
            popupButtons.forEach((item) => {
                if (target == item){
                    if(item.dataset.length != 0){
                        openPopup();

                        let closeButton = popup.querySelector('.popup__close');
                        closeButton.addEventListener('click', closePopup);

                        createPopupContent(item); 
                    }                                      
                    
                }
            })
        }

    });

    function openPopup() {
        popup.classList.add('popup--active');
        popup.scrollIntoView();

        container.classList.add('container--blocked');        
    }

    function closePopup() {
        popup.querySelectorAll('.popup__img').forEach(img => img.remove());
        popup.classList.remove('popup--active');        

        container.classList.remove('container--blocked');
        onActiveLink(1);
        scrollToPlace();
    }

    function createPopupContent(item) {
        let imageParent = item.dataset.parent;
        let imageLength = item.dataset.length;
        

        for(let i=1; i<=imageLength; ++i){
            let popupPhoto = document.createElement('img');
            popupPhoto.classList.add('popup__img');
            popupPhoto.alt = 'photo';
            popupPhoto.src = `./img/service/${imageParent}/${i}.jpg`;

            popupContent.appendChild(popupPhoto);
        }
    }

    
});