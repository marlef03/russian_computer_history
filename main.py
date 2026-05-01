from datetime import datetime

from backend import utils

import aiohttp_jinja2
import jinja2
import os

from aiohttp import web

BASE_PATH = os.path.dirname(__file__)
HTML_PATH = os.path.join(BASE_PATH, 'frontend', 'pages')


async def main_handler(request: web.Request):
    path = request.path

    query = dict(request.query)

    if path.startswith('/api'):
        stp_path = path.replace('/api', '', 1)

        if stp_path.startswith('/testcheck'):
            if 'chapter' in query:
                if request.can_read_body:
                    try:
                        data = await request.json()

                        result = utils.calculate_test(query['chapter'], data)

                        return web.json_response({"result": result})
                    except Exception as e:
                        print(e)

        return web.Response(text='Wrong api request...', status=400)

    if path == '/':
        now = datetime.now()

        return aiohttp_jinja2.render_template('index.html', request, {
            'day': str(now.day),
            'month': utils.get_month(now.month)
        })

    if path == '/general':
        if 'chapter' in query:
            return web.FileResponse(os.path.join(HTML_PATH, 'general', f'{query["chapter"]}.html'))

        return web.FileResponse(os.path.join(HTML_PATH, 'general', f'table-of-contents.html'))

    if path == '/date':
        now = datetime.now()

        image, text = utils.get_date(f'{now.strftime("%d")}-{now.strftime("%m")}')

        return aiohttp_jinja2.render_template('date.html', request, {
            'day': str(now.day),
            'month': utils.get_month(now.month),
            'image': image,
            'text': text
        })

    if path == '/tests':
        if 'chapter' in query:
            return web.FileResponse(os.path.join(HTML_PATH, 'tests', f'{query["chapter"]}.html'))

        return web.FileResponse(os.path.join(HTML_PATH, 'tests', f'table-of-contents.html'))

    file_path = os.path.join(HTML_PATH, f'{os.path.basename(path)}.html')

    if os.path.isfile(file_path):
        return web.FileResponse(file_path)

    raise web.HTTPNotFound()


@web.middleware
async def error_handler(request, handler):
    try:
        response = await handler(request)

        return response
    except web.HTTPException as _:
        return web.FileResponse(os.path.join(HTML_PATH, 'filenotfound.html'))


app = web.Application(middlewares=[error_handler])

app.router.add_static('/assets/', path=os.path.join(BASE_PATH, 'assets'), name='assets')

app.router.add_route('*', '/{tail:.*}', main_handler)

aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader(HTML_PATH))

web.run_app(app, host='192.168.50.78', port=80)
