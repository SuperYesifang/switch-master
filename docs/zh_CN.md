# switch-master

![switch-master](https://img.shields.io/badge/switch--master-v0.2.3-%23C50008?logo=npm)
[![blog](https://img.shields.io/badge/blog-yesifang.com-orange?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABjFBMVEUAAAAIAQUiBhQVBA05CyK0I2z4MJTgKoV8GEoKAgZyFkT8MZfTKX4dBRFWEDP9MZfMJ3kGAQQHAQTlK4htFUEAHRMATDAAbUQAf1EAh1QAgFAAbUUATDAAHhNMDy7KJngAeUsAKBp9GEr4MJMDAQIAmWEAWzkABAOGGlD9MZYAcUgABQNoFD7mLIoAZUCdHl4ANiKiH2EpCBgAh1UAAgERAwrVKH9nFD0ALBwSAwuqIWXmK4pTEDIAWTgrCBp2F0eVHVmKG1NWETMAdEgAgVAAAQIAJTcATXIAZJQAbqUAap0AVoEAfE4AAQEAN1EAgMAAaEIACQ4Aap4ARiwACQ0AebMAmV8AEwwAAAAAZ5oAZT8AMkkAkFoAEQsAebMAl14AGCQAkl0ALx4AOlYAeEsAGRAATHAAbkUAll0All4AbkYAMB4ATXMABwQAIxYANiIAPicANyIAJBYAQF4AIjIAis0AAgMAhsYAZJYARWYAk9oAHy4ABQcAfbkAO1gAis3/MZgAmmEAld3///8EabibAAAAgHRSTlMACCIVObX54XwKcv3UHVb+zQYH5m0xfrTU4NW1fzJMy8hDffkD/pcHh/69CGjnqJ5ZoynfBBHWZ0kSqudTlCt2lotWwNUCQIOrvrWVzwFe3a4QtnQPz/0gAbKnVe4c0Psp9E9jximBtvj4t0+FCzpaZlo7bTruA+Wtdfs1CNdm7ZpKyEIAAAABYktHRIP8tM/SAAAAB3RJTUUH5QoVBh0NInrzjgAAATtJREFUOMt902VbwzAUBeDLcAYMhru7uzPcXYcP1+EyPMkvZ03TNk0TztfzNnL7BECeCFck/JOo6BiEYuPiVX2CG9EkJsn7ZA9iSUmV9d40ZCYdICMzKzsnNy+/wASFVo+KALCR4hIGSjlQVm4BXFFZRUE1B2q8HMC4tk4D9RxoABvAjRpwuS3QJADcrIkW6witImhrD4OOTtZ7ukAEuFtboqeXjqqvH5xgQL/qoG9oeET/FQIYdQxWAGNmMT4xOTU9MyuCOVbPLywSGhEs6f3yCiFysEr7tXWiABubWu/fIiqwTRfYISqwu0fBvgoc0DlCgCjA4ZF+hWMFODllMzizgfML2l5eXfuNGd7YAARv7+4fHoPc9J/swJlnrn+Rgdc3C4SkT+vd7D8+peDr2+h/FK838Ev3D4W//wNiKCWwWalJAwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0yMVQwNjoyOToxMyswMDowMP1Zb/cAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMjFUMDY6Mjk6MTMrMDA6MDCMBNdLAAAAAElFTkSuQmCC)](//yesifang.com)

> Switch Master, when you have many switch coupling logic, you need it!
> 
> 开关管家，当你有许多开关逻辑耦合时，你需要它！
>

[English Document](../README.md)

<div align="center">
  <a href="https://nodei.co/npm/switch-master/"><img src="https://nodei.co/npm/switch-master.png?downloads=true&downloadRank=true&stars=true"></a>
</div>

## 运行简单示例

```shell
$ git clone https://github.com/SuperYesifang/switch-master.git
$ cd switch-master
$ npm run serve
```

## 使用

`new SwitchMaster(configs:SwitchOption[]):SwitchMaster`

### 1.以CDN方式使用

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



### 2. 以ESM方式使用

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

| 属性         | 类型      | 描述                                                  |
| ------------ | --------- | ------------------------------------------------------------ |
| `id` | string | 开关的唯一id，默认 SwitchMaster 将会自动生成随机id。 |
| `name`   | string | 开关的名称，默认为 `config.id` |
| `status` | string | 开关的初始状态，默认为 `false`. |

## API

### new Switch()
`new Switch(config:SwitchOption):Switch`

实例化一个开关。

### new SwitchMaster()
`new SwitchMaster(configs:SwitchOption[]):SwitchMaster`

实例化一个开关管家。

### switch.open()
`switch.open()`

将开关的状态设置为 `true`。

### switch.close()
`switch.close()`

将开关的状态设置为 `false`。

### switch.toggle()
`switch.toggle(status:undefined | boolean)`

切换开关的状态。支持自定义状态。

### switch.onChange()
`switch.onChange(listener):removeListener`

添加一个状态变化监听器到开关。

**@types**
```ts
type listener = (status:boolean):any => {}
type removeListener = () => {}
```

```js
import SwitchMaster, { Switch } from "switch-master";

let s = new Switch({
  id: "panelx",
  status: true
});

let master = new SwitchMaster([
  { name: "panel1", status: true },
  { name: "panel2", status: false },
  { name: "panel3", status: false },
  { name: "panel4", status: false }
]);

master.addSwitch(s);
console.log(master.switchs);
```
### master.switchs
`master.switchs:{[id:string]:Switch}`

管家的所有开关集合。

### master.initialStatus
`master.initialStatus:{[id:string]:boolean}`

管家的所有开关的初始状态集合。

### master.addSwtich()
`master.addSwtich(s:Switch|Swtich[])`

添加开关到管家。

### master.removeSwitch()
`master.removeSwitch(s:Switch|Switch[])`

从管家删除指定开关

### master.removeSwitchById()
`master.removeSwitchById(id:string|string[])`

根据id从管家删除开关。

### master.removeSwitchByName()
`master.removeSwitchByName(name:string|string[])`

根据name从管家删除开关。

### master.getSwitchById()
`master.getSwitchById(id:string|string[]):Switch|Switch[]`

根据id从管家获取开关。

### master.getSwitchByName()
`master.getSwitchByName(name:string|string[]):Switch|Array(Switch|Switch[])`

根据name从管家获取开关。

### getNameById()
`master.getNameById(id:string|string[]):string|string[]`

根据id(s)从管家获取id对应的name。

### getIdByName()
`master.getIdByName(name:string|string[]):string|Array<string|string[]>`

根据name(s)从管家获取name对应的id(s)。

### openById()
`master.openById(id:string|string[])`

根据id(s)打开开关。

### openByName()
`master.openByName(name:string|string[])`

根据name(s)打开开关。

### closeById()
`master.closeById(id:string|string[])`

根据id(s)关闭开关

### closeByName()
`master.closeByName(name:string|string[])`

根据name(s)关闭开关。

### toggleById()
`master.toggleById(config)`

根据id配置切换开关状态。

### reset()
`master.reset(id?)`

根据id(s)?将开关状态重置为初始状态。

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

根据name配置切换开关状态。

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