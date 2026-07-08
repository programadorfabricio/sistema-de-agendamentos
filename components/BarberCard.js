export function renderBarberProRow(b){
  return `
    <div class="pro-row">
      <img src="${b.photo}" alt="">
      <div>
        <div class="name">${b.name}</div>
        <div class="role">${b.role}</div>
      </div>
    </div>
  `;
}

export function renderProfissionaisPanel(barbers){
  return barbers.map(renderBarberProRow).join('');
}

export function renderBarberSelectRow(b, idx, selected){
  return `
    <button class="barber-select-row ${selected?'selected':''}" data-idx="${idx}">
      <img src="${b.photo}" alt="">
      <div><div class="name">${b.name}</div><div class="role">${b.role}</div></div>
      <div class="check">✓</div>
    </button>
  `;
}
