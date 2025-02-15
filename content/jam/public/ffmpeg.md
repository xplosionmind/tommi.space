---
date: 2021-04-27T08:21:53+02:00
updated: 2022-11-28T10:44:01+01:00
tags:
  - geek/apps
description: Swiss army knife for video and audio editing from command line.
---
## Cheat sheet

Change format and bitrate of an audio file

```bash
ffmpeg -i ~/in.m4a -ab 128k out.mp3
```

Add a background to a transparent PNG, add an audio file and put all of them in a video.

```bash
ffmpeg -i background.png -stream_loop 50 -i animation.png -filter_complex overlay -i voiceover.m4a -c:v libx264 -c:a copy out.mp4
```

Scale video or image by keeping the aspect ratio and choosing the width.

```bash
ffmpeg -i ~/desktop/in.mov -vf scale=720:-1 ~/desktop/out.mp4

# multiple files at a time
for img in ~/desktop/pics/*.jpg; do ffmpeg -i '$img' -vf scale=1600:-1 '$img'; done;
```

both scaling and cropping a video

```bash
ffmpeg -i ~/desktop/in.mov -vf 'scale=720:-1,crop=720:720:0:300' ~/desktop/out.mp4
```

improve encoding of a video using H.265

```bash
ffmpeg -i ~/desktop/in4k.mp4 -c:v libx265 -vf scale=1080:-1 ~/desktop/out1080x265.mov
```

Creating an animated GIF from images

```bash
ffmpeg -framerate 4 -pattern_type glob -i '*.png' quotes.gif
```

### Flags

```bash
-y	# overwrite output flags
```

### Cheat sheets

- [Devhints cheatsheet](https://devhints.io/ffmpeg 'FFMPEG - Devhints')
- [FFmpeg cheat sheet - GitHub Gist](https://gist.github.com/steven2358/ba153c642fe2bb1e47485962df07c730 'FFmpeg cheat sheet - GitHub Gist')

## Resources

- [FFMPEG examples](https://dev.to/sleeplessbyte/ffmpeg-examples-51l7) by [Derk-Jan Karrenbeld](https://derk-jan.com 'Derk-Jan Karrenbeld') on [DEV](https://dev.to 'DEV')
- [Using Command Line To Cut Out Media Files](https://dev.to/nabbisen/ffmpeg-using-command-line-to-cut-out-video-files-1o3a 'ffmpeg: Using Command Line To Cut Out Media Files')
- [Automated video editing](https://dev.to/dak425/cut-up-video-and-audio-with-just-ffmpeg-4l4m 'Cut up video and audio with just ffmpeg!')
