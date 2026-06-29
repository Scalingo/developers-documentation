{:.table}
| field                           | type     | description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------------ |
| addon_name                      | string   | The related addon name                                             |
| resource_id                     | string   | The related addon resource ID                                      |
| addon_uuid                      | string   | The related addon UUID                                             |
| status                          | string   | Continuous backup status. Possible values: `healthy`, `pgbackrest_error`, `wal_error` |
| error                           | string or null | Error message returned by the continuous backup checker       |
| recoverable                     | boolean  | Whether point-in-time recovery is currently available              |
| checked_at                      | datetime | The date and time when the continuous backup status was checked    |
| unrecoverable_duration_seconds  | integer  | Seconds elapsed since the resource last became unrecoverable       |
