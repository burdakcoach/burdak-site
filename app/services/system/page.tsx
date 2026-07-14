export default function SystemPage() {
  return (
    <main>
      <section className="serviceArticleSection">
        <div className="serviceArticleContainer">
          <a href="/#services" className="backLink">
            ← До послуг
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">05 · Послуга</p>
            <h1 className="sectionTitle">Система під результат</h1>
          </div>

          <p className="serviceArticleIntro">
            Ти не просто "ходиш у зал". Ти розумієш, що робиш, навіщо робиш і
            як це приводить тебе до форми.
          </p>

          <div className="serviceArticleList">
            <div className="serviceArticleItem">
              <span>01</span>
              <p>Все побудовано в єдину систему, а не розрізнені поради.</p>
            </div>
            <div className="serviceArticleItem">
              <span>02</span>
              <p>Прозорість: ти розумієш, що робиш, навіщо і як це працює.</p>
            </div>
            <div className="serviceArticleItem">
              <span>03</span>
              <p>Довгострокова стратегія замість швидких хаотичних рішень.</p>
            </div>
            <div className="serviceArticleItem">
              <span>04</span>
              <p>Особистий підхід замість шаблонних програм "під копірку".</p>
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