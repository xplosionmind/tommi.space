---
date: 2020-03-21T01:00:00+01:00
updated: 2026-08-13T22:01:05+02:00
aliases: [VPS configuration, Server setup, Server configuration]
tags: [geek/sysad]
permalink: /linux/
redirect_from: [/server-configuration/, /linux-reference/]
description: A reference of common Linux procedures and commands, for server configuration,
toc: true
---
I originally created this page to configure [Nebuchadnezzar](Nebuchadnezzar.md) from scratch, and [to install Nextcloud](Installing%20Nextcloud.md), [Jitsi Meet](Installing%20Jitsi%20Meet.md), and other software on a Linux VPS. Nevertheless, the original guide became obsolete and unmaintained, as I learned new notions about Linux system administration, and as I discovered other options more suited to my needs.

Therefore, I restructured my notes and turned this page in a reference guide (a.k.a. <q>cheat sheet</q>) for common Linux operations, and related notes. Everything should be working in any distribution, but some commands are for [Debian](https://debian.org) specifically.

More context and information on my system administration practice and my choices are [in my self-hosting log](Self-hosting%20logs.md).

---

## Updating

Update Debian (`-y` parameter is used to accept by default any question)

```bash
sudo apt update && sudo apt upgrade -y
```

Remove unused packages:

```bash
sudo apt autoremove -y && sudo apt autoclean -y
```

## Creating a user

It is always better not to work and setup stuff straight from root user, it’s easy to mess everything up, and it is very risky if you are not completely sure of what you are doing^[[How to Create Users in Linux (useradd Command)](https://linuxize.com/post/how-to-create-users-in-linux-using-the-useradd-command/)]

```bash
sudo useradd -m -G sudo -s /bin/zsh tommi
```

- `-m` creates a home directory in `/home/tommi`
- `-G sudo` adds the newly created user to the sudoers group
- `-s /bin/zsh` sets the user’s default shell to `/bin/zsh`

## Firewall

Enable default configuration

```bash
ufw allow OpenSSH
```

enable firewall

```bash
ufw enable
```

check if everything is working

```bash
ufw status
```

## SSH

### SSH Keys

create [SSH](https://en.wikipedia.org/wiki/SSH 'SSH on Wikipedia') folder to store allowed keys

```bash
ssh-keygen -t ed25519 -a 100
```

**on local client**:

```bash
SERVERIP=192.168.1.1 # IP address of destination server
PORT=1312 # arbitrarily chosen port number
ssh-copy-id tommi@$SERVERIP -p $PORT
```

Alternatively:

```bash
scp -P $PORT ~/.ssh/id_rsa.pub tommi@$SERVERIP:~/.ssh/authorized_keys
```

#### More information

- [SSH keys explained](https://dev.to/rmoff/ssh-keys-explained-2e2l 'SSH keys explained'), a comprehensive yet simple guide to understand how SSH keys management should be done
- [Linode’s tutorial](https://www.linode.com/docs/guides/use-public-key-authentication-with-ssh/ 'Use SSH Public Key Authentication on Linux, macOS, and Windows - Linode') on the topic

### Changing SSH port

<div class='yellow box'>
	Changing the default SSH port is useful to prevent randomised attacks which attempt to get access to the server from <a href=https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers target=_blank>port 22</a>, the default one.
</div>

Enable the new SSH port from the firewall. In this case, the process I will be following configures port `5522`

```bash
export PORT=13120
sudo ufw allow $PORT/tcp
```

In the SSH configuration file `/etc/ssh/sshd_config`, replace `#Port 22` with `Port 5522`.

Disable connections from port 22

```bash
sudo ufw deny 22
```

Restart ssh

```bash
sudo systemctl restart ssh
```

### Disabling SSH root access

In `/etc/ssh/sshd_config`:

```ssh-config
PermitRootLoogin no # was: yes
```

### Changing SSH login message

Two non-overlapping options to change the **SSH login message**:

- Edit the content of **`/etc/motd`**
- Create a plain text file and then link it in `/etc/ssh/sshd_config`, adding/uncommenting the line `Banner /link/to/the/textfile`

## `.ssh` directory permissions

SSH authentication and configuration **will not work** if permissions are too open or too strict. Here are the correct permissions for `$HOME/.ssh`.^[[Permissions on private key in .ssh folder?](https://superuser.com/questions/215504/permissions-on-private-key-in-ssh-folder)]

| Item            | Path                     | Numeric       | Bitwise              |
| --------------- | ------------------------ | ------------- | -------------------- |
| SSH folder      | `~/.ssh`                 | `700`         | `drwx------`         |
| Public key      | `~/.ssh/id_rsa.pub`      | `644`         | `-rw-r--r--`         |
| Private key     | `~/.ssh/id_rsa`          | `600`         | `-rw-------`         |
| Authorized Keys | `~/.ssh/authorized_keys` | `600`         | `-rw-------`         |
| Config          | `~/.ssh/config`          | `600`         | `-rw-------`         |
| Home folder     | `~`                      | `755` at most | `drwxr-xr-x` at most |

## Installing git

Installing [git](https://git-scm.com/ 'git official website'):

```bash
sudo apt install git
```

## zsh

By default, Linux comes with bash. I choose to use [zsh]() instead, since it is very similar to bash, but it is a bit more modern.

### Shell comparison

- [Linux Shells for Beginners – Bash, Zsh, and Fish Explained](https://www.freecodecamp.org/news/linux-shells-explained/ 'Linux Shells for Beginners – Bash, Zsh, and Fish Explained. freeCodeCamp')
- [Bash vs Zsh vs Fish](https://zellwk.com/blog/bash-zsh-fish/) by Zell Liew

### Installing zsh

```bash
sudo apt install zsh
```

### Change the default shell

```bash
chsh -s /usr/bin/zsh
```

### oh-my-zsh

#TODO link with [tdm](tdm.md).

[oh-my-zsh](https://ohmyz.sh/ 'ohmyz.sh') makes extending and customising zsh fun and easy.

To install it:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## IPv6

#TODO I am currently learning how to configure and use [IPv6](IPv6.md) as the main way to manage the network stack, instead of IPv4.

## Troubleshooting

### TERM environment variable not set

If <q>terminal is not fully functional</q> or <q>TERM environment variable not set</q>:

```bash
sudo echo 'TERM=xterm-256color' >> /etc/environment
```

## Disk management

List all disks and their mount points:

```zsh
lsblk
```

Mount a disk:

```zsh
mkdir /path/to/mountpoint
sudo chown -R tommi:tommi /path/to/mountpoint
sudo mount /dev/sda1 /path/to/mountpoint
```

Unmount a disk:

```zsh
sudo umount /dev/sda1 # or /path/to/mountpoint
```

Add `-L` to umount even if there are processes using that disk

[Reference tutorial](https://thelinuxcast.org/posts/2025/howtomountdrives/ 'How to Mount and Unmount Drives on Linux - The Linux Cast')

## Security hardening

Best practices to limit the vulnerability and the attack surface of a Linux device.

- [Changing SSH port](#Changing%20SSH%20port)
- [Linux firewall](Linux%20firewall.md)

## Do not use `/dev/sd*`

Unless temporary, it is best not to use `/dev/sd*` labels to mount or do operations with hard disks.

As [@bob_zim@infosec.exchange](https://infosec.exchange/@bob_zim/116823137199530664) pointed out^[https://infosec.exchange/@bob_zim/116823137199530664]:

> **/dev/sd_ identifiers aren’t stable**. It’s possible a reboot or some other event triggered a fresh enumeration of the SATA links and your drives ended up in a different order.

I have discovered that in `/dev/disk/` there are different ways of identifying connected storage drives. The most stable one is `/dev/disk/by-id/`, and all the entries in there are symlinked with the `/dev/sd*` equivalent.

## Swap

How to add [Swap space](https://wiki.archlinux.org/title/Swap 'Swap – ArchWiki'):

```zsh
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```