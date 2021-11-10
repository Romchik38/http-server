# singleRoute

## Особенности сервера:
  - один возможный роут
  - передает в роут req и res
  - ожидает объект { statusCode, response }
    * statusCode - код ответа
    * response - отдается в res.end()
  - res.end() вызывается только в сервере.

## В роуте можно:

  - req.on('data')
  - res.write()

## Доступные методы

1. Импортировать
  const createServer = require('./singleRoute.js');

2. Создать сервер
  const server = createServer();

3. Методы  
  * server.router(name, router)     - добавляет маршрут
  * server.listen(port, address)    - запускает сервер
  * server.close()                  - останавливает сервер

## Ошибки

1. Ошибка сервера - если происходит событие server.on('error'), то вызывается server.close();
2. Если просходит ошибка в роуте, то отдается на клииент 500 с текстом "internal server error".

```javascript
'use strict';

const createServer = require('./singleRoute.js');

const makeResponse = (num, str) => ({
  statusCode: num,
  response: str
});

const router = async ({ req, res }) => {
  if (req.method !== 'GET') {
    return makeResponse(404, 'not found');
  }
  if (req.url === '/hello') return makeResponse(200, 'hello friend');
  return makeResponse(404, 'url not found');
};

const server = createServer();
server.router('hello', router)
  .listen(8000, '127.0.0.1');
```
