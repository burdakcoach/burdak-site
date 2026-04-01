export default function UBD() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <section className="max-w-xl mx-auto text-center space-y-6">

        <h1 className="text-3xl font-bold">
          Безкоштовна консультація для УБД
        </h1>

        <p className="text-gray-300">
          Якщо ти учасник бойових дій — я готовий допомогти тобі безкоштовно.
          Напиши мені, і ми розберемо твою ситуацію.
        </p>

        <a
          href="https://wa.me/380994470977?text=Привіт,%20я%20УБД,%20хочу%20консультацію"
          target="_blank"
          className="block bg-white text-black py-4 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Написати в WhatsApp
        </a>

      </section>
    </main>
  );
}