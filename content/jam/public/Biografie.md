---js
{
	date: '2021-03-13T22:12:00+01:00',
	updated: '2024-01-03',
	tags: ['people'],
	description: 'Collezionando biografie speciali',
	image: '/assets/bio.jpg',
	redirect_from: ['/biographies/'],
	lang: 'it',
	/*updated: function (data) {
		return this.biografie.reduce((latest, item) => {
			const itemDate = new Date(item.added)
			return itemDate > latest ? itemDate : latest
		}, new Date(0)).toISOString()
	}*/
}
---
Un giorno [Costanza](https://instagram.com/costanzacerss '@costanzacerss su Instagram') mi ha inviato una biografia molto bella. Leggendola mi sono reso conto che un egocentrico come me deve assolutamente seguire l’imperativo di coltivare una concupiscenza per lo stile del raccontare di sé, o in generale del raccontare di una persona.

Perciò, non si tratta meramente di chi siano le <a href='https://tommi.space/people/' title='People – tommi.space' hreflang='en'>persone</a> e delle cose pazzesche che possono aver detto o fatto; è interessante studiare come raccontino di sé. Questa è una collezione di più o meno brevi ammirevoli biografie, che mi hanno donato una qualche consapevolezza importante o che mi hanno regalato emozioni preziose.

<ul>
	{%- for bio in biografie -%}
		<li><a href='{{ bio.url }}' title='Biografia di {{ bio.name }}'>{{ bio.title }}</a>{% if bio.title != bio.name %}, {{ bio.who }}{% endif %}</li>
	{%- endfor -%}
</ul>
