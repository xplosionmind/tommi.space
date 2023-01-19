---
date: 2021-03-13T22:12:00+01:00
updated: 2022-03-14T15:01:38+01:00
tags: people
image: https://tommi.space/bio.jpg
description: Una collezione di biografie speciali
redirect_from: [/biographies/, /biografie/]
toc: false
---
Non si tratta solo di chi sono le <a href='https://tommi.space/people' title='People' hreflang='en'>persone</a> e delle cose pazzesche che possono aver detto o fatto; è interessante studiare come raccontino di sé. Questa è una collezione di più o meno brevi ammirevoli biografie.

<ul>
{% for bio in biografie %}
<li><a href='{{ bio.url }}' title='Biografia di {{ bio.name }}'>{{ bio.title }}</a>{% if bio.title != bio.name %}, {{ bio.who }}{% endif %}</li>
{% endfor %}
</ul>