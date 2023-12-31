---
date: 2023-09-27T17:41:04+02:00
updated: 2023-10-14T21:51:19+02:00
location: Biblioteca Salaborsa, Bologna
permalink: /ds3/
tags:
  - geek/server
  - wip
---
[[Storage]] is a big deal. After years experimenting many different options and attempting to circle down optimal solutions, I finally landed on a solution which is very promising and I believe it to be the definitive one.

I am migrating all of my storage system to the S3 filesystem, based on Cubbit decentralized object storage, or Cubbit DS3. I am doing this major switch as I believe this is the system that better satisfies the most the majority of my [[Storage#Needs]].

- **Durability**: it has been a while since Amazon introduced its S3 standard for object storage, and it seems that it is not going to go anywhere soon. Even though Cubbit is a company and could possibly fail, I could easily migrate to a different provider.
- **Reliability**: Cubbit ensures that it is almost impossible to lose data because of the redundancy by design of its infrastructure.
- **Scalability**: by owning two Cubbit cells and by having the possibility to expand each of one to up to 2TB, I have a potential maximum storage of approximately 5TB, so far. I am comfortable with this amount for the foreseeable future, bu I could consider purchasing a new Cubbit Cell if I needed more storage.
- **Affordability**: I bought my first Cubbit Cell at a very discounted price, being an early supporter, and I won the second one via the lottery we conceived for Scambi Festival 2021. I am not paying any monthly fee. It is super ok.
- **Sustainability**: Cubbit is possibly one of the best options out there weighting features against environmental impact. At its very beginning as a startup, Cubbit produced a whitepaper analyzing this aspect.
- **Accessibility**: all the data is online all the time.
- **Portability**: this is quite tricky. I could easily migrate to another S3-compatible provider, but it definitely would not be seamless. Nevertheless, there is nothing a few good lines of code and some tinkering could not achieve.
- **Replicability**: I am doing by best (and it is not enough, I am aware) to document my steps and my thoughts as much as possible.

## Xplosion Server Backup

Currently, [[Nebuchadnezzar]] has a 200GB SSD, which is more than enough for what I need. To back it up, though, I need some more storage.

The first step in my migration to Cubbit DS3 has been to offload on its infrastructure the backup of Xplosion Server.

![[YunoHost backups on Cubbit DS3 object storage using s3fs]]

## Nextcloud External Storage

I do not fully trust Cubbit DS3 becoming [my Nextcloud](https://cloud.tommi.space 'Tommi’s self-hosted cloud')’s [primary storage](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/primary_storage.html 'Configuring Object Storage as Primary Storage — Nextcloud latest Administration Manual'). Hence, I configured it as [external storage](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/external_storage/amazons3.html 'Configuring Amazon S3 as Nextcloud External storage'), and it is working well so far.
