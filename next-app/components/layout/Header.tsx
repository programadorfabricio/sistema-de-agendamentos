import { ThemeToggleButton } from "./ThemeToggleButton";
import { ShareButton } from "./ShareButton";
import { ProfileButton } from "./ProfileButton";

type HeaderProps = {
  onProfileClick: () => void;
};

export function Header({ onProfileClick }: HeaderProps) {
  return (
    <div className="cover">
      <div
        className="cover-photo"
        style={{
          backgroundImage:
            "url('https://picsum.photos/seed/barbershop-interior/800/500')",
        }}
      >
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
