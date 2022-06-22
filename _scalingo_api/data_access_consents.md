---
title: Data Access Consents
layout: default
---

# DataAccessConsents

--- row ---

**DataAccessConsent attributes**

{:.table}
| field               | type    | description                             |
| ------------------- | ------- | --------------------------------------- |
| id                  | string  | unique ID                               |
| created_at          | date    | date of creation                        |
| updated_at          | date    | date of last update                     |
| app_id              | string  | unique ID of the app                    |
| user_id             | string  | unique ID of the user                   |
| end_at              | date    | deadline of DataAccessConsent ISO 8601 |
| databases           | boolean | to allow databases                      |
| containers          | boolean | to allow databases                      |

||| col |||

Example object:

```json
{
  "data_access_consent": {
    "id": "87b1ea4bfb0de6000fb8cbad",
    "created_at": "2022-06-21T15:56:43.446Z",
    "updated_at": "2022-06-21T15:56:43.446Z",
    "app_id": "875ebfcbfb0de6000f7c9d93",
    "user_id": "875941fa623d3a000f164df0",
    "end_at": "2022-07-14",
    "databases": true,
    "containers": false
  }
}
```

--- row ---

## List DataAccessConsents of an App

--- row ---

`GET https://$SCALINGO_API_URL/v1/apps/:app/data_access_consents`

||| col |||

Example request

```shell
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/apps/example-app/data_access_consents
```

Returns 200 OK

```json
{
  "data_access_consents": [
    {
      "id": "82b1ea4bfb0de6030fb8cbad",
      "app_id": "825ebfcbfb0de6500f6c9d94",
      "containers": false,
      "created_at": "2022-06-21T15:56:43.446Z",
      "databases": true,
      "end_at": "2022-07-14",
      "updated_at": "2022-06-21T15:56:43.446Z",
      "user_id": "825942fa623d3a050f864df0"
    }
  ]
}
```

--- row ---

## Create a New DataAccessConsent

--- row ---

`POST https://$SCALINGO_API_URL/v1/apps/:app_id/data_access_consents`

### Url Parameter

- `example-app`: the urlized app name

### Body Parameters

- `end_at`: deadline of DataAccessConsent format ISO 8601
- `databases`: boolean to allow databases
- `containers`: boolean to allow databases

||| col |||

Example request

```shell
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/apps/example-app/data_access_consents -d \
  '{
    "data_access_consent": {
      "end_at": "2022-07-14",
      "databases": true,
      "containers": false
    }
  }'
```

Returns 201 Created

```json
{
  "data_access_consent": {
    "id": "87b1ea4bfb0de6500fb8cbad",
    "app_id": "875ebfcbfb0de6000f7c9d93",
    "containers": false,
    "created_at": "2022-06-21T15:56:43.446Z",
    "databases": true,
    "end_at": "2022-07-14",
    "updated_at": "2022-06-21T15:56:43.446Z",
    "user_id": "875941fa623d3a000f164df0"
  }
}
```
