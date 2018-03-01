const mod = document.getElementById('modules')

mod.onclick = function(event){
    const target = event.target
    const code = target.getAttribute('data-code')
    
    switch (code){
        case '0000':
            location.href = 'fiction.html'
    }
    

}