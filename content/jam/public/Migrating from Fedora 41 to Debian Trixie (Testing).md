---
date: 2025-01-16T18:09:00+01:00
aliases:
  - Migrating to Debian
tags:
  - geek
location: Xplosion Attic
description: Notes about moving from Fedora 41 to Debian Trixie (Testing, version 13) on my Framework Laptop 13.
permalink: /fedora-debian/
---
## Knowledge base

What I am reading before doing anything:

- [DebianTesting - Debian Wiki](https://wiki.debian.org/DebianTesting)
- [InstallingDebianOn/FrameWork/Laptop13/AMD\_7040\_Series - Debian Wiki](https://wiki.debian.org/InstallingDebianOn/FrameWork/Laptop13/AMD_7040_Series)
- [Debian on the Framework Laptop - Linux - Framework Community](https://community.frame.work/t/debian-on-the-framework-laptop/40578)
- [\[TRACKING\] Debian testing on the Framework Laptop - Linux - Framework Community](https://community.frame.work/t/tracking-debian-testing-on-the-framework-laptop/14448)
- [Debian Testing Install/debian-snippets.md by Si Mon](https://gitlab.com/quiteBold/snippets/-/blob/main/Debian%20Testing%20Install/debian-snippets.md)
- [Topics tagged debian](https://community.frame.work/tag/debian)

## Preliminary steps

- Register to [salsa.debian.org](https://salsa.debian.org/)

### Backup

All the necessary files are migrated using [tdm](tdm.md) and [Sam](Sam.md).

## Configuration

All the necessary information is comprehensively covered in the articles linked above.

```
gsettings set org.gnome.mutter center-new-windows true
```
