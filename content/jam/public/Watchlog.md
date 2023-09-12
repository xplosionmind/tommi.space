---
date: 2021-12-30T21:46:22+01:00
updated: 2023-01-17T19:47:33+01:00
tags:
  - cinema
  - log
description: |
  Log of movies I watched, parsed from <a href='https://github.com/xplosionmind/data/blob/main/watchlog.csv' title='watchlog.csv in xplosionmind/data on GitHub'>this source file</a>. Temporary solution until <a href='https://tommi.space/moviewyrm' target='_blank' title='Moviewyrm - tommi.space'>Moviewyrm</a> becomes true.
layout: large.html
toc: false
---
{% assign movies = watchlog | sort: 'date' | reverse %}
<ul class='three'>{% for movie in movies %}<li><cite><a href='https://imdb.com/title/{{ movie.imdb }}' title='“{{ movie.title }}„ on IMDb'>{{ movie.title }}</a></cite></li>{% endfor %}</ul>