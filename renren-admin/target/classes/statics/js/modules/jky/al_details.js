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
var ztree
var vm = new Vue({
    el: '#rrapp',
    data: {
        oneClass: [],
        totalData: {
            project: {
                city: '',
                code: '',
                environment: '',
                id: '',
                idtftCode: '',
                name: '',
                province: '',
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
            companys: [{id: '', companyName: '', companyType: ''}],
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
                riskLevels: [{id: '16', nextRiskLevels: []}]
            },
        },
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
        province: 0,
        city: 0,
        citys: [],
        company: {}
    },
    created: function () {
        this.getSelect();
        this.getData();
    },
    mounted: function () {
        //
        // console.log(this._data.totalData.accidentVO)
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
                vm.accidentVO6.dictionaryList1 = data.dictionaryList;
            });
            //事故风险原因
            // {id:vm.totalData.accidentReason.id,name:vm.totalData.accidentReason.accidentReason,nextRiskLevels:vm.totalData.accidentReason.riskLevels}
            $.get(baseURL + '/jky/risk/allList', function (item) {
                vm.reasonList = item;
                // console.log(item)
                var three = []
                item.riskList[0].nextRiskLevels.map((dates, index) => {
                    var ite = dates;
                    three.push(ite.nextRiskLevels)
                })
                // console.log(three)
                vm.reasonList.three = three;
                // console.log(vm.reasonList)
            })
        },
        getData: function () {
            var that = this;
            // console.log(baseURL)
            var markId = sessionStorage.getItem('markId');
            if (!markId) {
                return
            }
            $.get(baseURL + 'jky/case/info/' + markId, function (data) {
                vm.province = provinceArr.findIndex(function (item) {
                    return item[0] === data.caseInfo.project.province;
                })
                if (vm.province === -1) {
                    vm.province = 0;
                }
                vm.citys = cityArr[vm.province];
                vm.citys.shift();
                var project = JSON.stringify(data.caseInfo.project);
                vm.totalData.project.province = data.caseInfo.project.province;
                // 城市
                vm.city = cityArr[vm.province].findIndex(function (item) {
                    return item === data.caseInfo.project.city;
                });
                if(vm.city === -1){
                    vm.city = 1;
                }
                //项目信息
                vm.totalData.project = JSON.parse(project);
                // 参建单位
                vm.totalData.companys = data.caseInfo.companys;
                vm.company = that._getCompany(data.caseInfo.companys);
                // 建筑信息
                var building = JSON.stringify(data.caseInfo.building);
                vm.totalData.building = JSON.parse(building);
                var naturalEnvironment = JSON.stringify(data.caseInfo.naturalEnvironment);
                //自然环境信息
                vm.totalData.naturalEnvironment = JSON.parse(naturalEnvironment);
                //机械设备信息 machine
                var machine = JSON.stringify(data.caseInfo.machine);
                vm.totalData.machine = JSON.parse(machine);
                //物料材料 material
                var material = JSON.stringify(data.caseInfo.material);
                vm.totalData.material = JSON.parse(material);
                //事故信息 accidentVO
                var accidentVO = JSON.stringify(data.caseInfo.accidentVO);
                setTimeout(document.getElementById('time').value = data.caseInfo.accidentVO.time, 3000)
                vm.totalData.accidentVO = JSON.parse(accidentVO);
                // 事故原因 accidentReason
                var accidentReason = JSON.stringify(data.caseInfo.accidentReason);
                vm.totalData.accidentReason = JSON.parse(accidentReason);
                vm.oneClass = that._toOneArray(vm.totalData.accidentReason.riskLevels);

                // console.log('初始数据', vm.totalData)

            });
        },
        getallList: function () {
            console.log(vm.totalData)
        },
        download: function () {
            // console.log('下载')
            if (!vm.totalData.accidentVO.accessory) {
                alert('此案例无附件');
                return false;
            }
            var accidentId = sessionStorage.getItem('markId');
            // console.log(accidentId);
            window.open(baseURL + '/jky/case/download?accidentId=' + accidentId);
            // $.get(baseURL + "jky/case/download?accidentId=" + accidentId, function(data){
            //     console.log(data);
            // });
        },
        build: function () {
            console.log('新建')
            window.parent.location.hash = "#modules/jky/regularEntry.html";
        },
        deletes: function () {
            var listArr = []
            // listArr.push(vm.totalData.project.id)
            listArr.push(vm.totalData.accidentVO.id)
            console.log(listArr)
            if (vm.totalData.project)
                $.ajax({
                    type: "POST",
                    url: '/jky/case/delete',
                    contentType: "application/json",
                    data: JSON.stringify(listArr),
                    success: function (r) {
                        console.log(r)
                        if (r.code == 0) {
                            layer.alert('删除成功', {icon: 6}, function (index) {
                                layer.close(index);
                                window.location.href = document.referrer;
                                window.history.back(-1);
                            });
                            // window.parent.location.hash = "#modules/jky/caseList.html";
                        }
                    }
                });
            console.log('删除')
        },
        storage: function () {
            vm.totalData.accidentVO.time = document.getElementById('time').value;
            let that = this;
            vm.totalData.companys = that._setCompany();
            console.log();
            $.ajax({
                type: "POST",
                url: '/jky/case/update',
                contentType: "application/json",
                data: JSON.stringify(vm.totalData),
                success: function (r) {
                    // console.log(r)

                    if (r.code === 0) {
                        alert('更新成功');
                    } else {
                        alert('更新失败');
                    }
                }
            });
        },
        addfile: function () {
            var fbutton = document.getElementsByClassName('filebutton')[0]//dom元素
            fbutton.click();
        },
        changeCity: function () {
            vm.totalData.project.city = cityArr[vm.province][vm.city];
            vm.totalData.project.province = provinceArr[vm.province][0];
        },
        changProvince: function () {
            vm.totalData.project.city = cityArr[vm.province][vm.city];
            vm.totalData.project.province = provinceArr[vm.province][0];
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
                    if(r.code == 0){
                        layer.msg('上传成功');
                    }
                }
            });
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
                if (len === 2) {
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
                    for (j = 0, len2 = vm.reasonList.riskList[index_all].nextRiskLevels[index1_all].nextRiskLevels.length; j < len2; j++) {
                        var id3 = vm.reasonList.riskList[index_all].nextRiskLevels[index1_all].nextRiskLevels[j].id;
                        var index_ids = vm.oneClass.indexOf(id3);
                        if (index_ids === -1) {
                            vm.oneClass.push(id3);
                            // 第3级index
                            var index2 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.findIndex(function (item) {
                                return item.id === id3;
                            });
                            if (index2 === -1) {
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
                } else if (len === 1) {
                    // 遍历2级 3级全选
                    // 第1级index
                    var index_all = vm.reasonList.riskList.findIndex(function (item) {
                        return item.id === ids[0];
                    });
                    var index = vm.totalData.accidentReason.riskLevels.findIndex(function (item) {
                        return item.id === ids[0];
                    });
                    for (i = 0, len1 = vm.reasonList.riskList[index_all].nextRiskLevels.length; i < len1; i++) {
                        var id2 = vm.reasonList.riskList[index_all].nextRiskLevels[i].id;
                        var index_ids = vm.oneClass.indexOf(id2);
                        if (index_ids === -1) {
                            vm.oneClass.push(id2);
                            // 第2级index
                            var index1 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.findIndex(function (item) {
                                return item.id === id2;
                            });
                            if (index1 === -1) {
                                vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.push(
                                    {
                                        "id": id2,
                                        "name": null,
                                        "nextRiskLevels": []
                                    }
                                );
                            }
                        }
                        for (j = 0, len2 = vm.reasonList.riskList[index_all].nextRiskLevels[i].nextRiskLevels.length; j < len2; j++) {
                            var id3 = vm.reasonList.riskList[index_all].nextRiskLevels[i].nextRiskLevels[j].id;
                            var index_ids = vm.oneClass.indexOf(id3);
                            if (index_ids === -1) {
                                vm.oneClass.push(id3);
                                // 第2级index
                                var index1 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels.findIndex(function (item) {
                                    return item.id === id2;
                                });
                                // 第3级index
                                var index2 = vm.totalData.accidentReason.riskLevels[index].nextRiskLevels[index1].nextRiskLevels.findIndex(function (item) {
                                    return item.id === id3;
                                });
                                if (index2 === -1) {
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
        _setCompany: function () {
            let company = [];
            for (j = 2001; j < 2006; j++) {
                let item = vm.company[j];
                for (i = 0, len = item.length; i < len; i++) {
                    let obj = item[i];
                    let companyName = obj.companyName.replace(/(^\s*)|(\s*$)/g, "");
                    if (companyName !== "") {
                        company.push(
                            {
                                "companyName": companyName,
                                "companyType": obj.companyType
                            }
                        )
                    }
                }
            }
            // console.log(company);
            return company;
        },
        _toOneArray: function (data) {
            var arr = [];
            for (i = 0, len = data.length; i < len; i++) {
                arr.push(data[i].id);
                if (data[i].hasOwnProperty('nextRiskLevels') && data[i].nextRiskLevels) {
                    for (j = 0, len1 = data[i].nextRiskLevels.length; j < len1; j++) {
                        arr.push(data[i].nextRiskLevels[j].id);
                        if (data[i].nextRiskLevels[j].hasOwnProperty('nextRiskLevels') && data[i].nextRiskLevels[j].nextRiskLevels) {
                            for (k = 0, len2 = data[i].nextRiskLevels[j].nextRiskLevels.length; k < len2; k++) {
                                arr.push(data[i].nextRiskLevels[j].nextRiskLevels[k].id);
                            }
                        }
                    }
                }
            }
            return arr;
        },
        _getCompany: function (items) {
            var companys = {
                2001: [],
                2002: [],
                2003: [],
                2004: [],
                2005: []
            };
            items.forEach(function (item) {
                if ([2001, 2002, 2003, 2004, 2005].indexOf(item.companyType) > -1) {
                    companys[`${item.companyType}`].push(item);
                }
            })
            if (companys[2001].length < 1) {
                companys[2001].push(
                    {
                        companyName: '',
                        companyType: 2001
                    }
                )
            }
            if (companys[2002].length < 3) {
                for (let i = 0, len = companys[2002].length; i < 3 - len; i++) {
                    companys[2002].push(
                        {
                            companyName: '',
                            companyType: 2002
                        }
                    )
                }
            }
            if (companys[2003].length < 5) {
                for (let i = 0, len = companys[2003].length; i < 5 - len; i++) {
                    companys[2003].push(
                        {
                            companyName: '',
                            companyType: 2003
                        }
                    )
                }
            }
            if (companys[2004].length < 5) {
                for (let i = 0, len = companys[2004].length; i < 5 - len; i++) {
                    companys[2004].push(
                        {
                            companyName: '',
                            companyType: 2004
                        }
                    )
                }
            }
            if (companys[2005].length < 3) {
                for (let i = 0, len = companys[2005].length; i < 3 - len; i++) {
                    companys[2005].push(
                        {
                            companyName: '',
                            companyType: 2005
                        }
                    )
                }
            }
            return companys;
        },
        returns: function () {
            window.location.href = document.referrer;
            window.history.back(-1);
        }
    }
});