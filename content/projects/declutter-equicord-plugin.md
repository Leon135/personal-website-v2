---
title: Declutter Equicord plugin
description: Equicord (Discord) plugin to declutter the user UI from all the garbage you don't want to see.
liveUrl: https://equicord.org/plugins/Declutter
liveUrlLabel: Equicord plugin page
githubUrl: https://github.com/Equicord/Equicord/blob/main/src/equicordplugins/declutter/index.tsx
technologies:
  - TypeScript
  - Equicord (Vencord)
  - Webpack
featured: false
status: active
---

## Description

Discord gets more and more cluttered with every update. Personally I feel like that this "chatting" app is trying to make itself as the next Fortnite or smth. Okay, I get it that users should be able to express themselves and personalize their profile, but to a certain extent. Also the more "premium" features are paid or "gatcha" based. Honestly I just want a clean modern UI that serves it's purpose - chatting app.

I knew about BetterDiscord and its successor Vencord. Vencord was a crazy find for me. All the plugins I need with settings as well as themes with themes. But as I am a curious person and developer I wanted to make something myself. Started reading about how it works the webpack patching. At first I didn't understand a single thing. Trying some random commands found in JS modules of repo, coz dev docummentation is not the best. Gave up after some time...

Recently I had enough of discord. Animated avatars, animated profile opening effect, animated nameplates, clan tags, username styles. That was just getting on my nerves. Wanted to get rid of it. Found plugin made by **@kyuuhachi** called "Anammox" that removed discord shop and quests. Used it as a base and started again experimenting with how Equicord - "Vencord extended" patches it. Fortunatelly I encountered some great souls **@prism**, **@murphy**, **@thororen** that helped me a LOT with understanding of how to find a ui element via react tools, find its module with complete mess of a code and then search for unique strings that are used to find the right function to match. After that making a patch was straight forward.

They proposed on combining my patches with plugin by **@prism** and **@kyuuhachi**. We named it "Declutter" and it basicly removes all the stuff you want with customizable options. It is combined work of them and me.

Look at the screenshots and compare it yourself!
Ignore the fact that screenshots came from OhnePixel server. My drilla 🤙
I have everything set to remove 😎!

## Features

- Remove animated avatars
- Remove animated profile opening effect
- Remove nameplates
- Remove clan tags
- Remove username styles
- Remove discord shop
- Remove quests

## Screenshots
<img src="/declutter-equicord-plugin/before.png" alt="Preview" width="300" height="400" />
<img src="/declutter-equicord-plugin/after.png" alt="Preview" width="300" height="400" />
<img src="/declutter-equicord-plugin/settings-1.png" alt="Settings page 1" width="400" height="400" />
<img src="/declutter-equicord-plugin/settings-2.png" alt="Settings page 2" width="400" height="400" />
<!-- ![Before](/declutter-equicord-plugin/before.png)
![After](/declutter-equicord-plugin/after.png)
![Settings page 1](/declutter-equicord-plugin/settings-1.png)
![Settings page 2](/declutter-equicord-plugin/settings-2.png) -->

## Built with

- [TypeScript](https://www.typescriptlang.org/)
- [Equicord](https://equicord.org/) - modded discord client
- Webpack - patching discord modules
