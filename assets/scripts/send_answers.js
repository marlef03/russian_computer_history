const form = document.getElementById('test-form');
const submitError = document.getElementById('submit-error');
const result = document.getElementById('result');
const resultBlock = document.getElementById('result-block');
const resultScheme = document.getElementById('result-scheme');
const chapter = getChapter();

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    localStorage.setItem('submitted', ' ');

    try {
        const response = await fetch(`/api/testcheck?chapter=${chapter}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const res = (await response.json())['result'];
            localStorage.setItem('tests' + chapter, Math.max(localStorage.getItem('tests' + chapter), res));
            submitError.classList.remove('show');
            result.textContent = `Ваш результат: ${res}%`;
            resultScheme.style.setProperty('--result-scheme-width', res + '%');
            resultBlock.classList.add('show');
        }
        else {
            resultScheme.style.setProperty('--result-scheme-width', '0');
            resultBlock.classList.remove('show');
            submitError.classList.add('show');
        }
    } catch (error) {
        resultScheme.style.setProperty('--result-scheme-width', '0');
        resultBlock.classList.remove('show');
        submitError.classList.add('show');
    }
});

window.addEventListener('beforeunload', function (e) {
    if (!localStorage.getItem('submitted')) {
        e.preventDefault();
        e.returnValue = '';
    }
    else {
        localStorage.removeItem('submitted');
        resultScheme.style.setProperty('--result-scheme-width', '0');
        resultBlock.classList.remove('show');
        submitError.classList.remove('show');
    }
});