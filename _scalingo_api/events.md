---
title: Events
layout: default
---

# Events

Events are generated automatically according to your actions,
thanks to them, you can have an overview of the activity of your
applications.

--- row ---

**Event attributes**

{:.table}
| field      | type   | description                              |
| ---------- | ------ | ---------------------------------------- |
| id         | string | unique ID of event                       |
| created_at | date   | date of creation                         |
| user       | object | embedded user who generated the event    |
| type       | string | type of event (see below for the values) |
| app_id     | string | unique ID of the app                     |
| app_name   | string | app name the event belongs to            |

Note: `app_name` is not modified when an application is renamed, it's
frozen in the event.

According to the `type` field, extra data will be included
in the structure in a `type_data` attribute:

||| col |||

Example object:

* Base event

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "typename"
}
```

--- row ---

* **New app event**

_When:_ When the application is created
`type=new_app`

{:.table}
| field      | type   | description                                                                  |
| ---------- | ------ | ---------------------------------------------------------------------------- |
| git_source | string | Optional - Reference to the GIT repository in the case of a one-click deploy |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "new_app",
  "type_data": {
    "git_source": "<GIT repository URL - Optional>"
  }
}
```

--- row ---

* **Rename app event**

_When:_ When the application is renamed to a new name
`type=rename_app`

{:.table}
| field    | type   | description                 |
| -------- | ------ | --------------------------- |
| old_name | string | Old name of the application |
| new_name | string | New name of the application |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "rename_app",
  "type_data": {
    "old_name": "old-app-name",
    "new_name": "new-app-name"
  }
}
```

--- row ---

* **Transfer app event**

_When:_ When the application is transferred to a new owner
`type=transfer_app`

{:.table}
| field              | type   | description                    |
| ------------------ | ------ | ------------------------------ |
| old_owner.id       | string | ID of the previous owner       |
| old_owner.email    | string | Email of the previous owner    |
| old_owner.username | string | Username of the previous owner |
| new_owner.id       | string | ID of the new owner            |
| new_owner.email    | string | Email of the new owner         |
| new_owner.username | string | Username of the new owner      |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "rename_app",
  "type_data": {
    "old_owner": {
      "username": "johndoe",
      "email": "john@doe.com",
      "id": "51e6bc626edfe40bbb000001"
    },
    "new_owner": {
      "username": "new-johndoe",
      "email": "new-john@doe.com",
      "id": "51e6bc626edfe40bbb000002"
    }
  }
}
```
--- row ---

* **Restart event**

_When:_ The application or some containers have been restarted
`type=restart`

{:.table}
| field          | type   | description                                           |
| -------------- | ------ | ----------------------------------------------------- |
| scope          | array  | The scope of the restart, null is all                 |
| addon_provider | string | The name of the addon which restarted the application |

**Note:** If an addon restart the application, the user array won't be present.
And if an user restart the application, the addon_name will be blank.

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "restart",
  "type_data": {
    "scope": ["web", "worker"]
  }
}
```

--- row ---

* **Scale event**

_When:_ The application has been scaled out
`type=scale`

{:.table}
| field               | type   | description                        |
| ------------------- | ------ | ---------------------------------- |
| previous_containers | object | The formation before the operation |
| containers          | object | The formation after the request    |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "scale",
  "type_data": {
    "previous_containers": {
      "web": 1,
      "worker": 0
    },
    "containers": {
      "web": 2,
      "worker": 1
    }
  }
}
```
--- row ---

* **Deployment event**

_When:_ A deployment has been done
`type=deployment`

{:.table}
| field           | type     | description                                                             |
| --------------- | -------- | ----------------------------------------------------------------------- |
| deployment_id   | string   | Unique ID of the [Deployment](/deployments) associated to the event     |
| deployment_type | string   | Type of deployment (deployment or archive)                              |
| pusher          | string   | Username of the user having pushed the code                             |
| git_ref         | string   | GIT SHA of the deployed code                                            |
| git_ref_url     | string   | SCM Integration URL of the git ref deployed                             |
| status          | string   | Status of the deployment ([details](/deployments))                      |
| stack           | string   | [Stack](/stacks) used by the deployment                                 |
| duration        | integer  | Duration of the deployment in seconds                                   |
| finished_at     | datetime | Date & Time when deployment was done                                    |
| last_commits    | object   | Object containing last commits of the deployment                        |

Last commits:

{:.table}
| field     | type   | description           |
| --------- | ------ | --------------------- |
| commits   | array  | List of commits       |
| remaining | int    | Number of commits     |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "deployment",
  "type_data": {
    "deployment_id" : "5343eccd646aa3012a140230",
    "deployment_type": "deployment",
    "pusher": "johndoe",
    "git_ref": "0123456789abcdef",
    "git_ref_url": "https://github.com/johndoe/repo/commit/58c778ff1c6d275c49af18adca456acd98db4ad0",
    "status": "success",
    "duration": 40,
    "stack": "scalingo-18",
    "finished_at": "2019-12-24T01:00:00.000+00:00",
    "last_commits": {
      "commits": [],
      "remaining": 0
    }
  }
}
```

--- row ---

* **Run event**

_When:_ Someone runs `scalingo run` from the [CLI](https://cli.scalingo.com)
`type=run`

{:.table}
| field          | type    | description                                 |
| -------------- | ------  | ------------------------------------------- |
| command        | string  | The command run by the user                 |
| audit_log_id   | string  | ID of the audit log generated by the one-off |
| audit_log_size | integer | Size (in bytes) of the audit log            |
| detached       | boolean | The one-off is detached                     |


||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "run",
  "type_data": {
    "command": "bundle exec rake db:migrate",
    "audit_log_id": "abcdef-1234-aaaa-bbbb",
    "audit_log_size": 122445385
  }
}
```

--- row ---

* **New Domain event**

_When:_ Each time a custom domain name is added to the app
`type=new_domain`

{:.table}
| field     | type    | description                        |
| --------- | ------- | ---------------------------------- |
| hostname  | string  | Hostname of the custom domain      |
| ssl       | boolean | Custom SSL certificate added       |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "new_domain",
  "type_data": {
    "name" : "example.com",
    "ssl" : false
  }
}
```

--- row ---

* **Edit Domain event**

_When:_ When a domain is updated, (set or remove SSL)
`type=edit_domain`

{:.table}
| field     | type    | description                       |
| --------- | ------- | --------------------------------- |
| hostname  | string  | Hostname of the custom domain     |
| ssl       | boolean | Custom SSL certificate added      |
| old_ssl   | boolean | Previous state of the SSL cert    |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "edit_domain",
  "type_data": {
    "hostname": "example.com",
    "old_ssl": false,
    "ssl": true
  }
}
```

--- row ---

* **Delete Domain event**

_When:_ Remove a custom domain from an app
`type=delete domain`

{:.table}
| field     | type    | description                        |
| --------- | ------- | ---------------------------------- |
| hostname  | string  | Hostname of the custom domain      |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "delete_domain",
  "type_data": {
    "hostname" : "example.com"
  }
}
```

--- row ---

* **New Addon event**

_When:_ Each time an addon is added to the app
`type=new_addon`

{:.table}
| field               | type   | description                         |
| ------------------- | ------ | ----------------------------------- |
| addon_provider_name | string | Name of the addon provider          |
| plan_name           | string | Plan associated to the addon        |
| resource_id         | string | Resource ID given by addon provider |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "new_addon",
  "type_data": {
    "addon_provider_name": "scalingo-mysql",
    "plan_name" : "free",
    "resource_id": "0abcdef-123456-bcccde-1bcdef"
  }
}
```

--- row ---

* **Upgrade Addon event**

_When:_ The plan of the addon has been changed
`type=upgrade_addon`

{:.table}
| field               | type   | description                         |
| ------------------- | ------ | ----------------------------------- |
| addon_provider_name | string | Name of the addon provider          |
| old_plan_name       | string | Previous plan of the addon          |
| new_plan_name       | string | New plan associated to the addon    |
| resource_id         | string | Resource ID given by addon provider |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "new_addon",
  "type_data": {
    "addon_provider_name": "scalingo-mysql",
    "old_plan_name" : "free",
    "new_plan_name" : "1g",
    "resource_id": "0abcdef-123456-bcccde-1bcdef"
  }
}
```

--- row ---

* **Delete Addon event**

_When:_ The addon has been removed from the app
`type=delete_addon`

{:.table}
| field               | type   | description                         |
| ------------------- | ------ | ----------------------------------- |
| addon_provider_name | string | Name of the addon provider          |
| plan_name           | string | Plan associated to the addon        |
| resource_id         | string | Resource ID given by addon provider |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "new_addon",
  "type_data": {
    "addon_provider_name": "scalingo-mysql",
    "plan_name" : "1g",
    "resource_id": "0abcdef-123456-bcccde-1bcdef"
  }
}
```

--- row ---

* **Database - Add Feature event**

_When:_ A feature is added to a database addon
`type=database/add_feature`

{:.table}
| field               | type   | description                             |
| ------------------- | ------ | --------------------------------------- |
| feature             | string | Name of the addon enabled addon feature |
| addon_provider_name | string | Name of the addon provider              |
| addon_provider_id   | string | ID of the addon    provider             |
| addon_uuid          | string | ID (UUIDv4) of the addon resource       |
| remote_ip           | string | Remote IP doing the action              |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "database/add_feature",
  "type_data": {
    "feature": "force-ssl",
    "remote_ip": "1.2.3.4",
    "addon_uuid": "ad-012345678-1234-5678-12345678",
    "addon_provider_id": "6343eccd646173000a140000",
    "addon_provider_name": "postgresql"
  }
}
```

--- row ---

* **Database - Remove feature event**

_When:_ A feature has been removed from a database addon
`type=database/remove_feature`

{:.table}
| field               | type   | description                              |
| ------------------- | ------ | ---------------------------------------- |
| feature             | string | Name of the addon disabled addon feature |
| addon_provider_name | string | Name of the addon provider               |
| addon_provider_id   | string | ID of the addon provider                 |
| addon_uuid          | string | ID (UUIDv4) of the addon resource        |
| remote_ip           | string | Remote IP doing the action               |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "database/remove_feature",
  "type_data": {
    "feature": "force-ssl",
    "remote_ip": "1.2.3.4",
    "addon_uuid": "ad-012345678-1234-5678-12345678",
    "addon_provider_id": "6343eccd646173000a140000",
    "addon_provider_name": "postgresql"
  }
}
```

--- row ---

* **New Collaborator event**

_When:_ Each time a collaboration invitation is sent
`type="new_collaborator"`

{:.table}
| field                    | type   | description                            |
| ------------------------ | ------ | -------------------------------------- |
| collaborator.email       | string | Email of the invited person            |
| collaborator.is_limited  | string | Is limited collaborator                |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "new_collaborator",
  "type_data": {
    "collaborator": {
      "email": "test@example.com",
      "is_limited": false,
    }
  }
}
```

--- row ---

* **Accept Collaborator event**

_When:_ The invitee accepts the collaboration invitation for an app
`type="accept_collaborator"`

{:.table}
| field                         | type   | description                            |
| ----------------------------- | ------ | -------------------------------------- |
| collaborator.id               | string | ID of the invited user if user exists  |
| collaborator.email            | string | Email of the invited person            |
| collaborator.username         | string | Username of the invited person         |
| collaborator.inviter.email    | string | Email of the inviter                   |
| collaborator.inviter.username | string | Username of the inviter                |
| collaborator.is_limited       | string | Is limited collaborator                |


||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "test-example",
    "email": "test@example.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "edit_collaborator",
  "type_data": {
    "collaborator": {
      "id": "51e6bc626edfe40bbb000001",
      "email": "test@example.com",
      "username": "text-example",
      "inviter": {
        "email": "john@doe.com",
        "username": "johndoe"
      },
      "is_limited": false,
    }
  }
}
```

--- row ---

* **Delete Collaborator event**

_When:_ The collaborator has been removed from the app
`type="delete_collaborator"`

{:.table}
| field                         | type   | description                                              |
| ----------------------------- | ------ | -------------------------------------------------------- |
| collaborator.id               | string | ID of the collaborator                                   |
| collaborator.email            | string | Email of the collaborator (if collaboration accepted)    |
| collaborator.username         | string | Username of the collaborator (if collaboration accepted) |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "delete_collaborator",
  "type_data": {
    "collaborator": {
      "id": "51e6bc626edfe40bbb000002",
      "username": "test-example",
      "email": "test@example.com"
    }
  }
}
```

--- row ---

* **Change Collaborator Role event**

_When:_ The collaborator role has been changed for the app
`type="change_collaborator_role"`

{:.table}
| field                         | type    | description                        |
| ----------------------------- | ------  | ---------------------------------- |
| collaborator.id               | string  | ID of the collaborator             |
| collaborator.email            | string  | Email of the collaborator          |
| collaborator.username         | string  | Username of the collaborator       |
| collaborator.is_limited       | boolean | Is the collaborator limited or not |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "delete_collaborator",
  "type_data": {
    "collaborator": {
      "id": "51e6bc626edfe40bbb000002",
      "username": "test-example",
      "email": "test@example.com",
      "is_limited": true,
    }
  }
}
```

--- row ---

* **New Variable event**

_When:_ Each time a variable is added to the application
`type=new_variable`

{:.table}
| field     | type   | description                        |
| --------- | ------ | ---------------------------------- |
| name      | string | Name of the newly created variable |
| value     | string | Value of the new variable          |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "new_event",
  "type_data": {
    "name" : "VAR1",
    "value" : "VAL1"
  }
}
```

--- row ---

* **Edit Variable event**

_When:_ Each time a variable is modified
`type=edit_variable`

{:.table}
| field     | type   | description                             |
| --------- | ------ | --------------------------------------- |
| name      | string | Name of the modified variable           |
| value     | string | New value of the modified variable      |
| old_value | string | Previous value of the modified variable |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "edit_variable",
  "type_data": {
    "name" : "VAR1",
    "old_value" : "VAL1",
    "value" : "VAL2"
  }
}
```

--- row ---

* **Edit multiple variables event**

_When:_ Each time the bulk updates is used
`type=edit_variables`

{:.table}
| field                    | type   | description                         |
| ------------------------ | ------ | ----------------------------------- |
| new_vars                 | array  | List of the newly created variables |
| updated_vars             | array  | List of the updated variables       |
| deleted_vars             | array  | List of the deleted variables       |
| new_vars[].name          | string | Name of the variable                |
| new_vars[].value         | string | Value of the variable               |
| updated_vars[].name      | string | Name of the variables               |
| updated_vars[].old_value | string | Old value of the updated variable   |
| updated_vars[].value     | string | New value of the updated variable   |
| deleted_vars[].name      | string | Name of the variable                |
| deleted_vars[].value     | string | Value of the variable               |

||| col |||

Example object

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "edit_variable",
  "type_data": {
    "updated_vars": [{
      "name": "VAR1",
      "value": "VAL1"
    }],
    "new_vars": [{
      "name": "VAR2",
      "value": "VAL2",
      "old_value": "OLD_VAL2"
    }]
  }
}
```

--- row ---

* **Delete variable event**

_When:_ Each time a variable is deleted
`type=delete_variable`

{:.table}
| field | type   | description                   |
| ----- | ------ | ----------------------------- |
| name  | string | Name of the deleted variable  |
| value | string | Value of the deleted variable |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "delete_variable",
  "type_data": {
    "name" : "VAR1",
    "value" : "VAL2"
  }
}
```

--- row ---

* **Add Credit event**

_When:_ After adding credit (i.e. with PayPal)
`type=add_credit`

{:.table}
| field          | type   | description                   |
| -------------- | ------ | ----------------------------- |
| payment_method | string | Type of payment done          |
| amount         | float  | Amount of credit added        |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "add_credit",
  "type_data": {
    "payment_method" : "paypal",
    "value" : 50.0
  }
}
```

--- row ---

* **Add Payment Method event**

_When:_ When you register a payment method like a credit card for your account
`type=add_payment_method`

{:.table}
| field           | type   | description                               |
| --------------- | ------ | ----------------------------------------- |
| billing_profile | object | Object containing your the payment method |

Billing Profile:

{:.table}
| field               | type   | description                |
| ------------------- | ------ | -------------------------- |
| company             | string | Company name               |
| vat_number          | string | EU VAT registration number |
| payment_method_type | string | Payment method type name   |
| stripe              | object | data about credit card     |

Stripe:

{:.table}
| field  | type   | description                |
| -------| ------ | -------------------------- |
| brand  | string | Brand of the card          |
| last4  | string | Last 4 numbers of the card |
| exp    | string | Expiry date of the card    |


||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "add_payment_method",
  "type_data": {
    "company": "Scalingo SAS",
    "vat_number" : "FR0000000000",
    "payment_method_type": "stripe",
    "stripe": {
      "brand": "mastercard",
      "last4": "4242",
      "exp": "01/2017"
    }
  }
}
```

--- row ---

* **Add Voucher event**

_When:_ A voucher has been added
`type=add_voucher`

{:.table}
| field  | type   | description  |
| -------| ------ | ------------ |
| code   | string | Voucher code |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "add_voucher",
  "type_data": {
    "code": "MYVOUCHER"
  }
}
```

--- row ---

* **New Log Drain event**

_When:_ Each time a log drain is added to an app
`type=new_log_drain`

{:.table}
| field  | type   | description          |
| -------| ------ | -------------------- |
| url    | string | URL of the log drain |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "new_log_drain",
  "type_data": {
    "url": "tcp+tls://localhost:8080"
  }
}
```

--- row ---

* **Delete Log Drain event**

_When:_ Each time a log drain is deleted from an app
`type=delete_log_drain`

{:.table}
| field  | type   | description          |
| -------| ------ | -------------------- |
| url    | string | URL of the log drain |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "delete_log_drain",
  "type_data": {
    "url": "tcp+tls://localhost:8080"
  }
}
```

--- row ---

* **New Addon Log Drain event**

_When:_ Each time a log drain is added to an addon
`type=new_addon_log_drain`

{:.table}
| field      | type   | description          |
| ---------- | ------ | -------------------- |
| url        | string | URL of the log drain |
| addon_uuid | string | UUID of the addon    |
| addon_name | string | Name of the addon    |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "new_log_drain",
  "type_data": {
    "url": "tcp+tls://localhost:8080",
    "addon_uuid": "0abcdef-123456-bcccde-1bcdef",
    "addon_name": "mongo"
  }
}
```

--- row ---

* **Delete Addon Log Drain event**

_When:_ Each time a log drain is deleted from an addon
`type=delete_addon_log_drain`

{:.table}
| field      | type   | description          |
| ---------- | ------ | -------------------- |
| url        | string | URL of the log drain |
| addon_uuid | string | UUID of the addon    |
| addon_name | string | Name of the addon    |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "delete_log_drain",
  "type_data": {
    "url": "tcp+tls://localhost:8080",
    "addon_uuid": "0abcdef-123456-bcccde-1bcdef",
    "addon_name": "mongo"
  }
}
```

--- row ---

* **Link an SCM integration to an App event**

_When:_ Each time an SCM integration link is created to an app
`type=link_scm`

{:.table}
| field                        | type    | description                                                                                      |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| repo_name                    | string  | Name of the repository                                                                           |
| linker_username              | string  | Username of the linker                                                                           |
| source                       | string  | Source URL of the repository                                                                     |
| branch                       | string  | Branch of the repository the integration link is made to                                         |
| auto_deploy                  | boolean | Auto-deploy the app when the parametered branch is updated                                       |
| auto_deploy_review_apps      | boolean | Auto-deploy a Review App when a Pull/Merge Request is opened                                     |
| delete_on_close              | boolean | Delete the Review App when the related Pull/Merge Request is closed                              |
| delete_stale                 | boolean | Delete the Review App when the related Pull/Merge Request is staled                              |
| hours_before_delete_on_close | integer | Hours before deleting the Review App when the related Pull/Merge Request is closed               |
| hours_before_delete_stale    | integer | Hours before deleting the Review App when the related Pull/Merge Request is staled               |
| creation_from_forks_allowed  | boolean | Auto-deploy a Review App when a Pull/Merge Request is opened on a fork of the related repository |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2020-09-22T09:00:00.000Z",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "link_scm",
  "type_data": {
    "repo_name": "johndoe/sample-go-martini",
    "linker_username": "johndoe",
    "source": "https://github.com/johndoe/sample-go-martini",
    "branch": "main",
    "auto_deploy": true,
    "auto_deploy_review_apps": true,
    "delete_on_close": true,
    "delete_stale": true,
    "hours_before_delete_on_close": 5,
    "hours_before_delete_stale": 0,
    "creation_from_forks_allowed": false
  }
}
```

--- row ---

* **Update an SCM integration from an App event**

_When:_ Each time an SCM integration link is created to an app
`type=update_scm`

{:.table}
| field                        | type    | description                                                                                      |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| repo_name                    | string  | Name of the repository                                                                           |
| linker_username              | string  | Username of the linker                                                                           |
| source                       | string  | Source URL of the repository                                                                     |
| branch                       | string  | Branch of the repository the integration link is made to                                         |
| auto_deploy                  | boolean | Auto-deploy the app when the parametered branch is updated                                       |
| auto_deploy_review_apps      | boolean | Auto-deploy a Review App when a Pull/Merge Request is opened                                     |
| delete_on_close              | boolean | Delete the Review App when the related Pull/Merge Request is closed                              |
| delete_stale                 | boolean | Delete the Review App when the related Pull/Merge Request is staled                              |
| hours_before_delete_on_close | integer | Hours before deleting the Review App when the related Pull/Merge Request is closed               |
| hours_before_delete_stale    | integer | Hours before deleting the Review App when the related Pull/Merge Request is staled               |
| creation_from_forks_allowed  | boolean | Auto-deploy a Review App when a Pull/Merge Request is opened on a fork of the related repository |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2020-09-22T09:00:00.000Z",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "update_scm",
  "type_data": {
    "repo_name": "johndoe/sample-go-martini",
    "linker_username": "johndoe",
    "source": "https://github.com/johndoe/sample-go-martini",
    "branch": "main",
    "auto_deploy": true,
    "auto_deploy_review_apps": true,
    "delete_on_close": true,
    "delete_stale": true,
    "hours_before_delete_on_close": 5,
    "hours_before_delete_stale": 0,
    "creation_from_forks_allowed": false
  }
}
```

--- row ---

* **Unlink an SCM integration from an App event**

_When:_ Each time an SCM integration link is deleted from an app
`type=unlink_scm`

{:.table}
| field             | type   | description                                 |
| ----------------- | ------ | ------------------------------------------- |
| repo_name         | string | Name of the repository                      |
| unlinker_username | string | Username of the unlinker                    |
| source            | string | Source URL of the repository                |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2020-09-22T09:10:00.000Z",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type": "unlink_scm",
  "type_data": {
    "repo_name": "johndoe/sample-go-martini",
    "linker_username": "johndoe",
    "source": "https://github.com/johndoe/sample-go-martini"
  }
}
```

--- row ---

* **Review App created event**

_When:_ Each time a Review App is created
`type=create_review_app`

{:.table}
| field                | type    | description                                                            |
| -------------------- | ------- | ---------------------------------------------------------------------- |
| review_app_name      | string  | Name of the Review App                                                 |
| review_app_url       | string  | Dashboard URL of the Review App                                        |
| source_repo_name     | string  | Name of the repository the Pull/Merge Request originates from          |
| source_repo_url      | string  | URL of the repository the Pull/Merge Request originates from           |
| pr_name              | string  | Pull/Merge Request name                                                |
| pr_number            | integer | Pull/Merge Request number                                              |
| pr_url               | string  | Pull/Merge Request URL                                                 |
| pr_comes_from_a_fork | boolean | Whether the Pull/Merge Request originates from a fork of the repository |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2020-09-22T09:00:00.000Z",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "sample-go-martini",
  "type": "create_review_app",
  "type_data": {
    "review_app_name": "sample-go-martini-pr2",
    "review_app_url": "https://dashboard.scalingo.com/sample-go-martini-pr2",
    "source_repo_name": "johndoe/sample-go-martini",
    "source_repo_url": "https://github.com/johndoe/sample-go-martini",
    "pr_name": "Update the name",
    "pr_number": 3,
    "pr_url": "https://github.com/johndoe/sample-go-martini/pull/3",
    "pr_comes_from_a_fork": false
  }
}
```

--- row ---

* **Review App destroyed event**

_When:_ Each time a Review App is destroyed
`type=destroy_review_app`

{:.table}
| field                | type    | description                                                             |
| -------------------- | ------- | ----------------------------------------------------------------------- |
| review_app_name      | string  | Name of the Review App                                                  |
| source_repo_name     | string  | Name of the repository the Pull/Merge Request originates from           |
| source_repo_url      | string  | URL of the repository the Pull/Merge Request originates from            |
| pr_name              | string  | Pull/Merge Request name                                                 |
| pr_number            | integer | Pull/Merge Request number                                               |
| pr_url               | string  | Pull/Merge Request URL                                                  |
| pr_comes_from_a_fork | boolean | Whether the Pull/Merge Request originates from a fork of the repository |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2020-09-22T09:00:00.000Z",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "sample-go-martini",
  "type": "destroy_review_app",
  "type_data": {
    "review_app_name": "sample-go-martini-pr2",
    "review_app_url": "https://dashboard.scalingo.com/sample-go-martini-pr2",
    "source_repo_name": "johndoe/sample-go-martini",
    "source_repo_url": "https://github.com/johndoe/sample-go-martini",
    "pr_name": "Update the name",
    "pr_number": 3,
    "pr_url": "https://github.com/johndoe/sample-go-martini/pull/3",
    "pr_comes_from_a_fork": false
  }
}
```

--- row ---

* **Successful Login**

_When:_ A successful login occurred
`type=login_success`

{:.table}
| field     | type   | description                |
| --------- | ------ | -------------------------- |
| remote_ip | string | Remote IP doing the action |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "login_success",
  "type_data": {
    "remote_ip": "1.2.3.4"
  }
}
```

--- row ---

* **Failed Login**

_When:_ A failed login attempt occurred
`type=login_failure`

{:.table}
| field     | type   | description                |
| --------- | ------ | -------------------------- |
| remote_ip | string | Remote IP doing the action |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "login_failure",
  "type_data": {
    "remote_ip": "1.2.3.4"
  }
}
```

--- row ---

* **Password Reset Query**

_When:_ A password reset attempt has been initiated
`type=password_reset_query`

{:.table}
| field     | type   | description                |
| --------- | ------ | -------------------------- |
| remote_ip | string | Remote IP doing the action |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "password_reset_query",
  "type_data": {
    "remote_ip": "1.2.3.4"
  }
}
```

--- row ---

* **Password Reset Success**

_When:_ Password was reseted successfully
`type=password_reset_success`

{:.table}
| field     | type   | description                |
| --------- | ------ | -------------------------- |
| remote_ip | string | Remote IP doing the action |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "password_reset_success",
  "type_data": {
    "remote_ip": "1.2.3.4"
  }
}
```

--- row ---

* **Account Locked**

_When:_ 10 Failed login attempted locked the account
`type=login_lock`

{:.table}
| field     | type   | description                |
| --------- | ------ | -------------------------- |
| remote_ip | string | Remote IP doing the action |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "login_lock",
  "type_data": {
    "remote_ip": "1.2.3.4"
  }
}
```

--- row ---

* **Account Unlocked**

_When:_ Account has been unlocked
`type=login_unlock_success`

{:.table}
| field     | type   | description                |
| --------- | ------ | -------------------------- |
| remote_ip | string | Remote IP doing the action |

||| col |||

Example object:

```json
{
  "id": "54dcdd4a73636100011a0000",
  "created_at": "2015-02-12T18:05:14.226+01:00",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type": "login_unlock_success",
  "type_data": {
    "remote_ip": "1.2.3.4"
  }
}
```

--- row ---

* **New Data Access Consent**

_When:_ Data Access Consent has been created
`type=create_data_access_consent`

{:.table}
| field               | type        | description                             |
| ------------------- | ----------- | --------------------------------------- |
| end_at              | datetime    | deadline of DataAccessConsent ISO 8601  |
| databases           | boolean     | to allow databases                      |
| containers          | boolean     | to allow databases                      |
| remote_ip           | string      | Remote IP doing the action              |

||| col |||

Example object:

```json
{
  "id":"54dcdd4a73636100011a0000",
  "created_at":"2022-07-01T13:29:12.679Z",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "type":"create_data_access_consent",
  "type_data":
    {
      "end_at":"2022-07-14T00:00:00.000+00:00",
      "databases":true,
      "containers":true,
      "remote_ip": "1.2.3.4"
    },
}
```

--- row ---

* **Edit HDS Contact**

_When:_ HDS Contact has been updated
`type=edit_hds_contact`

{:.table}
| field            | type      | description                     |
| ---------------- | --------- | ------------------------------- |
| name             | string    | name of the contact             |
| email            | string    | email of the contact            |
| phone_number     | string    | phone_number of the contact     |
| company          | string    | company of the contact          |
| address_line1    | string    | address_line1 of the contact    |
| address_line2    | string    | address_line2 of the contact    |
| address_city     | string    | address_city of the contact     |
| address_zip      | string    | address_zip of the contact      |
| address_country  | string    | address_country of the contact  |
| notes            | string    | notes about the contact         |
| remote_ip        | string    | Remote IP doing the action      |

||| col |||

Example object:

```json
{
  "id":"62d13ad1a5b6ec0001e553c8",
  "created_at":"2022-07-15T10:00:49.703Z",
  "type":"edit_hds_contact",
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type_data":
    {
      "name":"Médecin",
      "email":"test@test.com",
      "phone_number":"0600000006",
      "company":"company",
      "address_line1":"23 rue du bois",
      "address_line2":null,
      "address_city":"Strasbourg",
      "address_zip":"67000",
      "address_country":"FR",
      "notes":"test",
      "remote_ip": "1.2.3.4"
    },
}
```

--- row ---

* **Stack changed**

_When:_ App stack has been changed
`type=stack_changed`

{:.table}
| field                         | type      | description                     |
| ------------------------------| --------- | ------------------------------- |
| previous_stack_id             | string    | Previous stack Id               |
| current_stack_id              | string    | Current stack Id                |
| previous_stack_name           | string    | Previous stack name             |
| current_stack_name            | string    | Current stack name              |

||| col |||

Example object:

```json
{
  "id":"62d13ad1a5b6ec0001e553c8",
  "created_at":"2022-07-15T10:00:49.703Z",
  "type":"stack_changed",
  "app_id": "5343eccd646173000a140000",
  "app_name": "appname",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type_data": {
    "previous_stack_id": "st-2f83d71f-505c-4b40-89b4-04912cbfa911",
    "current_stack_id": "st-9d5bf098-01df-4194-8160-9779cfbc7122",
    "previous_stack_name": "scalingo-20",
    "current_stack_name": "scalingo-22"
  }
}
```

--- row ---

* **Database Maintenance Planned**

_When:_ A maintenance is scheduled on your database
`type=plan_database_maintenance`

{:.table}
| field                       | type     | description                                        |
| --------------------------- | -------- | -------------------------------------------------- |
| maintenance_id              | string   | The related maintenance ID                         |
| addon_name                  | string   | The related addon name                             |
| maintenance_type            | string   | The type of maintenance executed                   |
| maintenance_window_in_hours | integer  | The maintenance window duration (in hours)         |
| next_maintenance_window     | datetime | The beginning date of your next maintenance window |

||| col |||

Example object:

```json
{
  "id": "650312574002c001afcdf988",
  "created_at": "2023-09-14T14:01:59.916Z",
  "type": "plan_database_maintenance",
  "app_id": "649e9d0389bca600016ea61b",
  "app_name": "sample-go-martini",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type_data": {
    "addon_name": "Redis",
    "maintenance_id": "6503020ba8acb51a3278cf81",
    "maintenance_type": "no-op",
    "maintenance_window_in_hours": 8,
    "next_maintenance_window": "2023-09-14T21:00:00.000Z"
  }
}
```

--- row ---

* **Database Maintenance Started**

_When:_ A maintenance began on your database
`type=start_database_maintenance`

{:.table}
| field                       | type     | description                                        |
| --------------------------- | -------- | -------------------------------------------------- |
| maintenance_id              | string   | The related maintenance ID                         |
| addon_name                  | string   | The related addon name                             |
| maintenance_type            | string   | The type of maintenance executed                   |
| maintenance_window_in_hours | integer  | The maintenance window duration (in hours)         |
| next_maintenance_window     | datetime | The beginning date of your next maintenance window |

||| col |||

Example object:

```json
{
  "id": "650312574002c001afcdf988",
  "created_at": "2023-09-14T14:01:59.916Z",
  "type": "start_database_maintenance",
  "app_id": "649e9d0389bca600016ea61b",
  "app_name": "sample-go-martini",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type_data": {
    "addon_name": "Redis",
    "maintenance_id": "6503020ba8acb51a3278cf81",
    "maintenance_type": "no-op",
    "maintenance_window_in_hours": 8,
    "next_maintenance_window": "2023-09-14T21:00:00.000Z"
  }
}
```

--- row ---

* **Database Maintenance Completed**

_When:_ A maintenance as completed on your database
`type=complete_database_maintenance`

{:.table}
| field                       | type     | description                                        |
| --------------------------- | -------- | -------------------------------------------------- |
| maintenance_id              | string   | The related maintenance ID                         |
| addon_name                  | string   | The related addon name                             |
| maintenance_type            | string   | The type of maintenance executed                   |
| maintenance_window_in_hours | integer  | The maintenance window duration (in hours)         |
| next_maintenance_window     | datetime | The beginning date of your next maintenance window |

||| col |||

Example object:

```json
{
  "id": "650312574002c001afcdf988",
  "created_at": "2023-09-14T14:01:59.916Z",
  "type": "complete_database_maintenance",
  "app_id": "649e9d0389bca600016ea61b",
  "app_name": "sample-go-martini",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type_data": {
    "addon_name": "Redis",
    "maintenance_id": "6503020ba8acb51a3278cf81",
    "maintenance_type": "no-op",
    "maintenance_window_in_hours": 8,
    "next_maintenance_window": "2023-09-14T21:00:00.000Z"
  }
}
```

--- row ---

* **New Project Created**

_When:_ A new project has been created
`type=new_project`

{:.table}
| field   | type    | description                                     |
| ------- | ------- | ----------------------------------------------- |
| default | boolean | Whether the project is a default project or not |

||| col |||

Example object:

```json
{
  "id": "650312574002c001afcdf988",
  "created_at": "2023-09-14T14:01:59.916Z",
  "project_id": "649e9d0389bca600016ea61b",
  "project_name": "project-1",
  "type": "new_project",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type_data": {
    "default": true
  }
}
```

--- row ---

* **Project Edited**

_When:_ A project is renamed and/or switched from/to default
`type=edit_project`

{:.table}
| field                      | type    | description                        |
| ------------------------   | ------- | ---------------------------------- |
| updated_values             | array   | List of the updated variables      |
| updated_values[].name      | string  | Name of the attribute              |
| updated_values[].value     | string  | New value of the updated attribute |
| updated_values[].old_value | string  | Old value of the updated attribute |

||| col |||

Example object:

```json
{
  "id": "650312574002c001afcdf988",
  "created_at": "2023-09-14T14:01:59.916Z",
  "project_id": "649e9d0389bca600016ea61b",
  "project_name": "project-1",
  "type": "edit_project",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type_data": {
    "updated_values": [
      {"name": "name", "value": "new-project-name", "old_value": "initial-project-name"},
      {"name": "default", "value": false, "old_value": true}
    ]
  }
}
```

--- row ---

* **Project Deleted**

_When:_ A project has been deleted
`type=delete_project`

{:.table}
| field   | type    | description                                     |
| ------- | ------- | ----------------------------------------------- |

||| col |||

Example object:

```json
{
  "id": "650312574002c001afcdf988",
  "created_at": "2023-09-14T14:01:59.916Z",
  "project_id": "649e9d0389bca600016ea61b",
  "project_name": "project-1",
  "type": "delete_project",
  "user": {
    "username": "johndoe",
    "email": "john@doe.com",
    "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
  },
  "type_data": {}
}
```

--- row ---
## List the Events of an App

--- row ---

With this list of events, you can reconstruct the timeline of an application.

`GET https://$SCALINGO_API_URL/v1/apps/[:app]/events`

> Feature: This endpoint supports [pagination](/#pagination).

### Parameters

* `from` (Optional, min: 1, max: 72): Send the event from the last N hours. (Override any pagination options)

Request Example

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" https://$SCALINGO_API_URL/v1/apps/[:app]/events
```

Returns 200 OK

||| col |||

Response object:

```json
{
  "events": [
  {
    "id": "54dcdd4a73636100011a0000",
    "created_at": "2015-02-12T18:05:14.226+01:00",
    "user": {
      "username": "johndoe",
      "email": "john@doe.com",
      "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
    },
    "app_id": "5343eccd646173000a140000",
    "app_name": "appname",
    "type": "run",
    "type_data": {
      "command": "rake db:migrate"
    }
  }, {
    "id": "54dcdd4a73636100011a0000",
    "created_at": "2015-02-12T18:05:14.226+01:00",
    "user": {
      "username": "johndoe",
      "email": "john@doe.com",
      "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
    },
    "app_id": "5343eccd646173000a140000",
    "app_name": "appname",
    "type": "deployment",
    "type_data": {
      "deployment_id": "5343eccd646aa3012a140230",
      "pusher": "johndoe",
      "git_ref" : "0123456789abcdef",
      "status": "success",
      "duration": 40
    }
  }, (...)],
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

## List Current User Events

--- row ---

With this list of events, you can reconstruct the timeline of your user. You'll
get the events which have been done by the user on themself, and on their apps.

`GET https://$SCALINGO_API_URL/v1/events`

> Feature: This endpoint supports [pagination](/#pagination).

--- row ---

Request Example

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" https://$SCALINGO_API_URL/v1/events
```

Returns 200 OK

||| col |||

Response object:

```json
{
  "events": [
    {
      "id": "54dcdd4a73636100011a0000",
      "created_at": "2015-02-12T18:01:52.000+01:00",
      "user": {
        "username": "johndoe",
        "email": "john@doe.com",
        "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
      },
      "type": "run",
      "type_data": {
        "payment_method": "paypal",
        "amount": 50.0
      }
    }, {
      "id": "54dcdd4a73636100011a0000",
      "created_at": "2015-02-12T18:05:14.226+01:00",
      "user": {
        "username": "johndoe",
        "email": "john@doe.com",
        "id": "us-0e6d8e46-5cd0-42a4-acba-372b2be605ac"
      },
      "app_id": "5343eccd646173000a140000",
      "app_name": "appname",
      "type": "run",
      "type_data": {
        "command": "rake db:migrate"
      }
    }, (...)
  ],
  "meta": {
    "pagination": {
      "current_page": 1,
      "next_page": 2,
      "prev_page": null,
      "total_pages": 13,
      "total_count": 252
    }
  }
}
```
