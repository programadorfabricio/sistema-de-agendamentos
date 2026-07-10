type FidelidadePanelProps = {
  active: boolean;
};

export function FidelidadePanel({ active }: FidelidadePanelProps) {
  return (
    <div
      className={`panel ${active ? "active" : ""}`}
      id="panel-fidelidade"
      role="tabpanel"
      aria-labelledby="tab-fidelidade"
    >
      <div className="loyalty-card">
        <h3>Clube Navalha</h3>
        <p>A cada 10 cortes, o próximo sai por nossa conta.</p>
        <div className="loyalty-bar">
          <div className="loyalty-fill" />
        </div>
        <div className="loyalty-count">6 de 10 cortes</div>
      </div>
    </div>
  );
}
