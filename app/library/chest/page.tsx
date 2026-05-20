export default function ChestPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">
            ← До бібліотеки
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">Груди</p>

            <h1 className="sectionTitle">
              Вправи для грудних м’язів
            </h1>
          </div>

          <div className="libraryGrid">
            <a href="/library/chest/dumbbell-bench-press" className="exerciseCard">
              <div className="exerciseVideo">Відео вправи</div>

              <div className="exerciseContent">
                <span>Груди</span>
                <h3>Жим гантелей лежачи</h3>
                <p>Стабільні лопатки, контроль амплітуди, без ривків.</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}