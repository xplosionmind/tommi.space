---
date: 2021-12-06T11:39:18+01:00
updated: 2023-04-28T11:25:33+02:00
permalink: /pandoc-workflow/
redirect_from: [/academic-writing-with-pandoc/,/pandoc-paper/]
tags: geek
image: https://s3.amazonaws.com/libapps/accounts/109251/Screen_Shot_2017-01-06_at_4.18.48_PM.png
toc: false
description: My workflow for academic writing, based on Pandoc, and using Markdown, Zotero, and Obsidian.
aliases: Thesis writing workflow with Pandoc, Long writing in Markdown
---
I am writing my thesis in [Markdown](https://en.wikipedia.org/wiki/Markdown 'Markdown in Wikipedia'), I take advantage of [Zotero](https://zotero.org 'Zotero official website') to store and process citations, and I use [Obsidian](https://obsidian.md 'Obsidian official website') as the main editor (exploiting the great [obsidian-citation-plugin](https://github.com/hans/obsidian-citation-plugin 'obsidian-citation-plugin on GitHub') to ease the citing process).

Finally, a simple and wonderful [[Pandoc]] command compiles the whole thesis.

## Pandoc

In order to correctly format all the styling, it is necessary to convert the Markdown source file to HTML first, and then convert the HTML to PDF

```bash
pandoc -s Thesis.md --resource-path="$PWD" --metadata-file=Thesis.yml -C -o Thesis.html &&\
pandoc -s Thesis.html --resource-path="$PWD" --metadata-file=Thesis.yml -C -o Thesis.pdf
```

- `-s` parses the output in one standalone file
- [`--citeproc`](https://pandoc.org/MANUAL.html#option--citeproc '--citeproc in Pandoc’s User Manual') (abbreviated, **`-C`**) activates citations, references and bibliography processing
- [`--resource-path`](https://pandoc.org/MANUAL.html#option--resource-path '--resource-path in Pandoc’s User Manual') specifies the path(s) where to look for resources. I cannot understand what it defaults to, so explicitly specify it as <abbr title='present working directory'>PWD</abbr>
- add [`--toc`](https://pandoc.org/MANUAL.html#option--toc '--toc in Pandoc’s User Manual') in the case a Table of Contents is intended to be added and a `toc` boolean (`toc: true`) is not present in YAML metadata for the document
- add [`--bibliography`](https://pandoc.org/MANUAL.html#option--bibliography '--bibliography in Pandoc’s User Manual') to specify where the bibliography is located, but only if `bibliography` field is not present in

### Parameters

Inside the front matter, different parameters could be customized, following [Pandoc manual’s suggestions](https://pandoc.org/MANUAL.html#variables-for-latex '“Variables for LaTeX” in Pandoc manual').

## Open questions

- How to customize the front page so that it matches [Ca Foscari University’s guidelines](https://unive.it/pag/8751)?
- ~~`<u>` and `<q>` HTML tags are stripped and not parsed…~~ solved by converting to HTML first
- Automatically title the references section
- [Add colors](https://pandoc.org/MANUAL.html#links)

## Resources

- <cite>[Setup for writing in Markdown, citing with Zotero, and publishing with Pandoc](https://www.simonlindgren.com/notes/2019/11/15/setup-for-writing-in-markdown-citing-with-zotero-and-publishing-with-pandoc 'Setup for writing in Markdown, citing with Zotero, and publishing with Pandoc')</cite>
- <cite>[I wrote my thesis in Markdown, here’s how it went](https://medium.com/@krzysztofczarnecki/i-wrote-my-thesis-in-markdown-heres-how-it-went-3f60140dfe65 'I wrote my thesis in Markdown, here’s how it went')</cite>
- [phd_thesis_markdown](https://github.com/tompollard/phd_thesis_markdown 'phd_thesis_markdown repository on GitHub'), a template
- [pandoc-thesis](https://github.com/cagix/pandoc-thesis 'pandoc-thesis repository on GitHub'), a template
- [Delightful Open Science — tools](https://codeberg.org/teaserbot-labs/delightful-open-science#user-content-tools 'easerbot-labs/delightful-open-science: Curated list of resources, organizations and free software that are supporting the field of open science.'), a repository
- [Manubot](https://manubot.org 'Manubot')
- <cite>[The tools and services I used to write, edit and self-publish my book](https://kerkour.com/book-self-publishing-pandoc/ 'The tools and services I used to write, edit and self-publish my book')</cite>, by [Sylvain Kerkour](https://kerkour.com/ 'Sylvain Kerkour’s personal website')
- I take advantage of in order to add citations to what I am writing in [Obsidian](https://obsidian.md 'Obsidian')
- [Zotero best practices](https://forum.obsidian.md/t/zotero-best-practices/ 'Zotero best practices') on [Obsidian’s forum](https://forum.obsisian.md 'Obsidian Community Forum')
