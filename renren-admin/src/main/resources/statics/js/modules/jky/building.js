$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'jky/building/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '结构类型:1.砖混结构，2.框架结构，3.剪力墙结构，4.框剪结构，5.框架筒体结构，6.筒体结构7.钢结构，8.钢筋混凝土核心筒和钢框架组合结构体系，9.钢结构+压型钢板混凝土组合楼面，10.钢铁架点焊11.其他', name: 'structure', index: 'structure', width: 80 }, 			
			{ label: '建筑高度', name: 'height', index: 'height', width: 80 }, 			
			{ label: '建筑层数', name: 'floor', index: 'floor', width: 80 }, 			
			{ label: '施工方式:1.现浇，2.PC，3.钢结构，4.其他', name: 'constructionMethod', index: 'construction_method', width: 80 }, 			
			{ label: '抗震等级:1.一级，2.二级，3.三级，4.四级', name: 'seismicRating', index: 'seismic_rating', width: 80 }, 			
			{ label: '抗震设防烈度:1.6度，2.7度，3.8度，4.9度', name: 'seismicIntensity', index: 'seismic_intensity', width: 80 }, 			
			{ label: '耐火等级:1.一级，2.二级，3.三级，4.四级', name: 'fireRating', index: 'fire_rating', width: 80 }			
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
		building: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.building = {};
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
			var url = vm.building.id == null ? "jky/building/save" : "jky/building/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.building),
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
				    url: baseURL + "jky/building/delete",
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
			$.get(baseURL + "jky/building/info/"+id, function(r){
                vm.building = r.building;
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