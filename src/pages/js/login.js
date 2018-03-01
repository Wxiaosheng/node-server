
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
    var xhr = new XMLHttpRequest();
    //设置请求的类型及url
    xhr.open('post', 'http://127.0.0.1:9999/api' );
    //post请求一定要添加请求头才行不然会报错
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //发送请求
    xhr.send(JSON.stringify(param));
    xhr.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        } 
    };
}