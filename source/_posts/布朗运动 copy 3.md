---
title: 算法学习前置基础算法
date: 2025-01-28 15:01:39
tags: 探索
ai:
  - 布朗运动是爱因斯坦奇迹的一个Proof。
  - 有其他问题请参考论文消息。😁
keywords: C/2023 A3彗星（紫金山-阿特拉斯）
categories: 天文
description: 这是一篇科普
toc: true
indexing: true
index_img: https://tc.z.wiki/autoupload/Be5fZ-ROdLts743MADrjhdiO_OyvX7mIgxFBfDMDErs/20250617/wkPd/3840X2160/2023-10-31.OHR.HalloweenCuteAI-ZH-CN1079713117-UHD.3nrcsx7rh9.webp
top_img: https://tc.z.wiki/autoupload/Be5fZ-ROdLts743MADrjhdiO_OyvX7mIgxFBfDMDErs/20250617/wkPd/3840X2160/2023-10-31.OHR.HalloweenCuteAI-ZH-CN1079713117-UHD.3nrcsx7rh9.webp
cover: https://tc.z.wiki/autoupload/Be5fZ-ROdLts743MADrjhdiO_OyvX7mIgxFBfDMDErs/20250617/wkPd/3840X2160/2023-10-31.OHR.HalloweenCuteAI-ZH-CN1079713117-UHD.3nrcsx7rh9.webp
main_color: #51c4d3
---
# 基础算法

高级的算法往由一些基础的算法作为组成部分

## 排序算法

### 冒泡排序

> 思路：遍历数组，依次选中两个数比较大小，如果不满足顺序或逆序，就交换。

代码：

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(i+1,n):
            if arr[i]>arr[j]:
                arr[j],arr[i] = arr[i],arr[j]
```

时间复杂度：$O(n^2)$

### 选择排序

> 思路：分治思路，选最左边的数作为基准元素，遍历剩余的数组，进行比对如果，比标准小，就需要移动到左边，大的需要移动到右边，递归这个过程。直到最小有序。

代码:

```python
def selection_sort(arr,low=0,high=None):
    n = len(arr)
    if high is NOne:
        high = n-1
    for i in range(low+1,high+1):
        provrt = arr[low]
       	
```

