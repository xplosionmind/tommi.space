---
date: 2026-04-13T13:05:00+02:00
aliases: [Flask in production, Flask in a container]
tags: [XPUB, wip, geek/dev]
permalink: /flask/live/
redirect_from: [/flask/prod/]
---
Running Flask in a container is tremendously useful to move the same container anywhere and replicate the same exact environment on any device or operating system, without having to modify anything.

## Why a container?

A container can be seen a bit like a box with compartments inside it. Running an application (in this case, Flask) on different devices with different operating systems would be like taking different boxes and try to recreate the same compartments inside them, or trying to fit them even if the size of the containing box is not identical. The software equivalent of this would be to install all the dependencies and the required software independently on each device, to try to reach the same result. Using a container would be like taking the original box and move it around, without having to change or adapt its internal structure. Creating a container means that from one device we <q>pack</q> everything that is needed, and then we can ship it (<q>deploy</q> it) anywhere.

## Podman

The de-facto standard to deal with container is [Docker](https://docker.com), and it is nearly ubiquitous. Nevertheless, this guide uses [Podman](https://podman.io), a drop-in replacement that offers some benefits. This means that at any point of the article and also more in general whenever there is a `docker` command, it can be replaced with `podman`, and it should work the same. The reasons behind this choice are beyond the scope of this little guide, but I gathered my notes and thoughts about Podman [in the dedicated page](Podman.md).

## Make a Dockerfile

The first step is to make a [Dockerfile](https://docs.docker.com/build/concepts/dockerfile/ 'Dockerfile overview'), giving Podman/Docker the <q>instructions</q> to pack the box, which means taking all the software and dependencies necessary to run Flask and place them inside the container.

I have not learned how a Dockerfile actually works (yet). I just made a patchwork of the different Dockerfile examples I found—referenced below.

Here is the essential Dockerfile to run an instance of Flask, block by block.

Download (“pull”) the required images to run the container. In this case, we are pulling Python and [uv](https://docs.astral.sh/uv/ 'uv documentation'), and we are telling Podman to move the executable binaries to specific folders in the container.
```Dockerfile
FROM python:3.12-slim-trixie
COPY --from=ghcr.io/astral-sh/uv:0.11 /uv /uvx /bin/
```

Tell the container that we are referring to `/app` whenever we run or do something. In other terms, it is our the working directory of the container.
```Dockerfile
WORKDIR /app
```

Assuming that all the files required to run Flask are in PWD, we map them all to `/app`, inside the container.
```Dockerfile
# Copy over project files
COPY . /app
```

Since we will have to both read and write to a JSON file, while at the same time saving the file in the host filesystem too, we need to make sure that we are running things as non-root.
```Dockerfile
RUN useradd -m appuser \
	&& chown -R appuser:appuser /app #/app/data
USER appuser
```

Tell uv to install the required dependencies, listed in `pyproject.toml`
```Dockerfile
RUN uv sync --locked
```

Flask runs through a specific port. We have to tell the container to <q>expose</q> that port, to make available. This does not mean the port is directly exposed to the outside world, it is just “handed over” and made available to Podman, that can be instructed to actually serve that port (see below). 
```Dockerfile
EXPOSE 5000
```

This is the final command to be run when the container should be running
```Dockerfile
CMD ["uv", "run", "gunicorn", "--workers", "3", "--bind", "0.0.0.0:5000", "wsgi:app"]
```

this is the same as running the following in the command line, which is exactly what we are telling the container to do as the last action of the Dockerfile.
```bash
uv run flask --app main run --debug --host '0.0.0.0' --port '5000'
```

The complete Dockerfile is [here](https://git.xpub.nl/tommi/flask-intro/src/branch/main/Dockerfile), in the [flask-intro repository](https://git.xpub.nl/tommi/flask-intro).

## Build the container

Once the instructions are compiled, the container has to be built. It’s possible to specify which Dockerfile to read, using `-f`. By default, the reference Dockerfile is `Dockerfile` in the present working directory.
```bash
podman build -t flask-intro:latest # -f Dockerfile
```

## Run the container


```bash
podman run --rm \
	--name flask-intro \
	-v "$PWD/data:/app/data:Z" \
	-p 5000:5000
	flask-intro
```

## Production vs development mode

#TODO))

```zsh
uv run flask run
```

## Create Quadlet

#TODO))

## Serve with Caddy

#TODO))

## Resources

- [Basic Flask Setup With Podman](https://medium.com/@brianmayrose/basic-flask-setup-with-podman-6024ba6769e5) by Brian Mayrose
- [Using uv in Docker](https://docs.astral.sh/uv/guides/integration/docker/), from the uv documentation
- [Switching pip to uv in a Dockerized Flask / Django App](https://nickjanetakis.com/blog/switching-pip-to-uv-in-a-dockerized-flask-or-django-app) by Nick Janetakis
- [Run our Flask app with gunicorn in Docker \| REST APIs with Flask and Python](https://rest-apis-flask.teclado.com/docs/deploy_to_render/docker_with_gunicorn/)
- [GitHub - nickjj/docker-flask-example: A production ready example Flask app that's using Docker and Docker Compose. · GitHub](https://github.com/nickjj/docker-flask-example)
- [Dockerizing Flask with Postgres, Gunicorn, and Nginx \| TestDriven.io](https://testdriven.io/blog/dockerizing-flask-with-postgres-gunicorn-and-nginx/)

https://youtu.be/twv_kCq693o

https://youtu.be/YH9skYpTzxQ

https://youtu.be/Vlr2q6gWl_Q

https://youtu.be/KWIIPKbdxD0