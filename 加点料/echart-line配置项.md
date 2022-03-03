* `title` 标题组件，包含主标题和副标题。默认在左上角的那个灰色的超级大的标题
```
title: {
    show: true,
    text: '我是主标题',
    textStyle: {
        fontSize: 12, // 标题字体大小
        color: 'red' // 标题颜色
    }
},
```

* `legend` 图例组件。可以通过点击图例控制哪些系列不显示，这里用得最多的是控制图例显隐与位置。
```
legend: {
    show: true, // 默认为true,可以设置false不显示
    right: '10%', // 控制图例显示的位置，默认居中。这里值可以为数值或百分比
    top: 'top',
},
```

* `grid` 直角坐标系内绘图网格,默认是不显示网格的。这里用得最多的是利用 grid 来控制图表的**拉伸**
```
grid: {
    top: '5%', // grid 组件距离 容器顶部的距离
    left: '2%', // grid 组件距离 容器左侧的距离
    bottom: "15%",
    right: "3%"
},
```

* `xAixs` 直角坐标系 grid 中的 x 轴.可以为数组，也可以为对象。为对象时表示只有一个x轴，如果是数组是多根x轴的配置。一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。默认的x轴常用的配置：
```
xAxis: [{
    type: "category", // 类型
    boundaryGap: false, // 起始和结束两端空白策略: false-不留白， true-两端空白
    axisTick: { // 坐标轴刻度相关设置
        show: true, // 是否显示坐标轴刻度
        alignWithLabel: true // 显示在区间还是刻度线上，true-显示在刻度上，false-显示在区间
    },
    axisLine: { // 轴线相关设置
        lineStyle: {
            color: "red"
        }
    },
    axisLabel: { // 轴线上的刻度文字设置
        fontSize: 8,
        formatter: function (value, index) { // x轴label文字格式化
            return value.slice(5, value.length)
        },
        margin: 20, // 刻度标签与轴线之间的距离。
    },
    data: ["2020/11/07", "2020/11/11", "2020/11/15", "2020/11/19", "2020/11/23", "2020/11/27", "2020/12/01"],
}],
```

* `yAixs` 直角坐标系 grid 中的 y 轴, 也可以为数组和对象，原理同x轴。x轴和y轴的配置基本相同。
```
yAxis: [{
    type: "value", // y轴label文字类型
    name: "百分比", // y轴需要显示的名称
    min: 0, // 坐标轴最小值，当然也可以设置max最大值
    max: 100,
    interval:25, // 步长
    splitNumber: 5, // 分割段数，默认为5
    position: "right", // 坐标轴位置，因为可能有多个坐标（y）轴
    splitLine: { // y轴分割线相关设置
        show: true,
        lineStyle: {
            type: "solid",
            color: "#124977"
        }
    },
    axisLine: { // 坐标轴线
        show: false, // 默认显示，属性show控制显示与否, false-不显示
        lineStyle: { // 属性lineStyle控制线条样式
            color: '#48b',
            width: 2,
            type: 'solid'
        }
    },
    axisTick: { // 坐标轴小标记
        show: false, // 属性show控制显示与否，默认不显示, false-不显示
        interval: 'auto',
        inside: false, // 控制小标记是否在grid里 
        length: 5, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
            color: '#333',
            width: 1
        }
    },
    axisLabel: { // 轴线上的刻度文字设置
        show: true,
        interval: "auto",
        formatter: "{value}%", // 显示百分比
        margin: 20,
    },
}],
```

* `series` 系列列表。每个系列通过 type 决定自己的图表类型
```
series: [{
    type: 'line',
    showSymbol: false,
    symbol:'circle', // 拐点处显示实心原点
    areaStyle: { // 折线与区域样式
        normal: {
            color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: "#f59a23"  // 0% 处的颜色
                }, {
                    offset: 0.5,
                    color: "rgba(245,154,35,0)" // 100% 处的颜色
                }],
            }
        }
    },
    data: [55, 70, 52, 89, 97, 65, 62]
}, {
    name: "molecular",
    type: 'line',
    data: [123, 123, 123, 123, 123, 123, 123],

    // 配置隐藏该折线
    symbolSize: 0, // symbol的大小设置为0
    showSymbol: false, // 不显示symbol
    lineStyle: {
        width: 0, // 线宽是0
        color: 'rgba(0, 0, 0, 0)' // 线的颜色是透明的
    },
}, {
    name: "denominator",
    type: 'line',
    data: [456, 456, 456, 456, 456, 456, 456],
}],
```

* `tooltip` 提示框。
```
tooltip: {
    trigger: 'axis',
    backgroundColor: "white",
    borderRadius: 4,           // 提示边框圆角，单位px，默认为4
        borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
                                   // 接受数组分别设定上右下左边距，同css
    textStyle: {
        color: "#c280ff"
    },
    formatter: function (params) { // params 中的数据对象，有几个对象，params 的长度就为多少，顺序同声明时的顺序
        var showHtm = "";
        var name = params[0].name;
        var ratio = params[0].data + '%';
        var molecular = params[1].data;
        var denominator = params[2].data;
        showHtm += `
            <div class="chart_tips">
                <p class="chart_time">${name}</p>
                <div>
                    <span class="chart_ratio">${ratio}</span>
                    <div class="chart_fraction">
                        <div class="molecular">${molecular}</div>
                        <div style="border: 1px solid #c280ff;"></div>
                        <div class="denominator">${denominator}</div>
                    </div>
                </div>
            </div>`;
        return showHtm;
    }
},
```