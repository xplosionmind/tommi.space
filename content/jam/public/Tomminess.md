---
date: 2022-05-18T14:34:20+02:00
updated: 2024-03-08T13:02:58+02:00
aliases:
  - Tommi =
  - Tommi Uguale
tags:
  - self
location: Zattere
description: Who Tommi is, what are the values that make him and the ones he stands for
image: /tomminess.jpg
redirect_from:
  - /tommi-uguale/
main: true
toc: true
---
Who Tommi is cannot exhaustively be defined merely by [his <cite>About page</cite>](https://tommi.space/about 'About Tommi'), [his resume](https://cv.tommi.space 'Tommi’s CV'), [what he is doing](https://tommi.space/now 'Now - tommi.space'), nor <a href='https://tommi.space/tutto' title='“Tutto”, all the stuff Tommi does' hreflang='it'>what he did</a>.

In so many occasions my friends come to me and say something like: <q lang='it'>questa cosa è un sacco *da Tommi*</q>, <q lang='it'>ti ho immediatamente pensato perché mi ha ricordato te</q>, or simply tell me something about me that makes me think <q>oh, this is *so* me</q>. I am collecting all of those attributes here.

Tommi is [Tomminess](Tomminess.md). In other words, <cite>Tomminess</cite> is Tommi’s way of living. It is a mix of vices, virtues, personality traits, and values.

<div class='box'>
	The present page is something similar to a manifesto of Tommi’s being, inspired by the section named <cite>My values</cite> in <a href='https://noeldemartin.com' title='Noel De Martin’s personal website'>Noel De Martin’s personal website</a>.
</div>

## <cite>Tomminess</cite> means:

- being **[TMI](TMI.md)**:
	- **oversharing** information about oneself
	- restlessly relentlessly **talking** about something
- <em lang='it'>rompere le palle</em>
- being **egocentric**
- being **angry at Capitalism**:
	- [Fighting Big Tech](Internet%20Freedom.md)
	- hating people and ventures who are mainly profit-driven rather than humanity-driven
- trying to lure people in the **[Fediverse](Fediverse.md)** by showing them how revolutionary it is
- hating to feel and to appear mainstream, thus restlessly looking for an alternative and **original way**, either…
	- …to **be noticed**
	- …to be **[Radical Chic](Radical%20Chic.md)**
- getting overblown by **anxiety** when…
	- …some interpersonal relationship is trembling
	- …people seem to be uninterested in what he has to say
- alternating extreme **misanthropy** with insane **social overwhelmingness**
- being **touchy**
- **hating chitchatting**
- having a tremendously difficult time distinguishing jokes and serious statements made with sarcasm, in other words: **not understanding irony**
- believing in **love**, yet being unable to find it
- following and advocating for **the art of <cite>[Introductionism](Introductionism.md)</cite>**
- in pursuing <cite><a href='https://tommi.space/procrastinazione' title='L’Arte del Procrastinare'>Structured Procrastination</a></cite>, spending a ridiculous amount of time to achieve relatively unimportant tasks (such as creating this very page)
- being **stupid**, but only when there is no need to be so, and…
- …being incapable of laughing at jokes when it is time to be serious
- being completely incapable of controlling [the effects of caffeine](Caffeinated.md)
- always noticing aspects of **<cite>[Rent](Rent.md)</cite>** everywhere
- to love **meeting people** and establishing unique **connections** with them, having friends all over the world
- getting super pumped and enthusiastic when people/friends he met in different occasions or in different context meet between each other thanks to his mediation.
- both using and being <q>🤯</q> very (or too) often
- being [always last-minute](Last-minuTommi.md)
- please, if you know Tommi, write him what you think is missing, and, if accurate, it will be added.

## Tommi =

Occasionally, friends of mine I have not been in touch with for quite some time pop up with a message telling me that I remind them so much of some public figure. Below a list:

{% for p in tommi-uguale -%}
	{% if p.name != '' -%}### {{ p.name }}{% endif -%}
	<a href='{{ p.url }}'>
			{% if p.audio != '' -%}<audio controls src='{{ p.audio }}'></audio>{% endif -%}
			{% if p.image != '' -%}<figure><img src='{{ p.image }}' alt='{{ p.name }}'></figure>{% endif -%}
			{% if p.description != '' -%}<p>{{ p.description | markdownify }}</p>{% endif -%}
	</a>
{% endfor -%}

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
