---
title: Backups
layout: default
---

# Backups

--- row ---

**Backup attributes**

{:.table}
| field       | type    | description                      |
| ----------- | ------- | -------------------------------- |
| id          | string  | unique ID identifying the backup |
| created_at  | date    | when the database was created at |
| name        | string  | name of the backup               |
| size        | integer | backup size in bytes             |
| status      | string  | backup status                    |
| database_id | string  | database identifier              |
| type        | string  | database type                    |


||| col |||

Example object:

```json
{
  "id": "5b8b36104ffb090be1ac3ce1",
  "created_at": "2018-09-02T03:00:00.178+02:00",
  "name": "20180902010000_kibana-3938",
  "size": 17484513608,
  "status": "done",
  "database_id": "597601234ffb097af4f3099b",
  "type": "postgresql"
}
```

--- row ---

## List Database Backups

--- row ---

`GET https://$DB_API_URL/api/databases/[:db]/backups`

List all backups for a database

||| col |||

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DB_BEARER_TOKEN" \
  -X GET https://$DB_API_URL/api/databases/my-db-123/backups
```

Returns 200 OK

```json
{
  "database_backups": [
    {
      "id": "5bde44904ffb096c714be89c",
      "created_at": "2018-11-04T02:00:00.154+01:00",
      "started_at": "2018-11-04T02:01:00.154+01:00",
      "name": "20181104010000_kibana-3938",
      "size": 0,
      "status": "pending",
      "database_id": "597601234ffb097af4f3099b",
      "method": "periodic"
    },
    {
      "id": "5bb95a904ffb096e9a2831b8",
      "created_at": "2018-10-07T03:00:00.150+02:00",
      "started_at": "2018-10-07T03:05:00.154+01:00",
      "name": "20181007010000_kibana-3938",
      "size": 0,
      "status": "error",
      "database_id": "597601234ffb097af4f3099b",
      "method": "manual"
    },
    {
      "id": "5b8b36104ffb090be1ac3ce1",
      "created_at": "2018-09-02T03:00:00.178+02:00",
      "started_at": "2018-09-02T03:02:00.154+01:00",
      "name": "20180902010000_kibana-3938",
      "size": 17484513608,
      "status": "done",
      "database_id": "597601234ffb097af4f3099b",
      "method": "periodic"
    }
  ]
}

```

--- row ---

## Create a New Backup

--- row ---

`POST https://$DB_API_URL/api/databases/[:db]/backups`

Schedule the creation of a new backup. This query is asynchronous. The HTTP
query returns 201 and the backup creation is actually started asynchronously.

||| col |||

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DB_BEARER_TOKEN" \
  -X POST https://$DB_API_URL/api/databases/my-db-123/backups
```

Returns 201 Created

```json
{
  "database_backup": {
    "id": "5b8b36104ffb090be1ac3ce1",
    "created_at": "2018-09-02T03:00:00.178+02:00",
    "started_at": null,
    "name": "20180902010000_kibana-3938",
    "size": null,
    "status": "scheduled",
    "database_id": "597601234ffb097af4f3099b",
    "method": "periodic"
  }
}

```

--- row ---
## Get a Backup Download Link

--- row ---

`GET https://$DB_API_URL/api/databases/[:db]/backups/[:backup]/archive`

Get a pre-signed URL to download your backup

||| col |||

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DB_BEARER_TOKEN" \
  -X GET https://$DB_API_URL/api/databases/my-db-123/backups/abcdefabcdefabcdef/archive
```

Returns 200 OK

```json
{
  "download_url": "https://$DB_API_URL/api/databases/my-db-123/backups/5b8a36104ffb090be1ac3ce1/download?token=token1234"
}
```
