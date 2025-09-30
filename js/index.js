feather.replace();

const LANG_KEY = 'bhpass_lang';
let idiomaAtual = localStorage.getItem(LANG_KEY) || 'pt-BR';

/* ====== i18n ====== */
const i18n = {
  'pt-BR': {
    menu_home: 'Início',
    menu_recos: 'Recomendações',
    menu_discover: 'Descubra',
    hero_title: 'Encontre seu próximo rolê em BH',
    hero_sub: 'Descubra os melhores bares, restaurantes, cafés e atrações culturais',
    search_type: 'Tipo de Local',
    opt_rest: 'Restaurante',
    opt_bar: 'Bar',
    opt_cafe: 'Café',
    opt_museum: 'Museu',
    opt_park: 'Parque',
    opt_club: 'Boate',
    search_region: 'Região',
    opt_centro: 'Centro',
    opt_pampulha: 'Pampulha',
    opt_savassi: 'Savassi',
    opt_belvedere: 'Belvedere',
    search_time: 'Horário',
    opt_manha: 'Manhã',
    opt_tarde: 'Tarde',
    opt_noite: 'Noite',
    search_price: 'Preço',
    opt_p1: '$ - Econômico',
    opt_p2: '$$ - Moderado',
    opt_p3: '$$$ - Caro',
    opt_p4: '$$$$ - Premium',
    btn_search: 'Buscar Locais',
    highlights: 'Destaques em BH',
    footer_about: 'Seu guia completo para explorar Belo Horizonte, de dia ou à noite.',
    footer_links: 'Links',
    footer_contact: 'Contato',
    footer_social: 'Redes Sociais',
    footer_copy: '© 2025 BH Pass. Todos os direitos reservados.',
  },
  'en': {
    menu_home: 'Home',
    menu_recos: 'Recommendations',
    menu_discover: 'Discover',
    hero_title: 'Find your next plan in BH',
    hero_sub: 'Discover the best bars, restaurants, cafés and cultural attractions',
    search_type: 'Place Type',
    opt_rest: 'Restaurant',
    opt_bar: 'Bar',
    opt_cafe: 'Cafe',
    opt_museum: 'Museum',
    opt_park: 'Park',
    opt_club: 'Club',
    search_region: 'Region',
    opt_centro: 'Downtown',
    opt_pampulha: 'Pampulha',
    opt_savassi: 'Savassi',
    opt_belvedere: 'Belvedere',
    search_time: 'Time of day',
    opt_manha: 'Morning',
    opt_tarde: 'Afternoon',
    opt_noite: 'Night',
    search_price: 'Price',
    opt_p1: '$ - Budget',
    opt_p2: '$$ - Moderate',
    opt_p3: '$$$ - Expensive',
    opt_p4: '$$$$ - Premium',
    btn_search: 'Search Places',
    highlights: 'Highlights in BH',
    footer_about: 'Your complete guide to explore Belo Horizonte, day and night.',
    footer_links: 'Links',
    footer_contact: 'Contact',
    footer_social: 'Social',
    footer_copy: '© 2025 BH Pass. All rights reserved.',
  }
};

function applyI18nIndex() {
  const t = i18n[idiomaAtual];

  // Menu (desktop + mobile)
  const nav = document.querySelectorAll('nav a');
  if (nav.length >= 3) {
    nav[0].textContent = t.menu_home;
    nav[1].textContent = t.menu_recos;
    nav[2].textContent = t.menu_discover;
  }
  const mob = document.querySelectorAll('#menu-mobile a');
  if (mob.length >= 3) {
    mob[0].textContent = t.menu_home;
    mob[1].textContent = t.menu_recos;
    mob[2].textContent = t.menu_discover;
  }

  // Hero
  const h1 = document.querySelector('section h1');
  const pHero = document.querySelector('section p');
  if (h1) h1.textContent = t.hero_title;
  if (pHero) pHero.textContent = t.hero_sub;

  // Selects (ordem igual ao HTML atual)
  const selects = document.querySelectorAll('section select');
  if (selects.length >= 4) {
    // Tipo de Local
    const s0 = selects[0];
    s0.options[0].text = t.search_type;
    s0.options[1].text = t.opt_rest;
    s0.options[2].text = t.opt_bar;
    s0.options[3].text = t.opt_cafe;
    s0.options[4].text = t.opt_museum;
    s0.options[5].text = t.opt_park;
    s0.options[6].text = t.opt_club;

    // Região
    const s1 = selects[1];
    s1.options[0].text = t.search_region;
    s1.options[1].text = t.opt_centro;
    s1.options[2].text = t.opt_pampulha;
    s1.options[3].text = t.opt_savassi;
    s1.options[4].text = t.opt_belvedere;

    // Horário
    const s2 = selects[2];
    s2.options[0].text = t.search_time;
    s2.options[1].text = t.opt_manha;
    s2.options[2].text = t.opt_tarde;
    s2.options[3].text = t.opt_noite;

    // Preço
    const s3 = selects[3];
    s3.options[0].text = t.search_price;
    s3.options[1].text = t.opt_p1;
    s3.options[2].text = t.opt_p2;
    s3.options[3].text = t.opt_p3;
    s3.options[4].text = t.opt_p4;
  }

  // Botão buscar
  const btn = document.querySelector('section button');
  if (btn) btn.textContent = t.btn_search;

  // Título Destaques
  const h2 = document.querySelector('section.py-12 h2');
  if (h2) h2.textContent = t.highlights;

  // Rodapé
  const cols = document.querySelectorAll('footer .grid > div');
  if (cols.length >= 4) {
    cols[0].querySelector('p').textContent = t.footer_about;
    cols[1].querySelector('h4').textContent = t.footer_links;
    cols[2].querySelector('h4').textContent = t.footer_contact;
    cols[3].querySelector('h4').textContent = t.footer_social;
  }
  const copy = document.querySelector('footer .border-t p');
  if (copy) copy.textContent = t.footer_copy;

  // Botão idioma
  const botaoIdioma = document.getElementById('botao-idioma');
  if (botaoIdioma) {
    botaoIdioma.innerHTML = `<i data-feather="globe" class="mr-1"></i><span>${idiomaAtual.toUpperCase()}</span>`;
    feather.replace();
  }
}

/* ====== Menu mobile ====== */
const botaoMenu = document.getElementById('botao-menu');
const menuMobile = document.getElementById('menu-mobile');
if (botaoMenu && menuMobile) {
  botaoMenu.addEventListener('click', () => menuMobile.classList.toggle('hidden'));
}

/* ====== Botão idioma ====== */
const botaoIdioma = document.getElementById('botao-idioma');
if (botaoIdioma) {
  botaoIdioma.addEventListener('click', () => {
    idiomaAtual = (idiomaAtual === 'pt-BR') ? 'en' : 'pt-BR';
    localStorage.setItem(LANG_KEY, idiomaAtual);
    applyI18nIndex();
  });
}

document.addEventListener('DOMContentLoaded', applyI18nIndex);
