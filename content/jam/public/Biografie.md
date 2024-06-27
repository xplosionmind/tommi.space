---
date: 2021-03-13T22:12:00+01:00
updated: 2023-05-01T14:03:38+01:00
tags: people
image: https://tommi.space/bio.jpg
description: Una collezione di biografie speciali
redirect_from: [/biographies/]
toc: false
---
Un giorno [Costanza](https://instagram.com/costanzacerss '@costanzacerss su Instagram') mi ha inviato una biografia molto bella. Leggendola mi sono reso conto che un egocentrico come me deve assolutamente possedere l’ineludibile imperativo di coltivare una concupiscenza per lo stile del raccontare di sé, o in generale di raccontare di una persona.

Perciò si tratta meramente di chi siano le <a href='https://tommi.space/people/' title='People – tommi.space' hreflang='en'>persone</a> e delle cose pazzesche che possono aver detto o fatto; è interessante studiare come raccontino di sé. Questa è una collezione di più o meno brevi ammirevoli biografie, che mi hanno donato una qualche consapevolezza importante o che mi hanno regalato emozioni preziose.

<ul>
	{% for bio in biografie %}
		<li><a href='{{ bio.url }}' title='Biografia di {{ bio.name }}'>{{ bio.title }}</a>{% if bio.title != bio.name %}, {{ bio.who }}{% endif %}</li>
	{% endfor %}
</ul>

