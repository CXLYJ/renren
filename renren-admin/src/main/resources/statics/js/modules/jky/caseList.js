$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'jky/case/list',
        datatype: "json",
        colModel: [
            {label: '事件ID', name: 'accidentId', index: "id", width: 30, key: true},
            {label: '事故名称', name: 'projectName', index: "accident_name", width: 85},
            {
                label: '事故发生时间',
                name: 'accidentTime',
                index: "time",
                width: 65,
                formatter: dateFmatter
            },
            {label: '项目地点', name: 'projectSite', index: "project_site", width: 110},
            {label: '事故类型', name: 'accidentType', index: "accident_type", width: 50},
            {label: '重伤人数', name: 'numberInjury', index: "number_injury", sorttype: "integer", width: 40},
            {label: '死亡人数', name: 'numberDeath', index: "number_death", sorttype: "integer", width: 40},
            {label: '经济损失（万元）', name: 'pecuniaryLoss', index: "pecuniary_loss", sorttype: "integer", width: 50},
            {
                label: '下载', name: 'toll', id: 'accidentId', sortable: false, width: 45, formatter: function () {
                    return '<span class="label label-success download">下载</span>'
                }
            },
        ],
        sortable: true,
        even: true,
        viewrecords: true,
        height: 480,
        rowNum: 12,
        rowList: false,
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: false,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
    $("#jqGrid").on('click', 'tr', function (event) {
        // window.Router.go('al_details.html')
        sessionStorage.setItem('markId', this.id);
        window.parent.location.hash = "#modules/jky/al_details.html";
        window.location.href = "al_details.html";
        // window.parent.location.href = window.parent.location.origin + '/index.html#modules/jky/al_details.html?id=123'
        // console.log(window.Router)
    })
    $("#jqGrid").on('click', '.download', function (event) {
        event.stopPropagation();
        console.log(this.parentNode.parentNode.getAttribute('id'));
        var downloadId = this.parentNode.parentNode.getAttribute('id');
        window.open(baseURL + '/jky/case/download?accidentId=' + downloadId);
        // $.get(baseURL + '/jky/case/download?accidentId=' + downloadId, function (data) {
        //     console.log(data)
        // });
    })
    window.parent.location.hash = "#modules/jky/caseList.html";
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });
});
function dateFmatter (cellvalue, options, rowObject)
{
    var pattern = /^\d{8}/g;
    if(pattern.test(cellvalue) === true){
        return cellvalue.replace(/^(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3").substr(0,10);
    } else {
        return cellvalue.substr(0,10);
    }
}
var vm = new Vue({
    el: '#rrapp',
    data: {
        type: [],
        q: {
            roleName: null,
            startTime: '',
            endTime: '',
            place: '',
            accidentType: '',
        },
    },
    created: function () {
        this.getSelect();
    },
    methods: {
        getSelect: function () {
            $.get(baseURL + 'sys/dict/listByType?type=accident_type', function (data) {
                vm.type = data.dictionaryList;
                console.log(vm.type)
            });
        },
        query: function () {
            vm.q.startTime = document.getElementById('LAY_demorange_s').value;
            vm.q.endTime = document.getElementById('LAY_demorange_e').value;
            vm.reload();
        },
        getTime: function (event) {
            console.log(event.target.valueOf())

        },
        download: function () {
            console.log('下载')
        },
        build: function () {
            console.log('新建')
            window.parent.location.hash = "#modules/jky/regularEntry.html";
        },
        reload: function (event) {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'projectName': vm.q.roleName,
                    'startTime': vm.q.startTime,
                    'endTime': vm.q.endTime,
                    'projectSite': vm.q.place,
                    'accidentType': vm.q.accidentType
                },
                page: page
            }).trigger("reloadGrid");
        }
    }
});