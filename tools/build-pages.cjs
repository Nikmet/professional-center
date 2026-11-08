/* Необязательный скрипт поддержки: сохраняет общие блоки в пяти обычных HTML-файлах.
 * Сайт запускается без этого скрипта, npm и этапа сборки. */
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const icon = (name) => `<i class="bi bi-${name}" aria-hidden="true"></i>`;
const links = [
  ["index.html", "Главная"],
  ["courses.html", "Курсы"],
  ["about.html", "О центре"],
  ["documents.html", "Документы"],
  ["contacts.html", "Контакты"],
];
const brand = `<a class="brand" href="index.html" aria-label="Учебный центр Профессионал — главная"><span class="brand-symbol">${icon("book")}</span><span><span class="brand-name">Профессионал</span><span class="brand-caption">Учебный центр</span></span></a>`;
const header = (
  active,
) => `<a class="skip-link" href="#main">Перейти к содержанию</a>
<header>
  <div class="topbar"><div class="container topbar-inner"><div class="topbar-contacts"><a href="tel:+74920000000">${icon("telephone")}+7 (4922) 00-00-00</a><a href="mailto:info@professional.example">${icon("envelope")}info@professional.example</a></div><span class="topbar-hours">${icon("clock")}Пн–Пт: 9:00–18:00</span></div></div>
  <div class="brandbar"><div class="container d-flex justify-content-between align-items-center gap-4">${brand}<p class="brand-summary">Профессиональная подготовка<br>для работы на производстве</p><a class="btn btn-outline-primary" href="contacts.html#feedback">Оставить заявку</a></div></div>
  <nav class="navbar navbar-expand-lg" aria-label="Основная навигация"><div class="container"><span class="nav-caption d-lg-none">Меню сайта</span><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navigation" aria-controls="main-navigation" aria-expanded="false" aria-label="Открыть меню"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="main-navigation"><ul class="navbar-nav me-auto">${links.map(([href, label]) => `<li class="nav-item"><a class="nav-link${href === active ? " active" : ""}" href="${href}"${href === active ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}</ul><a class="btn btn-primary nav-consult" href="contacts.html#feedback">Консультация ${icon("arrow-right")}</a></div></div></nav>
</header>`;
const footer = `<footer class="site-footer"><div class="container"><div class="row g-4"><div class="col-md-5">${brand}<p class="footer-text">Профессиональное обучение, переподготовка и повышение квалификации специалистов рабочих профессий.</p></div><div class="col-6 col-md-3"><h2>Информация</h2><ul class="footer-links">${links
  .slice(1)
  .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
  .join(
    "",
  )}<li><a href="documents.html#privacy">Персональные данные</a></li></ul></div><div class="col-6 col-md-4"><h2>Связаться с нами</h2><ul class="footer-links"><li><a href="tel:+74920000000">+7 (4922) 00-00-00</a></li><li><a href="mailto:info@professional.example">info@professional.example</a></li><li>Пн–Пт: 9:00–18:00</li><li>г. Владимир, ул. Учебная, д. 10<br>Условный адрес</li></ul></div></div><div class="footer-bottom"><p class="footer-disclaimer">Учебный демонстрационный проект. Организация вымышленная; контакты, программы, цены и документы условные. Фотографии созданы с помощью ИИ. Заявки не отправляются.</p><span>© 2026 «Профессионал»</span></div></div></footer>`;
function intro(title, description, crumb = title) {
  return `<div class="page-intro"><div class="container"><nav aria-label="Хлебные крошки"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.html">Главная</a></li><li class="breadcrumb-item active" aria-current="page">${crumb}</li></ol></nav><h1>${title}</h1><p>${description}</p></div></div>`;
}
function photo(name, alt, extra = "") {
  return `<img src="assets/images/${name}.webp" class="photo ${extra}" alt="${alt}" width="1200" height="800" loading="lazy">`;
}
function faq(id, entries) {
  return `<div class="accordion" id="${id}">${entries.map(([q, a], i) => `<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}-${i}" aria-expanded="false" aria-controls="${id}-${i}">${q}</button></h3><div id="${id}-${i}" class="accordion-collapse collapse" data-bs-parent="#${id}"><div class="accordion-body">${a}</div></div></div>`).join("")}</div>`;
}
const categories = [
  "Рабочие профессии",
  "Подъемные сооружения",
  "Охрана труда",
  "Безопасность производства",
];
function form(prefix, full = false) {
  return `<form data-demo-form novalidate>
    <p class="form-hint">Все поля обязательны. Форма работает в демонстрационном режиме: данные не сохраняются и не отправляются.</p>
    <noscript><p class="alert alert-warning">Для проверки заявки включите JavaScript. Форма отключена, чтобы данные не отправлялись на сервер.</p></noscript>
    <fieldset disabled data-form-fields><div class="row g-3">
      <div class="col-md-6"><label class="form-label" for="${prefix}-name">Ваше имя</label><input class="form-control" id="${prefix}-name" name="name" autocomplete="given-name" minlength="2" maxlength="80" required aria-describedby="${prefix}-name-error"><div class="invalid-feedback" id="${prefix}-name-error">Укажите имя: не менее двух символов.</div></div>
      <div class="col-md-6"><label class="form-label" for="${prefix}-phone">Телефон</label><input class="form-control" type="tel" id="${prefix}-phone" name="phone" autocomplete="tel" placeholder="+7 (900) 123-45-67" maxlength="25" required aria-describedby="${prefix}-phone-error"><div class="invalid-feedback" id="${prefix}-phone-error">Введите номер: +7 или 8 и еще 10 цифр.</div></div>
      ${full ? `<div class="col-md-6"><label class="form-label" for="${prefix}-email">Электронная почта</label><input class="form-control" type="email" id="${prefix}-email" name="email" autocomplete="email" maxlength="120" required aria-describedby="${prefix}-email-error"><div class="invalid-feedback" id="${prefix}-email-error">Укажите email в формате name@example.ru.</div></div>` : ""}
      <div class="${full ? "col-md-6" : "col-12"}"><label class="form-label" for="${prefix}-direction">Интересующее направление</label><select class="form-select" id="${prefix}-direction" name="direction" required aria-describedby="${prefix}-direction-error"><option value="">Выберите направление</option>${categories.map((c) => `<option>${c}</option>`).join("")}<option>Нужна помощь с выбором</option></select><div class="invalid-feedback" id="${prefix}-direction-error">Выберите направление или помощь с выбором.</div></div>
      ${full ? `<div class="col-12"><label class="form-label" for="${prefix}-message">Сообщение</label><textarea class="form-control" id="${prefix}-message" name="message" rows="4" minlength="10" maxlength="2000" required aria-describedby="${prefix}-message-error"></textarea><div class="invalid-feedback" id="${prefix}-message-error">Опишите ваш вопрос: от 10 до 2000 символов.</div></div>` : ""}
      <div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="${prefix}-consent" name="consent" required aria-describedby="${prefix}-consent-error"><label class="form-check-label" for="${prefix}-consent">Я ознакомлен(а) с <a href="documents.html#privacy">политикой обработки персональных данных</a> и согласен(на) на демонстрационную обработку формы.</label><div class="invalid-feedback" id="${prefix}-consent-error">Подтвердите согласие для проверки формы.</div></div></div>
      <div class="col-12"><button class="btn btn-primary" type="submit">${full ? "Отправить заявку" : "Получить консультацию"}</button></div>
    </div>
    </fieldset>
    <div class="alert alert-success mt-4 mb-0" data-form-success role="status" tabindex="-1" hidden>Заявка успешно проверена в демонстрационном режиме. Данные не сохранены, письмо не отправлено.</div>
  </form>`;
}
const courseModal = `<div class="modal fade" id="course-modal" tabindex="-1" aria-labelledby="course-modal-title" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h2 class="modal-title" id="course-modal-title">Программа обучения</h2><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button></div><div class="modal-body" id="course-modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Закрыть</button><a class="btn btn-primary" id="course-apply" href="contacts.html#feedback">Оставить заявку на курс</a></div></div></div></div>`;
function page(
  filename,
  title,
  description,
  content,
  scripts = [],
  modals = "",
) {
  const html = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${description}"><meta name="color-scheme" content="light"><title>${title} — Учебный центр «Профессионал»</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/vendor/bootstrap/bootstrap.min.css"><link rel="stylesheet" href="assets/vendor/bootstrap-icons/bootstrap-icons.min.css"><link rel="stylesheet" href="assets/css/style.css"><script src="assets/vendor/bootstrap/bootstrap.bundle.min.js" defer></script><script src="assets/js/main.js" defer></script>${scripts.map((s) => `<script src="assets/js/${s}.js" defer></script>`).join("")}</head>
<body>${header(filename)}<main id="main">${content}</main>${footer}${modals}</body></html>`;
  fs.writeFileSync(path.join(root, filename), html, "utf8");
}

const benefits = `<div class="row g-4"><div class="col-md-4 benefit"><h3>${icon("tools")}Практическая подготовка</h3><p>Отработка рабочих приемов на стендах и оборудовании под руководством преподавателя.</p></div><div class="col-md-4 benefit"><h3>${icon("calendar-check")}Понятный учебный план</h3><p>Содержание, продолжительность и график занятий обсуждаются до начала обучения.</p></div><div class="col-md-4 benefit"><h3>${icon("people")}Работа с предприятиями</h3><p>Можно подобрать программы для группы сотрудников с учетом задач производства.</p></div></div>`;

page(
  "index.html",
  "Профессиональное обучение",
  "Учебный центр «Профессионал»: рабочие профессии, охрана труда и безопасность производства. Демонстрационный сайт.",
  `
<section class="hero"><div class="container"><div class="row align-items-center g-4 g-xl-5"><div class="col-lg-6"><h1>Профессиональное обучение и повышение квалификации</h1><p class="hero-description">Подготовка специалистов рабочих профессий, обучение охране труда и безопасности производства. Поможем выбрать программу для вас или сотрудников предприятия.</p><div class="d-flex flex-wrap gap-3"><a class="btn btn-primary" href="courses.html">Выбрать курс ${icon("arrow-right")}</a><a class="btn btn-outline-primary" href="#consultation">Оставить заявку</a></div><p class="hero-note">${icon("person-workspace")}Для частных лиц и организаций</p></div><div class="col-lg-6"><img src="assets/images/training.webp" class="hero-image" alt="Специалист в защитных очках работает на станке в учебной мастерской" width="1200" height="800" fetchpriority="high"></div></div></div></section>
<section class="section"><div class="container"><div class="section-heading"><h2>Направления обучения</h2><a href="courses.html">Все программы ${icon("arrow-right")}</a></div><div class="row g-3">${[
    [
      "tools",
      "Рабочие профессии",
      "Электромонтер, сварщик, слесарь, токарь и оператор котельной.",
    ],
    [
      "box-seam",
      "Подъемные сооружения",
      "Стропальщик, машинист крана и рабочий люльки подъемника.",
    ],
    [
      "shield-check",
      "Охрана труда",
      "Подготовка специалистов и обучение безопасной работе на высоте.",
    ],
    [
      "building-check",
      "Безопасность производства",
      "Пожарная и промышленная безопасность для ответственных работников.",
    ],
  ]
    .map(
      ([i, title, text]) =>
        `<div class="col-sm-6 col-xl-3"><article class="direction-card">${icon(i)}<h3>${title}</h3><p>${text}</p><a href="courses.html?category=${encodeURIComponent(title)}">Смотреть программы ${icon("arrow-right")}</a></article></div>`,
    )
    .join("")}</div></div></section>
<section class="section section-light"><div class="container"><div class="row g-4 g-xl-5 align-items-start"><div class="col-lg-7"><h2>О нашем учебном центре</h2><p>«Профессионал» — учебный центр для тех, кто осваивает рабочую специальность или обновляет профессиональные знания. Программы объединяют теоретические занятия, разбор производственных задач и практическую подготовку.</p><p>На этапе записи уточняем опыт слушателя, требования к образованию и задачи работодателя. Это помогает подобрать подходящий объем обучения и заранее согласовать организационные вопросы.</p><a href="about.html" class="btn btn-outline-primary">Подробнее об учебном центре</a></div><div class="col-lg-5"><div class="info-panel bg-white"><h3>Обучение для предприятий</h3><p>Подберем программы для сотрудников и обсудим график групповых занятий.</p><ul class="plain-list"><li>Подготовка и переподготовка работников</li><li>Повышение квалификации специалистов</li><li>Консультация по выбору программы</li></ul><a href="contacts.html#feedback">Обсудить обучение сотрудников ${icon("arrow-right")}</a></div></div></div></div></section>
<section class="section"><div class="container"><div class="section-heading"><h2>Популярные программы</h2><a href="courses.html">Перейти в каталог ${icon("arrow-right")}</a></div><p class="form-hint">Примеры программ. Цены и продолжительность приведены для демонстрации.</p><div class="row g-4" id="popular-courses"></div><noscript><p>Включите JavaScript для просмотра карточек. Перечень программ также доступен в <a href="assets/documents/programs.txt">текстовом файле</a>.</p></noscript></div></section>
<section class="section section-light benefits"><div class="container"><h2>Как организовано обучение</h2>${benefits}</div></section>
<section class="section"><div class="container"><h2>Как записаться на обучение</h2><ol class="steps row g-4"><li class="col-md-4"><h3>Выберите программу</h3><p>Сравните содержание, формат, продолжительность и стоимость в каталоге.</p></li><li class="col-md-4"><h3>Уточните условия</h3><p>Обсудите требования к поступлению, документы и удобный график занятий.</p></li><li class="col-md-4"><h3>Оформите обучение</h3><p>Подготовьте документы, согласуйте договор и приступайте к занятиям.</p></li></ol></div></section>
<section class="section section-light" id="consultation"><div class="container"><div class="row g-4 g-xl-5"><div class="col-lg-5"><h2>Поможем выбрать программу</h2><p>Укажите направление и контактные данные. В рабочей версии сайта специалист сможет уточнить ваш опыт и предложить подходящий вариант обучения.</p><p class="form-hint">Это учебный проект. Для проверки формы используйте вымышленные данные.</p><p class="mb-0"><a href="contacts.html">Контактная информация ${icon("arrow-right")}</a></p></div><div class="col-lg-7"><div class="form-panel">${form("consult")}</div></div></div></div></section>`,
  ["courses", "forms"],
  courseModal,
);

page(
  "courses.html",
  "Программы обучения",
  "Каталог 12 демонстрационных программ: рабочие профессии, подъемные сооружения, охрана труда и безопасность производства.",
  `
${intro("Программы обучения", "Выберите направление и сравните программы по содержанию, продолжительности и стоимости. Для каждой программы доступны подробности и переход к заявке.", "Курсы")}
<section class="section"><div class="container"><div class="filter-panel"><div class="row g-3 align-items-end"><div class="col-md-6"><label class="form-label" for="course-search">Поиск по названию</label><div class="input-group"><span class="input-group-text bg-white">${icon("search")}</span><input type="search" class="form-control" id="course-search" placeholder="Например, электромонтер" autocomplete="off"></div></div><div class="col-md-4"><label class="form-label" for="course-category">Направление</label><select class="form-select" id="course-category"><option value="">Все направления</option>${categories.map((c) => `<option>${c}</option>`).join("")}</select></div><div class="col-md-2"><button type="button" class="btn btn-outline-secondary w-100" id="reset-filters">Сбросить</button></div></div></div><div class="d-flex justify-content-between gap-2 flex-wrap mb-4"><p class="result-count mb-0" id="course-count" role="status" aria-live="polite"></p><p class="form-hint mb-0">Цены и сроки — демонстрационные</p></div><div class="row g-4" id="course-catalog"></div><div class="info-panel text-center" id="no-courses" hidden><h2>Программы не найдены</h2><p class="mb-0">Попробуйте другое название или сбросьте фильтры. Можно искать по части слова.</p></div><noscript><p class="alert alert-warning">Для поиска и просмотра подробностей включите JavaScript. <a href="assets/documents/programs.txt">Скачать перечень программ (TXT)</a>.</p></noscript></div></section>
<section class="section section-light"><div class="container"><h2>Практика по выбранной профессии</h2><p class="reading mb-4">Учебные задания помогают связать теорию с повседневной работой: от измерения детали до подготовки оборудования и проверки безопасности.</p><div class="row g-4 catalog-directions">${[
    [
      "welding",
      "Практическая сварка стального образца в защитной маске",
      "Сварочные работы",
    ],
    [
      "electrical",
      "Проверка учебного электрического щита измерительным прибором",
      "Электромонтаж",
    ],
    [
      "metalwork",
      "Измерение металлической детали штангенциркулем у слесарного верстака",
      "Слесарное дело",
    ],
    [
      "lifting",
      "Инструктор и слушатель проверяют стропы на грузе в мастерской",
      "Подъемное оборудование",
    ],
  ]
    .map(
      ([name, alt, label]) =>
        `<div class="col-sm-6 col-lg-3"><figure>${photo(name, alt)}<figcaption>${label}</figcaption></figure></div>`,
    )
    .join(
      "",
    )}</div><p class="form-hint mt-3 mb-0">Иллюстрации учебного процесса созданы с помощью ИИ.</p></div></section>
<section class="section"><div class="container"><div class="row g-4"><div class="col-lg-7"><h2>Перед началом обучения</h2><p>Уточните, подходит ли программа вашему опыту и образованию. Для отдельных профессий могут потребоваться медицинское заключение, опыт работы или дополнительные документы.</p><p class="mb-0">График практики, содержание итоговой аттестации и вид выдаваемого документа согласуются до оформления договора. Указанные часы — академические, по 45 минут.</p></div><div class="col-lg-5"><div class="info-panel"><h3>Не нашли нужную специальность?</h3><p>Опишите профессию и задачи сотрудника. В рабочей версии центра специалист сможет проверить возможность подготовки.</p><a class="btn btn-primary" href="contacts.html#feedback">Задать вопрос</a></div></div></div></div></section>`,
  ["courses"],
  courseModal,
);

page(
  "about.html",
  "Об учебном центре",
  "Знакомство с подходом учебного центра «Профессионал»: учебный процесс, преподавание и практическая подготовка.",
  `
${intro("Об учебном центре", "Профессиональная подготовка для взрослых слушателей и сотрудников предприятий. Теория, практика и понятная организация учебного процесса.", "О центре")}
<section class="section"><div class="container"><div class="row g-4 g-xl-5"><div class="col-lg-6"><h2>Знания для производственных задач</h2><p>Учебный центр «Профессионал» объединяет программы подготовки по рабочим профессиям, переподготовки и повышения квалификации. Каталог охватывает электротехнические и слесарные работы, сварку, эксплуатацию подъемного оборудования и безопасность производства.</p><p>При выборе курса важно учитывать не только его название, но и будущие обязанности работника. Поэтому подготовка начинается с обсуждения задач: какое оборудование предстоит обслуживать, какие приемы уже знакомы и какие навыки необходимо освоить.</p><p class="form-hint mb-0">На этой странице представлен подход вымышленного учебного центра. Помещения и участники на изображениях сгенерированы.</p></div><div class="col-lg-6"><figure class="mb-0">${photo("classroom", "Преподаватель объясняет устройство механизма взрослым слушателям у учебного стенда")}<figcaption class="photo-caption">Разбор устройства оборудования на практическом занятии</figcaption></figure></div></div></div></section>
<section class="section section-light"><div class="container"><h2>Организация учебного процесса</h2><div class="row g-4"><div class="col-lg-7"><p>Программа определяет объем теории, практической подготовки и итоговой аттестации. Учебный план и расписание доводятся до слушателя до начала занятий. Очные встречи используются для разбора сложных тем, работы с инструментом и выполнения практических заданий.</p><p>В очно-заочном формате часть теоретического материала изучается самостоятельно по подготовленным заданиям. Контактные занятия и практика проходят по согласованному графику; такой формат не означает полностью дистанционное освоение профессии.</p><p class="mb-0">Для корпоративных групп обсуждаются состав слушателей, исходная подготовка и организационные ограничения предприятия. Условия фиксируются в договоре.</p></div><div class="col-lg-5"><div class="info-panel bg-white"><h3>Что уточнить при поступлении</h3><ul class="plain-list mb-0"><li>Необходимое исходное образование</li><li>Требования к опыту и состоянию здоровья</li><li>Объем и место прохождения практики</li><li>Расписание и порядок оплаты</li><li>Итоговую аттестацию и выдаваемый документ</li></ul></div></div></div></div></section>
<section class="section"><div class="container"><div class="row g-4 g-xl-5"><div class="col-md-6"><h2>Подход преподавателей</h2><p>Теоретический материал объясняется на примерах рабочих операций: чтении схем, выборе инструмента, осмотре оборудования и поиске типовых неисправностей. После объяснения слушатель выполняет задание и получает обратную связь.</p><p class="mb-0">При формировании преподавательского состава учитываются профильное образование, практический опыт и способность понятно объяснять требования безопасности. В реальном проекте здесь будут размещены подтвержденные сведения о педагогах.</p></div><div class="col-md-6"><h2>Практическая подготовка</h2><p>Занятия в мастерской начинаются с инструктажа, проверки рабочего места и средств защиты. Сложность заданий увеличивается по мере освоения приемов: от отдельных операций до последовательного выполнения учебной задачи.</p><p class="mb-0">Практика позволяет проверить, умеет ли слушатель применять знания, замечать опасные условия и соблюдать порядок работы. Самостоятельный допуск на предприятии оформляет работодатель в установленном для конкретной работы порядке.</p></div></div></div></section>
<section class="section section-light benefits"><div class="container"><h2>Что важно в обучении</h2>${benefits}</div></section>
<section class="section"><div class="container"><div class="row g-4 g-xl-5"><div class="col-lg-4"><h2>Вопросы об обучении</h2><p>Ответы помогут подготовиться к выбору программы. Индивидуальные условия уточняются до заключения договора.</p><a class="btn btn-primary" href="courses.html">Выбрать программу</a></div><div class="col-lg-8">${faq(
    "about-faq",
    [
      [
        "Можно ли учиться без опыта работы?",
        "Да, в каталоге предусмотрены программы первоначальной подготовки. Для переподготовки и повышения квалификации требования отличаются: перед поступлением необходимо уточнить исходное образование и имеющийся опыт.",
      ],
      [
        "Можно ли совместить занятия с работой?",
        "Для части программ предусмотрен очно-заочный формат. Конкретные даты контактных занятий и практики согласуются заранее. Практические навыки нельзя заменить только самостоятельным чтением материалов.",
      ],
      [
        "Есть ли обучение для группы сотрудников?",
        "Можно обсудить подготовку группы по одной или нескольким программам. Для подбора нужны профессии слушателей, их опыт, количество человек и желаемый период обучения.",
      ],
      [
        "Гарантируется ли трудоустройство?",
        "Нет. Этот демонстрационный проект не обещает трудоустройство, получение допуска или успешное прохождение внешней аттестации. Решение о приеме на работу и допуске принимает работодатель.",
      ],
    ],
  )}</div></div></div></section>`,
);

const documentData = [
  {
    id: "organization",
    title: "Сведения об организации",
    description: "Основные сведения и место для подтвержденных реквизитов.",
    section: "Основные документы",
    html: "<h3>Назначение страницы</h3><p>Учебный центр «Профессионал» — вымышленная образовательная организация, созданная для университетского проекта.</p><h3>Условные сведения</h3><p>Адрес: г. Владимир, ул. Учебная, д. 10. График: понедельник–пятница, 9:00–18:00. Контакты: +7 (4922) 00-00-00, info@professional.example.</p><h3>Лицензия и реквизиты</h3><p>Не размещены. При использовании проекта реальной организацией этот раздел следует заполнить подтвержденными сведениями и действительными документами. Наличие лицензии данным проектом не заявляется.</p>",
  },
  {
    id: "application",
    title: "Образец заявления на обучение",
    description: "Какие сведения могут потребоваться при поступлении.",
    section: "Основные документы",
    html: "<p>Руководителю учебного центра «Профессионал»</p><p>От: ____________________<br>Контактный телефон: ____________________</p><h3>Заявление</h3><p>Прошу рассмотреть возможность зачисления на программу ____________________ в период ____________________.</p><p>Сведения об образовании: ____________________.<br>Имеющаяся профессия и опыт: ____________________.</p><p>С содержанием программы, форматом и условиями обучения ознакомлен(а).</p><p>Дата: ____________________<br>Подпись: ____________________</p><p>Данный образец не является действующим заявлением и не оформляет зачисление.</p>",
  },
  {
    id: "contract",
    title: "Образец договора",
    description: "Учебный пример структуры договора об обучении.",
    section: "Основные документы",
    html: "<h3>1. Предмет договора</h3><p>Исполнитель организует обучение по согласованной программе; заказчик знакомится с условиями и оплачивает услуги. В действующем договоре должны быть указаны настоящие стороны и реквизиты.</p><h3>2. Условия обучения</h3><p>Название программы, объем часов, форма, период, место практики и порядок итоговой аттестации фиксируются до подписания.</p><h3>3. Стоимость и оплата</h3><p>Цена, сроки платежей, условия изменения и возврата оплаты определяются договором. Демонстрационные цены каталога не являются офертой.</p><h3>4. Права и обязанности</h3><p>Исполнитель предоставляет согласованную программу и условия обучения. Слушатель посещает занятия, выполняет задания и соблюдает правила безопасности.</p><h3>5. Завершение обучения</h3><p>Вид итогового документа и условия его выдачи указываются с учетом выбранной программы и установленных требований.</p><p>Это учебный макет структуры, не готовый юридический документ. Для реального применения требуется подготовленный и проверенный договор.</p>",
  },
  {
    id: "admission",
    title: "Правила приема",
    description: "Порядок выбора программы и оформления обучения.",
    section: "Информация для слушателей",
    html: "<ol><li>Выбрать программу и уточнить требования к исходному образованию, опыту и состоянию здоровья.</li><li>Согласовать формат, график, практическую подготовку и стоимость.</li><li>Получить список документов для конкретной программы. Не отправлять паспортные данные через демонстрационную форму.</li><li>Ознакомиться с договором и правилами обучения.</li><li>Оформить зачисление в порядке, предусмотренном реальной образовательной организацией.</li></ol><p>Онлайн-форма на сайте только демонстрирует проверку полей и не оформляет поступление.</p>",
  },
  {
    id: "privacy",
    title: "Политика обработки персональных данных",
    description:
      "Как устроена демонстрационная форма и что происходит с данными.",
    section: "Информация для слушателей",
    html: "<h3>Демонстрационный режим</h3><p>Сайт представляет университетский проект вымышленной организации. Формы проверяются JavaScript-кодом в браузере. Их содержимое не передается на сервер, не отправляется по электронной почте и не сохраняется в localStorage, cookies или базе данных.</p><h3>Какие поля используются</h3><p>Имя, телефон, email, направление обучения, сообщение и отметка согласия нужны только для демонстрации клиентской валидации. Рекомендуется вводить вымышленные данные. Документы и сведения о здоровье через сайт не собираются.</p><h3>Сторонние ресурсы</h3><p>Bootstrap, иконки и фотографии загружаются из локальной папки сайта. Аналитика, внешние карты и сторонние шрифты не подключены. Обычный HTTP-сервер может вести технический журнал обращений к страницам.</p><h3>Переход к реальному сайту</h3><p>Перед приемом настоящих заявок необходимо определить оператора, цели, основания и сроки обработки, настроить безопасный backend и опубликовать политику, соответствующую реальной обработке данных. Этот текст не подменяет такую политику.</p>",
  },
  {
    id: "programs",
    title: "Информация о программах обучения",
    description: "Виды программ, форматы, аттестация и условные цены.",
    section: "Образовательная деятельность",
    html: '<p>Каталог содержит 12 демонстрационных программ по четырем направлениям: рабочие профессии, подъемные сооружения, охрана труда и безопасность производства.</p><p>Продолжительность составляет от 40 до 320 академических часов. Один академический час — 45 минут. Форматы: очный и очно-заочный. Стоимость — от 4 500 до 22 000 рублей; все значения условные.</p><p>Содержание, аудитория и результаты каждой программы доступны в каталоге. Исходное образование, медицинские требования, конкретное оборудование, график практики и вид итогового документа уточняются до заключения договора.</p><p>Обучение не означает автоматическое получение допуска работодателя или прохождение внешней аттестации.</p><p><a href="courses.html">Открыть каталог программ</a></p>',
  },
];
for (const doc of documentData) {
  const text = doc.html
    .replace(/<br\s*\/?\s*>/g, "\n")
    .replace(/<\/(?:p|h3|li)>/g, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ");
  fs.writeFileSync(
    path.join(root, "assets/documents", `${doc.id}.txt`),
    `ДЕМОНСТРАЦИОННЫЙ ДОКУМЕНТ\nУчебный центр «Профессионал» — вымышленная организация\n\n${doc.title}\n\n${text.trimEnd()}\n`,
    "utf8",
  );
}
const documentGroups = [
  "Основные документы",
  "Образовательная деятельность",
  "Информация для слушателей",
]
  .map(
    (group) =>
      `<section class="mb-5"><h2>${group}</h2><ul class="document-list">${documentData
        .filter((d) => d.section === group)
        .map(
          (d) =>
            `<li>${icon("file-earmark-text")}<div><h3>${d.title}</h3><p>${d.description}</p><a href="assets/documents/${d.id}.txt" download class="small">Скачать образец (TXT)</a></div><button class="btn btn-outline-primary" type="button" data-document="${d.id}" data-title="${d.title}" aria-label="Просмотреть: ${d.title}">Просмотреть</button></li>`,
        )
        .join("")}</ul></section>`,
  )
  .join("");
const documentModal = `<div class="modal fade" id="document-modal" tabindex="-1" aria-labelledby="document-modal-title" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h2 class="modal-title" id="document-modal-title">Документ</h2><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button></div><div class="modal-body"><p class="alert alert-secondary">Демонстрационный образец. Не является действующим документом.</p><div id="document-modal-body"></div></div><div class="modal-footer justify-content-end"><button class="btn btn-outline-secondary" type="button" data-bs-dismiss="modal">Закрыть</button></div></div></div></div>${documentData.map((d) => `<template id="document-${d.id}">${d.html}</template>`).join("")}`;
page(
  "documents.html",
  "Документы и сведения",
  "Демонстрационные сведения и образцы документов учебного центра: заявление, договор, правила приема и политика обработки данных.",
  `
${intro("Документы и сведения", "Образцы документов и информация, с которыми слушатель знакомится перед началом обучения. Любой документ можно прочитать на сайте или скачать.")}
<section class="section"><div class="container"><div class="alert alert-secondary mb-5">${icon("info-circle")} Все материалы — учебные образцы. Они не подтверждают существование организации и не являются действующими юридическими документами.</div><div class="row g-4 g-xl-5"><div class="col-lg-8">${documentGroups}<section id="privacy"><h2>Обработка персональных данных</h2><p>Формы этого сайта не отправляют и не сохраняют данные. Проверка выполняется в браузере; для тестирования используйте вымышленные сведения.</p><p>Полный текст демонстрационной политики описывает поля форм, отсутствие передачи данных и изменения, необходимые перед запуском настоящего приема заявок.</p><button class="btn btn-outline-primary" type="button" data-document="privacy" data-title="Политика обработки персональных данных">Прочитать политику</button></section></div><aside class="col-lg-4"><div class="info-panel"><h2>Лицензия на обучение</h2><p>Сайт представляет вымышленную организацию. Сведения о действующей образовательной лицензии отсутствуют.</p><p class="mb-0">При подготовке реального сайта в этом разделе размещаются подтвержденные сведения и ссылка на официальный реестр.</p></div><div class="mt-4"><h2 class="h4">Нужна помощь?</h2><p>Условия поступления и список документов зависят от выбранной программы.</p><a href="contacts.html#feedback">Задать вопрос ${icon("arrow-right")}</a></div></aside></div></div></section>
<section class="section section-light"><div class="container"><h2>Вопросы о документах</h2>${faq(
    "documents-faq",
    [
      [
        "Какой документ выдается по окончании обучения?",
        "Вид документа зависит от программы: профессиональное обучение, повышение квалификации или профессиональная переподготовка. Он определяется до поступления с учетом исходного образования и условий итоговой аттестации. Демонстрационный сайт документы не выдает.",
      ],
      [
        "Достаточно ли отправить форму для зачисления?",
        "Нет. В действующей организации после консультации потребуются необходимые документы, договор и оформление зачисления. На этом сайте форма работает только как учебный пример.",
      ],
      [
        "Можно ли использовать образец договора без изменений?",
        "Нет. Здесь показана только структура документа. Для реального применения нужны настоящие реквизиты, условия оказания услуг и проверка текста применительно к деятельности организации.",
      ],
    ],
  )}</div></section>
<section class="section"><div class="container d-flex justify-content-between align-items-center gap-4 flex-wrap"><div><h2 class="mb-2">Уточните условия до поступления</h2><p class="mb-0">Содержание программы, требования к слушателям и порядок оформления.</p></div><a class="btn btn-primary" href="contacts.html#feedback">Связаться с учебным центром</a></div></section>`,
  [],
  documentModal,
);

page(
  "contacts.html",
  "Контакты",
  "Демонстрационные контакты учебного центра «Профессионал» и форма обратной связи с клиентской валидацией.",
  `
${intro("Контакты", "Здесь можно уточнить содержание программы, условия поступления или обучение группы сотрудников. Контактные данные приведены для демонстрации.")}
<section class="section"><div class="container"><div class="row g-4 g-xl-5"><div class="col-lg-5"><h2>Учебный центр «Профессионал»</h2><dl class="contact-details"><dt>${icon("geo-alt")} Адрес</dt><dd>г. Владимир, ул. Учебная, д. 10<br><span class="form-hint">Условный адрес, не место приема посетителей</span></dd><dt>${icon("telephone")} Телефон</dt><dd><a href="tel:+74920000000">+7 (4922) 00-00-00</a></dd><dt>${icon("envelope")} Электронная почта</dt><dd><a href="mailto:info@professional.example">info@professional.example</a></dd><dt>${icon("clock")} График работы</dt><dd>Понедельник–пятница: 9:00–18:00<br>Суббота, воскресенье: выходные<br><span class="form-hint">Время московское</span></dd></dl></div><div class="col-lg-7"><div class="location-panel">${icon("geo-alt")}<h2>Местоположение учебного центра</h2><p>В реальном проекте здесь будет схема проезда к учебным аудиториям и мастерским.</p><p class="mb-0 form-hint">Адрес вымышленный, поэтому отметка на карте не размещена. Телефон и почта также демонстрационные и не предназначены для связи с действующей организацией.</p></div></div></div></div></section>
<section class="section section-light" id="feedback"><div class="container"><div class="row g-4 g-xl-5"><div class="col-lg-4"><h2>Обратная связь</h2><p>Выберите направление и опишите вопрос. Если обращаетесь от предприятия, можно указать количество слушателей и желаемые сроки.</p><p>Не отправляйте паспортные данные, документы об образовании и медицинские сведения через эту форму.</p><div class="mt-4"><h3 class="h5">Как проверить форму</h3><p class="form-hint mb-0">Введите вымышленные имя, телефон и email. После проверки появится сообщение о демонстрационной обработке. Реальное письмо не отправляется.</p></div></div><div class="col-lg-8"><div class="form-panel">${form("feedback", true)}</div></div></div></div></section>`,
  ["courses", "forms"],
);

console.log(
  "Созданы 5 самостоятельных HTML-страниц и 6 демонстрационных документов.",
);
