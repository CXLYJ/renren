var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url: "nourl"
        }
    }
};
var ztree;

var vm = new Vue({
    el: '#rrapp',
    data: {
        oneClass: [],
        totalData: {
            project: {
                city: '东城区',
                code: '',
                environment: '',
                id: '',
                idtftCode: '',
                name: '',
                province: '北京市',
                site: '',
                type: '',
                within: '',
            },
            building: {
                constructionMethod: '',
                fireRating: '',
                floor: '',
                height: '',
                id: '',
                seismicIntensity: '',
                seismicRating: '',
                structure: '',
            },
            companys: [],
            naturalEnvironment: {
                id: '',
                temperature: '',
                windForce: '',
                earthquake: '',
                lightning: '',
                rain: '',
                other: ''
            },
            machine: {
                id: '',
                towerCrane: '',
                constructionElevator: '',
                crane: '',
                basket: '',
                excavator: '',
                forklift: '',
                other: ''
            },
            material: {
                id: '',
                concreteIron: '',
                concrete: '',
                scaffold: '',
                template: '',
                other: ''
            },
            accidentVO: {
                id: '',
                accidentType: '',
                accidentName: '',
                accidentComment: '',
                time: '',
                numberInjury: '',
                numberDeath: '',
                pecuniaryLoss: '',
                projectDelay: '',
                provenance: '',
                url: ''
            },
            accidentReason: {
                id: '',
                accidentReason: '',
                riskLevels: []
            },
        },
        //事故风险清单
        reasonList: {},
        project1: {
            dictionaryList1: [],
            dictionaryList2: [],
        },
        building2: {
            dictionaryList1: [],
            dictionaryList2: [],
            dictionaryList3: []
        },
        naturalEnvironment3: {
            dictionaryList1: []
        },
        machine4: {
            dictionaryList1: [],
            dictionaryList2: [],
            dictionaryList3: [],
            dictionaryList4: [],
            dictionaryList5: [],
            dictionaryList6: []
        },
        material5: {
            dictionaryList1: [],
            dictionaryList2: [],
            dictionaryList3: [],
            dictionaryList4: []
        },
        accidentVO6: {
            dictionaryList1: []
        },
        eight: {
            main: '',
        },
        showList: true,
        title: null,
        roleList: {},
        user: {
            status: 1,
            deptId: null,
            deptName: null,
            roleIdList: []
        },
        happenTime: '',
        province: 0,
        city:1,
        company:{
            2001:[
                {
                    id:0,
                    companyName:'',
                    companyType:2001
                }
            ],
            2002:[
                {
                    id:0,
                    companyName:'',
                    companyType:2002
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2002
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2002
                }
            ],
            2003:[
                {
                    id:0,
                    companyName:'',
                    companyType:2003
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2003
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2003
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2003
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2003
                }
            ],
            2004:[
                {
                    id:0,
                    companyName:'',
                    companyType:2004
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2004
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2004
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2004
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2004
                }
            ],
            2005:[
                {
                    id:0,
                    companyName:'',
                    companyType:2005
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2005
                },
                {
                    id:0,
                    companyName:'',
                    companyType:2005
                }
            ]
        }
    },
    created: function () {
        this.getSelect();
    },
    mounted: function () {
        // document.getElementById('time').value = vm.totalData.accidentVO.time;
    },
    methods: {
        getSelect: function () {
            //项目类型select
            $.get(baseURL + 'sys/dict/listByType?type=project_type', function (data) {
                vm.project1.dictionaryList1 = data.dictionaryList;
            });
            //周边环境
            $.get(baseURL + 'sys/dict/listByType?type=environment', function (data) {
                vm.project1.dictionaryList2 = data.dictionaryList;
            });
            //结构类型
            $.get(baseURL + 'sys/dict/listByType?type=structure', function (data) {
                vm.building2.dictionaryList1 = data.dictionaryList;
            });
            // 施工形式
            $.get(baseURL + 'sys/dict/listByType?type=construction_method', function (data) {
                vm.building2.dictionaryList2 = data.dictionaryList;
            });
            // 抗震等级
            $.get(baseURL + 'sys/dict/listByType?type=seismic_rating', function (data) {
                vm.building2.dictionaryList3 = data.dictionaryList;
            });
            // 抗震设防烈度
            $.get(baseURL + 'sys/dict/listByType?type=seismic_intensity', function (data) {
                vm.building2.dictionaryList4 = data.dictionaryList;
            });
            // 耐火等级
            $.get(baseURL + 'sys/dict/listByType?type=fire_rating', function (data) {
                vm.building2.dictionaryList5 = data.dictionaryList;
            });
            // 降水
            $.get(baseURL + 'sys/dict/listByType?type=rain', function (data) {
                vm.naturalEnvironment3.dictionaryList1 = data.dictionaryList;
            });
            // 塔吊
            $.get(baseURL + 'sys/dict/listByType?type=tower_crane', function (data) {
                vm.machine4.dictionaryList1 = data.dictionaryList;
            });
            // 施工升降机
            $.get(baseURL + 'sys/dict/listByType?type=construction_elevator', function (data) {
                vm.machine4.dictionaryList2 = data.dictionaryList;
            });
            // 吊车
            $.get(baseURL + 'sys/dict/listByType?type=crane', function (data) {
                vm.machine4.dictionaryList3 = data.dictionaryList;
            });
            //吊篮
            $.get(baseURL + 'sys/dict/listByType?type=basket', function (data) {
                vm.machine4.dictionaryList4 = data.dictionaryList;
            });
            // 挖掘机
            $.get(baseURL + 'sys/dict/listByType?type=excavator', function (data) {
                vm.machine4.dictionaryList5 = data.dictionaryList;
            });
            // 叉车
            $.get(baseURL + 'sys/dict/listByType?type=forklift', function (data) {
                vm.machine4.dictionaryList6 = data.dictionaryList;
            });
            // 钢筋
            $.get(baseURL + 'sys/dict/listByType?type=concrete_iron', function (data) {
                vm.material5.dictionaryList1 = data.dictionaryList;
            });
            // 混凝土
            $.get(baseURL + 'sys/dict/listByType?type=concrete', function (data) {
                vm.material5.dictionaryList2 = data.dictionaryList;
            });
            // 脚手架
            $.get(baseURL + 'sys/dict/listByType?type=scaffold', function (data) {
                vm.material5.dictionaryList3 = data.dictionaryList;
            });
            // 模板
            $.get(baseURL + 'sys/dict/listByType?type=template', function (data) {
                vm.material5.dictionaryList4 = data.dictionaryList;
            });
            // 事故类型
            $.get(baseURL + 'sys/dict/listByType?type=accident_type', function (data) {
                // console.log(data)
                vm.accidentVO6.dictionaryList1 = data.dictionaryList;
            });
            $.get(baseURL + '/jky/risk/allList', function (data) {
                console.log(data)
                vm.reasonList = data;
                // console.log(data.riskList)
            });
        },
        storage: function () {
            // vm.reload();
            var that = this;
            vm.totalData.companys = that._setCompany();
            // console.log(vm.totalData.companys)
            if (that._checkForm() == false){
                alert('资料未填写完全');
                return;
             }
            vm.totalData.accidentVO.time = document.getElementById('time').value;
            $.ajax({
                type: "POST",
                url: '/jky/case/save',
                contentType: "application/json",
                data: JSON.stringify(vm.totalData),
                success: function (r) {
                    // console.log(r)
                    if (r.code === 0) {
                        alert('增加成功');
                    } else {
                        alert('增加失败');
                    }
                },
                error:function (msg) {
                    alert('请求失败');
                }
            });
            console.log('保存')

        },
        _checkForm:function(){
            vm.totalData.accidentVO.time = document.getElementById('time').value;
            var isOk = vm.totalData.project.code && vm.totalData.project.idtftCode && vm.totalData.project.within
                        && vm.totalData.project.name;
            isOk = isOk && ((vm.totalData.project.within==1 && vm.totalData.project.city) || (vm.totalData.project.within==2 && vm.totalData.project.site))
                        && vm.totalData.project.type && vm.totalData.project.environment;
            isOk = isOk && (vm.totalData.companys.length>0) && (vm.totalData.companys[0].companyName !== undefined) && vm.totalData.companys[0].companyName;
            isOk = isOk && vm.totalData.building.structure && vm.totalData.building.height && vm.totalData.building.floor
                        && vm.totalData.building.constructionMethod && vm.totalData.building.seismicRating && vm.totalData.building.seismicIntensity
                        && vm.totalData.building.fireRating;
            isOk = isOk && vm.totalData.naturalEnvironment.temperature && vm.totalData.naturalEnvironment.windForce && vm.totalData.naturalEnvironment.earthquake
                        && vm.totalData.naturalEnvironment.lightning && vm.totalData.naturalEnvironment.rain;
            isOk = isOk && vm.totalData.machine.towerCrane && vm.totalData.machine.constructionElevator && vm.totalData.machine.crane
                        && vm.totalData.machine.excavator && vm.totalData.machine.forklift;
            isOk = isOk && vm.totalData.material.concreteIron && vm.totalData.material.concrete && vm.totalData.material.scaffold
                        && vm.totalData.material.template;
            isOk = isOk && vm.totalData.accidentVO.accidentType && vm.totalData.accidentVO.accidentName && vm.totalData.accidentVO.accidentComment
                        && vm.totalData.accidentVO.time && vm.totalData.accidentVO.numberInjury && vm.totalData.accidentVO.numberDeath
                        && vm.totalData.accidentVO.pecuniaryLoss && vm.totalData.accidentVO.projectDelay;
            isOk = isOk && vm.totalData.accidentReason.accidentReason;
            return isOk;
        },
        selectItem: function (...ids) {
            var len = ids.length
            var id = ids[len - 1];
            if (vm.oneClass.indexOf(id) > -1) {
                // 选中 改变oneClass
                if (len === 3) {
                    if (vm.oneClass.indexOf(ids[1]) === -1) {
                        vm.oneClass.push(ids[1]);
                    }
                }
                if (len > 1) {
                    if (vm.oneClass.indexOf(ids[0]) === -1) {
                        vm.oneClass.push(ids[0])
                    }
                }
                // 改变riskLevels
                // 添加1级
                var index = vm.totalData.accidentReason.riskLevels.findIndex(function (item) {
                    return item.id === ids[0]
                });
                if (index === -1) {
                    vm.totalData.accidentReason.riskLevels.push(
                        {
                            "id": ids[0],
                            "name": null,
                            "nextRiskLevels": []
                        }
                    );
                    index = vm.totalData.accidentReason.riskLevels.length - 1;
                }
                if (len > 1) {
                    // 添加2级
                    var index1 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.findIndex(function (item) {
                        return item.id === ids[1]
                    });
                    if (index1 === -1) {
                        vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.push(
                            {
                                "id": ids[1],
                                "name": null,
                                "nextRiskLevels": []
                            }
                        );
                        index1 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.length - 1;
                    }
                    if (len > 2) {
                        // 添加3级
                        var index2 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.findIndex(function (item) {
                            return item.id === ids[2]
                        });
                        if (index2 === -1) {
                            vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.push(
                                {
                                    "id": ids[2],
                                    "name": null,
                                    "nextRiskLevels": []
                                }
                            )
                        }
                    }
                }
                // 添加子孙级
                if(len === 2){
                    // console.log(vm.reasonList.riskList);
                    // 遍历3级全选
                    // 第1级index
                    var index_all = vm.reasonList.riskList.findIndex(function (item) {
                        return item.id === ids[0];
                    });
                    var index = vm.totalData.accidentReason.riskLevels.findIndex(function (item) {
                        return item.id === ids[0];
                    });
                    // 第2级index
                    var index1_all = vm.reasonList.riskList[index_all].nextRiskLevels.findIndex(function (item) {
                        return item.id === ids[1];
                    });
                    var index1 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.findIndex(function (item) {
                        return item.id === ids[1];
                    });
                    for(j=0,len2=vm.reasonList.riskList[index_all].nextRiskLevels[index1_all].nextRiskLevels.length;j<len2;j++){
                        var id3 = vm.reasonList.riskList[index_all].nextRiskLevels[index1_all].nextRiskLevels[j].id;
                        var index_ids = vm.oneClass.indexOf(id3);
                        if (index_ids === -1){
                            vm.oneClass.push(id3);
                            // 第3级index
                            var index2 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.findIndex(function (item) {
                                return item.id === id3;
                            });
                            if (index2 === -1){
                                vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.push(
                                    {
                                        "id": id3,
                                        "name": null,
                                        "nextRiskLevels": []
                                    }
                                );
                            }
                        }
                    }
                } else if(len ===1){
                    // 遍历2级 3级全选
                    // 第1级index
                    var index_all = vm.reasonList.riskList.findIndex(function (item) {
                        return item.id === ids[0];
                    });
                    var index = vm.totalData.accidentReason.riskLevels.findIndex(function (item) {
                        return item.id === ids[0];
                    });
                    for(i=0,len1=vm.reasonList.riskList[index_all].nextRiskLevels.length;i<len1;i++){
                        var id2 = vm.reasonList.riskList[index_all].nextRiskLevels[i].id;
                        var index_ids = vm.oneClass.indexOf(id2);
                        if (index_ids === -1){
                            vm.oneClass.push(id2);
                            // 第2级index
                            var index1 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.findIndex(function (item) {
                                return item.id === id2;
                            });
                            if (index1 === -1){
                                vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.push(
                                    {
                                        "id": id2,
                                        "name": null,
                                        "nextRiskLevels": []
                                    }
                                );
                            }
                        }
                        for(j=0,len2=vm.reasonList.riskList[index_all].nextRiskLevels[i].nextRiskLevels.length;j<len2;j++){
                            var id3 = vm.reasonList.riskList[index_all].nextRiskLevels[i].nextRiskLevels[j].id;
                            var index_ids = vm.oneClass.indexOf(id3);
                            if (index_ids === -1){
                                vm.oneClass.push(id3);
                                // 第2级index
                                var index1 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.findIndex(function (item) {
                                    return item.id === id2;
                                });
                                // 第3级index
                                var index2 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.findIndex(function (item) {
                                    return item.id === id3;
                                });
                                if (index2 === -1){
                                    vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.push(
                                        {
                                            "id": id3,
                                            "name": null,
                                            "nextRiskLevels": []
                                        }
                                    );
                                }
                            }
                        }
                    }
                }
            } else {
                // 取消选中
                if (len === 3) {
                    // 第1级index
                    var index = vm.totalData.accidentReason.riskLevels.findIndex(function (item) {
                        return item.id === ids[0];
                    });
                    // 第2级index
                    var index1 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.findIndex(function (item) {
                        return item.id === ids[1];
                    });
                    // 第3级index
                    var index2 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.findIndex(function (item) {
                        return item.id === ids[2];
                    });
                    // riskLevels移除第3级
                    vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.splice(index2, 1);
                    // 第2级 无子元素
                    if (vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.length === 0) {
                        var index_ids = vm.oneClass.indexOf(ids[1]);
                        vm.oneClass.splice(index_ids, 1);
                        // riskLevels移除第2级
                        vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.splice(index1, 1);
                        // 第1级无子元素
                        if (vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.length === 0) {
                            var index_ids = vm.oneClass.indexOf(ids[0]);
                            vm.oneClass.splice(index_ids, 1);
                            // riskLevels移除第1级
                            vm.totalData.accidentReason.riskLevels.splice(index, 1)
                        }
                    }
                } else if (len === 2) {
                    // 第1级index
                    var index = vm.totalData.accidentReason.riskLevels.findIndex(function (item) {
                        return item.id === ids[0];
                    });
                    // 第2级index
                    var index1 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.findIndex(function (item) {
                        return item.id === ids[1];
                    });
                    // 遍历3级,去除oneClass里含3级的id
                    for (j = 0, len3 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.length; j < len3; j++) {
                        var id_3 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels[j].id;
                        var index_ids = vm.oneClass.indexOf(id_3);
                        vm.oneClass.splice(index_ids, 1);
                    }
                    // riskLevels移除第2级
                    vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.splice(index1, 1);
                    // 第1级 无元素
                    if (vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.length === 0) {
                        var index_ids = vm.oneClass.indexOf(ids[0]);
                        vm.oneClass.splice(index_ids, 1);
                        vm.totalData.accidentReason.riskLevels.splice(index, 1);
                    }
                } else {
                    // 第1级index
                    var index = vm.totalData.accidentReason.riskLevels.findIndex(function (item) {
                        return item.id === ids[0];
                    });
                    // 遍历2级
                    for (j = 0, len2 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.length; j < len2; j++) {
                        var id_2 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[j].id;
                        var index_ids = vm.oneClass.indexOf(id_2);
                        vm.oneClass.splice(index_ids, 1);
                        // 遍历3级
                        for (k = 0, len3 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[j].nextRiskLevels.length; k < len3; k++) {
                            var id_3 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[j].nextRiskLevels[k].id;
                            var index_ids = vm.oneClass.indexOf(id_3);
                            vm.oneClass.splice(index_ids, 1);
                        }
                    }
                    // riskLevels移除第1级
                    vm.totalData.accidentReason.riskLevels.splice(index, 1)
                }
            }
        },
        changeCity:function(){
            vm.totalData.project.city = cityArr[vm.province][vm.city];
            vm.totalData.project.province = provinceArr[vm.province][0];
        },
        changProvince:function(){
            vm.totalData.project.city = cityArr[vm.province][vm.city];
            vm.totalData.project.province = provinceArr[vm.province][0];
        },
        addfile: function () {
            var fbutton = document.getElementsByClassName('filebutton')[0]//dom元素
            fbutton.click();
        },
        addafter: function () {
            var fbutton = document.getElementsByClassName('filebutton')[0]//dom元素
            var reader = new FileReader();
            var file = fbutton.files[0];
            reader.readAsDataURL(file);
            var markId = sessionStorage.getItem('markId');
            var formData = new FormData();
            formData.append("accessory", file);
            formData.append("accidentId", markId);
            var date = {'accessory': file, 'accidentId': markId};
            // console.log(formData.get("accidentId"));
            $.ajax({
                type: "POST",
                url: '/jky/case/upload',
                data: formData,
                processData: false,
                contentType: false,
                success: function (r) {
                    console.log(r)
                }
            });
        },
        _setCompany:function(){
            let company =[];
            for(j=2001;j<2006;j++){
                let item = vm.company[j];
                for(i=0,len=item.length;i<len;i++){
                    let obj = item[i];
                    let companyName = obj.companyName.replace(/(^\s*)|(\s*$)/g, "");
                    if(companyName !== ""){
                        company.push(
                            {
                                "companyName":companyName,
                                "companyType":obj.companyType
                            }
                        )
                    }
                }
            }
            // console.log(company);
            return company;
        }
    }
});