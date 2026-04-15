import json
import os

from aiohttp import web


BASE_PATH = os.path.dirname(__file__)
HTML_PATH = os.path.join(BASE_PATH, 'frontend', 'pages')


async def main_handler(request: web.Request):
    path = request.path

    if path.startswith('/api'):
        return web.Response(text=json.dumps({'path': f'{path}', 'method': f'{request.method}', 'query': f'{request.query}'}))

    if path == '/':
        return web.FileResponse(os.path.join(HTML_PATH, 'index.html'))

    """file_path = os.path.join(HTML_PATH, os.path.basename(path))

    if os.path.isfile(file_path):
        return web.FileResponse(file_path)"""

    raise web.HTTPNotFound()


@web.middleware
async def error_handler(request, handler):
    try:
        response = await handler(request)

        return response
    except web.HTTPException as e:
        return web.FileResponse(os.path.join(HTML_PATH, 'filenotfound.html'))


app = web.Application(middlewares=[error_handler])

app.router.add_static('/assets/', path=os.path.join(BASE_PATH, 'assets'), name='assets')

app.router.add_route('*', '/{tail:.*}', main_handler)

web.run_app(app, host='192.168.50.78', port=80)
