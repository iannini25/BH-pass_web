feather.replace();

const LANG_KEY = 'bhpass_lang';
let idiomaAtual = localStorage.getItem(LANG_KEY) || 'pt-BR';

/* ====== i18n ====== */
const i18n = {
  'pt-BR': {
    menu_home: 'Início', menu_recos: 'Recomendações', menu_discover: 'Descubra',
    hero_h1: 'Descubra seu rolê perfeito', hero_p: 'Responda e receba recomendações',
    s1_title: '1. Qual horário?',
    manha: '☀️ Manhã (6h–12h)', tarde: '🌤️ Tarde (12h–18h)', noite: '🌙 Noite (18h–6h)', tarde_noite: '🌆 Tarde/Noite (15h–23h)',
    proximo: 'Próximo →', voltar: '← Voltar', gerar: 'Gerar Roteiro ⚡',
    s2_title: '2. De qual região você vai sair?', centro: '📍 Centro', pampulha: '📍 Pampulha', savassi: '📍 Savassi/Lourdes/Funcionários', belvedere: '📍 Belvedere',
    s3_title: '3. Que refeição você quer?', cafe: '☕ Café da manhã', almoco: '🍽️ Almoço', lanche: '🥪 Lanche da tarde', jantar: '🍷 Jantar',
    s4_title: '4. Quais interesses?', cultura: '🎭 Cultura', natureza: '🌳 Natureza', vida_noite: '🎶 Vida noturna', compras: '🛍️ Compras',
    s5_title: '5. Qual orçamento?', p1: '$ – Econômico', p2: '$$ – Moderado', p3: '$$$(Caro)', p4: '$$$$ – Premium',
    res_h1: 'Seu roteiro personalizado', res_p: 'Com base nas suas escolhas',
    novo: '↺ Novo Roteiro',
    footer_about: 'Seu guia completo para explorar Belo Horizonte, de dia ou à noite.',
    footer_links: 'Links', footer_contact: 'Contato', footer_social: 'Redes Sociais',
    footer_copy: '© 2025 BH Pass. Todos os direitos reservados.',
  },
  'en': {
    menu_home: 'Home', menu_recos: 'Recommendations', menu_discover: 'Discover',
    hero_h1: 'Discover your perfect plan', hero_p: 'Answer and get recommendations',
    s1_title: '1. What time of day?',
    manha: '☀️ Morning (6am–12pm)', tarde: '🌤️ Afternoon (12pm–6pm)', noite: '🌙 Night (6pm–6am)', tarde_noite: '🌆 Late afternoon/Night (3pm–11pm)',
    proximo: 'Next →', voltar: '← Back', gerar: 'Build My Plan ⚡',
    s2_title: '2. Which area are you leaving from?', centro: '📍 Downtown', pampulha: '📍 Pampulha', savassi: '📍 Savassi/Lourdes/Funcionários', belvedere: '📍 Belvedere',
    s3_title: '3. Which meal do you want?', cafe: '☕ Breakfast', almoco: '🍽️ Lunch', lanche: '🥪 Afternoon snack', jantar: '🍷 Dinner',
    s4_title: '4. What are your interests?', cultura: '🎭 Culture', natureza: '🌳 Nature', vida_noite: '🎶 Nightlife', compras: '🛍️ Shopping',
    s5_title: '5. What’s your budget?', p1: '$ – Budget', p2: '$$ – Moderate', p3: '$$$ – Expensive', p4: '$$$$ – Premium',
    res_h1: 'Your personalized plan', res_p: 'Based on your choices',
    novo: '↺ New Plan',
    footer_about: 'Your complete guide to explore Belo Horizonte, day and night.',
    footer_links: 'Links', footer_contact: 'Contact', footer_social: 'Social',
    footer_copy: '© 2025 BH Pass. All rights reserved.',
  }
};

function applyI18nDescubra() {
  const t = i18n[idiomaAtual];

  // Menus (desktop + mobile)
  const nav = document.querySelectorAll('nav a');
  const mob = document.querySelectorAll('#menu-mobile a');
  if (nav.length >= 3) { nav[0].textContent = t.menu_home; nav[1].textContent = t.menu_recos; nav[2].textContent = t.menu_discover; }
  if (mob.length >= 3) { mob[0].textContent = t.menu_home; mob[1].textContent = t.menu_recos; mob[2].textContent = t.menu_discover; }

  // Cabeçalhos das etapas
  const s1 = document.querySelector('#etapa1 h2'); if (s1) s1.textContent = t.s1_title;
  const s2 = document.querySelector('#etapa2 h2'); if (s2) s2.textContent = t.s2_title;
  const s3 = document.querySelector('#etapa3 h2'); if (s3) s3.textContent = t.s3_title;
  const s4 = document.querySelector('#etapa4 h2'); if (s4) s4.textContent = t.s4_title;
  const s5 = document.querySelector('#etapa5 h2'); if (s5) s5.textContent = t.s5_title;

  // Etapa 1 opções
  const e1 = document.querySelectorAll('#etapa1 .opcao-card');
  if (e1.length >= 4) {
    e1[0].textContent = t.manha; e1[1].textContent = t.tarde; e1[2].textContent = t.noite; e1[3].textContent = t.tarde_noite;
  }

  // Etapa 2 opções
  const e2 = document.querySelectorAll('#etapa2 .opcao-card');
  if (e2.length >= 4) {
    e2[0].textContent = t.centro; e2[1].textContent = t.pampulha; e2[2].textContent = t.savassi; e2[3].textContent = t.belvedere;
  }

  // Etapa 3
  const e3 = document.querySelectorAll('#etapa3 .opcao-card');
  if (e3.length >= 4) { e3[0].textContent = t.cafe; e3[1].textContent = t.almoco; e3[2].textContent = t.lanche; e3[3].textContent = t.jantar; }

  // Etapa 4
  const e4 = document.querySelectorAll('#etapa4 .opcao-card');
  if (e4.length >= 4) { e4[0].textContent = t.cultura; e4[1].textContent = t.natureza; e4[2].textContent = t.vida_noite; e4[3].textContent = t.compras; }

  // Etapa 5
  const e5 = document.querySelectorAll('#etapa5 .opcao-card');
  if (e5.length >= 4) { e5[0].textContent = t.p1; e5[1].textContent = t.p2; e5[2].textContent = t.p3; e5[3].textContent = t.p4; }

  // Botões Próximo / Voltar
  document.querySelectorAll('.botao-proximo').forEach(b => b.textContent = t.proximo);
  document.querySelectorAll('.botao-voltar').forEach(b => b.textContent = t.voltar);
  const btnGerar = document.getElementById('botao-gerar'); if (btnGerar) btnGerar.textContent = t.gerar;

  // Títulos topo/resultado
  const heroH1 = document.querySelector('#etapa1 .text-center h1'); if (heroH1) heroH1.textContent = i18n[idiomaAtual].hero_h1;
  const heroP  = document.querySelector('#etapa1 .text-center p'); if (heroP) heroP.textContent = i18n[idiomaAtual].hero_p;
  const resH1 = document.querySelector('#caixa-resultados h1'); if (resH1) resH1.textContent = t.res_h1;
  const resP  = document.querySelector('#caixa-resultados p'); if (resP) resP.textContent = t.res_p;
  const novo  = document.getElementById('reiniciar-formulario'); if (novo) novo.textContent = t.novo;

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

/* ====== Menu mobile ====== */
const botaoMenu = document.getElementById('botao-menu');
const menuMobile = document.getElementById('menu-mobile');
botaoMenu?.addEventListener('click', () => menuMobile.classList.toggle('hidden'));

/* ====== Idioma ====== */
const botaoIdioma = document.getElementById('botao-idioma');
botaoIdioma?.addEventListener('click', () => {
  idiomaAtual = (idiomaAtual === 'pt-BR') ? 'en' : 'pt-BR';
  localStorage.setItem(LANG_KEY, idiomaAtual);
  applyI18nDescubra();
});

/* ====== Fluxo existente ====== */
const etapas = document.querySelectorAll('.etapa-formulario');
const botoesProximo = document.querySelectorAll('.botao-proximo');
const botoesVoltar  = document.querySelectorAll('.botao-voltar');
const opcoes        = document.querySelectorAll('.opcao-card');
const caixaForm     = document.getElementById('caixa-formulario');
const caixaResultados = document.getElementById('caixa-resultados');
const botaoGerar    = document.getElementById('botao-gerar');
const botaoReiniciar= document.getElementById('reiniciar-formulario');

let escolhas = { horario:'', regiao:'', refeicao:'', interesse:'', preco:'' };

/* Seleção visual de opções (uma por etapa) */
opcoes.forEach(op => {
  op.addEventListener('click', () => {
    const grupo = op.closest('.etapa-formulario').querySelectorAll('.opcao-card');
    grupo.forEach(g => g.classList.remove('selecionada'));
    op.classList.add('selecionada');
  });
});

/* Avançar/Voltar */
botoesProximo.forEach(btn => {
  btn.addEventListener('click', () => {
    const etapaAtual = btn.closest('.etapa-formulario');
    salvarEscolha(etapaAtual.id);
    const proximaId = btn.dataset.proxima;
    if (proximaId) trocarEtapa(etapaAtual.id, proximaId);
  });
});
botoesVoltar.forEach(btn => {
  btn.addEventListener('click', () => {
    const etapaAtual = btn.closest('.etapa-formulario');
    const anteriorId = btn.dataset.anterior;
    if (anteriorId) trocarEtapa(etapaAtual.id, anteriorId);
  });
});

/* Gerar resultados → redireciono com filtros na URL */
botaoGerar?.addEventListener('click', () => {
  salvarEscolha('etapa5');

  const mapHorario = {
    "manha": ["MANHA"], "tarde": ["TARDE"], "noite": ["NOITE"], "tarde-noite": ["TARDE","NOITE"],
  };
  const mapPreco = { "economico":1, "moderado":2, "alto":3, "premium":4 };
  const mapInteresseToCats = {
    "cultura":["MUSEU","CULTURA","CAFE"], "natureza":["PARQUE","PRACA"], "vida-noturna":["BAR","BALADA"], "compras":["RESTAURANTE","BAR","CAFE"],
  };
  const mapRefeicaoToCats = { "cafe":["CAFE"], "almoco":["RESTAURANTE"], "lanche":["CAFE"], "jantar":["RESTAURANTE","BAR"] };

  const regiao = (escolhas.regiao || "todas").toLowerCase();
  const preco = mapPreco[escolhas.preco] || "";
  const horarios = mapHorario[escolhas.horario] || [];
  const cats = Array.from(new Set([...(mapInteresseToCats[escolhas.interesse]||[]), ...(mapRefeicaoToCats[escolhas.refeicao]||[])]));

  const qs = new URLSearchParams();
  if (regiao) qs.set("regiao", regiao);
  if (preco)  qs.set("preco", String(preco));
  if (horarios.length) qs.set("horario", horarios.join(","));
  if (cats.length) qs.set("cat", cats.join(","));

  window.location.href = `recomendacoes.html?${qs.toString()}`;
});

/* Reiniciar */
botaoReiniciar?.addEventListener('click', () => {
  etapas.forEach(e => e.classList.remove('ativo'));
  document.getElementById('etapa1').classList.add('ativo');
  opcoes.forEach(o => o.classList.remove('selecionada'));
  escolhas = { horario:'', regiao:'', refeicao:'', interesse:'', preco:'' };
  caixaForm.style.display = 'block';
  caixaResultados.classList.add('hidden');
});

/* Helpers */
function trocarEtapa(atualId, proximaId) {
  document.getElementById(atualId)?.classList.remove('ativo');
  document.getElementById(proximaId)?.classList.add('ativo');
}
function salvarEscolha(etapaId) {
  const selecionada = document.querySelector(`#${etapaId} .opcao-card.selecionada`);
  if (!selecionada) return;
  const valor = selecionada.dataset.valor;
  if (etapaId === 'etapa1') escolhas.horario = valor;
  if (etapaId === 'etapa2') escolhas.regiao  = valor;
  if (etapaId === 'etapa3') escolhas.refeicao= valor;
  if (etapaId === 'etapa4') escolhas.interesse = valor;
  if (etapaId === 'etapa5') escolhas.preco   = valor;
}

document.addEventListener('DOMContentLoaded', applyI18nDescubra);
