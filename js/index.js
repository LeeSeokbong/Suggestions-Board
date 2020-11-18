window.onload = function(){
    var joinBtn = document.querySelector("#join");
    joinBtn.onclick = function() {
        var joinModal = document.querySelector("#joinModal");
        var joinModal1 = document.querySelector(".join-modal-wrap");
        joinModal.classList.remove("hide");
    };
    var joinCompletedBtn = document.querySelector("#join-completed");
    joinCompletedBtn.onclick = function() {
        var joinId = document.querySelector("#joinId").value;
        var joinPassword = document.querySelector("#joinPassword").value;
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
            }).then(res => res.json()
        ).then(res => console.log(res))
    }   
}

