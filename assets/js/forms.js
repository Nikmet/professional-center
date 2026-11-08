"use strict";

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const alert = form.querySelector("[data-form-success]");

  function validateField(field) {
    field.setCustomValidity("");
    if (field.name === "name" && field.value.trim().length < 2) {
      field.setCustomValidity("Укажите имя: не менее двух символов.");
    }
    if (field.name === "phone") {
      const digits = field.value.replace(/\D/g, "");
      if (!/^(?:7|8)\d{10}$/.test(digits)) {
        field.setCustomValidity(
          "Укажите российский номер: +7 или 8 и еще 10 цифр.",
        );
      }
    }
    if (field.name === "message" && field.value.trim().length < 10) {
      field.setCustomValidity("Напишите сообщение: не менее 10 символов.");
    }
    const invalid = !field.checkValidity();
    if (form.classList.contains("was-validated"))
      field.setAttribute("aria-invalid", String(invalid));
    return !invalid;
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      validateField(field);
      alert.hidden = true;
    });
    field.addEventListener("change", () => {
      validateField(field);
      alert.hidden = true;
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("was-validated");
    fields.forEach(validateField);
    if (!form.checkValidity()) {
      form
        .querySelector("input:invalid, select:invalid, textarea:invalid")
        .focus();
      alert.hidden = true;
      return;
    }
    // Демонстрация: запросы на сервер и сохранение персональных данных отсутствуют.
    form.reset();
    form.classList.remove("was-validated");
    fields.forEach((field) => {
      field.setCustomValidity("");
      field.removeAttribute("aria-invalid");
    });
    alert.hidden = false;
    alert.focus();
  });
  // Включаем поля только после установки обработчика, отменяющего передачу данных.
  form.querySelector("[data-form-fields]").disabled = false;
});

const selectedCourseId = new URLSearchParams(location.search).get("course");
const selectedCourse = window.trainingCourses?.find(
  (course) => course.id === selectedCourseId,
);
if (selectedCourse) {
  const form = document.querySelector("#feedback form");
  if (form) {
    form.elements.direction.value = selectedCourse.category;
    form.elements.message.value = `Здравствуйте! Интересует программа «${selectedCourse.title}». Прошу уточнить условия обучения.`;
  }
}
