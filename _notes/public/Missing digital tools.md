---
date: 2020-02-26
updated: 2021-02-27T15:31:50.860305+01:00
tags: geek idea
aliases: ["Programming ideas", "Development ideas", "Missing Apps"]
description: "Ideas for programs which would be very useful, but I didn't find yet"
permalink: /missing-tools
redirect_from: ["/tools-ideas", "/programming-ideas", "/programming", "/development-ideas", "/developing", "/developing-ideas", "/apps-ideas", "/programs", "/ideas", "/missing-apps", "/missing-programs", "/missing-digital-tools"]
main: true
toc: false
todo:
  - "LATER: unique loop for Obsidian and Jekyll"
---
{% comment %}
![[Timeline development]]   
![[Screen empathy]]   
![[Jekyll sidenotes]]   
![[Keys]]   
![[Self debugging app]]   
![[Social]]   
![[Recorder]]   
![[Digital Wellbeing implementations]]   
*![[Just once]]*   
![[Shadow map]]   
![[Scale app]]
![[Lunapp]]   
~~![[Batch reopen]]~~

{% endcomment %}

<ul>
{% for note in site.notes %}
	{% if note.tags contains "idea" and note.tags contains "geek" and note.permalink != "/missing-tools" %}
		<li id="{{ note.title | slugify }}"><strong><a href="{{ note.url }}" target="_blank" title="{{ note.title }}">{{ note.title }}</a></strong>: {% if note.description != nil %}{{ note.description}}{% else %}{{ note.content | strip_html | truncatewords: 30 }}{% endif %}</li>
	{% endif %}
{% endfor %}
</ul>

<br>
<br>

## Making a Telegram Bot

- <https://core.telegram.org/bots>
- <https://www.process.st/telegram-bot/>
- [various languages](https://core.telegram.org/bots/samples)