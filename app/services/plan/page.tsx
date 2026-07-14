export default function PlanPage() {
  return (
    <main>
      <section className="serviceArticleSection">
        <div className="serviceArticleContainer">
          <a href="/#services" className="backLink">
            ← До послуг
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">01 · Послуга</p>
            <h1 className="sectionTitle">Тренувальний план</h1>
          </div>

          <p className="serviceArticleIntro">
            Персональна програма, побудована під твою ціль, рівень
            підготовки та можливості — без випадкових вправ і хаосу.
          </p>

          <div className="serviceArticleList">
            <div className="serviceArticleItem">
              <span>01</span>
              <p>Індивідуальна програма під ціль: схуднення, набір маси, сила чи реабілітація.</p>
            </div>
            <div className="serviceArticleItem">
              <span>02</span>
              <p>Врахування твого рівня підготовки, обладнання та графіка тренувань.</p>
            </div>
            <div className="serviceArticleItem">
              <span>03</span>
              <p>Поступова прогресія навантажень тиждень за тижнем, без застою.</p>
            </div>
            <div className="serviceArticleItem">
              <span>04</span>
              <p>Відеоінструкції техніки виконання кожної вправи з бібліотеки.</p>
            </div>
            <div className="serviceArticleItem">
              <span>05</span>
              <p>Гнучке коригування плану при травмах, втомі чи зміні цілей.</p>
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