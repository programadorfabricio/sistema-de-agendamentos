import Image from "next/image";

type DetalhesPanelProps = {
  active: boolean;
  onOpenStaffDemo: () => void;
};

// URLs conhecidas em build time -> blurDataURL gerado estaticamente (ver historico do PR).
// Fotos reais de barbearia (Unsplash), substituindo os placeholders do picsum.photos.
const GALLERY_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80",
    alt: "Ferramentas e produtos de barbearia sobre a bancada",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAQQDAAAAAAAAAAAAAAAAARECAwQSISKh/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwCLk29K+H2STmPAAFSx/9k=",
  },
  {
    src: "https://images.unsplash.com/photo-1702865262133-c10351acc1ca?w=800&q=80",
    alt: "Cadeira de barbearia em couro",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMAAgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMG/8QAHRABAAICAgMAAAAAAAAAAAAAAQIDACEEEhFBof/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8Azz0aISLZxnBSKOjfr7jIHKesa2mlPAbjvGCnH//Z",
  },
  {
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    alt: "Cadeira de barbearia junto à parede de tijolos",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAbEAADAAIDAAAAAAAAAAAAAAAAAQIDERIhgf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCPePGoVKJ7XL3egAEZ/9k=",
  },
  {
    src: "https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?w=800&q=80",
    alt: "Barbeiro aparando o cabelo do cliente",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMAAgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAHRAAAgIDAAMAAAAAAAAAAAAAAQIEEQADIRJxkf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAXEQADAQAAAAAAAAAAAAAAAAAAAQJB/9oADAMBAAIRAxEAPwCCa5UXRHDBz59bWT0+sZjgSXkqqbKrUlKRdm6Bv5jA5HNpYf/Z",
  },
];

export function DetalhesPanel({ active, onOpenStaffDemo }: DetalhesPanelProps) {
  return (
    <div className={`panel ${active ? "active" : ""}`} id="panel-detalhes" role="tabpanel" aria-labelledby="tab-detalhes">
      <div className="cat-label">Fotos do espaço</div>
      <div className="gallery-scroller">
        {GALLERY_PHOTOS.map((photo) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={120}
            height={90}
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
          />
        ))}
      </div>

      <div className="cat-label">Localização</div>
      <div className="map-card">
        <iframe
          src="https://www.google.com/maps?q=Rua+das+Tesouras,+128+-+Centro,+Paulínia+-+SP&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa da Navalha & Ofício"
        />
      </div>
      <div className="action-row">
        <a
          className="btn link-btn"
          href="https://www.google.com/maps/dir/?api=1&destination=Rua+das+Tesouras%2C+128+-+Centro%2C+Paul%C3%ADnia+-+SP"
          target="_blank"
          rel="noopener"
        >
          📍 Como chegar
        </a>
        <a className="btn link-btn instagram-btn" href="https://instagram.com/navalhaeoficio" target="_blank" rel="noopener">
          📷 @navalhaeoficio
        </a>
      </div>

      <div className="cat-label">Informações</div>
      <div className="info-card">
        <div className="row">
          <span>Endereço</span>
          <span>Rua das Tesouras, 128</span>
        </div>
        <div className="row">
          <span>Bairro</span>
          <span>Centro, Paulínia/SP</span>
        </div>
        <div className="row">
          <span>Seg – Sex</span>
          <span>09:00 – 20:00</span>
        </div>
        <div className="row">
          <span>Sábado</span>
          <span>09:00 – 18:00</span>
        </div>
        <div className="row">
          <span>Domingo</span>
          <span>09:00 – 13:00</span>
        </div>
        <div className="row">
          <span>Telefone</span>
          <span>(19) 99999-0000</span>
        </div>
      </div>

      <div className="cat-label">Política de cancelamento</div>
      <div className="info-card policy-card">
        <p>
          Cancelamentos com até <strong>2 horas de antecedência</strong> não geram cobrança.
        </p>
        <p>
          Cancelamentos com menos de 2 horas ou não comparecimento (no-show) podem ter uma taxa de{" "}
          <strong>50% do valor do serviço</strong> cobrada no próximo agendamento.
        </p>
        <p>Para cancelar ou remarcar, entre em contato pelo WhatsApp com o máximo de antecedência possível.</p>
      </div>

      <button className="staff-demo-link" type="button" onClick={onOpenStaffDemo}>
        🔒 Área do barbeiro (demonstração)
      </button>
    </div>
  );
}
