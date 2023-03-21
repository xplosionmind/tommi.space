---
date: 2021-03-06T13:42:23+01:00
updated: 2021-03-06T13:42:23+01:00
tags: log
description: Log of the stuff I lose and (hopefully) find
toc: false
aliases: Lost
permalink: /lost/
redirect_from:
  - /lost-and-found/
  - /found/
---
{{ description }}:

{% for thing in lost -%}
- I {{ thing.happened }} {{ thing.what }} {% if thing.lat != '' -%}[here](https://osm.org?mlat={{ thing.lat }}&mlon={{ thing.lon }}&zoom=18 'Coordinates of the place where I {{ thing.happened }} {{ thing.what }}') {% endif -%}on {{ thing.date | date: '%d %B %Y' }}
{% endfor -%}
