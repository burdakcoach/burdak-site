export default function ShouldersPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">← До бібліотеки</a>

          <div className="sectionHead">
            <p className="sectionLabel">Плечі</p>
            <h1 className="sectionTitle">Вправи для плечей</h1>
          </div>

          <div className="libraryGrid">
            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/shoulders/dumbbell-shoulder-press.mp4" controls />
              <div className="exerciseContent">
                <span>Плечі</span>
                <h3>Жим гантелей сидячи</h3>
                <p>Контроль амплітуди, без прогину в попереку.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/shoulders/lateral-raise.mp4" controls />
              <div className="exerciseContent">
                <span>Плечі</span>
                <h3>Розведення гантелей стоячи</h3>
                <p>Легкий нахил корпусу, підйом до рівня плечей без ривка.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/shoulders/face-pull.mp4" controls />
              <div className="exerciseContent">
                <span>Плечі</span>
                <h3>Фейс-пул</h3>
                <p>Тяга до обличчя, лікті вище зап'ясть, робота задньої дельти.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}