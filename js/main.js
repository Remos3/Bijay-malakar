document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Logic
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('overlay');

    function toggleMenu() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }

    if(hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
    if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if(overlay) overlay.addEventListener('click', toggleMenu);

    // Language Logic
    let currentLang = localStorage.getItem('site_lang') || 'en';

    function setLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        document.body.classList.remove('lang-hi', 'lang-bn');
        if (lang === 'hi') document.body.classList.add('lang-hi');
        if (lang === 'bn') document.body.classList.add('lang-bn');
        
        localStorage.setItem('site_lang', lang);
        
        document.querySelectorAll('.lang-btns button').forEach(btn => {
            btn.classList.remove('active');
            if(btn.getAttribute('data-lang') === lang) btn.classList.add('active');
        });
    }

    setLanguage(currentLang);

    document.querySelectorAll('.lang-btns button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setLanguage(e.target.getAttribute('data-lang'));
        });
    });
});
