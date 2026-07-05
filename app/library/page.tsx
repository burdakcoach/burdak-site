export default function LibraryPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/" className="backLink">
            ← На головну
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">Бібліотека вправ</p>

            <h1 className="sectionTitle">
              Обери м’яз і знайди найкращі вправи
            </h1>
          </div>

          <div className="anatomyLayout">

            <div className="anatomyMap">
              <img
                src="/anatomy-map.png"
                alt="Анатомічна карта м’язів"
                className="anatomyImage"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}