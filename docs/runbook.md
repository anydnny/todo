# Операционный runbook

## Локальный запуск (Docker)
```bash
docker compose -f docker-compose.dev.yml up -d --build
```

Сервисы:
- frontend
- backend
- postgres
- pgadmin (`http://localhost:5050`)
- nginx (`http://localhost`)

## Миграции базы данных
Запуск внутри контейнера backend:
```bash
docker compose -f docker-compose.dev.yml exec backend npm run migration:run
```

Показать статус миграций:
```bash
docker compose -f docker-compose.dev.yml exec backend npm run migration:show
```

Откатить последнюю миграцию:
```bash
docker compose -f docker-compose.dev.yml exec backend npm run migration:revert
```

## Сиды (данные для dev)
```bash
docker compose -f docker-compose.dev.yml exec backend npm run seed:projects
docker compose -f docker-compose.dev.yml exec backend npm run seed:tasks
```
