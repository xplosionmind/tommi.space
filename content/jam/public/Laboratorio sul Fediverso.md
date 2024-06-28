---
date: 2023-06-07T07:38:05+02:00
updated: 2023-10-03T13:12:38+02:00
tags:
  - lab
  - outdated
  - geek/fediverse
location: Sanremo
description: Un laboratorio di introduzione ai social network decentralizzati
image: https://tommi.space/fedilab-scambi.webp
lang: it
permalink: /lab-fediverso/
ref: fediverse-lab
---
Proseguendo imperterrito nella mia missione di proselitismo per il [[Fediverse|Fediverso]], sempre più mi accorgo di quanto sia bello ed efficace utilizzare strumenti interattivi e partecipativi per decostruire l’apparente complessità di concetti informatici alternativi.

Ho ideato questo laboratorio per realizzare <u>un’introduzione facile, completa e interattiva ai social network decentralizzati</u>.

<div class='yellow box'>
	<p>Come specificato in fondo a questa pagina, questo laboratorio è protetto da <a href='https://creativecommons.org/licenses/by-sa/4.0/deed.it'>licenza Creative Commons Attribution-ShareAlike 4.0 International</a>, che significa che chiunque lo può liberamente attuare e modificare, alle condizioni specificate nel link.</p>
	<p>Sentitevi liberi di commentare qui sotto o di contattarmi se pensate possa aiutarvi, o anche solo per condividere i vostri pensieri, che sono i benvenuti! Se fate il lab, ditemelo, ne sarei felicissimo.</p>
</div>

Come tutto quello che faccio relativamente a questi temi, dedico il laboratorio a [[Aaron Swartz]]. Nel replicare il laboratorio, prego questo sia sottolineato e la storia di Aaron raccontata.

## Informazioni generali

Il laboratorio dura circa un’ora. Se ampliato e fatto in modo completo, può durare fino a 90 minuti.

Idealmente, tutte le persone partecipanti si siedono in cerchio. Il laboratorio funziona al meglio con almeno 4 e al massimo 15 partecipanti.

<div class='red box'>
	<h2 lang='en'>⚠️ Spoiler alert ⚠️</h2>
	<p>Se prevedi di partecipare al laboratorio, ti suggerisco di non proseguire oltre questo punto, per non rovinare l’esperienza</p>
</div>

<figure>
	{% img image, 'Un gruppo di dieci persone sedute per terra in cerchio, tenendo in mano gli estremi di un gomitolo rosso che le connette fra loro' %}
	<figcaption>Il Lab tenuto durante <a href='https://scambi.org'>Scambi Festival</a> 2023 (© Andrea Marchi x Scambi Festival)</figcaption>
</figure>

## Materiale

Non tutti i materiali sono essenziali per la riuscita del laboratorio. Nella versione più semplice ed essenziale sono sufficienti gomitolo e lavagna/poster.

- Gomitolo, spago o cima di almeno 5 metri
- Cartellone o lavagna
- Cappellino che indossa il moderatore agendo come centro del social network centralizzato
- Oggetti o piccoli cartoncini che raffigurano istanze, software o client differenti

## Svolgimento

1. Presentazioni e rompighiaccio
2. Dividere il cartellone o la lavagna in due parti, in cui ogni persona in totale libertà può scrivere
	- cosa mi piace dei social
	- cosa non mi piace dei social
3. Gioco gomitolo e centralizzazione: il moderatore del laboratorio impersona il social network centralizzato, distribuendo un estremo del gomitolo a ciascuna persona nel cerchio, ma rimanendo sempre unico tramite del collegamento fra ogni persona. Ciascunə dovrà aver in mano una parte gomitolo ed il moderatore essere il centro di tutti i collegamenti. A questo punto, il moderatore chiede ad una persona di dirgli all’orecchio o scrivere su un foglietto un messaggio controverso. Il moderatore condividerà con il cerchio il messaggio, ma distorto. La chiave di questa dinamica dovrebbe essere provare che il singolo utente non può provare né fare nulla senza il controllo e l’intervento dell’ente centrale
4. Spiegare cos’è il Fediverso e raccontare in breve come si distingua radicalmente dai social network decentralizzati.
5. Gioco gomitolo e decentralizzazione: utilizzare lo stesso gomitolo per creare una rete peer-to-peer, in cui ogni utente è direttamente in contatto. In caso si volesse rappresentare una versione più accurata ed elaborata, dell’infrastruttura del Fediverso, connettere in modo decentralizzato i cartoncini che rappresentano istanze diverse, a cui sono connessi in modo centralizzato diversi utenti. In questo secondo caso, si possono rappresentare anche ulteriori dinamiche del fediverso:
	- Esempio di migrazione su un’altra istanza
	- Esempio di defederazione
6. In conclusione, riprendere quanto scritto sul cartellone all’inizio del laboratorio e verificare partecipativamente come le cose belle e le cose brutte dette sui social network mainstream funzionino invece nel Fediverso.

## Edizioni passate

Occasioni in cui ho svolto il laboratorio:

<ul>{% for lab in activities %}
	{% if lab.tags contains 'lab/ournet' %}
		<li>{{ lab.location }}, <time datetime='{{ lab.start | date_to_xmlschema }}'>{%- render 'date-it.liquid', date: lab.start -%}</time>.{% if lab.description %} {{ lab.description | markdownify }}{% endif %}</li>
	{% endif %}
{% endfor %}</ul>
