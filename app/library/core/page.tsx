export default function CorePage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">← До бібліотеки</a>

          <div className="sectionHead">
            <p className="sectionLabel">Прес</p>
            <h1 className="sectionTitle">Вправи для м'язів кора</h1>
          </div>

          <div className="libraryGrid">
            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/core/hyperextension.mp4" controls />
              <div className="exerciseContent">
                <span>Прес</span>
                <h3>Гіперекстеншн</h3>
                <p>Контроль поперекового відділу, робота розгиначів спини без перерозгинання.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}