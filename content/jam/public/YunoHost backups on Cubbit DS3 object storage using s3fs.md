---
date: 2023-09-26T15:20:00+02:00
updated: 2023-10-14T20:49:20+02:00
tags:
  - geek/sysad
location: Biblioteca Salaborsa, Bologna
permalink: /ynh-ds3-s3fs-bkp/
---
The first step of [my major wholesome migration to decentralized object storage](Using%20Cubbit%20DS3,%20or%20decentralized%20object%20storage.md) has been to host on [Cubbit DS3](https://docs.cubbit.io/getting-started/what-is-cubbit-ds3 'What is Cubbit DS3?') the backups of [Xplosion Server](Nebuchadnezzar.md) generated by [YunoHost](https://yunohost.org 'What is YunoHost?').

**TL;DR**: I tried using s3fs to mount Cubbit S3 storage as an external storage device. This attempt failed, and [I am now using rclone](YunoHost%20backups%20on%20Cubbit%20DS3%20object%20storage%20using%20rclone.md).

## Process

I am not getting into basic things such as creating a bucket on Cubbit and configuring it.

### s3fs

1. Install s3fs and dependencies: <pre><code>apt install s3fs automake fuse gcc</pre></code>
2. Save Cubbit DS3 credentials in <pre><code>nvim /etc/passwd-s3fs</pre></code>
3. Create the directory that would be mounted as an external device: <pre><code>mkdir /mnt/backup</pre></code>
4. Run s3fs to link the bucket and the local directory<pre><code>s3fs /mnt/backup -o url=https://s3.cubbit.eu -o endpoint=eu-west-1 -o use_path_request_style -o bucket=backup.tommi.space -o allow_other</pre></code>

## Resources

- [How to mount Object Storage on Cloud Server using s3fs-fuse - UpCloud](https://upcloud.com/resources/tutorials/mount-object-storage-cloud-server-s3fs-fuse)
- [How to Mount s3 bucket on Linux (tested on Centos 7 - XCALLY Motion v2 and Clouditalia S3 Personal Storage) : Manuel Veronesi \\ ICT Consulting \\ Help Desk](https://manuelveronesi.freshdesk.com/support/solutions/articles/19000090670-how-to-mount-s3-bucket-on-linux-tested-on-centos-7-xcally-motion-v2-and-clouditalia-s3-personal-st)
- [Adding an external storage to your server | Yunohost Documentation](https://yunohost.org/en/external_storage#4-mount-the-disk)
