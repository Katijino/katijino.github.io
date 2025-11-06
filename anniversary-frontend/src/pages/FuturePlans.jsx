import { useState, useEffect } from "react";
import StarRating from "../components/StarRating.jsx";
const API_BASE = 'https://anniversary-uwml.onrender.com';

export default function FuturePlans() {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState("");
  const [importance, setImportance] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/api/futureplans`)
      .then(res => res.json())
      .then(setPlans);
  }, []);

  const addPlan = async () => {
    if (!newPlan.trim()) return;
    await fetch(`${API_BASE}/api/futureplans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: newPlan, importance })
    });
    setNewPlan("");
    setImportance(0);
    const res = await fetch(`${API_BASE}/api/futureplans`);
    setPlans(await res.json());
  };

  const removePlan = async (id) => {
    await fetch(`${API_BASE}/api/futureplans${id}`, {
      method: "DELETE"
    });
    const res = await fetch(`${API_BASE}/api/futureplans`);
    setPlans(await res.json());
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Future Plans 🌟</h1>

      {/* Add plan input */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
        <input
          placeholder="New Plan"
          value={newPlan}
          onChange={e => setNewPlan(e.target.value)}
        />
        <StarRating onRatingSelect={setImportance} />
        <button onClick={addPlan}>Add Plan</button>
      </div>

      {/* Plan list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {plans.map(p => (
          <li key={p.id} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginBottom: "1rem",
            padding: "1rem",
            position: "relative"
          }}>
            <button
              onClick={() => removePlan(p.id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#f55",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                padding: "4px 8px"
              }}
            >
              ✕
            </button>
            <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>{p.plan}</p>
            <div>
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i < p.importance ? "#ffc107" : "#e4e5e9"}
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.753l-6 5.849 1.417 8.265L12 19.771l-7.417 4.096L6 15.602 0 9.753l8.332-1.735z" />
                  </svg>
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
