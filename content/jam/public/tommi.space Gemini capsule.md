---
date: 2023-10-14T23:37:10+02:00
updated: 2023-10-17T17:06:14+02:00
tags:
  - geek/stale
permalink: /gemini/
description: Notes, logs, and thoughts about the tommi.space Gemini capsule.
toc: false
---
<div class='red box'>
	<h2>Not on Gemini anymore!</h2>
	<p>tommi.space is not on Gemini anymore. More information <a href='/meta#dropping-gemini' title='“Dropping Gemini” section in tommi.space development log'>here</a>.</p>
</div>

The [tommi.space Gemini capsule](gemini://tommi.space) uses the [YunoHost package](https://github.com/YunoHost-Apps/gemserv_ynh 'gemserv YunoHost package source on GitHub') of [gemserv](https://git.sr.ht/~int80h/gemserv 'gemserv repository on sourcehut'), installed on [[Server|Xplosion Server]].

```toml
[[server]]
hostname = "tommi.space"
dir = "/opt/yunohost/gemserv/tommi.space"
key = "/etc/yunohost/certs/tommi.space/key.pem"
cert = "/etc/yunohost/certs/tommi.space/crt.pem"
lang = "en"
redirect = { "/" = "/index.gmi" }
```

```toml
[[server]]
hostname = "yourdomain.org"
dir = "/opt/yunohost/gemserv"
key = "/etc/yunohost/certs/yourdomain.org/key.pem"
cert = "/etc/yunohost/certs/yourdomain.org/crt.pem"
# index is optional but defaults to index.gemini. The server will serve files
# ending in gemini or gmi.
index = "index.gmi"
# lang is optional
lang = "en"
# cgi is optional bool
cgi = true
# cgipath is optional and only checked if cgi is true. It restricts cgi to only
# this directory.
cgipath = "/path/to/cgi-bin/"
# scgi is optional
scgi = { "/scgi" = "localhost:4000" }
# cgienv is optional
cgienv = { "GIT_PROJECT_ROOT" = "/srv/git" }
# usrdir is optional. it'll look in each user's ~/public_gemini
usrdir = true
# proxy is optional
# path is what comes after the hostname e.g. example.com/path
proxy = { path = "localhost:1966" }
# proxy_all is optional
# It will send all requests to the specified server. It also supports streamming.
proxy_all = "localhost:1967"
# redirect is optional
redirect = { "/redirect" = "/", "/newdomain" = "gemini://example.net" }
```