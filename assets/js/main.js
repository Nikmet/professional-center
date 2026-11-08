"use strict";

// Навигация присутствует в HTML; JavaScript уточняет состояние текущей страницы.
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".navbar a.nav-link").forEach((link) => {
  const active = link.getAttribute("href") === currentPage;
  link.classList.toggle("active", active);
  if (active) link.setAttribute("aria-current", "page");
  else link.removeAttribute("aria-current");
});

// Фокус на заголовке открытого документа помогает ориентироваться с клавиатуры.
const documentModal = document.querySelector("#document-modal");
if (documentModal) {
  document.querySelectorAll("[data-document]").forEach((button) => {
    button.addEventListener("click", () => {
      const source = document.querySelector(
        `#document-${button.dataset.document}`,
      );
      document.querySelector("#document-modal-title").textContent =
        button.dataset.title;
      document
        .querySelector("#document-modal-body")
        .replaceChildren(source.content.cloneNode(true));
      bootstrap.Modal.getOrCreateInstance(documentModal).show(button);
      documentModal.addEventListener("hidden.bs.modal", () => button.focus(), {
        once: true,
      });
    });
  });
}
