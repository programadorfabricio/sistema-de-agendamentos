import Image from "next/image";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { ShareButton } from "./ShareButton";
import { ProfileButton } from "./ProfileButton";

type HeaderProps = {
  onProfileClick: () => void;
};

// URL conhecida em build time -> blurDataURL gerado estaticamente (ver historico do PR).
// Foto: barbearia com parede de tijolo (Unsplash, photo-1675599193990-33d71150902b).
const COVER_PHOTO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAcEAACAgMBAQAAAAAAAAAAAAABAwACETFBBBL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwCBN1WWugFMWxn63vhiUDyqCbsAIOwOCIiq/9k=";

export function Header({ onProfileClick }: HeaderProps) {
  return (
    <div className="cover">
      <div className="cover-photo">
        <Image
          src="https://images.unsplash.com/photo-1675599193990-33d71150902b?w=800&q=80"
          alt=""
          fill
          sizes="(max-width: 460px) 100vw, 460px"
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL={COVER_PHOTO_BLUR_DATA_URL}
          priority
        />
        <div className="cover-top">
          <button className="icon-btn" aria-label="Voltar">
            ‹
          </button>
          <div className="icon-btn-group">
            <ThemeToggleButton />
            <ShareButton />
            <ProfileButton onClick={onProfileClick} />
            <button className="icon-btn" aria-label="Notificações">
              🔔
            </button>
            <button className="icon-btn" aria-label="Favoritar">
              ♡
            </button>
          </div>
        </div>
      </div>
      <div className="brand-badge">
        <span>N·O</span>
      </div>
      <div className="biz-name">Navalha &amp; Ofício — Centro Paulínia</div>
      <div className="biz-address">Rua das Tesouras, 128 · Centro, Paulínia/SP</div>
    </div>
  );
}
