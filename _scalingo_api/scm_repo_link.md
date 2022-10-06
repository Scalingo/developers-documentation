---
title: Integration Link
layout: default
---

# Integration Link

Link your Scalingo application to an existing integration.

--- row ---

**Integration link attributes**

{:.table}
| field                        | type    | description                                                                                         |
| -----                        | -----   | -----                                                                                               |
| id                           | string  | unique ID                                                                                           |
| app_id                       | string  | application ID                                                                                      |
| auth_integration_uuid        | string  | ID of the [scm integration](./scm_integrations) linked for authentication                        |
| linker                       | object  | description of the user that linked this repository                                                 |
| owner                        | string  | repository owner name                                                                               |
| repo                         | string  | repository name                                                                                     |
| branch                       | string  | branch used for auto deployment                                                                     |
| scm_type                     | string  | integration type                                                                                    |
| created_at                   | date    | creation date of the link                                                                           |
| updated_at                   | date    | last time the link was updated                                                                      |
| auto_deploy_enabled          | boolean | trigger a new deployment when the linked branch is updated                                          |
| deploy_review_apps_enabled   | boolean | activation of the review apps feature                                                               |
| delete_on_close_enabled      | boolean | review app: Delete the review app when the pull request is closed                                   |
| hours_before_delete_on_close | int     | review app: Time to wait before deleting a review app linked to a closed pull request (in hours)    |
| delete_stale_enabled         | boolean | review app: Delete the review app when there is no activity on the pull request                     |
| hours_before_delete_stale    | int     | review app: Time to wait for activity on the pull request before deleting the review app (in hours) |
| last_auto_deploy_at          | date    | date of the last deployment triggered by this link                                                  |


||| col |||

Example object:

```json
{
  "id": "1d6e59a0-5377-11e8-90e6-0242ac110052",
  "app_id": "1d6e59a0-5377-11e8-90e6-0242ac110052",
  "auth_integration_uuid": "14235182-54f4-4951-be65-d78020615818",
  "linker": {
    "id":"us-aa263090-9a23-81f5-8c7c-5fd9a50a8fa8",
    "username":"john",
    "email":"john.doe@example.com"
  },
  "created_at": "2018-05-09T12:52:49.985+02:00",
  "updated_at": "2019-08-08T17:42:03.386+02:00",
  "owner": "my-username",
  "repo": "my-company",
  "branch": "master",
  "scm_type": "github",
  "auto_deploy_enabled": true,
  "deploy_review_apps_enabled": true,
  "delete_on_close_enabled": true,
  "hours_before_delete_on_close": 0,
  "delete_stale_enabled": false,
  "hours_before_delete_stale": 0,
  "last_auto_deploy_at":"2019-08-30T17:42:03.385+02:00"
}
```

--- row ---

## Get all SCM Integration Links linked by your account

--- row ---

`GET https://$SCALINGO_API_URL/v1/scm_repo_links`

> Feature: This endpoint supports [pagination](/#pagination).

### Parameters

* `auth_integration_uuid`: Filter by [scm integration](./scm_integrations)

||| col |||

Request example:

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  https://$SCALINGO_API_URL/v1/scm_repo_links
```

```json
{
  "scm_repo_links": [
    {
      "id":"42d04de5-5377-11e8-90e6-0242ac110052",
      "app_id": "1d6e59a0-5377-11e8-90e6-0242ac110052",
      "auth_integration_uuid": "14235182-54f4-4951-be65-d78020615818",
      "linker": {
        "id":"us-aa263090-9a23-81f5-8c7c-5fd9a50a8fa8",
        "username":"john",
        "email":"john.doe@example.com"
      },
      "created_at":"2018-05-09T12:53:52.276+02:00",
      "updated_at":"2018-06-01T11:45:26.078+02:00",
      "owner": "my-username",
      "repo": "my-project-1",
      "branch": "master",
      "scm_type": "github",
      "auto_deploy_enabled":true,
      "github_integration_uuid":"42d04de5-5377-11e8-90e6-0242ac110052",
      "deploy_review_apps_enabled":false,
      "delete_on_close_enabled":false,
      "hours_before_delete_on_close":0,
      "delete_stale_enabled":false,
      "hours_before_delete_stale":0,
      "last_auto_deploy_at":"2018-06-01T11:45:26.077+02:00"
    }, {
      "id":"0d7955a7-0c80-462a-84e7-bd06047103f4",
      "app_id": "3c212baa-80aa-48a4-81b1-ea8daa9b508d",
      "auth_integration_uuid": "14235182-54f4-4951-be65-d78020615818",
      "linker": {
        "id":"us-aa263090-9a23-81f5-8c7c-5fd9a50a8fa8",
        "username":"john",
        "email":"john.doe@example.com"
      },
      "created_at":"2018-05-09T12:53:52.276+02:00",
      "updated_at":"2018-06-01T11:45:26.078+02:00",
      "owner": "my-username",
      "repo": "my-project-2",
      "branch": "master",
      "scm_type": "github",
      "auto_deploy_enabled":true,
      "github_integration_uuid":"42d04de5-5377-11e8-90e6-0242ac110052",
      "deploy_review_apps_enabled":false,
      "delete_on_close_enabled":false,
      "hours_before_delete_on_close":0,
      "delete_stale_enabled":false,
      "hours_before_delete_stale":0,
      "last_auto_deploy_at":"2018-06-01T11:45:26.077+02:00"
    }
  ],
  "meta": {
    "pagination": {
      "current_page": 1,
      "next_page": 2,
      "prev_page": null,
      "total_pages": 4,
      "total_count": 61
    }
  }
}
```

--- row ---

## Create a SCM Integration Link

--- row ---

`POST https://$SCALINGO_API_URL/v1/apps/:app_id/scm_repo_link`

### Parameters

* `auth_integration_uuid`: Unique ID for the authentication of [scm integration](./scm_integrations)
* `source`: URL of the SCM repository to link
* `branch`: Branch used for the auto deploy feature (optional)
* `auto_deploy_enabled`: Trigger a new deployment when changes are pushed to the
  branch specified with the `branch` parameter (optional)
* `deploy_review_apps_enabled`: Enable the [review
  app](https://doc.scalingo.com/platform/app/review-apps) feature (optional)
* `delete_on_close_enabled`: Delete review apps when the linked pull request is
  closed (optional)
* `hours_before_delete_on_close`: Time to wait before deleting a review app
  associated to a closed pull request (optional)
* `delete_stale_enabled`: Delete review apps when the linked pull request wasn't
  updated recently (optional)
* `hours_before_delete_stale`: Time to wait for activity before considering the
  pull request stale (optional)

||| col |||

Request example:

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link -d \
  '{
    "scm_repo_link" : {
      "source":"https://github.com/Scalingo/sample-go-martini",
      "branch":"master",
      "auto_deploy_enabled": true,
      "deploy_review_apps_enabled":true,
      "delete_on_close_enabled":true,
      "hours_before_delete_on_close":0,
    }
  }'
```

--- row ---

## Update a SCM Integration Link

--- row ---

`PATCH https://$SCALINGO_API_URL/v1/apps/:app_id/scm_repo_link`

### Parameters

* `branch`: Branch used for the auto deploy feature (optional)
* `auto_deploy_enabled`: Trigger a new deployment when changes are pushed to the
  branch specified with the `branch` parameter (optional)
* `deploy_review_apps_enabled`: Enable the [review
  app](https://doc.scalingo.com/platform/app/review-apps) feature (optional)
* `delete_on_close_enabled`: Delete review apps when the linked pull request is
  closed (optional)
* `hours_before_delete_on_close`: Time to wait before deleting a review app
  associated to a closed pull request (optional)
* `delete_stale_enabled`: Delete review apps when the linked pull request wasn't
  updated recently (optional)
* `hours_before_delete_stale`: Time to wait for activity before considering the
  pull request stale (optional)

||| col |||

Request example:

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X PATCH https://$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link -d \
  '{
    "scm_repo_link" : {
      "branch":"prod",
      "auto_deploy_enabled": true,
    }
  }'
```

--- row ---

## Get an Integration Link

Get the integration link associated to an application.

--- row ---

`GET https:/$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link`

||| col |||

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  https://$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link
```

```json
{
  "scm_repo_link": {
    "id":"42d04de5-5377-11e8-90e6-0242ac110052",
    "app_id": "1d6e59a0-5377-11e8-90e6-0242ac110052",
    "auth_integration_uuid": "14235182-54f4-4951-be65-d78020615818",
    "linker": {
      "id":"us-aa263090-9a23-81f5-8c7c-5fd9a50a8fa8",
      "username":"john",
      "email":"john.doe@example.com"
    },
    "created_at":"2018-05-09T12:53:52.276+02:00",
    "updated_at":"2018-06-01T11:45:26.078+02:00",
    "owner": "my-username",
    "repo": "my-company",
    "branch": "master",
    "scm_type": "github",
    "auto_deploy_enabled":true,
    "github_integration_uuid":"42d04de5-5377-11e8-90e6-0242ac110052",
    "deploy_review_apps_enabled":false,
    "delete_on_close_enabled":false,
    "hours_before_delete_on_close":0,
    "delete_stale_enabled":false,
    "hours_before_delete_stale":0,
    "last_auto_deploy_at":"2018-06-01T11:45:26.077+02:00"
  }
}
```

--- row ---

## Delete an Integration Link

--- row ---

`DELETE https://$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link`


||| col |||

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X DELETE https://$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link
```

--- row ---

## Manual Deploy

Manually deploy the given `branch`.

--- row ---

`POST https://$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link/manual_deploy`

### Parameters

* `branch`: Name of the branch that will be deployed

||| col |||

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link/manual_deploy \
  -d '{
    "branch": "master"
  }'
```
```json
{
  "deployment": {
    "app_id": "54100930736f7563d5030000",
    "created_at": "2014-09-10T10:49:42.390+02:00",
    "git_ref": "abcdef1234567890",
    "status": "build-error",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "pusher": {
      "email": "user@example.com",
      "id": "54100245736f7563d5000000",
      "username": "john"
    }
  }
}
```

--- row ---

## Manual Review App

Manually deploy a review app of the given pull request.

--- row ---

`POST https://$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link/manual_review_app`

### Parameters

* `pull_request_id`: ID of the pull request that will be deployed

||| col |||

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X POST https://$SCALINGO_API_URL/v1/apps/example-app/scm_repo_link/manual_review_app \
  -d '{
    "pull_request_id": 42
  }'
```
