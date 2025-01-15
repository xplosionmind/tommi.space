---
date: 2023-02-10T12:14:03+01:00
updated: 2023-11-05T22:22:54+01:00
tags:
  - geek
  - wip
location: home
permalink: /linux-setup/
---
Lately, I have found myself setting up a lot of Linux devices from scratch. I thought it would be nice to have a timeline to go through during their initial configuration.

Albeit my personal impulse would be to burn each step of this list as quickly as possible, I created this walkthrough exactly not to get lost in the many things to set, but rather to take the time needed to learn more about all the things being tackled.

<div class='yellow box'>
	This walkthrough assumes the use of a Fedora-based Linux distribution using the GNOME Desktop environment.
</div>

1. Disable Secure Boot in the BIOS
2. Install a Linux distribution
	1. Update all firmware
3. [Switch to Zsh](https://wiki.debian.org/Zsh 'Zsh page on Debian Wiki') as the default shell
4. Install fonts
	- NerdFont for CLI
	- Inter
	- EB Garamond
5. Install and configure [Oh My Zsh](https://ohmyz.sh)
6. Install and configure [neovim](https://neovim.io)
	- Configure and install [sensible.vim](https://github.com/tpope/vim-sensible 'sensible.vim on GitHub'), to associate keybindings to commands on Vim
7. Configure [SSH](https://en.wikipedia.org/wiki/SSH 'Secure Shell on Wikipedia')
8. Install and configure [git](https://git-scm.org)
9. Install and configure [Flatpak](https://flatpak.org)
10. Install the first few essential apps:
	- [KeepassXC](https://flathub.org/apps/org.keepassxc.KeePassXC 'KeepassXC on Flathub'): <pre><code>flatpak install flathub org.keepassxc.KeePassXC</code></pre>
	- `sudo dnf install nextcloud-client keepassxc`
	 - [Nextcloud Desktop](https://flathub.org/apps/com.nextcloud.desktopclient.nextcloud 'Nextcloud Desktop on Flathub'): <pre><code>flatpak install flathub com.nextcloud.desktopclient.nextcloud</code></pre>
11. Install [GNOME extensions](https://extensions.gnome.org)
12. `sudo dnf install gnome-tweaks`
	1. to autostart applications
	2. to swap caps lock and esc keys
13. Go through the device settings
14. Copy Obsidian environment
15. clone git repositories
16. install custom scripts
17. ==Configure a backup solution==
