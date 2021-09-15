# 依赖注入和控制反转

**fork form <https://github.com/lawler61/blog>**

依靠 [ES7](https://es6.ruanyifeng.com/#docs/reflect) 中的装饰器来实现

## 使用全局变量来实现 node 中的依赖注入

见 global-list

## 使用 reflect-metadata 实现依赖注入

见 reflect-metadata

- 能给对象添加额外的信息（信息存在内部的 WeakMap 中），但是不影响对象的结构。保证原有 class 的一致性的
- 首先所有的对类的修饰，都是定义在类这个对象上面的，而所有的对类的属性或者方法的修饰，都是定义在类的原型上面的，并且以属性或者方法的 key 作为 property，这也就是为什么 getMetadata 会产生这样的效果了。

  ```typescript
  @Reflect.metadata('name', 'geekjc')
  class A {
    @Reflect.metadata('name', 'hello, geekjc')
    hello() {}
  }

  // A 类对象
  // new A 实例对象
  // A.prototype 类的原型对象（hello方法在原型对象上）
  const objs = [A, new A, A.prototype]
  const res = objs.map(obj => ([
    Reflect.getMetadata('name', obj),
    Reflect.getMetadata('name', obj, 'hello'),
    Reflect.getOwnMetadata('name', obj),
    Reflect.getOwnMetadata('name', obj ,'hello')
  ])

  // [
  //   ['geekjc', undefined, 'geekjc', undefined],
  //   [undefined, 'hello, geekjc', undefined, undefined],
  //   [undefined, 'hello, geekjc', undefined, 'hello, geekjc'],
  // ]
  ```

### API

```typescript
namespace Reflect {
  // 用于装饰器
  metadata(metadataKey, metadataValue): (target, property?) => void
  
  // 在对象上面定义元数据
  defineMetadata(metadataKey, metadataValue, target, propertyKey?): void
  
  // 是否存在元数据
  hasMetadata(metadataKey, target, propertyKey?): boolean
  hasOwnMetadata(metadataKey, target, propertyKey?): boolean
  
  // 获取元数据
  getMetadata(metadataKey, target, propertyKey?): any
  getOwnMetadata(metadataKey, target, propertyKey?): any
  
  // 获取所有元数据的 Key
  getMetadataKeys(target, propertyKey?): any[]
  getOwnMetadataKeys(target, propertyKey?): any[]
  
  // 删除元数据
  deleteMetadata(metadataKey, target, propertyKey?): boolean

  // 获取类型信息
  // 类型元数据使用元数据键"design:type"
  // 参数类型元数据使用元数据键"design:paramtypes"
  // 返回值类型元数据使用元数据键"design:returntype"
  Reflect.getMetadata("design:type", target, key)
}
```

[reflect-metadata 用法](https://rbuckton.github.io/reflect-metadata/#syntax)
[reflect-metadata 详解](https://www.jianshu.com/p/653bce04db0b)
