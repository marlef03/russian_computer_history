function handle_header() {
    console.log(window.scrollY);
    const linkTexts = document.querySelectorAll('.link__text');
    const headerLinks = document.querySelector('.header__links');
    const titleHeight = document.querySelector('.header__title').offsetHeight;
    if (window.scrollY >= titleHeight) {
        linkTexts.forEach(text => {
            void text.offsetWidth;
            text.classList.add('closed');
            void text.offsetWidth;
        });
        void headerLinks.offsetWidth;
        headerLinks.classList.add('closed');
        void headerLinks.offsetWidth;

        document.querySelector('.header').style.paddingBottom = headerLinks.offsetHeight + 'px';
    }
    else {
        linkTexts.forEach(text => {
            void text.offsetWidth;
            text.classList.remove('closed');
            void text.offsetWidth;
        });
        void headerLinks.offsetWidth;
        headerLinks.classList.remove('closed');
        void headerLinks.offsetWidth;

        document.querySelector('.header').style.paddingBottom = '0px';
    }
}

window.addEventListener('scroll', handle_header);

handle_header();
