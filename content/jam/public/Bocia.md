---
date: 2026-03-21T11:03:04+01:00
updated: 2026-06-21T14:02:00+02:00
location: Huis Fatima
aliases: [Homelab, DIY Home Server]
tags: [wip, geek/sysad]
redirect_from: [/homelab/]
description: Notes on setting up a “homelab”, a self-hosted server at home.
toc: true
---
{{ description }}

Initially, I considered using [Proxmox](Proxmox.md), but it would have been overkill for my needs, and I want as little overhead as possible. I decided to go for a plain and simple [Debian](https://debian.org) installation.

## Network configuration

Preparation is required on the local network, in order to make it publicly available.[^1]

[^1]: <cite>[Port Forwarding configuration for your home router](https://homebrewserver.club/fundamentals-port-forwarding.html)</cite> on [homebrewserver.club](https://homebrewserver.club/)

1. Find the router’s IP address
2. Visit that IP address via browser
3. In <abbr title='Dynamic Host Configuration Protocol'>DHCP</abbr> settings, add a rule to lock maintain the same local IP address for the device. In this case, it’s `192.168.178.28`.
4. Set port forwarding rules, so that public ports are mapped to specific ports of the device
5. Configure a Dynamic DNS (DynDNS) service to keep a DNS server of a domain name up to date following the dynamic IP address of the local home network. Even if it relies on <abbr title='Amazon Web Services'>AWS</abbr>, [DuckDNS](https://duckdns.org) is the simplest and quickest solution.
	1. Create an account and choose a domain name on https://duckdns.org
	2. Go to the DynDNS page in the router and use the API token as the username, no password needed. The DNS should then be automatically pointed to the Raspberry Pi already.
6. Map a different external port to local port 22

<figure>
	<img class=light src=https://pzwiki.wdka.nl/mw-mediadesign/images/6/67/Ziggo_DHCP_rules.png alt='DHCP rules section of Ziggo router settings'>
	<img class=light src=https://pzwiki.wdka.nl/mw-mediadesign/images/6/6c/Ziggo_DDNS.png alt='DDNS section of Ziggo router settings'>
</figure>

### Dynamic DNS

I want to avoid using [DuckDNS](https://duckdns.org), which relies on AWS. After a first bare-bones configuration relying on it, I switched to a system that automatically updates the public IP address in the DNS registrar.

[ddns-updater](https://github.com/qdm12/ddns-updater) is perfectly suited for this purpose. I adapted the example compose configuration and I turned into the following quadlet (see [Podman quadlets](Podman.md#Quadlets) to learn more). 

```systemd
[Container]
ContainerName=ddns-updater
Environment=LOG_LEVEL=debug TZ=Europe/Amsterdam
Image=ghcr.io/qdm12/ddns-updater:latest
AutoUpdate=registry
Network=giardino # this is the name of a custom network I created
Network=giardinoreale # is the name of a second network specifically for IPv6
PublishPort=8000:8000/tcp
Volume=/home/tommi/containers/ddns-updater:/updater/data

[Service]
Restart=always

[Install]
WantedBy=default.target
```

The configuration file is pretty straightforward. It is important to make sure that the container has access to the configuration directory both with read and write rights. The status can be verified with `journalctl --user -xeu ddns-updater`.

ddns-updater can update DNS records both for IPv4 (A) and for IPv6 (AAAA). Since containers use exclusively IPv4 by default, it is necessary to create an IPv6 network: `podman create network --ipv6 giardinoreale`. More information in [the dedicated section of the Podman page](Podman.md#Networking).

## OS Installation and configuration

1. Install Debian 13 via TUI. Choose BTRFS as the main filesystem.
2. Configure SSH
	- Create SSH config both for local and external access
	- `ssh-copy-id`
	- Disallow password access

More best practices in [my Linux reference document](Linux%20reference.md).

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

![Immich](Immich.md)

## <abbr title='Uninterruptible power supply'>UPS</abbr>

#TODO: configure my [BlueWalker Power Basic VI 1000 STL](https://powerwalker.com/product/10121074/) uninterruptible power supply.

## Wake-on-LAN

![Wake-on-LAN](Wake-on-LAN.md)

## Backup

#TODO

- Best practice to back up Podman?
- local backup
- remote backup
- [zrepl - ZFS replication](https://zrepl.github.io/)

## Hardware

I spent quite some time figuring out the hardware configuration[^2][^3][^4][^5][^6]. Here is what Bocia is made of:

| Component                                    | Price      | Bought on                                                                                                                             |
| -------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Case: Jonsbo N3                              | € 140,30   | [Trovaprezzi](https://www.trovaprezzi.it/prezzo_case-alimentatori_jonsbo_n3.aspx?sort=prezzo_totale)                                                 |
| 4× SATA 6                                    | € 5,00     | [Aliexpress](https://it.aliexpress.com/item/1005007523507363.html)                                                                                  |
| PSU: Chieftec CSN-450C 450W SFX 80 Plus Gold | € 82,70    | [Redgaming](https://redgaming.it/alimentatori/1606-alimentatore-chieftec-csn-450c-450w-sfx-nero-4710713235755.html)                                |
| Topton N18 + Intel N150                      | € 148,61   | [Aliexpress](https://it.aliexpress.com/item/1005005347552418.html)                                                                                  |
| 2× RAM 16GB DDR5                             | € 60,00    | [subito.it](https://subito.it)                                                                                                                   |
| 2× HDD Seagate Ironwolf NAS 10TB[^7]         | € 491,40   | [Redgaming](https://redgaming.it/hard-disk-35/4880-hdd-seagate-ironwolf-nas-st10000vn000-10tb-sata-iii-256mb-8719706022859.html)                   |
| UPS: BlueWalker Power Basic VI 1000 STL      | € 78,90    | [Redgaming](https://redgaming.it/gruppi-di-continuita/23203-gruppo-di-continuita-multipresa-bluewalker-power-basic-vi-1000-stl-4260074980691.html) |
| Total                                        | € 1.006,91 |                                                                                                                                       |

[^2]: [Recommended Jonsbo N3 NAS Builds](ttps://nascompares.com/answer/hdd-price-per-tb/)
[^3]: [DIY NAS 2024 edition](https://blog.briancmoses.com/2024/09/diy-nas-2024-edition-and-econonas.html)
[^4]: [DIY NAS 2025 edition](https://blog.briancmoses.com/2024/11/diy-nas-2025-edition.html)
[^5]: [NAS Killer Guide 6.0](https://forums.serverbuilds.net/t/guide-nas-killer-6-0-ddr4-is-finally-cheap/13956)
[^6]: [Build a Nas Server with Jonsbo N3 - Cheaper than Synology?](https://youtu.be/XXKppFyHtHk)
[^7]: [Guide to choose an HDD](https://nascompares.com/answer/hdd-price-per-tb/)
