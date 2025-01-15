---
date: 2023-02-24T11:46:34+01:00
updated: 2024-08-20T14:41:20+02:00
aliases:
  - tommi.pics
  - Homelab
  - DIY Home Server
tags:
  - geek/sysad
description: Notes and insights about running a DYI server in my grandparents’ home.
redirect_from:
  - /dyi-home-server/
  - /photoprism/
toc: true
---
I embrace and adopt the principles of self-hosting, and I mainly do it on [Nebuchadnezzar](Nebuchadnezzar.md), a Virtual Private Server hosted by [Contabo](https://contabo.com 'Contabo'), in Duesseldorf, Germany. I am very proud of this, and this is already a very big step towards digital independence. Still, all of what lives in <cite title='Nebuchadnezzar'>Neb</cite> actually is in [someone else’s computer](https://fsfe.org/contribute/spreadtheword.html#nocloud '“There is no cloud…” on FSFE’s website'), even though I fully control it.

The coolest, most secure, and most sustainable solution is to self-host on a device at home. Therefore, I am experimenting with a [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) to configure it as my main photo [Storage](Storage.md) solution, powered by [PhotoPrism](https://photoprism.app). It is currently hosted at [my grandma](https://instagram.com/nonnagorix '@nonnagorix on Instagram')’s, because [I am not permanently residing anywhere](/now/ 'Tommi’s Now page') and my parents’ home network is probably more bloated than hers.

<div class='blue box'>
	<h2>Dedicated to Aby Warburg</h2>
	<p>The home server (and therefore this page) takes its name from <a href='/aby-warburg' hreflang='it' title='Appunti su Aby Warburg – Filinge, tommi.space'>Aby Warburg</a>, not only because he is <a href='/people/' title='People – tommi.space'>one of my greatest idols</a>, but because his <cite><a href='https://warburg.library.cornell.edu/' title='Mnemosyne Atlas | Cornell University Library'>Mnemosyne Atlas</a></cite> is in a way what a photo management software like PhotoPrism does.</p>
</div>

## Local network configuration

My grandma has a rather performing <a href='https://www.tim.it/assistenza/assistenza-tecnica/guide-manuali/modem-timhub' title='Modem TIM HUB, istruzioni e configurazioni | TIM'>TIM Hub router</a> in her living room, so the configuration is adapted to that device and that provider.

- The public IP address of the local network might change for any reason, so the router should be connected with a [Dynamic DNS](https://en.wikipedia.org/wiki/Dynamic_DNS 'Dynamic DNS on Wikipedia') service to link it with a domain name and update the IP automatically if it changes. I used [Dynu](https://www.dynu.com/ 'Free dynamic DNS service | Dynu Systems, Inc.'), because it has good reviews and it’s free—even if it looks terribly old.
- <a href='https://www.tim.it/assistenza/assistenza-tecnica/guide-manuali/modem-timhub/port-mapping' title='Configurazione Port Mapping - TIM HUB | TIM' hreflang='it'>Port forwarding configuration</a>

## Raspberry Pi configuration

1. 💾 [Mount](https://learn.pimoroni.com/article/getting-started-with-nvme-base 'Getting Started with NVMe Base – Pimoroni') the [NVMe Base](https://shop.pimoroni.com/products/nvme-base 'NVMe Base for Raspberry Pi 5 – Pimoroni') on the Raspberry Pi 5
2. So far, [Raspberry Pi Debian Images](https://raspi.debian.net/tested-images/ 'Debian tested images for Raspberry Pi') are [not available](https://wiki.debian.org/RaspberryPiImages 'RaspberryPiImages – Debian Wiki') for Raspberry Pi 5, because <q cite='https://wiki.debian.org/RaspberryPiImages'>Currently there is no support to Raspberry Pi 5 as it doesn’t have enough support in upstream Linux.</q> Therefore, I Installed [Raspberry Pi OS](https://www.raspberrypi.com/software/ 'Raspberry Pi OS – Raspberry Pi'). I set it to boot from the SSD and not from the Micro SD.
3. OS configurations
	1. [Enable experimental PCIe 3 support](https://learn.pimoroni.com/article/getting-started-with-nvme-base#optional-and-unsupported-speed-increase '“Optional and Unsupported Speed Increase” section in Pimoroni’s “Getting Started with NVMe Base for Raspberry Pi 5”'), for faster transfer speeds
	2. In order to connect to the device via SSH as soon as the device boots, [automatic login](https://linuxconfig.org/how-to-set-user-autologin-on-raspberry-pi 'How to set user autologin on Raspberry Pi – LinuxConfig.org') has to be enabled
	3. It is a good common practice to [change the SSH connection port](https://www.cyberciti.biz/faq/howto-change-ssh-port-on-linux-or-unix-server/ 'How to change the ssh port on Linux or Unix server – nixCraft')

## PhotoPrism installation and configuration

I am friends with the lovely and sweet Theresa and Michael, the current [PhotoPrism core team](https://www.photoprism.app/about/team 'PhotoPrism team'). We met in Berlin a couple of times and they brought me to the wonderful [Berlin Botanical Garden](https://www.bgbm.org/en 'Botanischen Garten Berlin').

Therefore, I am quite biased, but [the PhotoPrism’s documentation](https://docs.photoprism.app 'PhotoPrism’s documentation') is very complete and exhaustive, so I don’t know what would be useful to write here. I only had a hard time configuring Traefik, but [Michael promptly helped me](https://github.com/photoprism/photoprism/discussions/4407#discussioncomment-10081774 'Cannot connect to Photoprism after adding Traefik · photoprism photoprism · Discussion #4407 · GitHub'), and I made it.

## Backup

I am using [restic](https://restic.net/) [with rclone](https://restic.readthedocs.io/en/latest/030_preparing_a_new_repo.html#other-services-via-rclone 'Preparing a new repository — restic 0.17.0-dev documentation') to save daily backups on [Cubbit](Cubbit.md).

1. [Create a restic repository](https://restic.readthedocs.io/en/latest/030_preparing_a_new_repo.html#other-services-via-rclone 'Preparing a new repository — restic 0.17.0-dev documentation') on Cubbit
2. Perform the backup of the PhotoPrism originals folder: ` restic -r rclone:Cubbit:aby --verbose backup /home/tommi/photoprism/originals --insecure-no-password` (I am using the insecure password option because Cubbit is already encrypted)
3. Set a cron job that runs the command above every night
