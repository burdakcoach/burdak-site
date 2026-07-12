export default function ArmsPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">← До бібліотеки</a>

          <div className="sectionHead">
            <p className="sectionLabel">Руки</p>
            <h1 className="sectionTitle">Вправи для біцепса і трицепса</h1>
          </div>

          <div className="libraryGrid">
            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/arms/hammer-curl.mp4" controls preload="metadata"/>
              <div className="exerciseContent">
                <span>Руки</span>
                <h3>Молотки</h3>
                <p>Нейтральний хват, лікті зафіксовані, без розгойдування корпусу.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/arms/concentration-curl.mp4" controls preload="metadata" />
              <div className="exerciseContent">
                <span>Руки</span>
                <h3>Концентричний підйом на біцепс</h3>
                <p>Лікоть впертий у стегно, ізольований рух без інерції.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/arms/triceps-pushdown.mp4" controls preload="metadata" />
              <div className="exerciseContent">
                <span>Руки</span>
                <h3>Канат — трицепс кросовер</h3>
                <p>Лікті притиснуті до корпусу, повне розгинання рук.</p>
              </div>
            </div>
            <div className="exerciseCard">
  <video className="exerciseVideo" src="/library/arms/triceps-cable-extension.mp4" controls preload="metadata" />
  <div className="exerciseContent">
    <span>Руки</span>
    <h3>Розгинання рук у кросовері</h3>
    <p>Лікті нерухомі, повна амплітуда розгинання трицепса.</p>
  </div>
</div>
          </div>
        </div>
      </section>
    </main>
  );
}