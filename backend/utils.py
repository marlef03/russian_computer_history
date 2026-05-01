import os.path
import random
import json

MONTHS = [
    "января", "февраля", "марта",
    "апреля", "мая", "июня",
    "июля", "августа", "сентября",
    "октября", "ноября", "декабря"
]

ASSETS_PATH = os.path.join(os.path.dirname(__file__), '..', 'assets')

dates = json.load(open(os.path.join(ASSETS_PATH, 'data', 'dates.json'), encoding='utf-8'))

tests = json.load(open(os.path.join(ASSETS_PATH, 'data', 'tests.json'), encoding='utf-8'))

def get_month(number: int) -> str:
    return MONTHS[number - 1]

def get_date(date: str) -> tuple[str, str]:
    if date in dates:
        return dates[date]['image'], dates[date]['text']

    return random.choice(os.path.join(ASSETS_PATH, 'images', 'date')), ''

def calculate_test(chapter: str, data: dict) -> float:
    result = 0

    for i in data:
        if i[0] == 'f':
            q, a = i[1:], data[i]

            if tests[chapter][q].lower() == a.lower():
                result += 1

        elif i[0] == 'b':
            q, a = tuple(map(int, i[1:].split("v")))

            q = str(q)

            if a in tests[chapter][q]:
                result += 1 / len(tests[chapter][q])

        elif i[0] == 'r':
            q, a = i[1:], int(data[i][1:])

            if a in tests[chapter][q]:
                result += 1

    return round(result / len(tests[chapter]) * 100, 2)