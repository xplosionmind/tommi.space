---
date: 2026-03-21T11:03:04+01:00
location: Huis Fatima
tags: [wip, geek/sysad]
toc: true
description: Notes on setting up a “homelab”, a self-hosted server at home.
---
{{ description }}

Initially, I considered using [Proxmox](Proxmox.md), but it would have been overkill. I decided to go for a plain and simple [Debian](https://debian.org) installation.

## Network configuration

1. Find the router’s IP address
2. Visit that IP address via browser
3. In DHCP settings, add a rule to lock maintain the same local IP address for the Raspberry Pi
4. Set port forwarding rules, so that public ports are mapped to specific ports of the device
5. Dynamic DNS (DynDNS) service to keep a DNS server of a domain name up to date following the dynamic IP address of the local home network. Even if it relies on <abbr title='Amazon Web Services'>AWS</abbr>, [DuckDNS](https://duckdns.org) was the simplest and quickest solution.
	1. Create an account and choose a domain name on https://duckdns.org
	2. Go to the DynDNS page in the router and use the API token as the username, no password needed. The DNS should then be automatically pointed to the Raspberry Pi already.
6. Map a different external port to local port 22

<figure>
	<img class=light src=https://pzwiki.wdka.nl/mw-mediadesign/images/6/67/Ziggo_DHCP_rules.png alt='DHCP rules section of Ziggo router settings'>
	<img class=light src=https://pzwiki.wdka.nl/mw-mediadesign/images/6/6c/Ziggo_DDNS.png alt='DDNS section of Ziggo router settings'>
</figure>

### Dynamic DNS

#TODO)) Avoid using [DuckDNS](https://duckdns.org), which relies on AWS.

#### Alternatives

- [GitHub - lopsided98/dnsupdate: A modern and flexible dynamic DNS client · GitHub](https://github.com/lopsided98/dnsupdate)

### References

- <cite>[Port Forwarding configuration for your home router](https://homebrewserver.club/fundamentals-port-forwarding.html)</cite> on [homebrewserver.club](https://homebrewserver.club/)

## Installation

1. Debian 13 installation via TUI. Choose BTRFS as the main filesystem.
2. SSH
	- Create SSH config both for local and external access
	- `ssh-copy-id`
	- Disallow password access

## ZFS

## Installing ZFS

Follow [the installation instructions](https://openzfs.github.io/openzfs-docs/Getting%20Started/Debian/ 'Debian — OpenZFS  documentation') from the Open ZFS official documentation.

ZFS packages are included in the [contrib repository](https://packages.debian.org/source/zfs-linux). The [backports repository](https://backports.debian.org/Instructions/) often provides newer releases of ZFS. You can use it as follows.

Add the backports repository:

```sh
sudo nvim /etc/apt/sources.list.d/trixie-backports.list
```

```
deb http://deb.debian.org/debian trixie-backports main contrib non-free-firmware
deb-src http://deb.debian.org/debian trixie-backports main contrib non-free-firmware
```

```sh
sudo nvim /etc/apt/preferences.d/90_zfs
```

```
Package: src:zfs-linux
Pin: release n=trixie-backports
Pin-Priority: 990
```

Install the packages:

```sh
sudo apt update
sudo apt install dpkg-dev linux-headers-generic linux-image-generic
sudo apt install zfs-dkms zfsutils-linux
```

## Configure ZFS

Essential information for configuration and maintenance is in [System Administration page](https://openzfs.org/wiki/System_Administration) of the OpenZFS wiki.

```sh
sudo zpool create -n -m /media/ughetto ughetto mirror sda sdc
```

- `-n` makes the command dry-run.

```sh
sudo zpool add ughetto cache sdb
```

Make the main user the owner of the newly mounted storage:

```sh
sudo chown -R tommi:tommi /media/ughetto
```

## Podman

![Podman](Podman.md)

## Caddy

![Run Caddy in a container](Caddy.md#Run%20Caddy%20in%20a%20container)

## The electricity bill

One morning my flatmate sent a message on our group surprised that our kWh consumption has gone up considerably from one month to the other. The only difference of electrical appliances in our home was indeed Bocia, my server.

Even though I yap a lot about digital degrowth, [permacomputing](https://brewing.permacomputing.net/), <q>[the materiality of the cloud](https://hub.xpub.nl/sergio/SI29/ourdigitalhome/about.hml)</q>, and related concepts. Still I have been privileged enough not to notice nor care about the environmental and economical impact of having a device running 24/7 in my living room.

Acknowledging this made me very frustrated mainly for two reasons:
- I have always perceived hosting at home as an escamotage to save money on renting VPSes, a.k.a. someone else’s computers. In the end, the overall cost of maintaining this infrastructure is not much cheaper, and potentially it is even higher, considering the cost of purchasing the hardware.
- I have preached hosting things at home as “democratising technology”. Yet, taking into account the required skills, time, and material costs actually makes it something very exclusive and privileged, unless it is approached communally, as a political, slow, progressive project. Something I have not managed to do it so far, but that was also prevented by the major storage requirement that media hosing ([Aby](Aby.md)) entails. 

## Immich

![Install Immich with Podman Quadlets](Install%20Immich%20with%20Podman%20Quadlets.md)

## <abbr title='Uninterruptible power supply'>UPS</abbr>

#TODO)) Configure my [BlueWalker Power Basic VI 1000 STL](https://powerwalker.com/product/10121074/) uninterruptible power supply.

## Wake-on-LAN

#TODO)) Configure [Wake-on-LAN](https://wiki.debian.org/WakeOnLan 'Wake On LAN – Debian Wiki').

## Backup

#TODO))

- Best practice to back up Podman?
- local backup
- remote backup
- [zrepl - ZFS replication](https://zrepl.github.io/)
