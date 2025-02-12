document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show-menu");
    });

    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove("show-menu");
        }
    });

    menuToggle.addEventListener("click", function() {
        menuToggle.classList.toggle("active");
    });
});

// ------------------ Easter Egg knapp ------------------ //
document.addEventListener("DOMContentLoaded", function () {
  const secretButton = document.getElementById("secret-button");

  if (secretButton) {
      secretButton.addEventListener("click", function () {
          let overlay = document.getElementById("yellow-overlay");
          if (!overlay) {
              overlay = document.createElement("div");
              overlay.id = "yellow-overlay";
              document.body.appendChild(overlay);
              secretButton.addEventListener("click", function () {
                overlay.remove();
              });
          }
      });
  } else {
      console.warn("Knappen hittades inte! Kontrollera HTML och att JavaScript-filen laddas.");
  }

  // ----------------- Påskägg för tangentbordskombination "1337" ----------------- //
  let sequence = "";
  document.addEventListener("keydown", function (event) {
      sequence += event.key;
      if (sequence.includes("1337")) {
          alert("Du hittade påskägget! 🎉");
          sequence = ""; // Återställ sekvensen
      }
  });
});

// ------------------ KONTAKT SIDAN ------------------ //
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const result = document.getElementById("result");
    
    if (!form || !result) return;
  
    const inputs = form.querySelectorAll("input, textarea");
  
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        const errorMessage = this.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains("invalid-feedback")) {
          if (this.checkValidity()) {
            errorMessage.style.display = "none";
          } else {
            errorMessage.style.display = "block";
          }
        }
      });
  
      input.addEventListener("blur", function () {
        const errorMessage = this.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains("invalid-feedback")) {
          if (!this.checkValidity()) {
            errorMessage.style.display = "block";
          }
        }
      });
    });
  
    form.addEventListener("submit", function (event) {
      let isValid = true;
      inputs.forEach((input) => {
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains("invalid-feedback")) {
          if (!input.checkValidity()) {
            errorMessage.style.display = "block";
            isValid = false;
          } else {
            errorMessage.style.display = "none";
          }
        }
      });
  
      if (!isValid) {
        event.preventDefault();
        return;
      }
  
      event.preventDefault();
      result.innerHTML = "Please wait...";
      result.style.display = "block";
  
      const formData = new FormData(form);
      const object = {};
      formData.forEach((value, key) => (object[key] = value));
      const json = JSON.stringify(object);
  
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status === 200) {
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500", "text-red-500");
            result.classList.add("text-green-500");
          } else {
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500", "text-green-500");
            result.classList.add("text-red-500");
          }
        })
        .catch((error) => {
          console.error("Submission Error:", error);
          result.innerHTML = "Ett oväntat fel uppstod. Försök igen senare.";
          result.classList.remove("text-gray-500", "text-green-500");
          result.classList.add("text-red-500");
        })
        .then(() => {
          form.reset();
          form.classList.remove("was-validated");
          if (result.classList.contains("text-green-500")) {
            setTimeout(() => {
              result.style.display = "none";
            }, 5000);
          }
        });
    });
  });
  
