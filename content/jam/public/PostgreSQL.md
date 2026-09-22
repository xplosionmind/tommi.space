---
date: 2026-08-13T13:00:00+02:00
aliases: [Postgres, Databases]
tags: [geek/sysad]
redirect_from: [/databases/]
description: Cheatsheet and notes for database management.
---
Collecting notes on databases management, mainly Postgres.

## Change password

<div class='blue box'>

It could be that connecting from localhost does not require a password. In that case, you have to replace `trust` with `scram-sha-256` in `/var/lib/postgresql/data/pg_hba.conf` and either restart the service or run `SELECT pg_reload_conf();` to apply the changes.

</div>

```sql
ALTER USER username WITH PASSWORD 'newpasswordhereeeeee'
```

## Run inside a container

```zsh
podman exec -it containername psql -d "postgresql://username@localhost/maybesomething" -c "COMMAND"
```

or 

```zsh
podman exec -it spliit-db bash -lc '
	psql \
	"host=127.0.0.1 port=5432 user=username dbname=databasename" \
	-c "COMMAND"
'
```