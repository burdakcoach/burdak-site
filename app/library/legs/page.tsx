export default function LegsPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">
            ← До бібліотеки
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">Ноги</p>

            <h1 className="sectionTitle">
              Вправи для м'язів ніг
            </h1>
          </div>

          <div className="libraryGrid">
            <a href="/library/legs/leg-press" className="exerciseCard">
              <div className="exerciseVideo">Відео вправи</div>

              <div className="exerciseContent">
                <span>Ноги</span>
                <h3>Жим ногами</h3>
                <p>Контроль амплітуди, стопи на платформі, коліна не завалюються всередину.</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}