---
date: 2026-06-21T13:07:04+02:00
tags: [geek/sysad, geek/linux]
redirect_from: [/wol/]
description: Power up devices via LAN.
---
[Wake-on-LAN](https://wiki.debian.org/WakeOnLan 'Wake On LAN – Debian Wiki') is used to power up devices via LAN.

1. `ip -br link` to find the name of the network interface in use.
2. `sudo apt install ethtool` to install the tool required to inspect the Ethernet configuration.
3. `sudo ethtool enp2s0` to check whether Wake-on-LAN is available and/or enabled. `Wake-on: g` means it is enabled. I found it to be enabled, so I will skip the steps required to enable it.
4. `ip a` to find the MAC address of the interface. Look at what follows `link/ether`

## In the remote client

My laptop is running Fedora, so I have to install [wol](https://packages.fedoraproject.org/pkgs/wol/wol/ 'wol in Fedora packages').

1. `sudo dnf install wol` to install the tool that actually wakes the remote device via LAN.
2. `wol MACADRESS` to actually wake up the device!
	- `wol --ipaddr IPADDRESS MACADRESS` for remote networks