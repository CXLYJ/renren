$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'jky/machine/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '塔吊:1.轨道式，2.轮胎式，3.汽车式，4.履带式，5.附着自升式，6.内爬式，7.内爬外挂式，8.其他', name: 'towerCrane', index: 'tower_crane', width: 80 }, 			
			{ label: '施工升降机:1.固定式，2.车载式，3.铝合金式，4.曲臂式，5.套缸式，6.导轨式，7.其他', name: 'constructionElevator', index: 'construction_elevator', width: 80 }, 			
			{ label: '吊车:1.汽车吊，2.履带吊，3.轮胎吊，4.塔式吊车，5.其他', name: 'crane', index: 'crane', width: 80 }, 			
			{ label: '吊篮', name: 'basket', index: 'basket', width: 80 }, 			
			{ label: '挖掘机:1.正铲，2.反铲，3.拉铲，4.抓铲，5.其他', name: 'excavator', index: 'excavator', width: 80 }, 			
			{ label: '叉车:1.普通内燃叉车，2.重型叉车，3.集装箱叉车，4.侧面叉车，5.其他', name: 'forklift', index: 'forklift', width: 80 }, 			
			{ label: '其他', name: 'other', index: 'other', width: 80 }			
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
		machine: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.machine = {};
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
			var url = vm.machine.id == null ? "jky/machine/save" : "jky/machine/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.machine),
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
				    url: baseURL + "jky/machine/delete",
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
			$.get(baseURL + "jky/machine/info/"+id, function(r){
                vm.machine = r.machine;
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