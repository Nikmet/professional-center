/* Единственный источник сведений о программах. Данные учебные. */
"use strict";
window.trainingCourses = [
  {
    id: "electrician",
    title: "Электромонтер",
    category: "Рабочие профессии",
    hours: 256,
    format: "Очно-заочно",
    price: 14500,
    description:
      "Обслуживание электрооборудования, чтение схем и поиск неисправностей.",
    audience:
      "Для начинающих специалистов и работников электротехнических служб.",
    topics: [
      "Основы электротехники и чтение электрических схем",
      "Монтаж, обслуживание и диагностика электрооборудования",
      "Безопасные приемы работы на учебных стендах",
    ],
    result:
      "Подготовка к выполнению работ по обслуживанию и ремонту электрооборудования. Группа по электробезопасности не присваивается автоматически.",
  },
  {
    id: "welder",
    title: "Электрогазосварщик",
    category: "Рабочие профессии",
    hours: 320,
    format: "Очно",
    price: 18500,
    description:
      "Подготовка металла, ручная дуговая сварка и контроль сварных соединений.",
    audience: "Для слушателей, осваивающих профессию сварщика с нуля.",
    topics: [
      "Материаловедение и подготовка кромок",
      "Настройка оборудования и ручная дуговая сварка",
      "Практика выполнения швов и визуальный контроль",
    ],
    result:
      "Освоение базовых приемов сварки на учебных образцах. Аттестация НАКС в программу не входит.",
  },
  {
    id: "mechanic",
    title: "Слесарь-ремонтник",
    category: "Рабочие профессии",
    hours: 256,
    format: "Очно-заочно",
    price: 12000,
    description:
      "Слесарная обработка деталей, разборка и ремонт промышленного оборудования.",
    audience: "Для работников ремонтных служб и начинающих слесарей.",
    topics: [
      "Чертежи, допуски и технические измерения",
      "Ручная обработка и подгонка деталей",
      "Разборка, сборка и обслуживание механизмов",
    ],
    result:
      "Навыки слесарной обработки и планового обслуживания простых механизмов.",
  },
  {
    id: "rigger",
    title: "Стропальщик",
    category: "Подъемные сооружения",
    hours: 160,
    format: "Очно-заочно",
    price: 8500,
    description:
      "Подбор стропов, схемы строповки и безопасное перемещение грузов.",
    audience: "Для работников складов, строительных площадок и производств.",
    topics: [
      "Виды грузозахватных приспособлений",
      "Схемы строповки и браковка стропов",
      "Сигналы крановщику и безопасная организация работ",
    ],
    result:
      "Подготовка к строповке и сопровождению грузов с учетом требований безопасности.",
  },
  {
    id: "crane",
    title: "Машинист крана",
    category: "Подъемные сооружения",
    hours: 320,
    format: "Очно",
    price: 22000,
    description:
      "Устройство мостовых кранов, управление и ежесменное обслуживание.",
    audience: "Для работников, осваивающих управление мостовым краном.",
    topics: [
      "Устройство мостового крана и приборы безопасности",
      "Проверки перед началом смены",
      "Практическая отработка управления под руководством инструктора",
    ],
    result:
      "Базовая подготовка машиниста мостового крана. Тип оборудования и условия практики согласуются при записи.",
  },
  {
    id: "boiler",
    title: "Оператор котельной",
    category: "Рабочие профессии",
    hours: 256,
    format: "Очно-заочно",
    price: 15000,
    description:
      "Эксплуатация водогрейных котлов, контроль параметров и действия при сбоях.",
    audience: "Для работников теплоэнергетических служб.",
    topics: [
      "Устройство котельной и вспомогательного оборудования",
      "Контроль давления, температуры и работы автоматики",
      "Пуск, останов и действия в нештатных ситуациях",
    ],
    result:
      "Подготовка к обслуживанию котельного оборудования. Конкретный тип котлов уточняется до заключения договора.",
  },
  {
    id: "platform",
    title: "Рабочий люльки подъемника",
    category: "Подъемные сооружения",
    hours: 40,
    format: "Очно",
    price: 4500,
    description:
      "Безопасная работа в люльке, средства защиты и взаимодействие с машинистом.",
    audience: "Для монтажников и работников, выполняющих задачи с подъемника.",
    topics: [
      "Осмотр люльки и защитных устройств",
      "Средства индивидуальной защиты",
      "Сигнальная связь и порядок эвакуации",
    ],
    result: "Знание безопасных приемов выполнения работ в люльке подъемника.",
  },
  {
    id: "safety",
    title: "Специалист по охране труда",
    category: "Охрана труда",
    hours: 256,
    format: "Очно-заочно",
    price: 16500,
    description:
      "Профессиональная переподготовка: управление охраной труда на предприятии.",
    audience:
      "Для слушателей со средним профессиональным или высшим образованием.",
    topics: [
      "Организация системы управления охраной труда",
      "Оценка профессиональных рисков и профилактика травматизма",
      "Документация, инструктажи и расследование происшествий",
    ],
    result:
      "Программа профессиональной переподготовки. Требования к исходному образованию и итоговый документ уточняются до поступления.",
  },
  {
    id: "fire",
    title: "Пожарная безопасность",
    category: "Безопасность производства",
    hours: 72,
    format: "Очно-заочно",
    price: 5500,
    description:
      "Повышение квалификации ответственных за пожарную безопасность.",
    audience:
      "Для ответственных работников при наличии необходимого исходного образования.",
    topics: [
      "Организация противопожарного режима",
      "Первичные средства пожаротушения",
      "Обучение сотрудников и планирование эвакуации",
    ],
    result:
      "Обновление знаний по организации пожарной безопасности. Условия допуска определяются выбранной программой.",
  },
  {
    id: "height",
    title: "Работы на высоте",
    category: "Охрана труда",
    hours: 40,
    format: "Очно",
    price: 6000,
    description:
      "Оценка рисков, применение страховочных систем и практическая подготовка.",
    audience: "Для работников, которым предстоит выполнять работы на высоте.",
    topics: [
      "Опасности и организация рабочего места",
      "Осмотр и применение страховочного оборудования",
      "Практика безопасного перемещения и основы спасения",
    ],
    result:
      "Подготовка по безопасным приемам работ на высоте. Группа и программа подбираются по характеру работ.",
  },
  {
    id: "industrial",
    title: "Промышленная безопасность",
    category: "Безопасность производства",
    hours: 72,
    format: "Очно-заочно",
    price: 7500,
    description:
      "Подготовка руководителей и специалистов по основам промышленной безопасности.",
    audience: "Для руководителей и специалистов производственных предприятий.",
    topics: [
      "Общие требования промышленной безопасности",
      "Производственный контроль",
      "Разбор производственных ситуаций и подготовка к проверке знаний",
    ],
    result:
      "Подготовка к проверке знаний. Государственная аттестация и ее результат не входят в стоимость и не гарантируются.",
  },
  {
    id: "turner",
    title: "Токарь",
    category: "Рабочие профессии",
    hours: 320,
    format: "Очно",
    price: 19000,
    description:
      "Обработка деталей на токарных станках и контроль точности размеров.",
    audience: "Для начинающих станочников и сотрудников механических участков.",
    topics: [
      "Устройство станка и режущий инструмент",
      "Наружное точение, растачивание и нарезание резьбы",
      "Контроль размеров и практическая работа",
    ],
    result: "Освоение основных токарных операций на учебном оборудовании.",
  },
];

(() => {
  const courses = window.trainingCourses;
  const money = (value) => new Intl.NumberFormat("ru-RU").format(value) + " ₽";
  const headingTag = document.querySelector("#course-catalog") ? "h2" : "h3";
  const card = (course) =>
    `<div class="col-md-6 col-xl-4"><article class="card course-card"><div class="card-body"><span class="badge badge-category">${course.category}</span><${headingTag} class="card-title">${course.title}</${headingTag}><p class="card-text">${course.description}</p><div class="course-meta"><span><i class="bi bi-clock" aria-hidden="true"></i>${course.hours} академических часов</span><span><i class="bi bi-person-workspace" aria-hidden="true"></i>${course.format}</span></div><div class="course-bottom"><span class="course-price">${money(course.price)}</span><button type="button" class="btn btn-outline-primary" data-course="${course.id}" aria-label="Подробнее о программе «${course.title}»">Подробнее</button></div></div></article></div>`;
  const catalog = document.querySelector("#course-catalog");
  const popular = document.querySelector("#popular-courses");
  if (popular)
    popular.innerHTML = courses
      .filter((c) => ["electrician", "welder", "rigger"].includes(c.id))
      .map(card)
      .join("");

  if (catalog) {
    const search = document.querySelector("#course-search");
    const category = document.querySelector("#course-category");
    const count = document.querySelector("#course-count");
    const empty = document.querySelector("#no-courses");
    const normalize = (value) =>
      value.toLocaleLowerCase("ru-RU").replaceAll("ё", "е").trim();
    const allowedCategories = [...new Set(courses.map((c) => c.category))];
    const initialCategory = new URLSearchParams(location.search).get(
      "category",
    );
    if (allowedCategories.includes(initialCategory))
      category.value = initialCategory;
    function renderCatalog() {
      const query = normalize(search.value);
      const result = courses.filter(
        (c) =>
          normalize(c.title).includes(query) &&
          (!category.value || c.category === category.value),
      );
      catalog.innerHTML = result.map(card).join("");
      count.textContent = `Найдено программ: ${result.length} из ${courses.length}`;
      empty.hidden = result.length !== 0;
    }
    search.addEventListener("input", renderCatalog);
    category.addEventListener("change", renderCatalog);
    document.querySelector("#reset-filters").addEventListener("click", () => {
      search.value = "";
      category.value = "";
      history.replaceState(null, "", location.pathname);
      renderCatalog();
      search.focus();
    });
    renderCatalog();
  }

  const modal = document.querySelector("#course-modal");
  if (!modal) return;
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-course]");
    if (!button) return;
    const course = courses.find((c) => c.id === button.dataset.course);
    if (!course) return;
    document.querySelector("#course-modal-title").textContent = course.title;
    document.querySelector("#course-modal-body").innerHTML =
      `<span class="badge badge-category">${course.category}</span><p class="mt-3">${course.description}</p><dl class="row mb-0"><dt class="col-6">Продолжительность</dt><dd class="col-6">${course.hours} ак. часов</dd><dt class="col-6">Формат</dt><dd class="col-6">${course.format}</dd><dt class="col-6">Стоимость</dt><dd class="col-6">${money(course.price)}</dd></dl><h3>Кому подойдет</h3><p>${course.audience}</p><h3>Что входит в программу</h3><ul class="plain-list">${course.topics.map((topic) => `<li>${topic}</li>`).join("")}</ul><h3>Результат обучения</h3><p>${course.result}</p><p class="form-hint mb-0">Демонстрационная программа. Стоимость и сроки условные. Итоговый документ зависит от вида программы, исходного образования и результатов аттестации.</p>`;
    document.querySelector("#course-apply").href =
      `contacts.html?course=${encodeURIComponent(course.id)}#feedback`;
    bootstrap.Modal.getOrCreateInstance(modal).show(button);
    modal.addEventListener("hidden.bs.modal", () => button.focus(), {
      once: true,
    });
  });
})();
