# switch-master

![switch-master](https://img.shields.io/badge/switch--master-v0.1.0-%23C50008?logo=npm)
[![blog](https://img.shields.io/badge/blog-yesifang.com-orange?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABjFBMVEUAAAAIAQUiBhQVBA05CyK0I2z4MJTgKoV8GEoKAgZyFkT8MZfTKX4dBRFWEDP9MZfMJ3kGAQQHAQTlK4htFUEAHRMATDAAbUQAf1EAh1QAgFAAbUUATDAAHhNMDy7KJngAeUsAKBp9GEr4MJMDAQIAmWEAWzkABAOGGlD9MZYAcUgABQNoFD7mLIoAZUCdHl4ANiKiH2EpCBgAh1UAAgERAwrVKH9nFD0ALBwSAwuqIWXmK4pTEDIAWTgrCBp2F0eVHVmKG1NWETMAdEgAgVAAAQIAJTcATXIAZJQAbqUAap0AVoEAfE4AAQEAN1EAgMAAaEIACQ4Aap4ARiwACQ0AebMAmV8AEwwAAAAAZ5oAZT8AMkkAkFoAEQsAebMAl14AGCQAkl0ALx4AOlYAeEsAGRAATHAAbkUAll0All4AbkYAMB4ATXMABwQAIxYANiIAPicANyIAJBYAQF4AIjIAis0AAgMAhsYAZJYARWYAk9oAHy4ABQcAfbkAO1gAis3/MZgAmmEAld3///8EabibAAAAgHRSTlMACCIVObX54XwKcv3UHVb+zQYH5m0xfrTU4NW1fzJMy8hDffkD/pcHh/69CGjnqJ5ZoynfBBHWZ0kSqudTlCt2lotWwNUCQIOrvrWVzwFe3a4QtnQPz/0gAbKnVe4c0Psp9E9jximBtvj4t0+FCzpaZlo7bTruA+Wtdfs1CNdm7ZpKyEIAAAABYktHRIP8tM/SAAAAB3RJTUUH5QoVBh0NInrzjgAAATtJREFUOMt902VbwzAUBeDLcAYMhru7uzPcXYcP1+EyPMkvZ03TNk0TztfzNnL7BECeCFck/JOo6BiEYuPiVX2CG9EkJsn7ZA9iSUmV9d40ZCYdICMzKzsnNy+/wASFVo+KALCR4hIGSjlQVm4BXFFZRUE1B2q8HMC4tk4D9RxoABvAjRpwuS3QJADcrIkW6witImhrD4OOTtZ7ukAEuFtboqeXjqqvH5xgQL/qoG9oeET/FQIYdQxWAGNmMT4xOTU9MyuCOVbPLywSGhEs6f3yCiFysEr7tXWiABubWu/fIiqwTRfYISqwu0fBvgoc0DlCgCjA4ZF+hWMFODllMzizgfML2l5eXfuNGd7YAARv7+4fHoPc9J/swJlnrn+Rgdc3C4SkT+vd7D8+peDr2+h/FK838Ev3D4W//wNiKCWwWalJAwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0yMVQwNjoyOToxMyswMDowMP1Zb/cAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMjFUMDY6Mjk6MTMrMDA6MDCMBNdLAAAAAElFTkSuQmCC)](//yesifang.com)

> Switch Master, when you have many switch coupling logic, you need it!
> 
> 开关管家，当你有许多开关逻辑耦合时，你需要它！
>

<!-- [中文文档](./docs/zh_CN.md) -->

<div align="center">
  <a href="https://nodei.co/npm/switch-master/"><img src="https://nodei.co/npm/switch-master.png?downloads=true&downloadRank=true&stars=true"></a>
</div>

## Run Simple Demo

```shell
$ git clone https://github.com/SuperYesifang/switch-master.git
$ cd switch-master
$ npm run serve
```

## Usage

`new SwitchMaster(configs:SwitchOption[]):SwitchMaster`

### 1. Use CDN

```html
<script src="https://raw.githubusercontent.com/SuperYesifang/switch-master/master/dist/SwitchMaster.cdn.js"></script>
<script>
let master = new SwitchMaster([
  { name: "panel1", status: true },
  { name: "panel2", status: false },
  { name: "panel3", status: false },
  { name: "panel4", status: false }
]);
</script>
```



### 2. Use ESM

```js
import SwitchMaster from "switch-master";

let master = SwitchMaster([
  { name: "panel1", status: true },
  { name: "panel2", status: false },
  { name: "panel3", status: false },
  { name: "panel4", status: false }
]);
```



## switchOption

| prop         | type      | description                                                  |
| ------------ | --------- | ------------------------------------------------------------ |
| `id` | string | switch's unique id. |
| `name`   | string | switch's unique name. default `config.id` |
| `status` | string | switch's initial status. default `false`. |

## API

### new SwitchMaster()
`new SwitchMaster(configs:SwitchOption[]):SwitchMaster`

Instantiation a switch master.

```js
import SwitchMaster from "switch-master";

let master = new SwitchMaster([
  { name: "panel1", status: true },
  { name: "panel2", status: false },
  { name: "panel3", status: false },
  { name: "panel4", status: false }
]);
```
### master.switchs
`master.switchs:Switch[]`

all switchs of the master.

### master.addSwtich()
`master.addSwtich(s:Switch)`

add a swtich to master.

### master.removeSwitch()
`master.removeSwitch(s:Switch)`

remove a switch from master.

### master.removeSwitchById()
`master.removeSwitchById(id:string|string[])`

remove switch(s) from master by id(s).

### master.removeSwitchByName()
`master.removeSwitchByName(name:string|string[])`

remove switch(s) from master by name(s).

### master.getSwitchById()
`master.getSwitchById(id:string):Switch[]`

get switch from master by id.

### master.getSwitchsByIds()
`master.getSwitchsByIds(ids:string[]):Switch[]`

get switchs from master by ids.

### master.getSwitchByName()
`master.getSwitchByName(name:string):Switch`

get switch from master by name.

### master.getSwitchsByNames()
`master.getSwitchsByNames(names:string[]):Switch[]`

get switchs from master by names.

### getNamesByIds()
`master.getNamesByIds(ids:string[]):string[]`

get switch's names from master by ids.

### getIdsByNames()
`master.getIdsByNames(names:string[]):string[]`

get switch's ids from master by names.

### openById()
`master.openById(id:string|string[])`

open switch by id(s).

### openByName()
`master.openByName(name:string|string[])`

open switch by name(s).

### closeById()
`master.closeById(id:string|string[])`

close switch by id(s).

### closeByName()
`master.closeByName(name:string|string[])`

close switch by name(s).

### toggleById()
`master.toggleById(config)`

toggle switch by id config.

```js
master.toggleById({
  'Switch__e76cfa8771c4': true,
  'Switch__10476415b997': false
})
```

**@types**
```ts
type config = {
  [id:string]: boolean;
}
```

### toggleByName()
`master.toggleByName(config)`

toggle switch by name config.

```js
master.toggleByName({
  "panel1": true,
  "panel3": false
})
```
**@types**

```ts
type config = {
  [name:string]: boolean;
}
```