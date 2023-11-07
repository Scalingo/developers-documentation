---
title: Users
layout: default
---

# Users

--- row ---

**User attributes**

{:.table}
| field           | type    | description                         |
| --------------- | ------- | ----------------------------------- |
| name            | string  | name of the user                    |
| read_only       | boolean | true if the user is read only       |
| dbms_attributes | object  | data about the user in the database |

**DBMS attributes**

{:.table}
| field               | type   | description                                                                             |
| ------------------- | ------ | --------------------------------------------------------------------------------------- |
| password_encryption | string | encryption algorithm used for the user password. can be either "SCRAM-SHA-256" or "MD5" |

||| col |||

Example object:

```json
{
  "name": "metabase",
  "read_only": true,
  "dbms_attributes" : {
    "password_encryption" : "SCRAM-SHA-256"
  }
}
```

--- row ---

## List Database Users

--- row ---

`GET https://$DB_API_URL/api/databases/[:db]/users`

List all users for a database.

||| col |||

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DB_BEARER_TOKEN" \
  -X GET https://$DB_API_URL/api/databases/my-db-123/users
```

Returns 200 OK

```json
{
  "database-users": [
    {
      "name": "my-db-123",
      "read_only": false
    },
    {
      "name": "metabase",
      "read_only": true
    }
  ]
}

```

--- row ---

## Create a New User

--- row ---

`POST https://$DB_API_URL/api/databases/[:db]/users`

Create a new user on the given database. The HTTP query returns 201.

### Parameters

* `name`: Should have between 6 and 32 lower case alphanumerical characters and hyphens. It can't have an hyphen at the beginning or at the end, nor two hyphens in a row.
* `password` and `password_confirmation`: (*Optional*) Password of the new user. If none is provided, Scalingo will generate one and display it in a toast notification.
* `read_only`: Should the new user be read only?

||| col |||

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DB_BEARER_TOKEN" \
  -X POST https://$DB_API_URL/api/databases/my-db-123/users -d \
  '{
    "database_user": {
      "database_id": "5c599fd6f18b3202f7ab4e66",
      "name": "my-user",
      "read_only": false,
      "password": null,
      "password_confirmation": null
    }
  }'
```

Returns 201 Created

```json
{
  "name": "my-user",
  "read_only": false,
  "password": "K-j9UbDpdbok8Yy4sLcl",
  "dbms_attributes" : {
    "password_encryption" : "SCRAM-SHA-256"
  }
}

```

--- row ---

## Delete a User

--- row ---

`DELETE https://$DB_API_URL/api/databases/[:db]/users/[:username]`

||| col |||

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DB_BEARER_TOKEN" \
  -X DELETE https://$DB_API_URL/api/databases/my-db-123/users/my-user
```

Returns 204 No Content
