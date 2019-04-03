$(function () {
    var pparentId = 0;
    $("#jqGrid").jqGrid({
        url: baseURL + 'jky/risk/subList?parentId='+parentId,
        datatype: "json",
        colModel: [
            { label: '序号', name: 'id', width: 10 }	,
            { label: '父id', name: 'parentId',hidden:true },
            { label: '级别', name: 'level',hidden:true },
            { label: '风险因素名称', name: 'name',sortable: false, width: 60 },
            { label: '预控措施 ', name: 'preventWay', width: 100 }
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
    $("#query").click( function () {
        var ids=$("#jqGrid").jqGrid("getGridParam","selarrrow");
        if(ids.length==1){
            var rowId=$("#jqGrid").jqGrid("getGridParam","selrow");
            var rowData = $("#jqGrid").jqGrid('getRowData',rowId);
            if(rowData.level == 3){
                alert("已经没有下一级");
                return false;
            }
            var id=rowData.id;
            parentId=id;
            pparentId = rowData.parentId;
            //console.log(pparentId);
            var page = 1;
            $("#jqGrid").jqGrid('setGridParam',{
                url:baseURL + 'jky/risk/subList?parentId='+id,
                page:page
            }).trigger("reloadGrid");
        }else{
            alert("请选择一条数据进行查看");
        }
    });
    $("#back").click( function () {
        var jqGrid = $('#jqGrid');
        var RowDatas = jqGrid.jqGrid('getRowData');
        var allCountID = jqGrid.jqGrid('getDataIDs');
        RowDatas.push(jqGrid.jqGrid('getRowData', allCountID[allCountID.length-1]));
        parentId = RowDatas[0].parentId;
        if(parentId == 0){
            alert("已经是最顶级");
            return false;
        } else {
            if(RowDatas[0].level == 2){
                pparentId = 0;
            }
            var page = 1;
            $("#jqGrid").jqGrid('setGridParam',{
                url:baseURL + 'jky/risk/subList?parentId='+pparentId,
                page:page
            }).trigger("reloadGrid");
        }
    });
});
var parentId=0;
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
		showList: true,
		title: null,
		riskLevel: {
            id: null,
            name: null,
            preventWay: null,
            level: 1,
            parentId: 0
        },
	},
	methods: {
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.riskLevel={};
            if(parentId == 0){
                vm.riskLevel.level=1;
                vm.riskLevel.parentId=0;
            }else{
                vm.riskLevel.parentId = parentId;
                $.get(baseURL + 'jky/risk/info/'+parentId, function(r){
                    vm.riskLevel.level = r.risk.level+1;
                });
            }
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
			vm.getInfo(id);
		},
		saveOrUpdate: function () {
			var url = vm.riskLevel.id == null ? "jky/risk/save" : "jky/risk/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.riskLevel),
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
		del: function () {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "jky/risk/delete",
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
			$.get(baseURL + 'jky/risk/info/'+id, function(r){
                vm.riskLevel = r.risk;
            });
		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                page:page
            }).trigger("reloadGrid");
		}
	}
});