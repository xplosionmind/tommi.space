---
date: 2023-11-27T21:08:14+01:00
location: xHain
aliases:
  - Tommi’s dotfiles manager
description: "a.k.a. *Tommi’s dotfiles manager*: a little ruse to backup my configuration files"
toc: false
---
After [[Storage#Laptop backup|a critical realization about my backups]], I have been researching for the simplest, most minimalistic, and most beautiful [dotfiles](https://wiki.archlinux.org/title/Dotfiles '“Dotfiles” in Arch Linux wiki') backup solution.

That is when **`tdm`**, **T**ommi’s **d**otfiles **m**anager was born.

It is nothing special, and that is exactly the point. I just named for fun, fueling [[Tomminess|my usual egocentric grandiosity drives]].

What I did is simply following [this guide](https://atlassian.com/git/tutorials/dotfiles 'How to Store Dotfiles - A Bare git Repository') and touching up a few things according to my taste and my setup.

## todo

- allow status to be displayed and check all files
- encrypted branch including remote data (consider with which key to encrypt with)
- YunoHost-specific [[Nebuchadnezzar]] backup of what is not backed up by YunoHost by default
