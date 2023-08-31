---
date: 2021-01-20T16:55:39+01:00
updated: 2023-04-13T09:44:51+02:00
tags: geek
image: https://tommi.space/2019-08-05-linuxplosion-2.jpg
description:
  <cite>Linuxplosion</cite> is my awesome workstation which I assembled in 2019 to edit Everyone. I now use for my most heavy computing tasks, such as video editing or image processing
aliases: Linux Workstation
---
## About

The original fundamental purpose of building <cite>Linuxplosion</cite> was editing [Everyone](https://tommi.space/everyone 'Everyone'). Some computerphiles friends joined me in finding the best components to use, as well as in assembling the computer. In particular, a huge shout-out to my friend Giorgio, who had the patience of bearing with me during all of the assembling process.

<figure>
	<img src='https://tommi.space/2019-08-05-linuxplosion-1.jpg' alt='Giorgio inserting a component of the PC into the case' title='Giorgio inserting a component of the PC into the case'>
</figure>

<figure>
	<img src='https://tommi.space/2019-08-05-linuxplosion-2.jpg' alt='The CPU cooler and the graphic card in evidence on the left side of the case' title='The CPU cooler and the graphic card in evidence on the left side of the case'>
</figure>

I worked as a plumber all of August 2019 to buy it, and it has definitely been worth it. We finished assembling it the 5<sup>th</sup> of August.

Originally, the computer run Windows, but in 2020 I switched to Ubuntu. The only program which I miss is Lightroom (that runs in a <abbr title='Virtual Machine'>VM</abbr>, anyways), everything else works beautifully.
I do not use <cite>Linuxplosion</cite> much since it is not physically in the same city I live in.

## Specs

- Mouse: [Logitech MX Master 2S](https://amazon.it/gp/product/B071KZS3MF/ref=ppx_yo_dt_b_asin_title_o08_s00)
- Keyboard: [AUKEY Tastiera Meccanica](https://amazon.it/gp/product/B0727RJ732/ref=ppx_yo_dt_b_asin_title_o09_s00)
- Big air cooler: [Noctua NF-P14s redux-1500 PWM](https://noctua.at/en/nf-p14s-redux-1500-pwm 'Noctua NF-P14s redux-1500 PWM')
- Smaller air coolers: 2x [Noctua NF-S12B redux-1200 PWM](https://noctua.at/en/nf-s12b-redux-1200-pwm 'Noctua NF-S12B redux-1200 PWM')
- Led strip: [DeepCool 350 RGB](https://deepcool.com/product/dcoolingaccessory/2016-03/12_4814.shtml 'DeepCool 350 RGB') (Note: I found out only later that it is not compatible with my power pack, so I plug it separately into the power plug)
- CPU: [AMD Ryzen 7 2700](https://amd.com/en/products/cpu/amd-ryzen-7-2700 'AMD Ryzen 7 2700')
- Case: [Corsair Carbide 275R](https://corsair.com/us/en/carbide-275r-case 'Corsair Carbide 275R')
- CPU cooler: [ARCTIC Freezer 34 eSports DUO](https://arctic.de/en/Freezer-34-eSports-DUO/ACFRE00060A 'ARCTIC Freezer 34 eSports DUO')
- Wireless adapter: [Asus PCE-AC56](https://asus.com/Networking-IoT-Servers/Adapters/All-series/PCEAC56 'Asus PCE-AC56')
- Motherboard: [MSI B450-A PRO](https://msi.com/Motherboard/B450-A-PRO.html 'MSI B450-A PRO')
- Main SSD: [Samsung 970 EVO Plus NVMe M.2 SSD 250 GB](https://samsung.com/it/memory-storage/nvme-ssd/970-evo-plus-nvme-m-2-ssd-250gb-mz-v7s250bw 'Samsung 970 EVO Plus NVMe M.2 SSD 250 GB')
- Secondary SSD: [Crucial BX500 960 GB](https://crucial.com/products/ssd/bx500-ssd 'Crucial BX500 SSD')
- Graphic card: [MSI V373-014R - Nvidia GeForce RTX 2070 8GB GDDR6](https://it.msi.com/Graphics-Card/GeForce-RTX-2070-ARMOR-8G/Overview 'MSI V373-014R')
- RAM: [Corsair Vengeance LPX 16 GB (2x8GB), DDR4, 3000 MHz](https://www.corsair.com/us/en/Categories/Products/Memory/VENGEANCE-LPX/p/CMK16GX4M2B3000C15 'Corsair Vengeance LPX')
- Power pack: [Corsair TX650M — 650 Watt 80 Plus® Gold](https://corsair.com/us/en/Categories/Products/Power-Supply-Units/txm-series-2017-config/p/CP-9020132-NA 'Corsair TX650M — 650 Watt 80 Plus® Gold')

## Schedule

Linuxplosion is not a [[Server]], hence it should not stay switched on all of the time (also because it is so powerful that it sucks a lot of power). Nevertheless, I needed to make it magically turn on by itself at a given day of the week, so that I can [[Importing workflow|import media from my phone]]. To do so, I run [[Cron Jobs#rtcwake|this Cron Job]].

### Background knowledge
- [Is there a way to auto turn-on Linux machine?](https://unix.stackexchange.com/questions/185475/is-there-a-way-to-auto-turn-on-linux-machine 'Is there a way to auto turn-on Linux machine?')
- [Set Alarm to Automatically Power On Linux Computer](https://www.maketecheasier.com/alarm-automatically-power-on-linux/ 'Set Alarm to Automatically Power On Linux Computer')
- [How to Set up an SSH Server on a Home Computer](https://zduey.github.io/tutorials/ssh-server-on-home-computer/ 'How to Set up an SSH Server on a Home Computer'), by [Zach Duey](https://zduey.github.io 'Zach Duey’s personal website')
- [Don't Underestimate the Challenge of Building a PC](https://via.hypothes.is/https://www.wired.com/story/dont-underestimate-the-challenge-of-building-a-pc/ 'Don\'t Underestimate the Challenge of Building a PC'), by Alex Cranz on Wired

### Wake-on-LAN

- [How To Wake Up Computers Using Linux Command \[ Wake-on-LAN ( WOL ) \] By Sending Magic Packets](https://cyberciti.biz/tips/linux-send-wake-on-lan-wol-magic-packets.html 'How To Wake Up Computers Using Linux Command \[ Wake-on-LAN ( WOL ) \] By Sending Magic Packets')
- [Simple Shell Script To Wake Up NAS Devices Using Linux or Unix Computer](https://bash.cyberciti.biz/misc-shell/simple-shell-script-to-wake-up-nas-devices-computers/ 'Simple Shell Script To Wake Up NAS Devices Using Linux or Unix Computer')

## Cheat sheet

This Cheat sheet is not in the same location as [[Cheat sheets|the main one]], since Ubuntu commands may be somewhat different, and I do not use them often.

### mounting a disk

```bash
udisksctl mount -b /dev/sda2
```

### remove user password

```bash
sudo visudo
```

in order not to be prompted for the password the file which opens up add the following line:
```
ernesto ALL=(ALL) NOPASSWD:ALL
```

where `ernesto` should be the name of your user.

to subsequently delete the password, run:
```bash
sudo passwd -d `whoami`
```

## Software

Software installed on Linuxplosion

![[Apps#Linuxplosion]]

## To do

1. Finalize [[Storage]] and [[Images]] management
1. [Automate emails sending](https://tecadmin.net/ways-to-send-email-from-linux-command-line/ 'Ways to send email from linux command line')
1. [Configure DDNS for remote SSH access](https://dev.to/juliaria08/comment/1efl6 'DDNS config')
1. [Configure WebDAV](https://www.digitalocean.com/community/tutorials/how-to-configure-webdav-access-with-apache-on-ubuntu-18-04 'How To Configure WebDAV Access with Apache on Ubuntu 18.04')
1. [Install IPFS](https://github.com/ipfs/ipfs-desktop)

[DEV]: https://dev.to 'DEV'