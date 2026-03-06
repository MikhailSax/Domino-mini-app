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
VITE_TELEGRAM_BOT_TOKEN=123456:telegram_bot_token
VITE_TELEGRAM_CHAT_ID=123456789
```

> Если `VITE_TELEGRAM_BOT_TOKEN` и `VITE_TELEGRAM_CHAT_ID` заданы, заказ отправляется напрямую через Bot API (`sendMessage`). Иначе используется fallback-ссылка `VITE_TELEGRAM_ORDER_LINK` для ручной отправки.

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
