---
date: 2020-06-10T02:00:00+02:00
updated: 2023-12-03T23:40:00+01:00
tags: cinema
image: https://www.lascimmiapensa.com/wp-content/uploads/2020/03/597c9296ed82967974a455aef591ecfc.jpg
description: Thoughts and notes about cinema
aliases: Movies
redirect_from: [/movies/,/film/,/films/]
main: true
---
<p lang='it'>Il mio concetto di cinema può essere a sommi capi rappresentato dalla visione di cinema che mi dona <a href='/woody-allen'>Woody Allen</a>.</p>

## Favorites

My all-time favorite movies and series:

<ul class='two'>
	{%- for fav in favorite-movies -%}
		<li>
			<cite><a href='{%- if tommi == '' -%}<https://en.wikipedia.org/wiki/{{> fav.title }}{%- else -%}{{ fav.tommi }}{%- endif -%}' title='“{{ fav.title }}”'>{{ fav.title }}</a></cite>
		</li>
	{%- endfor -%}
</ul>

## Watchlist

Movies I intend to watch are logged in [my watchlist](/watchlist). You will be redirected to a Trakt page. It is terrible proprietary software, but this is one of the cases in which I sacrifice my position for convenience.

## Watchlog

Movies I watched are logged in [my watchlog](/watchlog). You will be redirected to a Trakt page. It is terrible proprietary software, but this is one of the cases in which I sacrifice my position for convenience.

## Resources

[Stremio](https://strem.io 'Stremio') is everything most people would ever need to watch movies and series. Nevertheless, it lacks some integrations I believe would make it awesome and near-perfect. In particular, I envision a software that manages most of the [my watchlog](/watchlog) and the[my watchlist](/watchlist), while providing social functionality. I called it <cite>[[Moviewyrm]]</cite>.