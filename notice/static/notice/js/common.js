const imoCheckBtn = document.getElementById("imoCheckBtn");
// Django에서 CSRF 보호를 사용하는 경우 CSRF 토큰을 가져오는 함수입니다.
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (const i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function imoCheck() {
  const data = document.getElementById("imoNumber").value;
  fetch("/notice/imocheck/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"), // Django에서 CSRF 보호를 사용하는 경우 필요합니다.
    },
    body: JSON.stringify({ data: data }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      if (json.result === 200) {
        alert("사용할 수 있는 IMO number 입니다.");
        document.getElementById("checkImoYn").value = "Y";
      } else {
        alert("존재하지 않는 IMO number 입니다.");
        document.getElementById("checkImoYn").value = "N";
      }
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
}

imoCheckBtn.addEventListener("click", imoCheck);
