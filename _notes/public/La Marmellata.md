---
date: 2020-02-01
updated: 2021-01-17T08:15:22.267800+01:00
tags: meta
permalink: /marmellata
redirect_from: ["/it/jar", "/jar/it", "/la-marmellata", "/note", "/appunti", "/jar-it"]
lang: it
ref: jam
toc: false
---
Sul web viene comunemente chiamato [Digital Garden](https://dev.to/jbranchaud/the-digital-garden-l10 "The Digital Garden su DEV.to"), oppure può essere definito come *sistema [[Zettelkasten]]*. La mia, invece, è molto neno altisonante ed ambiziosa, ma frullata e gustosa. Si tratta di **una <a href="/marmellata" rel="noopener noreferrer" target="_blank" title="La Marmellata"><cite>Marmellata</cite></a>**.

Ci sono curiose scoperte e piccoli pensieri che voglio salvare prima che finiscano nel dimenticatoio, o nell'attesa che vengano riformulati in maniera migliore e raccontati ne <a href="/zibaldone" rel="noopener noreferrer" target="_blank" title="Zibaldone">Lo <cite>Zibaldone</cite></a>.

Prendo tutte queste cose e ne faccio una <cite>Marmellata</cite>.

Da questa pagina è possibile partire per navigare all'interno della Marmellata. Ci sono due diversi modi per farlo:
- per tematica o argomento—scegliendo un tag
- partendo da una delle macro-note elencate di seguito e proseguendo verso altre note sempre più ramificate.

Ogni elemento della Marmellata è connesso ad un altro: in fondo ad ogni nota, fra i *backlinks* sono elencate tutte le pagine in cui la nota in questione è linkata.

{% include tags.html %}

<div class="yellow box">
	La caratteristica fondamentale che rende la Marmellata efficace e così sorprendentemente potente è la connessione fra vari differenti pensieri. Per questo motivo, nello stesso vasetto che contiene questa marmellata si trovano anche appunti e note molto intimi e privati. Potrebbe accadere che alcuni di questi siano riportati in una nota pubblica; i link che portano a pagine private non funzioneranno, appariranno [[così]].
</div>

<div class="flex row">
	<a class="red button" style="color:white;" href="/whole-jam" rel="noopener noreferrer" target="_blank" title="The Whole Jam">Tutte le note</a>
</div>

{% include filter-lang.html %}

<ul>
	{% assign jam = site.notes %}
	{% for note in jam %}
		{% if note.main %}
			<li lang="{{ note.lang }}"><a href="{{ note.url }}" lang="{{ note.lang }}">{{ note.title }}</a> - {% if note.description %}{{ note.description | markdownify | strip_html | truncatewords: 30 }}{% else %}{{ note.excerpt | strip_html | truncatewords: 30 }}{% endif %}</li>
		{% endif %}
	{% endfor %}
</ul>
<div class="flex row">
	<a class="red button" style="color:white;" href="/whole-jam" rel="noopener noreferrer" target="_blank" title="The Whole Jam">Tutte le note</a>
</div>