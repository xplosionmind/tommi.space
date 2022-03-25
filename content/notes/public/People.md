---
date: 2020-06-25
updated: 2021-12-14T13:27:19+01:00
tags:
  - log
description: Real and fictional characters who left a mark in me
redirect_from: [/characters/,/persone/,/personaggi/,/idols/,/idoli/]
main: true
---
<style>
	h-entry.note {
		width: unset;
		margin-left: unset;
		min-width: 70%;
	}
</style>

{% for idol in people -%}
## {{ idol.who }}{.center .title}
<a href='{{ idol.url }}'>
	<figure>
		<picture>
			<img src='{{ idol.image }}' title='{{ idol.who }}' alt='An image portraying {{ idol.who }}'>
		</picture>
		<figcaption>{% if idol.note -%}{{ idol.note | markdownify }}{% endif -%}</figcaption>
	</figure>
</a>

<br>
<br>

{% endfor -%}

{% for idol in collections.jam -%}
	{% for tag in idol.data.tags -%}
		{% capture idoltag -%}{{ tag | replace: '/', ' ' }}{% endcapture -%}
		{% if idoltag contains 'people' -%}
			<h2 class='center title' id='{{ idol.data.title | slugify }}'>{{ idol.data.title }}</h2>
			<a href='{{ idol.url | url }}'><figure><picture><img src='{{ idol.data.image }}' title='{{ idol.data.title }}' alt='An image portraying {{ idol.data.title }}'></picture></figure></a>
			<p lang='{{ idol.data.lang }}'>{{ idol.data.description }}</p>
			<br>
			<br>
		{% endif -%}
	{% endfor -%}
{% endfor -%}