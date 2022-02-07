document.addEventListener('DOMContentLoaded', () => {

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

});