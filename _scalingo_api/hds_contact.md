---
title: HDS Contact
layout: default
---

# HDSContact

--- row ---

**HDSContact attributes**

{:.table}
| field            | type      | description                     |
| ---------------- | --------- | ------------------------------- |
| id               | string    | unique ID                       |
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

||| col |||

Example object:

```json
{
  "hds_contact": 
  {
    "name":"Name",
    "email":"test@test.com",
    "phone_number":"0600000006",
    "company":"company",
    "address_line1":"23 rue du bois",
    "address_line2":null,
    "address_city":"Strasbourg",
    "address_zip":"67000",
    "address_country":"FR",
    "notes":"test",
    "id":"62dc2fbc2c835900014c94e5"
  }
}
```

--- row ---

## Update an HDSContact

--- row ---

`PUT https://$SCALINGO_API_URL/v1/apps/:app_id/hds_contact`

### URL Parameter

- `app_id`: the app ID

||| col |||

Example request

```shell
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X PUT https://$SCALINGO_API_URL/v1/apps/example-app/hds_contact -d \
  '{
    "hds_contact": {
      "name":"Name",
      "email":"test@test.com",
      "phone_number":"0600000006",
      "company":"company",
      "address_line1":"23 rue du bois",
      "address_line2":null,
      "address_city":"Strasbourg",
      "address_zip":"67000",
      "address_country":"FR",
      "notes":"test"
    }
}'
```

Returns 200 OK

```json
{
  "hds_contact": 
  {
    "name":"Name",
    "email":"test@test.com",
    "phone_number":"0600000006",
    "company":"company",
    "address_line1":"23 rue du bois",
    "address_line2":null,
    "address_city":"Strasbourg",
    "address_zip":"67000",
    "address_country":"FR",
    "notes":"test",
    "id":"62dc2fbc2c835900014c94e5"
  }
}
```
