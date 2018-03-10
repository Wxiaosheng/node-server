window.tianzun = {
    ajax: (param,success,error) => {
        // param 中必须带有 transCode
        var xhr = new XMLHttpRequest();
        //设置请求的类型及url
        xhr.open('post', 'http://127.0.0.1:9999/api' );
        //post请求一定要添加请求头才行不然会报错
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //发送请求
        xhr.send(JSON.stringify(param));
        xhr.onreadystatechange = function () {
            // 这步为判断服务器是否正确响应
            if (xhr.readyState == 4) {
                if(xhr.status == 200){
                    success(xhr.responseText);
                }else{
                    if(error){ error(xhr.responseText) }
                }
            }
        };
    },
}