$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'jky/material/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '钢筋:1.Ⅰ级钢筋（235/420级），2.Ⅱ级钢筋（335/455级），3.Ⅲ级钢筋（400/540级），4.Ⅳ级钢筋（500/630级）', name: 'concreteIron', index: 'concrete_iron', width: 80 }, 			
			{ label: '混凝土:1.C15，2.C20，3.C25，4.C30，5.C35，6.C40，7.C45，8.C50，9.C55，10.C60，11.C65，12.C70,13.C75，14.C80', name: 'concrete', index: 'concrete', width: 80 }, 			
			{ label: '脚手架:1.立杆式脚手架，2.桥式脚手架，3.门式脚手架，4.悬吊式脚手架，5.挂式脚手架，6.挑式脚手架，7.爬式脚手架，8.其他', name: 'scaffold', index: 'scaffold', width: 80 }, 			
			{ label: '模版:1.组合式模板，2.大模板，3.滑动模板，4.爬升模板，5.飞模，6.柱模，7.永久性模板，8.胶合板模板，9.其他', name: 'template', index: 'template', width: 80 }, 			
			{ label: '其他', name: 'other', index: 'other', width: 80 }			
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
		material: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.material = {};
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
			var url = vm.material.id == null ? "jky/material/save" : "jky/material/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.material),
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
				    url: baseURL + "jky/material/delete",
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
			$.get(baseURL + "jky/material/info/"+id, function(r){
                vm.material = r.material;
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