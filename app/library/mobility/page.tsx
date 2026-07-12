export default function MobilityPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">← До бібліотеки</a>

          <div className="sectionHead">
            <p className="sectionLabel">Мобільність</p>
            <h1 className="sectionTitle">Вправи на мобільність</h1>
          </div>

          <div className="libraryGrid">
            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/mobility/lat-triceps-stretch.mp4" controls preload="metadata" />
              <div className="exerciseContent">
                <span>Мобільність</span>
                <h3>Розтяжка широких м'язів спини та трицепса</h3>
                <p>Плавне витягнення без ривків, дихання рівномірне протягом усієї вправи.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/mobility/hamstring-back-stretch.mp4" controls preload="metadata" />
              <div className="exerciseContent">
                <span>Мобільність</span>
                <h3>Розтяжка задньої поверхні ніг та спини</h3>
                <p>Спина пряма, розтяжка йде через нахил тазу, без округлення попереку.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/mobility/core-glute-stretch.mp4" controls preload="metadata" />
              <div className="exerciseContent">
                <span>Мобільність</span>
                <h3>Розтягнення м'язів кора та сідничних</h3>
                <p>Контрольоване утримання пози, зняття напруги з попереку та сідниць.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/mobility/shoulder-mobilization.mp4" controls preload="metadata" />
              <div className="exerciseContent">
                <span>Мобільність</span>
                <h3>Мобілізація плечового пояса</h3>
                <p>Покращення рухливості плечей, підготовка суглоба до навантаження.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/mobility/hip-flexor-abs-stretch.mp4" controls preload="metadata" />
              <div className="exerciseContent">
                <span>Мобільність</span>
                <h3>Розтягнення м'язів стегна та прямих м'язів живота</h3>
                <p>Розкриття кульшового суглоба, розтяжка передньої поверхні стегна і живота.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}