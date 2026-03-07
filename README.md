# Todo App

Монорепозиторий приложения для управления задачами и проектами.

## Стек
- Frontend: React + Redux Toolkit + React Router + Vite
- Backend: NestJS + TypeORM
- База данных: PostgreSQL
- Инфраструктура: Docker Compose + Nginx + pgAdmin
- Unit тесты: Jest

## Структура репозитория
- `frontend` — клиентское приложение
- `backend` — API и бизнес-логика
- `nginx` — конфигурация reverse proxy
- `docs` — документация проекта
- `docker-compose.dev.yml` — dev-окружение

## Быстрый старт (Docker)
```bash
docker compose -f docker-compose.dev.yml up -d --build
```

Доступ:
- Приложение: `http://localhost`
- pgAdmin: `http://localhost:5050`

## Миграции
Запуск миграций:
```bash
docker compose -f docker-compose.dev.yml exec backend npm run migration:run
```

Статус миграций:
```bash
docker compose -f docker-compose.dev.yml exec backend npm run migration:show
```

Откат последней миграции:
```bash
docker compose -f docker-compose.dev.yml exec backend npm run migration:revert
```

## Основные API-эндпоинты
- `GET /api/projects`
- `POST /api/projects`
- `DELETE /api/projects/:id`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id/status`
- `DELETE /api/tasks/:id`

## Документация
- Архитектура: [docs/architecture.md](docs/architecture.md)
- API-контракт: [docs/api-contract.md](docs/api-contract.md)
- Модель данных: [docs/data-model.md](docs/data-model.md)
- Runbook: [docs/runbook.md](docs/runbook.md)
