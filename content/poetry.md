---
title: Fake poetry
redirect_from: [/fake-poetry/,/fakepoetry/]
lang: en
ref: poetry
layout: poem.vto
header: false
toolbar: false
class: poetry center
description: A collection of wonderful failures of my foolish attempt at drawing images with my words you are invited to laugh at
sitemap:
  changefreq: monthly
  priority: 0.6
---
{{ description }}

<ul>
	{{- for poem of collections.poetry -}}
		<li><a href='{{ poem.url }}' title='{{ poem.data.title }}'>{{ poem.data.title }}</a></li>
	{{- /for -}}
</ul>
