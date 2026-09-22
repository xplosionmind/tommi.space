---
date: 2026-09-22T14:16:00+02:00
tags:
  - wip
  - geek/sysad
permalink: /peertube/
description: Because [Luca](https://pzwiki.wdka.nl/mediadesign/User:Lucatorsera 'User:Lucatorsera in the XPUB Wiki') had the fantastic idea of setting up a [PeerTube](https://joinpeertube.org) instance for [XPUB](https://xpub.nl), I am testing the installation myself first, and keeping notes here.
---
{{ description }}

The PeerTube documentation at some point [mentions](https://docs.joinpeertube.org/install/unofficial#ansible-playbook-for-fedora-fedora-server) installing and deploying it with an [Ansible playbook]() (never heard of this before). Even though I do not intend to get into yet another tool, I want to keep things simple and try to install PeerTube with plain and simple Quadlets.

Luckily, by exploring the source code of the playbook repository, I found [a directory containing quadlet files](https://gitlab.nuculabs.dev/dnutiu/ansible-playbooks/-/tree/master/peertube-server/templates/services?ref_type=heads), and I am basing mine on those.

```zsh
mkdir -p $HOME/containers/peertube/{config,data,db}
```

[Environment file reference](https://github.com/Chocobozzz/PeerTube/blob/master/support/docker/production/.env)

Redis and PostgreSQL were launched correctly, while PeerTube itself failed because of this error:

```
Sep 22 14:46:33 v2202607387760489139 systemd[855]: peertube.service: Scheduled restart job, restart counter is at 2.
Sep 22 14:48:03 v2202607387760489139 systemd[855]: Starting peertube.service...
Sep 22 14:48:03 v2202607387760489139 podman[789959]: 2026-09-22 14:48:03.774007765 +0200 CEST m=+0.043121093 container create 5587c7f0a2191f3ac8af1d3c486021387ef6d641a0ebf905bd6292c5f11f4917 (image=docker.io/chocobozzz/peertube-webserver:latest, name=peertube, PODMAN_SYSTEMD_UNIT=peertube.service, maintainer=NGINX Docker Maintainers <docker-maint@nginx.com>)
Sep 22 14:48:03 v2202607387760489139 podman[789959]: 2026-09-22 14:48:03.758233936 +0200 CEST m=+0.027347274 image pull 32eb3898dc7f7b3ddb9f6b320e2c5307366171e9c4125ed3f00881a56be29dc5 docker.io/chocobozzz/peertube-webserver:latest
Sep 22 14:48:03 v2202607387760489139 podman[789959]: 2026-09-22 14:48:03.87235363 +0200 CEST m=+0.141466957 container init 5587c7f0a2191f3ac8af1d3c486021387ef6d641a0ebf905bd6292c5f11f4917 (image=docker.io/chocobozzz/peertube-webserver:latest, name=peertube, PODMAN_SYSTEMD_UNIT=peertube.service, maintainer=NGINX Docker Maintainers <docker-maint@nginx.com>)
Sep 22 14:48:03 v2202607387760489139 podman[789959]: 2026-09-22 14:48:03.876158945 +0200 CEST m=+0.145272273 container start 5587c7f0a2191f3ac8af1d3c486021387ef6d641a0ebf905bd6292c5f11f4917 (image=docker.io/chocobozzz/peertube-webserver:latest, name=peertube, PODMAN_SYSTEMD_UNIT=peertube.service, maintainer=NGINX Docker Maintainers <docker-maint@nginx.com>)
Sep 22 14:48:03 v2202607387760489139 systemd[855]: Started peertube.service.
Sep 22 14:48:03 v2202607387760489139 peertube[789991]: /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
Sep 22 14:48:03 v2202607387760489139 peertube[789991]: /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
Sep 22 14:48:03 v2202607387760489139 peertube[789991]: /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
Sep 22 14:48:03 v2202607387760489139 peertube[789959]: 5587c7f0a2191f3ac8af1d3c486021387ef6d641a0ebf905bd6292c5f11f4917
Sep 22 14:48:03 v2202607387760489139 peertube[789991]: 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
Sep 22 14:48:04 v2202607387760489139 peertube[789991]: 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
Sep 22 14:48:04 v2202607387760489139 peertube[789991]: /docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
Sep 22 14:48:04 v2202607387760489139 peertube[789991]: /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
Sep 22 14:48:04 v2202607387760489139 peertube[789991]: /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
Sep 22 14:48:04 v2202607387760489139 peertube[789991]: /docker-entrypoint.sh: Launching /docker-entrypoint.d/99-entrypoint.nginx.sh
Sep 22 14:48:04 v2202607387760489139 peertube[789991]: /docker-entrypoint.d/99-entrypoint.nginx.sh: line 10: can't open /etc/nginx/conf.d/peertube.template: no such file
Sep 22 14:48:04 v2202607387760489139 podman[790020]: 2026-09-22 14:48:04.345228852 +0200 CEST m=+0.021965396 container died 5587c7f0a2191f3ac8af1d3c486021387ef6d641a0ebf905bd6292c5f11f4917 (image=docker.io/chocobozzz/peertube-webserver:latest, name=peertube, PODMAN_SYSTEMD_UNIT=peertube.service, maintainer=NGINX Docker Maintainers <docker-maint@nginx.com>)
Sep 22 14:48:04 v2202607387760489139 podman[790020]: 2026-09-22 14:48:04.428004675 +0200 CEST m=+0.104741209 container remove 5587c7f0a2191f3ac8af1d3c486021387ef6d641a0ebf905bd6292c5f11f4917 (image=docker.io/chocobozzz/peertube-webserver:latest, name=peertube, maintainer=NGINX Docker Maintainers <docker-maint@nginx.com>, PODMAN_SYSTEMD_UNIT=peertube.service)
Sep 22 14:48:04 v2202607387760489139 systemd[855]: peertube.service: Main process exited, code=exited, status=1/FAILURE
Sep 22 14:48:04 v2202607387760489139 systemd[855]: peertube.service: Failed with result 'exit-code'.
```