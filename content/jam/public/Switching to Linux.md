---
date: 2021-04-04T11:27:09+02:00
updated: 2023-01-17T19:47:05+01:00
tags: [outdated, geek]
permalink: /switch-to-linux/
redirect_from: [/switching-to-linux/, /quit-macos/, /quit-apple/, /linux-switch/]
description: Insights, guides, notes and ideas about my ongoing attempt at fully switching to Linux.
---
Even though [Linuxplosion](Linuxplosion.md) runs Linux, specifically Ubuntu, 99,9% of my computer time is spent on a MacBook Pro 13' 2019 running, guess what, MacOS.

Even though I hate everything about the capitalist premises of the company who owns and develops it, **I love MacOS** and to be honest most of my life *depends* on it. Nevertheless, since I hate proprietary software, especially if coming from a huge ugly corporation like Apple, I hope that the day where I will have the strength drop everything and exclusively use Linux will come soon. I would love to avoid consumerism, capitalism and monopolies as much as possible, without compromising stability, performance and reliability.

For this purpose, I am gathering here resources for when I will be ready.

- [Why I Switched to Arch Linux](https://luxagraf.net/src/why-i-switched-arch-linux 'Why I Switched to Arch Linux'), by Scott Gilbertson on [Luxagraf `/src/`](https://luxagraf.net/src/ '/src/')

## Linux on my MacBook Pro

Buying another device just to start using Linux earlier than I would is exactly the opposite of what I am trying to accomplish. Therefore, I decided I would start test how Linux would feel like on a daily basis by sideloading it on my MacBook Pro. Insights follow below.

- [t2linux.org](https://t2linux.org)

## Hardware

When my MacBook’s life is getting close to an end, I will start looging for a device to substitute it. Right now, I am inclined to get an awesome Lenovo ThinkPad.

### ThinkPad

- [Used ThinkPad Buyer's Guide](https://web.archive.org/web/20241128063249/https://bobble.tech/free-stuff/used-thinkpad-buyers-guide)
- [ThinkWiki](https://thinkwiki.org)
- [logaze](https://ackerleytng.github.io/logaze) - watching laptops on Lenovo outlet
- [Reware](https://reware.it)

### Other options

- [Framework Laptop](https://frame.work)

## Switching from MacOS

Some notes concerning stuff I do on MacOS that I need to find an alternative for in Linux:

- signing documents and filling PDFs
- keyboard shortcuts to rearrange windows ([Rectangle](https://rectangleapp.com 'Rectangle official website'))
- Automatically switch between light and dark themes, according to the brightness of the environment, using light sensor info ([DarkModeBuddy](https://darkmodebuddy.app 'DarkModeBuddy'))
- remember, store and synchronize WiFi passwords
- Find alternatives for the apps in use

---

<p class=date><time datetime=2023-01-03T17:17:30+01:00>3<sup>rd</sup> January 2023</time></p>

## Making the switch

### Before the switch

- [Mobile backup checklist](Mobile%20backup%20checklist.md)
- Manually copy
	- Obsidian config files
	- Firefox profile
	- Thunderbird profile

### On Linux

<div class='red box'>
	<p>This list is a minimal log of the steps I followed during this specific migration.</p>
	<p><a href='Linux reference.md' class=internal-link>Here is the Linux installation reference</a> I am still using and keeping up to date.</p>
</div>

1. [Configure BIOS/UEFI to prioritize external devices](https://debian.org/releases/stable/amd64/ch03s06.en.html)
2. [Disable fast boot](https://debian.org/releases/stable/amd64/ch03s06.en.html)
3. Handle partitions correctly
4. First setup steps, specifically needed for [Vanilla OS](Vanilla%20OS.md)
5. Install Firefox. The best way to di it is via PPA, since this way it is better integrated with external applications and extensions. Follow <q>Firefox from Mozilla builds</q> from [Install Firefox on Linux in Firefox Help](https://support.mozilla.org/kb/install-firefox-linux 'install Firefox on Linux — Firefox Help'), with a few differences:
	1. `ln -s /opt/firefox/firefox ~/.local/bin/firefox`
	2. `wget https://raw.githubusercontent.com/mozilla/sumo-kb/main/install-firefox-linux/firefox.desktop -P ~/.local/share/applications`
	3. Copy-paste Firefox profile
6. Neovim. Installation, plugins, various
	- Plugins
		- ale
		- deoplete
7. zsh + oh my zsh [+ plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)
 8. Installing Thunderbird
	 1. copy-paste Thunderbird profile from previous device
9. Install Nextcloud Desktop
10. Install Obsidian
11. Install KeePassXC
12. configure SSH and GPG keys
13. Setup KeePassXC SSH agent
14. Clone git repos
	1. remember to clone and manage git modules, too
15. Set global environment variables
16. espanso
17. keys remapping
18. install fonts
	1. Inter
	2. EB Garamond
 19. auto OCR in PDFs and images
 20. [Apps for GNOME](https://apps.gnome.org/)
21. Simple and basic video player
	- [Shotcut](https://www.shotcut.org)
	- [OpenShot Video Editor](https://www.openshot.org)
22. Manage dotfiles. See [awesome-dotfiles](https://github.com/webpro/awesome-dotfiles)
	- [chezmoi](https://chezmoi.io) / [Dotdrop](https://deadc0de.re/dotdrop) / mackup
23. Run [MacOS stuff in Linux](https://darlinghq.org)

### Trouble

- Camera not recognized
- Display glitches
- Keyboard backlight controls