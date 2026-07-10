import { BARBERS } from "@/data/barbers";

type ProfissionaisPanelProps = {
  active: boolean;
};

export function ProfissionaisPanel({ active }: ProfissionaisPanelProps) {
  return (
    <div
      className={`panel ${active ? "active" : ""}`}
      id="panel-profissionais"
      role="tabpanel"
      aria-labelledby="tab-profissionais"
    >
      {BARBERS.map((b) => (
        <div className="pro-row" key={b.id}>
          <img src={b.photo} alt="" />
          <div>
            <div className="name">{b.name}</div>
            <div className="role">{b.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
