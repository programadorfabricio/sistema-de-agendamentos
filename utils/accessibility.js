export function lockScroll(){ document.body.style.overflow = 'hidden'; }
export function unlockScroll(){ document.body.style.overflow = ''; }

/* ---------- Acessibilidade: trap de foco + Esc para fechar modais ---------- */
let lastFocusedEl = null;
let activeOverlayKeyHandler = null;

export function getFocusable(container){
  return Array.from(container.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(el => el.offsetParent !== null);
}

export function trapFocusOpen(overlayEl, onRequestClose){
  lastFocusedEl = document.activeElement;
  setTimeout(() => {
    const focusables = getFocusable(overlayEl);
    if(focusables.length) focusables[0].focus();
  }, 50);
  activeOverlayKeyHandler = function(e){
    if(e.key === 'Escape'){ e.preventDefault(); onRequestClose(); return; }
    if(e.key === 'Tab'){
      const focusables = getFocusable(overlayEl);
      if(focusables.length === 0) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  };
  document.addEventListener('keydown', activeOverlayKeyHandler);
}

export function trapFocusClose(){
  if(activeOverlayKeyHandler){ document.removeEventListener('keydown', activeOverlayKeyHandler); activeOverlayKeyHandler = null; }
  if(lastFocusedEl){ lastFocusedEl.focus(); lastFocusedEl = null; }
}

/* ---------- Mensagens de erro acessíveis ---------- */
export function setFieldError(input, message){
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');
  const msgId = input.id + '-error';
  input.setAttribute('aria-describedby', msgId);
  let msgEl = document.getElementById(msgId);
  if(!msgEl){
    msgEl = document.createElement('p');
    msgEl.id = msgId;
    msgEl.className = 'field-error';
    msgEl.setAttribute('role', 'alert');
    input.insertAdjacentElement('afterend', msgEl);
  }
  msgEl.textContent = '⚠ ' + message;
}

export function clearFieldError(input){
  input.classList.remove('error');
  input.removeAttribute('aria-invalid');
  input.removeAttribute('aria-describedby');
  const msgEl = document.getElementById(input.id + '-error');
  if(msgEl) msgEl.remove();
}
