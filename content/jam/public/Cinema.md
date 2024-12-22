---
date: 2020-06-10T02:00:00+02:00
updated: 2023-12-03T23:40:00+01:00
aliases:
  - Movies
tags:
  - cinema
description: Thoughts and notes about cinema
image: https://www.lascimmiapensa.com/wp-content/uploads/2020/03/597c9296ed82967974a455aef591ecfc.jpg
redirect_from:
  - /movies/
  - /film/
  - /films/
main: true
toc: true
---
There has been a time of my life during which I would have considered myself a cinephile, but I lost that kind of artistic sensibility and passion now.

Most of what I watch by myself are basic shitty movies and series to take a break from life and switch off my brain.

I am hopeful this will change soon…

## Thoughts

In the rare occasions when I watch movies and series critically, or when I have some thought or feeling to share about them, I publish them in the Jam with [the <q>cinema</q> hashtag](/tag/cinema).

## Favorites

A raw, impulsive, unexplained list of my all-time favorite movies and series:

<ul class='two'>
	{% assign favs = watchlog | where: 'favorite', 'true' %}
	{%- for fav in favs -%}
		<li>
			<cite><a href='{%- if fav.tommi == '' -%}https://en.wikipedia.org/wiki/{{ fav.title | url_encode }}{%- else -%}{{ fav.tommi }}{%- endif -%}' title='“{{ fav.title }}”'>{{ fav.title }}</a></cite>
		</li>
	{%- endfor -%}
</ul>

## Watchlists

I add movies and series I would like to watch to [this watchlist](/watchlist/). It lives on [Trakt](https://trakt.com), which is the usual basic lame proprietary software. Nevertheless, it is a compromise I choose to accept, until something like <cite>[Moviewyrm](#moviewyrm)</cite> comes to life.

## Watchlog

I keep track of the movies and series I watch in [this watchlog](/watchlog/). It lives on [Trakt](https://trakt.com), which is the usual basic lame proprietary software. Nevertheless, it is a compromise I choose to accept, until something like <cite>[Moviewyrm](#moviewyrm)</cite> comes to life.

## Software and automation

I mainly use [Stremio](https://strem.io 'Stremio'), and I believe it is everything most people would ever need to watch movies and series.

Sadly, Stremio lacks some integrations I believe would make it awesome and near-perfect. In particular, it lacks social features. This is why I have been thinking about inventing [Moviewyrm](#moviewyrm).

## <cite>Moviewyrm</cite>

I envision a software that manages most of the [my watchlog](/watchlog/) and [my watchlist](/watchlist/), while providing social functionality. I called it <cite>[Moviewyrm](Moviewyrm.md)</cite>, more info in the dedicated page.
