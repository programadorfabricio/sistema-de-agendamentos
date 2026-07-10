"use client";

export function ShareButton() {
  async function handleShare() {
    const shareData = {
      title: "Navalha & Ofício — Barbearia em Paulínia",
      text: "Dá uma olhada na Navalha & Ofício e agenda seu horário!",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // usuário cancelou o compartilhamento
      }
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copiado! Agora é só colar onde quiser compartilhar.");
        return;
      } catch {
        // segue para o fallback abaixo
      }
    }
    alert(shareData.url);
  }

  return (
    <button type="button" className="icon-btn" aria-label="Compartilhar barbearia" onClick={handleShare}>
      📤
    </button>
  );
}
