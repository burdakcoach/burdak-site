export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_25%),linear-gradient(to_bottom,_#030303,_#080808_45%,_#030303)] text-white px-6 py-20">
      {/* HERO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center mb-28">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-gray-500 mb-5">
  Реабілітолог • Тренер • 5+ років досвіду
</p>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Іван Бурдак
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-6">
  Допомагаю прибрати біль, привести тіло в форму та отримати результат через системний підхід.
</p>

          <blockquote className="border-l-4 border-white/80 pl-4 italic text-gray-400 text-base md:text-lg mb-8">
  “Зі мною результат залежить тільки від твоєї готовності пожертвувати гіршою версією себе.”
</blockquote>

          <div className="flex flex-col sm:flex-row gap-4">

  <a
    href="https://www.instagram.com/burdak_coach"
    target="_blank"
    rel="noopener noreferrer"
className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90 transition"  >
    Перейти в Instagram
  </a>

  <a
    href="/quiz"
    className="inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
  >
    Оцінити власну форму
  </a>
  <a
  href="/ubd"
  className="inline-flex items-center justify-center border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
>
  Для УБД (безкоштовно)
</a>

</div>
<div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-4">
  <span className="mr-1">Зручно написати в:</span>

  {/* WhatsApp */}
  <a
    href="https://wa.me/380994470977"
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-black transition"
  >
    WhatsApp
  </a>

  {/* Telegram */}
  <a
    href="https://t.me/calmswirl"
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 rounded-full bg-[#229ED9]/10 border border-[#229ED9]/30 text-[#229ED9] hover:bg-[#229ED9] hover:text-black transition"
  >
    Telegram
  </a>

  {/* Signal */}
  <a
    href="https://signal.me/#p/+380994470977"
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 rounded-full bg-[#3A76F0]/10 border border-[#3A76F0]/30 text-[#3A76F0] hover:bg-[#3A76F0] hover:text-black transition"
  >
    Signal
  </a>
</div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 rounded-[28px] bg-white/5 blur-2xl scale-95" />
            <img
              src="/me.jpg"
              alt="Іван Бурдак"
              className="relative w-[320px] md:w-[380px] rounded-[28px] object-cover border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* RESULTS CARD */}
      <section className="max-w-6xl mx-auto mb-24">
        <a href="/results" className="block group max-w-2xl">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition">
            <img
              src="/result.jpg"
              alt="Результат за 21 день"
              className="w-full h-32 md:h-36 object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition" />

            <div className="absolute bottom-4 left-4">
              <p className="text-base md:text-lg font-semibold">
                Результат за 21 день
              </p>
              <p className="text-xs text-gray-300">
                кейс клієнта
              </p>
            </div>
          </div>
        </a>
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Послуги
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition">
            <h3 className="text-xl font-semibold mb-3">
              Онлайн консультація
            </h3>

            <p className="text-gray-400 mb-4 leading-relaxed">
              Аналіз ситуації, рекомендації по тренуваннях та харчуванню.
            </p>

            <p className="mb-6 font-semibold text-white">
              від 500 грн
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20хочу%20консультацію"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Записатися
            </a>
          </div>

          <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition">
            <h3 className="text-xl font-semibold mb-3">
              Програма тренувань
            </h3>

            <p className="text-gray-400 mb-4 leading-relaxed">
              Індивідуальний план під твою ціль.
            </p>

            <p className="mb-6 font-semibold text-white">
              від 1000 грн
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20хочу%20програму%20тренувань"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Замовити
            </a>
          </div>

          <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition">
            <h3 className="text-xl font-semibold mb-3">
              Онлайн ведення
            </h3>

            <p className="text-gray-400 mb-4 leading-relaxed">
              Повний супровід: тренування, харчування, контроль.
            </p>

            <p className="mb-6 font-semibold text-white">
              індивідуально
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20цікавить%20онлайн%20ведення"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center border border-white py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
            >
              Написати
            </a>
          </div>
          <section className="max-w-6xl mx-auto mt-24">
  <div className="flex items-end justify-between gap-6 mb-10">
    <div>
      <p className="text-sm uppercase tracking-[0.28em] text-gray-500 mb-3">
        База вправ
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        Відео-бібліотека вправ
      </h2>
      <p className="text-gray-400 max-w-2xl leading-relaxed">
        Каталог вправ у моєму виконанні: техніка, варіації та окремий розділ для домашніх тренувань.
      </p>
    </div>

    <a
      href="/library"
      className="hidden md:inline-flex items-center justify-center border border-white/20 bg-white/5 px-5 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
    >
      Відкрити бібліотеку
    </a>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
    <a
      href="/library"
      className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition"
    >
      <h3 className="text-xl font-semibold mb-3">Алфавітний каталог</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        Структурований перелік вправ для швидкого пошуку.
      </p>
    </a>

    <a
      href="/library/home"
      className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition"
    >
      <h3 className="text-xl font-semibold mb-3">Вправи вдома</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        Варіанти без тренажерного залу та складного обладнання.
      </p>
    </a>

    <a
      href="/stretching"
      className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition"
    >
      <h3 className="text-xl font-semibold mb-3">Стретчинг</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        Мобільність, розтягнення та робота з напруженими зонами.
      </p>
    </a>

    <a
      href="/library"
      className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition"
    >
      <h3 className="text-xl font-semibold mb-3">Техніка виконання</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        Ключові моменти, щоб тренуватись без дурних помилок.
      </p>
    </a>
  </div>

  <a
    href="/library"
    className="mt-6 md:hidden inline-flex items-center justify-center border border-white/20 bg-white/5 px-5 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
  >
    Відкрити бібліотеку
  </a>
</section>
<section className="max-w-6xl mx-auto mt-24 mb-12">
  <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
    <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-3xl p-8">
      <p className="text-sm uppercase tracking-[0.28em] text-gray-500 mb-4">
        Про мене
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Біографія
      </h2>
      <p className="text-gray-400 leading-relaxed">
        Мій шлях почався з активного дитинства, гір, гімнастики і постійного руху. 
        Пізніше це переросло в професійний розвиток, освіту реабілітолога та багаторічну практику в фітнесі.
      </p>
    </div>

    <div className="space-y-5">
      <div className="border-l-2 border-white/20 pl-5">
        <h3 className="text-lg font-semibold mb-2">Активне дитинство і фундамент руху</h3>
        <p className="text-gray-400 leading-relaxed">
          Завдяки активному способу життя, походам у Криму та Карпатах і заняттям гімнастикою я дуже рано зрозумів цінність фізичного розвитку.
        </p>
      </div>

      <div className="border-l-2 border-white/20 pl-5">
        <h3 className="text-lg font-semibold mb-2">Освіта і практика</h3>
        <p className="text-gray-400 leading-relaxed">
          Починаючи з другого курсу університету, де я здобував освіту фізичного реабілітолога, я вже працював у фітнес-клубі і вчився не тільки в теорії, а й у реальній роботі з людьми.
        </p>
      </div>

      <div className="border-l-2 border-white/20 pl-5">
        <h3 className="text-lg font-semibold mb-2">Позиція сьогодні</h3>
        <p className="text-gray-400 leading-relaxed">
          Для мене ця справа не про випадкові тренування. Це про розвиток, системність і реальні зміни в тілі, здоров’ї та якості життя.
        </p>
      </div>
    </div>
  </div>
</section>
        </div>
      </section>
    </main>
  );
}