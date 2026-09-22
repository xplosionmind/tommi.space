---
date: 2026-04-11T14:30:00+02:00
tags: [wip, geek/sysad]
permalink: /immich/
description: My notes for the installation and maintenance of Immich, a self-hosted media library software.
---
[Immich](https://immich.app) is a great media library to store media files, purposefully built to preserve a person or a family’s memories. Despite [FUTO](https://futo.org), the organisation funding it, [reportedly being quite shady](https://drewdevault.com/blog/Whats-up-with-FUTO/ '“What’s up with FUTO?” on Drew De Vault’s blog'), I still find it to be the most usable, reliable, and comprehensive solution out there.

It must be said that I don’t know Immich maintainers nor any FUTO member personally, but I know and I hung out with Theresa and Michael from [PhotoPrism](https://photoprism.app) for a while. I can say that they are lovely humans and it saddens me not to be choosing PhotoPrism as my main solution. [I tested it and I run it](Aby.md) for quite some time, but Immich is undeniably superior on many fronts. I hope that at some point I will switch to PhotoPrism again.

## Installation

Sadly, I failed convert the [Docker compose files provided by Immich](https://github.com/immich-app/immich/blob/main/docker/) into Quadlets using [Podlet](https://github.com/containers/podlet 'containers/podlet repository on GitHub').

Nevertheless, I found [this repository](https://github.com/jbtrystram/immich-podman-systemd 'jbtrystram/immich-podman-systemd repository on GitHub') that documents in detail the whole process.

#TODO: finish this #draft 
## Convert uploads to JPEG XL

#TODO: Consider using [immich-upload-optimizer](https://github.com/miguelangel-nubla/immich-upload-optimizer 'miguelangel-nubla/immich-upload-optimizer on GitHub') and/or [immich-convert-originals](https://github.com/fabianwimberger/immich-convert-originals 'fabianwimberger/immich-convert-originals: Batch-transcode Immich libraries to AV1 (video) and JXL (images). Save 30-50% storage. Preserves metadata & albums. · GitHub')