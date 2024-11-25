---
date: 2020-07-03T02:00:00+02:00
updated: 2022-10-14T10:53:59+02:00
tags: geek/apps
description: 'I consider myself a Firefox power user: I love it and I try to take full advantage of its features. Here’s how I do it.'
toc: true
todo:
  - general update
  - check `about:config` settings
---
## Add-ons and Extensions

Three different add-ons configurations can be found in my [Firefox Collections](https://addons.mozilla.org/en-US/firefox/collections/13538650 'Tommi’s Firefox Collections'):

- [minimal](https://addons.mozilla.org/en-US/firefox/collections/13538650/minimal/ '“minimal” extensions collection') configuration: must-have add-ons for a safe and optimized browsing experience
- [main](https://addons.mozilla.org/en-US/firefox/collections/13538650/main/ '“main” extensions collection') configuration: the main extensions I use + integrated tools to take advantage of the services I use in the best way possible.
- [extra](https://addons.mozilla.org/en-US/firefox/collections/13538650/extra/ '“extra” extensions collection - Firefox AddOns') configuration, extra add-ons to enjoy all the bells and whistles extensions can offer

## Missing

Even though Firefox is my go-to browser and I absolutely love it, it lacks some features which I really miss. I keep track of them below:

- Easy and quick site-specific tracking, fingerprinting and cookies settings (Like in [[Brave]])

## Monoline

I created the custom theme [Firefox Monoline](https://codeberg.org/tommi/firefox-monoline 'firefox-monoline source code on Codeberg').

## about:config

A record of all the tweaks I made in Firefox `about:config` page

- [ ] `privacy.resistFingerprinting` = `true` - A result of the Tor Uplift effort, this preference makes Firefox more resistant to browser fingerprinting. This setting is disabled because it strongly limits usability (the main thing that concerns me is auto system theme detection, which I use a lot).
- [ ] `privacy.resistFingerprinting.letterboxing` = `true` so letterboxing is used to hide real browser size.
- [x] `privacy.trackingprotection.enabled` = `true` - This is Mozilla's new built-in tracking protection. One of it’s benefits is blocking tracking (i.e. Google Analytics) on privileged pages where add-ons that usually do that are disabled.
- [ ] `dom.event.clipboardevents.enabled` = `false` - Disable that websites can get notifications if you copy, paste, or cut something from a web page, and it lets them know which part of the page had been selected.
- [ ] `media.eme.enabled` = `false` - Disables playback of DRM-controlled HTML5 content, which, if enabled, automatically downloads the Widevine Content Decryption Module provided by Google Inc. Details
	- [ ] `media.gmp-widevinecdm.enabled` = `false` - Disables the Widevine Content Decryption Module provided by Google Inc., used for the playback of DRM-controlled HTML5 content.
- [ ] `media.navigator.enabled` = `false` - Websites can track the microphone and camera status of your device.
- [ ] `privacy.firstparty.isolate` = `true` - or preventing domains from accessing each other’s data. If something breaks, it is most likely related to this.
- [x] `extensions.pocket.enabled` - `false` - make Pocket integration go away
- [x] `network.http.referer.XOriginPolicy` = `1` - Only send Referer header when the full hostnames match. (Note: if you notice significant breakage, you might try 1 combined with an XOriginTrimmingPolicy tweak below.) [Source](https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/)
	- `0` = Send Referer in all cases
	- `1` = Send Referer to same eTLD sites
	- `2` = Send Referer only when the full hostnames match
- [x] `network.http.referer.XOriginTrimmingPolicy` = `2` - When sending Referer across origins, only send scheme, host, and port in the Referer header of cross-origin requests. [Source](https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/)
	- `0` = Send full url in Referer
	- `1` = Send url without query string in Referer
	- `2` = Only send scheme, host, and port in Referer
- [x] `beacon.enabled` = `false` - Disables sending additional analytics to web servers.
- [x] `browser.safebrowsing.downloads.remote.enabled` = `false` - Prevents Firefox from sending information about downloaded executable files to Google Safe Browsing to determine whether it should be blocked for safety reasons. [Details](https://support.mozilla.org/en-US/kb/how-does-phishing-and-malware-protection-work#w_what-information-is-sent-to-mozilla-or-its-partners-when-phishing-and-malware-protection-are-enabled)
- [x] `network.IDN_show_punycode` = `true` - Not rendering IDNs as their Punycode equivalent leaves you open to phishing attacks that can be very difficult to notice. [Source](https://krebsonsecurity.com/2018/03/look-alike-domains-and-visual-confusion/#more-42636)
- [ ] `media.peerconnection.enabled` = `false` - While software like NoScript prevents this, it’s probably a good idea to block this protocol directly as well, just to be safe. Note: This <u>disables browser-based call functionality that is used for webapps</u>
- [x] `services.sync.prefs.sync.privacy.trackingprotection.enabled` = `true`
- [x] `dom.gamepad.extensions.lightindicator` = `true` - seems like a cool thing to do
- [x] `dom.gamepad.extensions.multitouch` = `true` - seems like another cool thing to do
- [x] `extensions.experiments.enabled` = `true` - seems like another cool thing to do

## Resources

- [Mikaela Suomalainen](https://mikaela.info/browser-extensions.html "Browser extensions on mikaela.info")

