feather.replace();

const LANG_KEY = 'bhpass_lang';
let idiomaAtual = localStorage.getItem(LANG_KEY) || 'pt-BR';

/* ================== i18n ================== */
const i18n = {
  'pt-BR': {
    menu_home: 'Início', menu_recos: 'Recomendações', menu_discover: 'Descubra',
    title: 'Recomendações da Semana',
    tab_all: 'Todas as Regiões', tab_centro: 'Centro', tab_pampulha: 'Pampulha', tab_savassi: 'Savassi', tab_belvedere: 'Belvedere',
    footer_about: 'Seu guia completo para explorar Belo Horizonte, de dia ou à noite.',
    footer_links: 'Links', footer_contact: 'Contato', footer_social: 'Redes Sociais',
    footer_copy: '© 2025 BH Pass. Todos os direitos reservados.',
    horario_map: { MANHA: 'Manhã', TARDE: 'Tarde', NOITE: 'Noite' },
    regiao_map: { CENTRO: 'Centro', PAMPULHA: 'Pampulha', SAVASSI: 'Savassi', BELVEDERE: 'Belvedere' }
  },
  'en': {
    menu_home: 'Home', menu_recos: 'Recommendations', menu_discover: 'Discover',
    title: 'This Week’s Recommendations',
    tab_all: 'All Areas', tab_centro: 'Downtown', tab_pampulha: 'Pampulha', tab_savassi: 'Savassi', tab_belvedere: 'Belvedere',
    footer_about: 'Your complete guide to explore Belo Horizonte, day and night.',
    footer_links: 'Links', footer_contact: 'Contact', footer_social: 'Social',
    footer_copy: '© 2025 BH Pass. All rights reserved.',
    horario_map: { MANHA: 'Morning', TARDE: 'Afternoon', NOITE: 'Night' },
    regiao_map: { CENTRO: 'Downtown', PAMPULHA: 'Pampulha', SAVASSI: 'Savassi', BELVEDERE: 'Belvedere' }
  }
};

function applyI18nRecsStatic() {
  const t = i18n[idiomaAtual];

  // Menu (desktop + mobile)
  const nav = document.querySelectorAll('nav a');
  const mob = document.querySelectorAll('#menu-mobile a');
  if (nav.length >= 3) { nav[0].textContent = t.menu_home; nav[1].textContent = t.menu_recos; nav[2].textContent = t.menu_discover; }
  if (mob.length >= 3) { mob[0].textContent = t.menu_home; mob[1].textContent = t.menu_recos; mob[2].textContent = t.menu_discover; }

  // Título da página
  const h1 = document.querySelector('main h1');
  if (h1) h1.textContent = t.title;

  // Abas
  const tabs = document.querySelectorAll('.aba-regiao');
  if (tabs.length >= 5) {
    tabs[0].textContent = t.tab_all;
    tabs[1].textContent = t.tab_centro;
    tabs[2].textContent = t.tab_pampulha;
    tabs[3].textContent = t.tab_savassi;
    tabs[4].textContent = t.tab_belvedere;
  }

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

  // Botão idioma UI
  const botaoIdioma = document.getElementById('botao-idioma');
  if (botaoIdioma) {
    botaoIdioma.innerHTML = `<i data-feather="globe" class="mr-1"></i><span>${idiomaAtual.toUpperCase()}</span>`;
    feather.replace();
  }
}

/* ================== Header básico ================== */
const botaoMenu = document.getElementById('botao-menu');
const menuMobile = document.getElementById('menu-mobile');
botaoMenu?.addEventListener('click', () => menuMobile.classList.toggle('hidden'));

const botaoIdioma = document.getElementById('botao-idioma');
botaoIdioma?.addEventListener('click', () => {
  idiomaAtual = (idiomaAtual === 'pt-BR') ? 'en' : 'pt-BR';
  localStorage.setItem(LANG_KEY, idiomaAtual);
  applyI18nRecsStatic();
  // Re-render para refletir rótulos de horários/regiões nos cards
  aplicar(getParams());
});

/* ================== Params & Helpers ================== */
function getParams() {
  const p = new URLSearchParams(location.search);
  return {
    regiao: (p.get("regiao") || "todas").toLowerCase(),
    preco: p.get("preco") ? Number(p.get("preco")) : null,
    horario: p.get("horario") ? p.get("horario").split(",").map(s => s.toUpperCase()) : null,
    cat: p.get("cat") ? p.get("cat").split(",").map(s => s.toUpperCase()) : null
  };
}
function setParam(k, v) {
  const p = new URLSearchParams(location.search);
  if (v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) {
    p.delete(k);
  } else {
    p.set(k, Array.isArray(v) ? v.join(",") : String(v));
  }
  const qs = p.toString();
  history.pushState({}, "", qs ? `?${qs}` : location.pathname);
}
function getImagem(local) {
  if (local.imagem?.tipo === "url" && local.imagem.src) return local.imagem.src;
  if (local.imagem?.tipo === "fallback" && local.imagem.chave) {
    return `img/${local.imagem.chave}.webp`;
  }
  return "img/logo_comfundo.png";
}

/* ================== Render ================== */
const $lista = document.getElementById("lista-locais");
function renderLocais(arr) {
  const t = i18n[idiomaAtual];
  $lista.innerHTML = "";
  arr.forEach(local => {
    const card = document.createElement("div");
    card.className = "cartao-local bg-white rounded-xl overflow-hidden shadow-lg";
    card.dataset.regiao = local.regiao.toLowerCase();

    const horarios = (local.horarios || []).map(h => t.horario_map[h] || h);
    const horariosTxt = horarios.join(", ");
    const precoTxt = "$".repeat(local.preco || 1);
    const regiaoLabel = t.regiao_map[local.regiao] || local.regiao;

    card.innerHTML = `
      <img src="${getImagem(local)}" alt="${local.nome}" class="w-full h-48 object-cover" loading="lazy" decoding="async">
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2 text-gray-800">${local.nome}</h3>
        <p class="text-gray-600 mb-3">${local.descricao || ""}</p>
        <div class="flex justify-between items-center">
          <span class="text-orange-500 font-medium">${regiaoLabel}</span>
          <span class="text-gray-500">${horariosTxt}</span>
        </div>
        <div class="mt-3 flex justify-between">
          <span class="text-yellow-500">${precoTxt}</span>
        </div>
      </div>
    `;
    $lista.appendChild(card);
  });
}

/* ================== Motor de recomendação ================== */
const VIZINHOS = { centro: ["savassi"], savassi: ["centro", "belvedere"], belvedere: ["savassi", "pampulha"], pampulha: ["belvedere"] };
const intersec = (a=[], b=[]) => a.some(x => b.includes(x));

function hardFilter(base, qs) {
  let arr = base.slice();
  if (qs.regiao && qs.regiao !== "todas") arr = arr.filter(l => l.regiao.toLowerCase() === qs.regiao);
  if (qs.horario && qs.horario.length) arr = arr.filter(l => intersec(l.horarios || [], qs.horario));
  if (qs.cat && qs.cat.length) arr = arr.filter(l => qs.cat.includes(l.categoria));
  return arr;
}
function scoreLocal(local, qs) {
  let score = 0;
  const reg = local.regiao.toLowerCase();
  if (qs.regiao && qs.regiao !== "todas") {
    if (reg === qs.regiao) score += 50;
    else if ((VIZINHOS[qs.regiao] || []).includes(reg)) score += 20;
  }
  if (qs.preco) {
    const diff = Math.abs((local.preco || 1) - qs.preco);
    score += diff === 0 ? 25 : (diff === 1 ? 12 : 0);
  }
  if (qs.cat && qs.cat.length && qs.cat.includes(local.categoria)) score += 15;
  if (qs.horario && qs.horario.length) {
    const matches = (local.horarios || []).filter(h => qs.horario.includes(h)).length;
    score += Math.min(matches * 10, 20);
  }
  return score;
}
function rankear(arr, qs) {
  return arr.map(l => ({ l, score: scoreLocal(l, qs), priceDiff: qs.preco ? Math.abs((l.preco || 1) - qs.preco) : 0 }))
    .sort((a,b)=> b.score - a.score || a.priceDiff - b.priceDiff || a.l.nome.localeCompare(b.l.nome))
    .map(x=>x.l);
}
function diversificar(arr, maxPorCategoria=2, limite=12) {
  const usados={}, out=[];
  for (const l of arr) {
    const c=l.categoria; usados[c]=usados[c]||0;
    if (usados[c] < maxPorCategoria) { out.push(l); usados[c]++; }
    if (out.length>=limite) break;
  }
  return out;
}
function comFallback(base, qs, limite=12) {
  let arr = hardFilter(base, qs);
  if (arr.length >= limite) return rankear(arr, qs);
  if (qs.cat?.length) {
    const semCat = { ...qs, cat: null };
    arr = hardFilter(base, semCat);
    if (arr.length >= limite) return rankear(arr, qs);
  }
  if (qs.regiao && qs.regiao !== "todas") {
    const candidatos = base.filter(l => {
      const r = l.regiao.toLowerCase();
      return r === qs.regiao || (VIZINHOS[qs.regiao] || []).includes(r);
    });
    const h = hardFilter(candidatos, { ...qs, regiao: "todas" });
    if (h.length >= limite) return rankear(h, qs);
    arr = h;
  }
  if (arr.length < limite && qs.horario?.length) {
    arr = base.filter(l => intersec(l.horarios || [], qs.horario));
  }
  return rankear(arr, qs);
}

/* ================== Abas & pipeline ================== */
const abas = document.querySelectorAll('.aba-regiao');

function aplicar(qs) {
  if (qs.regiao === "todas") {
    renderLocais(LOCAIS);          // sem limite quando "todas"
  } else {
    const candidatos = comFallback(LOCAIS, qs, 24);
    const top = diversificar(candidatos, 2, 12);
    renderLocais(top);
  }
  applyI18nRecsStatic(); // mantém UI traduzida após render
}

abas.forEach(aba => {
  aba.addEventListener('click', () => {
    abas.forEach(a => a.classList.remove('ativa', 'bg-orange-500', 'text-white'));
    aba.classList.add('ativa', 'bg-orange-500', 'text-white');
    setParam("regiao", aba.dataset.regiao);
    aplicar(getParams());
  });
});

/* ================== Init ================== */
document.addEventListener("DOMContentLoaded", () => {
  applyI18nRecsStatic();
  const qs = getParams();
  const alvo = document.querySelector(`.aba-regiao[data-regiao="${qs.regiao}"]`) ||
               document.querySelector('.aba-regiao[data-regiao="todas"]');
  alvo?.classList.add('ativa', 'bg-orange-500', 'text-white');
  aplicar(qs);
});
