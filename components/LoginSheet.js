import { GOOGLE_NAMES, APPLE_NAMES } from '../data/constants.js';
import { generateMockHistory } from '../data/customers-mock.js';
import { initials } from '../utils/text.js';
import { setFieldError, clearFieldError, trapFocusOpen, trapFocusClose, lockScroll, unlockScroll } from '../utils/accessibility.js';
import { renderCustomerProfile, attachCustomerProfileEvents } from './CustomerProfile.js';

/* ---------- Login (simulado — sem OAuth real, apenas front-end) ---------- */
export const ustate = { loggedIn:false, name:'', phone:'', method:'', step:'choose', pendingMethod:null, pendingPhone:'', photo:'', history:[], preferences:new Set() };

let profileBtn, loginOverlay, loginSheetTitle, loginSheetSub, loginSheetBody, loginSheetCta;

export function initLoginSheet(){
  profileBtn = document.getElementById('profileBtn');
  loginOverlay = document.getElementById('loginSheetOverlay');
  loginSheetTitle = document.getElementById('loginSheetTitle');
  loginSheetSub = document.getElementById('loginSheetSub');
  loginSheetBody = document.getElementById('loginSheetBody');
  loginSheetCta = document.getElementById('loginSheetCta');

  profileBtn.addEventListener('click', openLoginSheet);
  document.getElementById('loginSheetClose').addEventListener('click', closeLoginSheet);
  loginOverlay.addEventListener('click', e => { if(e.target === loginOverlay) closeLoginSheet(); });
}

function updateProfileUI(){
  if(ustate.loggedIn){
    profileBtn.textContent = initials(ustate.name);
    profileBtn.classList.add('logged-in');
    profileBtn.setAttribute('aria-label', ustate.name);
  } else {
    profileBtn.textContent = '👤';
    profileBtn.classList.remove('logged-in');
    profileBtn.setAttribute('aria-label', 'Entrar');
  }
}

function openLoginSheet(){
  ustate.step = ustate.loggedIn ? 'account' : 'choose';
  loginOverlay.classList.add('open');
  lockScroll();
  renderLoginSheet();
  trapFocusOpen(loginOverlay, closeLoginSheet);
}
function closeLoginSheet(){ loginOverlay.classList.remove('open'); unlockScroll(); trapFocusClose(); }

function finishLogin(name, phone, method){
  ustate.loggedIn = true; ustate.name = name; ustate.phone = phone; ustate.method = method;
  ustate.photo = `https://picsum.photos/seed/${encodeURIComponent(name)}/200/200`;
  ustate.history = generateMockHistory();
  ustate.preferences = new Set();
  updateProfileUI();
  closeLoginSheet();
}

function renderLoginSheet(){
  if(ustate.step === 'choose'){
    loginSheetTitle.textContent = 'Entrar';
    loginSheetSub.textContent = 'Acesse sua conta';
    loginSheetBody.innerHTML = `
      <div class="login-options">
        <button class="login-option-btn" data-provider="google"><span class="provider-icon google">G</span> Continuar com Google</button>
        <button class="login-option-btn" data-provider="apple"><span class="provider-icon apple">🍎</span> Continuar com Apple</button>
        <button class="login-option-btn" data-provider="whatsapp"><span class="provider-icon whatsapp">💬</span> Continuar com WhatsApp</button>
        <button class="login-option-btn" data-provider="telefone"><span class="provider-icon telefone">📱</span> Continuar com telefone</button>
      </div>
      <p class="login-disclaimer">Este é um protótipo de front-end — o login aqui é simulado, sem autenticação real.</p>
    `;
    loginSheetCta.style.display = 'none';
    loginSheetBody.querySelectorAll('.login-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const provider = btn.dataset.provider;
        if(provider === 'google'){
          finishLogin(GOOGLE_NAMES[Math.floor(Math.random()*GOOGLE_NAMES.length)], '', 'google');
        } else if(provider === 'apple'){
          finishLogin(APPLE_NAMES[Math.floor(Math.random()*APPLE_NAMES.length)], '', 'apple');
        } else {
          ustate.pendingMethod = provider; ustate.step = 'phone'; renderLoginSheet();
        }
      });
    });
    return;
  }

  if(ustate.step === 'phone'){
    loginSheetTitle.textContent = ustate.pendingMethod === 'whatsapp' ? 'WhatsApp' : 'Telefone';
    loginSheetSub.textContent = 'Informe seu número';
    loginSheetBody.innerHTML = `
      <button class="login-back" id="loginBack">‹ Voltar</button>
      <div class="field"><label for="loginPhoneInput">Número de telefone</label><input id="loginPhoneInput" type="tel" placeholder="(19) 99999-0000"></div>
    `;
    loginSheetCta.style.display = 'flex';
    loginSheetCta.textContent = 'Enviar código';
    document.getElementById('loginBack').addEventListener('click', () => { ustate.step = 'choose'; renderLoginSheet(); });
    const phoneEl = document.getElementById('loginPhoneInput');
    phoneEl.addEventListener('input', () => clearFieldError(phoneEl));
    loginSheetCta.onclick = () => {
      if(!phoneEl.value.trim()){ setFieldError(phoneEl, 'Informe seu número de telefone'); return; }
      ustate.pendingPhone = phoneEl.value.trim();
      ustate.step = 'code'; renderLoginSheet();
    };
    return;
  }

  if(ustate.step === 'code'){
    loginSheetTitle.textContent = 'Verificação';
    loginSheetSub.textContent = `Código enviado para ${ustate.pendingPhone}`;
    loginSheetBody.innerHTML = `
      <button class="login-back" id="loginBack">‹ Voltar</button>
      <div class="field"><label for="loginCodeInput">Código de 4 dígitos</label><input id="loginCodeInput" class="code-input" type="text" inputmode="numeric" maxlength="4" placeholder="0000"></div>
      <p class="login-disclaimer">Simulação: digite qualquer código de 4 números para continuar.</p>
    `;
    loginSheetCta.style.display = 'flex';
    loginSheetCta.textContent = 'Confirmar';
    document.getElementById('loginBack').addEventListener('click', () => { ustate.step = 'phone'; renderLoginSheet(); });
    const codeEl = document.getElementById('loginCodeInput');
    codeEl.addEventListener('input', () => clearFieldError(codeEl));
    loginSheetCta.onclick = () => {
      if(codeEl.value.trim().length !== 4){ setFieldError(codeEl, 'Digite os 4 dígitos do código'); return; }
      ustate.step = 'name'; renderLoginSheet();
    };
    return;
  }

  if(ustate.step === 'name'){
    loginSheetTitle.textContent = 'Quase lá';
    loginSheetSub.textContent = 'Como podemos te chamar?';
    loginSheetBody.innerHTML = `
      <div class="field"><label for="loginNameInput">Seu nome</label><input id="loginNameInput" type="text" placeholder="Seu nome"></div>
    `;
    loginSheetCta.style.display = 'flex';
    loginSheetCta.textContent = 'Concluir cadastro';
    const nameEl = document.getElementById('loginNameInput');
    nameEl.addEventListener('input', () => clearFieldError(nameEl));
    loginSheetCta.onclick = () => {
      if(!nameEl.value.trim()){ setFieldError(nameEl, 'Informe seu nome'); return; }
      finishLogin(nameEl.value.trim(), ustate.pendingPhone, ustate.pendingMethod);
    };
    return;
  }

  if(ustate.step === 'account'){
    loginSheetTitle.textContent = ustate.name;
    loginSheetSub.textContent = 'Seu perfil';
    loginSheetBody.innerHTML = renderCustomerProfile(ustate);
    attachCustomerProfileEvents(loginSheetBody, ustate, renderLoginSheet);
    loginSheetCta.style.display = 'flex';
    loginSheetCta.textContent = 'Sair da conta';
    loginSheetCta.onclick = () => {
      ustate.loggedIn = false; ustate.name = ''; ustate.phone = ''; ustate.method = '';
      ustate.photo = ''; ustate.history = []; ustate.preferences = new Set();
      updateProfileUI();
      closeLoginSheet();
    };
    return;
  }
}
