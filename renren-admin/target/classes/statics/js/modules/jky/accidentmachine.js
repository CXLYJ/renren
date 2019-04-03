$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'jky/accidentmachine/list',
        datatype: "json",
        colModel: [			
			{ label: 'accidentId', name: 'accidentId', index: 'accident_id', width: 50, key: true },
			{ label: '机械设备id', name: 'machineId', index: 'machine_id', width: 80 }			
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
		accidentMachine: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.accidentMachine = {};
		},
		update: function (event) {
			var accidentId = getSelectedRow();
			if(accidentId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(accidentId)
		},
		saveOrUpdate: function (event) {
			var url = vm.accidentMachine.accidentId == null ? "jky/accidentmachine/save" : "jky/accidentmachine/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.accidentMachine),
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
			var accidentIds = getSelectedRows();
			if(accidentIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "jky/accidentmachine/delete",
                    contentType: "application/json",
				    data: JSON.stringify(accidentIds),
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
		getInfo: function(accidentId){
			$.get(baseURL + "jky/accidentmachine/info/"+accidentId, function(r){
                vm.accidentMachine = r.accidentMachine;
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