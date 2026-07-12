export default function LegsPage() {
  return (
    <main>
      <section className="librarySection">
        <div className="libraryContainer">
          <a href="/library" className="backLink">← До бібліотеки</a>

          <div className="sectionHead">
            <p className="sectionLabel">Ноги</p>
            <h1 className="sectionTitle">Вправи для м'язів ніг</h1>
          </div>

          <div className="libraryGrid">
            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/legs/romanian-deadlift.mp4" controls preload="metadata"/>
              <div className="exerciseContent">
                <span>Ноги</span>
                <h3>Румунська тяга</h3>
                <p>М'який згин колін, штанга близько до ніг, розтяжка задньої поверхні стегна.</p>
              </div>
            </div>

            <div className="exerciseCard">
              <video className="exerciseVideo" src="/library/legs/sumo-deadlift.mp4" controls preload="metadata"/>
              <div className="exerciseContent">
                <span>Ноги</span>
                <h3>Сумо-тяга на сідниці</h3>
                <p>Широка постановка ніг, коліна по лінії стоп, акцент на сідниці.</p>
              </div>
            </div>
            <div className="exerciseCard">
  <video className="exerciseVideo" src="/library/legs/bulgarian-split-squat.mp4" controls preload="metadata"/>
  <div className="exerciseContent">
    <span>Ноги</span>
    <h3>Болгарські випади</h3>
    <p>Задня нога на підвищенні, коліно передньої ноги не виходить за носок.</p>
  </div>
</div>
<div className="exerciseCard">
  <video className="exerciseVideo" src="/library/legs/cable-leg-abduction.mp4" controls preload="metadata" />
  <div className="exerciseContent">
    <span>Ноги</span>
    <h3>Відведення ноги в кросовері</h3>
    <p>Корпус нерухомий, контрольований рух ноги в сторону з акцентом на середній сідничний м'яз.</p>
  </div>
</div>

<div className="exerciseCard">
  <video className="exerciseVideo" src="/library/legs/diagonal-cable-abduction.mp4" controls preload="metadata" />
  <div className="exerciseContent">
    <span>Ноги</span>
    <h3>Діагональне відведення ноги в кросовері</h3>
    <p>Рух по діагоналі назад-убік, додаткове навантаження на сідничні м'язи.</p>
  </div>
</div>
          </div>
        </div>
      </section>
    </main>
  );
}