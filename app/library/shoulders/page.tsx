export default function ShouldersPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">
            ← До бібліотеки
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">Плечі</p>

            <h1 className="sectionTitle">
              Вправи для плечей
            </h1>
          </div>

          <div className="libraryGrid">
            <a href="/library/shoulders/upright-row" className="exerciseCard">
              <div className="exerciseVideo">Відео вправи</div>

              <div className="exerciseContent">
                <span>Плечі</span>
                <h3>Тяга штанги до підборіддя</h3>
                <p>Лікті ведуть рух, штанга близько до тіла, контроль амплітуди без завалу плечей.</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}