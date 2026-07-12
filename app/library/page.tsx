export default function LibraryPage() {
  const groups = [
    { id: "chest", label: "Груди", video: "/library/chest.mp4" },
    { id: "back", label: "Спина", video: "/library/back.mp4" },
    { id: "legs", label: "Ноги", video: "/library/legs.mp4" },
   { id: "shoulders", label: "Плечі", video: "/library/shoulders/lateral-raise.mp4" },
    { id: "core", label: "Прес", video: "/library/core.mp4" },
    { id: "mobility", label: "Мобільність", video: "/library/mobility/hamstring-back-stretch.mp4" },
  ];

  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/" className="backLink">
            На головну
          </a>

          <div className="sectionHead">
            <p className="sectionLabel">Бібліотека вправ</p>
            <h1 className="sectionTitle">Обери м'яз і знайди найкращі вправи</h1>
          </div>

          <div className="muscleGrid">
            {groups.map((group) => (
              <a key={group.id} href={"/library/" + group.id} className="muscleCard">
                <video
                  className="muscleVideo"
                  src={group.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="muscleCardLabel">{group.label}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}