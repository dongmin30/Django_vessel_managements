const imoCheckBtn = document.getElementById("imoCheckBtn");

function imoCheck() {
    data = document.getElementById("imoNumber").value;
    $.ajax({
        type:'POST',
        url: 'imocheck/',
        data: JSON.stringify(data),
        success:function(json){
            if(json.result === 200){
                alert("사용할 수 있는 IMO number 입니다.");
            } else {
                alert("존재하지 않는 IMO number 입니다.");
            }
        },
        error:function(xhr, errmsg, err){
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

imoCheckBtn.addEventListener("click", imoCheck);
