---
title: "Dot Files"
description: "I think I have finally solved dotfiles"
pubDate: "July 31, 2025"
# updatedDate: ""
tags: ["dotfiles","linux","macos", "nerd", "organization", "custom", "software"]
draft: false
---

For many years I was devout to Linux and as I settled into the inevitable Arch/Hyprland setup, I started to build out a solid set of dotfiles. I was still pretty fresh to writing bash scripts, but I somehow managed to build an install script that would take a fresh Arch install, install all the packages I used, and copy over my entire .config directory. It worked pretty well, though some of the packages would fail to install, so I'd have to go in and remove the ones that fail and re-run it. And then something else would interrupt it so I'd have to go in and fix this and that... It became a tedious process. Furthermore, the packages I used would evolve rapidly, so when I had the thought to update my install script, I had to tediously go through the packages I had included, probably delete some that I don't use anymore, and add ones that I had recently installed. It was work. I don't have time for that. So it was largely abandoned.

Then something terrible happened. I grew envious of Apple silicon. I had to have that battery life and speed. But that meant dealing with MacOS. I had never used MacOS before. So I was dipping into unfamiliar territory. I was pleasantly surprised that with Homebrew, MacOS can feel pretty natural for someone coming from Linux. There are a few core UX/UI designs in the OS that I will never understand, but its all bearable. The shift in the keyboard layout was more painful than I expected and it is mostly do to the horrible ergonomics of the <kbd>cmd</kbd>+<kdb>c</kdb> and <kbd>cmd</kbd>+<kdb>v</kdb>. And using the right <kdb>cmd</kdb> does not help.

I'm getting off track. The point is, I was able to tailor my system to my needs and many packages I use on MacOS are also used on Linux. And since I still love Linux, and even though my primary device is running MacOS, I still want to have a Linux system and I want my dotfiles to be manageable. On both systems.

## The Problem

So here lies the problem. Two different systems. To sets of dotfiles. A lot of overlap. How do I keep these in sync without polluting my .config directory with a bunch of noise that either system will never use? Sure it won't hurt anything to have a few extra files kicking around, but it doesn't look good. And that's important. Plus, what about the packages that do run on both systems that need a *slightly* different config.

Dotfile management is an age old niche problem, and many people have found solutions that work for them. So what is already available?

### Home Manager

You can't write an article about dotfiles without mentioning NixOS's Home Manager. Home Manager is a composable (as everything Nix is) configuration management system. You essentially code the structure of your config files, and it is produced when called. That is great, but I am not going to use Nix, so this is out. But I do like the composability (foreshadowing).

### GNU Stow

A classic solution is to arrange your config files in a folder with the structure that you want to apply to your system, use stow, and each path is symlinked to your home directory as it is in the config directory. You can then just make that directory a repository, and make sure it stays synced with your upstream and you are golden.

This is fantastic if you know you will always want to deploy to a similar system with the exact same configuration. But I need more control.

### Just Git

Another popular solution, probably the default solution, just use git. Make your .config folder a repository and keep it synced. Simple and elegant. But what about the rc files that live directly in the home directory? Fine you can make your own symlinks pretty quick if you want to manage that.

But this would still involve a ton of manual intervention for my use case where I want to keep two completely different systems in sync.

## The Solution

So what does every half decent software developer do when there is a tiny annoyance that they think would be fun to solve? I'll build it myself!

At first I thought I'd just build a wrapper for GNU Stow. I could write a config file that directs Stow to handle the files exactly as I want. Maybe I lack a thorough understanding of Stow, but it was just not behaving the way I wanted it to. I wanted to have a directory in my .dotfiles directory, tell the program what system I wanted to deploy it to, and have it symlink that entire directory to the .config directory on the system. Pretty straight forward. So I dropped stow and just handled the symlinks myself.

So that's pretty simple, but I wanted more. I wanted the program to handle the repository as well. So I integrated git and Github so that with one command, changes are gracefully synced between the upstream and local. Beautiful.

I'm not done yet though. Initial setup would be a drag, so why not have a command the scours your .config and builds your configuration file for you? Done.

But wait there's more! I almost forgot about the packages that need slightly different configurations per system. Alright, let's use templates with if conditions for different systems.

Legendary.

---

As far as I can tell, no one has made a solution like this to manage dotfiles, so I think this is actually pretty special. Please check out the [repo here](https://github.com/logno-dev/dotctl).

## Next

With my last install of Arch, I used the install script [Omarchy](https://omarchy.org/) by the world famous DHH. It is fantastic, but as it states, it is very opinionated. So I made a ton of changes immediately after install. I think my next endeavor will be to fork that and tailor it to my needs to work in conjunction with dotctl.
