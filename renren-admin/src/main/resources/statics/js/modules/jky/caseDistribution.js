// 基于准备好的dom，初始化echarts实例
layui.use('element', function () {
    var element = layui.element();
});
var vm = new Vue({
    el: '#rrapp',
    data: {
        accidentTypes:[],
        cityData:[]
    },
    created: function () {
        // this.getSelect();
        this.getData();
    },
    mounted: function () {
        //
        // console.log(this._data.totalData.accidentVO)
    },
    methods: {
        getData: function () {
            $.get(baseURL + 'sys/dict/listByType?type=accident_type', function (data) {
                vm.accidentTypes = data.dictionaryList;
            });
            $.get(baseURL + 'jky/map/city', function (data) {
                vm.cityData = replaceProvince(data.cityData);
            });
        }
    }
});
$.get(baseURL + 'jky/map/city', function (data) {
    var china = replaceProvince(data.cityData);
    China(china);
});
$('.layui-tab-title li').click(function () {
    var index = $(this).attr('data-index');
    if (index == 0) {
        $('.layui-tab-content').css('background', 'white');
        //地图
        China(vm.$data.cityData);
        return
    }
    if (index == 1) {
        $('.layui-tab-content').css('background', 'white')
        $.get(baseURL + '/jky/map/time/1', function (data) {
            var china = data.cityData;
            Histogram(data.timeData)
        });
        return
    }
    if (index == 2) {
        $('.layui-tab-content').css('background', '#ccc')
        // console.log(vm.$data.accidentTypes);
        //案列类型
        $.get(baseURL + 'jky/map/type', function (data) {
            data.typeData.forEach(function (item,index) {
               let i = vm.$data.accidentTypes.findIndex(function (obj) {
                  return obj.code == item.name;
               })
                data.typeData[index].name = vm.$data.accidentTypes[i].value;
            });
            console.log(data.typeData);
            TypeCase(data.typeData)
        });

        $.get(baseURL + 'jky/map/die', function (data) {
            Death(data.dieData);
        });
        return
    }
    if (index == 3) {
        $('.layui-tab-content').css('background', 'white')
        $.get(baseURL + '/jky/map/risk', function (data) {
            Weight(data.riskData);
        });
        return
    }
})



$(".form-group .layui-btn").click(function () {
    var index = $(this).attr('data-index');
    $.get(baseURL + '/jky/map/time/' + index, function (data) {
        Histogram(data.timeData)
    });
})

function China(china) {
    var China = echarts.init(document.getElementById('main'));
    var option = {
        title: {
            text: '案例分布图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        //配置属性
        series: [{
            name: '数据',
            type: 'map',
            mapType: 'china',
            roam: true,
            label: {
                normal: {
                    show: true  //省份名称
                },
                emphasis: {
                    show: false
                }
            },
            data: china
        }]
    };
    China.setOption(option);
}

//柱状图
function Histogram(histograms) {
    var listTime = [];
    var listCent = [];
    for (var i = 0; i < histograms.length; i++) {
        listTime.push(histograms[i].time);
        listCent.push(histograms[i].num);
    }
    var myChart = echarts.init(document.getElementById('histogram'));
    var option = {
        xAxis: {
            data: listTime,
            axisTick: {show: false},
            axisLabel: {
                interval: 0,
                rotate: 40
            },
            name:'事故发生的年份',
            nameGap: 50,
            nameLocation:'center',
        },
        yAxis: {
            splitLine: {show: false},
            name:'事故发生数量',
            nameGap: 30,
            nameLocation:'center',
        },
        animationDurationUpdate: 1200,
        series: [{
            type: 'bar',
            silent: true,
            data: listCent,
            legendHoverLink: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: '#666',
                            fontSize: 12
                        }
                    }
                }
            },
        }]
    };
    myChart.setOption(option);
}

//柱状图
function Death(histograms) {
    var listTime = [];
    var listCent = [];
    for (var i = 0; i < histograms.length; i++) {
        listTime.push(histograms[i].die);
        listCent.push(histograms[i].num);
    }
    var myChart = echarts.init(document.getElementById('death'));
    var option = {
        xAxis: {
            data: listTime,
            axisTick: {show: false},
            name:'单次事故死亡人数',
            nameGap: 30,
            nameLocation:'center',
        },
        yAxis: {
            splitLine: {show: false},
            nameGap:25,
            name:'事故发生次数',
            nameLocation:'center',
        },
        animationDurationUpdate: 1200,
        series: [{
            type: 'bar',
            silent: true,
            data: listCent,
            legendHoverLink: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: '#666',
                            fontSize: 12
                        }
                    }
                }
            },
        }]
    };
    myChart.setOption(option);
}

//饼图
function TypeCase(histograms) {
    var listName = [];
    for (var i = 0; i < histograms.length; i++) {
        listName.push(histograms[i].name);
    }
    var myChart = echarts.init(document.getElementById('typeCase'));
    // console.log(myChart)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: listName,
        },
        series: [
            {
                name: '类型',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: histograms,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}

//折线图
function Weight(weight) {
    var listName = [];
    var listCent = [];
    for (var i = 0; i < weight.length; i++) {
        listName.push(weight[i].name);
        listCent.push(weight[i].num);
    }
    var myChart = echarts.init(document.getElementById('weight'));
    var option = {
        grid: {
            y2: 160
        },
        xAxis: {
            data: listName,
            type: 'category',
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    //x轴的文字改为竖版显示
                    var str = value.split("");
                    return str.join("\n");
                }
            }
        },
        yAxis: {
            type: 'value'
        },
        animationDurationUpdate: 1200,
        series: [{
            type: 'line',
            data: listCent
        }]
    };
    myChart.setOption(option);
}
function replaceProvince(data) {
    var oldProvinceArr = ['北京市','天津市','上海市','重庆市','河北省','河南省','云南省','辽宁省','黑龙江省','湖南省','安徽省','山东省','新疆维吾尔自治区','江苏省','浙江省','江西省','湖北省','广西壮族','甘肃省','山西省','内蒙古自治区','陕西省','吉林省','福建省','贵州省','广东省','青海省','西藏','四川省','宁夏回族','海南省','台湾省','香港特别行政区','澳门特别行政区'];
    var newProvinceArr = ['北京','天津','上海','重庆','河北','河南','云南','辽宁','黑龙江','湖南','安徽','山东','新疆','江苏','浙江','江西','湖北','广西','甘肃','山西','内蒙古','陕西','吉林','福建','贵州','广东','青海','西藏','四川','宁夏','海南','台湾','香港','澳门'];
    for(var i=0,len=data.length;i<len;i++){
        var index = oldProvinceArr.findIndex(function (item) {
            return item == data[i].name;
        })
        if (index !== -1){
            data[i].name = newProvinceArr[index];
        }
    }
    return data;
}