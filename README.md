# Developers documentation

This is scalingo documentation about our API endpoints and how to use them

## Install

```shell
docker compose run web bundle install
```

## Run

```shell
docker compose up
```

Then the project will be available at: http://localhost:4310/


## Commands

### Rebuild project after adding new ressource

```shell
docker compose exec web bundle exec jekyll build
```

It refreshes assets like sidebars menus per example
