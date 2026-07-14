export default function NutritionPage() {
  return (
    <main>
      <section className="serviceArticleSection">
        <div className="serviceArticleContainer">
          <a href="/#services" className="backLink">
            ← До послуг
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">02 · Послуга</p>
            <h1 className="sectionTitle">Харчування і КБЖВ</h1>
          </div>

          <p className="serviceArticleIntro">
            Розрахунок калорій, білків, жирів і вуглеводів під твою форму і
            задачі — без жорстких дієт і заборон.
          </p>

          <div className="serviceArticleList">
            <div className="serviceArticleItem">
              <span>01</span>
              <p>Розрахунок денної калорійності під твою ціль.</p>
            </div>
            <div className="serviceArticleItem">
              <span>02</span>
              <p>Розподіл білків, жирів і вуглеводів (КБЖВ) під твою активність.</p>
            </div>
            <div className="serviceArticleItem">
              <span>03</span>
              <p>Рекомендації по режиму харчування, а не жорсткі заборони й дієти.</p>
            </div>
            <div className="serviceArticleItem">
              <span>04</span>
              <p>Адаптація раціону під спосіб життя: роботу, сім'ю, харчові звички.</p>
            </div>
            <div className="serviceArticleItem">
              <span>05</span>
              <p>Коригування норм у міру прогресу і зміни ваги.</p>
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