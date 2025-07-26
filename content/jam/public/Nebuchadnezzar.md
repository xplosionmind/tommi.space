---
date: 2020-03-21T01:00:00+01:00
updated: 2025-01-20T12:20:55+01:00
aliases:
  - Xplosion Server
  - Neb
  - Server
tags:
  - geek/sysad
description: Information and insights concerning the configuration and maintenance of Tommi’s server.
permalink: /neb/
redirect_from:
  - /server/
---
<cite>Nebuchadnezzar</cite> (<q>Neb</q> for friends) is my main server, where I host most of my software and services, plus a few community apps, all thanks to the sublime [YunoHost](https://yunohost.org 'YunoHost'). It’s a <abbr title='Virtual Private Server'>VPS</abbr> located in Dusseldorf (DE) I rent from [Contabo](https://contabo.com).

Years ago, I started self-hosting to pursue the mission of a quite utopistic and clueless mission of personal digital liberation. I now see that, as [Boris Mann](https://cosocial.ca/@bmann) puts it, <q>self-hosting is selfish</q>, and I am shifting my perspective towards a more collective, communal, choral, and, above all, **politically aware** mission.

This page mostly focuses on technical aspects and quick sparse notes, as I am devoting most of my energy towards more in-person, participatory, and somewhat intimate practices and endeavours, mainly [XPUB Projects](Research%20project%20ideas.md) and <cite>[Knitting Our Internet](https://ournet.rocks)</cite>.

## Name

The name of this server is inspired by [the homonymous ship](https://en.wikipedia.org/wiki/Nebuchadnezzar_(The_Matrix) 'Nebuchadnezzar on Wikipedia'), as displayed in [<cite>The Matrix</cite> saga](https://en.wikipedia.org/wiki/The_Matrix_(franchise) 'The Matrix (franchise) on Wikipedia').

## Environmental impact

As tommi.space is hosted on Nebuchadnezzar, all arguments made in [the page about the environmental impact of this website](The%20environmental%20impact%20of%20this%20website.md) are valid for the server, too.

## Customizations

- [Changing the default shell to zsh](https://forum.yunohost.org/t/tuto-comment-installer-oh-my-zsh-how-to-install-oh-my-zsh '[Tuto] Comment installer Oh My Zsh / How to install Oh My Zsh | YunoHost Forum'). **Note:** YunoHost requires a different procedure than a regular Debian server.

## Tweaks and fixes

- [Fix Contabo repository problems](https://forum.yunohost.org/t/solved-error-500-put-yunohost-api-update-all-repository-problems-in-contabo/29453/2 'Solved - Error 500. "PUT" /yunohost/api/update/all - Repository problems in Contabo? - #2 by leuros88 - Support - YunoHost Forum'). **Note:** the repository sources’ URLs change in Debian 12 (Bookworm), see the [`sources.list` example in Debian Wiki](https://wiki.debian.org/SourcesList#Example_sources.list)

## Nginx

Nginx’s configuration files are in `/etc/nginx/conf.d`. For example, tommi.space Nginx configuration file resides in `/etc/nginx/conf.d/tommi.space.d/my_webapp.conf`.

To check and reload the configuration:

```sh
sudo nginx -t && \
sudo systemctl restart nginx
```

- [Custom 404 page](https://tecmint.com/create-custom-nginx-error-page 'How to Create Custom 404 Error Page in NGINX - Tecmint')
- [Cache-Control Headers](https://howtogeek.com/devops/how-to-configure-cache-control-headers-in-nginx 'How to Configure Cache-Control Headers in NGINX')

### Brotli compression

[It was a mess enabling Brotli compression in Debian/YunoHost 11](https://forum.yunohost.org/t/using-brotli-compression-in-nginx-especially-for-my-webapp/29867 'Using brotli compression in NGINX (especially for my\_webapp) - YunoHost Forum'). In Debian/YunoHost 12 (Bookworm) it is much easier, I followed [this guide](https://camillehdl.dev/nginx-brotli-debian/ 'Use Brotli compression with Nginx on Debian | Camille Hodoul') to do it.

## Backup

[YunoHost backups on Cubbit DS3 object storage using rclone](YunoHost%20backups%20on%20Cubbit%20DS3%20object%20storage%20using%20rclone.md)

## Nextcloud

To use [**`occ`**](https://docs.nextcloud.com/server/stable/admin_manual/configuration_server/occ_command.html '“Using the occ command” in Nextcloud Docs') in YunoHost requires to first [get in the Nextcloud app’s shell](), then perform the command:

```
sudo yunohost app shell nextcloud
php8.3 --define apc.enable_cli=1 /var/www/nextcloud/occ [command]
```

## Pixelfed

- Favicon
	- `/var/www/pixelfed/public/favicon.ico`
	- `/var/www/pixelfed/public/img/favicon.png`
