const imoCheckBtn = document.getElementById("imoCheckBtn");
const addVesselBtn = document.getElementById("addVesselBtn");

function imoCheck() {
    const data = document.getElementById("imoNumber").value;
    $.ajax({
        type:'POST',
        url: 'imocheck/',
        data: JSON.stringify(data),
        success:function(json){
            if(json.result === 200){
                alert("사용할 수 있는 IMO number 입니다.");
                document.getElementById("checkImoYn").value = "Y";
            } else {
                alert("존재하지 않는 IMO number 입니다.");
                document.getElementById("checkImoYn").value = "N";
            }
        },
        error:function(xhr, errmsg, err){
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

function addVessel() {
    const name = document.getElementById("vesselName").value;
    const imoNum = document.getElementById("imoNumber").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;
    const checkImoYn = document.getElementById("checkImoYn").value;
    const data = {
        name : name,
        imoNumber : imoNum,
        description : description,
        status : status,
    }
    if(checkImoYn === "N"){
        alert("Check IMO number 버튼을 눌러 IMO번호를 확인해주세요.");
        return false;
    } else {
        $.ajax({
            type:'POST',
            url: 'createVessel/',
            data: data,
            success:function(json){
                alert("추가가 완료되었습니다.");
                window.location.href = '/notice/';
            },
            error:function(xhr, errmsg, err){
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });
    }
}

imoCheckBtn.addEventListener("click", imoCheck);
addVesselBtn.addEventListener("click", addVessel);
