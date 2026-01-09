---
title: Projects
layout: default
---

# Projects

--- row ---

**Project attributes**

{:.table}
| field                | type    | description                                         |
| -------------------- | ------- | --------------------------------------------------- |
| id                   | string  | unique ID                                           |
| name                 | string  | name of the project                                 |
| default              | boolean | is this the default project?                        |
| created_at           | date    | creation date of the project                        |
| updated_at           | date    | last time the project has been updated              |
| owner                | object  | information about the owner of the project          |
| flags                | object  | list of flags associated to the project             |

||| col |||

Example object:

```json
{
  "id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
  "name": "example-project",
  "default": false,
  "created_at": "2014-09-10T10:17:52.690+02:00",
  "updated_at": "2014-09-10T10:17:52.690+02:00",
  "owner": {
    "id": "54100245736f7563d5000000",
    "username": "john",
    "email": "user@example.com",
    "flags": {
      "beta_user": true
    }
  },
  "flags": {
    "beta_user": true
  }
}
```

--- row ---

## Create a Project

--- row ---

`POST https://$SCALINGO_API_URL/v1/projects`

### Parameters

* `project.name`: Name of the project
* `project.default`: (*Optional*) Set to true to make this the default project

||| col |||

Example

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/projects -d \
  '{
    "project": {
      "name": "example-project",
      "default": true
    }
  }'
```

Returns 201 Created

```json
{
  "project": {
    "id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "name": "example-project",
    "default": true,
    "created_at": "2014-09-10T10:17:52.690+02:00",
    "updated_at": "2014-09-10T10:17:52.690+02:00",
    "owner": {
      "id": "54100245736f7563d5000000",
      "username": "john",
      "email": "user@example.com",
      "flags": {
        "beta_user": true
      }
    },
    "flags": {
      "beta_user": true
    }
  }
}
```

--- row ---

## List Your Projects

--- row ---

`GET https://$SCALINGO_API_URL/v1/projects`

List all your projects.

||| col |||

Example

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/projects
```

Returns 200 OK

```json
{
  "projects": [
    {
      "id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
      "name": "example-project",
      "default": true,
      "created_at": "2014-09-10T10:17:52.690+02:00",
      "updated_at": "2014-09-10T10:17:52.690+02:00",
      "owner": {
        "id": "54100245736f7563d5000000",
        "username": "john",
        "email": "user@example.com",
        "flags": {
          "beta_user": true
        }
      },
      "flags": {
        "beta_user": true
    }
    }, {
      "id": "pr-91b4dbd6-2c36-584f-c44d-7383c98f747g",
      "name": "another-project",
      "default": false,
      "created_at": "2014-09-11T10:17:52.690+02:00",
      "updated_at": "2014-09-11T10:17:52.690+02:00",
      "owner": {
        "id": "54100245736f7563d5000000",
        "username": "john",
        "email": "user@example.com",
        "flags": {
          "beta_user": true
        }
      }
    }
  ]
}
```

--- row ---

## Get a precise Project

--- row ---

`GET https://$SCALINGO_API_URL/v1/projects/[:project_id]`

Display a precise project

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/projects/pr-82a3cac5-9b25-473e-b33d-6272b87e636f
```

Returns 200 OK

```json
{
  "project": {
    "id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "name": "example-project",
    "default": false,
    "created_at": "2014-09-10T10:17:52.690+02:00",
    "updated_at": "2014-09-10T10:17:52.690+02:00",
    "owner": {
      "id": "54100245736f7563d5000000",
      "username": "john",
      "email": "user@example.com",
      "flags": {
        "beta_user": true
      }
    },
    "flags": {
      "beta_user": true
    }
  }
}
```

--- row ---

## Update a Project

--- row ---

`PATCH https://$SCALINGO_API_URL/v1/projects/[:project_id]`

### Parameters

* `project.name`: (*Optional*) New name of the project
* `project.default`: (*Optional*) Set to true to make this the default project

Note: `project.default` cannot be changed from `true` to `false`.
To change the default project, update an existing project to be the new default
one, or create a new default project.

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X PATCH https://$SCALINGO_API_URL/v1/projects/pr-82a3cac5-9b25-473e-b33d-6272b87e636f -d \
  '{
    "project": {
      "name": "updated-project-name",
      "default": true
    }
  }'
```

Returns 200 OK

```json
{
  "project": {
    "id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "name": "updated-project-name",
    "default": true,
    "created_at": "2014-09-10T10:17:52.690+02:00",
    "updated_at": "2014-09-10T11:25:30.123+02:00",
    "owner": {
      "id": "54100245736f7563d5000000",
      "username": "john",
      "email": "user@example.com",
      "flags": {
        "beta_user": true
      }
    },
    "flags": {
      "beta_user": true
    }
  }
}
```

--- row ---

## Delete a Project

--- row ---

`DELETE https://$SCALINGO_API_URL/v1/projects/[:project_id]`

Delete a project

Note: The project must not contain any applications.
If the project contains applications, you must delete them first.

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X DELETE "https://$SCALINGO_API_URL/v1/projects/pr-82a3cac5-9b25-473e-b33d-6272b87e636f"
```

Returns 204 No Content

```json
{}
```

--- row ---

## Project transfer invitations

--- row ---

`GET https://$SCALINGO_API_URL/v1/projects/[:project_id]/transfer_invitations`

Project transfer invitations let a project owner transfer ownership to another collaborator.

By default only `pending` invitations are returned. Pass the `status` query parameter (for example `?status=all`) to disable the pending-only filter.

||| col |||

**Transfer invitation attributes**

{:.table}
| field           | type    | description                                                                |
| --------------- | ------- | -------------------------------------------------------------------------- |
| id              | string  | unique ID of the invitation                                                |
| project_id      | string  | ID of the project targeted by the transfer                                 |
| invited_user    | object  | invited collaborator                                                        |
| inviter         | object  | user who created the invitation                                            |
| status          | string  | one of `pending`, `accepted`, `declined`, `canceled`, `failed`              |
| status_reason   | string  | optional rationale for the current status                                   |
| expires_at      | date    | expiration date of the invitation                                           |
| created_at      | date    | creation date                                                               |
| updated_at      | date    | last update date                                                            |

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/projects/pr-82a3cac5-9b25-473e-b33d-6272b87e636f/transfer_invitations
```

Returns 200 OK

```json
{
  "transfer_invitations": [
    {
      "id": "tin-01234567-89ab-cdef-0123-456789abcdef",
      "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
      "invited_user": {
        "id": "54100245736f7563d5000000",
        "username": "alice",
        "email": "alice@example.com"
      },
      "inviter": {
        "id": "54100245736f7563d5000000",
        "username": "john",
        "email": "user@example.com"
      },
      "status": "pending",
      "status_reason": "Please confirm the transfer.",
      "expires_at": "2014-09-13T10:17:52.690+02:00",
      "created_at": "2014-09-10T10:17:52.690+02:00",
      "updated_at": "2014-09-10T10:17:52.690+02:00"
    }
  ]
}
```

--- row ---

## Get a project transfer invitation

--- row ---

`GET https://$SCALINGO_API_URL/v1/projects/[:project_id]/transfer_invitations/[:id]`

Retrieve a specific project transfer invitation. The invitation is visible to the inviter or the invited collaborator.

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/projects/pr-82a3cac5-9b25-473e-b33d-6272b87e636f/transfer_invitations/tin-01234567-89ab-cdef-0123-456789abcdef
```

Returns 200 OK

```json
{
  "transfer_invitation": {
    "id": "tin-01234567-89ab-cdef-0123-456789abcdef",
    "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "invited_user": {
      "id": "54100245736f7563d5000000",
      "username": "alice",
      "email": "alice@example.com"
    },
    "inviter": {
      "id": "54100245736f7563d5000000",
      "username": "john",
      "email": "user@example.com"
    },
    "status": "pending",
    "status_reason": "Please confirm the transfer.",
    "expires_at": "2014-09-13T10:17:52.690+02:00",
    "created_at": "2014-09-10T10:17:52.690+02:00",
    "updated_at": "2014-09-10T10:17:52.690+02:00"
  }
}
```

--- row ---

## Create a project transfer invitation

--- row ---

`POST https://$SCALINGO_API_URL/v1/projects/[:project_id]/transfer_invitations`

Project owners can create a transfer invitation for a collaborator who has access to all applications in the project. The API sets the expiration (`expires_at`) to `now + 3 days` and fails if a `pending` invitation already exists for the project.

### Parameters

* `transfer_invitation.invited_user_id`: ID of the collaborator to invite
* `transfer_invitation.status_reason`: (*Optional*) rationale for the invitation

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/projects/pr-82a3cac5-9b25-473e-b33d-6272b87e636f/transfer_invitations -d \
  '{
    "transfer_invitation": {
      "invited_user_id": "54100245736f7563d5000000",
      "status_reason": "Transfer ownership to alice"
    }
  }'
```

Returns 201 Created

```json
{
  "transfer_invitation": {
    "id": "tin-01234567-89ab-cdef-0123-456789abcdef",
    "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "invited_user": {
      "id": "54100245736f7563d5000000",
      "username": "alice",
      "email": "alice@example.com"
    },
    "inviter": {
      "id": "54100245736f7563d5000000",
      "username": "john",
      "email": "user@example.com"
    },
    "status": "pending",
    "status_reason": "Transfer ownership to alice",
    "expires_at": "2014-09-13T10:17:52.690+02:00",
    "created_at": "2014-09-10T10:17:52.690+02:00",
    "updated_at": "2014-09-10T10:17:52.690+02:00"
  }
}
```

--- row ---

## Update a project transfer invitation

--- row ---

`PATCH https://$SCALINGO_API_URL/v1/projects/[:project_id]/transfer_invitations/[:id]`

The inviter or invited collaborator can update the status of a project transfer invitation.

### Parameters

* `transfer_invitation.status`: one of `pending`, `accepted`, `declined`, `canceled`, `failed`
* `transfer_invitation.status_reason`: (*Optional*) rationale for the status

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X PATCH https://$SCALINGO_API_URL/v1/projects/pr-82a3cac5-9b25-473e-b33d-6272b87e636f/transfer_invitations/tin-01234567-89ab-cdef-0123-456789abcdef -d \
  '{
    "transfer_invitation": {
      "status": "accepted",
      "status_reason": "Confirmed ownership transfer"
    }
  }'
```

Returns 200 OK

```json
{
  "transfer_invitation": {
    "id": "tin-01234567-89ab-cdef-0123-456789abcdef",
    "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "invited_user": {
      "id": "54100245736f7563d5000000",
      "username": "alice",
      "email": "alice@example.com"
    },
    "inviter": {
      "id": "54100245736f7563d5000000",
      "username": "john",
      "email": "user@example.com"
    },
    "status": "accepted",
    "status_reason": "Confirmed ownership transfer",
    "expires_at": "2014-09-13T10:17:52.690+02:00",
    "created_at": "2014-09-10T10:17:52.690+02:00",
    "updated_at": "2014-09-10T11:00:00.000+02:00"
  }
}
```

--- row ---

## Accept a project transfer invitation (member of project)

--- row ---

`POST https://$SCALINGO_API_URL/v1/projects/[:project_id]/transfer_invitations/[:id]/accept`

The invited collaborator can accept a project transfer invitation.

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/projects/pr-82a3cac5-9b25-473e-b33d-6272b87e636f/transfer_invitations/tin-01234567-89ab-cdef-0123-456789abcdef/accept
```

Returns 200 OK

```json
{
  "transfer_invitation": {
    "id": "tin-01234567-89ab-cdef-0123-456789abcdef",
    "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "invited_user": {
      "id": "54100245736f7563d5000000",
      "username": "alice",
      "email": "alice@example.com"
    },
    "inviter": {
      "id": "54100245736f7563d5000000",
      "username": "john",
      "email": "user@example.com"
    },
    "status": "accepted",
    "status_reason": "Accepted by invited collaborator",
    "expires_at": "2014-09-13T10:17:52.690+02:00",
    "created_at": "2014-09-10T10:17:52.690+02:00",
    "updated_at": "2014-09-10T11:00:00.000+02:00"
  }
}
```

--- row ---

## Decline a project transfer invitation (member of project)

--- row ---

`POST https://$SCALINGO_API_URL/v1/projects/[:project_id]/transfer_invitations/[:id]/decline`

The invited collaborator can decline a project transfer invitation.

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/projects/pr-82a3cac5-9b25-473e-b33d-6272b87e636f/transfer_invitations/tin-01234567-89ab-cdef-0123-456789abcdef/decline
```

Returns 200 OK

```json
{
  "transfer_invitation": {
    "id": "tin-01234567-89ab-cdef-0123-456789abcdef",
    "project_id": "pr-82a3cac5-9b25-473e-b33d-6272b87e636f",
    "invited_user": {
      "id": "54100245736f7563d5000000",
      "username": "alice",
      "email": "alice@example.com"
    },
    "inviter": {
      "id": "54100245736f7563d5000000",
      "username": "john",
      "email": "user@example.com"
    },
    "status": "declined",
    "status_reason": "Declined by invited collaborator",
    "expires_at": "2014-09-13T10:17:52.690+02:00",
    "created_at": "2014-09-10T10:17:52.690+02:00",
    "updated_at": "2014-09-10T11:00:00.000+02:00"
  }
}
```
