---
date: 2020-12-24T01:00:00+01:00
updated: 2023-09-28T18:54:29+02:00
redirect_from:
  - /backup/
  - /backups/
tags: geek
description: Notes concerning storage management, viable solutions and systems testing
aliases: Backup
---
In the XXI century, storage is a big deal. Preserving personal data and memories is hard, but it is hell considering privacy and ethics of possible solutions. Naturally, I am very interested in this, while being no developer, nor engineer, nor having enough time to dedicate to this issues, therefore I will be noting some thoughts here.

<div class='yellow box'>
	To better understand my positions about this topic and their reasons, it would be useful to read my experience with [[Data loss|data loss]].
</div>

## Needs

1. **Durability**: I want to be able to effortlessly access all of my data now as 30 years from now.
2. **Reliability**: my storage system has to be <u>absolutely **fail-proof**</u> (of course, no system is. I need to achieve the best reliability I can afford). [[Data loss|I cannot lose any of my data again]].
3. **Scalability**: the amount of pictures collected and stored by everyone in the world is [growing at a tremendously fast pace](https://piwigo.com/blog/2020/12/04/flickr-google-photos-the-end-of-free-photo-hosting/ 'Flickr, Google Photos… The end of free photo hosting?'), my pictures are no exception. I would prefer not to end up stuck in a resources consuming framework which is great with 2TB of pictures, but makes 10TB of pictures unmanageable.
4. **Affordability**: I should not spend too much on this. In the end, shooting pictures is not my job.
5. **Sustainability**: the solution should have the minimum impact possible on the environment, already plagued by the heavy consumption of resources the tech industry causes.
6. **Accessibility**: if possible, I would like to be able to access all of my pictures from anywhere anytime.
7. **Portability**: the system I choose must be <u>as bare-bones and simple as possible</u>, so that, if in the future I want to switch to a better one, I can do it as seamlessly as possible.
8. “**Replicability**”: why should my system work for me only? It would be ideal, by documenting everything, to make my final solution “replicable”, hence available to anyone as a source of inspiration. I am writing these words for this reason.

## Doubts

- Can I rely on [[Flickr to Piwigo]] alone to host all of my JPGs, even my private ones? *No*
	- is it reliable? How much do I risk of losing my data? *Not too much. Not more reliable than any server around the world*.
	- is it secure? Are my private pictures somehow server-side encrypted? *[**No encryption**](https://piwigo.org/forum/viewtopic.php?id=31166 'How much can I trust Piwigo with my private pictures?'). Not the best option to backup pictures*
- Does it make sense to use my [[Cubbit]]'s 4TB for long-term picture storage? *It does, as long as [[Cubbit#Feature requests|some features]] will be included*
- Should I use portable Hard Disks, as the ones I already have, or internal hard disks to plug to [[Linuxplosion]]? *None of the two, if the Cubbit solution works*

## Solution

![[Using Cubbit DS3, or decentralized object storage]]

![[Personal storage management notes]]

![[Backup checklist]]
