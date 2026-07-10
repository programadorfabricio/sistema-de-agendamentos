import Image from "next/image";

type DetalhesPanelProps = {
  active: boolean;
  onOpenStaffDemo: () => void;
};

// URLs conhecidas em build time -> blurDataURL gerado estaticamente (ver historico do PR).
const GALLERY_PHOTOS = [
  {
    src: "https://picsum.photos/seed/barbershop-chairs/300/300",
    alt: "Cadeiras e balcão da barbearia",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAeEAACAQMFAAAAAAAAAAAAAAAAAQMCBBEFEjFBcf/EABUBAQEAAAAAAAAAAAAAAAAAAAED/8QAGREAAQUAAAAAAAAAAAAAAAAAAAECERNR/9oADAMBAAIRAxEAPwC9OqSuBNwXKe7vGePQATrbgyp//9k=",
  },
  {
    src: "https://picsum.photos/seed/barbershop-tools/300/300",
    alt: "Ferramentas de corte e navalhas",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAABBAIDAAAAAAAAAAAAAAABAAIDEgQTIWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAVEQEBAAAAAAAAAAAAAAAAAAABAP/aAAwDAQACEQMRAD8ArtypxlGV0goW1181HfqIimky/9k=",
  },
  {
    src: "https://picsum.photos/seed/barbershop-front/300/300",
    alt: "Fachada da barbearia",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAbEAADAAIDAAAAAAAAAAAAAAAAAQIDBAURMf/EABUBAQEAAAAAAAAAAAAAAAAAAAED/8QAGBEBAQADAAAAAAAAAAAAAAAAAQACETH/2gAMAwEAAhEDEQA/AJqcrqw1OXFPTXs0ACZkvZ0F/9k=",
  },
  {
    src: "https://picsum.photos/seed/barbershop-wait/300/300",
    alt: "Área de espera",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAZEAEAAgMAAAAAAAAAAAAAAAAAAgQUU5H/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aq82vuh0AH//Z",
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
