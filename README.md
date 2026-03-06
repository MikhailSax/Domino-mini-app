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
VITE_TELEGRAM_ORDER_ENDPOINT=http://localhost:8000/api/orders/telegram
```

> Безопасный вариант: мини‑приложение отправляет заказ на ваш backend (`VITE_TELEGRAM_ORDER_ENDPOINT`), а backend уже вызывает Telegram Bot API (`sendMessage`) с токеном, который хранится только на сервере. Если endpoint не задан, используется fallback-ссылка `VITE_TELEGRAM_ORDER_LINK` для ручной отправки.

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
