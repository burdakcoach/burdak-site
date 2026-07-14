export default function ChestPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">← До бібліотеки</a>

          <div className="sectionHead">
            <p className="sectionLabel">Груди</p>
            <h1 className="sectionTitle">Вправи для грудних м'язів</h1>
          </div>

          <div className="libraryGrid">
            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/chest/dumbbell-bench-press.mp4" controls preload="metadata"/>
              <div className="exerciseContent">
                <span>Груди</span>
                <h3>Жим гантелей лежачи</h3>
                <p>Стабільні лопатки, контроль амплітуди, без ривків.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/chest/incline-dumbbell-press.mp4" controls preload="metadata" />
              <div className="exerciseContent">
                <span>Груди</span>
                <h3>Жим гантелей на лаві з нахилом</h3>
                <p>Акцент на верхню частину грудних, лікті під контролем.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/chest/dumbbell-fly.mp4" controls preload="metadata" />
              <div className="exerciseContent">
                <span>Груди</span>
                <h3>Розведення гантелей лежачи</h3>
                <p>Легкий згин ліктів, розтяжка грудних без перевантаження плеча.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}