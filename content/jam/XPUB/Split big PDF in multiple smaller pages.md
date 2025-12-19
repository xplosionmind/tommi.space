---
date: 2025-11-02T19:33:00+01:00
updated: 2025-11-02T19:35:00+01:00
aliases:
  - pdfposter
tags:
  - geek/linux/cli
description: How to split a big poster in multiple smaller pages for easy printing.
permalink: /pdfposter/
location: Eb30B
---
I was looking for a way to split up a big A0 poster I made for the [Fediverse Demo Corner at SFSCON 2025](https://www.sfscon.it/hacking-village-2025/#fediverse-demo-corner 'SFSCON 2025 Hacking Village') into multiple A4 pages, so that I could print them for free at WdKA.

The simplest solution I could find is [`pdfposter`](https://pdfposter.readthedocs.io/):

```
pdfposter -m a4 -p a0 'SFSCON 2025 Fediverse Demo Corner Poster.pdf' '[SPLIT] SFSCON 2025 Fediverse Demo Corner Poster.pdf'
```

I quickly created [a repository](https://codeberg.org/tommi/sfscon-2025-demo-corner-poster) with the source and final files.
