---
title: I don’t need a backup
date: 2023-11-27T20:44:00+01:00
location: xHain
---
After *a lot* of thinking about [backup solutions](Storage.md) and how to implement them, I realized that actually a full backup of my main device (my laptop) is useless for me. What I have on my device either…

- …is there **transitorily**: I am managing the files locally, but I am moving them somewhere else very soon. Generally, I already have the original copy of the files in a safe place. Hence, in case of data loss, I would not lose too much.
- …is **something I can download**: typically, 80% of my storage is occupied by downloaded media. I could re-download anything with no effort.
- …is **already on the cloud**: usually, most of my work resides on some cloud platform, and the files are merely synchronized on my laptop. Losing my copy is not of any damage, since data are already safe online (and cloud solutions I use have their own reliable backup strategies)

Therefore, the only thing I have to save are [my configuration files](https://codeberg.org/tommi/dotfiles 'Tommi’s dotfiles on Codeberg'), commonly nicknamed as [dotfiles](https://wiki.archlinux.org/title/Dotfiles '“Dotfiles” in Arch Linux wiki'). To do so, I use [tdm](tdm.md).
