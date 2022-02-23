Simple and lightweight library for creating parallax effect

# Instalation

`npm i @emotionagency/parallax`

or

`yarn add @emotionagency/parallax`

# Usage

Basic example
```
import {Parallax} from '@emotionagency/parallax'

const parallax = new Parallax()

<div data-parallax="0.06"></div> // parallax power, [data-parallax] is the selector that makes the script work
<div data-parallax="0.06" data-parallax-scale="1.07"></div> // scale elem if you need
<div data-parallax="0.06" data-parallax-dir="-1"></div> // parallax direction (default is 1)
```

Destroy instance

```
import {Parallax} from '@emotionagency/parallax'

const parallax = new Parallax()

parallax.destroy()
```

Update nodes

```
import {Parallax} from '@emotionagency/parallax'

const parallax = new Parallax()

parallax.update()
```

Reset position

```
import {Parallax} from '@emotionagency/parallax'

const parallax = new Parallax()

parallax.reset()
```


## Instance options

| Option                  | Type      | Default                | Description                                                                                                                                                                                                                                                                                        |
| ----------------------- | --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inViewDetection`                    | `boolean`  | `true`             | Animation will only happen if the element is in view                                           
| `mobile`                | `boolean`| `true`                |  If true, it will work on mobile devices too.
| `breakpoint`                | `number`| `960`                |  If mobile is selected false, then this value indicates when the parallax will be disabled.