export default function ControlPage() {
  return (
    <main>
      <section className="serviceArticleSection">
        <div className="serviceArticleContainer">
          <a href="/#services" className="backLink">
            ← До послуг
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">04 · Послуга</p>
            <h1 className="sectionTitle">Регулярний контроль</h1>
          </div>

          <p className="serviceArticleIntro">
            Звіти, корекції, зміни плану і підтримка, щоб прогрес не
            зупинявся.
          </p>

          <div className="serviceArticleList">
            <div className="serviceArticleItem">
              <span>01</span>
              <p>Періодичні звіти прогресу за твоїм графіком.</p>
            </div>
            <div className="serviceArticleItem">
              <span>02</span>
              <p>Аналіз замірів, фото та динаміки ваги.</p>
            </div>
            <div className="serviceArticleItem">
              <span>03</span>
              <p>Коригування плану тренувань і харчування на основі реальних даних.</p>
            </div>
            <div className="serviceArticleItem">
              <span>04</span>
              <p>Підтримка та зворотній зв'язок, щоб мотивація не падала.</p>
            </div>
          </div>

          <div className="serviceArticleCta">
            <a href="https://t.me/coach_burdak" target="_blank" className="primaryBtn">
              Записатись на консультацію
            </a>
            <a href="/library" className="secondaryBtn">
              Бібліотека вправ
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}