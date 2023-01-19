---
date: 2023-01-17T13:12:41+01:00
updated: 2023-01-17T13:53:40+01:00
location: home
tags:
  - geek
  - wip
---
- Applications that have to do with hardware like that should be installed on host: `sudo abroot exec apt install testdisk`
- Flatpaks are installed in your home directory so why would you need to access the root profile directory (there shouldn’t be one in the first place). The `/bin` directory is read-only, I recommend you move your own installed bins to `~/.local/bin/` instead and add it to PATH. You can add it to PATH by putting `export PATH="$HOME/.local/bin:$PATH"` in your `.bashrc`