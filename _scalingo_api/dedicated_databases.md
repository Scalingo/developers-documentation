---
title: Databases
layout: default
---

# Databases

--- row ---

**Database attributes**

{:.table}
| field       | type   | description                                           |
| ----------- | ------ | ----------------------------------------------------- |
| id          | string | unique ID                                             |
| name        | string | name of the database                                  |
| project_id  | string | ID of the project the database belongs to             |
| technology  | string | database technology (e.g., postgresql, mysql, mongodb)|
| plan        | string | plan name (e.g., postgresql-starter-512, mysql-business-1024) |

||| col |||

Example object:

```json
{
  "id": "54100930736f7563d5030000",
  "name": "my-postgres-db",
  "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
  "technology": "postgresql",
  "plan": "postgresql-starter-512"
}
```

--- row ---

## Create a Database

--- row ---

`POST https://$SCALINGO_API_URL/v1/databases`

### Parameters

* `database.name`: Database name. Should have between 6 and 48 lower case alphanumerical characters
  and hyphens, it can't have an hyphen at the beginning or at the end, nor two
  hyphens in a row.
* `database.technology`: Database technology identifier (e.g., `postgresql`, `mysql`, `mongodb`, `redis`, `elasticsearch`, `influxdb`)
* `database.plan_id`: Plan identifier (e.g., `postgresql-starter-512`, `mysql-business-1024`)
* `database.project_id`: (*Optional*) ID of the project to assign the database to. If not provided, the database will be assigned to your default project.

||| col |||

Example

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/databases -d \
  '{
    "database": {
      "name": "my-postgres-db",
      "technology": "postgresql",
      "plan": "postgresql-starter-512",
      "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f"
    }
  }'
```

Returns 201 Created

```json
{
  "database": {
    "id": "54100930736f7563d5030000",
    "name": "my-postgres-db",
    "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "technology": "postgresql",
    "plan": "postgresql-starter-512"
  }
}
```

--- row ---

## List Your Databases

--- row ---

`GET https://$SCALINGO_API_URL/v1/databases`

List all your databases.

||| col |||

Example

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/databases
```

Returns 200 OK

```json
{
  "databases": [
    {
      "id": "54100930736f7563d5030000",
      "name": "my-postgres-db",
      "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
      "technology": "postgresql",
      "plan": "postgresql-starter-512"
    },
    {
      "id": "54100930736f7563d5030001",
      "name": "my-redis-db",
      "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
      "technology": "redis",
      "plan": "redis-starter-256"
    }
  ]
}
```

--- row ---

## Get a Precise Database

--- row ---

`GET https://$SCALINGO_API_URL/v1/databases/[:database]`

Display a precise database.

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/databases/my-postgres-db
```

Returns 200 OK

```json
{
  "database": {
    "id": "54100930736f7563d5030000",
    "name": "my-postgres-db",
    "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "technology": "postgresql",
    "plan": "postgresql-starter-512"
  }
}
```

Returns 404 Not Found if the database doesn't exist

```json
{
  "error": "Database not found"
}
```

--- row ---
