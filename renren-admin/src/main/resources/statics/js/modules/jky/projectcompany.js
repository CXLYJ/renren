$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'jky/projectcompany/list',
        datatype: "json",
        colModel: [			
			{ label: 'projectId', name: 'projectId', index: 'project_id', width: 50, key: true },
			{ label: '参建单位id', name: 'companyId', index: 'company_id', width: 80 }, 			
			{ label: '参建单位类型:1.建设单位2.总承包单位3.专业分包4.劳务分包5.监管单位', name: 'type', index: 'type', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
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
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		projectCompany: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.projectCompany = {};
		},
		update: function (event) {
			var projectId = getSelectedRow();
			if(projectId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(projectId)
		},
		saveOrUpdate: function (event) {
			var url = vm.projectCompany.projectId == null ? "jky/projectcompany/save" : "jky/projectcompany/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.projectCompany),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var projectIds = getSelectedRows();
			if(projectIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "jky/projectcompany/delete",
                    contentType: "application/json",
				    data: JSON.stringify(projectIds),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(projectId){
			$.get(baseURL + "jky/projectcompany/info/"+projectId, function(r){
                vm.projectCompany = r.projectCompany;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});