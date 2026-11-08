/* Проверка готового сайта. Playwright нужен только для разработки, не для запуска. */
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const root = path.resolve(__dirname, "..");
const evidence = path.join(root, ".impeccable/review");
fs.mkdirSync(evidence, { recursive: true });
const base = "http://127.0.0.1:4173";
const pages = ["index", "courses", "about", "documents", "contacts"];

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  const failedResources = [];
  const report = {
    viewports: [],
    functionality: [],
    accessibility: [],
    links: [],
  };
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) failedResources.push(response.url());
  });
  page.on("requestfailed", (request) => failedResources.push(request.url()));

  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const name of pages) {
      await page.goto(`${base}/${name}.html`, { waitUntil: "networkidle" });
      // Загрузить также фотографии ниже первого экрана.
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.forEach((image) => (image.loading = "eager")),
        );
      await page.evaluate(() =>
        Promise.all([...document.images].map((image) => image.decode())),
      );
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        headings: document.querySelectorAll("h1").length,
        images: [...document.images].every(
          (img) => img.complete && img.naturalWidth > 0,
        ),
        active: document
          .querySelector('.navbar [aria-current="page"]')
          ?.getAttribute("href"),
      }));
      assert.ok(
        metrics.scrollWidth <= width,
        `${name} ${width}: overflow ${metrics.scrollWidth}`,
      );
      assert.equal(metrics.headings, 1);
      assert.equal(metrics.images, true);
      assert.equal(metrics.active, `${name}.html`);
      await page.screenshot({
        path: path.join(evidence, `${name}-${width}.png`),
        fullPage: true,
      });
      report.viewports.push({ page: name, width, ...metrics });
      if (width === 375 || width === 1440) {
        await page.addScriptTag({ path: path.join(__dirname, "axe.min.js") });
        const audit = await page.evaluate(() =>
          axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          }),
        );
        report.accessibility.push({
          page: name,
          width,
          violations: audit.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.map((n) => n.target),
          })),
        });
      }
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      for (const href of [...new Set(hrefs)]) {
        if (/^(tel:|mailto:|https?:)/.test(href)) continue;
        assert.notEqual(href, "#");
        const url = new URL(href, page.url());
        const response = await context.request.get(url.href);
        assert.equal(response.status(), 200, href);
        if (url.hash && url.pathname.endsWith(".html")) {
          const body = await response.text();
          assert.ok(
            body.includes(`id="${url.hash.slice(1)}"`),
            `Missing anchor ${href}`,
          );
        }
      }
      report.links.push({ page: name, width, checked: new Set(hrefs).size });
      console.log(`Checked ${name} ${width}px`);
    }
  }

  fs.writeFileSync(
    path.join(evidence, "checks.json"),
    JSON.stringify(report, null, 2),
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${base}/courses.html`);
  const cards = page.locator("#course-catalog .course-card");
  assert.equal(await cards.count(), 12);
  await page.locator("#course-search").fill("электро");
  assert.equal(await cards.count(), 2);
  await page.locator("#course-search").fill("ЭЛЕКТРОМОНТЁР");
  assert.equal(await cards.count(), 1);
  await page.locator("#course-search").fill("несуществующий курс");
  assert.equal(await cards.count(), 0);
  assert.equal(await page.locator("#no-courses").isVisible(), true);
  await page.locator("#reset-filters").click();
  assert.equal(await cards.count(), 12);
  let categoryTotal = 0;
  for (const category of [
    "Рабочие профессии",
    "Подъемные сооружения",
    "Охрана труда",
    "Безопасность производства",
  ]) {
    await page.locator("#course-category").selectOption(category);
    categoryTotal += await cards.count();
    const badges = await cards.locator(".badge").allTextContents();
    assert.ok(badges.every((text) => text === category));
  }
  assert.equal(categoryTotal, 12);
  await page.locator("#reset-filters").click();
  const courseData = await page.evaluate(() => window.trainingCourses);
  for (const course of courseData) {
    await page.locator(`[data-course="${course.id}"]`).click();
    await page.locator("#course-modal").waitFor({ state: "visible" });
    await page.waitForFunction(
      () =>
        !bootstrap.Modal.getInstance(document.querySelector("#course-modal"))
          ._isTransitioning,
    );
    assert.equal(
      await page.locator("#course-modal-title").textContent(),
      course.title,
    );
    assert.ok(
      (await page.locator("#course-modal-body").textContent()).includes(
        String(course.hours),
      ),
    );
    assert.ok(
      (await page.locator("#course-modal-body").textContent()).includes(
        course.topics[0],
      ),
    );
    assert.ok(
      (await page.locator("#course-apply").getAttribute("href")).includes(
        `course=${course.id}`,
      ),
    );
    await page.keyboard.press("Escape");
    await page.locator("#course-modal").waitFor({ state: "hidden" });
    // hidden становится видимым для Playwright раньше завершения исчезновения backdrop.
    await page.waitForFunction(
      (id) => document.activeElement?.dataset.course === id,
      course.id,
    );
  }
  report.functionality.push(
    "Поиск с ё/е и регистром; четыре фильтра; сброс; счетчик; пустое состояние; все 12 модальных окон; Escape и возврат фокуса.",
  );

  await page.goto(`${base}/contacts.html?course=welder#feedback`);
  assert.equal(
    await page.locator("#feedback-direction").inputValue(),
    "Рабочие профессии",
  );
  assert.ok(
    (await page.locator("#feedback-message").inputValue()).includes(
      "Электрогазосварщик",
    ),
  );
  for (const [filename, prefix] of [
    ["contacts", "feedback"],
    ["index", "consult"],
  ]) {
    await page.goto(`${base}/${filename}.html`);
    const form = page.locator("[data-demo-form]");
    await form.locator("button[type=submit]").click();
    assert.equal(await form.locator("[data-form-success]").isVisible(), false);
    assert.equal(
      await page
        .locator(`#${prefix}-name`)
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.locator(`#${prefix}-name`).fill("  ");
    await page.locator(`#${prefix}-phone`).fill("12345");
    await page
      .locator(`#${prefix}-direction`)
      .selectOption("Рабочие профессии");
    await page.locator(`#${prefix}-consent`).check();
    if (filename === "contacts") {
      await page.locator("#feedback-email").fill("invalid");
      await page.locator("#feedback-message").fill("Коротко");
    }
    await form.locator("button[type=submit]").click();
    assert.equal(await form.locator("[data-form-success]").isVisible(), false);
    await page.locator(`#${prefix}-name`).fill("Иван");
    await page.locator(`#${prefix}-phone`).fill("+7 (900) 123-45-67");
    if (filename === "contacts") {
      await form.locator("button[type=submit]").click();
      assert.equal(
        await form.locator("[data-form-success]").isVisible(),
        false,
      );
      await page.locator("#feedback-email").fill("student@example.com");
      await page
        .locator("#feedback-message")
        .fill("Интересует программа профессиональной подготовки.");
    }
    await page.locator(`#${prefix}-consent`).uncheck();
    await form.locator("button[type=submit]").click();
    assert.equal(await form.locator("[data-form-success]").isVisible(), false);
    await page.locator(`#${prefix}-consent`).check();
    let transmissions = 0;
    const handler = (request) => {
      if (request.method() === "POST") transmissions++;
    };
    page.on("request", handler);
    await form.locator("button[type=submit]").click();
    await form.locator("[data-form-success]").waitFor({ state: "visible" });
    assert.equal(await page.locator(`#${prefix}-name`).inputValue(), "");
    assert.equal(transmissions, 0);
    page.off("request", handler);
  }
  report.functionality.push(
    "Обе формы: обязательные поля, пробелы в имени, неверный телефон, email, длина сообщения, согласие, успех и сброс; отсутствие POST; перенос выбранного курса.",
  );

  await page.goto(`${base}/documents.html`);
  for (const id of [
    "organization",
    "application",
    "contract",
    "admission",
    "privacy",
    "programs",
  ]) {
    const button = page.locator(`[data-document="${id}"]`).first();
    await button.click();
    await page.locator("#document-modal").waitFor({ state: "visible" });
    await page.waitForFunction(
      () =>
        !bootstrap.Modal.getInstance(document.querySelector("#document-modal"))
          ._isTransitioning,
    );
    assert.equal(
      await page.locator("#document-modal-title").textContent(),
      await button.getAttribute("data-title"),
    );
    assert.ok(
      (await page.locator("#document-modal-body").textContent()).length > 150,
    );
    await page.keyboard.press("Escape");
    await page.locator("#document-modal").waitFor({ state: "hidden" });
    const response = await context.request.get(
      `${base}/assets/documents/${id}.txt`,
    );
    assert.equal(response.status(), 200);
  }
  for (const filename of ["about", "documents"]) {
    await page.goto(`${base}/${filename}.html`);
    for (const button of await page.locator(".accordion-button").all()) {
      await button.click();
      assert.equal(await button.getAttribute("aria-expanded"), "true");
      await page
        .locator(await button.getAttribute("data-bs-target"))
        .waitFor({ state: "visible" });
    }
  }
  report.functionality.push(
    "Шесть документов: модальные представления и локальные TXT; все вопросы двух FAQ.",
  );

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${base}/index.html`);
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await page.locator("#main-navigation").waitFor({ state: "visible" });
  assert.equal(
    await page.locator(".navbar-toggler").getAttribute("aria-expanded"),
    "true",
  );
  await page
    .locator("#main-navigation")
    .getByRole("link", { name: "Курсы", exact: true })
    .click();
  await page.waitForURL("**/courses.html");
  assert.equal(
    await page.locator(".navbar .nav-link.active").textContent(),
    "Курсы",
  );
  await page.keyboard.press("Tab");
  report.functionality.push(
    "Мобильное меню Bootstrap Collapse: раскрытие, переход на курсы, активная страница.",
  );

  const noScriptContext = await browser.newContext({
    javaScriptEnabled: false,
  });
  const noScriptPage = await noScriptContext.newPage();
  for (const filename of ["index", "contacts"]) {
    await noScriptPage.goto(`${base}/${filename}.html`);
    assert.equal(
      await noScriptPage
        .locator("[data-demo-form] button[type=submit]")
        .isEnabled(),
      false,
    );
    assert.equal(
      await noScriptPage
        .locator("[data-demo-form] input[name=name]")
        .isEnabled(),
      false,
    );
    assert.equal(
      await noScriptPage.locator("[data-demo-form] noscript").isVisible(),
      true,
    );
    assert.equal(await noScriptPage.locator(".navbar .nav-link").count(), 5);
  }
  await noScriptContext.close();
  report.functionality.push(
    "Без JavaScript обе формы отключены, показано объяснение; статическая навигация сохранена.",
  );
  report.errors = errors;
  report.failedResources = failedResources;
  report.timestamp = new Date().toISOString();
  fs.writeFileSync(
    path.join(evidence, "checks.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
  assert.equal(errors.length, 0, "Browser console errors");
  assert.equal(failedResources.length, 0, "Missing resources");
  assert.equal(
    report.accessibility.flatMap((a) => a.violations).length,
    0,
    "Axe violations",
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
