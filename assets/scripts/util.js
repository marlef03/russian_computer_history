function scrollUp() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showGoUp() {
    if (window.scrollY > window.innerHeight) {
        document.getElementById('goup').classList.add('show')
    }
    else {
        document.getElementById('goup').classList.remove('show')
    }
}

window.addEventListener('scroll', showGoUp);

showGoUp();