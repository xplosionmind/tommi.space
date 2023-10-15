---
date: 2020-02-02T01:00:00+01:00
updated: 2023-04-16T10:36:01+01:00
tags:
  - meta
  - geek/web
  - wip
aliases: tommi.space, Development Roadmap, Website todo, Meta, Changelog
permalink: /meta/
redirect_from: [/development/,/tommi.space/,/dev/]
main: true
toc: false
image: /2020-04-18-making-this-website.jpg
description: I put a lot of care and attention to details in this website (probably too much), thus I figured out it is worth sharing my decisions about implementations and features in a log, so that the overall design philosophy of tommi.space is summarized in one place and I can keep track of my thoughts.
todo:
  - finish updating
  - “help wanted” issues search query
---
<div class='yellow box'>
	<p>These notes have to be considered a random set of thoughts rather than an actual log. It was my original intention to track here the changes tommi.space undertakes, nevertheless, I fail at documenting everything because <u>it takes time and I am lazy</u>.</p>
	<p>Also, being a developer or a designer is definitely not my occupation nor my main hobby, hence investing effort in documenting my decisions is not my priority, as well as to explain passages for educational purposes</p>
</div>

<p class='date'><time datetime='2023-10-14T23:00:00+02:00'>October 14<sup>th</sup> 2023</time></p>

## No analytics!

I realized that I do not actually need analytics on this website. I uninstalled [umami](https://umami.is 'umami official website') and I removed any client-side tracking. I did so for multiple reasons:

- I rarely checked the data
- Data was not reliable, since [visits.tommi.space is now listed in the easylist blocklist](https://github.com/easylist/easylist/issues/15069 '“ALLOW *.tommi.space / remove visits.tommi.space from the list” issue in easylist repository on GitHub'). All the people using ad blockers did not appear at all in the stats.
- Loading the analytics script took the website ~700ms longer to fully load.
- I should learn to analyze server access logs, and I could use [server-side analytics](https://plausible.io/blog/server-log-analysis 'Client side vs server side analytics: What's the gap in data? | Plausible blog')
- In the end, do I really care about how many people visit this crazy place? I do not need to see numbers, but to get feedback, create actual, direct, interactions!

<p class='date'><time datetime='2023-04-05T00:00:00+01:00'>April 5<sup>th</sup> 2023</time></p>

## Search

Finally, after three years since rewriting this website from scratch, I found [Pagefind](https://pagefind.app 'Pagefind') to be <u>the perfect search solution</u>, both in terms of ease of use and performance.

<p class='date'><time datetime='2022-12-01T10:14:49+01:00'>Thursday, December 1<sup>st</sup> 2022</time></p>

## Self-hosting

By migrating [[Xplosion Server]] to a slightly more performant machine, I ended up messing up some configurations, and I also realized that my website publishing workflow was not really independent and stable. Therefore, I decided it was time to self host tommi.space.

Details on ![[Self-hosting tommi.space]]

<p class='date'><time datetime='2022-06-19T23:04:30+02:00'>Sunday, June 19<sup>th</sup> 2022</time></p>

## Issue tracking

Up to now, anything concerning website ideas and development was listed quite randomly on the website development page. My intention was to keep everything portable and within <cite>[The Jam](https://tommi.space/jam 'The Jam — tommi.space')</cite>. Nevertheless, tracking both bugs, feature ideas and stuff to do with services dedicated to that is easier, simpler, and much more integrated with the development environment and workflow that git provides.

I am now [using GitHub for issue tracking](https://github.com/xplosionmind/tommi.space/issues 'tommi.space issues on GitHub'), even though the repository is currently being [hosted on giTMI][source], and mirrored on [Codeberg](https://codeberg.org/tommi/tommi.space 'tommi.space repository on Codeberg')

<p class='date'><time datetime='2022-04-21T06:14:30+02:00'>Thursday, April 21<sup>st</sup> 2022</time></p>

## Hosting

Since the beginning, [Netlify](https://netlify.com 'Netlify') has been where tommi.space is hosted. It has to be noted, though, that Netlify is no champion of openness, free software, or sustainable infrastructure, hence not a service whose values I completely share. Nevertheless, it is awesome, since at the same time it both has more than what I need, and it is fairly simple. It hurts to say it, but I love it and I am sticking with it, since it really makes much of the work easier.

All of the relatively big files on the website (such as images and podcast audios) are hosted on [Storj](https://storj.io 'Storj'), and through a couple of tricks they are seamlessly served through Netlify. Storj too has its red flags, since it is based on the blockchain and I am still quite skeptical concerning all of this stuff. But, again, it wonderfully does the work, at least until [Cubbit](https://cubbit.io 'Cubbit') won’t get around static hosting, as Stefano, its CEO, anticipated to me someday it will.

## Analytics

The sole aspect I am interested in is knowing how many people visit my website, specifically which pages.

Being Google Analytics definitely out of consideration, finding a simple, free, light (and hosted) analytics service is not simple.

- [counter.dev](https://counter.dev 'Counter') is the most clever, the lightest, and among the most beautiful analytics software I have ever seen. Unfortunately, it has some big problems that make its numbers not remotely corresponding to reality, and its developers do not plan to fix them anytime soon.
- [Matomo](https://matomo.org 'Matomo') is the go-to Google Analytics alternative, but, as such, it has many features that I do not need and that make it quite heavy.
- [Plausible](https://plausible.io 'Plausible Analytics') is the analytics service I have been using in the last two years, even though it does not feel 100% right, even if it nicely does the work I require. Probably, it is because it costs me a little more than 30€ a year, and I would like to avoid such expense.

Of course, I prefer to self-host analytics, but as of right now Matomo is the only analytics platform packaged for YunoHost (the OS I am using on [[Server|Xplosion Server]]). As soon as any light analytics software will get packaged for YunoHost, I will switch to it.

<p class='date'><time datetime='2022-03-23T16:21:06+01:00'>Wednesday, March 23<sup>rd</sup> 2022</time></p>

## Migrating from GitHub to Codeberg

I love community-driven stuff, and I praise [Codeberg values](https://docs.codeberg.org/getting-started/what-is-codeberg/#our-mission '“Our mission” in Codeberg documentation'). Furthermore, there is all of that stuff that is not good about GitHub, so I moved.

## New repository

I never gave too much attention to the size of the repository of tommi.space, until it clearly huge, with a size of ~1GB. I took advantage of the switch to Eleventy to start a new repository from scratch. The obsolete Jekyll-based website is on GitHub at [old.tommi.space](https://github.com/xplosionmind/old.tommi.space 'old.tommi.space on GitHub')

## Switching to Eleventy

My switching from [Jekyll] to [Eleventy] is one of those things that was not strictly necessary, yet I kept thinking about it every time I coded something, even minimal, on Jekyll. So I switched. It has been very stressful and intense, but I am now thoroughly proud of the fundamental structure of my website, even if [[Website development|it still lacks some features]] it had with Jekyll.

There are plenty of step-by-step guides to switch from Jekyll to Eleventy. Even though tutorials have been of little use for me, since tommi.space is heavily customized and tailored, I saved (and I am still continuing to save) [insightful articles about Eleventy](https://inputs.tommi.space/tag/list/11ty 'Pages saved in Tommi’s inputs tagged “11ty”').

Equally, there are a ton of blog posts comparing the two static site generators, but, again, I am just interested in noting my personal reasons.
- Eleventy now has [around three full time development funding](https://www.11ty.dev/blog/eleventy-oss/ 'Full Time Open Source Development for Eleventy, sponsored by Netlify') working on it. [Jekyll is arguably dying](https://talk.jekyllrb.com/t/is-the-jekyll-project-dead/6820 '“Is the Jekyll project dead?” thread on Jekyll forum'). The only consequence I am interested in is **support**: even after posting the most absurd or tricky question on the [Eleventy discussions](https://github.com/11ty/eleventy/discussions 'GitHub Discussions on Eleventy repository'), I get an answer in less than 40 hours. On the Jekyll forum, I often relied only on the help of [Michael Currin](https://talk.jekyllrb.com/u/michaelcurrin/ 'Michael Currin’s profile on Jekyll’s forum'), who to my eyes quickly became some sort of divinity (as [Peter DeHaan](https://github.com/pdehaan 'Peter deHaan GitHub profile') is for help with Eleventy), but I could never get 100% of what I was looking for.
- I have no intention to start coding as my main activity. Still, it is undeniable that the more coding skills, the better it is on this crazy planet in the 21<sup>st</sup> century. After such premise, it goes without saying that a <abbr title='Static Site Generator'>SSG</abbr> built with JavaScript (such as Eleventy) is to be preferred over one that uses Ruby (such as Jekyll).
- A relevant consequence of the point above is that while with Jekyll I was completely dependent on (and blocked by) plugins and their developers, I now have a little (yet growing) possibility to <u>code some simple features myself</u>, since I am slooooowly learning its basics.
- I do not care much about **build time**, but when on Jekyll it surpassed the 120 seconds, it started to become incredibly itchy and time-consuming to do anything. Eleventy crashed that time down to less than 30 seconds. Considering the average of build times, it still is quite a lot, but I have no time to spend in build speed optimization. It is fine like this.
- It is not a logical not objective argument, but while building Jekyll I continuously got **many warnings** and frequent errors too, even without changing anything—mainly, I believe the main reason were outdated dependencies. I could not stand it anymore.

<p class='date'><time datetime='2021-01-09'>9<sup>th</sup> January 2021</time></p>

## Sidenotes

Sidenotes are awesome, and after taking a look at [Koos Loijesteijn post](https://www.kooslooijesteijn.net/blog/sidenotes-without-js 'Sidenotes without JavaScript') about them, I figured it would be great to implement them on here, too.

I decided not to, for now, for three main reasons:
1. They are impossible to be implemented in Markdown, they need **a lot** of HTML and I don't have the skills for making a Jekyll plugin to transform footnotes in sidenotes (but it may be [[Website log#Sidenotes|a great idea]] to create one)
2. I could easily create an {% raw %}`{% render sidenotes.html %}`{% endraw %} where I could pass as arguments both the note content and the word linked to it, but it wouldn't satisfy me for two reasons:
	1. In the case of printing, it would be a great mess.
	2. On other readers or Markdown parsers outside of Jekyll I'd have a massive chunk of unrendered ugly text
3. Considered the reasons above, <u>it’s not worth it</u>. I use footnotes very few times (even though I massively over-use parentheses (as I am doing right now)) and with the lovely arrow[^test] automatically created, it’s painless to use them.

### Further reading

- [A lovely overview](https://gwern.net/Sidenotes 'Sidenotes in Web Design') of sidenotes implementation techniques and a thorough explanation of their philosophy
- [Koos Loijesteijn's sidenotes](https://github.com/kslstn/sidenotes 'Koos’ sidenotes on GitHub')
- [Tufte CSS](https://edwardtufte.github.io/tufte-css 'Tufte CSS')

<p class='date'><time datetime='2021-03-14'>14 March 2021</time></p>

## Minimalizing

![[Minimalizing]]

<p class='date'><time datetime='2021-12-16T00:10:28+01:00'>Thursday 16 December 2021</time></p>

### Algolia

It is not the best solution in terms of speed and dependance, but it is still valid temporarily. Search functionality is very useful, so it is a trade-off I am willing to accept—temporarily).

Following [these instructions](https://algolia.com/doc/tools/crawler/netlify-plugin/quick-start 'Quickstart for Using Algolia on Netlify ') the setup is quite simple. What is annoying and long to effectively customize is [the front-end CSS](https://github.com/algolia/autocomplete/blob/next/packages/autocomplete-theme-classic/src/theme.scss 'SCSS source for Algolia’s Autocomplete front-end, on GitHub'), which I eventually decided would be simple to [write from scratch](https://github.com/xplosionmind/tommi.space/blob/main/_sass/_search.scss 'My SCSS partial for Algolia front-end styling') by myself.

<p class='date'><time datetime='2021-12-17T00:33:16+01:00'>17 December 2021</time></p>

## Typography and layout

Even though I love [[Typography]], I am never fully convinced about this website layout and design. My concern is not much about coloring, and typesetting, but about layouting, spacing and positioning. I am trying to understand the core of how layouting works by reading at a tremendously slow pace Richard Rutter’s <cite>[[Web Typography]]</cite>.

I will be noting below my doubts and, if solved, my conclusions.

## Questions

<div class='yellow box'>
	The most frequent questions I ask myself are the ones concerning technical aims I need help with, that are logged in the [issues labeled <mark class='blue'>help wanted</mark>]({{ site.issues }} 'tommi.space issues').
</div>

- Before headings, should break tags or CSS margin be used for separation between sections?
	- `<br>` spacing pros
		- effective regardless of the client and the styling
		- full control over exceptions for files
	- CSS spaging pros
		- greater flexibility for changes
		- keeping the content document more clean

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

[Jekyll]: https://jekyllrb.com 'Jekyll official website'
[Eleventy]: https://11ty.dev 'Eleventy official website'
[source]: {{ site.source }} 'tommi.space source code'
[^test]: Lovely arrow test ->
