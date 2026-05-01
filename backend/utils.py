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

def get_month(number: int) -> str:
    return MONTHS[number - 1]

def get_date(date: str) -> tuple[str, str]:
    if date in dates:
        return dates[date]['image'], dates[date]['text']

    return random.choice(os.path.join(ASSETS_PATH, 'images', 'date')), 'Сегодня ничего значимого в истории ЭВМ СССР и России не произошло...'