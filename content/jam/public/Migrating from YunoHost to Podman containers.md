---
date: 2026-07-23T17:31:00+02:00
updated: 2026-08-14T13:27:08+02:00
aliases: [YunoHost migration, Server migration]
tags: [wip, geek/sysad]
permalink: /yunohost/quit/migration/
description: Notes on moving away from YunoHost and migrating the applications I installed through that software to containers managed by Podman, with quadlets.
---
[I decided to move away from YunoHost](I%20am%20moving%20away%20from%20YunoHost.md). Here are my notes migrating [Nebuchadnezzar](Nebuchadnezzar.md) from [YunoHost](YunoHost.md) to container-based services using [Podman](Podman.md).

The following steps focus on the backup, migration, and installation process, *not* on the general configuration process of the server and of Podman. Refer to the [Linux reference page](Linux%20reference.md) for that.

## Vaultwarden

Follow the comprehensive [backup guide](https://github.com/dani-garcia/vaultwarden/wiki/Backing-up-your-vault 'Backing up your vault · dani-garcia/vaultwarden Wiki · GitHub').

1. [Configure Caddy in the new server](#Vaultwarden’s%20reverse%20proxy%20with%20Caddy)
2. Stop the service: `sudo yunohost service stop vaultwarden`
3. Change DNS records for `pass.pan.rent` and point them to the IP of the new server
4. Backup vaultwarden
	1. Enter Vaultwarden’s app shell: `sudo yunohost app shell vaultwarden`
	2. Perform the database backup using Vaultwarden’s built-in backup command: `./vaultwarden backup`
	3. Copy all Vaultwarden files to the directory that was just created: `sudo cp -r /home/yunohost.app/vaultwarden /home/yunohost.backup/vaultwarden`
	4. Make everything owned by my user: `sudo chown -R tommi:tommi /home/yunohost.backup/vaultwarden/`
	5. Delete unnecessary files to avoid conflicts: `rm -rf /home/yunohost.backup/vaultwarden/{tmp,db.sqlite*}`
	6. Make the backed-up database the main database: `mv /home/yunohost.backup/vaultwarden/db* /home/yunohost.backup/vaultwarden/db.sqlite3`
5. Create Vaultwarden’s data directory in the destination server: `mkdir -p ~/containers/vaultwarden/data`
6. Copy Vaultwarden’s data to the new server: `scp -P $PORTNUM -pr /home/yunohost.backup/vaultwarden tommi@$SERVERIP:~/containers/vaultwarden/data/`
7. Create [Vaultwarden’s quadlet](#Vaultwarden’s%20quadlet)
8. Reload the systemd configuration and start the Vaultwarden service: `systemctl --user daemon-reload && systemctl --user start vaultwarden`

### Vaultwarden’s quadlet

See [Podman Quadlets](Podman.md#Quadlets) for more information. Here is the configuration file I used:

```systemd
# in /home/tommi/.config/containers/systemd/vaultwarden.container
[Unit]
Description=Pan Pass, community password manager based on Vaultwarden
After=network-online.target

[Container]
AutoUpdate=registry
ContainerName=vaultwarden
Image=ghcr.io/dani-garcia/vaultwarden:latest
Environment=ROCKET_PORT=8080 DOMAIN=https://pass.pan.rent
Volume=/home/tommi/containers/vaultwarden/data/:/data/:z
PublishPort=8080:8080
HealthStartPeriod=10s

Network=giardino

[Install]
WantedBy=default.target
```

### Vaultwarden’s reverse proxy with Caddy

Configure Caddy as a reverse proxy for Vaultwarden:

```Caddyfile
# in /home/tommi/containers/caddy/config/vaultwarden.caddy
pass.pan.rent {
	reverse_proxy vaultwarden:8080
}
```

## Listmonk

Migrating is probably not worth the trouble, since [the archive of all my newsletters is published on tommi.space](https://tommi.space/tag/newsletter/ 'All pages tagged “newsletter” in tommi.space'). I also read that [Listmonk v7 will contain major breaking changes](https://github.com/knadh/listmonk/issues/3073 'v7.0.0 + a note on new PRs · Issue #3073 · knadh/listmonk · GitHub'), although only in the frontend.

I will sit this one out, and I will just install Listmonk from scratch on the new server.

## Ghost

I have never struggled more with anything technical than I have with this Ghost migration. The steps that follow are the outcome of months of frustration and hours of troubleshooting.

I am grateful to the one and only [Evan Hahn](https://evanhahn.com) for providing me with a couple of tips and, above all, by just giving me peace knowing that there was a person that, in the worst case scenario, would still be able to help me by knowing Ghost more intimately than most humans out there.

1. In the old Ghost installation, export all data in the dedicated section. **Note**: members (aka newsletter subscribers) are not included! Go to the member section and export the CSV with all the members.
2. `openssl rand -hex 32 | podman secret create ghost-db-pw-root -`
3. `openssl rand -hex 32 | podman secret create ghost-db-pw -`
4. #TODO

### Ghost’s quadlet

```systemd
# todo
```

### Ghost’s reverse proxy with Caddy

Configure Caddy as a reverse proxy for Ghost:

```Caddyfile
# in /home/tommi/containers/caddy/config/ghost-scambi.caddy
news.scambi.org {
	reverse_proxy ghost-scambi:2638
}
```

## Readeck

I am considering to switch from [Readeck](https://readeck.org) to a more collaborative bookmark saving and sharing tool (I am thinking of [Linkding](https://linkding.link/) and [Semble](https://semble.so)). Nevertheless, other projects hardly match the Readeck vibe: low-key, under the radar, hosted on Codeberg, a super nice mantainer who coincidentally lives quite close to me.

Therefore, I migrated Readeck, also as an exercise.

1. On the old YunoHost server, stop the readeck service `sudo yunohost serivce stop readeck`
2. Still on the YunoHost server, export all data using Readeck’s built-in export tool: `sudo /var/www/readeck/readeck export`
3. As the last operation on the old server, copy the exported zip (mine was ~3GB) to the new server: `scp -pr /path/of/export neb:~/`
4. Change DNS records for `inputs.tommi.space` and point them to the IP of the new server
5. From now on, let’s move to the new server. First, let’s 
6. Create a directory for readeck data: `mkdir -p ~/containers/readeck`
7. Configure [Readeck’s reverse proxy with Caddy](#Readeck’s%20reverse%20proxy%20with%20Caddy)
8. Reload the systemd and start the readeck service `systemctl --user daemon-reload && systemctl --user start readeck`
9. Move the backup to Readeck’s data directory: `mv ~/readeck-tommi-20260813-1639.zip ~/containers/readeck`
10. Restore the backup (it also creates the previous instance’s users): `podman exec -it readeck readeck import /readeck/readeck-tommi-20260813-1639.zip`

### Readeck’s quadlet

```systemd
# in /home/tommi/.config/containers/systemd/readeck.container
[Container]
ContainerName=readeck
Environment=READECK_LOG_LEVEL=info READECK_SERVER_HOST=0.0.0.0 READECK_SERVER_PORT=8000 READECK_LOG_FORMAT=text
HealthCmd=["/bin/readeck","healthcheck","-config","config.toml"]
HealthInterval=30s
HealthRetries=3
HealthTimeout=2s
Image=codeberg.org/readeck/readeck:latest
NoNewPrivileges=true
PublishPort=8000:8000
Volume=/home/tommi/containers/readeck:/readeck:Z

Network=giardino

[Service]
Restart=always

[Install]
WantedBy=default.target
```

### Readeck’s reverse proxy with Caddy

Configure Caddy as a reverse proxy for Readeck:

```Caddyfile
# in /home/tommi/containers/caddy/config/readeck.caddy
inputs.tommi.space {
	reverse_proxy readeck:8000
}
```

## Nextcloud

#TODO