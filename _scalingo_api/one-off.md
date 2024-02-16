---
title: One-off Containers
layout: default
---

# One-off Containers

When you [request to one-off container](/apps.html#run-a-one-off-container),
you will receive a `attach_url`. This page explains how to use this endpoint.

--- row ---

## Access your container

--- row ---

`CONNECT [:attach_url]`

To use this endpoint you have to hijack the HTTP connection. It's pretty simple
actually, when you're doing a HTTP request, a TCP connection is created. HTTP
hijacking consist in turning this connection into a full bidirectional
connection.

HTTP is used to handle the routing and the headers, then the connection is used
rawly to exchange data.

--- row ---

## Update your container

--- row ---

`PUT [:attach_url]`

Send information to the container to update its state. As containers are
interactive and that most software you may be using are using `libreadline`,
your should notify the container when the size of the terminal is changed for
instance.

### Parameters

* `width`: Width for the remote terminal
* `height`: Height for the remote terminal

||| col |||

Example request:

```sh
curl -H 'Content-Type: application/json' -H 'Accept: application/json' \
  -X PUT [:attach_url] -d \
  '{
    "width": 80,
    "height": 25
  }'
```


--- row ---

## Upload a file to your container

--- row ---

`POST [:attach_url]/files`

It may happen that you require a file to be present in your temporary
container, for a batch or anything else, the transfer is done via a
multipart form.

<blockquote>
  The <code>Content-Type</code> of this request is not <code>application/json</code>, it should be <code>multipart/form-data; boundary=[:boundary]</code>
</blockquote>

It has to be done before attaching to the container. Files can be found in the directory `/tmp/uploads`

Form parameters:

* `file`: contain the name of the file and its content.

||| col |||

Example request:

```sh
curl --form file=@mysql_dump.tar.gz [:attach_url]/files
```

Returns 200 OK Without content
