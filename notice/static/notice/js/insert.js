const addVesselBtn = document.getElementById("addVesselBtn");

function addVessel() {
  const name = document.getElementById("vesselName").value;
  const imoNum = document.getElementById("imoNumber").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;
  const checkImoYn = document.getElementById("checkImoYn").value;

  if (checkImoYn === "N") {
    alert("Check IMO number 버튼을 눌러 IMO번호를 확인해주세요.");
    return false;
  }

  const data = {
    name: name,
    imoNumber: imoNum,
    description: description,
    status: status,
  };

  fetch("createVessel/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"), // Django에서 CSRF 보호를 사용하는 경우 필요합니다.
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        alert("추가가 완료되었습니다.");
        window.location.href = "/notice/";
      }
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
}

addVesselBtn.addEventListener("click", addVessel);
