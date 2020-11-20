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
            userName : joinId,
            password : joinPassword
        }
        fetch("http://localhost:4000/users",{
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(joinData)
            }).then(res => res.json())
        .then(res => console.log(res))
        .then(alert("회원가입이 완료되었습니다."))
        .then(joinModal.classList.add("hide"))
    }
}

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

