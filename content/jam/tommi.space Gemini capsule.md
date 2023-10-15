---
date: 2023-10-14T23:37:10+02:00
updated: 2023-10-14T23:41:55+02:00
---
[[Server|Xplosion Server]] hosts [[tommi.space|this website]] both on the standard web and on Gemini.

To do so, I use the [YunoHost package](https://github.com/YunoHost-Apps/gemserv_ynh 'gemserv YunoHost package source on GitHub') of [gemserv](https://git.sr.ht/~int80h/gemserv 'gemserv repository on sourcehut').

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