---
date: 2020-06-10T02:00:00+02:00
updated: 2022-12-02T01:11:38+01:00
tags: cinema
aliases: Movies
description: After watching these movies and series, I was not the same anymore.
redirect_from: [/movies/,/film/,/films/]
image: https://www.lascimmiapensa.com/wp-content/uploads/2020/03/597c9296ed82967974a455aef591ecfc.jpg
main: true
---
Il mio concetto di cinema può essere a sommi capi rappresentato dalla visione di cinema che mi dona [[Woody Allen]].
{lang=it}

## Favorites

My all-time favorite movies and series:

{% assign favorites = watchlog | where: 'favorite', 'true' | sort: 'name' %}
<ul class='two'>
    {%- for fav in favorites -%}
        <li>
            <cite><a href='{%- if tommi == '' -%}https://en.wikipedia.org/wiki/{{ fav.title }}{%- else -%}{{ fav.tommi }}{%- endif -%}' title='“{{ fav.title }}”'>{{ fav.title }}</a></cite>
        </li>
    {%- endfor -%}
</ul>

## Watchlist

Movies I intend to watch are logged in [[Watchlist|my Watchlist]].

## Watchlog

Movies I watched are logged in [[Watchlog]]. The current method I am using for logging what I watch is made by a system I devised to be as simple and as adaptable as possible, in case I will ever be able to use a unique dedicated software: I log movies into [this CSV data file](https://gitmi.dev/tommi/tommi.space/src/branch/main/data/watchlog.csv 'watchlog.csv in tommi.space data directory'), and I log series (for which single episodes are harder to be tracked) on Stremio.

## Resources

[Stremio](https://strem.io 'Stremio') is everything most people would ever need to watch movies and series. Nevertheless, it lacks some integrations I believe would make it awesome and near-perfect. In particular, I envision an ethical software that manages most of the [[Watchlog]] and the [[Watchlist]], while providing social functionality. I called it <cite>[[Moviewyrm]]</cite>.

Otherwise, I wrote a guide in Italian:

[Scaricare film, come si deve](/scaricare-film 'Scaricare film, come si deve'), una mia guida in italiano per scaricare film tramite torrent.
{lang=it}