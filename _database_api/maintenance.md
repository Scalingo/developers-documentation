---
title: Maintenance
layout: default
---

# Maintenance

--- row ---

**Maintenance attributes**

{:.table}
| field       | type   | description                      |
| ----------  | ------ | -------------------------------- |
| id          | string | unique ID                        |
| database_id | string | database identifier              |
| type        | string | type of the maintenance          |
| status      | string | status of the maintenance        |
| started_at  | date   | when the maintenance started     |
| ended_at    | date   | when the maintenance ended       |

||| col |||

Example object:

```json
{
  "maintenance": {
    "id": "my-maintenance-123",
    "database_id": "my-db-123",
    "type": "no-op",
    "status": "done",
    "started_at": "2023-07-04T15:59:50.407Z",
    "ended_at": "2023-07-04T15:59:50.408Z"
  }
}
```
--- row ---

## List database Maintenance

--- row ---

`GET https://$DB_API_URL/api/databases/[:db_id]/maintenance

List maintenance of a specific database.
This endpoint supports [pagination](/#pagination).

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DB_BEARER_TOKEN" \
  -X GET https://$DB_API_URL/api/databases/my-db-123/maintenance
```

Returns 200 OK

```json
{
  "maintenance": [
    {
      "id": "my-maintenance-1",
      "database_id": "my-db-123",
      "type": "no-op",
      "status": "scheduled",
      "started_at": null,
      "ended_at": null
    },
    {
      "id": "my-maintenance-2",
      "database_id": "my-db-123",
      "type": "no-op",
      "status": "done",
      "started_at": "2023-07-04T15:59:50.407Z",
      "ended_at": "2023-07-04T15:59:50.408Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "prev_page":null,
    "next_page":null,
    "total_pages":1,
    "total_count":2
  }
}
```

--- row ---

## Retrieve Maintenance Information

--- row ---

`GET https://$DB_API_URL/api/databases/[:db_id]/maintenance/[:maintenance_id]`

Retrieve information of a specific maintenance.

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DB_BEARER_TOKEN" \
  -X GET https://$DB_API_URL/api/databases/my-db-123/maintenance/my-maintenance-123
```

Returns 200 OK

```json
{
  "maintenance": {
    "id": "my-maintenance-123",
    "database_id": "my-db-123",
    "type": "no-op",
    "status": "done",
    "started_at": "2023-07-04T15:59:50.407Z",
    "ended_at": "2023-07-04T15:59:50.408Z"
  }
}
```

