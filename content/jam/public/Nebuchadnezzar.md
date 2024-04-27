---
date: 2020-03-21T01:00:00+01:00
updated: 2024-04-27T19:25:09+02:00
aliases:
  - Xplosion Server
  - Neb
  - Server
tags:
  - todo
  - wip
  - geek/neb
location: Xplosion Attic
description: Information and insights concerning the configuration and manteinance of Tommi’s server
permalink: /neb/
redirect_from:
  - /server/
---
<cite>Nebuchadnezzar</cite> is my personal server, hosted on a remote VPS. It is running [YunoHost](https://yunohost.org 'YunoHost'). Its name is inspired by [the homonymous ship](https://en.wikipedia.org/wiki/Nebuchadnezzar_(The_Matrix) 'Nebuchadnezzar on Wikipedia'), as displayed in [<cite>The Matrix</cite> saga](https://en.wikipedia.org/wiki/The_Matrix_(franchise) 'The Matrix (franchise) on Wikipedia').

This page collects various useful information about system administration in general, as well as Neb-specific configurations and customizations. I apologize for data to be cryptic and mostly random, but these are the personal notes of an amateur sysad: nothing particularly insightful for the rest of the world.

## Environmental impact

As tommi.space is hosted on Nebuchadnezzar, any point in [[The environmental impact of this website|the page about the environmental impact of this website]] is valid for the server, too.

## Customizations

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

### gzip compression

- [Compression and Decompression | NGINX Documentation](https://docs.nginx.com/nginx/admin-guide/web-server/compression/)
- [Module ngx\_http\_gzip\_module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html)
- [Configure gzip compression](https://techrepublic.com/article/how-to-configure-gzip-compression-with-nginx 'How to configure gzip compression with NGINX | TechRepublic')

## Backup

![[YunoHost backups on Cubbit DS3 object storage using s3fs]]

## Nextcloud

Using occ `sudo -u nextcloud php8.2 --define apc.enable_cli=1 /var/www/nextcloud/occ [command]`

## To do

- Set global and/or specific CORS Origin permissions
- Why <q>The configuration file `/var/www/.well-known/www.tommi.space/autoconfig/mail/config-v1.1.xml` has been manually modified and will not be updated</q>?
- `sudo -u nextcloud php8.2 --define apc.enable_cli=1 /var/www/nextcloud/occ stt_whisper:download-models medium`
- Nextcloud changed config files: `/var/www/nextcloud/config/config.php`, old: `/var/cache/yunohost/appconfbackup//var/www/nextcloud/config/config.php.backup.11142`
