---
date:
tags:
  - geek/sysad
  - wip
---
Podman is a drop-in replacement for [Docker](https://docker.com). I chose it because [Justus](https://www.justus.pw/) suggested me to look into it while I was [interviewing him for the DWeb blog](https://getdweb.net/justus-interview/ 'Interview with Justus Perlwitz – DWeb'), and other friends encouraged me to try it in multiple occasions.

By learning more about it, I found its advantages and its architecture to be very interesting, while remaining relatively simple, and (to the extent of my usage so far) completely compatible with Docker commands. I watched different videos (linked at the bottom of this page) 

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

~~Follow the guide [Autostarting Podman Containers](https://linuxhandbook.com/courses/podman/autostart-podman-containers/).~~ Deprecated. Using quadlets instead.

## Quadlets

Quadlets are configuration files that allow Podman containers to run directly via systemd. Even though 

## Monitoring

For containers monitoring, I have decided to go with [Beszel](https://beszel.dev) because it seems to be among the lightest and simplest options, but most importantly because [the main developer and owner of the repository has a political statement in his bio](https://web.archive.org/web/20260412145420/https://github.com/henrygd) 🔥!

#TODO))

### Resources

- [Monitoring my server with Beszel and Dozzle \| Federico Scodelaro](https://federicoscodelaro.com/blog/2025-05-10-monitoring-beszel-dozzle/)j
- [Beszel Quadlet · henrygd/beszel · Discussion #572 · GitHub](https://github.com/henrygd/beszel/discussions/572#discussioncomment-12227445)
- [Chapter 21. Monitoring containers \| Building, running, and managing containers \| Red Hat Enterprise Linux \| 8 \| Red Hat Documentation](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/building_running_and_managing_containers/assembly_monitoring-containers)

## Resources

- [GitHub - fpatrick/podman-quadlet: Personal Podman Quadlet configurations for self-hosted services in a homelab environment · GitHub](https://github.com/fpatrick/podman-quadlet)
