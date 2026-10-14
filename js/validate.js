/* FILE: js/validate.js
   Registration-form checks only.
   Load AFTER js/main.js on register.html.
*/

"use strict";

console.log("validate.js is running");

const patterns = {
  fullname: /^[A-Za-z ]{3,50}$/,
  email: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,
  phone: /^[17]7\d{6}$/,
};

function showError(id, msg) {
  const span = document.getElementById("err-" + id);
  const field = document.getElementById(id);
  if (span) span.textContent = msg;
  if (field) field.classList.add("is-invalid");
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(function (s) {
    s.textContent = "";
  });
  document.querySelectorAll(".is-invalid").forEach(function (f) {
    f.classList.remove("is-invalid");
  });
}

function validateForm(e) {
  clearErrors();
  let ok = true;

  for (const field of ["fullname", "email", "phone"]) {
    const el = document.getElementById(field);
    const value = el ? el.value.trim() : "";
    if (!patterns[field].test(value)) {
      showError(field, "Invalid " + field);
      ok = false;
    }
  }

  if (document.getElementById("event_id").value === "") {
    showError("event_id", "Please choose an event");
    ok = false;
  }

  if (!document.querySelector("input[name='food']:checked")) {
    const foodErr = document.getElementById("err-food");
    if (foodErr) foodErr.textContent = "Select a food preference";
    ok = false;
  }

  const interests = document.querySelectorAll("input[name='interests']:checked");
  if (interests.length === 0) {
    const err = document.getElementById("err-interests");
    if (err) err.textContent = "Choose at least one interest";
    ok = false;
  }

  if (!ok) {
    e.preventDefault();
    alert("Please fix the errors.");
  } else {
    e.preventDefault();
    alert("Looks good. In Practical V this will be saved on the server.");
  }
  return ok;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("regForm");
  if (form) {
    form.addEventListener("submit", validateForm);
  }

  const phone = document.getElementById("phone");
  if (phone) {
    phone.addEventListener("input", function () {
      phone.value = phone.value.replace(/[^\d]/g, "").slice(0, 8);
    });
  }
});