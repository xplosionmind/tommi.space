---
date: 2021-10-14T17:20:13+02:00
updated: 2022-04-01T18:56:13+02:00
tags:
  - geek/apps
image: https://avatars.githubusercontent.com/u/50837219
toc: false
description: A powerful knowledge management software, in early development
---
<div class='blue box'>
	Below there are my notes, thoughts and doubts concerning the project, yet I have many more which I already <a href='https://community.anytype.io/u/tommi/activity' title='My “Activity” page on Anytype Community'>posted on Anytype community</a>. I formulated most of them during the Alpha Testers onboarding call in October 2021, but I almost never updated them since I am not using Anytype on a daily basis
</div>

- how does Anytype connect to the outer world?
- is the public front-end going to be customizable with CSS, by choosing one’s own TLD, etc.?
- ActivityPub/Fediverse implementation + Webmentions: how to link stuff which comes also from outside Anytype? What about <u>JSON-LD implementation</u>?
- How does media files work and how use Anytype also as a gallery for pictures and videos?
- understanding what/how much is stored locally and what/when it is kept in the backup server, according to which principle. Criteria for storing huge files? https://community.anytype.io/t/allow-user-to-initiate-full-sync-and-sync-for-a-perticular-object/2572
- Plugins?

## My take

As of <time datetime='2021-11-01'>November 2021</time>, I believe that Anytype is awesome: it has an immense potential and its usefulness is mindblowing. Still, in order to make an <q>operating system for life</q> actually usable it requires far more features to accomodate every peculiar need.

### Why am I not using it

Currently, my [[Ode to plain text|plain text]]-based system uses [Obsidian](https://obsidian.md 'Obsidian official website') to bring everything together, yet my note structure is not tied to the system, and I can access it any way I want. Being so “low-level” and simple, maintaining this system is probably not very seamless and frictionless, nevertheless, it is <u>totally depending on me</u> and my choices, not on a specific software.

On the other hand, using Anytype I would be tied to a system that, apart from lacking features I need, does not guarantee direct access to the source in an effortless way: I could get my stuff in a human-readable and movable form only by exporting it. Lastly, but most importantly, the development and the whole thing is totally out of my hands: more than publishing some posts on the community, I cannot do. My current system is something I completely understand and that I can manipulate to the bone. By using Anytype—as well of any of the plenty rich-text note-taking apps that are popping up every second—<u>I lack the technical skills to change what I want</u>, regardless of the source code being open or not.

I am sticking with my beloved plain text, Markdown and good old front matter. We will see what is coming up next, and I might change my mind.

<p class='date'><time datetime='2022-04-01T18:34:20+02:00'>Friday 1 April 2022</time></p>

**Update**: I found out about [JSON-LD](https://json-ld.org 'JSON-LD') only recently. I have far more to learn about it and its functioning, yet I believe it would be the best way to achieve most of the points I was doubtful about before. I think that an effective implementation of JSON-LD would actually fully empower Anytype.