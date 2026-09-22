---
date: 2026-03-21T11:03:04+01:00
updated: 2026-05-24T17:28:19+02:00
aliases: [OpenZFS]
tags: [geek/sysad, geek/linux]
---
## Installing ZFS

Follow [the installation instructions](https://openzfs.github.io/openzfs-docs/Getting%20Started/Debian/ 'Debian — OpenZFS  documentation') from the OpenZFS official documentation.

ZFS packages are included in the [contrib repository](https://packages.debian.org/source/zfs-linux). The [backports repository](https://backports.debian.org/Instructions/) often provides newer releases of ZFS. You can use it as follows.

Add the backports repository:

```sh
sudo nvim /etc/apt/sources.list.d/trixie-backports.list
```

```
deb http://deb.debian.org/debian trixie-backports main contrib non-free-firmware
deb-src http://deb.debian.org/debian trixie-backports main contrib non-free-firmware
```

```sh
sudo nvim /etc/apt/preferences.d/90_zfs
```

```
Package: src:zfs-linux
Pin: release n=trixie-backports
Pin-Priority: 990
```

Install the packages:

```sh
sudo apt update
sudo apt install dpkg-dev linux-headers-generic linux-image-generic
sudo apt install zfs-dkms zfsutils-linux
```

## Configure ZFS

Essential information for configuration and maintenance is in [System Administration page](https://openzfs.org/wiki/System_Administration) of the OpenZFS wiki.

<div class='red box'>

Note that it may be easier to use the `sda`, `sdb`, `sdc`… naming system that comes out of `lsblk`, but in that case **naming may change**! Therefore, it’s best to reference disks and their partitions as they appear in `/dev/disk/by-id`.

Using changeable naming systems may occur in data corruption. I experienced this (see below).

</div>

```sh
sudo zpool create -n -m /media/ughetto ughetto mirror /dev/disk/ata-ST10000VN000-3AK101_WP01VM8X /dev/disk/by-id/ata-ST10000VN000-3AK101_WP01TL55
```

- `-n` makes the command dry-run.

```sh
sudo zpool add ughetto cache /dev/disk/by-id/ata-CT960BX500SSD1_1914E17B39C1
```

Make the main user the owner of the newly mounted storage:

```sh
sudo chown -R tommi:tommi /media/ughetto
```

## Troubleshooting

### Status check

There is a dedicated command to verify how the ZFS storage pools are doing.

```zsh
sudo zpool status ughetto # name of the pool
```

If the status of a pool is <q>DEGRADED</q>, it does not necessarily mean that a hard disk has failed—see below.

### Destroy pool

Without any crucial data in the storage pool, destroying it and re-creating it from scratch is the simplest way to do it.

<div class='red box'>

**ATTENTION**: this will result in a complete data loss of anything inside the pool.

</div>

```zsh
sudo zpool destroy ughetto
```

### Replace faulty disk/partition

At some point, I realised that my ZFS pool was degraded, again. This time, it was out of question to destroy the whole pool. What was happening? (Once again, the Fediverse has saved me).

![Do not use `/dev/sd*`](Linux%20reference.md#Do%20not%20use%20`/dev/sd*`)

## Backup

ZFS includes snapshots and even a way to send and receive them! The following video was pivotal in my learning and understanding process.

https://youtu.be/_4wJMUgZloQ

Exactly as Nathan says in the video, though, it is super useful to write a bash script and setup a Cron job, but it is safer and more reliable to use community-maintained tools that make the process easier and more streamlined.

He suggests [zfs\_autobackup](https://github.com/psy0rz/zfs_autobackup 'GitHub - psy0rz/zfs_autobackup: ZFS autobackup is used to periodicly backup ZFS filesystems to other locations. Easy to use and very reliable.'), [sanoid](https://github.com/jimsalterjrs/sanoid 'GitHub - jimsalterjrs/sanoid: These are policy-driven snapshot management and replication tools which use OpenZFS for underlying next-gen storage. (Btrfs support plans are shelved unless and until btrfs becomes reliable.)'), and [**zrepl**](https://zrepl.github.io/ 'ZFS replication — zrepl latest documentation'). I decided to use the latter because [Anni](https://monoskop.org/Anders_Aarvik 'Anders Aarvik – Monoskop') suggested it to me.

### zrepl

#TODO