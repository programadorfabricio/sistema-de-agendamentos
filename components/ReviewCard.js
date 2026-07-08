import { REVIEWS } from '../data/reviews.js';
import { starsHtml, initials } from '../utils/text.js';
import { setFieldError, clearFieldError, trapFocusOpen, trapFocusClose, lockScroll, unlockScroll } from '../utils/accessibility.js';
import { ustate } from './LoginSheet.js';

export function renderReviewsPanel(){
  const summaryEl = document.getElementById('reviewsSummary');
  const listEl = document.getElementById('reviewsList');
  const avg = REVIEWS.reduce((s,r)=>s+r.rating,0) / REVIEWS.length;
  summaryEl.innerHTML = `
    <div class="reviews-summary">
      <div class="rating-big">${avg.toFixed(1)}</div>
      <div class="rating-side">
        <div class="rating-stars">${starsHtml(Math.round(avg))}</div>
        <div class="rating-count">${REVIEWS.length} avaliações</div>
      </div>
    </div>
  `;
  listEl.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-head">
        <div class="review-avatar">${initials(r.name)}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-meta">${r.meta}</div>
        </div>
        <div class="review-stars">${starsHtml(r.rating)}</div>
      </div>
      <p class="review-text">${r.text}</p>
      ${r.photos.length ? `<div class="review-photos">${r.photos.map(p=>`<img src="${p}" alt="Foto do corte">`).join('')}</div>` : ''}
    </div>
  `).join('');
}

/* ---------- Nova avaliação (sheet) ---------- */
const rstate = { rating:0, name:'', text:'' };
let reviewOverlay, reviewSheetBody, reviewSheetCta;

export function initReviewSheet(){
  reviewOverlay = document.getElementById('reviewSheetOverlay');
  reviewSheetBody = document.getElementById('reviewSheetBody');
  reviewSheetCta = document.getElementById('reviewSheetCta');

  document.getElementById('openReviewBtn').addEventListener('click', openReviewSheet);
  document.getElementById('reviewSheetClose').addEventListener('click', closeReviewSheet);
  reviewOverlay.addEventListener('click', e => { if(e.target === reviewOverlay) closeReviewSheet(); });
  reviewSheetCta.addEventListener('click', handleSubmit);
}

function openReviewSheet(){
  rstate.rating = 0; rstate.name = ustate.loggedIn ? ustate.name : ''; rstate.text = '';
  reviewOverlay.classList.add('open');
  lockScroll();
  renderReviewSheet();
  trapFocusOpen(reviewOverlay, closeReviewSheet);
}
function closeReviewSheet(){ reviewOverlay.classList.remove('open'); unlockScroll(); trapFocusClose(); }

function renderReviewSheet(){
  reviewSheetBody.innerHTML = `
    <div class="star-picker" id="starPicker" role="radiogroup" aria-label="Sua nota, de 1 a 5 estrelas" aria-describedby="ratingError">
      ${[1,2,3,4,5].map(i => `<button type="button" data-star="${i}" role="radio" aria-checked="${i<=rstate.rating}" aria-label="${i} estrela${i>1?'s':''}" class="${i<=rstate.rating?'active':''}">★</button>`).join('')}
    </div>
    <p id="ratingError" class="field-error" role="alert" style="justify-content:center; ${rstate.rating ? 'display:none;' : ''}">${rstate.rating ? '' : ''}</p>
    <div class="field"><label for="reviewNameInput">Seu nome</label><input id="reviewNameInput" type="text" placeholder="Seu nome" value="${rstate.name}"></div>
    <div class="field"><label for="reviewTextInput">Comentário</label><textarea id="reviewTextInput" class="review-textarea" placeholder="Conte como foi o atendimento...">${rstate.text}</textarea></div>
  `;
  reviewSheetBody.querySelectorAll('#starPicker button').forEach(btn => {
    btn.addEventListener('click', () => { rstate.rating = parseInt(btn.dataset.star); renderReviewSheet(); });
  });
  const nameEl = document.getElementById('reviewNameInput');
  const textEl = document.getElementById('reviewTextInput');
  nameEl.addEventListener('input', e => { rstate.name = e.target.value; clearFieldError(nameEl); });
  textEl.addEventListener('input', e => { rstate.text = e.target.value; clearFieldError(textEl); });
}

function handleSubmit(){
  const nameInput = document.getElementById('reviewNameInput');
  const textInput = document.getElementById('reviewTextInput');
  const ratingError = document.getElementById('ratingError');
  let valid = true;
  if(!rstate.rating){ ratingError.textContent = '⚠ Selecione uma nota de 1 a 5 estrelas'; ratingError.style.display = 'flex'; valid = false; }
  else { ratingError.style.display = 'none'; }
  if(!rstate.name.trim()){ setFieldError(nameInput, 'Informe seu nome'); valid = false; } else clearFieldError(nameInput);
  if(!rstate.text.trim()){ setFieldError(textInput, 'Escreva um breve comentário'); valid = false; } else clearFieldError(textInput);
  if(!valid) return;
  REVIEWS.unshift({ name:rstate.name.trim(), rating:rstate.rating, meta:'agora mesmo', text:rstate.text.trim(), photos:[] });
  renderReviewsPanel();
  closeReviewSheet();
}
