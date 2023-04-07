const updateForm = document.getElementById("updateForm");

function checkValid(event) {
  const checkImoYn = document.getElementById("checkImoYn").value;
  event.preventDefault();
  if (checkImoYn === "N") {
    alert("Check IMO number 버튼을 눌러 IMO번호를 확인해주세요.");
    return false;
  } else {
    updateForm.submit();
  }
}

updateForm.addEventListener("submit", checkValid);
