---
source: QQ群友 心随风动-灵魂如风
---
## 感谢Cuman， 感谢3F
感谢Cuman不辞辛苦为Blue Topaz主题制作的精美的示例库。感谢3F制作了如此精美并不断完善的Blue Topaz 主题。尤其是最近加入的磨砂玻璃效果，简直是让Blue Topaz 主题美不胜收！
感谢所有为这个主题做过贡献的Obsidian前辈们，感谢你们的无私帮助和真心的付出。
## 对谁有帮助？
- 😅 **Obsidian新手**
已经安装了Obsidian笔记应用，想快速掌握Obsidian使用的新手
-  😅**Blue Topaz 主题新手**
刚刚开始使用 Blue Topaz 主题的新手
-  😅 **想移植Cuman示例库全部功能的Obsidian用户**
对曾经想移植示例库全部功能但总发现有这样或那样问题的Obsidian用户
## 示例库有什么用？
-  **了解Obsidian利器**
  Cuman 用 Obsidian 的Blue Topaz 主题制作了示例库。 这个示例库不仅仅是在Obsidian中应用了Blue Topaz主题，更重要的是它扩展了Obsidian的一些常用功能，以及融合，或称为隐藏在Blue Topaz主题中令人惊叹的笔记排版效果，比如，用Obsidian呈现以康奈尔笔记的方式记笔记的可能！详见示例库[[Callout环绕布局、缩进效果示例]]。
-  **作为检验Obsidian主题的校验库**
  如果想换用其它主题，可以借助这个示例库，看一看它的效果是不是与预想的一致，可以预知已有的笔记是不是可以完美的适用新主题。
## 从哪里可以得到示例库
示例库可以从Cuman的github页面下载，[下载地址：https://github.com/cumany/Blue-topaz-examples](https://github.com/cumany/Blue-topaz-examples)
注：如果觉得示例库插件太多过于臃肿，可以下载简化版[Blue topaz example lite](https://github.com/cumany/Blue-topaz-examples/releases/tag/20220610-lite) 
如果无法访问 github，可以借助GitHub 访问助手，网上搜索： 
![[2022-06-09_234048.png|550]]

## 需要的工具
全局文本替换工具，任何可以进行全局（在一个目录下，包括子目录）文本替换的软件都可以使用。工具用来替换示例库内相关的文本。这里使用图中的工具，用这个工具来完成移植。这个工具可以在网上搜索得到。
![[2022-06-09_235013.png|550]]

### 如何迁移？
1. 将下载的示例库解压缩，解压后得到一个如图所示的目录：
   ![[2022-06-10_000838.png|550]]
   上述目录全部位于 **Blue-topaz-examples-main** 目录中。
2. 按照下图顺序执行，执行完后将示例库的文件目录改名为自己的目录结构即可。
![[2022-06-09_235926.png|550]]
		1. 点击`添加目录`将**Blue-topaz-examples-main** 目录添加到图中1的框内。当提示是否包括子目录是选择是。将要替换的文件名格式改为`*.*`
		2. 第一次使用这个工具时，点击图中2的位置左侧的`添加`，将示例库**Blue-topaz-examples-main**中每一个目录都添加到`查找串`中，并在`替换串` 中将自己想用的目录名填入。图中3的位置为你自己想用的目录（图中3的位置的目录名子为示例，可以根据需要自行设定）。
		3. 点击`批量替换`。等待替换完成就可以关闭 **全能字符串批量替换机**。 可以按左下角的**导出**， 供以后更新示例库时再次使用。也可以不导出。下次打开时这些设置是保存的。
	3. 现在回到 **Blue-topaz-examples-main** 目录，将原来的目录名都重命名为上图3内自行设定的目录名称。如果自行设定的目录使用了子目录，要将相应的目录下的文件移动到对应的子目录中。如上面的示例，模板目录由原来的88-Temple单极目录命名成了900-ObSup/910-Template二级目录， 那么，现在就要建立目录900-ObSup, 并在此目录下在建立子目录910-Templete, 然后将原来900-ObSup/910-Template目录下的所有文件移动到910-Template目录中。
	4. 至此，迁移完成。用Obsidian打开移植后的目录库，所有示例库的功能应该可以正常使用了。
```ad-warning
title: 注意：
经过上述方式替换之后，示例库应该基本上可以正常使用了。如果在打开某一笔记时发现有不想看到的内容（比如有代码出现，格式与原示例库不一样等），可以在源码模式下仔细查看笔记中有没有原来示例库的目录出现，比如88-Template，如有，替换为迁移后的目录即可。
如果使用时发现有提示找不到JS的话，可以打开QuickAdd的设置，重新设置一下就可以了。
有时迁移后会出现一些莫名奇妙的问题，解决方法是：
- 打开原始示例库，看是否有同样的问题。
- 如果迁移到了自己的库，查看插件是否和示例库中的一致，是不是缺少某些主题必须的插件。
- 有些自己库中使用的插件可能与主题有冲突。试着关闭插件逐一排除。
- 更新示例库，更新主题。
如果经过上述方法，问题仍然存在，可以到Blue Topaz 主题QQ群寻求帮助。Cuman，3F，华锋大哥等等诸多🥑Blue Topaz Themes 大佬都会热心帮助的。 
```
希望本文能让迁移🥑Blue Topaz Themes 的示例库时变得简单容易。
另外，示例库中也有更加详细的如何迁移各个主页元素的说明。如果只想迁移部分功能，可以参考[[如何移植主页的各个元素？]]和[[如何把示例库移植到你现有的库中？]]。 
