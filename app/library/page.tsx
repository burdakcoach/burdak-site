export default function LibraryPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/" className="backLink">
            ← На головну
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">Бібліотека вправ</p>

            <h1 className="sectionTitle">
              Обери м’яз і знайди найкращі вправи
            </h1>
          </div>

          <div className="anatomyLayout">
            <div className="muscleInfoCard">
              <span className="muscleDot chestDot"></span>

              <h2>Грудні м’язи</h2>

              <p>
                Основні м’язи, що відповідають за силу та об’єм грудей.
              </p>

              <ul>
                <li>Жим гантелей лежачи</li>
                <li>Жим штанги лежачи</li>
                <li>Розведення гантелей</li>
                <li>Віджимання на брусах</li>
              </ul>

              <a href="/library/chest" className="muscleCardBtn">
                Перейти до вправ →
              </a>
            </div>

            <div className="anatomyMap">
              <img
                src="/anatomy-map.png"
                alt="Анатомічна карта м’язів"
                className="anatomyImage"
              />

              <svg
                className="anatomyHotspots"
                viewBox="0 0 900 620"
                aria-label="Клікабельна карта м’язів"
              >
                <a href="/library/chest">
                  <ellipse className="hotspot chest" cx="185" cy="150" rx="75" ry="45" />
                  <title>Груди</title>
                </a>

                <a href="/library/shoulders">
                  <ellipse className="hotspot shoulders" cx="105" cy="145" rx="38" ry="42" />
                  <ellipse className="hotspot shoulders" cx="270" cy="145" rx="38" ry="42" />
                  <ellipse className="hotspot shoulders" cx="520" cy="145" rx="42" ry="38" />
                  <ellipse className="hotspot shoulders" cx="710" cy="145" rx="42" ry="38" />
                  <title>Плечі</title>
                </a>

                <a href="/library/core">
                  <ellipse className="hotspot core" cx="190" cy="275" rx="58" ry="95" />
                  <title>Прес</title>
                </a>

                <a href="/library/back">
                  <path
                    className="hotspot back"
                    d="M475 170 C515 130 680 130 720 170 L680 330 C630 360 560 360 510 330 Z"
                  />
                  <title>Спина</title>
                </a>

                <a href="/library/mobility">
                  <ellipse className="hotspot mobility" cx="590" cy="360" rx="55" ry="45" />
                  <ellipse className="hotspot mobility" cx="680" cy="360" rx="55" ry="45" />
                  <title>Сідниці</title>
                </a>

                <a href="/library/legs">
                  <ellipse className="hotspot legs" cx="145" cy="440" rx="50" ry="130" />
                  <ellipse className="hotspot legs" cx="240" cy="440" rx="50" ry="130" />
                  <ellipse className="hotspot legs" cx="580" cy="445" rx="48" ry="130" />
                  <ellipse className="hotspot legs" cx="675" cy="445" rx="48" ry="130" />
                  <title>Ноги</title>
                </a>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}