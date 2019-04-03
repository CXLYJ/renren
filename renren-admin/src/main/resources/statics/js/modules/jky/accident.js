$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'jky/accident/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '事故类型', name: 'accidentType', index: 'accident_type', width: 80 }, 			
			{ label: '事故名称', name: 'accidentName', index: 'accident_name', width: 80 }, 			
			{ label: '事故备注', name: 'accidentComment', index: 'accident_comment', width: 80 }, 			
			{ label: '发生时间', name: 'time', index: 'time', width: 80 }, 			
			{ label: '发生时间-天', name: 'timeDay', index: 'time_day', width: 80 }, 			
			{ label: '发生时间-小时', name: 'timeHour', index: 'time_hour', width: 80 }, 			
			{ label: '发生时间-分钟', name: 'timeMinute', index: 'time_minute', width: 80 }, 			
			{ label: '重伤人数', name: 'numberInjury', index: 'number_injury', width: 80 }, 			
			{ label: '死亡人数', name: 'numberDeath', index: 'number_death', width: 80 }, 			
			{ label: '经济损失', name: 'pecuniaryLoss', index: 'pecuniary_loss', width: 80 }, 			
			{ label: '工期延误', name: 'projectDelay', index: 'project_delay', width: 80 }, 			
			{ label: '事故原因id:外键=accident.id', name: 'accidentReasonId', index: 'accident_reason_id', width: 80 }, 			
			{ label: '一级风险因素id:外键=risk_level1.id', name: 'riskLevel1Id', index: 'risk_level1_id', width: 80 }, 			
			{ label: '二级风险因素id:外键=risk_level2.id', name: 'riskLevel2Id', index: 'risk_level2_id', width: 80 }, 			
			{ label: '三级风险因素id:外键=risk_level3.id', name: 'riskLevel3Id', index: 'risk_level3_id', width: 80 }, 			
			{ label: '自然环境id:外键= natural_environment.id', name: 'naturalEnvironmentId', index: 'natural_environment_id', width: 80 }, 			
			{ label: '建筑id:外键= building.id', name: 'buildingId', index: 'building_id', width: 80 }			
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
		accident: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.accident = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.accident.id == null ? "jky/accident/save" : "jky/accident/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.accident),
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
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "jky/accident/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
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
		getInfo: function(id){
			$.get(baseURL + "jky/accident/info/"+id, function(r){
                vm.accident = r.accident;
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