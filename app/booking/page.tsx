"use client";

import { useEffect, useState } from "react";

type Slot = { start: string; end: string };

export default function BookingPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.slots || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
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
              Не вдалося завантажити розклад. Спробуй пізніше.
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
                    <button key={slot.start} className="bookingSlotBtn">
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
      </section>
    </main>
  );
}