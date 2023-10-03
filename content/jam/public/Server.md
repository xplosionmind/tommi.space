---
date: 2020-03-21T01:00:00+01:00
updated: 2023-10-03T13:14:26+02:00
location: Xplosion Attic
tags:
  - geek/server
  - geek/wip
  - todo
description: Information and insights concerning the configuration and manteinance of Tommi’s server
aliases: Xplosion Server
---
<cite>Xplosion Server</cite> is my personal server, hosted on a remote VPS. It is running [YunoHost](https://yunohost.org 'YunoHost'). This pages collects useful information to manage the server, and it keeps track of the

## Nginx

Nginx configuration files are in `/etc/nginx/conf.d`. For example, tommi.space Nginx configuration file resides in `/etc/nginx/conf.d/tommi.space.d/my_webapp.conf`.

- [Custom 404 page](https://tecmint.com/create-custom-nginx-error-page 'How to Create Custom 404 Error Page in NGINX - Tecmint')
- [Cache-Control Headers](https://howtogeek.com/devops/how-to-configure-cache-control-headers-in-nginx 'How to Configure Cache-Control Headers in NGINX')
- [Configure gzip compression](https://techrepublic.com/article/how-to-configure-gzip-compression-with-nginx 'How to configure gzip compression with NGINX | TechRepublic')

To check and reload the configuration:

```sh
sudo nginx -t && \
sudo systemctl restart nginx
```

## Backup

![[YunoHost backups on Cubbit DS3 object storage using s3fs]]
