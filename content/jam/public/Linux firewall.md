---
date: 2026-06-23T23:11:00+02:00
tags:
  - geek/sysad
  - geek/linux
description: Learning about firewalls in Linux
permalink: /firewall/
redirect_from:
  - /linux/firewall/
---
I am starting to learn about Linux firewalls because directly exposing [Bocia](Bocia.md) to the Internet, without a VPN, makes it crucial to secure the machine as much as possible.

The first concepts I got familiar with are the ones explored in the following podcast episode.

https://youtube.com/live/YJZV79C-rNU

## Blocklist automation

#TODO I have stumbled upon [nftables-blacklist](https://github.com/trick77/nftables-blacklist 'GitHub - trick77/nftables-blacklist: A bash script to ban large numbers of IP addresses published in blacklists. · GitHub'), a nifty tool to block malicious IP addresses via [nftables](https://wiki.archlinux.org/title/Nftables 'nftables - ArchWik'). Once I’ll have understood enough of how firewalling and nftables work, I want to use it to [Block AI bots](Caddy.md#Blocking/Poisoning%20AI%20bots) too.