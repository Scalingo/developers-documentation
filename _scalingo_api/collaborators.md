---
title: Collaborators
layout: default
---

# Collaborators

--- row ---

**Collaborator attributes**

{:.table}
| field          | type    | description                                                                          |
| -------------- | ------  | ------------------------------------------------------------------------------------ |
| id             | string  | unique ID                                                                            |
| email          | string  | email address                                                                        |
| username       | string  | username ("n/a": invitation is still pending)                                        |
| status         | string  | __pending__: invitation not yet accepted, __accepted__: invitation has been accepted |
| is_limited     | boolean | collaborator have a limited role                                                     |

||| col |||

Example object:

```json
{
  "email": "foo@example.com",
  "id": "54101e25736f7563d5060000",
  "status": "accepted",
  "username": "soulou",
  "is_limited": "false",
}
```

--- row ---

## List Collaborators of an App

--- row ---

`GET https://$SCALINGO_API_URL/v1/apps/[:app]/collaborators`

List all the collaborators of an app, except the owner. It also displays
the state of the invitation of those collaborators.

||| col |||

Example Request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/apps/[:app]/collaborators
```

Returns 200 OK

```json
{
    "collaborators": [
        {
            "email": "foo@example.com",
            "id": "54101e25736f7563d5060000",
            "status": "accepted",
            "username": "soulou",
            "is_limited": "false",
        },
        {
            "email": "bar@example.com",
            "id": "54102274736f7563d5070000",
            "status": "pending",
            "username": "n/a",
            "is_limited": "true",
        }
    ]
}
```

--- row ---

## Update a Collaborator

--- row ---

`PATCH https://$SCALINGO_API_URL/v1/apps/[:app_id]/collaborators/[:id]`

Only the `is_limited` field is allowed to be modified.
The endpoint does **not** allow changing email, status, or username.
It's not allowed to change the role of the SCM Linker.

||| col |||

Example Request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X PATCH https://$SCALINGO_API_URL/v1/apps/[:app]/collaborators/[:collaborator_id] \
  -d '{"collaborator": {"is_limited": true}}'
```

Returns 200 OK

```json
{
  "collaborator": {
    "email": "foo@example.com",
    "id": "54101e25736f7563d5060000",
    "status": "accepted",
    "username": "soulou",
    "is_limited": true
  }
}
```

--- row ---

## Invite Collaborator To Work on an App

--- row ---

`POST https://$SCALINGO_API_URL/v1/apps/[:app]/collaborators`

This action will create an invitation to the given person. You can invite
either someone with an account on Scalingo or someone new. In the second case,
they will be able to access the application after creating their account.

> Note: An email will be sent to the invited user.

Note that the `invitation_link` returned by this call is not bound to the email of the invited
collaborator. Hence you should never share this link publicly.

### Parameters

* `collaborator.email`: Email address of the collaborator to invite
* `collaborator.is_limited`: Whether the collaborator should have limited access (default: true)

||| col |||

Example Request

```shell

curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/apps/[:app]/collaborators -d \
  '{
     "collaborator": {
       "email":"collaborator@example.com",
       "is_limited": false
      }
   }'
```

Returns 201 Created

```json
{
    "collaborator": [
        {
            "email": "collaborator@example.com",
            "id": "54101e25736f7563d5060000",
            "status": "pending",
            "username": "n/a",
            "invitation_link": "https://my.scalingo.com/apps/collaboration?token=8415965b809c928c807dc99790e5745d97f05b8c",
            "app_id": "5343eccd646173000a140000",
            "is_limited": "false",
        }
    ]
}
```

--- row ---

## Accept an Invitation to Collaborate

--- row ---

`GET https://$SCALINGO_API_URL/v1/apps/collaboration?token=[:token]`

This action accepts an invitation to collaborate on an app. The token is given in the
`invitation_link` returned when adding a new collaborator.

||| col |||

Example Request

```shell

curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/apps/collaboration?token=8415965b809c928c807dc99790e5745d97f05b8c
```

Returns 200 OK

```json
{
  "id": "54100930736f7563d5030000",
  "name": "example-app",
  "created_at": "2014-09-10T10:17:52.690+02:00",
  "updated_at": "2014-09-10T10:17:52.690+02:00",
  "git_url": "git@scalingo.com:example-app.git",
  "last_deployed_at": "2017-02-02T10:17:53.690+02:00",
  "last_deployed_by": "john",
  "last_deployment_id": "58c2b15af1453a0001e24d23",
  "force_https": true,
  "sticky_session": false,
  "router_logs": true,
  "owner": {
    "username": "john",
    "email": "user@example.com",
    "id": "54100245736f7563d5000000"
  },
  "url": "https://example-app.scalingo.io",
  "links": {
    "deployments_stream": "wss://deployments.scalingo.com/apps/example-app"
  }
}
```

--- row ---

## Delete a Collaborator

--- row ---

`DELETE https://$SCALINGO_API_URL/v1/apps/[:app]/collaborators/[:collaborator_id]`

This action completely remove a collaborator from an app. Only the owner of the
app can execute it. The user won't be able to access, nor to deploy it.

||| col |||

Example Request

```shell

curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X DELETE https://$SCALINGO_API_URL/v1/apps/[:app]/collaborators/54101e25736f7563d5060000
```

Returns 204 No Content

--- row ---

## List owned applications collaborators

--- row ---

`GET https://$SCALINGO_API_URL/v1/collaborators`

List all collaborators assigned to any application owned by current user.
The resources returned are Collaborators enhanced with the name of the application 
which the collaborator is assigned on: `app_name`.

||| col |||

Example Request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/collaborators
```

Returns 200 OK

```json
{
    "collaborators": [
        {
            "id": "54101e25736f7563d5060000",
            "email": "foo@example.com",
            "status": "accepted",
            "user_id": "54101e25736f7563d5060000",
            "username": "soulou",
            "app_id": "54101e25736f7563d5060000",
            "app_name": "my-app",
            "is_limited": false,
        },
        {
            "id": "54102274736f7563d5070000",
            "email": "bar@example.com",
            "status": "pending",
            "user_id": null,
            "username": null,
            "app_id":  "54101e25736f7563d5060000",
            "app_name": "my-app",
            "is_limited": true,
        }
    ]
}
```
