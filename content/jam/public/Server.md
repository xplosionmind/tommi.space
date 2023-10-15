---
date: 2020-03-21T01:00:00+01:00
updated: 2023-10-15T19:33:08+02:00
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

## To do

- Set global and/or specific CORS Origin permissions
- Why <q>The configuration file `/var/www/.well-known/www.tommi.space/autoconfig/mail/config-v1.1.xml` has been manually modified and will not be updated</q>?
