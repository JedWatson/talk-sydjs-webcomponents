# SUIT utilities: state

[![Build Status](https://secure.travis-ci.org/suitcss/utils-state.png?branch=master)](http://travis-ci.org/suitcss/utils-state)

SUIT CSS state utilities.

Read more about [SUIT's design principles](https://github.com/suitcss/suit/).

## Installation

* [Component(1)](http://component.io/): `component install suitcss/utils-state`
* [npm](http://npmjs.org/): `npm install suitcss-utils-state`
* [Bower](http://bower.io/): `bower install suit-utils-state`
* Download: [zip](https://github.com/suitcss/utils-state/zipball/master)

## Available classes

* `u-isActionable` - Style with a `pointer` cursor to indicate an element will trigger an action.
* `u-isDisabled` - Style with a `default` cursor to indicate no associated action.
* `u-isDraggable` - Style with a `move` cursor to indicate an element can be dragged.
* `u-isHidden` - Completely remove an element from the flow and screen readers.
* `u-isHiddenVisually` - Completely remove an element from the flow but leave available to screen readers.
* `u-isVisible` - Make an element visible.
* `u-isInvisible` - Hide an element without affecting flow

## Usage

Please refer to the README for [SUIT utils](https://github.com/suitcss/utils/)

## Testing

Install [Node](http://nodejs.org) (comes with npm).

```
npm install
```

To generate a build:

```
npm run build
```

To generate the testing build.

```
npm run build-test
```

Basic visual tests are in `test.html`.

## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+
