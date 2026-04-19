---
date: 2026-03-16T10:15:00+02:00
tags:
  - geek/sysad
  - dropped
description: Notes on using Proxmox to manage a homelab.
---
I tentatively installed [Proxmox](https://proxmox.com/) on [Bocia](Bocia.md) during initial tests, but it was overkill for my use-case on that machine.

## Notes

- Understanding LXC vs virtual machines
- Install Docker containers “natively” in Proxmox. Drawbacks so far:
	- hard to update, you have to create a new container with the updated version of the software, then point it at the data volumes of the original container;
	- no Docker compose, apparently?

## Resources

Here are some videos I watched while evaluating it as an option.

https://www.youtube.com/watch?v=G97LJ_w3fug

https://www.youtube.com/watch?v=xHKEyqOFzc4

https://www.youtube.com/watch?v=gDZVrYhzCes
