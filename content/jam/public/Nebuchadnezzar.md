---
date: 2020-03-21T01:00:00+01:00
updated: 2024-06-09T10:28:33+02:00
aliases:
  - Xplosion Server
  - Neb
  - Server
tags:
  - todo
  - geek/sysad
description: Information and insights concerning the configuration and maintenance of Tommi’s server
permalink: /neb/
redirect_from:
  - /server/
---
<cite>Nebuchadnezzar</cite> (<q>Neb</q> for friends) is the <abbr title='Virtual Private Server'>VPS</abbr> located in Dusseldorf (DE) I rent from [Contabo](). It is running [YunoHost](https://yunohost.org 'YunoHost').

## Name

The name of this server is inspired by [the homonymous ship](https://en.wikipedia.org/wiki/Nebuchadnezzar_(The_Matrix) 'Nebuchadnezzar on Wikipedia'), as displayed in [<cite>The Matrix</cite> saga](https://en.wikipedia.org/wiki/The_Matrix_(franchise) 'The Matrix (franchise) on Wikipedia').

## Environmental impact

As tommi.space is hosted on Nebuchadnezzar, any point in [[The environmental impact of this website|the page about the environmental impact of this website]] is valid for the server, too.

## Customizations

From this point on, this page collects various useful information about system administration in general, as well as Neb-specific configurations and customisations. I apologize for data to be cryptic and mostly random, but these are the personal notes of an amateur <abbr title='system administrator'>sysad</abbr>: there’s nothing particularly insightful for the rest of the world.

- Custom CSS
- Changing the default shell to zsh requires [a different procedure](https://forum.yunohost.org/t/tuto-comment-installer-oh-my-zsh-how-to-install-oh-my-zsh '[Tuto] Comment installer Oh My Zsh / How to install Oh My Zsh | YunoHost Forum').

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

[Using brotli compression in NGINX (especially for my\_webapp) - YunoHost Forum](https://forum.yunohost.org/t/using-brotli-compression-in-nginx-especially-for-my-webapp/29867 'Using brotli compression in NGINX (especially for my\_webapp) - YunoHost Forum')

## Backup

![[YunoHost backups on Cubbit DS3 object storage using rclone]]

## Nextcloud

Using [**`occ`**](https://docs.nextcloud.com/server/stable/admin_manual/configuration_server/occ_command.html '“Using the occ command” in Nextcloud Docs'): `sudo -u nextcloud php8.2 --define apc.enable_cli=1 /var/www/nextcloud/occ [command]`.

## To do

- Set global and/or specific CORS Origin permissions
- `sudo -u nextcloud php8.2 --define apc.enable_cli=1 /var/www/nextcloud/occ stt_whisper:download-models medium`
- Nextcloud changed config files: `/var/www/nextcloud/config/config.php`, old: `/var/cache/yunohost/appconfbackup//var/www/nextcloud/config/config.php.backup.11142`
