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
            {label: '死亡人数', name: 'numberDeath', index: "number_death", sorttype: "integer", width: 50},
            {label: '经济损失（万元）', name: 'pecuniaryLoss', index: "pecuniary_loss", sorttype: "integer", width: 50},
            {label: '下载', name: 'toll', layEven: 'accidentId', sortable: false, width: 35},
        ],
        sortable: true,
        sortname:'id',
        sortorder:'desc',
        viewrecords: false,
        height: 600,
        rowNum: 10,
        rowList: false,
        rownumbers: true,
        rownumWidth: 30,
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
        q: {
            username: null
        },
        showList: true,
        title: null,
        roleList: {},
        user: {
            status: 1,
            deptId: null,
            deptName: null,
            roleIdList: []
        }
    },
    methods: {
        query: function () {
            vm.reload();
        }
    }
});