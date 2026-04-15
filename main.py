from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
import uvicorn

app = FastAPI()

app.mount('/assets', StaticFiles(directory='assets'), name='assets')


@app.get('/')
def get_index():
    return FileResponse('frontend/pages/index.html')


@app.get('/general')
def get_general(chapter: str, page: str):
    return FileResponse(f'frontend/pages/general/{chapter}/{page}.html')


@app.get('/scientists')
def get_scientists():
    return FileResponse('frontend/pages/scientists.html')


@app.get('/inventions')
def get_inventions():
    return FileResponse('frontend/pages/inventions.html')


@app.get('/date')
def get_date():
    return FileResponse('frontend/pages/date.html')


@app.get('/stats')
def get_stats():
    return FileResponse('frontend/pages/stats.html')


@app.get('/tests')
def get_tests(chapter: str):
    return FileResponse(f'frontend/pages/tests/{chapter}.html')


@app.exception_handler(404)
async def fnf_hander(request, exc):
    return FileResponse('frontend/pages/filenotfound.html')


if __name__ == "__main__":
    uvicorn.run('main:app', host='192.168.0.110', reload=True)
