---
title: Cron Tasks
layout: default
---

# Cron Tasks

--- row ---

**Cron tasks attributes**

{:.table}
| field                   | type    | description                                  |
| ----------------------- | ------- | -------------------------------------------- |
| command                 | string  | the cron expression followed by the command  |
| size                    | string  | (optional) the size of the one-off container |

||| col |||

Example object:

```json
{
  "jobs": [
    {
      "command": "0 5 * * * rake import:orders:status",
      "size": "2XL"
    },
    {
      "command": "0 13 * * * rake export:orders"
    }
  ]
}
```

--- row ---

## Get Cron Tasks

--- row ---

`GET https://$SCALINGO_API_URL/v1/apps/[:app]/cron_tasks`


||| col |||

Example request

```
curl -H 'Accept: application/json' -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -X GET https://$SCALINGO_API_URL/v1/apps/example-app/cron_tasks
```

Returns 200 OK

```json
{
  "jobs": [
    {
      "command": "0 5 * * * rake import:orders:status",
      "size": "2XL"
    },
    {
      "command": "0 13 * * * rake export:orders"
    }
  ]
}
```
