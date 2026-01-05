(() => {
  const LANG_KEY = "site_lang";

  function getSavedLang() {
    return localStorage.getItem(LANG_KEY) || "zh";
  }
  function setSavedLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
  }

  function applyI18n(lang) {
    const dict = window.I18N && window.I18N[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  function setActiveNav() {
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-links a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      a.classList.toggle("active", href.endsWith(file));
    });
  }

  function initLangSwitch() {
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        setSavedLang(lang);
        applyI18n(lang);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    initLangSwitch();
    applyI18n(getSavedLang());
  });
})();