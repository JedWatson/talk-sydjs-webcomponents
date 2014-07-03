SydJS Web Components Talk
=========================

Resources for my talk on Web Components at SydJS, June 2014

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

... from the main folder. This will install [Hapi](http://hapijs.com), and you'll be good to go.

To start the web server, run

	node server

... then visit [http://localhost:8080](http://localhost:8080) in your browser.

If you're curious, the files for the server can be found in `./server/*`.

# Polymer

> Web Components usher in a new era of web development based on encapsulated and interoperable custom elements that extend HTML itself. Built atop these new standards, Polymer makes it easier and faster to create anything from a button to a complete application across desktop, mobile, and beyond.

The first experiment (AJAX timestamp request) is basically a copy of the 'getting started' tutorial on the Polymer site.

Polymer, Pure and the `core-ajax` component are required in `./bower.json` and can be installed by running `bower install` from the root project folder.

The code for the page itself is in `./polymer/index.html`.

For the second experiment, I created a custom Polymer element called &lt;rsvp-button&gt; and invoked it on a simple page.

The code for the second experiment is in `./polymer/rsvp.html`.

The implementation of the custom element is in `./polymer/elements/rsvp-button/*`. Note that the `core-ajax` element is now no longer included in the root page, but is pulled in by the `rsvp-button` component.

## Polymer Notes

The [Polymer Website](http://www.polymer-project.org/) has some great resources for getting started, and a great reference for all the elements [here](http://www.polymer-project.org/docs/elements/).

[Understanding Polymer](http://www.polymer-project.org/docs/start/everything.html) is also a great place to start.

### Installation

Install via Bower

	npm install -g bower
	
	bower init
	bower install --save Polymer/polymer
	bower install --save Polymer/core-elements

### Production Use

Officially, Polymer isn't really ready for broad use yet, but if that isn't going to stop you (and browser support for IE 9 or lower isn't a thing for you) probably the biggest thing you'll want to be across is how to use [Vulcanize](http://www.polymer-project.org/articles/concatenating-web-components.html) to build all your dependencies into a single import. Without this, each component is going to make a bunch of web requests and really slow down your page / app.

Performance is currently the biggest issue with Polymer, as you can see on the simple Ajax Request experiment, where there's a noticible delay before the platform is initialised, which isn't present in the component(1) version.

[Styling Polymer Elements](http://www.polymer-project.org/articles/styling-elements.html) is also a fairly important thing to understand; especially the implications of whether there is proper shadow dom support in the browser or not, as this fundamentally changes the way that a component's CSS will interact with the page it's in (and vice versa).

If you view [this example](http://www.polymer-project.org/articles/styling-elements.html#style-distributed) in both Chrome (v35) and Firefox (v30) you'll see the issue - Chrome supports the shadow dom at that version but Firefox doesn't, so the same styling rules have completely different effects.

Until this is either resolved or a better polyfill is provided that works around this, be *really* careful with it. It's probably the biggest thing currently holding me back from using Polymer in the real world, and I personally of wish they'd go with a more compatible middle-ground until the implementations catch up with how the shadow dom is supposed to behave.
