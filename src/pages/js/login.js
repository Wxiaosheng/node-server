
var sub = document.getElementById('submit');
sub.onclick = function(){
    var name = document.getElementById('name').value;
    var pwd = document.getElementById('pwd').value;
    if(!name && !pwd){
        alert('请将信息录入完整。')
    }
    var param = {
        transCode: '00102',
        userName: name,
        pwd: pwd
    }
    tianzun.ajax(param, function(data){
        data = JSON.parse(data)
        if( data.errCode == 1) location.href = 'manage.html'
    },function(error){
        console.log(error)
    })
}