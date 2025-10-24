---
title: Data Access Consents
layout: default
---

# DataAccessConsents

--- row ---

**DataAccessConsent attributes**

{:.table}
| field               | type        | description                                                    |
| ------------------- | ----------- | -------------------------------------------------------------- |
| app_id              | string      | unique ID of the app, format uuid                              |
| user_id             | string      | unique ID of the user, format uuid                             |
| databases_until     | datetime    | deadline of DataAccessConsent for databases, format ISO 8601   |
| containers_until    | datetime    | deadline of DataAccessConsent for containers, format ISO 8601  |

||| col |||

Example object:

```json
{
  "data_access_consent": {
    "app_id": "ap-82a3cac5-9b25-473e-b33d-6272b87e636e",
    "user_id": "us-8ba226e5-93e0-4545-8363-9c16b2d68d67",
    "databases_until": "2022-07-06T00:00:00.000+00:00",
    "containers_until": "2022-07-06T00:00:00.000+00:00"
  }
}
```

--- row ---

## List DataAccessConsents of an App

--- row ---

`GET https://$SCALINGO_API_URL/v1/apps/:app_id/data_access_consents`

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
      "app_id": "ap-82a3cac5-9b25-473e-b33d-6272b87e636e",
      "containers_until": "2022-07-06T00:00:00.000+00:00",
      "databases_until": "2022-07-06T00:00:00.000+00:00",
      "user_id": "us-8ba226e5-93e0-4545-8363-9c16b2d68d67"
    }
  ]
}
```

--- row ---

## Create a New DataAccessConsent

--- row ---

`POST https://$SCALINGO_API_URL/v1/apps/:app_id/data_access_consents`

### URL Parameter

- `app_id`: the app ID

### Body Parameters

- `databases_until`: deadline of DataAccessConsent for databases ISO 8601
- `containers_until`: deadline of DataAccessConsent for containers ISO 8601

The values of these parameters cannot refer to dates more than 30 days in the future.

||| col |||

Example request

```shell
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/apps/example-app/data_access_consents -d \
  '{
    "data_access_consent": {
      "databases_until": "2022-07-06T00:00:00.000+00:00",
      "containers_until": "2022-07-06T00:00:00.000+00:00"
    }
  }'
```

Returns 201 Created

```json
{
  "data_access_consent": {
    "app_id": "ap-82a3cac5-9b25-473e-b33d-6272b87e636e",
    "containers_until": "2022-07-06T00:00:00.000+00:00",
    "databases_until": "2022-07-06T00:00:00.000+00:00",
    "user_id": "us-8ba226e5-93e0-4545-8363-9c16b2d68d67"
  }
}
```
