window.onload = function(){
    var sss = document.querySelector("#aaaaa");
    // {
    //     fetch("http://localhost:4000/login")
    //     .then(function(response) {
    //         // return response.json()
    //         return response.json()})
    //     .then(console.log(response))
    //     .then(sss.innerHTML = response)
    // }
    fetch("http://localhost:4000/login")
.then(function (resp){ return resp.json() }).then(function(json) { console.log(json)});

}
