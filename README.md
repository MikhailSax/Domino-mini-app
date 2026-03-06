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

# Необязательно, по умолчанию будет <VITE_API_BASE_URL>/orders/telegram
VITE_TELEGRAM_ORDER_ENDPOINT=http://localhost:8000/api/orders/telegram
VITE_TELEGRAM_BOT_TOKEN=123456:telegram_bot_token
VITE_TELEGRAM_CHAT_ID=123456789
```

> Логика отправки заказа:
> 1. Если задан `VITE_TELEGRAM_ORDER_ENDPOINT` (или доступен `${VITE_API_BASE_URL}/orders/telegram`) — отправка на endpoint.
> 2. Иначе, если заданы `VITE_TELEGRAM_BOT_TOKEN` + `VITE_TELEGRAM_CHAT_ID` — прямая отправка в Telegram Bot API (`sendMessage`).
> 3. Иначе используется `VITE_TELEGRAM_ORDER_LINK` для ручной отправки.

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
