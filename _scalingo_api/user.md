---
title: User Account
layout: default
---

# User Account

--- row ---

**User attributes**

{:.table}
| field                 | type    | description                                         |
| --------------        | ------  | ----------------------------------------------------|
| id                    | string  | unique ID. Prefixed with `us-`.                     |
| uuid                  | string  | unique ID. Same as the `id`.                        |
| email                 | string  | email address                                       |
| username              | string  | username                                            |
| created_at            | date    | creation date of the user account                   |
| free_trial_started_at | date    | starting date of the free trial                     |
| free_trial_end_time   | date    | ending date of the free trial                       |
| suspended_at          | date    | date of the account suspension                      |
| suspension_reason     | string  | reason of the account suspension                    |
| company               | string  | company name                                        |
| location              | string  | user's location                                     |
| fullname              | string  | user's full name (first and last name)              |
| tos_accepted          | boolean | true if the terms of service have been accepted     |
| email_newsletter      | boolean | true if the user subscribed to the newsletter       |
| referral_url          | string  | referral URL for the user referral program          |
| referral_clicks       | integer | number of clicks on the user referral link          |
| flags                 | object  | list of flags associated to the account             |
| limits                | object  | custom limits associated to the account             |
| role                  | string  | user role chosen during the signup process          |

||| col |||

Example object:

```json
{
  "id": "us-d13d3065-e7fa-4b1a-827a-ce1c92415f9c",
  "created_at": "2016-06-02T17:07:39.000Z",
  "email": "documentation@scalingo.com",
  "username": "doc-account",
  "uuid": "us-d13d3065-e7fa-4b1a-827a-ce1c92415f9c",
  "company": "Scalingo",
  "location": "Strasbourg",
  "fullname": "Étienne Michon",
  "tos_accepted": true,
  "flags": {},
  "limits": {
    "free_trial_apps": "10"
  },
  "referral_url": "https://sclng.io/r/81e5168dadc0bfe0",
  "referral_clicks": 23,
  "free_trial_started_at": "2016-06-02T17:07:39.000Z",
  "free_trial_end_time": "2016-07-02T23:07:00.000Z",
  "suspended_at": null,
  "suspension_reason": null,
  "email_newsletter": false
}
```

--- row ---

## Get Current User Account

--- row ---

`GET https://$SCALINGO_API_URL/v1/users/self`

Get the information associated to the current user account.

||| col |||

Example Request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/users/self
```

Returns 200 OK

```json
{
  "user": {
    "id": "us-d13d3065-e7fa-4b1a-827a-ce1c92415f9c",
    "created_at": "2016-06-02T17:07:39.000Z",
    "email": "documentation@scalingo.com",
    "username": "doc-account",
    "uuid": "us-d13d3065-e7fa-4b1a-827a-ce1c92415f9c",
    "company": "Scalingo",
    "location": "Strasbourg",
    "fullname": "Étienne Michon",
    "tos_accepted": true,
    "flags": {},
    "limits": {
      "free_trial_apps": "10"
    },
    "referral_url": "https://sclng.io/r/81e5168dadc0bfe0",
    "referral_clicks": 23,
    "free_trial_started_at": "2016-06-02T17:07:39.000Z",
    "free_trial_end_time": "2016-07-02T23:07:00.000Z",
    "suspended_at": null,
    "suspension_reason": null,
    "email_newsletter": false
  }
}
```

--- row ---

## Update User Account

--- row ---

`PATCH https://$SCALINGO_API_URL/v1/users/[:user_id]`

or

`PUT https://$SCALINGO_API_URL/v1/users/[:user_id]`

Updates some user account information.

### Parameters

* `user.email`: new email address.
* `user.username`: new username.

All attributes are optional.

||| col |||

Example Request

```shell

curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X PATCH https://$SCALINGO_API_URL/v1/users/[:user_id] -d \
  '{
     "user": {
       "email":"new-documentation@scalingo.com"
      }
   }'
```

Returns 200 OK

```json
{
  "user": {
    "id": "us-d13d3065-e7fa-4b1a-827a-ce1c92415f9c",
    "created_at": "2016-06-02T17:07:39.000Z",
    "email": "new-documentation@scalingo.com",
    "username": "doc-account",
    "uuid": "us-d13d3065-e7fa-4b1a-827a-ce1c92415f9c",
    "company": "Scalingo",
    "location": "Strasbourg",
    "fullname": "Étienne Michon",
    "tos_accepted": true,
    "flags": {},
    "limits": {
      "free_trial_apps": "10"
    },
    "referral_url": "https://sclng.io/r/81e5168dadc0bfe0",
    "referral_clicks": 23,
    "free_trial_started_at": "2016-06-02T17:07:39.000Z",
    "free_trial_end_time": "2016-07-02T23:07:00.000Z",
    "suspended_at": null,
    "suspension_reason": null,
    "email_newsletter": false
  }
}
```

--- row ---

## Get Account Usage

--- row ---

`GET https://$SCALINGO_API_URL/v1/account/usage`

Get the account usage between two given dates.

### Parameters

* `from`: get the account usage starting at this date.
* `to`: get the account usage up to this date.

Both dates must be in the form `YYYY-MM-DD` and are optional.

> ⚠️ `price`, `hourly_price` and `thirtydays_price` are deprecated fields.

||| col |||

Example Request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/account/usage?from=2020-10-01&to=2020-11-01
```

Returns 200 OK

```json
{
  "usage": {
      "app": "my-app",
      "app_id": "5343eccd646173000a140000",
      "status": "running",
      "runtimes": [{
        "size": {
          "id": "b46b1a69-085f-4b9a-ba01-241bd6f658fb",
          "human_cpu": "standard CPU priority",
          "name": "M",
          "human_name": "M",
          "memory": 536870912,
          "ordinal": 3,
          "hourly_price": 20,
          "thirtydays_price": 1440,
          "sku": "osc-fr1-app-M"
        },
        "price": 1.65,
        "duration": 4949,
      }],
      "addon_usages": [{
        "addon": {
          "id": "ad-c488c1a9-72ca-4bb1-9ac4-08e47281a2aa",
          "app_id": "5f2abcb8bb7bad000103bc1e",
          "resource_id": "my_app_4724",
          "addon_provider": {
            "id": "mysql",
            "name": "MySQL",
            "logo_url": "//cdn.scalingo.com/addons/Scalingo_MySQL.svg"
          },
          "plan": {
            "id": "5f58e6886f339c0001297383",
            "name": "mysql-sandbox",
            "display_name": "Sandbox",
            "price": 0,
            "description": "<p>Scalingo MySQL addon</p>\n",
            "position": 0,
            "on_demand": false,
            "disabled": false,
            "disabled_alternative_plan_id": null,
            "sku": "osc-fr1-mysql-sandbox"
          },
        },
        "price": 1.65,
        "runtime": 4949,
        "provisioned_at": "2020-10-02T08:04:37.248Z",
        "status": "running",
        "deprovisioned_at": null,

      }],
      "first_month": "8/2020"
    }, {
      "app": "my-app-2",
      ...
    }
  }
}
```

--- row ---

## Delete User Account

--- row ---

`DELETE https://$SCALINGO_API_URL/v1/users`

Deletes the user account.

> This action deletes all the owned applications.

||| col |||

Example Request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X DELETE https://$SCALINGO_API_URL/v1/users
```

Returns 204 No Content

--- row ---

## Retrieve available roles

--- row ---

`GET https://$SCALINGO_API_URL/v1/users/roles`

Retrieve a list of all available roles applicable to user accounts.

||| col |||

Example Request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/users/roles
```

Returns 200 OK

```json
{
  "roles": [
    "freelancer",
    "student",
    "hobbyist",
    "entrepreneur",
    "developer",
    "devops",
    "it_consultant",
    "web_agency",
    "cto_engineering_manager",
    "founder",
    "other",
    "no_answer"
  ]
}
```
