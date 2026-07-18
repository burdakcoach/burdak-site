"use client";

import { useEffect, useState } from "react";

type Slot = { start: string; end: string };

export default function BookingPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");
  const [errorDetail, setErrorDetail] = useState<string>("");
  
 useEffect(() => {
  fetch("/api/availability")
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setSlots(data.slots || []);
      setLoading(false);
    })
    .catch((err) => {
      setError(true);
      setErrorDetail(String(err.message || err));
      setLoading(false);
    });
}, []);

  const grouped: Record<string, Slot[]> = {};
  slots.forEach((slot) => {
    const key = new Date(slot.start).toLocaleDateString("uk-UA", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(slot);
  });

  return (
    <main>
      <section className="bookingSection">
        <div className="bookingContainer">
          <a href="/" className="backLink">← На головну</a>

          <div className="sectionHead">
            <p className="sectionLabel">Бронювання</p>
            <h1 className="sectionTitle">Обери зручний час</h1>
          </div>

          {loading && <p className="bookingStatus">Завантажую вільні слоти...</p>}
          {error && (
  <p className="bookingStatus">
    Не вдалося завантажити розклад: {errorDetail}
  </p>
          )}
          {!loading && !error && slots.length === 0 && (
            <p className="bookingStatus">Немає вільних слотів найближчим часом.</p>
          )}

          <div className="bookingDays">
            {Object.entries(grouped).map(([day, daySlots]) => (
              <div key={day} className="bookingDay">
                <h3 className="bookingDayTitle">{day}</h3>
                <div className="bookingSlots">
                  {daySlots.map((slot) => (
                    <button
  key={slot.start}
  className="bookingSlotBtn"
  onClick={() => setSelectedSlot(slot)}
>
  {new Date(slot.start).toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  })}
</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedSlot && (
  <div className="bookingModalOverlay" onClick={() => setSelectedSlot(null)}>
    <div className="bookingModal" onClick={(e) => e.stopPropagation()}>
      <button className="bookingModalClose" onClick={() => setSelectedSlot(null)}>
        ×
      </button>

      <p className="sectionLabel">Підтвердження запису</p>
      <h3 className="bookingModalTitle">
        {new Date(selectedSlot.start).toLocaleDateString("uk-UA", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
        {", "}
        {new Date(selectedSlot.start).toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h3>

      <div className="bookingForm">
        <input
          type="text"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bookingInput"
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bookingInput"
        />

        {submitError && <p className="bookingModalError">{submitError}</p>}

        <button
          className="primaryBtn"
          disabled={submitting || !name || !phone}
          onClick={async () => {
            setSubmitting(true);
            setSubmitError("");
            try {
              const res = await fetch("/api/create-booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name,
                  phone,
                  start: selectedSlot.start,
                  end: selectedSlot.end,
                }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || "Помилка");
              if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
              }
            } catch (err: any) {
              setSubmitError(err.message || "Не вдалося оформити запис");
              setSubmitting(false);
            }
          }}
        >
          {submitting ? "Обробка..." : "Перейти до оплати"}
        </button>
      </div>
    </div>
  </div>
)}
      </section>
    </main>
  );
}