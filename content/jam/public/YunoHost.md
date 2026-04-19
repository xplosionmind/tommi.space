---
date: 2022-01-01
tags: [wip, geek/sysad]
---
## Changing the default shell to zsh

See [this guide on the YunoHost forum](https://forum.yunohost.org/t/tuto-comment-installer-oh-my-zsh-how-to-install-oh-my-zsh '[Tuto] Comment installer Oh My Zsh / How to install Oh My Zsh | YunoHost Forum'). **Note:** YunoHost requires a different procedure than a regular Debian server.

## Tweaks and fixes

- [Fix Contabo repository problems](https://forum.yunohost.org/t/solved-error-500-put-yunohost-api-update-all-repository-problems-in-contabo/29453/2 'Solved - Error 500. "PUT" /yunohost/api/update/all - Repository problems in Contabo? - #2 by leuros88 - Support - YunoHost Forum'). **Note:** the repository sources’ URLs change in Debian 12 (Bookworm), see the [`sources.list` example in Debian Wiki](https://wiki.debian.org/SourcesList#Example_sources.list)
- [Close ports 53 and 5353](https://forum.yunohost.org/t/why-are-ports-53-and-5353-opened/ 'Why are ports 53 and 5353 opened? – YunoHost Forum') (if not running YunoHost on a local device). [More info](https://sslinsights.com/what-is-port-5353/ 'What is Port 5353? Uses, Security Risks, and How to Manage It')

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

To use [**`occ`**](https://docs.nextcloud.com/server/stable/admin_manual/configuration_server/occ_command.html '“Using the occ command” in Nextcloud Docs') in YunoHost requires to first [get in the Nextcloud app’s shell](https://github.com/YunoHost-Apps/nextcloud_ynh/blob/master/doc/ADMIN.md 'ADMIN.md in YunoHost-Apps/nextcloud_ynh on GitHub'), then perform the command:

```bash
sudo yunohost app shell nextcloud
php8.3 --define apc.enable_cli=1 /var/www/nextcloud/occ [command]
```

## Monitoring

![YunoHost Server Monitoring](YunoHost%20Server%20Monitoring.md)