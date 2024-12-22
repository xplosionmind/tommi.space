---
date: 2023-11-27T21:08:14+01:00
aliases:
  - Tommi’s dotfiles manager
location: xHain
description: "a.k.a. *Tommi’s dotfiles manager*: a little ruse to backup my configuration files"
toc: false
---
After [](Storage.md#Laptop%20backup|a%20critical%20realization%20about%20my%20backups), I have been researching for the simplest, most minimalistic, and most beautiful [dotfiles](https://wiki.archlinux.org/title/Dotfiles '“Dotfiles” in Arch Linux wiki') backup solution.

That is when **`tdm`**, **T**ommi’s **d**otfiles **m**anager was born.

It is nothing special, and that is exactly the point. I just named for fun, fueling [my usual egocentric grandiosity drives](Tomminess.md).

What I did is simply following [this guide](https://atlassian.com/git/tutorials/dotfiles 'How to Store Dotfiles - A Bare git Repository') and touching up a few things according to my taste and my setup.

## todo

- allow status to be displayed and check all files
- encrypted branch including remote data (consider with which key to encrypt with)
- YunoHost-specific [Nebuchadnezzar](Nebuchadnezzar.md) backup of what is not backed up by YunoHost by default
