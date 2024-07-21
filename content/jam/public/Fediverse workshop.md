---
date: 2023-06-07T07:38:05+02:00
updated: 2023-10-03T13:13:34+02:00
aliases:
  - FediLab
tags:
  - lab
  - outdated
  - geek/fediverse
location: Sanremo
description: An introductory workshop on decentralized social media and the Fediverse
image: https://tommi.space/fedilab-scambi.webp
permalink: /fedilab/
ref: fediverse-lab
include: |
  <div class='red box' style='background: orangered'>
    <h2>The workshop has its own website now!</h2>
    <p>Thanks to the success this workshop got during its first year of life, I decided to properly structure and enrich it.</p>
    <p>The new version is titled <strong><cite>Knitting Our Internet</cite></strong> and it has <a href='https://ourinternet.in/' title='🪡 Knitting Our Internet 🧶'>its own website</a>!</p>
  </div>
---
Carrying on with my mission of spreading the word about the [[Fediverse]], I am gaining consciousness about how interactive and participatory tools are great to deconstruct the ostensible complexity of alternative technological concepts.

I conceived this workshop as an easy, comprehensive, interactive, and maybe even fun introduction to decentralized social networks, the Fediverse in particular.

<div class='yellow box'>
	<p>As it is specified at the bottom of this page, this workshop is licensed with <a href='https://creativecommons.org/licenses/by-sa/4.0'>Creative Commons Attribution-ShareAlike 4.0 International License</a>. It means that you can share, edit, and <strong>do it yourselves</strong>, as long as you observe the limitations explained in the link.</p>
	<p>Please, feel free to comment below or to get in touch, if you believe it could help you. I appreciate everyone sharing any kind of thoughts. If you do the lab yourselves, tell me! I would be super happy.</p>
</div>

As I do with everything concerning this topic, I am dedicating this workshop to [[Aaron Swartz]]. If you want to do this lab, please do underscore this, and tell Aaron’s story.

## Info

The workshop is supposed to last around an hour. It could be expanded even more, but I would suggest to keep it within 90 minutes.

Ideally, all the participants sit in a circle. The workshop works best with a crowd between 4 and 15 people.

## Materials

Not all the materials are essential. In its bare-bone version, the rope and the whiteboard are sufficient.

- Red yarn, or any kind of rope, at least 5 meters long.
- Paper poster or whiteboard
- A hat worn by the workshop’s host, acting as the centralized social network
- Objects or small cardboard pieces representing different Fediverse nodes or clients

<div class='red box'>
	<h2>⚠️ Spoiler alert ⚠️</h2>
	<p>If you intend to participate to the lab, I suggest you not to read further in order to avoid spoiling your experience.</p>
</div>

<figure>
	{% img image, 'A group of ten people sitting in a circle on the ground, holding ends of a red rope that connects them all together' %}
	<figcaption>The Lab held during <a href='https://scambi.org/en'>Scambi Festival</a> 2023 (© Andrea Marchi x Scambi Festival)</figcaption>
</figure>

## Script

1. Introductions and ice-breaker
2. Split the poster/whiteboard in two parts, where each person could freely write:
	- what I like about social media
	- what I do not like about social media
3. Centralization and rope game: the host impersonates the centralized social network, distributing a portion of the rope to each person sitting in the circle. They do so while remaining the unique connection among the participants. Each person should hold in their hands a part of the rope, and the host the only mediator at the center of all the connections the rope creates. At this point, the host should ask to a person to secretly tell or write them a controversial statement. The host should share with the rest of the group a distorted version of the message, proving how the centralized node hs complete unconditional control on all the conversations happening in the network.
4. Explaining what the Fediverse is and how it is different from centralized mainstream social media.
5. Decentralization and rope game: use the same rope to create a peer-to-peer network, where every user is directly connected to all the others. If a more accurate and complex representation of the Fediverse is to be enacted, the cardboard notes should be connected as a decentralized network, while small sub-groups of participants are connected in a centralized way to a node of their choice. In this case, further operations in the Fediverse could be enacted.
	- Migrating to another instance
	- Defederating another instance
6. As the conclusion, go back to what was written on the poster/whiteboard at the beginning of the workshop, and reason collectively on if and how the pros and cons of centralized social media relate to the Fediverse.

## When

Occasions when I conducted the lab:

<ul>{% for lab in activities %}
	{% if lab.tags contains 'lab/ournet' %}
		<li>{{ lab.location }}, <time datetime='{{ lab.start | date_to_xmlschema }}'>{{ lab.start | date: '%-d %B %Y' }}</time>.{% if lab.description %} {{ lab.description | markdownify }}{% endif %}</li>
	{% endif %}
{% endfor %}</ul>
