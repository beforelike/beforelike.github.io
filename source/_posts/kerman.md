---
title: 卡尔曼滤波
date: 2025-11-02 02:49:17
tags: 数学
categories: 学习笔记
top_img: https://beforelike.github.io/picx-images-hosting/0e6207335402417ef7.ibvboe3si.jpg
cover: https://beforelike.github.io/picx-images-hosting/0e6207335402417ef7.ibvboe3si.jpg
main_color: '#3e5658'
---
# 卡尔曼滤波

![深入浅出理解卡尔曼滤波](C:/mydoc/%E5%8D%A1%E6%9B%BC%E6%BB%A4%E6%B3%A2.assets/v2-e6cf1159a7971f47262368e695378ea7_1440w.png)

一、概述

1.1 简介

1.2 示例

二、原理推导

2.1 基本概念

2.2 最优估计值和预测值、观测值的关系推导

2.3 目标函数的建立与转化

2.4 扩展证明

2.5 卡尔曼增益求解和协方差矩阵化简

2.6 总结

三、代码实现

3.1 代码1（变量形式）

3.2 代码2（矩阵形式）

## 一、概述

### 1.1 简介

卡尔曼滤波，用直白的话来讲，就是你有多个不确定的结果，经过分析、推理和计算，获得相对准确的结果。

**多个**是指数据来源可以是模型推理得出，也可以是通过仪器测量获得。

**不确定**是指由于模型本身是一种近似，或者是测量仪器本身的精度误差，或者测量过程不可避免地引入了噪声，甚至因为所需要的特征无法直接获取，只能间接推导获得。

**分析、推理和计算**，则指的是卡尔曼滤波算法，也是本文接下来将会重点阐述的部分。

**相对准确**，指的是经过卡尔曼滤波算法获得的结果，比原有的多个不确定的结果更逼近客观真实值，但依然存在误差。

### 1.2 示例

我们首先从一个简单的例子开始讲起，不妨头脑风暴一下，有一辆小车，从原点出发，以2m/s的速度自西向东做**直线运动**，t-1时刻在距离原点的东6m处，t时刻雷达测得小车距离原点的东9m处。已知在假定小车做匀速直线运动的前提下，该运动模型的方差为 θq2=4(m2) ，雷达测试仪对距离测试的方差为 θr2=1(m2) ，问题来了，小车在距离原点的何处？更准确来说，在距离原点何处的可能性最大？

显然，假定小车做匀速直线运动，我们可以根据运动方程得到小车当前的位置，为 xt=8m ，我们称之为**预测值**。然而我们对此并不自信，因为建立的模型过于简单，且未考虑各种阻力、t-1时刻速度和位置的准确性等等因素。而对于雷达测量的结果 zt=9m ，我们称之为**观测值**，也不可尽信，如前文所述，所有的测量仪器本身存在误差，例如民用北斗卫星导航精度在1m的数量级。

那么，如何利用这两个值获得更为准确的位置值，是值得深入探讨的问题。一种最简单的做法是，取二者平均值，即各值所占权重为50%，最终得到8.5m。但这没有利用上二者的方差，考虑到方差代表准确度，方差越大即证明越不可信，我们有理由从数学上直观的认为，方差大所对应的值，其权重系数更小，且二者权重系数之和为1，因此，从"猜"的角度来说，最终值为 $\frac{\theta_q^2}{\theta_r^2 + \theta_q^2} \times x_t + \frac{\theta_r^2}{\theta_r^2 + \theta_q^2}\times z_t = \frac{1}{1 + 4}\times 8 +\frac{4}{1 + 4}\times 9 = 8.8$。看起来，8.8m比8.5m更可信、更准确，因为利用上了更多的信息，怎么说明我们"猜"的有道理呢？事实上，对于一维匀速直线运动模型、观测量只有一个的情况而言，上述$\frac{\theta_q^2}{\theta_r^2 + \theta_q^2} \times x_t + \frac{\theta_r^2}{\theta_r^2 + \theta_q^2}\times z_t$正是卡尔曼滤波**最优值**的更新公式，对于二维及以上的模型，有更复杂的表现形式，我们将用矩阵的方式来简化这一式子。

接下来，我们从数学公式推导方面详细阐述卡尔曼滤波的原理。相比于其他讲述卡尔曼滤波的文章，本文会对公式推导的每一个步骤有着更为详细的拆解。

## 二、原理推导

### 2.1 基本概念

（线性）卡尔曼滤波的应用基于以下三个假设前提：

1.  当前时刻状态只和**上一时刻**状态有关。
2.  模型和系统均满足**线性**关系。
3.  引入的噪声符合**高斯**分布。

对于和多时刻状态有关、非线性、非高斯问题，将不能简单地使用卡尔曼滤波，需要做其他处理，不属于本文的范畴。

基于上述假设，我们可以得到如下两个表征过程模型和测量模型的公式：
$$
X_k = Fx_{k-1} +Bu_{k-1} + w_k
$$

$$
z_k = Hx_k + v_k
$$



公式①表示过程模型，公式②表示测量模型，其中：

$x_k$ 表示k时刻的**真实值，**是待估计的值，例如位置、速度

$x_{k−1}$ 表示k-1时刻的真实值

$u_{k−1}$ 表示k-1时刻的控制输入量，例如加速度等等

wk 表示[过程噪声](https://zhida.zhihu.com/search?content_id=232573862&content_type=Article&match_order=1&q=过程噪声&zhida_source=entity)，且有 $p(w_k)∼N(0,Q)$ ，即符合均值为0，协方差矩阵为Q的高斯噪声分布

zk 表示k时刻的**观测值**，例如雷达或者GPS测量结果，它可能和 xk 保持相同维度，也可能和 xk 不同维度，比如 xk 包括位置和速度，但测量仪器只观测位置信息，而忽略了速度信息；又例如，视觉里程计中，直接观测结果是图像像素，而状态量是位姿信息

vk 表示[测量噪声](https://zhida.zhihu.com/search?content_id=232573862&content_type=Article&match_order=1&q=测量噪声&zhida_source=entity)，类似 wk ，有$p(v_k)∼N(0,R)$

、、F、B、H 分别表示状态转移矩阵、控制矩阵、观测转移矩阵。

本文中，大写字母表示矩阵，如、、F、B、H，带一维下角标的小写字母表示**列向量**，如、、、、、xk、xk−1、uk−1、wk、zk、vk，特别地，上述向量中的每个元素表示随机变量，本文使用带二维下角标的小写字母如 、x11、xmn 等等进行表示。

不难理解，我们无法得到k时刻的噪声，无论是过程噪声 wk 还是测量噪声 vk ，因此即便是我们建立了精确的模型，也无法得到准确的真实值xk ，所以我们希望假设一个**最优估计值** x~k 来尽可能逼近xk ，使得误差最小。

### 2.2 最优估计值和预测值、观测值的关系推导

对于过程模型，由于、wk、xk−1未知，我们不妨忽略wk，并假设

xk−=Fx~k−1+Buk−1

我们使用上一时刻的最优估计值 x~k−1 来替代真实值，并将 xk− 称为当前时刻通过过程模型得到的**预测值**，也叫做**先验估计值**。显然，这是一个误差较大的预估值，我们使用观测值来进行修正（你可能会问，如果没有测量值呢？那问题到此结束，也用不上卡尔曼滤波了，本文的背景便是通过观测值来修正预测值）。

修正的方式，不同的文章大多数情况下直接给出了结果，我对此曾经很疑惑，因此本文将从两个角度来解释修正过程。

**一种方式是，从预估值角度出发。**

对于公式②，我们借鉴上述做法，同样忽略掉测量噪声 vk ，得到

zk=Hxkmeasure⇒xkmeasure=H−1zk

我们通过观测值和观测矩阵获得了和预估值相同维度的 xkmeasure ，因此将其和 xk− 作差，用来修正预估值，则有

x~k=xk−+G⋅(xkmeasure−xk−)

其中，G为系数矩阵。

这本质上和以下修正方式是同一种表述

，x~k=Axk−+Bxkmeasure，A+B=I

此时有 A=I−G,B=G 。

为进一步简化，我们不妨设 G=K⋅H ，因此有

x~k=xk−+G⋅(xkmeasure−xk−)=xk−+KH(H−1zk−xk−)=xk−+K(zk−Hxk−)

其中，K为[卡尔曼增益](https://zhida.zhihu.com/search?content_id=232573862&content_type=Article&match_order=1&q=卡尔曼增益&zhida_source=entity)，当前为未知量， x~k 为最优值，由于和当前时刻的观测量有关系，也称为**后验估计值**。

**另一种方式是，从观测值角度出发。**

同样地，对于公式②，我们忽略掉测量噪声 vk ，不同的做法是用xk− 来替代真实值，得到

zkmeasure=Hxk−

我们通过预测值和观测矩阵获得了和测量值相同维度的 zkmeasure ，用来和观测值的求误差项来修正预测值，考虑到维度可能不同等因素，我们用系数矩阵K进行修正，有

x~k=xk−+K(zk−zkmeasure)=xk−+K(zk−Hxk−)

K依然表示卡尔曼增益，因此我们从不同角度殊途同归地得到了最优估计值和预测值、观测值的关系式，并且希望求解一个合适的K，使得最优估计值最接近真实值。

### 2.3 目标函数的建立与转化

将上述思路转化为数学语言，我们设 ek=xk−x~k ，即求解最优目标函数 minK|ek| ， ek 表示最优值和真实值的误差。我们对于公式

x~k=xk−+K(zk−Hxk−) …… ③

代入公式②，并且为了构造 ek ，我们使用 xk 分别减去左右两式，有

xk−x~k=xk−xk−−K(Hxk+vk−Hxk−)=(I−KH)(xk−xk−)−Kvk

为简化表示，我们设 ek−=xk−xk−，ek− 表示预测值和真实值的误差，则有

ek=(I−KH)ek−−Kvk ……④

直接通过随机变量的关系式来求解最优目标函数显然不可行，我们通过表征随机变量的特征值来进行求解，最简单的特征值就是数学期望。不妨设：

Pk=E[ekekt] ，表示的是真实值和最优值的后验[误差协方差矩阵](https://zhida.zhihu.com/search?content_id=232573862&content_type=Article&match_order=1&q=误差协方差矩阵&zhida_source=entity)

Pk−=E[ek−ek−t] ，表示的是真实值和预测值的先验误差协方差矩阵

协方差的理解，大家可以参考引用[5]。根据 Pk 的定义，我们不难得到

Pkt=E[(ekekt)t]=E[(ekt)tekt]=E[ekekt]=Pk

同理有 Pk−=Pk−t ，下文会利用该性质进行化简。

对公式④，两边分别乘以自己的转置，并取期望，来构造协方差矩阵，有

E[ekekt]=E[((I−KH)ek−−Kvk)((I−KH)ek−−Kvk)t]=E[(I−KH)ek−ek−t(I−KH)t−(I−KH)ek−vktKt−Kvkek−t(I−KH)t+KvkvktKt]

由于测量噪声 vk 和 、、x~k、xk−、xk 无关，因此vk 和 、ek−、ek相互独立，考虑到p(vk)∼N(0,R)，则有

E[(I−KH)ek−vktKt]=(I−KH)E[ek−]E[vkt]Kt=0E[Kvkek−t(I−KH)t]=KE[vk]E[ek−t](I−KH)t=0

因此有

Pk=(I−KH)Pk−(I−KH)t+KE[vkvkt]Kt=(I−KH)Pk−(I−HtKt)+KRKt=Pk−−KHPk−−Pk−HtKt+K(HPk−Ht+R)Kt ……⑤

至此，我们将随机变量的最优化问题转化成为了纯数量问题。但还不够，很多文章在此直接对 Pk 取迹然后对卡尔曼增益K求导，然后获得使 tr(Pk) 最小的K值。事实上，如此做法的理由有以下三点：

1.  tr(Pk)→0⇔ek→0
2.  tr(Pk) 为标量函数，且为凸函数，必定有最小值
3.  tr(Pk) 对矩阵K的求导满足求导的乘积法则，如果直接使用 Pk 对K求导（矩阵对矩阵）则不满足，参考[3]

我们对上述3点做扩展证明，不感兴趣的可以跳过。

------

### 2.4 扩展证明

1.  tr(Pk)=∑i=1nE(xik−x~ik)2=∑i=1neik2

tr(Pk) 表示的是 Pk 主对角线之和，恰好为所有待估计量的方差之和，根据最小二乘法求解最小化MSE问题，存在最优解K，使得 minKtr(Pk) 最小。

对于 Pk ，根据定义，不妨使用矩阵的形式展开写下，更有利于直观性地理解，注意矩阵维度是n×n，k是时刻的代表

Pk=(E(x1k−x~1k)2E(x1k−x~1k)(x2k−x~2k)⋯⋯E(x2k−x~2k)(x1k−x~1k)E(x2k−x~2k)2⋯⋯⋯⋯⋯⋯⋯⋯⋯E(xnk−x~nk)2)

\2. 标量函数（迹）对矩阵求导的基础知识

设有 Y=tr(AX) ，A、X均为n×n的方阵，A是系数矩阵，与X中变量无关，A按行向量展开， αi 为对应行向量，X按列向量展开， βi 为对应列向量，如下所示
$$
A = \begin{pmatrix}
\alpha_1\\
\alpha_2\\
...\\
\alpha_n
\end{pmatrix}=
\begin{pmatrix}
a_{11}&a_{12}&...&a_{1n}\\
a_{21}&a_{22}&...&a_{2n}\\
...&...&...&...\\
a_{n1}&a_{n2}&...&a_{nn}\\
\end{pmatrix}

\\

X = \begin{pmatrix}
\beta_1&
\beta_2&
...&
\beta_n
\end{pmatrix}=
\begin{pmatrix}
x_{11}&x_{12}&...&x_{1n}\\
x_{21}&x_{2}&...&x_{2n}\\
...&...&...&...\\
x_{n1}&x_{n2}&...&x_{nn}\\
\end{pmatrix}
\\
AX = \begin{pmatrix}
\alpha_1\beta_1&\alpha_1\beta_2&...&\alpha_1\beta_n\\
\alpha_2\beta_1&\alpha_2\beta_2&...&\alpha_2\beta_n\\
\alpha_n\beta_1&\alpha_n\beta_2&...&\alpha_n\beta_n\\
\end{pmatrix}
$$




因此有，
$$
Y=tr(AX) = \sum_{i=1}^n \alpha_i\beta_i
$$


对于标量函数f(x)而言，对矩阵X导数的定义(按分母布局)如下：
$$
\frac{\partial f(x)}{\partial X} = \begin{pmatrix}
\frac{\partial f(x)}{\partial x_{11}}&\frac{\partial f(x)}{\partial x_{12}}&...&\frac{\partial f(x)}{\partial x_{1n}}\\
\frac{\partial f(x)}{\partial x_{21}}&\frac{\partial f(x)}{\partial x_{22}}&...&\frac{\partial f(x)}{\partial x_{2n}}\\
...&...&...&...\\
\frac{\partial f(x)}{\partial x_{n1}}&\frac{\partial f(x)}{\partial x_{n2}}&...&\frac{\partial f(x)}{\partial x_{nn}}
\end{pmatrix}
$$
因此，迹Y对矩阵X的导数如下：
$$
C=\frac{∂Y}{∂X}=\begin{pmatrix}
\frac{\partial\sum_{\alpha_i}^{\beta_i}}{\partial{x_{11}}}&\frac{\partial\sum_{\alpha_i}^{\beta_i}}{\partial{x_{12}}}&...&\frac{\partial\sum_{\alpha_i}^{\beta_i}}{\partial{x_{1n}}}\\
\frac{\partial\sum_{\alpha_i}^{\beta_i}}{\partial{x_{21}}}&\frac{\partial\sum_{\alpha_i}^{\beta_i}}{\partial{x_{22}}}&...&\frac{\partial\sum_{\alpha_i}^{\beta_i}}{\partial{x_{2n}}}\\
...&...&...&...\\
\frac{\partial\sum_{\alpha_i}^{\beta_i}}{\partial{x_{n1}}}&\frac{\partial\sum_{\alpha_i}^{\beta_i}}{\partial{x_{n2}}}&...&\frac{\partial\sum_{\alpha_i}^{\beta_i}}{\partial{x_{nn}}}\\
\end{pmatrix}
$$
$ 

不妨分析C的第i行第j列元素，有
$$
C_{ij}=\frac{\partial\sum_{i=1}^n \alpha_i\beta_i}{\partial x_{ij}}
$$
其中，
$$
\sum_{i=1}^n α_iβ_i=a_{11}x_{11}+a_{12}x_{12}+⋯+a_{1n}x_{1n}+a_{21}x_{12}+a_{22}x_{22}+⋯+a_{2n}x_{n2}+⋯+a_{ji}x_{ij}+⋯+a_{n1}x_{1n}+a_{n2}x_{2n}+⋯+a_{nn}x_{nn}
$$
显然与 $x_{ij}$有关的有且仅有系数$ a_{ji}$ ，因此有 $C_{ij}=a_{ji}$ ，则有
$$
C=\frac{∂Y}{∂X}=\begin{pmatrix}
a11&a21&⋯&an1 \\
a12&a22&⋯&an2\\
⋯&⋯&⋯&⋯\\
a1n&a2n&⋯&ann
\end{pmatrix} = A^T
$$




结论是：

$\frac{∂tr(AX)}{∂X}=AT$

\3. 类比2的推导过程，我们不加证明地给出以下关于迹的结论：

结论1：$ \frac{∂tr(AX)}{∂X}=AT$

结论2： $\frac{∂tr(XA)}{∂X}=AT$

结论3： $\frac{∂tr(XAXT)}{∂X}=(AX^T+A^TX^T)T=X(A+A^T)$

结论4： $\frac{∂tr(X^TAX)}{∂X}=(X^TA+X^TA^T)^T=(A+A^T)X$

结论5： $\frac{∂tr(P)}{∂X}=\frac{∂tr(P^T)}{∂X}$

------

### 2.5 卡尔曼增益求解和协方差矩阵化简

根据上述扩展知识，我们求解最优卡尔曼增益K，有

∂tr(Pk)∂K=∂tr(Pk−)∂K−∂tr(KHPk−)∂K−∂tr(Pk−HtKt)∂K+∂tr(K(HPk−Ht+R)Kt)∂K=0−(HPk−)t−(HPk−t)t+K[(HPk−Ht+R)+(HPk−Ht+R)t]=−2Pk−Ht+2K(HPk−Ht+R)=0

第一项是因为 Pk− 和K无关，认为是常数，所以导数为0，第二项利用了结论2，第三项利用了结论2和结论5，第四项利用了结论3。总之，我们得到

K=Pk−Ht(HPk−Ht+R)−1 ……⑥

代入到公式⑤，对 Pk 化简，则有

（）Pk=Pk−−KHPk−−Pk−HtKt+Pk−HtKt=（I−KH）Pk− ……⑦

借鉴上述整个推导过程，对于有运动模型得到的预测值公式，

xk−=Fx~k−1+Buk−1

为了构建 ek− ，两边同时减去 xk ，并取负号，有

$xk−xk−=xk−Fx~k−1−Buk−1=Fxk−1+Buk−1+wk−Fx~k−1−Buk−1=F(xk−1−x~k−1)+wk$

即

ek−=Fek−1+wk

类似构建 Pk 的方式，同样构建 Pk− ，两边同时乘以自身的转置，再考虑到 $wk $和$ ek−1$ 互相独立，有

$E[ek−ek−t]=E[(Fek−1+wk)(Fek−1+wk)t]=E[Fek−1ek−1tFt+wkwkt]$

则

$Pk−=FPk−1Ft+Q ……$⑧

至此，我们已经获得了完整的卡尔曼滤波预测、更新的公式。

### 2.6 总结

我们对上文做一个系统性的总结。

首先，我们对实际问题进行建模，获得运动模型和观测模型：

运动模型： $xk=Fxk−1+Buk−1+wk ……$①

观测模型：$ zk=Hxk+vk ……$②

其次，我们通过无偏估计的假设和误差定义，获得最优估计值和协方差矩阵的表达式

最优估计值：$ x~k=xk−+K(zk−Hxk−) ……$③

后验误差： $ek=(I−KH)ek−−Kvk ……$④

后验误差协方差矩阵： $Pk=E[ekekt]=Pk−−KHPk−−Pk−HtKt+K(HPk−Ht+R)Kt ……$⑤

再次，我们构建了目标函数，并将其转化为对迹函数的求解，从而得到卡尔曼增益

卡尔曼增益：$ K=Pk−Ht(HPk−Ht+R)−1 ……$⑥

后验误差协方差矩阵： $（）Pk=（I−KH）Pk− ……$⑦

最后，我们照葫芦画瓢，获得先验误差协方差矩阵的求解

先验误差：$ ek−=Fek−1+wk$

先验误差协方差矩阵：$ Pk−=E[ek−ek−t]=FPk−1Ft+Q ……$⑧

预测值： $xk−=Fx~k−1+Buk−1 ……$⑨

整个线性卡尔曼滤波过程的核心部分见封面图。

在实际的项目中，需结合具体的传感器和工况来构建运动模型和观测模型，几乎很少直接使用线性卡尔曼滤波，更多地是使用扩展卡尔曼滤波（EKF）、误差卡尔曼滤波（ESKF）、多状态约束卡尔曼滤波（MSCKF）等等，但其核心是将各类状态方程经过一些数学推导线性化，然后再使用线性卡尔曼滤波。因此，掌握最基本的卡尔曼滤波原理是非常有必要的，限于本人水平，因此存在疏漏、部分用词不准确的地方，请大家指正，互相讨论，共同进步。

下面，我将用python代码实现卡尔曼滤波，参考了[6]，对于python语法熟悉的读者，推荐直接阅读代码2，并结合上述总结中提到的公式（除④⑤之外，其他均有体现），对比学习，加深理解。

## 三、代码实现

### 3.1 代码1（变量形式）

```text
# -*- coding: utf-8 -*-
"""
@对理想的一维匀加速直线运动模型，配有不精确的imu和不精确的gps，进行位置观测
"""
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(1,100,100) # 在1~100s内采样100次
a = 0.6 # 加速度值，匀加速直线运动模型
v0 = 0 # 初始速度
s0 = 0 # 初始位置
m_var = 120**2 #这是我们自己设定的位置测量仪器的方差，越大则测量值占比越低，Q~N(0,m_var)
v_var = 50**2 # 速度测量仪器的方差（这个方差在现实生活中是需要我们进行传感器标定才能算出来的，可搜Allan方差标定），R~N(0,v_var)
nums = t.shape[0]

# 根据理想模型推导出来的真实位置值，实际生活中不会存在如此简单的运动模型，真实位置也不可知，本程序中使用真值的目的是模拟观测噪声数据和测量噪声数据
# 对于实际应用的卡尔曼滤波而言，并不需要知道真实值，而是通过预测值和观测值，来求解最优估计值，从而不断逼近该真值
real_positions = [0] * nums
real_positions[0] = s0
# 实际观测值，通过理论值加上观测噪声模拟获得，初值即理论初始点加上观测噪声
measure_positions = [0] * nums
measure_positions[0] = real_positions[0] + np.random.normal(0, m_var**0.5)
# 不使用卡尔曼滤波，也不使用实际观测值修正，单纯依靠运动模型来预估的预测值，仅初值由观测值决定
predict_positions = [0] * nums
predict_positions[0] = measure_positions[0]
# 最优估计值，也就是卡尔曼滤波输出的真实值的近似逼近，同样地，初始值由观测值决定
optim_positions = [0] * nums
optim_positions[0] = measure_positions[0]
# 卡尔曼滤波算法的中间变量
pos_k_1 = optim_positions[0]

predict_var = 0
for i in range(1,t.shape[0]):
    # 根据理想模型获得当前的速度、位置真实值（实际应用中不需要）
    real_v = v0 + a * i;
    real_pos = s0 + (v0 + real_v) * i / 2
    real_positions[i] = real_pos
    # 模拟输入数据，实际应用中从传感器测量获得
    v = real_v + np.random.normal(0,v_var**0.5)
    measure_positions[i] = real_pos + np.random.normal(0,m_var**0.5)
    # 如果仅使用运动模型来预测整个轨迹，而不使用观测值，则得到的位置如下
    predict_positions[i] = predict_positions[i-1] + (v + v + a) * (i - (i - 1))/2
    # 以下是卡尔曼滤波的整个过程
    # 根据实际模型预测，利用上个时刻的位置（上一时刻的最优估计值）和速度预测当前位置
    pos_k_pred = pos_k_1 + v + a/2
    # 更新预测数据的方差
    predict_var += v_var 
    # 求得最优估计值
    pos_k = pos_k_pred * m_var/(predict_var + m_var) + measure_positions[i] * predict_var/(predict_var + m_var)
    # 更新
    predict_var = (predict_var * m_var)/(predict_var + m_var)
    pos_k_1 = pos_k
    optim_positions[i] = pos_k

plt.plot(t,real_positions,label='real positions')
plt.plot(t,measure_positions,label='measured positions')    
plt.plot(t,optim_positions,label='kalman filtered positions')
# 预测噪声比测量噪声低，但是运动模型预测值比观测值差很多，原因是在于运动模型是基于前一刻预测结果进行下一次的预测，而测量噪声是基于当前位置给出的测量结果
# 意思就是，运动模型会积累噪声，而观测结果只是单次噪声
plt.plot(t,predict_positions,label='predicted positions')

plt.legend()
plt.show()
```





真实值、测量值、优化值和预测值的轨迹曲线对比

### 3.2 代码2（矩阵形式）

```text
# -*- coding: utf-8 -*-
"""
@对理想的一维匀加速直线运动模型，配有不精确的imu和不精确的gps，进行位置观测，协方差均使用矩阵的方式表示，以适配多维特征
"""
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(1,100,100) # 在1~100s内采样100次
u = 0.6 # 加速度值，匀加速直线运动模型
v0 = 5 # 初始速度
s0 = 0 # 初始位置
X_true = np.array([[s0], [v0]])
size = t.shape[0] + 1
dims = 2 # x, v, [位置, 速度]

Q = np.array([[1e1,0], [0,1e1]]) # 过程噪声的协方差矩阵，这是一个超参数
R = np.array([[1e4,0], [0,1e4]]) # 观测噪声的协方差矩阵，也是一个超参数。
# R_var = R.trace()
# 初始化
X = np.array([[0], [0]]) # 估计的初始状态，[位置, 速度]，就是我们要估计的内容，可以用v0，s0填入，也可以默认为0，相差越大，收敛时间越长
P = np.array([[0.1, 0], [0, 0.1]]) # 先验误差协方差矩阵的初始值，根据经验给出
# 已知的线性变换矩阵
F = np.array([[1, 1], [0, 1]]) # 状态转移矩阵
B = np.array([[1/2], [1]]) # 控制矩阵
H = np.array([[1,0],[0,1]]) # 观测矩阵

# 根据理想模型推导出来的真实位置值，实际生活中不会存在如此简单的运动模型，真实位置也不可知，本程序中使用真值的目的是模拟观测噪声数据和测量噪声数据
# 对于实际应用的卡尔曼滤波而言，并不需要知道真实值，而是通过预测值和观测值，来求解最优估计值，从而不断逼近该真值
real_positions = np.array([0] * size)
real_speeds = np.array([0] * size)
real_positions[0] = s0
# 实际观测值，通过理论值加上观测噪声模拟获得，初值即理论初始点加上观测噪声
measure_positions = np.array([0] * size)
measure_speeds = np.array([0] * size)
measure_positions[0] = real_positions[0] + np.random.normal(0, R[0][0]**0.5)
# 最优估计值，也就是卡尔曼滤波输出的真实值的近似逼近，同样地，初始值由观测值决定
optim_positions = np.array([0] * size)
optim_positions[0] = measure_positions[0]
optim_speeds = np.array([0] * size)

for i in range(1,t.shape[0]+1):
    # 根据理想模型获得当前的速度、位置真实值（实际应用中不需要），程序中只是为了模拟测试值和比较
    w = np.array([[np.random.normal(0, Q[0][0]**0.5)], [np.random.normal(0, Q[1][1]**0.5)]])
    X_true = F @ X_true + B * u + w
    real_positions[i] = X_true[0]
    real_speeds[i] = X_true[1]
    v = np.array([[np.random.normal(0, R[0][0]**0.5)], [np.random.normal(0, R[1][1]**0.5)]])
    # 观测矩阵用于产生真实的观测数据，注意各量之间的关联
    Z = H @ X_true + v
    # 以下是卡尔曼滤波的整个过程
    X_ = F @ X + B * u
    P_ = F @ P @ F.T + Q
    # 注意矩阵运算的顺序
    K = P_@ H.T @ np.linalg.inv(H @ P_@ H.T + R)
    X = X_ + K @ (Z - H @ X_)
    P = (np.eye(2) - K @ H ) @ P_
    # 记录结果
    optim_positions[i] = X[0][0]
    optim_speeds[i] = X[1][0]
    measure_positions[i] = Z[0]
    measure_speeds[i] = Z[1]
    
t = np.concatenate((np.array([0]), t))
plt.plot(t,real_positions,label='real positions')
plt.plot(t,measure_positions,label='measured positions')    
plt.plot(t,optim_positions,label='kalman filtered positions')

plt.legend()
plt.show()

plt.plot(t,real_speeds,label='real speeds')
plt.plot(t,measure_speeds,label='measured speeds')    
plt.plot(t,optim_speeds,label='kalman filtered speeds')

plt.legend()
plt.show()
```

![img](C:/mydoc/%E5%8D%A1%E6%9B%BC%E6%BB%A4%E6%B3%A2.assets/v2-c4fe4ec51cc87706080049c524b5a0c9_1440w-174213209361968.jpg)

运动轨迹对比图

![img](C:/mydoc/%E5%8D%A1%E6%9B%BC%E6%BB%A4%E6%B3%A2.assets/v2-9d33d07b22475925cc01e9cc7e965295_1440w-174213209361970.jpg)

运动速度对比图

参考文献：

>   \1. [Understanding Kalman Filters, Part 3: Optimal State Estimator Video](https://link.zhihu.com/?target=https%3A//ww2.mathworks.cn/videos/understanding-kalman-filters-part-3-optimal-state-estimator--1490710645421.html)
>   [2. 如何通俗并尽可能详细地解释卡尔曼滤波？ - 云羽落的回答 - 知乎](https://www.zhihu.com/question/23971601/answer/839664224)
>   \3. [矩阵的求导_矩阵求导_意念回复的博客-CSDN博客](https://link.zhihu.com/?target=https%3A//blog.csdn.net/weixin_39910711/article/details/99445129)
>   \4. [卡尔曼滤波公式及参数详解_琉璃晴久的博客-CSDN博客](https://link.zhihu.com/?target=https%3A//blog.csdn.net/qq_31271805/article/details/111597741)
>   \5. [Xinyu Chen：如何直观地理解「协方差矩阵」？](https://zhuanlan.zhihu.com/p/37609917)
>   \6. [易懂]如何理解那个把嫦娥送上天的卡尔曼滤波算法Kalman filter? - 司南牧(李韬)的文章 - 知乎 https://zhuanlan.zhihu.com/p/77327349

-   