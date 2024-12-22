---
date: 2021-11-16T09:35:47+01:00
updated: 2023-10-31T15:50:41+01:00
tags:
  - stale
  - geek/sysad
description: Notes about moving out of GitHub and setting up a self-hosted Forgejo instance.
image: https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/2022-11-27_Forgejo_by-David-Revoy.jpg/1280px-2022-11-27_Forgejo_by-David-Revoy.jpg
redirect_from:
  - /gitea/
  - /quit-github/
  - /forgejo/
created: 2021-12-15T01:18:14+01:00
---
<div class='red box'>
		<mark><strong>giTMI has been discontinued</strong></mark>. The reason is explained in <a href='https://tommi.space/v2' target='_blank' title='Rethinking tommi.space'>this post</a>.
</div>

The morning of <time datetime='2021-11-16T09:34:47+01:00'>Tuesday, November 16<sup>th</sup> at 9:35</time>, after reading a few toots suggesting that the [federation of Gitea](https://forgefriends.org 'ForgeFriends website') instances is not relegated to a Utopian future, [I impulsively decided to self-host my own git forge](https://mastodon.uno/@tommi/107286030559967130 'Tommi’s toot about self-hosting his own git forge').

If you just want to read about giTMI, please [jump to the Log](#Log 'Jump to the Log section').

## Why

Why should anyone consider moving out of the great-looking, appealing and feature-packed [GitHub](https://github.com), and deciding instead to switch to any of its less diffused alternatives, or even self-host one?

- First, **why not**? Self-hosting an instance is [a nice experiment](https://rusingh.com/github-codeberg-gitea-migrations '“GitHub to Codeberg to… Gitea?” on Ru Singh’s blog') to try, in my case to test skills, discover new things, and learn more about [practically working with open source](https://leanpub.com/contributetoopensource-therightway '“Contribute to opensource: the right way„ by Daniele Scasciafratte')
- [GitHub is centralized](https://fosstodon.org/@yarmo/107263376066057557 'Toot about GitHub centralization, on Fossdon'), meaning that either you have a GitHub account or you cannot open PRs, issues, etc.
- GitHub is becoming more and more a monopoly, specially since its [acquisition by Microsoft](https://en.wikipedia.org/wiki/GitHub#Acquisition_by_Microsoft '“Acquisition by Microsoft„ subsection of GitHub Wikipedia page')
- As far as I know, GitHub is made to host open source software but <u>its own source is not open</u>! This is paradoxical and comically absurd!
- This is not so relevant, but GitHub is written in [Ruby](https://www.ruby-lang.org 'Ruby’s official website'), while Gitea is written in [Go](https://golang.org/ 'Go’s official website'); this makes Gitea rely on a more modern, faster language and a newer framework.
- *If you have more arguments to suggest, please [comment below](#comments 'Go to comments'), I will be happy to add what you write to this list*

## Log

A schematic log of what I am doing, setting up and maintaining [giTMI]

1. <time datetime='2021-11-16T08:44:40+01:00'>2021.11.16, 8:44</time> [Finding out](https://mastodon.uno/@tommi/107285620570565058 'My toot after finding out that forgefriends is being funded and developed') that forges’ [federation is actually going to happen](https://social.gitea.io/@gitea/107006650861897944 'Gitea’s toot announcing the achievement of a first step towards federation')
2. <time datetime='2021-11-16T10:17:40+01:00'>2021.11.16, 10:17</time> Impulsively getting [gitmi.dev](https://gitmi.dev 'giTMI') domain
3. <time datetime='2021-11-16T10:25:40+01:00'>2021.11.16, 10:25</time> Installing [Gitea](https://gitea.com 'Gitea official website') on [Xplosion Server](Nebuchadnezzar.md)
4. Downloading and using [GitTouch](https://github.com/git-touch/git-touch 'git-touch on GitHub') as a mobile client
5. Solving [connection issues](https://forum.forgefriends.org/t/migrating-from-github-to-self-hosted-gitea/486/4 'Error reported on Forgefriends forum') via client CLI by editing the
6. <time datetime='2022-12-01T11:00:19+01:00'>Thursday 1 December 2022</time>: finally effectively configured everything
7. <time datetime='2023-09-27T19:05:06+02:00'>Wednesday September 27<sup>th</sup></time>: migrating to [Forgejo](https://forgejo.org 'Forgejo')
8. <time datetime='2023-10-31T14:28:19+01:00'>Tuesday 31 October 2023</time>: As part of my Rethinking tommi.space, ==**I am discontinuing giTMI**==. I am not happy to do this, but I have to be honest in sharing that I am relieved I have one less technical thing to worry about.

## Resources

A collection of inspiring and/or useful articles

- [A forum thread concerning my migration](https://forum.forgefriends.org/t/migrating-from-github-to-self-hosted-gitea/486 'Migrating from GitHub to self-hosted Gitea'), on [forgefriends](https://forgefriends.org 'forgefriends')’s forum
- [Migrating to Gitea](https://rusingh.com/github-codeberg-gitea-migrations '“GitHub to Codeberg to… Gitea?” on Ru Singh’s blog'), by [rusingh](https://rusingh.com 'Ru Singh’s personal website')

## config

The configuration file is in `/etc/yunohost/apps/forgejo/conf/app.ini`.
