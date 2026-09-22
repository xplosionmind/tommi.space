---
date: 2026-06-20T15:41:07+02:00
tags: [wip, geek/sysad]
permalink: /vpn/
description: On configuring a private tunnel (VPN) between a homelab and a VPS to expose services securely, without worrying about Dynamic DNS.
---
There are several problems with self-hosting at home by exposing the local network to the Internet.

Among them, the public IPv4 address of the home network might change unexpectedly, requiring a Dynamic DNS configuration. Furthermore, exposing a home’s public IP address may be a privacy concern.

This is why it is useful to configure a <abbr title='Virtual Private Network'>VPN</abbr> between the local device and a cloud server with a static IPv4 address.

https://youtu.be/sIH1RRdTjys

## WireGuard

This is the most essential and simple VPN solution, and the following tutorial explains quite well how to set it up.

https://youtu.be/bVKNSf1p1d0

## Tailscale/Headscale

[Tailscale](https://tailscale.com/) is a tool based on WireGuard that simplifies some aspects and takes care of more things for you, but it is not fully open source.

[Headscale](https://headscale.net/) is its self-hostable and fully opensource implementation.

## Open questions

1. How do I expose services to the Web by hosting them on [Bocia](Bocia.md) and routing them through a public server?
2. When I connect through my laptop client, how do I avoid tunnelling all my traffic through the VPN, but only SSH connection and what is needed to communicate to the server?
3. How do I avoid the proxy server to see all the information and grant it access to my homelab? (See below)

## Why am I not using a VPN?

I know that it is not the best practice to directly expose services from the local network, but my threat model does not necessarily require a VPN connection. I don’t want any server somewhere to have a direct connection to my homelab, where I host my personal pictures.

So far, I am staying without a VPN.