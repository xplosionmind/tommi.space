---
date: 2020-03-21T01:00:00+01:00
tags:
  - outdated
  - geek/sysad
description: This is a reference for installing Jitsi Meet from scratch on an Ubuntu server with no containers. Please note that **this guide is outdated**, and it is still published for archival purposes.
---
{{ description }}

<div class='blue box'>
	Please refer to my <a href='Self-hosting%20logs.md' class=internal-link>self-hosting logs</a> for more context, and links to the updated practices I am following now.
</div>

[installation guide](https://www.vultr.com/docs/install-jitsi-meet-on-ubuntu-20-04-lts 'Jitsi Meet installation guide - Vultr')

allow firewall for ports 100000 to 200000

```bash
sudo ufw allow in 10000:20000/udp
```

Jitsi requires the Java Runtime Environment. Install OpenJDK JRE 8.

<div class='red box'>
	<strong>NOTE</strong>: as of right now, Jitsi Meet needs JRE 8, and <u><strong>not a newer version</strong></u>!
</div>

```bash
sudo apt install -y openjdk-8-jre-headless
```

check if installation went the right way and if the right version is installed

```bash
java -version
```

setup Java Runtime

```bash
sudo echo 'JAVA_HOME=$(readlink -f /usr/bin/java | sed 's:bin/java::')' | sudo tee -a /etc/profile
sudo source /etc/profile
```

download Jitsi Meet and add it to `apt` downloadable list

```bash
wget -qO - https://download.jitsi.org/jitsi-key.gpg.key | sudo apt-key add -
echo 'deb https://download.jitsi.org stable/'  | sudo tee -a /etc/apt/sources.list.d/jitsi-stable.list
```

install Jitsi Meet

```bash
sudo apt install -y jitsi-meet
```

run and enable Certbot

```bash
sudo sed -i 's/\.\/certbot-auto/certbot/g' /usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh
sudo ln -s /usr/bin/certbot /usr/sbin/certbot
sudo /usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh
```

<div class='yellow box'>
	If something around here doesn’t work, no worries: just repeat the command, it should get fixed by itself
</div>

last tweaks should be done in here

```bash
sudo vim /etc/apache2/conf-enabled/security.conf
```

There are a few very nice things, such as hiding the “Jitsi” watermark from calls, which can be improved by editing Jitsi’s css file. Here’s [a customizations guide](https://technologyrss.com/how-to-customize-jitsi-meet-video-conference-server/).
