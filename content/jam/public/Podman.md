---
date: 2026-03-31
updated: 2026-08-13T14:28:00+02:00
tags: [wip, geek/sysad]
description: Notes and opinionated minimal cheatsheet for container management with Podman 🦭
---
Podman is a drop-in replacement for [Docker](https://docker.com). I chose it because [Justus](https://www.justus.pw/) suggested me to look into it while I was [interviewing him for the DWeb blog](https://getdweb.net/justus-interview/ 'Interview with Justus Perlwitz – DWeb'), and [André](https://masto.pt/@andralves) told me about it while we were having dinner together with other FSFE volunteers after FOSDEM 2026.

By learning more about it, I found its advantages and its architecture to be very interesting, while remaining relatively simple, and (to the extent of my usage so far) completely compatible with Docker commands. I watched different videos (linked at the bottom of this page).

I found two major challenges making my life harder in Podman:
1. Running services via [Quadlets](#Quadlets) is much harder than a simple Docker Compose file.
2. Running containers in different users made it very challenging for me to understand the network configuration and reverse-proxying. I still haven’t fully understood this, so I am just running everything in the same user.

## Rootless Podman configuration

Following [the official rootless tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md 'Basic Setup and Use of Podman in a Rootless environment.'):

```sh
sudo apt install passt # apparently it is already installed as a dependency of podman’s apt package
```

In Linux, unprivileged users (non-sudo) do not have permission to open up ports below 1024. In order to allow ports ≥80 to be opened in rootless mode, a systemd parameter has to be set.

```sh
echo 'net.ipv4.ip_unprivileged_port_start=80' | sudo tee /etc/sysctl.d/99-rootless-ports.conf
sudo sysctl --system
```

### Automatically start containers at boot

~~Follow the guide [Autostarting Podman Containers](https://linuxhandbook.com/courses/podman/autostart-podman-containers/).~~ Deprecated. Using [Quadlets](#Quadlets) instead ⤵️

## Quadlets

Quadlets are configuration files that allow Podman containers to run directly via systemd. They are not as simple as [Compose files](https://compose-spec.io/), but they are required to enable deeper integration in the system. I use Quadlets because they are the only way to automatically start containers at boot using Podman.

[Podlet](https://github.com/containers/podlet) helps by converting Compose files into Quadlets, but it does not fully support the entire Compose Specification, therefore some values might not be fully converted. Most notably, environment variable expansion and [interpolation are not working yet](https://github.com/containers/podlet/issues/81 'Issue #81 in containers/podlet on GitHub').

### Reference quadlet files

- [jbtrystram/immich-podman-systemd](https://github.com/jbtrystram/immich-podman-systemd 'jbtrystram/immich-podman-systemd: A set of podman quadlet unit files to deploy immich-app · GitHub'), a set of podman quadlet unit files to deploy [Immich](https://immich.app)
- [mjack/podman-quadlets](https://codeberg.org/mjack/podman-quadlets 'mjack/podman-quadlets on Codeberg'), Podman quadlets for running [Immich](https://immich.app), [Nextcloud](https://nextcloud.com) and [Vaultwarden](https://github.com/dani-garcia/vaultwarden/ 'Vaultwarden’s repository on GitHub')

## Networking

I have configured a bridge network named <q lang=it>giardino</q>, to which I am connecting all the containers I want to expose via Caddy. First, create the network: `podman network create giardino`. The Quadlet network configuration file is fairly simple, and it is as follows.

```systemd
[Unit]
Description=Shared network for Caddy and all apps

[Network]
NetworkName=giardino

[Install]
WantedBy=default.target
```

In order [to use ddns-updater](Bocia.md#Dynamic%20DNS) to update IPv6 DNS records, a dedicated IPv6 network must be created. Note that it is possible to attach a container to more than one network. To create the network: `podman network create --ipv6 giardinoreale`, then, this is the Quadlet configuration file for it.

```systemd
[Unit]
Description=Shared IPv6 network specifically made for IPv6 ddns-updater access

[Network]
NetworkName=giardinoreale
IPv6=true

[Install]
WantedBy=default.target
```

## Logs

```zsh
podman logs -f containername
```

## Secrets

It’s possible to create <q>secrets</q>, strings usually used as credentials, API tokens, or passwords, and that are concealed, not exposed to the system. It’s possible to either use an previously defined string:

```zsh
printf "secretstring" | podman secret create name-of-secret -
```

…or to generate a random one:

```zsh
openssl rand -hex 32 | podman create name-of-secret -
```

It’s then possible to expose secrets as environment variables by passing them to quadlets:

```systemd
Secret=name-of-secret,type=env,target=ENVIRONMENT_VARIABLE
```

### Recovering forgotten secret

Especially if you generate the secret with `openssl` and pass it directly to Podman, you may not even know the actual value of the secret. For troubleshooting, you may need to see it.

```zsh
podman run --rm --secret name-of-secret alpine cat /run/secrets/name-of-secret
```

## Monitoring

For containers monitoring, I have decided to go with [Beszel](https://beszel.dev) because it seems to be among the lightest and simplest options, but most importantly because [the main developer and owner of the repository has a political statement in his bio](https://web.archive.org/web/20260412145420/https://github.com/henrygd) 🔥!

```zsh
systemctl --user start podman.socket
```

#TODO

### S.M.A.R.T. Monitoring

#TODO:
- https://beszel.dev/guide/smart-data
- [Beszel agent Podman Quadlet SMART and podman container monitoring not working · henrygd/beszel · Discussion #1539 · GitHub](https://github.com/henrygd/beszel/discussions/1539)

### Resources

- [Monitoring my server with Beszel and Dozzle \| Federico Scodelaro](https://federicoscodelaro.com/blog/2025-05-10-monitoring-beszel-dozzle/)
- [Beszel Quadlet · henrygd/beszel · Discussion #572 · GitHub](https://github.com/henrygd/beszel/discussions/572#discussioncomment-12227445)
- [Chapter 21. Monitoring containers \| Building, running, and managing containers \| Red Hat Enterprise Linux \| 8 \| Red Hat Documentation](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/building_running_and_managing_containers/assembly_monitoring-containers)

## Resources

- [GitHub - fpatrick/podman-quadlet: Personal Podman Quadlet configurations for self-hosted services in a homelab environment · GitHub](https://github.com/fpatrick/podman-quadlet)

## Troubleshooting

Validating Podman quadlet files:

```zsh
/usr/lib/systemd/system-generators/podman-system-generator --user -dryrun
```
