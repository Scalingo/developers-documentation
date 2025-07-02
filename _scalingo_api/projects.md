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
