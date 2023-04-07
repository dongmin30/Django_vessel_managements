const table = document.getElementById("vessel-list");

table.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const id = event.target.dataset.id;
    const data = {
      id: id,
    };
    fetch("delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          window.location.href = "/notice/";
        }
        return response.json();
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  }
});