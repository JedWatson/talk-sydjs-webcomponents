# SUIT utilities: size

[![Build Status](https://secure.travis-ci.org/suitcss/utils-size.png?branch=master)](http://travis-ci.org/suitcss/utils-size)

SUIT CSS sizing utilities.

Read more about [SUIT's design principles](https://github.com/suitcss/suit/).

## Installation

* [Component(1)](http://component.io/): `component install suitcss/utils-size`
* [npm](http://npmjs.org/): `npm install suitcss-utils-size`
* [Bower](http://bower.io/): `bower install suit-utils-size`
* Download: [zip](https://github.com/suitcss/utils-size/zipball/master)

## Available classes

* `u-sizeFit` - Make an element shrink wrap its content by floating left.
* `u-sizeFitAlt` - Make an element shrink wrap its content by floating right.
* `u-sizeFill` - Make an element fill the remaining space.
* `u-sizeFillAlt` - An alternative method to make an element fill the remaining space.
* `u-sizeFull` - Make an element the width of its parent.
* `u-sizeXofY` (numerous) - Specify the proportional width of an object.

`X` must be an integer less than `Y`.

`Y` can be any of the following numbers: 2, 3, 4, 5, 6, 8, 10, 12.

### Plugins

Utilities that can be limited to specific Media Query breakpoints.

* `u-sm-sizeXofY` - To use at the smallest Media Query breakpoint.
* `u-md-sizeXofY` - To use at the medium Media Query breakpoint.
* `u-lg-sizeXofY` - To use at the largest Media Query breakpoint.

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
