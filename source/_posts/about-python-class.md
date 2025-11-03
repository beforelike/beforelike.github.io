---
title: Python中的类
date: 2025-11-04 05:08:13
tags: Python
description: 在学习Python的类后写的笔记
category: 学习笔记
cover: https://beforelike.github.io/picx-images-hosting/2024-05-09_18-32-40.51dzruuqjx.jpg
top_img: https://beforelike.github.io/picx-images-hosting/2024-05-09_18-32-40.51dzruuqjx.jpg
---

# Python中的类

## 类的属性

类，实例化之后是对象，在初学Python时，为了得到对象中的属性，我们往往会这样写：

```python
class hero(object):
    def __init__(self,name):
        self.__name__ = name
    def get_name(self):
        return self.__name__
hou = hero("后羿")
hou.get_name()

```

按照逻辑来说，使用方法来获取对象的属性，没有问题。但是不符合直觉，我们会习惯使用`hou.name`这样的形式获取属性，所以Python提供了`@property`装饰器，这个装饰器可以让属性的增、改、删更加方便。

```python
class hero(object):
    def __init__(self,name):
        self.__name__ = name
	@property
    def name(self):
        return self.__name__
    @name.setter
    def name(self,new_name):
        self.__name__ = new_name
	@name.deleter
    def name(self):
        del self.__name__
hou = hero("后羿")
hearo_name = hou.name
hou.name = "二郎神"
del hou.name
```

## 类的继承

新式类：继承了object的子类，以及继承了这个子类的子子孙孙类

经典类：没有继承object的子类，以及继承了这个子类的子子孙孙类

Python3默认新式类

```python
class car():
    pass
class hal(car):
    pass
car.__bases__ # 查看父类
```



继承是创建类的一种方式，被继承的类称为父类，通过继承创建的类称为子类， python支持多继承，多继承，有以下特性

>1. 遗传，解决代码冗余问题

多继承缺点：

1. 违背人的直觉，一个物体同属于多个类，不能清楚表达什么是什么
2. 可读性变差

使用MinIns改善这些缺点

### 派生

多个类存在相同的属性，通过父类提取这个共同属性。或者父类存在这个属性，子类任然继续进行初始化，或者拓展

### 继承的查找

```python
class test1:
    def f1(self):
        print("test.f1")
	def f2(self):
        print("test.f2")
		self.f1()
calss test2(test1):
    def f1(self):
        print("test2.f1")
obj = test2()
obj.f2()
```

通过对象查找属性的时候，对象自己没有，就会去对象的类里面查找，所以代码运行到第6行时会执行test2中的f1函数而不是执行test1中的f1函数。

### 多继承的菱形问题

使用mro列表进行属性查找，通过`类名.mro`查看mro列表

### MinIns机制

没有具体的操作，只是规定，在功能的类名中加入MixIns，able，ible后缀。要求每个MixIns的责任必须单一，不同的功能采用不同的类进行定义。同时不能依赖子类



## 多态

不考虑对象的具体类型的情况下直接使用对象

### 鸭子类型

多继承导致代码耦合，Python不推荐使用，Python推荐使用鸭子类型，在定义类的时候使用形似的格式进行定义，

## 抽象基类

```python
import abc

class car(mataclass = abc.ABCMeta):
    @abc.abstracmethod
    def run():
        pass
    
```

只规定方法，不实现具体功能

## 绑定类方法

使用@classmethod装饰器

```py
class car:
    @classmethod
    def insa(cls):
       	odj = cls()
```

## 静态方法

在类内部不绑定给对象或者类使用的方法

使用@staticmethod修饰

## 反射机制

动态获取对象属性的方法就是反射机制

```py
dir(对象) # 列出含有的属性列表
hasattr() # 存在某个属性
getattr() # 取出某个属性
setattr() # 修改属性
delattr() # 删除属性
```

 
