---
date: 2022-09-14T17:09:25+02:00
updated: 2022-11-10T15:35:57+01:00
location: BDL
description: Flux de conscience sur ma vie à Grenoble pendant mon Erasmus.
lang: fr
tags:
  - place
  - wip
---
Notes et réflexions de la cité ou je fais [[Erasmus à Grenoble|mon premier Erasmus]]

<div class='blue box' lang='en'>
	I launched the <mark>#PanErasmus</mark> hashtag on <cite><a href='https://social.scambi.org' title='Pan Social'>Pan</a></cite> and I am going to <a href='https://social.scambi.org/web/tags/PanErasmus' title='“#PanErasmus” hashtag on Pan'>use it to narrate my Erasmus</a>, in English.
</div>

## La vie

Le problème fondamental de ma vie a Grenoble, par rapport a la vie Venisienne, est que tous takes more time <b class='missing'>+++</b> à faire. Aller au supermarché, laver les vêtements (do the laundry <b class='missing'>+++</b>), cuisiner et manger… la quotidianité <b class='ish'>ish</b> est rempli pas beaucoup de petits temps morts entre les tasks <b class='missing'>+++</b> qui à Venice je étais habitué à compléter dans quelque minute.

Par consequence, forcément je suis obligé à supprimer mes nombreux instincts <b class='ish'>ish</b> à <a href='/procrastinazione' hreflang='fr' title='L’arte di procrastinare'>procrastiner</a> et je dois m’habituer à enjoy <b class='missing'>+++</b> les moment de relax et de pause en situations sociels <b class='ish'>ish</b> pendant lesquelles je ne suis pas habitué à me relaxer complètement. C’est un bon exercice, mais parfois il devient trop fatiguant.

## Ressources

- [Tourisme à Grenoble](https://grenoble-tourisme.com 'Grenoble Tourisme')

## Mes endroits

[[Around the world|Mes endroits]] autour de la ville:

	<div class='grid'>
		{% assign endroits = places | where: 'city', 'Grenoble' %}
		{% for place in endroits %}
			<div class='vertical flex box'>
				{% if place.img != '' %}<img src='{{ place.img }}' alt='{{ place.name }}'>{% endif %}
				<h3>{{ place.name }}</h3>
				{% if place.description %}
					<p>{{ place.description | markdownify | truncatewords: 30 }}</p>
				{% endif %}
				<div class='flex row'>
					{% if place.plot != '' %}<a class='tiny yellow button' href='{{ place.more }}' target='_blank' title='What I wrote about {{ place.name }}'>My story</a>{% endif %}
					{% if place.url != '' %}<a class='tiny red button' href='{{ place.url }}' title='{{ place.name }}’s website'>Website</a>{% endif %}
					<a class='tiny green button' href='{%- if place.osm != '' -%}{{ place.osm }}{%- else -%}https://osm.org?mlat={{ place.lat }}&mlon={{ place.lon }}&zoom=18{%- endif -%}' title='{{ place.name }} on the map'>View on map</a>
				</div>
			</div>
		{% endfor %}
	</div>

## Aller voire

Tous les lieus ou je voudrais aller

- [ ] [Le bon label](https://lebonlabel.com), café brasserie
- [ ] [L’Amperage](https://amperage.fr), local pour musiciens émergents locaux
- [ ] <cite>[Antigone](https://www.bibliothequeantigone.org 'Antigone, café bibliothèque')</cite>, café bibliothèque
- [ ] Marché de l’Estacade
- [ ] <cite>La remise</cite>
- [ ] <cite>Le 38, au lieu commun</cite>
- [ ] <cite>Petit vélo dans la tête</cite> centre ville
- [ ] Parc Karl Marx