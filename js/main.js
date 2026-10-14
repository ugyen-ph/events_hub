console.log("main.js is running");

/* FILE: js/main.js
   Shared behaviour for every Events Hub page (Practical IV - JavaScript).
*/

"use strict";

// ---------- Part B: display method demos ----------
function greetHome() {
  const welcome = document.getElementById("welcomeMsg");
  if (!welcome) return; // not on this page - stop here
  welcome.innerHTML = "Welcome to <strong>JNEC Events Hub</strong>!";
  // DEMO ONLY - do not leave this uncommented:
  // document.write("<p>This can wipe the page after load</p>");
  // window.alert("Registration opens Monday!");
}

greetHome();
console.log("Debug: main.js finished display demos");

// ---------- Part C: confirm before clearing the form ----------
function bindRegisterExtras() {
  const resetBtn = document.querySelector("#regForm button[type='reset']");
  if (resetBtn) {
    resetBtn.addEventListener("click", function (e) {
      if (!confirm("Clear the whole form?")) {
        e.preventDefault();
      }
    });
  }
}

bindRegisterExtras();