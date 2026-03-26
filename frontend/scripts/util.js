function adjust_height() {
    let headerHeight = document.getElementById('header').offsetHeight;
    document.getElementById('main').style.marginTop = headerHeight + 'px';
}

window.addEventListener('resize', adjust_height);

adjust_height();