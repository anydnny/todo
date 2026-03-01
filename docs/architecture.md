# Архитектура

## Назначение
Приложение для управления задачами и проектами:
- frontend: React + Redux Toolkit
- backend: NestJS + TypeORM
- база данных: PostgreSQL
- reverse proxy: Nginx

## Контейнерная схема
```mermaid
flowchart LR
  U["Браузер пользователя"] --> N["Nginx :80"]
  N --> F["Frontend (React)"]
  N --> B["Backend (NestJS)"]
  B --> P["PostgreSQL :5432"]
  A["pgAdmin :5050"] --> P
```

## Поток запроса (создание задачи)
```mermaid
sequenceDiagram
  participant U as Пользователь
  participant FE as Frontend
  participant BE as Backend
  participant DB as PostgreSQL

  U->>FE: Отправка формы задачи (title, projectId)
  FE->>BE: POST /api/tasks
  BE->>DB: INSERT INTO tasks
  DB-->>BE: Создана запись задачи
  BE-->>FE: 201 Created + JSON задачи
  FE-->>U: Состояние UI обновлено
```

## Ответственность модулей
- `frontend`: интерфейс, управление состоянием, вызовы API.
- `backend/src/modules/projects`: CRUD проектов, защита от удаления системных проектов.
- `backend/src/modules/tasks`: CRUD задач и переключение статуса.
- `backend/src/database/migrations`: миграции схемы и данных.
- `backend/src/database/seeds`: тестовые/стартовые данные для dev.

## Ключевые архитектурные правила
- Изменения схемы БД проходят через миграции (`migration:run`), а не через ручной SQL.
- По умолчанию используется `DB_SYNCHRONIZE=false`.
- Системные проекты защищены на уровне бизнес-логики.
