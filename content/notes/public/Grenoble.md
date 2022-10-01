---
date: 2022-09-14T17:09:25+02:00
updated: 2022-10-01T15:17:40+02:00
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
- [ ] <cite>[Antigone](https://www.bibliothequeantigone.org 'Antigone, cafè bibliothèque')</cite>, cafè bibliothèque
- [ ] Marché de l’Estacade
- [ ] <cite>La remise</cite>
- [ ] <cite>Le 38, au lieu commun</cite>