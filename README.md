# Domino mini app (Telegram WebApp)

Фронтенд мини‑приложения для Telegram на React + Vite.

## Что реализовано

- Авторизация пользователя через Telegram WebApp (`initData`) и обмен на JWT в Symfony 7.3 REST API.
- Автоподстановка имени/фамилии из Telegram-профиля в контакты.
- Отображение статуса авторизации в интерфейсе пользователя.

> Админ-панель живёт отдельно в репозитории `Domino-admin` и не открывается из этого приложения.

## Переменные окружения

Создайте `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api

# URL JSON-фида товаров (например, прокси к wow2print API)
# Если не задан, используется встроенный mock-каталог domline.
VITE_PRODUCTS_FEED_URL=

# Необязательно, по умолчанию будет <VITE_API_BASE_URL>/orders/telegram
VITE_TELEGRAM_ORDER_ENDPOINT=http://localhost:8000/api/orders/telegram
VITE_TELEGRAM_BOT_TOKEN=123456:telegram_bot_token
VITE_TELEGRAM_CHAT_ID=123456789
```

> Логика отправки заказа:
> 1. Если задан `VITE_TELEGRAM_ORDER_ENDPOINT` (или доступен `${VITE_API_BASE_URL}/orders/telegram`) — отправка на endpoint.
> 2. Иначе, если заданы `VITE_TELEGRAM_BOT_TOKEN` + `VITE_TELEGRAM_CHAT_ID` — прямая отправка в Telegram Bot API (`sendMessage`).
> 3. Иначе кнопка оформления покажет ошибку о ненастроенной автоматической отправке.

> ⚠️ Прямая отправка из frontend раскрывает токен бота в клиентском коде. Для production рекомендуется endpoint на вашей стороне.


### Пример backend endpoint для отправки в Telegram

`POST /orders/telegram`:

```json
{
  "profile": {
    "name": "Иван",
    "lastName": "Иванов",
    "phone": "+7 900 000-00-00",
    "comment": "Позвонить после 14:00"
  },
  "items": [
    {
      "title": "Визитки",
      "qty": 100,
      "price": 2500
    }
  ],
  "total": 2500,

  "source": "telegram-mini-app",
  "telegramUser": {
    "id": 5145915027,
    "username": "demo_user",
    "firstName": "Ivan",
    "lastName": "Ivanov"
  },
  "text": "Новый заказ из мини-приложения..."
}
```

### Пример Python backend (FastAPI)

```python
import os
import requests
from fastapi import FastAPI, HTTPException

app = FastAPI()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")


@app.post("/api/orders/telegram")
def send_order(payload: dict):
    if not BOT_TOKEN or not CHAT_ID:
        raise HTTPException(status_code=500, detail="Telegram credentials are not configured")

    text = payload.get("text") or "Новый заказ"

    resp = requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        json={"chat_id": CHAT_ID, "text": text},
        timeout=10,
    )

    if not resp.ok:
        raise HTTPException(status_code=502, detail=f"Telegram API error: {resp.text}")

    return {"ok": True}
```
=======
  "text": "Новый заказ из мини-приложения..."
}
```


## Внешний фид товаров

В `src/app/api.js` добавлена поддержка загрузки каталога из внешнего JSON (`VITE_PRODUCTS_FEED_URL`).

Ожидаемый формат (минимум):

```json
{
  "categories": [
    { "id": "poligrafiya", "title": "Полиграфия" }
  ],
  "products": [
    {
      "slug": "vizitki-pechat",
      "title": "Визитки",
      "category": "poligrafiya",
      "priceFrom": 262,
      "description": "Печать визиток",
      "images": ["https://.../1.jpg"],
      "pricing": {
        "tiers": [
          { "from": 1, "to": 50, "unitPrice": 30 }
        ]
      }
    }
  ]
}
```

Также поддерживаются синонимы полей: `items` вместо `products`, `name` вместо `title`, `price_from|minPrice|price`, `tiers` на корне товара и пр.

> В этой среде прямой доступ к `https://api.wow2print.com/...` заблокирован (HTTP 403 через CONNECT). Поэтому для интеграции с wow2print рекомендуется сделать backend/proxy endpoint и указать его в `VITE_PRODUCTS_FEED_URL`.

## Ожидаемые REST endpoint'ы (Symfony 7.3)

### `POST /auth/telegram`

Тело запроса:

```json
{
  "initData": "query_id=...&user=...&hash=...",
  "initDataUnsafe": {
    "user": {
      "id": 1,
      "username": "demo"
    }
  }
}
```

Успешный ответ:

```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": 1,
    "username": "demo",
    "firstName": "Ivan",
    "lastName": "Ivanov"
  }
}
```

## Запуск

```bash
npm install
npm run dev
```

## Проверки

```bash
npm run lint
npm run build
```
