const form = document.getElementById('test-form');
const submitError = document.getElementById('submit-error');
const result = document.getElementById('result');
const resultBlock = document.getElementById('result-block');
const resultScheme = document.getElementById('result-scheme');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`/api/testcheck?chapter=${getChapter()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const res = (await response.json())['result'];
            console.log(res);
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
