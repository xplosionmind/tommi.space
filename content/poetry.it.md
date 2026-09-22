---
title: Pasticci
permalink: /pasticci/
redirect_from: [/poesia/,/it/poetry/]
lang: it
ref: poetry
class: poetry
header: false
toolbar: false
layout: poem.liquid
description: Pasticci poetici vari e confusi e scombussolati e scombussolanti.
sitemap:
  changefreq: monthly
  priority: 0.7
---
<p>Non è come mangiare un gelato, la scrittura: se la addenti, non ti assale quell’immobilismo per cui il tuo cervello si contrae e non sei in grado di pensare ad altro per cinque virgola due secondi. La scrittura, invece, scalda e dilata, estende e quieta.</p>

<p>Di seguito alcuni miei morsi di scrittura, vi prego di fare attenzione a non lasciarci un canino.</p>

<ul>
	{%- for poem in collections.poetry -%}
		<li>
			<a href='{{ poem.url }}' title='{{ poem.data.title }}'>{{ poem.data.title }}</a>
		</li>
	{%- endfor -%}
</ul>
