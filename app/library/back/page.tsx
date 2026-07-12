export default function BackPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">← До бібліотеки</a>

          <div className="sectionHead">
            <p className="sectionLabel">Спина</p>
            <h1 className="sectionTitle">Вправи для м'язів спини</h1>
          </div>

          <div className="libraryGrid">
            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/back/bent-over-dumbbell-row.mp4" controls />
              <div className="exerciseContent">
                <span>Спина</span>
                <h3>Тяга гантелі в нахилі</h3>
                <p>Фіксований корпус, лікоть іде вздовж тіла, повне скорочення спини.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/back/bent-over-barbell-row.mp4" controls />
              <div className="exerciseContent">
                <span>Спина</span>
                <h3>Тяга штанги в нахилі</h3>
                <p>Нейтральна спина, контроль нахилу корпусу, тяга до низу живота.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}