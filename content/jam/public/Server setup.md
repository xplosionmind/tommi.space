---
date: 2020-03-21T01:00:00+01:00
updated: 2023-02-07T20:32:45+01:00
redirect_from: [/server-configuration/,/nextcloud/]
tags: geek/server
description: A walktrough of the steps I executed to set up my server
aliases: Server configuration, VPS configuration
---
<div class='red box'>
	Everything in this page is not revised and out of date, since I am using <a href='https://yunohost.org' title='YunoHost'>YunoHost</a> to manage my server now. On <a href='https://server.tommi.space' title='Tommi’s server'>server.tommi.space</a> there is the public front-end of the administration panel.
</div>

<div class='box'>
	A <strong>huge shout-out</strong> to my friend <a href='http://claudiofaoro.com' title='Claudio’s personal website'>Claudio</a>, who helped me understand and perform the most tricky passages.
</div>

## General knowledge

Resources, apps, tutorials and several knowledge sources are mentioned in the [[Nebuchadnezzar]] page.

## Docker

Please refer to [[Docker]] to see how I re-deployed everything on my server through [Docker](https://docker.com 'Docker').

## Good practices

update [Ubuntu](https://ubuntu.com/server 'Ubuntu server website') (`-y` parameter is used to accept by default any question)

```bash
sudo apt update -y && sudo apt upgrade -y
```

remove debris

```bash
sudo apt autoremove -y && sudo apt autoclean -y
```

### Limited user

It is always better not to work and setup stuff straight from root user, it’s easy to mess everything up and very risky if you’re not 100% sure of what you’re doing (for me, most of the time).

add user

```bash
adduser tommi # “tommi”, in this case, is the username
```

grant that user sudo permissions

```bash
adduser -aG tommi sudo
```

### Firewall

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

first things firts:

```bash
sudo ufw allow 'Apache'
```

### SSH keys

create [SSH](https://en.wikipedia.org/wiki/SSH 'SSH on Wikipedia') folder to store allowed keys

```bash
ssh-keygen -t ed -a 100 -c 'tommi@tommi.space'
```

**on local client**:

```bash
ssh-copy-id tommi@100.100.010.1 -p 5002
```

Alternatively:

```bash
scp -P 5002 ~/.ssh/id_rsa.pub tommi@100.100.010.1:~/.ssh/authorized_keys
```

Substitute `100.100.010.1` with the server’s IP address, `tommi` with the wanted username, and `5002` with your port

#### More information

- [SSH keys explained](https://dev.to/rmoff/ssh-keys-explained-2e2l 'SSH keys explained'), a comprehensive yet simple guide to understand how SSH keys management should be done
- [Linode’s tutorial](https://www.linode.com/docs/guides/use-public-key-authentication-with-ssh/ 'Use SSH Public Key Authentication on Linux, macOS, and Windows - Linode') on the topic

### SSH port

<div class='box yellow'>
	Changing the default SSH port is useful to prevent randomized attacks which attempt to get access to the server from <a href='https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers' target='_blank'>port 22</a>, the default one.
</div>

Enable the new SSH port from the firewall. In this case, the process I will be following configures port `5522`

```bash
sudo ufw allow 5522/tcp
```

Open the SSH configuration file `/etc/ssh/sshd_config`

```bash
sudo vim /etc/ssh/sshd_config
```

In this file, replace `#Port 22` with `Port 5522`

after this, disable connections from port 22

```bash
sudo ufw deny 22
```

restart ssh

```bash
sudo systemctl restart ssh
```

### Disable root access

```bash
PermitRootLoogin no # was: yes
```

### Install git

install [git](https://git-scm.com/ 'git official website')

```bash
apt install git
```

### Install zsh

install [zsh](https://www.zsh.org/ 'zsh.org')

```bash
apt install zsh
```

set zsh as default shell

```bash
chsh -s /usr/bin/zsh root
```

install zsh syntax highlighting

```bash
apt install zsh-syntax-highlighting
```

install [oh-my-zsh](https://ohmyz.sh/ 'ohmyz.sh')

```bash
sh -c '$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)'
```

enable zsh syntax highlighting

```bash
echo 'source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >> ~/.zshrc
```

## Nextcloud

Nextcloud installation, configuration and troubleshooting.

### Resources

- [official installation documentation](https://docs.nextcloud.com/server/18/admin_manual/installation/source_installation.html)
- complete [installation tutorial](https://youtu.be/QB_FEWJ9BB4) for Ubuntu 20.04, in dutch
- [in-depth guide](https://youtu.be/QXfsi0pwgYw) for Nextcloud 15
- check vulnerabilities with [Nextcloud Scan](https://scan.nextcloud.com 'Nextcloud Scan')

### Permissions

Firstly, it’s necessary to create the folder where Nextcloud interface, thus public application files, will be stored.

In this case, I configured a directory which is named exactly as the domain where the content it’s hosting will be found, for simplicity.

```bash
sudo mkdir /var/www/cloud.tommi.space
```

then, permissions can be changed, such that Nextcloud itself can handle this data, once installed. As you can see, these permissions must be set `-R` recursively.

```bash
sudo chown -R $USER:$USER /var/www/cloud.tommi.space
sudo chmod -R 755 /var/www/cloud.tommi.space
```

make the (private) directory where all of Nextcloud data will be stored, and change its permissions, too

```bash
mkdir /home/tommi/nextcloud-data
sudo chown -R www-data:www-data /home/tommi/nextcloud-data/
```

### Apache

This is the essential content of an Apache configuration fil for nextcloud. It should be placed in `/etc/apache2/sites-available/`

create the configuration file by running

```bash
sudo vim /etc/apache2/sites-available/cloud.tommi.space.conf
```

then, add this content:

```apacheconf
<VirtualHost *:80>
	ServerAdmin tommiboom@protonmail.com
	ServerName cloud.tommi.space
	ServerAlias www.cloud.tommi.space
	DocumentRoot /var/www/cloud.tommi.space/public_html

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

### Install MariaDB

```bash
sudo apt install mariadb-server
```

Basic database configuration

```
sudo mysql_secure_installation
```

log into MariaDB

```
sudo mariadb
```

Create a new database for Nextcloud (in MariaDB):

```sql
mysql> CREATE DATABASE nextcloud;
```

Create a new Nextcloud user

```sql
mysql> GRANT ALL ON nextcloud.* TO 'user_name'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;
mysql> FLUSH PRIVILEGES;
```

### Install PHP

Install [PHP](https://php.net) modules

```bash
sudo apt install php libapache2-mod-php php-mysql
```

install Nextcloud dependencies

```bash
sudo apt install php-curl php-dom php-gd php-json php-xml php-mbstring php-zip
```

adjust `PHP.ini`

```bash
sudo vim /etc/php/7.4/apache2/php.ini
```

edits:

```php
memory_limit = 1024M # based on how much RAM the server has
upload_max_filesize = 16G # max size of uploaded files
post_max_size = 16G # something similar to the above
date.timezone = Europe/Rome # or your timezone
```

### Install Nextcloud

download Nextcloud and place it in the virtual host directory

```bash
sudo cd /var/www/cloud.tommi.space/public_html && sudo wget https://download.nextcloud.com/server/releases/nextcloud-18.0.4.zip
```

extract the downloaded package

```bash
unzip nextcloud-18.0.4.zip
```

### Install Let’s Encrypt

[<span id='certbot'>Certbot</span>](https://certbot.eff.org 'Certbot by EFF') will be use to establish a secure connection to the instance. To make things simple, it’s the one which makes an unencrypted `http://` connection magically become an encrypted `https://` connection

```bash
sudo apt install certbot python3-certbot-apache
```

Enable port `443` instead of port `80`

```bash
sudo ufw allow 'Apache Full'
sudo ufw delete allow 'Apache'
```

Generate TLS certificate

```bash
sudo certbot --apache -d cloud.tommi.space -d www.cloud.tommi.space
```

Enable HTTP/2, and rewrite module

```bash
sudo apt install php7.4-fpm
sudo a2enmod proxy_fcgi
sudo a2enconf php7.4-fpm
sudo a2dismod php7.4
sudo a2dismod mpm_prefork
sudo a2enmod mpm_event
sudo service apache2 restart
sudo a2enmod http2
sudo service apache2 restart
```

### Enable HSTS

In `cloud.tommi.space-le-ssl.conf` add

```apacheconf
<IfModule mod_headers.c>
      Header always set Strict-Transport-Security 'max-age=15552000; includeSubDomains'
</IfModule>
```

to enable what has just been inserted, headers must be enabled

```bash
sudo a2enmod headers
```

then, enable `.htaccess`

```bash
sudo vim /etc/apache2/sites-available/cloud.tommi.space/cloud.tommi.space-le-ssl.conf
```

paste in `<VirtualHost *:443>`

```apacheconf
<Directory '/var/www/cloud.tommi.space/public_html'>
	Options Indexes FollowSymLinks
	AllowOverride All
	Require all granted
</Directory>
```

restart Apache

```bash
systemctl restart apache2
```

### Domain linking

- point the chosen domain and subdomain to the server IP address
- wait for the domain to propagate (it could take up to 48 hours)
- go to `cloud.example.com`, where you should get this page:

<figure>{% img 'https://www.itzgeek.com/wp-content/uploads/2019/06/Install-Nextcloud-on-RHEL-8-%E2%80%93-Setup-Nextcloud.jpg', 'Nextcloud first setup page' %}<figcaption>Nextcloud first setup page</figcaption></figure>

<div class='yelow box'>
	<u><strong>Do not</strong> insert any data</u> in the dialogue page above until connection is encrypted with <code>https://</code>. To obtain a SSL Certificate, thus an encrypted connection, follow the next step.
</div>

### Final adjustments

Final adjustments are to be performed from the Nextcloud GUI.  
There are a lot of very useful [Nextcloud apps](https://apps.nextcloud.com/ 'Nextcloud apps store') which are trivial to install.

### fixes

- fix [this](https://github.com/nextcloud/server/issues/8546#issuecomment-514139714 'An issue on Nextcloud repository on GitHub') encryption error

## Nextcloud Cheat Sheet

### Using OCC

```
sudo -u nextcloud php8.0 --define apc.enable_cli=1 /var/www/nextcloud/occ
```

### Manually install applications

move to the Nextcloud apps folder

```bash
cd /var/www/nextcloud/apps
```

download the application package from [Nextcloud apps website](https://apps.nextcloud.com/ 'Nextcloud Apps')

```bash
wget https://github.com/nextcloud/documentserver_community/releases/download/v0.1.5/documentserver_community.tar.gz # url to the package
```

extract it (by substituting `package_name` with the name of the app package)

```bash
tar -xvzf package_name.tar.gz
```

remove compressed package

```bash
rm -rf package_name.tar.gz
```

change permissions for the app’s directory

```bash
chown -R www-data:www-data /var/www/nextcloud/apps/app_name
chmod -R 755 /var/www/nextcloud/apps/app-name
```

### Maintenance mode

Toggle maintenance mode

```bash
sudo -u nextcloud php8.0 --define apc.enable_cli=1 /var/www/nextcloud/occ --on # or --off
```

### Dockerized commands

Using the `occ` command in a dockerized instance

```bash
docker-compose exec --user www-data app php occ
```

More information on the [Nextcloud Docker Hub page](https://hub.docker.com/_/nextcloud 'Nextcloud - Docker Hub')

## Jitsi Meet

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

---

## OpenVPN

To install [OpenVPN](https://openvpn.com 'OpenVPN'), I followed exactly this super simple and quick [guide](https://dev.to/phiilu/host-your-own-openvpn-server-in-a-few-seconds-73l 'Host Your own OpenVPN Server in a few seconds - DEV'). It actualy took me 15 minutes to make everything work perfectly, and it still does after several months.

### Installation

I chose to deploy [RSS-Bridge](https://github.com/RSS-Bridge/rss-bridge 'RSS-Bridge repository on GitHub') through Docker. The process is not thoroughly and simply explained for a dumb newbie like me, nevertheless I somehow figured out how to deploy the app.

My version of [the default Docker build](https://github.com/RSS-Bridge/rss-bridge/wiki/Docker 'RSS-Bridge Docker setup'):

```bash
sudo docker create \
--name=rss-bridge \
--volume /home/tommi/whitelist.txt:/app/whitelist.txt \
--publish 3001:80 \
rssbridge/rss-bridge:latest
```

My `whitelist.txt` file:

```
*
```

### Customization

What’s the real issue, to my surprise, wasn't get RSS-Bridge up and running as much as <u>making it actually work</u>.

Below I collected some articles useful to sort thing out.

- [Reconnecting the Web with RSS-Bridge](https://webworxshop.com/reconnecting-the-web-with-rss-bridge/ 'Reconnecting the Web with RSS-Bridge')
- [RSS Bridge and Huginn: Feeds for everything](https://dev.to/mskog/rss-bridge-and-huginn-feeds-for-everything-4ec9 'RSS Bridge and Huginn: Feeds for everything - DEV.to')
