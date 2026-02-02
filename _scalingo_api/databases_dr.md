---
title: Databases
layout: default
---

# Databases

Databases endpoints allows you to manage Databases provisioned as Dedicated Resources.

Dedicated Resource databases offer enhanced performance, isolation, and control compared to standard addon databases.

Standard addon databases should be managed via the [Addons endpoints](/addons).

--- row ---

**Database attributes**

{:.table}
| field       | type   | description                                           |
| ----------- | ------ | ----------------------------------------------------- |
| id          | string | unique ID                                             |
| name        | string | name of the database                                  |
| project_id  | string | ID of the project the database belongs to             |
| technology  | string | database technology (e.g., postgresql-dr)|
| plan        | string | plan name (e.g., postgresql-dr-starter-4096) |

||| col |||

Example object:

```json
{
  "id": "54100930736f7563d5030000",
  "name": "my-postgres-db",
  "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
  "technology": "postgresql-dr",
  "plan": "postgresql-dr-starter-4096"
}
```

--- row ---

## Create a Database

--- row ---

`POST https://$SCALINGO_API_URL/v1/databases`

### Parameters

* `database.name`: Database name. Should have between 6 and 48 lower case alphanumerical characters and hyphens.
* `database.technology`: Database technology identifier. Only `postgresql-dr` is supported for now.
* `database.plan`: Plan identifier (e.g., `postgresql-dr-starter-4096`). Available plans can be retrieved via the [Addon Providers endpoint](/addon_providers).
* `database.project_id`: (*Optional*) ID of the project to assign the database to. If not provided, the database will be assigned to your default project.

**Note:** To provision other database types (MySQL, MongoDB, Redis, etc.), please use the [Addons provisioning endpoint](/addons#provision-an-addon).

||| col |||

Example

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/databases -d \
  '{
    "database": {
      "name": "my-postgres-db",
      "technology": "postgresql-dr",
      "plan": "postgresql-dr-starter-4096",
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
    "technology": "postgresql-dr",
    "plan": "postgresql-dr-starter-4096"
  }
}
```

--- row ---

## List Your Databases

--- row ---

`GET https://$SCALINGO_API_URL/v1/databases`

List all your databases of postgresql-dr technology, including those where you are a collaborator.

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
      "technology": "postgresql-dr",
      "plan": "postgresql-dr-starter-4096"
    },
    {
      "id": "54100930736f7563d5030001",
      "name": "backup-db",
      "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
      "technology": "postgresql-dr",
      "plan": "postgresql-dr-business-4096"
    }
  ]
}
```

--- row ---

## Get a Precise Database

--- row ---

`GET https://$SCALINGO_API_URL/v1/databases/[:database]`

Display a precise database of postgresql-dr technology.

The `[:database]` parameter can be either the database ID or the database name.

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
    "technology": "postgresql-dr",
    "plan": "postgresql-dr-starter-4096"
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
