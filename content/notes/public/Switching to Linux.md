---
date: 2023-01-03T17:17:30+01:00
updated: 2023-01-24T23:13:56+01:00
tags:
  - geek
  - log
---
## Before the switch

- [[Backup checklist]]
- Manually copy
	- Obsidian config files
	- Firefox profile
	- Thunderbird profile

## On fresh device

1. First setup steps, specifically needed for [[Vanilla OS]]
2. Install Firefox

## Firefox

The best way to install Firefox is to do so via PPA, since this way it is better integrated with external applications and extensions.

1. Follow <q>Firefox from Mozilla builds</q> from [Install Firefox on Linux in Firefox Help](https://support.mozilla.org/kb/install-firefox-linux 'install Firefox on Linux — Firefox Help'), with a few differences:
	5. `ln -s /opt/firefox/firefox ~/.local/bin/firefox`
	6. `wget [https://raw.githubusercontent.com/mozilla/sumo-kb/main/install-firefox-linux/firefox.desktop](https://raw.githubusercontent.com/mozilla/sumo-kb/main/install-firefox-linux/firefox.desktop) -P ~/.local/share/applications`
2. Copy-paste Firefox profile


---


1. Neovim. Installation, plugins, various
	- Plugins
		- ale
		- deoplete
1. zsh + oh my zsh [+ plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins) 
 1. Installing Thunderbird
	 1. copy-paste Thunderbird profile from previous device
2. Install Nextcloud Desktop
3. Install Obsidian
4. Clone git repos
	1. remember to clone and manage git modules, too
5. espanso
6. keys remapping
7. install fonts
	1. Inter
	1. EB Garamond
 1. auto OCR in PDFs and images
 1. [Apps for GNOME](https://apps.gnome.org/)
8. Simple and basic video player
	- [Shotcut](https://www.shotcut.org)
	- [OpenShot Video Editor](https://www.openshot.org)
9. Manage dotfiles. See [awesome-dotfiles](https://github.com/webpro/awesome-dotfiles)
	- [chezmoi](https://chezmoi.io) / [Dotdrop](https://deadc0de.re/dotdrop) / mackup