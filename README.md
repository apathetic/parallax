# Parallax

Parallax. Moves stuff on scroll.

## Getting Started

* With npm:  ``` npm install @apathetic/parallax```
* With git:  ```git clone .... ```

Consume the module however you wish, and then:

```javascript
Parallax.init('.parallax');
```

## Options
Elements on the page can have different attributes, as referenced through particular data-atrributes. For example:


| name        | default   | description |
| ----------- | --------- | ------------|
| el (String) | .parallax | selector of elements to parallax-ify |
| mode (Integer) | 1      | There are two different modes:<br> **mode 1**: Commence parallaxing items only when they appear within the viewport<br>**mode 0**: Parallax items universally, irrespective of where they are on the page |
| range (Integer) | 200 | The total distance (in px) to parallax an element (only applies when mode = 1) |
| speed (Integer) | 0 | The speed of the parallax, relative to the scroll. For example:<br>**-1**: translate up as fast as you scroll up (ie. moving upwards at 2x the scroll)<br>**0**: normal (ie. no effect)<br>**1**: translate down as fast as you scroll up (ie. "fixed" position) |

**Note**: You may also set these via a data attribute on the element e.g.:

```html
<div class="parallax item" data-parallax-speed="1"></div>
```

## Support
* IE9+
* Safari / Chrome
* Firefox

## Known Issues

## Examples

Please see the _demo_ directory

## Release History


### 0.1
* initial commit
