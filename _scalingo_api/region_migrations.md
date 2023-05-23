---
title: Region Migrations
layout: default
---

# Region Migrations

--- row ---

**Region Migration Attributes**

{:.table}
| field            | type      | description                     |
| ---------------- | --------- | ------------------------------- |
| id               | string    | unique ID                       |
| src_app_name | string | Source application name |
| app_id | string | Source application ID |
| dst_app_name | string | Destination application name |
| new_app_id | string | Destination application ID |
| source | string | Origin region |
| destination | string | Destination region |
| status | string | migration status |
| started_at | date | migration starting date |
| finished_at | date | migration finished date |
| steps | array | list of the migration steps with their associated status |

**Step Attributes**

| field            | type      | description                     |
| ---------------- | --------- | ------------------------------- |
| id               | string    | unique step ID                       |
| name               | string    | step name                        |
| status | string    | step status |
| logs | string    | step logs                       |

||| col |||

Example object:

```json
{
  "id": "b0c20b95-5e89-43cb-a44a-7a392a74aeea",
  "src_app_name": "example-app",
  "dst_app_name": "example-app",
  "app_id": "646c87a161d8b2000f7025c3",
  "new_app_id": null,
  "status": "preflight-success",
  "started_at": "2023-05-23T09:30:51.305Z",
  "finished_at": "2023-05-23T09:30:52.670Z",
  "source": "osc-fr1",
  "destination": "osc-secnum-fr1",
  "steps": [
    {
      "id": "6652daa6-cb05-4e9d-a4e9-14961382fd13",
      "name": "Check addon versions",
      "status": "done",
      "logs": null
    },
    {
      "id": "e61af2eb-52a1-4319-ae63-6934132055d9",
      "name": "Check certificate validity",
      "status": "done",
      "logs": null
    },
    {
      "id": "7c324e46-2ec5-4a77-bf62-441bd3c6ad10",
      "name": "Check addons compatibility",
      "status": "done",
      "logs": null
    },
    {
      "id": "a23ea514-8f7c-4c8e-86f9-c8204c0945d7",
			"name": "Check if the name example-app is available on osc-secnum-fr1",
      "status": "done",
      "logs": "#<ApiService::App:0x000055e9e86e5c68>"
    },
    {
      "id": "14a923aa-fbdb-4236-81be-c195f81c7415",
      "name": "Preflight checks",
      "status": "done",
      "logs": null
    }
  ]
}
```

--- row ---

## List Migrations of an Application

--- row ---

`GET https://$SCALINGO_API_URL/v1/apps/:app_id/region_migrations`

### URL Parameter

- `app_id`: the application ID or name

||| col |||

Example request

```shell
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/apps/example-app/region_migrations
```

Returns 200 OK

```json
[
	{
		"id": "b0c20b95-5e89-43cb-a44a-7a392a74aeea",
		"src_app_name": "example-app",
		"dst_app_name": "example-app",
		"app_id": "646c87a161d8b2000f7025c3",
		"new_app_id": null,
		"status": "preflight-success",
		"started_at": "2023-05-23T09:30:51.305Z",
		"finished_at": "2023-05-23T09:30:52.670Z",
		"source": "osc-fr1",
		"destination": "osc-secnum-fr1",
		"steps": [
			{
				"id": "6652daa6-cb05-4e9d-a4e9-14961382fd13",
				"name": "Check addon versions",
				"status": "done",
				"logs": null
			},
			{
				"id": "e61af2eb-52a1-4319-ae63-6934132055d9",
				"name": "Check certificate validity",
				"status": "done",
				"logs": null
			},
			{
				"id": "7c324e46-2ec5-4a77-bf62-441bd3c6ad10",
				"name": "Check addons compatibility",
				"status": "done",
				"logs": null
			},
			{
				"id": "a23ea514-8f7c-4c8e-86f9-c8204c0945d7",
				"name": "Check if the name example-app is available on osc-secnum-fr1",
				"status": "done",
				"logs": "#<ApiService::App:0x000055e9e86e5c68>"
			},
			{
				"id": "14a923aa-fbdb-4236-81be-c195f81c7415",
				"name": "Preflight checks",
				"status": "done",
				"logs": null
			}
		]
	}
]
```

--- row ---

## Create a Migration

--- row ---

`POST https://$SCALINGO_API_URL/v1/apps/:app_id/region_migrations`

### URL Parameter

- `app_id`: the application ID or name

||| col |||

Example request

```shell
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/apps/example-app/region_migrations -d \
	'{"migration": {"osc-secnum-fr1"}}'
```

Returns 201 Created

```json
[
	{
		"id": "b0c20b95-5e89-43cb-a44a-7a392a74aeea",
		"src_app_name": "example-app",
		"dst_app_name": "example-app",
		"app_id": "646c87a161d8b2000f7025c3",
		"new_app_id": null,
		"status": "created",
		"started_at": "2023-05-23T09:30:51.305Z",
		"finished_at": null
		"source": "osc-fr1",
		"destination": "osc-secnum-fr1",
		"steps": []
	}
]
```

--- row ---

## Abort a Migration

--- row ---

`POST https://$SCALINGO_API_URL/v1/apps/:app_id/region_migrations/:migration_id/run`

### URL Parameter

- `app_id`: the application ID or name
- `migration_id`: the region migration ID

### Body Parameter

- `step`: with the `abort` value

||| col |||

Example request

```shell
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/apps/example-app/region_migrations/b0c20b95-5e89-43cb-a44a-7a392a74aeea/run -d \
	'{"step": "abort"}'
```

Returns 204 No Content

--- row ---

## Run a Migration Step

--- row ---

`POST https://$SCALINGO_API_URL/v1/apps/:app_id/region_migrations/:migration_id/run`

### URL Parameter

- `app_id`: the application ID or name
- `migration_id`: the region migration ID

### Body Parameter

- `step`: with one of the values `prepare`, `data` or `finalize`

||| col |||

Example request

```shell
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/apps/example-app/region_migrations/b0c20b95-5e89-43cb-a44a-7a392a74aeea/run -d \
	'{"step": "prepare"}'
```

Returns 204 No Content
