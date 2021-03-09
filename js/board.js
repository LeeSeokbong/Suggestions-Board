window.onload = function drawSuggestion(){
    //최초 건의사항 그려주는 곳
    fetch("http://localhost:4000/suggestions")
        .then(response => response.json())
        .then(function(response) {
        response.map(response => {
            //이미 등록된 row 만들어주는 곳
            var suggestionsRow = document.createElement("div");
            suggestionsRow.setAttribute("id", "suggestionsRow" + response.id);
            suggestionsRow.setAttribute("data-id", response.id);
            suggestionsRow.setAttribute("class", "suggestions-row");
            suggestionsTable.prepend(suggestionsRow);
            //이미 등록된 인입날짜 찍어주는 곳
            var createDateSpan = document.createElement("span");
            createDateSpan.setAttribute("id", "createDateSpan" + response.id);
            createDateSpan.setAttribute("class", "suggestions-createDate");
            suggestionsRow.appendChild(createDateSpan);
            createDateSpan.innerText = response.createDate
            //이미 등록된 멤버넘버 찍어주는 곳
            var memberNoSpan = document.createElement("span");
            memberNoSpan.setAttribute("id", "memberNoSpan" + response.id);
            memberNoSpan.setAttribute("class", "suggestions-member-no");
            suggestionsRow.appendChild(memberNoSpan);
            memberNoSpan.innerText = response.memberNo
            //이미 등록된 전화번호 찍어주는 곳
            var phoneNumberSpan = document.createElement("span");
            phoneNumberSpan.setAttribute("id", "phoneNumberSpan" + response.id);
            phoneNumberSpan.setAttribute("class", "suggestions-phone-number");
            suggestionsRow.appendChild(phoneNumberSpan);
            phoneNumberSpan.innerText = response.phoneNumber
            //이미 등록된 전화번호 찍어주는 곳
            var emailSpan = document.createElement("span");
            emailSpan.setAttribute("id", "emailSpan" + response.id);
            emailSpan.setAttribute("class", "suggestions-email");
            suggestionsRow.appendChild(emailSpan);
            emailSpan.innerText = response.email
            //이미 등록된 건의사항 찍어주는 곳
            var suggestionsMemoSpan = document.createElement("span");
            suggestionsMemoSpan.setAttribute("id", "suggestionsMemoSpan" + response.id);
            suggestionsMemoSpan.setAttribute("class", "suggestions-memo");
            suggestionsRow.appendChild(suggestionsMemoSpan);
            suggestionsMemoSpan.innerText = response.suggestionsMemo
            //버튼을 감싸는 div만드는 곳
            var suggestionsBtns = document.createElement("div");
            suggestionsBtns.setAttribute("class", "suggestions-btns");
            suggestionsRow.appendChild(suggestionsBtns);
            //이미 등록된 건의사항 수정 버튼 만들어 주는 곳
            var suggestionsUpdateBtn = document.createElement("button");
            suggestionsUpdateBtn.setAttribute("tyep", "button");
            suggestionsUpdateBtn.setAttribute("data-id", response.id);
            suggestionsUpdateBtn.setAttribute("id", "suggestionsUpdateBtn");
            suggestionsUpdateBtn.setAttribute("onClick", "suggestionsUpdate(this)");
            suggestionsUpdateBtn.innerText = "수정하기"
            suggestionsBtns.appendChild(suggestionsUpdateBtn);
            //이미 등록된 건의사항 삭제 버튼 만들어 주는 곳
            var suggestionsDeleteBtn = document.createElement("button");
            suggestionsDeleteBtn.setAttribute("tyep", "button");
            suggestionsDeleteBtn.setAttribute("data-id", response.id);
            suggestionsDeleteBtn.setAttribute("id", "suggestionsDeleteBtn");
            suggestionsDeleteBtn.setAttribute("onClick", "suggestionsDelete(this)");
            suggestionsDeleteBtn.innerText = "삭제하기"
            suggestionsBtns.appendChild(suggestionsDeleteBtn);
            })
        }
    );
    var suggestionsModalBtn = document.querySelector("#suggestionsModalBtn");
    var suggestionsModal = document.querySelector("#suggestionsModal");
    suggestionsModalBtn.onclick = function() {
        document.querySelector("#memberNo").value = "";
        document.querySelector("#phoneNumber").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#suggestionsMemo").value = "";
        suggestionsModal.classList.remove("hide");
        suggestionsAddModalBtn.classList.remove("hide");
    }
    var suggestionsBackGround = document.querySelector("#suggestionsBackGround");
    suggestionsBackGround.onclick = function() {
        suggestionsModal.classList.add("hide");
        suggestionsAddModalBtn.classList.add("hide");
    }
    var suggestionsAddModalBtn = document.querySelector("#suggestionsAddModalBtn");
    suggestionsAddModalBtn.onclick = function() {
        var memberNo = document.querySelector("#memberNo").value;
        var phoneNumber = document.querySelector("#phoneNumber").value;
        var email = document.querySelector("#email").value;
        var suggestionsMemo = document.querySelector("#suggestionsMemo").value;
        var suggestionsTable = document.querySelector("#suggestionsTable");
        //날짜 찍어주기
        var today = new Date();   
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var date = today.getDate();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        var createDate = year+"/"+month+"/"+date+" "+hours+":"+minutes+":"+seconds;
        var suggestionsData = {
            createDate: createDate,
            memberNo: memberNo,
            phoneNumber: phoneNumber,
            email: email,
            suggestionsMemo: suggestionsMemo
        }
        suggestionsAddModalBtn.classList.add("hide");

        fetch("http://localhost:4000/suggestions",{
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(suggestionsData)
            }).then(response => response.json())
            .then(function(response) {
                console.log(response)
                //새로 등록된 row 만들어주는 곳
                var suggestionsRow = document.createElement("div");
                suggestionsRow.setAttribute("id", "suggestionsRow" + response.id);
                suggestionsRow.setAttribute("data-id", response.id);
                suggestionsRow.setAttribute("class", "suggestions-row");
                suggestionsTable.prepend(suggestionsRow);
                //새로 등록된 인입날짜 찍어주는 곳
                var createDateSpan = document.createElement("span");
                createDateSpan.setAttribute("id", "createDateSpan" + response.id);
                createDateSpan.setAttribute("class", "suggestions-createDate");
                suggestionsRow.appendChild(createDateSpan);
                createDateSpan.innerText = response.createDate
                //새로 등록된 멤버넘버 찍어주는 곳
                var memberNoSpan = document.createElement("span");
                memberNoSpan.setAttribute("id", "memberNoSpan" + response.id);
                memberNoSpan.setAttribute("class", "suggestions-member-no");
                suggestionsRow.appendChild(memberNoSpan);
                memberNoSpan.innerText = response.memberNo
                //새로 등록된 전화번호 찍어주는 곳
                var phoneNumberSpan = document.createElement("span");
                phoneNumberSpan.setAttribute("id", "phoneNumberSpan" + response.id);
                phoneNumberSpan.setAttribute("class", "suggestions-phone-number");
                suggestionsRow.appendChild(phoneNumberSpan);
                phoneNumberSpan.innerText = response.phoneNumber
                //새로 등록된 이메일 찍어주는 곳
                var emailSpan = document.createElement("span");
                emailSpan.setAttribute("id", "emailSpan" + response.id);
                emailSpan.setAttribute("class", "suggestions-email");
                suggestionsRow.appendChild(emailSpan);
                emailSpan.innerText = response.email
                //새로 등록된 건의사항 찍어주는 곳
                var suggestionsMemoSpan = document.createElement("span");
                suggestionsMemoSpan.setAttribute("id", "suggestionsMemoSpan" + response.id);
                suggestionsMemoSpan.setAttribute("class", "suggestions-memo");
                suggestionsRow.appendChild(suggestionsMemoSpan);
                suggestionsMemoSpan.innerText = response.suggestionsMemo
                //버튼을 감싸는 div만드는 곳
                var suggestionsBtns = document.createElement("div");
                suggestionsBtns.setAttribute("class", "suggestions-btns");
                suggestionsRow.appendChild(suggestionsBtns);
                //새로 등록된 건의사항 수정 버튼 만들어 주는 곳
                var suggestionsUpdateBtn = document.createElement("button");
                suggestionsUpdateBtn.setAttribute("tyep", "button");
                suggestionsUpdateBtn.setAttribute("data-id", response.id);
                suggestionsUpdateBtn.setAttribute("id", "suggestionsUpdateBtn");
                suggestionsUpdateBtn.setAttribute("onClick", "suggestionsUpdate(this)");
                suggestionsUpdateBtn.innerText = "수정하기"
                suggestionsBtns.appendChild(suggestionsUpdateBtn);
                //새로 등록된 건의사항 삭제 버튼 만들어 주는 곳
                var suggestionsDeleteBtn = document.createElement("button");
                suggestionsDeleteBtn.setAttribute("tyep", "button");
                suggestionsDeleteBtn.setAttribute("data-id", response.id);
                suggestionsDeleteBtn.setAttribute("id", "suggestionsDeleteBtn");
                suggestionsDeleteBtn.setAttribute("onClick", "suggestionsDelete(this)");
                suggestionsDeleteBtn.innerText = "삭제하기"
                suggestionsBtns.appendChild(suggestionsDeleteBtn);
            }
        )
        suggestionsModal.classList.add("hide");
    }
}

function suggestionsUpdate(suggestionsUpdateBtn) {
    console.log(suggestionsUpdateBtn)
    //업데이트를 위해 건의사항 모달창 다시 열기
    var updateDataId = suggestionsUpdateBtn.getAttribute("data-id");
    var beforecreateDateValue = document.querySelector("#createDateSpan" + updateDataId).textContent;
    var beforeMemberValue = document.querySelector("#memberNoSpan" + updateDataId).textContent;
    var beforePhoneNumberValue = document.querySelector("#phoneNumberSpan" + updateDataId).textContent;
    var beforeEmailValue = document.querySelector("#emailSpan" + updateDataId).textContent;
    var beforeSuggestionsMemoValue = document.querySelector("#suggestionsMemoSpan" + updateDataId).textContent;
    var suggestionsModal = document.querySelector("#suggestionsModal");
    var suggestionsUpdateModalBtn = document.querySelector("#suggestionsUpdateModalBtn");
    suggestionsModal.classList.remove("hide");
    suggestionsUpdateModalBtn.classList.remove("hide");
    document.querySelector("#memberNo").value = beforeMemberValue;
    document.querySelector("#phoneNumber").value = beforePhoneNumberValue;
    document.querySelector("#email").value = beforeEmailValue;
    document.querySelector("#suggestionsMemo").value = beforeSuggestionsMemoValue;
    var suggestionsBackGround = document.querySelector("#suggestionsBackGround");
    suggestionsBackGround.onclick = function() {
        suggestionsModal.classList.add("hide");
        suggestionsAddModalBtn.classList.add("hide");
        suggestionsUpdateModalBtn.classList.add("hide");
    }
    //업데이트 하는 곳
    suggestionsUpdateModalBtn.onclick = function() {
        var memberNo = document.querySelector("#memberNo").value;
        var phoneNumber = document.querySelector("#phoneNumber").value;
        var email = document.querySelector("#email").value;
        var suggestionsMemo = document.querySelector("#suggestionsMemo").value;
        var suggestionsUpdata = {
            createDate: beforecreateDateValue,
            memberNo: memberNo,
            phoneNumber: phoneNumber,
            email: email,
            suggestionsMemo: suggestionsMemo
        }
        var suggestionsUpdateBtnId = suggestionsUpdateBtn.getAttribute("data-id")
        fetch("http://localhost:4000/suggestions/" + suggestionsUpdateBtnId,{
            method : "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(suggestionsUpdata)
        })
        suggestionsModal.classList.add("hide");
        reDarwSuggestions();
    }
}

function suggestionsDelete(suggestionsDeleteBtn) {
    console.log(suggestionsDeleteBtn)
    var suggestionsDeleteBtnId = suggestionsDeleteBtn.getAttribute("data-id");
    //지정된 테이블 삭제
    var suggestionsTable = document.querySelector("#suggestionsTable")
    var suggestionsDeleteRow = document.querySelector("#suggestionsRow" + suggestionsDeleteBtnId)
    suggestionsTable.removeChild(suggestionsDeleteRow);
    //삭제 데이터 서버로 보내주는 것
    fetch("http://localhost:4000/suggestions/" + suggestionsDeleteBtnId,{
        method : "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

//검색하는 곳
function suggestionsSearch () {
    var searchInput = document.querySelector("#searchInput").value;
    fetch("http://localhost:4000/suggestions?suggestionsMemo_like=" + searchInput)
    .then(response => response.json())
        .then(function(response) {
        response.map(response => {
            //검색 태이블 초기화
            suggestionsTable.innerText = ""
            //검색한 row 만들어주는 곳
            var suggestionsRow = document.createElement("div");
            suggestionsRow.setAttribute("id", "suggestionsRow" + response.id);
            suggestionsRow.setAttribute("data-id", response.id);
            suggestionsRow.setAttribute("class", "suggestions-row");
            suggestionsTable.prepend(suggestionsRow);
            //검색한 인입날짜 찍어주는 곳
            var createDateSpan = document.createElement("span");
            createDateSpan.setAttribute("id", "createDateSpan" + response.id);
            createDateSpan.setAttribute("class", "suggestions-createDate");
            suggestionsRow.appendChild(createDateSpan);
            createDateSpan.innerText = response.createDate
            //검색한 멤버넘버 찍어주는 곳
            var memberNoSpan = document.createElement("span");
            memberNoSpan.setAttribute("id", "memberNoSpan" + response.id);
            memberNoSpan.setAttribute("class", "suggestions-member-no");
            suggestionsRow.appendChild(memberNoSpan);
            memberNoSpan.innerText = response.memberNo
            //검색한 전화번호 찍어주는 곳
            var phoneNumberSpan = document.createElement("span");
            phoneNumberSpan.setAttribute("id", "phoneNumberSpan" + response.id);
            phoneNumberSpan.setAttribute("class", "suggestions-phone-number");
            suggestionsRow.appendChild(phoneNumberSpan);
            phoneNumberSpan.innerText = response.phoneNumber
            //검색한 전화번호 찍어주는 곳
            var emailSpan = document.createElement("span");
            emailSpan.setAttribute("id", "emailSpan" + response.id);
            emailSpan.setAttribute("class", "suggestions-email");
            suggestionsRow.appendChild(emailSpan);
            emailSpan.innerText = response.email
            //검색한 건의사항 찍어주는 곳
            var suggestionsMemoSpan = document.createElement("span");
            suggestionsMemoSpan.setAttribute("id", "suggestionsMemoSpan" + response.id);
            suggestionsMemoSpan.setAttribute("class", "suggestions-memo");
            suggestionsRow.appendChild(suggestionsMemoSpan);
            suggestionsMemoSpan.innerText = response.suggestionsMemo
            //버튼을 감싸는 div만드는 곳
            var suggestionsBtns = document.createElement("div");
            suggestionsBtns.setAttribute("class", "suggestions-btns");
            suggestionsRow.appendChild(suggestionsBtns);
            //검색한 건의사항 수정 버튼 만들어 주는 곳
            var suggestionsUpdateBtn = document.createElement("button");
            suggestionsUpdateBtn.setAttribute("tyep", "button");
            suggestionsUpdateBtn.setAttribute("data-id", response.id);
            suggestionsUpdateBtn.setAttribute("id", "suggestionsUpdateBtn");
            suggestionsUpdateBtn.setAttribute("onClick", "suggestionsUpdate(this)");
            suggestionsUpdateBtn.innerText = "수정하기"
            suggestionsBtns.appendChild(suggestionsUpdateBtn);
            //검색한 건의사항 삭제 버튼 만들어 주는 곳
            var suggestionsDeleteBtn = document.createElement("button");
            suggestionsDeleteBtn.setAttribute("tyep", "button");
            suggestionsDeleteBtn.setAttribute("data-id", response.id);
            suggestionsDeleteBtn.setAttribute("id", "suggestionsDeleteBtn");
            suggestionsDeleteBtn.setAttribute("onClick", "suggestionsDelete(this)");
            suggestionsDeleteBtn.innerText = "삭제하기"
            suggestionsBtns.appendChild(suggestionsDeleteBtn);
            })
        }
    );
}

function reDarwSuggestions() {
    suggestionsTable.innerText = ""
    window.onload();
}
