---
date: 2020-03-21T01:00:00+01:00
tags: [outdated, geek/sysad, draft/revise]
permalink: /nextcloud/
description: This is a reference for installing Nextcloud with from scratch with PHP, MariaDB, and Apache on an Ubuntu server, without using any containers. Please note that **this guide is outdated**, and it is still published for archival purposes.
---
{{ description }}
<div class='blue box'>
	<p>Please refer to my <a href='Self-hosting%20logs.md' class=internal-link>self-hosting logs</a> for more context, and links to the updated practices I am following now.</p>
</div>

## Resources

- [official installation documentation](https://docs.nextcloud.com/server/18/admin_manual/installation/source_installation.html)
- complete [installation tutorial](https://youtube-nocookie.com/embed/QB_FEWJ9BB4) for Ubuntu 20.04, in dutch
- [in-depth guide](https://youtube-nocookie.com/embed/QXfsi0pwgYw) for Nextcloud 15
- check vulnerabilities with [Nextcloud Scan](https://scan.nextcloud.com 'Nextcloud Scan')

## Permissions

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

## Apache

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

## Install MariaDB

```bash
sudo apt install mariadb-server
```

Basic database configuration

```bash
sudo mysql_secure_installation
```

log into MariaDB

```bash
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

## Install PHP

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

## Install Nextcloud

download Nextcloud and place it in the virtual host directory

```bash
sudo cd /var/www/cloud.tommi.space/public_html && sudo wget https://download.nextcloud.com/server/releases/nextcloud-18.0.4.zip
```

extract the downloaded package

```bash
unzip nextcloud-18.0.4.zip
```

## Install Let’s Encrypt

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

## Enable HSTS

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

## Domain linking

- point the chosen domain and subdomain to the server IP address
- wait for the domain to propagate (it could take up to 48 hours)
- go to `cloud.example.com`

<div class='yelow box'>
	<u><strong>Do not</strong> insert any data</u> in the dialogue page above until connection is encrypted with <code>https://</code>. To obtain a SSL Certificate, thus an encrypted connection, follow the next step.
</div>

## Final adjustments

Final adjustments are to be performed from the Nextcloud GUI.
There are a lot of very useful [Nextcloud apps](https://apps.nextcloud.com/ 'Nextcloud apps store') which are trivial to install.

## fixes

- fix [this](https://github.com/nextcloud/server/issues/8546#issuecomment-514139714 'An issue on Nextcloud repository on GitHub') encryption error

## Cheat Sheet

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
