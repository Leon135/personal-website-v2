---
title: Synonik
description: Desktop app to find Polish synonyms with local database and keyboard shortcuts with modern look & feel.
technologies:
  - WPF
  - LiteDB
  - Bielik AI
  - SJP
featured: true
status: in-development
---

## Description

I've had a problem with writing texts for a long time. Recently I started paying more attention to the words I use and sentences I write, and I realized that using the same words over and over is my downside. **I wanted to find a way to easily find synonyms for words without having to open a browser and search for them. That's how Synonik was born.**

**Synonik ("synonym" + Polish: "słownik" - English: "dictionary")** is a desktop application that allows you to quickly find synonyms for a word. 

**As of now it's still in early development with closed source code**, I don't want the others to create issues or make me stressed about the project not being done yet. Some details can be disclosed, project will be open source when it's finished.

Currently it works for only Polish language, but there are plans to add support for other languages in the future. App uses a local database of synonyms, which is updated once for a while, and also allows you to search for synonyms using GUI or widget (highlight a word and press a keyboard shortcut).

More details will be disclosed when the project is finished.

## Built with

- [C#](https://learn.microsoft.com/en-us/dotnet/csharp/) - Programming language
- [WPF](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/) - Desktop app framework
- [LiteDB](https://www.litedb.org/) - Local database
- [Fluent UI](https://developer.microsoft.com/en-us/fluentui) - Windows 11 design system
- [Bielik AI](https://bielik.ai/) - Polish AI for generating meanings and examples
- [SJP](https://sjp.pl/) - Polish Language Dictionary
- [LibreOffice Dictionary](https://github.com/LibreOffice/dictionaries/) - Source of synonyms
