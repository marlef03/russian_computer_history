document.querySelectorAll('.paragraph-anchor').forEach((anchor) => {
    anchor.addEventListener('click', e => {
        const copyText = window.location.origin + window.location.pathname + window.location.search + anchor.attributes.getNamedItem('href').textContent;
        var temp = document.createElement('input');
        temp.value = copyText;
        document.body.appendChild(temp);
        temp.select();
        
        document.execCommand('copy');
        
        document.body.removeChild(temp);
    })
});