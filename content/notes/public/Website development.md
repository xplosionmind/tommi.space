---
date: 2020-02-02T01:00:00+01:00
updated: 2022-06-18T21:35:39+02:00
tags:
  - meta
  - geek/web
aliases: tommi.space, Development Roadmap, Website todo, Meta
permalink: /development/
redirect_from: [/development-roadmap/,/roadmap/,/wip/,/issues/,/improvements/,/dev/,/website-development/,/tommi.space/]
main: true
image: /2020-04-18-making-this-website.jpg
description: Creative and technical aims, ideas annotation and drafts tracking.
---
<div class='red box'>
	Transferring all of the points below to <a href='https://github.com/xplosionmind/tommi.space' title='tommi.space issues on GitHub'>GitHub issues</a> in order to improve tracking and reviewing
</div>

1. [Multilingual sitemap](https://github.com/quasibit/eleventy-plugin-sitemap#create-a-multilingual-sitemap)
1. Print `todo` points of every page at the bottom of it
1. OGP images for categories (e.g. `idea` tags, `geek` tags, etc.)
1. https://github.com/cathugger/mkp224o
1. Temporary *pseudo-[[Zig]]*: a “changelog” section in homepage, [looping through](https://talk.jekyllrb.com/t/loop-through-all-pages-of-the-website/6880 'Loop through ALL pages in a website - Jekyll Talk') the last few pages updated recently (based on `page.updated`)
2. Add a section in each note where `if more`, in the front matter `more: https://en.wikipedia.org/wiki/Love` (e.g. encyclopedia page of the same topic)
2. Add a section in each note where `if related`, in the front matter `related: https://example.com` (e.g. related blog posts)
3. Self-hosted analytics
1. automatic CV compiling implementation
9. Full width images in posts and `article`’s `max-width` instead of `padding`
1. Configure and implement [ActivityPub]
	- [RSS to ActivityPub](https://github.com/dariusk/rss-to-activitypub 'rss-to-activitypub on GitHub')
	- [Bridgy Fed](https://fed.brid.gy/ 'Bridgy Fed')
	- [Nautilus](https://github.com/aaronpk/Nautilus 'Nautilus on GitHub')
1. automatic [[Sconnesso]] audios transcriptions
1. [**<cite>Visions</cite>**](https://visions.tommi.space 'Visioni - Tommi Space') improvement: see [[Images#Gallery improvement]] and [[Flickr to Piwigo]]).
	- <https://github.com/maxvoltar/photo-stream>
	- <https://benschwarz.github.io/gallery-css/>
	- Tania Rascia’s guide for a [responsive gallery](https://www.taniarascia.com/how-to-build-a-responsive-image-gallery-with-flexbox/ 'How to build a responsive gallery with flexbox')
2. Improved building workflow
	1. Integrate URL checking services in the workflow
		- [Urlint](https://urlint.co/integration/github.html 'Urlint')
8. [The Jam](/jam 'The Jam'): Preview a note when hovering on link
3. [Watchlog](https://github.com/xplosionmind/data/blob/main/watchlog.csv 'watchlog.csv on GitHub') implementation
- [[Nolan]] implementation
- [[Anytype]] implementation
- [Generative Art](https://generativeartistry.com 'Generative artistry')
	- always-changing colors, see Zander Martineau’s [website](https://zander.wtf/ 'Zander Martineau')

<br>

### further improvements

- [Reading progress bar](https://css-tricks.com/fun-viewport-units/#getting-weird 'Fun viewport units - CSS Tricks')
- Study [awesome-web-animation website](https://awesome-web-animation.netlify.app/ 'Awesome Web Animation'), possibly considering [Isso](https://posativ.org/isso/ 'Isso')
- Flash animation of exploding head emojis while a button is `active` and/or `hover`
- Use typographic animations
	- [AxisPraxis’ Zycon](https://www.axis-praxis.org/specimens/zycon 'Zycon')
	- [Anicons](https://typogram.github.io/Anicons/ 'Anicons')
- prefer animated GIFs over static images
- Consider hosting on [[Server]] instead of using [Netlify](https://netlify.com 'Netlify')
- Consider sticking the menu bar to the bottom instead of sticking it to the top, as in [Humane Tech website](https://humanetech.com 'Humane Tech') and [Victoria Drake](https://victoria.dev)
- Read through [Best Practices and Coding Guidelines](https://darekkay.com/best-practices/ 'Best Practices and Coding Guidelines - Darek Kay'), by [Darek Kay](https://darekkay.com 'Darek Kay personal website')
- Understand `iframe` embedding error
- Font weight animations, as in [set.studio](https://set.studio/ 'We are Set Studio, a UK-based creative agency')

<br>

### page-specific to-dos

<ul>
	{%- for p in collections.all -%}
		{%- if p.data.todo -%}
			<li><a href='{{ p.url }}' title='{{ p.data.title }}'>{{ p.data.title }}</a>:
				<ul>
					{%- for task in p.data.todo -%}
						<li>{{ task | markdownify }}</li>
					{%- endfor -%}
				</ul>
			</li>
		{%- endif -%}
	{%- endfor -%}
</ul>