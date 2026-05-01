function getPageText(percent) {
    if (percent === null) return 'Страница не была посещена';
    return `Материал раздела пройден на ${percent}%`;
}

function getGeneralText(percent) {
    if (percent === null) return 'Страница не была посещена';
    return `Материал этапа пройден на ${percent}%`;
}

function getTestText(percent) {
    if (percent === null) return 'Тест еще не был пройден';
    return `Тест пройден на ${percent}%`;
}

function countStatistics() {
    let totalPercent = 0;
    for (let i = 1; i <= 5; i++) {
        const generalBarElement = document.getElementById('general' + i + '_bar');
        const generalTextElement = document.getElementById('general' + i + '_text');
        const generalPercent = localStorage.getItem('general' + i);

        generalTextElement.textContent = getGeneralText(generalPercent);
        generalBarElement.style.width = Number(generalPercent) + '%';
        totalPercent += Number(generalPercent);
    }
    totalPercent = Math.round(totalPercent / 5);
    document.getElementById('general_bar').style.width = totalPercent + '%';
    document.getElementById('general_text').textContent = `Общий прогресс составляет ${totalPercent}%`;

    let percent = localStorage.getItem('inventions');
    document.getElementById('inventions_bar').style.width = Number(percent) + '%';
    document.getElementById('inventions_text').textContent = getPageText(percent);

    percent = localStorage.getItem('scientists');
    document.getElementById('scientists_bar').style.width = Number(percent) + '%';
    document.getElementById('scientists_text').textContent = getPageText(percent);

    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith('date')) count += 1;
    }
    percent = Math.round((count / 11) * 100);
    document.getElementById('date_bar').style.width = percent + '%';
    document.getElementById('date_text').textContent = `Прочитано уникальных дней: ${count} из 11`;

    totalPercent = 0;
    for (let i = 1; i <= 5; i++) {
        const testBarElement = document.getElementById('tests' + i + '_bar');
        const testTextElement = document.getElementById('tests' + i + '_text');
        const testPercent = localStorage.getItem('tests' + i);

        testTextElement.textContent = getTestText(testPercent);
        testBarElement.style.width = Number(testPercent) + '%';
        totalPercent += Number(testPercent);
    }
    totalPercent = Math.round(totalPercent / 5);
    document.getElementById('tests_bar').style.width = totalPercent + '%';
    document.getElementById('tests_text').textContent = `Общий результат выполнения тестов составляет ${totalPercent}%`;
}

function resetProgress() {
    localStorage.clear();
    countStatistics();
}

countStatistics();