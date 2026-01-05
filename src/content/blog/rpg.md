---
title: "Making an RPG"
description: "I wanted to make an RPG, and I used AI to help me"
pubDate: "December 3, 2025"
# updatedDate: "February 2, 2025"
tags: ["AI","RPG"]
draft: true
pinned: false
---

I wanted to make a fantasy RPG, but I'm not one for coming up with names of mobs, lore, maps, etc. I was more interested in learning how an RPG tracks and stores data. How stats interact, and how combat is processed. How mobs, abilities, and calculations scale through all aspects of gameplay. I wanted to explore those aspects without having to do the brute work of creating countless mobs, areas, quests, abilities.

This is where AI can be really helpful. Orchestrating a machine to generate content in large swaths allows me to focus on the structure of the game and the users experience. This game is entirely text base, so I did not have AI generate any art for me, and if I add art down the line, I'll make it myself. 

This game runs in the browser, built on SolidStart and uses Turso for the database. I use Claude for my AI agent in Opencode. I know there are millions of opinions about coding with AI from sources much more credible than myself, but I am going to put my opinion out there regardless.

## Using the Machine

The classic arguments for and against coding with AI (which I refuse to call "vibe coding") usually focus around speed or productivity. The stronger arguments, in my opinion, should focus on quality. At this point, it is hard to dispute that when it comes to producing raw functional output, AI works. The speed at which I can iterate and prototype way faster than I would ever be able to on my own. And I think that would apply to even most senior developers. Though if I just started to learn how to code a few month's ago, I don't think I would be nearly as effective as I am wielding the agents.

### Effective Orchestration

Had I dropped the agent in an empty directory and asked it to build the app (one-shot it), I likely would have gotten a Next.js app with an SQLite database. Not a bad combo. But then say I want to deploy it, and all I've learned so far is HTML, CSS and a bit of Javascript. I guess I'd ask Claude how to deploy it. AFter some back and forth with Claude, it turns out SQLite and Turso is the best way to go for my database. Not the end of the world, but it went through all the trouble of setting up a local PostgreSQL server on my machine, only to have to abandon that and refactor everything to play nice with Turso. Claude will walk me through deploying on Vercel, and after copying and pasting build errors from Vercel, I might actual get something up and running.

But what if I could just tell it exactly what technologies I want to use, and why. I know how to deploy them, and I know their strengths and weaknesses. This avoids a ton of rewrites that the agent would inevitably done had I not directed it. I have been pushing Claude to use SolidStart for all my projects, which can be a bit of a footgun when it comes to agentic coding, because AI knows Next.js really well. And I know Next.js can be more than suitable for many projects (it can be overkill for many projects as well), but when I try to have AI write my a Next.js app with even a small amount of data being passed around, things get sluggish really quickly. Is this Next.js' fault? Maybe, maybe not. I am certain the is a Next dev expert that could glance at the codebase and point out exactly what the issue is right away. Heck, I can probably look at it and see that there are five useEffect's in one component blocking all blocking the whole thing from loading. Or I can see that the AI is trying to fetch and render everything on the client instead of using the server for anything. Part of the issue with the Next.js and AI agents combo is that it is too easy to design bad apps with Next.js and there are too many examples of bad structure in Next.js apps.

By forcing my friend to use something it is less familiar with, it is a tad bit easier to guide it away from these traps. The Solid documentation is very simple and clear. The recommended structures are easy to follow and generally work well when followed correctly.

### Pitfalls

As I have alluded, building an app using an AI agent is not all glory and no pain. It is a constant battle.

Among the most annoying issues I have found is the agent will habitually fall into the same design traps time and time again. I find myself explaining the same issue to the agent over and over again and the inclusion of an AGENTS.md does not seem to resolve the issue. Anthropic recently rolled out a feature claiming that the agent will remember things from all interactions. Which this has popped up here and there when I start a fresh conversation to try to field the agents response without polluted context, the agent will ask if I am referring to aspects of other conversations. While impressive, it still chooses to make form input fields in my solid app update data via signals every time, despite my constantly reminding it what issues that presents.

Machines are fantastic at generating stuff, and some of it is useful code. But if you are hoping to code a whole project via prompts, I wouldn't expect a clean repository. The agents love to create markdown files and many of them. The files can be informational and provide a nice summary of some of the changes it made during a session. But they can also contain several "TODO" lists that are often incomplete and often abandoned. This just ends up cluttering the repo and if you are like me and just add and commit everything when working on personal projects, this is a blatant queue that the project is riddled with AI generated code, guaranteeing harsh judgement from internet dwellers.

This cluttering extends beyond markdown and can creep into the code as well. This has been referred to as generating entropy in the project. The agent will write tons of code, that may quickly be abandoned, and it will never look at it again. It may duplicate a file for testing, but then leave it. Or worst of all, it may just rewrite the same functions in several places unless you explicitly tell it to reuse previously written code. This may seem like more of a cosmetic issue at first, but this can end up biting you later on, because when you ask the agent to debug an issue, it may go down the path of testing an editing a chunk of orphaned code for hours before you have the forethought ask if it is even looking at the right code.

## RPG's are complex

Besides the benefits and drawbacks of coding with AI, I had a lot of fun with this project because I learned a ton about RPG's. 
