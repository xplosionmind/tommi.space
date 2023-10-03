---
date: 2021-11-16T09:35:47+01:00
updated: 2023-09-27T19:09:11+02:00
redirect_from:
  - /gitea/
  - /quit-github/
  - /forgejo/
tags:
  - geek/server
image: https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/2022-11-27_Forgejo_by-David-Revoy.jpg/1280px-2022-11-27_Forgejo_by-David-Revoy.jpg
description: |
  Notes about moving out of [GitHub](https://github.com/xplosionmind 'my GitHub profile') and setting up a self-hosted [Forgejo](https://forgejo.org 'Forgejo official website') instance.
created: 2021-12-15T01:18:14+01:00
---
The morning of <time datetime='2021-11-16T09:34:47+01:00'>Tuesday, November 16<sup>th</sup> at 9:35</time>, after reading a few toots suggesting that the federation of [Gitea](https://gitea.com 'Gitea official website') instances is not relegated to a Utopian future, I decided to finally [self-host my own git forge](https://mastodon.uno/@tommi/10728603055996713 'Toot about self-hosting Gitea').

If you just want to read about [GiTMI][gitmi], please [jump to the Log](#Log 'Jump to the Log section').

## Why

Why should anyone consider moving out of the great-looking, appealing and feature-packed [GitHub](https://github.com), and deciding instead to switch to any of its less diffused alternatives, or even self-host one?

- First, **why not**? Self-hosting an instance is [a nice experiment][rusingh-migration] to try, in my case to test skills, discover new things, and learn more about [practically working with open source][mte90-contribute-to-opensource]
- [GitHub is centralized](https://fosstodon.org/@yarmo/107263376066057557 'Toot about GitHub centralization, on Fossdon'), meaning that either you have a GitHub account or you cannot open PRs, issues, etc.
- GitHub is becoming more and more [a monopoly](), specially since its [acquisition by Microsoft](https://en.wikipedia.org/wiki/GitHub#Acquisition_by_Microsoft '“Acquisition by Microsoft„ subsection of GitHub Wikipedia page')
- As far as I know, GitHub is made to host open source software but <u>its own source is not open</u>! This is paradoxical and comically absurd!
- This is not so relevant, but GitHub is written in [Ruby](https://www.ruby-lang.org 'Ruby’s official website'), while Gitea is written in [Go](https://golang.org/ 'Go’s official website'); this makes Gitea rely on a more modern, faster (arguably the fastest) language and a newer framework.
- *If you have more arguments to suggest, please [comment below](#comments 'Go to comments'), I will be happy to add what you write to this list*

## Log

<div class='yellow box' id='roadmap'>
	Follow <a href='https://gitmi.dev/tommi/gitmi/projects/1' title='GiTMI maintenance roadmap'>the main roadmap project</a> directly on GiTMI
</div>

A schematic log of what I am doing, setting up and maintaining [giTMI]

1. <time datetime='2021-11-16T08:44:40+01:00'>2021.11.16, 8:44</time> [Finding out](https://mastodon.uno/@tommi/107285620570565058 'My toot after finding out that Fedeproxy is being funded and developed') that forges’ [federation is actually going to happen](https://social.gitea.io/@gitea/107006650861897944 'Gitea’s toot announcing the achievement of a first step towards federation')
2. <time datetime='2021-11-16T10:17:40+01:00'>2021.11.16, 10:17</time> Impulsively getting [gitmi.dev](https://gitmi.dev 'GiTMI') domain
3. <time datetime='2021-11-16T10:25:40+01:00'>2021.11.16, 10:25</time> Installing [Gitea] on [[Server|Xplosion Server]]
4. Downloading and using [GitTouch] as a mobile client
5. Solving [connection issues](https://forum.forgefriends.org/t/migrating-from-github-to-self-hosted-gitea/486/4 'Error reported on Forgefriends forum') via client CLI by editing the
6. <time datetime='2022-12-01T11:00:19+01:00'>Thursday 1 December 2022</time>: finally effectively configured everything
7. <time datetime='2023-09-27T19:05:06+02:00'>Wednesday September 27<sup>th</sup></time>: migrating to [Forgejo]

## Resources

A collection of inspiring and/or useful articles

- [A forum thread concerning my migration](https://forum.fedeproxy.eu/t/migrating-from-github-to-self-hosted-gitea 'Migrating from GitHub to self-hosted Gitea'), on [fedeproxy]’s forum
- [Migrating to Gitea][rusingh-migration], by [rusingh]

## config

I collect all the customizations I apply to GiTMI [in this repository](https://gitmi.dev/tommi/gitmi 'giTMI customizations repository on GiTMI').

[fedeproxy]: https://fedeproxy.eu 'fedeproxy official website'
[giTMI]: https://gitmi.dev 'GiTMI homepage'
[Gitea]: https://gitea.com 'Gitea official website'
[rusingh-migration]: https://rusingh.com/github-codeberg-gitea-migrations '“GitHub to Codeberg to… Gitea?„ on Ru Singh’s blog'
[rusingh]: https://rusingh.com 'Ru Singh’s personal website'
[mte90-contribute-to-opensource]: https://leanpub.com/contributetoopensource-therightway '“Contribute to opensource: the right way„ by Daniele Scasciafratte'
[GitTouch]: https://github.com/git-touch/git-touch 'git-touch on GitHub'
[Forgejo]: https://forgejo.org 'Forgejo'
