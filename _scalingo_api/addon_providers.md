---
title: Addon providers
layout: default
---

# Addon providers

--- row ---

**Addon provider attributes**

{:.table}
| field             | type    | description                            |
| ----------------- | ------- | -------------------------------------- |
| id                | string  | unique ID                              |
| name              | string  | name                                   |
| logo_url          | string  | URL of the addon logo                  |
| short_description | string  | short description                      |
| description       | string  | description                            |
| category          | object  | embedded category object               |
| provider_name     | string  | name of company offering this addon    |
| provider_url      | string  | URL of company offering this addon     |
| plans             | array   | embedded array of plans for this addon |
| hds_available     | boolean | is this addon HDS compliant            |

||| col |||

Example object:

```json
{
    "name": "PostgreSQL",
    "logo_url": "//cdn.scalingo.com/addons/Scalingo_Postgresql.svg",
    "id": "postgresql",
    "short_description": "Your PostgreSQL server in a dedicated process sealed in a Docker container. You can scale up and down with ease in a few seconds and adapt it to the needs of your app.",
    "description": "Create PostgreSQL databases on-demand.",
    "provider_name": "Scalingo",
    "provider_url": "https://scalingo.com/databases/postgresql",
    "plans": [
        {
            "id": "5cc45d3e3e6b3b001249e5a5",
            "name": "postgresql-sandbox",
            "display_name": "Sandbox",
            "price": 0,
            "description": "[HTML Description]",
            "position": 10,
            "on_demand": false,
            "disabled": false,
            "disabled_alternative_plan_id": null,
            "sku": "fr1-pg-sandbox",
            "pricings": {
                "default": {
                    "price": "0.0",
                    "currency": "EUR",
                    "period": "minute"
                }
            },
            "hds_available": false
        },
        {
            "id": "5cc45d223e6b3b001249e5a3",
            "name": "postgresql-starter-512",
            "display_name": "Starter 512M",
            "price": 7.2,
            "description": "[HTML Description]",
            "position": 11,
            "on_demand": false,
            "disabled": false,
            "disabled_alternative_plan_id": null,
            "sku": "fr1-pg-start-512m",
            "pricings": {
                "default": {
                    "price": "0.0001666667",
                    "currency": "EUR",
                    "period": "minute"
                }
            },
            "hds_available": false
        }
    ]
}
```

--- row ---

**Addon plan attributes**

{:.table}
| field                        | type    | description                                 |
| ---------------------------- | ------- | ------------------------------------------- |
| id                           | string  | unique ID                                   |
| name                         | string  | name (internal reference)                   |
| display_name                 | string  | user friendly name                          |
| price                        | float   | in euros                                    |
| description                  | string  | description of this plan                    |
| sku                          | string  | Stock Keeping Unit aka Products catalog ID  |
| on_demand                    | boolean | is this addon available only on demand      |
| hds_available                | boolean | is this plan HDS compliant                  |
| pricings                     | object  | details of the pricings by catalog          |
| disabled                     | boolean | is this plan disabled                       |
| disabled_alternative_plan_id | string  | ID of other plan if this plan disabled      |
| position                     | integer | order of "importance" when displayed        |

> ⚠️ `price` is a deprecated field.


||| col |||

Example object:

```json
{
    "id": "54071fa5646173000b010000",
    "name": "postgresql-sandbox",
    "display_name": "Sandbox",
    "price": 0,
    "position": 10,
    "on_demand": false,
    "description": "[HTML Description]",
    "sku": "fr1-pg-sandbox",
    "pricings": {
        "default": {
            "price": "0.0",
            "currency": "EUR",
            "period": "minute"
        }
    },
    "hds_available": false
}
```

--- row ---

**Addon category attributes**

{:.table}
| field       | type    | description                          |
| ----------- | ------- | ------------------------------------ |
| id          | string  | unique ID                            |
| description | string  | description of the category          |
| name        | string  | name                                 |
| position    | integer | order of "importance" when displayed |

||| col |||

Example object:

```json
{
  "id": "54c6909b61646d0001000000",
  "description": "[Markdown description]",
  "name": "Data stores",
  "position": 1
}
```

--- row ---

## List addon providers

--- row ---

`GET https://$SCALINGO_API_URL/v1/addon_providers`

The endpoint return the list of the addons you can provision for your app,
including the different available plans.

### Parameters

* `category_id`: Filter the addon providers per category

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" \
 -X GET https://$SCALINGO_API_URL/v1/addon_providers

curl -H "Accept: application/json" -H "Content-Type: application/json" \
 -X GET https://$SCALINGO_API_URL/v1/addon_providers?category_id=5c9ba51326e28200e79ad3b2
```

Returns 200 OK

```json
{
    "addon_providers": [
        {
            "name": "PostgreSQL",
            "logo_url": "//cdn.scalingo.com/addons/Scalingo_Postgresql.svg",
            "id": "postgresql",
            "short_description": "Your PostgreSQL server in a dedicated ...",
            "description": "[HTML Description]",
            "provider_name": "Scalingo",
            "provider_url": "https://scalingo.com/databases/postgresql",
            "hds_available": true,
            "category": {
                "id": "5c9ba51326e28200e79ad3b2",
                "name": "Databases",
                "description": "",
                "position": 1
            },
            "plans": [
                {
                    "id": "5cc45d3e3e6b3b001249e5a5",
                    "name": "postgresql-sandbox",
                    "display_name": "Sandbox",
                    "price": 0,
                    "description": "[HTML Description]",
                    "position": 10,
                    "on_demand": false,
                    "disabled": false,
                    "disabled_alternative_plan_id": null,
                    "sku": "fr1-pg-sandbox",
                    "pricings": {
                        "default": {
                            "price": "0.0",
                            "currency": "EUR",
                            "period": "minute"
                        }
                    },
                    "hds_available": false
                },
                {
                    "id": "5cc45d223e6b3b001249e5a3",
                    "name": "postgresql-starter-512",
                    "display_name": "Starter 512M",
                    "price": 7.2,
                    "description": "[HTML Description]",
                    "position": 11,
                    "on_demand": false,
                    "disabled": false,
                    "disabled_alternative_plan_id": null,
                    "sku": "fr1-pg-start-512m",
                    "pricings": {
                        "default": {
                            "price": "0.0001666667",
                            "currency": "EUR",
                            "period": "minute"
                        }
                    },
                    "hds_available": false
                }
            ...
            ]
        },
        {
            "name": "MySQL",
            "logo_url": "//cdn.scalingo.com/addons/Scalingo_MySQL_20171006.svg",
            "id": "mysql",
            "short_description": "Your MySQL server in a dedicated process ...",
            "description": "[HTML Description]",
            "provider_name": "Scalingo",
            "provider_url": "https://scalingo.com/databases/mysql",
            "hds_available": true,
            "category": {
                "id": "5c9ba51326e28200e79ad3b2",
                "name": "Databases",
                "description": "",
                "position": 1
            },
            "plans": [...
            ]
        }
    ]
}
```

--- row ---

## List addon categories

--- row ---

`GET https://$SCALINGO_API_URL/v1/addon_categories`

Return the different categories of the available addons

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" \
 -X GET https://$SCALINGO_API_URL/v1/addon_categories
```

Returns 200 OK

```json
{
    "addon_categories": [
        {
            "id": "54c6909b61646d0001000000",
            "description": "[Markdown description]",
            "name": "Data stores",
            "position": 1
        }, ...
    ]
}
```
