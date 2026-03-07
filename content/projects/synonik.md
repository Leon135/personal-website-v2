---
title: Synonik
description: Desktop app to find Polish synonyms with local database and keyboard shortcuts with modern look & feel.
technologies:
  - C#
  - WPF
  - LiteDB
  - Bielik AI
  - SJP
  - LibreOffice Dictionary
featured: false
status: in-development
---

## Description

I've had a problem with writing texts for a long time. Recently I started paying more attention to the words I use and sentences I write, and I realized that I often use the same words over and over again. I wanted to find a way to easily find synonyms for words without having to open a browser and search for them. That's how Synonik was born.

Synonik ("synonym" + Polish: "słownik" - English: "dictionary") is a desktop application that allows you to quickly find synonyms for a word. Currently it is still in early development with closed source code, I don't want the others to create issues or make me stressed about the project not being done yet. I want to finish the project and then release it as open source, but I can already share some details about it.

Currently it works for only Polish language, but I plan to add support for other languages in the future. It uses a local database of synonyms, which is updated once for a while, and also allows you to search for synonyms using GUI or widget (highlight a word and press a keyboard shortcut).

More details will be disclosed when the project is finished.

## Built with

- [WPF](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/?view=netdesktop-7.0) - desktop application
- [LiteDB](https://www.litedb.org/) - local database of synonyms
- [Fluent UI](https://developer.microsoft.com/en-us/fluentui) - Windows 11 look & feel
- [Bielik AI](https://bielik.ai/) - generating meanings of each synonym and example sentences
- [SJP (Polish Language Dictionary)](https://sjp.pl/) - source of base words
- [LibreOffice Dictionary](https://github.com/LibreOffice/dictionaries/) - source of synonyms
