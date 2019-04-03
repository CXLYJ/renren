

var vm = new Vue({
    el:'#rrapp',
    data:{
        systemData: {}
    },
    created: function(){
    },
    methods: {

    }
});
ajaxData()
function ajaxData(page) {
    $("#list").empty();
    if (page == undefined) {
        page = 1;
    }
    $.get(baseURL + 'jky/feedback/list?page=' + page + '&limit=5', function (data) {
        console.log(data)
        var list = data.page.list;
        var html = ''
        for (var key = 0; key < list.length; key++) {
            html += "<div class='layui-row'>";
            html += "<div class='form-group col-sm-1'><div><span class='fa fa-user-circle' style='font-size:80px'></span></div></div>";
            html += "<div class='form-group col-sm-11'>";
            html += "<div>" + list[key].username + "&nbsp" + list[key].publishTime + "</div>";
            html += "<p>" + list[key].content + "</p>";
            html += "</div>";
            html += "<hr class='layui-bg-black'>";
            html += "</div>";
        }
        $("#list").append(html);
        var curr = data.page.currPage;
        var totalPage = data.page.totalPage;
        vm.systemData = data.page.list;
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage;
            laypage({
                cont: 'demo3',
                pages: totalPage,
                first: 1,
                last: totalPage,
                curr: curr,
                prev: '<em><</em>',
                next: '<em>></em>',
                groups: 5,
                jump: function (obj, first) {
                    console.log(obj, first)
                    if (first == undefined) {
                        ajaxData(obj.curr)
                    }

                }
            });
        })
    });
}