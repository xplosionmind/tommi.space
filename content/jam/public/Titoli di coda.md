---
date: 2020-01-01
tags:
  - cinema
aliases: End Credits
description: Titoli di coda indimenticabili.
lang: it
toc: false
---
https://youtu.be/q-z5G-q74ko

Sfortunatamente, non è più tempo di riunire i titoli di coda masterizzandoli in una cassetta, perciò mi limiterò a raccogliere in un banalissimo elenco i titoli di coda che mostrerei alla mia Dolores ideale.

{% assign endcredits = watchlog | where: 'endcredits', '1' %}
<ul>{% for film in endcredits%}<li><cite>{{ film.title }}</cite></li>{% endfor %}</ul>
