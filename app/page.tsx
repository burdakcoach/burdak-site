export default function Home() {
  return (
    <main className="bg-black text-white">
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
              Реабілітолог • Тренер • 5+ років досвіду
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Іван Бурдак
            </h1>

            <div className="mb-8 space-y-4">
  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
    Персональний тренер та реабілітолог.
  </p>

  <blockquote className="border-l-4 border-white pl-4 italic text-lg md:text-xl text-gray-400">
    “Зі мною результат залежить тільки від твоєї готовності пожертвувати гіршою версією себе.”
  </blockquote>
</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/380994470977"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-4 rounded-2xl font-semibold text-center hover:opacity-80 transition"
              >
                Записатися на консультацію
              </a>

              <a
                href="https://www.instagram.com/burdak_coach?igsh=OGlhZ3J0bGpodXM2"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white px-6 py-4 rounded-2xl font-semibold text-center hover:bg-white hover:text-black transition"
              >
                Перейти в Instagram
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-white/10 rounded-2xl p-4">
                <p className="text-2xl font-bold">5+ років</p>
                <p className="text-gray-400 text-sm mt-1">практичного досвіду</p>
              </div>
              <div className="border border-white/10 rounded-2xl p-4">
                <p className="text-2xl font-bold">UA / EN</p>
                <p className="text-gray-400 text-sm mt-1">масштабування в майбутньому</p>
              </div>
              <div className="border border-white/10 rounded-2xl p-4">
                <p className="text-2xl font-bold">Online</p>
                <p className="text-gray-400 text-sm mt-1">супровід і консультації</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-[4/5] rounded-[32px] border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-800 flex items-center justify-center text-center p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
                  Місце для фото
                </p>
                <p className="text-2xl font-semibold">
                  Тут буде твоє
                  <br />
                  головне фото
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
            Послуги
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Формати роботи
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-white/10 rounded-[28px] p-8 bg-zinc-950">
              <h3 className="text-2xl font-bold mb-4">Онлайн консультація</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Аналіз поточного стану, цілей, помилок у тренуваннях та
                рекомендації на основі попереднього анкетування.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Для тих, хто хоче зрозуміти, з чого почати і що виправити.
              </p>
              <a
                href="https://wa.me/380994470977"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-black px-5 py-3 rounded-xl font-semibold hover:opacity-80 transition"
              >
                Записатися
              </a>
            </div>

            <div className="border border-white/10 rounded-[28px] p-8 bg-zinc-950">
              <h3 className="text-2xl font-bold mb-4">Програма тренувань</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Індивідуальна програма під твої цілі, рівень підготовки,
                фізичні особливості та графік.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Для тих, кому потрібна чітка система замість хаосу.
              </p>
              <a
                href="https://wa.me/380994470977"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-black px-5 py-3 rounded-xl font-semibold hover:opacity-80 transition"
              >
                Отримати програму
              </a>
            </div>

            <div className="border border-white/10 rounded-[28px] p-8 bg-white text-black">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-600 mb-3">
                Premium
              </p>
              <h3 className="text-2xl font-bold mb-4">Онлайн ведення</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Повний супровід: програма тренувань, харчування з урахуванням
                особливостей організму, контроль і корекція процесу.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Для тих, хто налаштований на результат, а не на відмазки.
              </p>
              <a
                href="https://wa.me/380994470977"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white px-5 py-3 rounded-xl font-semibold hover:opacity-80 transition"
              >
                Подати заявку
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
              Про мене
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Біографія та підхід
            </h2>
          </div>

          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              Моє дитинство було активним: без гаджетів, із живою комунікацією
              та постійним рухом. Величезна подяка моїй бабусі, Єрмоленко
              Катерині Олександрівні. Саме завдяки їй я ще до 13 років обходив
              гори Криму і Карпати та потрапив у гурток гімнастики.
            </p>

            <p>
              Починаючи з другого курсу університету, де я здобував освіту
              фізичного реабілітолога, я вже працював у фітнес-клубі. Це дало
              мені не тільки теорію, а й реальну практику з людьми, їхніми
              цілями, обмеженнями та результатами.
            </p>

            <p>
              Я вдячний сильному тренерському оточенню, яке передавало мені
              знання, досвід і стандарти професії. Для мене розвиток,
              дисципліна і здатність навчати інших ставати кращими - це не
              просто робота. Це мій шлях.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
            Результати
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Відгуки та трансформації
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-[28px] border border-white/10 p-6">
              <div className="aspect-[4/5] rounded-2xl bg-zinc-900 mb-5 flex items-center justify-center text-gray-500 text-center px-4">
                Фото “до / після”
              </div>
              <p className="text-gray-300">
                Тут буде кейс клієнта з коротким описом результату.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 p-6">
              <div className="aspect-[4/5] rounded-2xl bg-zinc-900 mb-5 flex items-center justify-center text-gray-500 text-center px-4">
                Фото “до / після”
              </div>
              <p className="text-gray-300">
                Тут буде ще один кейс трансформації або відновлення.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 p-6">
              <div className="aspect-[4/5] rounded-2xl bg-zinc-900 mb-5 flex items-center justify-center text-gray-500 text-center px-4">
                Скрін відгуку / відео
              </div>
              <p className="text-gray-300">
                Тут буде відгук клієнта, який підсилює довіру до бренду.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
            Контакти
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовий почати працювати над собою?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Записуйся на консультацію, пиши в Instagram або WhatsApp. Далі або
            ти берешся за себе серйозно, або залишаєшся там, де вже був.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://wa.me/380994470977"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-4 rounded-2xl font-semibold hover:opacity-80 transition"
            >
              Записатися в WhatsApp
            </a>

            <a
              href="https://www.instagram.com/burdak_coach?igsh=OGlhZ3J0bGpodXM2"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-6 py-4 rounded-2xl font-semibold hover:bg-white hover:text-black transition"
            >
              Instagram
            </a>
          </div>

          <div className="text-gray-400 space-y-2">
            <p>Email: fcoachpro@gmail.com</p>
            <p>Business WhatsApp: +380994470977</p>
          </div>
        </div>
      </section>
    </main>
  );
}