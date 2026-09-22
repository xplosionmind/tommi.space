---
date: 2026-06-14T22:45:16+02:00
updated: 2026-07-29T19:25:45+02:00
aliases: [DoT, DoH, DNSSEC]
tags: [geek/linux]
permalink: /dns/
description: How DNS resolution work and what settings can be changed on a Linux device to improve speed, security, and privacy.
---
I always had quite a hard time figuring out how DNS resolution worked. This video helped me a lot:

https://youtu.be/mG8xibe6oVk

## Changing global DNS settings

```systemd
#/etc/systemd/resolv.conf
[Resolve]
#DNS=
#FallbackDNS=
DNSOverTLS=yes
DNSSEC=allow-downgrade
Domain=~.
Cache=yes
```