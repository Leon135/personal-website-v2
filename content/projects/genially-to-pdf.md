---
title: Genially to PDF
description: Web application that converts Genially presentations to PDF format, allowing users to easily save and browse presentations without animations and lag.
liveUrl: https://app.leon135.xyz/genially-to-pdf/
liveUrlLabel: Try it out
technologies:
  - Python
  - FastAPI
  - Docker
  - Homeserver
featured: true
status: active
---

## Description

Genially has no option to convert other people's presentations to PDF. It made me so angry, coz I couldn't easily save presentations and browse them quickly without animations and waiting. That's where idea for this project came from. I wanted to make an app that could convert Genially presentations to PDF format. MVP was pretty quick to make, after learning how to even manage "scraping" Genially I decided to make it into a web application. Why? Because I didn't find any other tool that can do that!

**G2PDF** (Genially to PDF) consists of a backend that handles the requests, tasks, status and conversions, and a frontend that allows to just paste link of the presentation and send the request! Website is static, built with Nextjs with modern ui that I am proud of. Backend is built with FastAPI and Python, it uses Playwright to open the presentation, navigate through all the slides and take screenshots of them. Then it combines all the screenshots into one PDF file and sends it back to the user. The app is hosted on my home server, and it is available for everyone to use. Of course, there are some limitations, like current support for only simple presentations without "interactive" elements, but I am working on adding support for more complex presentations in the future. Another thing is that I have a queue for the requests, so if there are too many requests at the same time, some of them may be delayed, coz I don't want to burn my home server ;)

I've learnt a lot during this project, especially about writing CRUD API, handling async tasks, using Playwright, dockerizing the app and hosting it on my home server. I am really happy with the result, and I hope it will be useful for many people who want to save Genially presentations in PDF format.

## Features

- Modern website with simple responsive UI
- Paste link of the Genially presentation and get PDF file
- Support for simple presentations without "interactive" elements
- Queue for the requests to prevent server overload
- Get status of the conversion process with update of the UI
- Cancel a task if it takes too long or if the user changed their mind
- Download the PDF file after conversion is done

## Screenshots

![Hero section](/genially-to-pdf/hero.png)
![Converter section](/genially-to-pdf/converter.png)
![Example usage](/genially-to-pdf/example.png)
![About section](/genially-to-pdf/about.png)

## Built with

### Backend

- [Python](https://www.python.org/) - Programming language for the backend
- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework for building APIs
- [Playwright](https://playwright.dev/) - Library for automating browsers, used for navigating through Genially presentations and taking screenshots
- [Docker](https://www.docker.com/) - Containerization platform for easy deployment
- My lil science box aka home server ;)

### Frontend

- [Next.js](https://nextjs.org/) - React framework for building the frontend
- [Tailwind CSS](https://tailwindcss.com/) - CSS for UI
- [Github Pages](https://pages.github.com/) - Hosting the frontend for free for static pages it is more than enough
