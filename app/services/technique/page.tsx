export default function TechniquePage() {
  return (
    <main>
      <section className="serviceArticleSection">
        <div className="serviceArticleContainer">
          <a href="/#services" className="backLink">
            ← До послуг
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">03 · Послуга</p>
            <h1 className="sectionTitle">Контроль техніки</h1>
          </div>

          <p className="serviceArticleIntro">
            Аналіз відео виконання вправ, корекція техніки і зменшення ризику
            травм.
          </p>

          <div className="serviceArticleList">
            <div className="serviceArticleItem">
              <span>01</span>
              <p>Аналіз відео виконання вправ, які ти надсилаєш.</p>
            </div>
            <div className="serviceArticleItem">
              <span>02</span>
              <p>Виправлення помилок до того, як вони стануть травмою.</p>
            </div>
            <div className="serviceArticleItem">
              <span>03</span>
              <p>Пояснення "чому" за кожним технічним нюансом — не просто "роби так".</p>
            </div>
            <div className="serviceArticleItem">
              <span>04</span>
              <p>Регулярний фідбек, а не одноразова перевірка на старті.</p>
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