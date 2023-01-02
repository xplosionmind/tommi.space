---
date: 2020-12-24T01:00:00+01:00
updated: 2023-01-02T14:27:44+01:00
tags: geek
redirect_from: [/backup/, /backups/]
description: Notes concerning storage management, viable solutions and systems tsting
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
4. **Affordability**: I should not spend too much on this. In the end, shooting pictures is not my job (yet).
5. **Accessibility**: if possible, I would like to be able to access all of my pictures from anywhere anytime.
6. **Portability**: the system I choose must be <u>as bare-bones and simple as possible</u>, so that, if in the future I want to switch to a better one, I can do it as seamlessly as possible.
7. “**Replicability**”: why should my system work for me only? It would be ideal, by documenting everything, to make my final solution “replicable”, hence available to anyone as a source of inspiration. I am writing these words for this reason.

## Doubts

- Can I rely on [[Flickr to Piwigo]] alone to host all of my JPGs, even my private ones? *No*
	- is it reliable? How much do I risk of losing my data? *Not too much. Not more reliable than any server around the world*.
	- is it secure? Are my private pictures somehow server-side encrypted? *[**No encryption**](https://piwigo.org/forum/viewtopic.php?id=31166 'How much can I trust Piwigo with my private pictures?'). Not the best option to backup pictures*
- Does it make sense to use my [[Cubbit]]'s 4TB for long-term picture storage? *It does, as long as [[Cubbit#Feature requests|some features]] will be included*
- Should I use portable Hard Disks, as the ones I already have, or internal hard disks to plug to [[Linuxplosion]]? *None of the two, if the Cubbit solution works*

## Solutions

### SSH

~~The solution I found out to be working greatly up to now is the one described in [[Importing workflow]], which consists in setting a window of [[Cron Jobs|a few hours per week]] while [[Linuxplosion]] is available to synchronize pictures and run tasks via SSH. In this way, storage is safely and redundantly backed up at home~~. This solution requires too much maintenance time and effort, it is fragile and unreliable on the go.

### Cubbit

[[Cubbit]] is the most promising long-term solution, but it still lacks some crucial features. Furthermore, it is <u>not optimized for pictures</u> (yet): albums and photo galleries are limited to folders and sub-folders, there is not even any support for tags.

### Photoprism

[Photoprism](https://photoprism.app 'Photoprism') is arguably the best Google Photos alternative. Nevertheless, it requires a relatively powerful software to run. It is the best possible solution in terms of usability, but not in terms of costs and eco-friendliness. [Some installation resources](https://inputs.tommi.space/tag/list/photoprism 'Entries tagged “photoprism” in inputs.tommi.space')

## Resources

- This [lecture on *Backups*](https://missing.csail.mit.edu/2019/backups/ 'Backups - Missing Semester'), from MIT’s [Missing Semester](https://missing.csail.mit.edu/ 'The Missing Semester') is useful to understand the reasoning behind safe backups. Note that what *The Missing Semester* evolves around is code, hence small if not tiny plain text files, while our interest is in huge amounts of data, such as high quality videos and images.
- [<cite>An engineer’s guide to cloud capacity planning</cite>](https://increment.com/cloud/an-engineers-guide-to-cloud-capacity-planning/ 'An engineer’s guide to cloud capacity planning')

## RAID

On [[Linuxplosion]], I am considering to configure a [RAID 1](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_1 '“RAID Levels” on Wikipedia') storage system. Below, some notes about this.

- [💽 How to Setup Software RAID with MDADM Comand on Linux Ubuntu in 2021 💾](https://youtu.be/O3Iq9hx8V7U '💽 How to Setup Software RAID with MDADM Comand on Linux Ubuntu in 2021 💾'), a YouTube video of September 2020
- [Ubuntu 20.04 Mdadm Setup Guide](https://youtu.be/F4YIxh1kkhI 'Ubuntu 20.04 Mdadm Setup Guide') a YouTube video

![[Backup checklist]]
