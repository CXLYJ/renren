$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/user/applyList',
        datatype: "json",
        colModel: [
            { label: '用户ID', name: 'userId',index: "userId", width: 20, key: true },
			{ label: '姓名', name: 'name', width: 75 },
			{ label: '手机号', name: 'username', width: 100 },
            { label: '工号', name: 'jobNumber', width: 90 },
			{ label: '审核状态', name: 'audit', width: 40, formatter: function(value, options, row){
				return value === 0 ?
                    '<span type="button" class="label label-primary" id="lockUser">&nbsp;&nbsp;查看&nbsp;&nbsp;</span>':
					'<span class="label label-success">已处理</span>';
			}},
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        // multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
    $("#jqGrid").on('click','#lockUser',function(){
        var userId=this.parentNode.parentNode.getAttribute('id');
        $.get(baseURL + "sys/user/applyInfo/" + userId, function(data){
            vm.ApplyInfo =data.applyInfo;
            vm.showList = false;
            vm.title = "申请信息";
        });
    })
});
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};
var ztree;

var vm = new Vue({
    el:'#rrapp',
    data:{
        SysUserListVO:{
            userId: null,
            name: null,
            username: null,
            jobNumber: null,
            audit: null
        },
        q:{
            name: null,
            username: null,
            jobNumber: null
        },
        showList: true,
        title:null,
        roleList:{},
        ApplyInfo:{
            userId: null,
            name: null,
            company: null,
            jobNumber: null,
            identityCard:null,
            email:null,
            audit: null
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        pass: function () {
            var userId=vm.ApplyInfo.userId;
            $.get(baseURL + "sys/user/applyPass/" + userId, function(data){
                if(data.code === 0){
                    vm.reload();
                }else{
                    alert(data.msg);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            console.log(vm.q);
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'name': vm.q.name,
                          'username': vm.q.username,
                          'jobNumber': vm.q.jobNumber},
                page:page
            }).trigger("reloadGrid");
        }
    }
});