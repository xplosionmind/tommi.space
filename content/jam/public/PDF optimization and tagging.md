---
date: 2023-12-13T01:08:00+01:00
tags:
  - geek
  - wip
description: Tricks for PDF improvement, optimization, tagging, and categorization
permalink: /pdf/
---
```bash
#!/bin/sh

for f in *.pdf
do
	gs -o "_$f" \
	-dNOPAUSE -dQUIET -dBATCH \
	-sDEVICE=pdfwrite \
	-dCompatibilityLevel=1.7 \
	-dPDFSETTINGS=/screen \
	-dEmbedAllFonts=true \
	-dSubsetFonts=true \
	-dCompressPages=true \
	-f "$f" \
	-c "[	/Title ($f)
		/Keywords (Filosofia,Philosophy,High School,Archive)
		/Author (Silvio Mercadante)
	/DOCINFO pdfmark"
done
```
