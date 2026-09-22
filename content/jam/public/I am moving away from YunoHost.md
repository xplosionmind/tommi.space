---
date: 2026-07-23T17:51:00+02:00
tags: [draft]
permalink: /yunohost/quit/
description: Explanation of my decision to stop using YunoHost, and what I believe are the limits of the project.
include: <div class='blue box'>⚙️ See <a href=/yunohost/quit/migration/>the dedicated page</a> for a technical account of the actual migration from YunoHost to container-based hosting using Podman.</div>
---
[Nebuchadnezzar](Nebuchadnezzar.md) has been using YunoHost for at least half a decade. I am immensely grateful to this software and its maintainers, most importantly because I respect their work, they are politically positioned, and they are very much aligned with the kind of critical perspective I wish all Free Software maintainers had.

Nevertheless, YunoHost has its limits. The main one is that by making it super easy and simple to manage a server it forces you to use its logic and its system, most of the time abstracting away a lot of crucial knowledge about the way it works. In essence, the whole structure of YunoHost is very specific and opinionated, and ==I was never able to truly grasp how it works behind the scenes==.

Hence, I am moving away from YunoHost for this and a series of other reasons:

- updates depend on package maintainers and sometimes stay outdated for a long time.
- some packages break very badly (see Ghost)
- it’s very hard for someone who is totally new to system administration to understand the structure of the project:
	- where are the databases of every app?
	- how does the packaging system work?
	- how can I turn my apps into containers?
	- how does migration *actually* work?
	- More in general: *where is everything*?