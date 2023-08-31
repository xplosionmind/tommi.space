---
date: 2020-03-21T01:00:00+01:00
updated: 2023-04-12T21:54:41+02:00
redirect_from: [/xplosion-server/,/xplosionserver/]
tags:
  - geek/server
  - todo
  - wip
description: Information and insights concerning the configuration and manteinance of Tommi’s server
aliases: Xplosion Server
---
Xplosion Server is running [YunoHost](https://yunohost.org 'YunoHost') and I am collecting here various info about it.

## tommi.space

Nginx configuration is in `/etc/nginx/conf.d/tommi.space.d/my_webapp.conf`

- [Custom 404 page](https://tecmint.com/create-custom-nginx-error-page 'How to Create Custom 404 Error Page in NGINX - Tecmint')
- [Cache-Control Headers](https://howtogeek.com/devops/how-to-configure-cache-control-headers-in-nginx 'How to Configure Cache-Control Headers in NGINX')
- [Configure gzip compression](https://techrepublic.com/article/how-to-configure-gzip-compression-with-nginx 'How to configure gzip compression with NGINX | TechRepublic')

To check and reload the configuration:

```sh
sudo nginx -t && \
sudo systemctl restart nginx
```