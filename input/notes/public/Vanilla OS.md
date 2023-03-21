---
date: 2023-01-17T13:12:41+01:00
updated: 2023-02-09T23:02:32+01:00
location: home
tags:
  - geek
  - wip
---
[Vanilla OS Handbook](https://handbook.vanillaos.org)

- Applications that have to do with hardware like that should be installed on host: `sudo abroot exec apt install testdisk`
- Flatpaks are installed in your home directory so why would you need to access the root profile directory (there shouldn’t be one in the first place). The `/bin` directory is read-only, I recommend you move your own installed bins to `~/.local/bin/` instead and add it to PATH. You can add it to PATH by putting `export PATH="$HOME/.local/bin:$PATH"` in your `.bashrc`
- Prefer Podman over Docker
- [APX autocomplete](https://discord.com/channels/1023243680829681704/1066311132182228992)
- [Use APX and Distrobox video](https://www.youtube.com/watch?v=E1z_Ex7XyLw)