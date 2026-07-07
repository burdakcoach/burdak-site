export default function BackPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">
            ← До бібліотеки
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">Спина</p>

            <h1 className="sectionTitle">
              Вправи для м'язів спини
            </h1>
          </div>

          <div className="libraryGrid">
            <a href="/library/back/lat-pulldown" className="exerciseCard">
              <div className="exerciseVideo">Відео вправи</div>

              <div className="exerciseContent">
                <span>Спина</span>
                <h3>Тяга верхнього блока</h3>
                <p>Фокус на лопатках, контроль корпусу і повне скорочення спини.</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}