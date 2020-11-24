window.onload = function(){
    var joinBtn = document.querySelector("#join");
    joinBtn.onclick = function() {
        var joinModal = document.querySelector("#joinModal");
        joinModal.classList.remove("hide");
    };
    var joinCompletedBtn = document.querySelector("#join-completed");
    joinCompletedBtn.onclick = function() {
        var joinId = document.querySelector("#joinId").value;
        var joinPassword = document.querySelector("#joinPassword").value;
        if(!joinId || joinId.length < 4 || !joinPassword || joinPassword.length < 4){
            joinValidation(joinId, joinPassword);
            return false;
        }
        var joinData = {
            email : joinId,
            password : joinPassword
        }
        fetch("http://localhost:4000/users",{
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(joinData)
            }).then(response => response.json())
        .then(response => console.log(response))
        .then(alert("회원가입이 완료되었습니다."))
        .then(joinModal.classList.add("hide"))
    }

    var loginBtn = document.querySelector("#login");
    loginBtn.onclick = function() {
        fetch("http://localhost:4000/users")
        .then(function(response) {
            return response.json()})
            // loginChack(response)
        .then(response => loginChack(response))
    }
}   

var loginChack = function(response) {
    var loginId = document.querySelector("#loginID").value;
    var loginPassword = document.querySelector("#loginPassword").value;
    // response.map(response => {
        // if(response.email === loginId){
        //     console.log("아이디가 일치한다.")
        //     if(response.password === loginPassword){
        //         console.log("비밀번호도 일치한다.")
                fetch("http://localhost:4000/login",{
            method : "POST",
            headers: {
                "alg": "ES256",
                "kid": "Key ID",
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({email: loginId,
                        password: loginPassword})
            }).then(response => response.json())
        .then(response => console.log(response))
        .then(alert("로그인이 완료되었습니다."))
        // .then(location.href="html/home.html")
    // }
            //     fetch("http://localhost:4000/signin",{
            //     method : "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "token": "Put_here_the_token"
            //     },
            //     body : JSON.stringify({
            //         email: loginId,
            //         password: loginPassword
            //     }).then(response => response.json()
            //     ).then(response => console.log(response))
            //     }).then(alert("로그인 완료 이거하면 세션되나?")
            //     )
            //     // .then(location.href="html/home.html")
            // } 
        // };
    }
// )}


var joinValidation = function(joinId, joinPassword) {
    if(!joinId){
        alert("아이디를 입력해주세요.");
    }
    if (joinId.length < 4){
        alert("아이디는 4자리 이상으로 해주세요.");
    }
    passwordValidation(joinPassword);
}

var passwordValidation = function(joinPassword) {
    if(!joinPassword){
        alert("비밀번호를 입력해주세요.");
    }
    if (joinPassword.length < 4){
        alert("비밀번호는 4자리 이상으로 해주세요.");
    }
}