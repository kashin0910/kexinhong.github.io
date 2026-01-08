(function () {
  const DEFAULT_LANG = "zh";
  const STORAGE_KEY = "hkx_lang";

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function applyI18n(lang) {
    const dict = (window.I18N && window.I18N[lang]) ? window.I18N[lang] : window.I18N[DEFAULT_LANG];
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = dict[key];
      if (typeof text === "string") {
        el.textContent = text;
      }
    });

    // update lang button UI
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
  }

  function bindLangButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        setLang(lang);
        applyI18n(lang);
      });
    });
  }

  // init
  bindLangButtons();
  applyI18n(getLang());
})();