export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
        Іван Бурдак
      </h1>

      <p className="text-lg md:text-xl text-center max-w-xl mb-8 text-gray-300">
        Персональний тренер та реабілітолог.  
        Зі мною результат залежить тільки від твоєї готовності пожертвувати гіршою версією себе.
      </p>

      <div className="flex gap-4">
        <a
          href="https://www.instagram.com/burdak_coach"
          target="_blank"
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition"
        >
          Instagram
        </a>

        <a
          href="https://wa.me/380994470977"
          target="_blank"
          className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
        >
          Написати в WhatsApp
        </a>
      </div>

    </main>
  );
}