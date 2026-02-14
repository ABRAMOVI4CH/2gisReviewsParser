# 2GIS Reviews Parser (TypeScript)

Парсер отзывов 2GIS через публичный REST API (без браузера). Интерфейс совместим с Yandex-парсером.

## Установка

```bash
npm install 2gis-reviews-parser
```

## Использование

```js
const { TwoGisParser } = require('2gis-reviews-parser');

(async () => {
  const branchId = '123123';
  const parser = new TwoGisParser(branchId, {
    apiKey: 'YOUR_2GIS_API_KEY'
  });

  const allData = await parser.parse();
  console.log(allData);
})();
```

## Совместимость

- Интерфейс: `new TwoGisParser(id).parse(type)`.
- Поддерживаемые типы: `default`, `company`, `reviews`.

## Примечания

- Требуется API ключ 2GIS (`apiKey`) или переменная окружения `TWO_GIS_API_KEY`.
- Используется `fetch`, нужен Node.js 18+.
