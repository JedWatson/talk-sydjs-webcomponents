SydJS Web Components Talk
=========================

Notes and Resources from my talk on Web Components at [SydJS](http://www.sydjs.com), June 2014

## Summary

These are the experiments I set up to demonstrate diffrent takes on reusable components for the web:

* [component(1)](https://github.com/component/component) - client package management for building better web applications
* [Polymer](http://www.polymer-project.org) - Building blocks for the web

Inspired by (a) [the Polymer getting started guide](http://www.polymer-project.org/docs/start/usingelements.html), and (b) wanting to improve the RSVP button on the [SydJS](http://www.sydjs.com) website (which seemed like a good use-case for a reusable component) I created two demos with functionally identical demos in both component(1) and Polymer:

* A simple page that makes an ajax API request to retrieve the current timestamp of the server as JSON and render it to a span element
* An RSVP button implementation that
	* Checks to see if you're signed in, and if not presents a signin button (in a real world app this would link to a signin dialog but for the demo it just hits an auto-signin API endpoint)
	* Checks to see if you've RSVP'd (rsvp status can be `true`, `false` or `undefiend`)
	* Displays the current RSVP status by selecting a button
	* Saves the RSVP when you select "yes" or "no"

As the demos should be served from a proper local web server, and because I needed a stateful API server, I also configured a [Hapi](http://hapijs.com) server with the following page routes:

* `/` - Entrypoint
* `/polymer` - First Polymer demo (AJAX timestamp request)
* `/polymer/rsvp` - Second Polymer demo (RSVP Button)
* `/component` - First Component(1) demo (AJAX timestamp request)
* `/component/rsvp` - Second Component(1) demo (RSVP Button)

And the following API Endpoints (`GET` request with no parameters, returns `json`):

* `/api/ping` - Return the server timestamp
* `/api/whoami` - Check current signin status
* `/api/signin` - Signs in as `jedwatson`
* `/api/signout` - Clears signin status
* `/api/rsvp/check` - Check current RSVP status
* `/api/rsvp/true` - Sets RSVP status to `true`
* `/api/rsvp/false` - Sets RSVP status to `false`
* `/api/rsvp/clear` - Sets RSVP status to `undefined`

There is no UI for hitting the `signout` or `rsvp/clear` endpoints; to use these simply visit them in a new browser window.

# Getting Started

To use these demos (and the build tools for both Polymer and component(1)) you must have [node](http://nodejs.org/) installed.

Then install the node modules (which are defined in `./package.json`) by running

	npm install

... from the main folder. You'll also need `bower` and `component` installed globally, which can also be installed from npm:

	npm install -g bower
	npm install -g component@1.0.0-rc5

To start the web server, run

	node server

... then visit [http://localhost:8080](http://localhost:8080) in your browser.

If you're curious, the files for the server can be found in `./server/*`.

When working on the experiments, I used [nodemon](http://nodemon.io) to automatically restart my server when I made changes to the code:

	npm install -g nodemon
	nodemon server -e js,html

# Polymer

> Web Components usher in a new era of web development based on encapsulated and interoperable custom elements that extend HTML itself. Built atop these new standards, Polymer makes it easier and faster to create anything from a button to a complete application across desktop, mobile, and beyond.

Maintained by Google and will be the basis for Angular 2.0; and theoretically available for use today in evergreen browsers thanks to polyfill support. What's not to like?

Turns out, a lot. Unfortunately it's almost impossible to ensure a consistent experience across different browsers while the shadow dom support matures, especially with regards to elemnt styling. And whlie I was preparing the talk, documentation was sketchy at best; it's been improved since (with `0.3.3`, which was released at I/O 2014) but the whole ecosystem it pretty unstable right now.

When it *does* mature, though, this is going to be awesome. On with the experiments.

### Installation

`Polymer`, `Pure` and the `core-ajax` polymer element are specified as dependencies in `./bower.json` and must be installed before you can run the experiments.

To do this, run the following from the project root:

	bower install

### First Experiment - AJAX timestamp request

View it here: [http://localhost:8080/polymer](http://localhost:8080/polymer)

The first experiment is basically a copy of the 'getting started' tutorial on the Polymer site.

The full source code can be found in `./polymer/index.html`.

### Second Experiment - RSVP Button

For the second experiment, I created a custom Polymer element called &lt;rsvp-button&gt; and invoked it on a simple page.

View it here: [http://localhost:8080/polymer/rsvp](http://localhost:8080/polymer/rsvp)

The code for the second experiment is in `./polymer/rsvp.html`.

The implementation of the custom element is in `./polymer/elements/rsvp-button/*`. Note that the `core-ajax` element is now no longer included in the root page, but is pulled in by the `rsvp-button` component.

### Notes

The [Polymer Website](http://www.polymer-project.org/) has some great resources for getting started, and a great reference for all the elements [here](http://www.polymer-project.org/docs/elements/).

[Understanding Polymer](http://www.polymer-project.org/docs/start/everything.html) is also a great place to start.

### Production Use

Officially, Polymer isn't really ready for broad use yet, but if that isn't going to stop you (and browser support for IE 9 or lower isn't a thing for you) probably the biggest thing you'll want to be across is how to use [Vulcanize](http://www.polymer-project.org/articles/concatenating-web-components.html) to build all your dependencies into a single import. Without this, each component is going to make a bunch of web requests and really slow down your page / app.

Performance is currently the biggest issue with Polymer, as you can see on the simple Ajax Request experiment, where there's a noticible delay before the platform is initialised, which isn't present in the component(1) version.

[Styling Polymer Elements](http://www.polymer-project.org/articles/styling-elements.html) is also a fairly important thing to understand; especially the implications of whether there is proper shadow dom support in the browser or not, as this fundamentally changes the way that a component's CSS will interact with the page it's in (and vice versa).

If you view [this example](http://www.polymer-project.org/articles/styling-elements.html#style-distributed) in both Chrome (v35) and Firefox (v30) you'll see the issue - Chrome supports the shadow dom at that version but Firefox doesn't, so the same styling rules have completely different effects.

Until this is either resolved or a better polyfill is provided that works around this, be *really* careful with it. It's probably the biggest thing currently holding me back from using Polymer in the real world, and I personally of wish they'd go with a more compatible middle-ground until the implementations catch up with how the shadow dom is supposed to behave.

# Component(1)

> Component is a vertically integrated frontend solution, handling everything from package management to the build process, handling everything including HTML, JS, CSS, images, and fonts. Think of it as an opinionated npm + browserify + rework-npm + grunt/gulp/brocolli all wrapped into component build.

> Components themselves tend to be low-level and not rely on "cute" APIs, which should be reserved for apps (@tjholowaychuk)

Component is really a package management / build system, unlike polymer which provides a whole lot of client-side code. The goal is to start building component-oriented projects using tools that are available today, rather than reaching into the future of our platforms.

Having said that, it's also quite raw; I couldn't actually compile my experiments without hitting breaking issues in the core platform, and had to submit a PR fixing one before I could actually prepare my talk (the night before - not fun!). So tread carefully, and I wouldn't recommend it to anyone (yet) who isn't comfortable jumping into the deep end of node modules as required.

On the up-side, when it *does* work, it's a neat system, and if you're having problems you'll have them in your development environment, not production (unlike Polymer).

The other major complaint I had with Component was the general lack of documentation throughout the ecosystem; you'll find five different components that do the same thing, and it's up to you to figure out which one is better, and why, and then probably work out how to use it by reading the code.

### First Experiment - AJAX timestamp request

View it here: [http://localhost:8080/component](http://localhost:8080/component)

This is a simplest port of the Polymer getting started demo, for comparison.

The full source code can be found in `./component/index/*`. See `index.html`, `component.json` and `app/*` for the interesting parts.

### Second Experiment - RSVP Button

View it here: [http://localhost:8080/component/rsvp](http://localhost:8080/component/rsvp)

This is structured more like the component(1) recommendations; the app bootstrapper itself is a component, and everything is nested under the `local` directory.

Check out `./component/rsvp/*` for how it's done.

### Notes

For getting started building components, see:

* https://github.com/component/guide
* http://blog.kewah.com/2014/build-a-web-app-with-component/

With `component` installed from npm (see installation guilde above), you can install any component on GitHub by specifying a username and repo:

	component install github_user/repository

To build your project, use one of the following commands:

Watching: `component build --watch`
Development: `component build --dev`
Debugging: `DEBUG=component* component build`

Auth your github or you'll run out of requests:

* https://github.com/component/guide/blob/master/changelogs/1.0.0.md#required-authentication

You'll probably want to use the [SuitCSS](https://github.com/suitcss) framework to style your components:

	component install suitcss/suit


License
=======

The MIT License (MIT)

Copyright (c) 2014 Jed Watson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

