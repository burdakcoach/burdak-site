export default function Results() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">
        Результат за 21 день
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img src="/result1.jpg" className="rounded-xl" />
        <img src="/result2.jpg" className="rounded-xl" />
        <img src="/result3.jpg" className="rounded-xl" />
      </div>
    </main>
  );
}