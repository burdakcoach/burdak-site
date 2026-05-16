export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <a href="#" className="logo">
          BURDAK COACH
        </a>

        <nav className="navLinks">
          <a href="#about">Про мене</a>
          <a href="#services">Послуги</a>
          <a href="#results">Результати</a>
          <a href="#library">Бібліотека вправ</a>
          <a href="#contacts">Контакти</a>
        </nav>

        <a href="https://t.me/coach_burdak" className="headerBtn">
          Консультація
        </a>
      </header>

      <section className="heroSection">
        <div className="heroContainer">
          <div className="heroText">
            <p className="heroLabel">
              Персональний тренер • онлайн супровід
            </p>

            <h1 className="heroTitle">
              Система тренувань і харчування під твою ціль
            </h1>

            <p className="heroDescription">
              Допомагаю прибрати хаос у тренуваннях, харчуванні та прогресі:
              будую план, контролюю виконання і адаптую систему під твоє тіло,
              графік та результат.
            </p>

            <div className="heroButtons">
              <a href="https://t.me/coach_burdak" className="primaryBtn">
                Записатись на консультацію
              </a>

              <a href="https://instagram.com/burdak_coach" className="secondaryBtn">
                Переглянути Instagram
              </a>
            </div>
          </div>

          <div className="photoWrap">
            <div className="photoCard">
              <img src="/coach.jpg" alt="Coach" className="coachImage" />
            </div>

            <div className="experienceCard">
              <div className="experienceNumber">5+</div>

              <div className="experienceText">
                років практики в тренуваннях, мобільності та роботі з тілом
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="targetSection">
        <div className="targetContainer">
          <div className="sectionHead">
            <p className="sectionLabel">Для кого</p>

            <h2 className="sectionTitle">
              Цей супровід для тих, хто хоче не просто тренуватись, а нарешті
              бачити результат
            </h2>
          </div>

          <div className="targetGrid">
            <div className="targetCard">
              <span>01</span>
              <h3>Тренуєшся без системи</h3>
              <p>
                Робиш вправи, міняєш програми, але не розумієш, що саме дає
                прогрес.
              </p>
            </div>

            <div className="targetCard">
              <span>02</span>
              <h3>Не бачиш змін у дзеркалі</h3>
              <p>
                Вага, форма і силові стоять на місці, хоча ти ніби стараєшся.
              </p>
            </div>

            <div className="targetCard">
              <span>03</span>
              <h3>Харчування хаотичне</h3>
              <p>
                То недоїдаєш, то переїдаєш, то просто не розумієш, скільки тобі
                треба.
              </p>
            </div>

            <div className="targetCard">
              <span>04</span>
              <h3>Хочеш форму і контроль</h3>
              <p>
                Без випадкових рішень, з чітким планом, корекціями і зрозумілою
                системою.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="servicesSection">
        <div className="servicesContainer">
          <div className="sectionHead">
            <p className="sectionLabel">Супровід</p>

            <h2 className="sectionTitle">
              Що ти отримуєш в роботі зі мною
            </h2>
          </div>

          <div className="servicesGrid">
            <div className="serviceCard">
              <div className="serviceTop">
                <span>01</span>
                <h3>Тренувальний план</h3>
              </div>

              <p>
                Програма під твою ціль, рівень підготовки, графік і можливості.
                Без випадкових вправ і хаосу.
              </p>
            </div>

            <div className="serviceCard">
              <div className="serviceTop">
                <span>02</span>
                <h3>Харчування і КБЖВ</h3>
              </div>

              <p>
                Розрахунок калорій, білків, жирів і вуглеводів під твою форму і
                задачі.
              </p>
            </div>

            <div className="serviceCard">
              <div className="serviceTop">
                <span>03</span>
                <h3>Контроль техніки</h3>
              </div>

              <p>
                Аналіз відео вправ, корекція техніки і зменшення ризику травм.
              </p>
            </div>

            <div className="serviceCard">
              <div className="serviceTop">
                <span>04</span>
                <h3>Регулярний контроль</h3>
              </div>

              <p>
                Звіти, корекції, зміни плану і підтримка, щоб прогрес не
                зупинявся.
              </p>
            </div>

            <div className="serviceCard">
              <div className="serviceTop">
                <span>05</span>
                <h3>Система під результат</h3>
              </div>

              <p>
                Ти не просто “ходиш у зал”. Ти розумієш, що робиш, навіщо
                робиш і як це приводить тебе до форми.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="results" className="resultsSection">
        <div className="resultsContainer">
          <div className="sectionHead">
            <p className="sectionLabel">Результати</p>

            <h2 className="sectionTitle">
              Конкретні зміни тіла, сили і контролю
            </h2>
          </div>

          <div className="resultsGrid">
            <div className="resultCard">
              <div className="resultImagePlaceholder">Фото результату</div>

              <div className="resultContent">
                <span>-12 кг</span>
                <h3>Схуднення без хаосу</h3>
                <p>4 місяці роботи: контроль харчування, силові тренування і стабільний прогрес.</p>
              </div>
            </div>

            <div className="resultCard">
              <div className="resultImagePlaceholder">Фото результату</div>

              <div className="resultContent">
                <span>Рекомпозиція</span>
                <h3>Менше жиру, більше форми</h3>
                <p>Без жорстких дієт: системний план, корекції і поступова зміна тіла.</p>
              </div>
            </div>

            <div className="resultCard">
              <div className="resultImagePlaceholder">Фото результату</div>

              <div className="resultContent">
                <span>+ сила</span>
                <h3>Сильніше і впевненіше тіло</h3>
                <p>Покращення техніки, силових показників і загального контролю руху.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="formats" className="formatsSection">
        <div className="formatsContainer">
          <div className="sectionHead">
            <p className="sectionLabel">Формати</p>

            <h2 className="sectionTitle">
              Обери формат роботи під свою ціль і графік
            </h2>
          </div>

          <div className="formatsGrid">
            <div className="formatCard">
              <span>01</span>
              <h3>Персональні тренування</h3>
              <p>
                Робота в залі з контролем техніки, навантаження і прогресу на кожному тренуванні.
              </p>
            </div>

            <div className="formatCard">
              <span>02</span>
              <h3>Онлайн-супровід</h3>
              <p>
                План тренувань, харчування, звіти, корекції і контроль прогресу дистанційно.
              </p>
            </div>

            <div className="formatCard">
              <span>03</span>
              <h3>Харчування і КБЖВ</h3>
              <p>
                Розрахунок калорій, білків, жирів і вуглеводів під твою ціль, режим і вподобання.
              </p>
            </div>

            <div className="formatCard premium">
              <span>04</span>
              <h3>Premium coaching</h3>
              <p>
                Максимальний контроль: тренування, харчування, регулярні корекції, підтримка і стратегія під результат.
              </p>
            </div>
          </div>
        </div>
        <section id="process" className="processSection">
          <div className="processContainer">

            <div className="sectionHead">
              <p className="sectionLabel">Процес</p>

              <h2 className="sectionTitle">
                Як проходить робота зі мною
              </h2>
            </div>

            <div className="processGrid">

              <div className="processCard">
                <span>01</span>
                <h3>Аналіз</h3>

                <p>
                  Оцінка твоєї форми, цілей, режиму, харчування і поточного рівня.
                </p>
              </div>

              <div className="processCard">
                <span>02</span>
                <h3>План</h3>

                <p>
                  Створення системи тренувань і харчування під тебе, а не “універсальної програми”.
                </p>
              </div>

              <div className="processCard">
                <span>03</span>
                <h3>Контроль</h3>

                <p>
                  Перевірка техніки, звіти, контроль навантаження і регулярний фідбек.
                </p>
              </div>

              <div className="processCard">
                <span>04</span>
                <h3>Корекція</h3>

                <p>
                  Зміни плану по прогресу, самопочуттю, силових показниках і формі.
                </p>
              </div>

              <div className="processCard result">
                <span>05</span>
                <h3>Результат</h3>

                <p>
                  Сильніше, сухіше і контрольованіше тіло без хаосу і випадкових рішень.
                </p>
              </div>

            </div>
          </div>
        </section>
      </section>
      <section id="library" className="librarySection">
        <div className="libraryContainer">
          <div className="sectionHead">
            <p className="sectionLabel">Бібліотека вправ</p>

            <h2 className="sectionTitle">
              Вправи з поясненням техніки для кожної цілі
            </h2>
          </div>

          <div className="libraryTags">
            <span>Груди</span>
            <span>Спина</span>
            <span>Ноги</span>
            <span>Плечі</span>
            <span>Прес</span>
            <span>Мобільність</span>
          </div>

          <div className="libraryGrid">
            <div className="exerciseCard">
              <div className="exerciseVideo">Відео вправи</div>
              <div className="exerciseContent">
                <span>Груди</span>
                <h3>Жим гантелей лежачи</h3>
                <p>Контроль амплітуди, стабільні лопатки і робота без ривків.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <div className="exerciseVideo">Відео вправи</div>
              <div className="exerciseContent">
                <span>Спина</span>
                <h3>Тяга верхнього блока</h3>
                <p>Фокус на лопатках, контроль корпусу і повне скорочення спини.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <div className="exerciseVideo">Відео вправи</div>
              <div className="exerciseContent">
                <span>Ноги</span>
                <h3>Румунська тяга</h3>
                <p>Таз назад, нейтральна спина, контроль задньої поверхні стегна.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="faqSection">
        <div className="faqContainer">
          <div className="sectionHead">
            <p className="sectionLabel">FAQ</p>

            <h2 className="sectionTitle">
              Питання, які зазвичай виникають перед стартом
            </h2>
          </div>

          <div className="faqList">
            <div className="faqItem">
              <h3>Я новачок. Мені підійде?</h3>
              <p>
                Так. План підбирається під твій рівень, техніку, ціль і графік. Не треба бути “готовим” до старту.
              </p>
            </div>

            <div className="faqItem">
              <h3>Обов’язково рахувати калорії?</h3>
              <p>
                Не завжди. Але для точного результату ми маємо розуміти харчування: через КБЖВ, порції або контроль раціону.
              </p>
            </div>

            <div className="faqItem">
              <h3>Коли буде результат?</h3>
              <p>
                Перші зміни зазвичай видно через 3–4 тижні. Стабільний результат залежить від дисципліни, сну, харчування і регулярності.
              </p>
            </div>

            <div className="faqItem">
              <h3>Онлайн-супровід працює?</h3>
              <p>
                Так, якщо ти виконуєш план, надсилаєш звіти і не зникаєш, як Wi-Fi у підвалі.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="finalCtaSection">
        <div className="finalCtaContainer">

          <p className="sectionLabel">
            Старт
          </p>

          <h2 className="finalCtaTitle">
            Готовий перестати тренуватись навмання?
          </h2>

          <p className="finalCtaText">
            Система тренувань, харчування і контролю,
            яка будується під твою ціль,
            а не під випадкові поради з TikTok.
          </p>

          <div className="finalCtaButtons">
            <a href="#contacts" className="finalPrimaryBtn">
              Записатись на консультацію
            </a>

            <a
              href="https://instagram.com/burdak_coach"
              target="_blank"
              className="finalSecondaryBtn"
            >
              Переглянути Instagram
            </a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footerContainer">

          <div className="footerLeft">
            <h3>BURDAK COACH</h3>

            <p>
              Персональний тренер • Онлайн супровід • Система без хаосу
            </p>
          </div>

          <div className="footerRight">
            <a href="#about">Про мене</a>
            <a href="#services">Послуги</a>
            <a href="#results">Результати</a>
            <a href="#library">Бібліотека вправ</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}