---
date: 2022-11-30T08:19:09+01:00
updated: 2022-12-02T01:27:53+01:00
location: home
tags:
  - wip
  - geek
  - meta
---
By migrating [[Xplosion Server]] to a slightly more performant machine, I ended up messing up some configurations, and I also realized that my website publishing workflow was not really independent and stable. Therefore, I decided it was time to self host tommi.space.

It has been pretty straightforward:

- anything that was hosted on Storj has been moved to the `assets` directory, placed into the tommi.space directory but added to the `.gitignore`, while being added as a passthrough folder in the Eleventy configuration. This would avoid bloating the git repository and at the same time preserve the assets locally
- in order to avoid having to re-upload to the server all of the content of the generated website, I wrote a very simple pair of scripts to deploy the updated website by pulling it from the source repository and building it on the server.