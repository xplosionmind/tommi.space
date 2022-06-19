---
date: 2020-02-02T01:00:00+01:00
updated: 2022-06-19T23:19:57+02:00
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
	To check all of the bugs, feature requests, and ideas, go to <a href='https://github.com/xplosionmind/tommi.space' title='tommi.space issues on GitHub'>tommi.space’s GitHub issues</a>
</div>

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