# Developers documentation

This is scalingo documentation about our API endpoints and how to use them

## Install

```
docker-compose run web bundle install
```

## Run

```
docker-compose up
```

Then the project will be available at: http://localhost:4310/


## Commands

### Rebuild project after adding new ressource

```
docker-compose exec web bundle exec jekyll build
```

It refreshes assets like sidebars menus per example
