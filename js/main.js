document.addEventListener('DOMContentLoaded', () => {
    // 1. Language State Init
    let currentLang = localStorage.getItem('site_lang') || 'en';

    function setLanguage(lang) {
        if (typeof translations !== 'undefined' && translations[lang]) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });
        }
        
        document.body.classList.remove('lang-hi', 'lang-bn');
        if (lang === 'hi') document.body.classList.add('lang-hi');
        if (lang === 'bn') document.body.classList.add('lang-bn');
        
        localStorage.setItem('site_lang', lang);
        
        document.querySelectorAll('.lang-btns button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
        });
    }

    // Sidebar menu binder helper
    function bindSidebarEvents() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const closeBtn = document.getElementById('closeBtn');
        const sidebar = document.getElementById('mobileSidebar');
        const overlay = document.getElementById('overlay');

        function toggleMenu() {
            if (sidebar) sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('active');
        }

        if (hamburgerBtn) hamburgerBtn.onclick = toggleMenu;
        if (closeBtn) closeBtn.onclick = toggleMenu;
        if (overlay) overlay.onclick = toggleMenu;

        document.querySelectorAll('.lang-btns button').forEach(btn => {
            btn.onclick = (e) => {
                setLanguage(e.target.getAttribute('data-lang'));
            };
        });

        setLanguage(localStorage.getItem('site_lang') || 'en');
    }

    // 2. Automated Header Loader
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('header.html')
            .then(res => res.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                bindSidebarEvents(); // Header aane ke baad buttons ko activate karega
            })
            .catch(err => console.error('Error loading header:', err));
    } else {
        bindSidebarEvents();
    }

    // 3. Automated Footer Loader
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(res => res.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(err => console.error('Error loading footer:', err));
    }
});
