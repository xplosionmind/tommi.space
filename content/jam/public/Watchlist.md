---
date: 2021-12-30T21:46:22+01:00
updated: 2023-01-18T11:48:57+01:00
tags:
  - cinema
  - log
description: |
  Log of movies I intend to watch, parsed from <a href='https://github.com/xplosionmind/data/blob/main/watchlist.csv' title='watchlist.csv in xplosionmind/data on GitHub'>this source file</a>. Temporary solution until <a href='https://tommi.space/moviewyrm' target='_blank' title='Moviewyrm - tommi.space'>Moviewyrm</a> becomes true.
layout: large.html
toc: false
---
{% assign watchlist = watchlist | sort: 'added' | reverse %}
<ul class='three'>{% for movie in watchlist %}<li><cite>{{ movie.title }}</cite></li>{% endfor %}</ul>