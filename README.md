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



