---
date: 2022-05-18T14:34:20+02:00
updated: 2022-05-18T15:58:38+02:00
location: Zattere
tags: self
aliases: Tommi =, Tommi Uguale
redirect_from: [/tommi-uguale/]
description: "Who is Tommi, what are the values that make him and the ones he stands for"
image: /tomminess.jpg
---
Who Tommi is cannot exhaustively be defined merely by [his <cite>About page</cite>](/about 'About Tommi'), [his resume](https://cv.tommi.space 'Tommi’s CV'), [what he is doing](/now 'Now - tommi.space'), nor <a href='/tutto' title='“Tutto”, all the stuff Tommi does' hreflang='it'>what he did</a>.

In so many occasions my friends come to me and say something like: <q lang='it'>questa cosa è un sacco da Tommi</q>, <q lang='it'>ti ho immediatamente pensato perché mi ha ricordato te</q>, or simply tell me something about me that makes me think <q>oh, this is *so* me</q>. I am collecting all of those attributes here.

Tommi is and at the same time pursues pure [[Tomminess]].
Unsurprisingly, <cite>Tomminess</cite> is Tommi’s way of living. It is composed by the values he stands for, joint with his peculiar annoying egocentric character.

<div class='box'>
	The present page is something similar to a manifesto of Tommi’s being, inspired by the section named <cite>My values</cite> in <a href='https://noeldemartin.com' title='Noel De Martin’s personal website'>Noel De Martin’s personal website</a>.
</div>

<br>
<br>

## <cite>Tomminess</cite> means:

- being [[TMI]]:
	- **oversharing** information about oneself
	- restlessly relentlessly **talking** about something
- <em lang='it'>rompere le palle</em>
- being **egocentric**
- being **angry at Capitalism**:
	- [[Internet Freedom|Fighting Big Tech]]
	- hating people and ventures who are mainly profit-driven rather than humanity-driven
- always looking for an alternative and **original way**, either…
	- …to **be noticed**
	- …to be **[[Radical Chic]]**
- getting overblown by **anxiety** when…
	- …some interpersonal relationship is trembling
	- …people seem to be uninterested in what he has to say
- alternating extreme **misanthropy** with insane **social overwhelmingness**
- being **touchy**
- having a tremendously difficult time distinguishing jokes and serious statements made with sarcasm
- believing in **love**, yet being unable to find it
- in pursuing <cite><a href='/procrastinazione' title='L’Arte del Procrastinare'>Structured Procrastination</a></cite>, spending a ridiculous amount of time to achieve relatively unimportant tasks (such as creating this very page)
- being **stupid**, but only when there is no need to be so, and…
- …being incapable of laughing at jokes when it is time to be serious
- being completely incapable of controlling [[Caffeinated|the effects of **caffeine**]]
- please, if you know Tommi, [comment below](#comments) by writing what you think is missing, and, if accurate, it will be added.

<br>
<br>

## Tommi =

Occasionally, friends of mine I have not been in touch with for quite some time pop up with a message telling me that I remind them so much of some public figure. Below a list:

{% for p in tommi-uguale -%}
	{% if p.name != '' -%}### {{ p.name }}{% endif -%}
	<figure>
		<a href='{{ p.url }}'>
			{% if p.audio != '' -%}<audio controls src='{{ p.audio }}'></audio>{% endif -%}
			{% if p.image != '' -%}<img src='{{ p.image }}' title='Tommi come {{ p.name }}'>{% endif -%}
		</a>
		{% if p.description != '' -%}<figcaption>{{ p.description | markdownify }}</figcaption>{% endif -%}
	</figure>
	<br>
	<br>
{% endfor -%}

<br>
<br>

## Tomminess manifestations

Things, thoughts, writings, videos, songs that represent a part of <cite>Tomminess</cite>:

<ul>
	{% for p in collections.all -%}
		{% for tag in p.data.tags -%}
			{% if tag == 'tomminess' -%}
				<li lang='{{ p.data.lang }}'><cite><a href='{{ p.url }}' hreflang='{{ p.data.lang }}' title='{{ p.data.title }}'>{{ p.data.title }}</a></cite>{%- if p.data.description -%}, {{ p.data.description | markdownify }}{%- endif -%}</li>
			{% endif -%}
		{% endfor -%}
	{% endfor -%}
</ul>