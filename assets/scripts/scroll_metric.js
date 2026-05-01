function collectScrollMetric() {
    const id = getPageId();
    const headerHeight = document.querySelector('.header').offsetHeight;
    const mainHeight = document.querySelector('.main').offsetHeight;
    const winHeight = window.innerHeight;
    let percent = 0;
    const scrollHeight = window.scrollY;
    if (scrollHeight > headerHeight) {
        percent = Math.round(((scrollHeight + winHeight) / mainHeight) * 100);
    }
    percent = Math.min(100, percent);

    localStorage.setItem(id, Math.max(localStorage.getItem(id), percent));
}

window.addEventListener('scroll', collectScrollMetric);

collectScrollMetric();