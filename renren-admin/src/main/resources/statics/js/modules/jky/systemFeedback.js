
var setting = {
    data: {
        value:''
    }
};
var ztree;

var vm = new Vue({
    el:'#rrapp',
    data:{
        totalData: '',
    },
    methods: {
        submit:function() {
            if(vm.totalData == ''){
                alert('不能提交为空')
                return;
            }
            var username = sessionStorage.getItem('username');
            var date = {
                content: vm.totalData,
                username: username,
            }
            $.ajax({
                type: "POST",
                url: '/jky/feedback/save',
                contentType: "application/json",
                data: JSON.stringify(date),
                success: function(r){
                    console.log(r)
                    if(r.code == 0) {
                        vm.totalData = '';
                        alert('提交成功')
                    }
                }
            });
            console.log('提交')
        }
    }
});