---
date: 2026-03-21T18:30:00+01:00
updated: 2026-04-12T18:12:03+02:00
tags: [wip, geek/sysad]
description: Notes on installing and managing Caddy.
---
I found [Caddy](https://caddyserver.com) installation and usage to be as simple as advertised. The official documentation covered most if not all of my use cases.

I am taking some further notes below.

## Run Caddy in a container

1. Get [the official compose.yml boilerplate](https://caddyserver.com/docs/running#docker-compose)
2. `podman network create caddy`

#TODO)) Use Quadlet instructions

## Blocking/Poisoning AI bots

### Iocaine

I configured and run [Iocaine](https://iocaine.madhouse-project.org/ 'The deadliest poison known to AI') following [the Debian guide](https://iocaine.madhouse-project.org/documentation/3/getting-started/debian/ 'Getting started with iocaine on Debian'), as I tested it on a server with no containers, where I was only serving static websites.

The impact was noticeable, the CPU usage and the network traffic grew substantially: from an average of 1% CPU usage to an average of 12%.

<figure>
	<img src=/assets/iocaine-cpu-usage.png alt='A graph showing an increase as described above, ove the timespan of a week.'>
	<img src=/assets/iocaine-network-traffic.png alt='A graph showing network usage growing significantly, especially in upload.'>
	<figcaption>The metrics are dropping at the end as I stopped and uninstalled Iocaine</figcaption>
</figure>

Nevertheless, it was not because of performance that I chose to uninstall Iocaine, but it was because it seemed that many features were compromised, such as OGP images not being generated correctly anymore. In general the bot-detection was a bit more aggressive than what I would have liked. My intention is to poison AI bots that do not respect my wish not to share my data, not to poison *any* bot that visit my website.

### Other options

Other options I found but didn’t have the time to test, yet:

- [Caddy Defender Plugin](https://defender.jasoncameron.dev/) – <q>a middleware for Caddy that allows you to block or manipulate requests based on the client's IP address. It is particularly useful for preventing unwanted traffic or polluting AI training data by returning garbage responses.</q>
- [miasma](https://github.com/austin-weeks/miasma 'austin-weeks/miasma repository on GitHub') – Trap AI web scrapers in an endless poison pit. 