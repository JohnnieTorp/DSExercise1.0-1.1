document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Forhindrer siden i at reloade

        const formData = new FormData(loginForm);
        const userData = {
            userid: formData.get("userid"),
            password: formData.get("password"),
        };

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            if (result.success) {
                alert(`Login succesfuld! Velkommen ${result.userid}`);
            } else {
                alert("Login mislykkedes: " + result.error);
            }
        } catch (error) {
            console.error("Fejl ved login:", error);
        }
    });
});
