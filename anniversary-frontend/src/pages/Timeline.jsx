import { useState, useEffect } from "react";
const API_BASE = 'https://anniversary-uwml.onrender.com';

export default function Timeline() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" });
  const [image, setImage] = useState(null);
  const [ascending, setAscending] = useState(false); // false = newest first

  // Fetch events
  const fetchEvents = async () => {
    const res = await fetch(`${API_BASE}/api/timeline`);
    const data = await res.json();
    setEvents(sortEvents(data, ascending));
  };

  useEffect(() => {
    fetchEvents();
  }, [ascending]);

  // Sort helper
  const sortEvents = (eventsList, asc) => {
    return [...eventsList].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return asc ? dateA - dateB : dateB - dateA;
    });
  };

  const removeEvent = async (id) => {
    await fetch(`${API_BASE}/api/timeline/${id}`, {
      method: "DELETE"
    });
    fetchEvents();
  };

  const addEvent = async () => {
    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("description", newEvent.description);
    formData.append("date", newEvent.date);
    if (image) formData.append("image", image);

    await fetch(`${API_BASE}/api/timeline`, {
      method: "POST",
      body: formData
    });

    setNewEvent({ title: "", description: "", date: "" });
    setImage(null);
    fetchEvents();
  };

  const toggleOrder = () => setAscending(!ascending);

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Our Timeline ❤️</h1>

      {/* Input section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          placeholder="Title"
          value={newEvent.title}
          onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />
        <button onClick={addEvent}>Add Event</button>
        <button onClick={toggleOrder}>
          Order: {ascending ? "Oldest → Newest" : "Newest → Oldest"}
        </button>
      </div>

      {/* Timeline display */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map(ev => (
          <li key={ev.id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            marginBottom: '1rem',
            padding: '1rem',
            position: 'relative'
          }}>
            <button
              onClick={() => removeEvent(ev.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#f55',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                padding: '4px 8px'
              }}
            >
              ✕
            </button>
            <h3>{ev.title}</h3>
            <p><b>{ev.date}</b></p>
            <p>{ev.description}</p>
            {ev.image_url && (
              <img
                src={`http://127.0.0.1:5000${ev.image_url}`}
                alt={ev.title}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover", // ensures the image fills the square and is cropped automatically
                  borderRadius: "8px",
                  marginTop: "0.5rem",
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
