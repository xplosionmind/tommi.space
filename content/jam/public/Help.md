---
date: 2021-05-25T17:52:55+02:00
updated: 2022-10-15T00:17:37+02:00
title: Help!
description: Things I need help with
toc: false
tags:
  - help
  - wip
todo:
  - Refactor in HTML, as done with [Around the world](Around%20the%20world) and [Compagni di viaggio](Compagni%20di%20viaggio)
---
There are some things I would absolutely love to do, but either:
- I am not capable;
- I do not have time;
- they are tasks that if done alone are tremendously boring, while with other people become much more enjoyable;
- I think they are good ideas, but I am not the right person to develop them.

Hence, the purpose of this page is to collect all of the things I need help for. Please note that my head, as [this website’s favicon](https://tommi.space/favicon-180.png 'Wide favicon of tommi.space') masterfully displays, is a perpetual explosion, therefore content you find below may belong to the most different fields: <abbr title='Do It Yourself'>DIY</abbr> as well as poetry, computer stuff as well as Philosophy may be involved.

In the case you find something you are interested in among the things below, do not hesitate to <a href='{{ site.email }}?subject=I can help you with {{ title }}' target='_blank' title='Write me an email'>contact me</a> or <a href='#comment' title='leave a comment'>to drop a comment</a>.

<ul>{% for n in collections.jam %}{% if n.data.tags contains 'help' %}<li><a href='{{ n.url }}' title='{{ n.data.title }}'>{{ n.data.title }}</a></li>{% endif %}{% endfor %}</ul>

