export default function MobilityPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">
            ← До бібліотеки
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">Мобільність</p>

            <h1 className="sectionTitle">
              Вправи на мобільність
            </h1>
          </div>

          <div className="libraryGrid">
            <a href="/library/mobility/shoulder-mobility" className="exerciseCard">
              <div className="exerciseVideo">Відео вправи</div>

              <div className="exerciseContent">
                <span>Мобільність</span>
                <h3>Мобільність плечового пояса</h3>
                <p>Покращення рухливості плечей, зняття напруги і підготовка суглоба до навантаження.</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}