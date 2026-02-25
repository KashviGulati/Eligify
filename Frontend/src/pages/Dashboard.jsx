import { useEffect, useState } from "react";
import "./dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("full");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/eligibility/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  if (!data) return <h2 className="loading">Loading...</h2>;

  const list = tab === "full" ? data.full_matches : data.partial_matches;

  return (
    <div className="dashboard">
      <h1 className="title">
        Elig<span>ify</span> Dashboard
      </h1>

      {/* SUMMARY */}
      <div className="summary">
        <div>
          <p>Total</p>
          <h3>{data.summary.total_schemes}</h3>
        </div>
        <div>
          <p>Full Match</p>
          <h3>{data.summary.full_matches}</h3>
        </div>
        <div>
          <p>Partial</p>
          <h3>{data.summary.partial_matches}</h3>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={tab === "full" ? "active" : ""}
          onClick={() => setTab("full")}
        >
          Full Matches
        </button>
        <button
          className={tab === "partial" ? "active" : ""}
          onClick={() => setTab("partial")}
        >
          Partial Matches
        </button>
      </div>

      {/* CARDS */}
      <div className="cards">
        {list.map((s) => (
          <div className="card" key={s.id}>
            <div className="card-top">
              <h3>{s.name}</h3>
              <span className={s.eligible ? "badge full" : "badge partial"}>
                {s.eligible ? "Full Match" : "Partial"}
              </span>
            </div>

            <p className="ministry">{s.ministry}</p>

            <div className="amount">{s.amount}</div>

            {/* Progress */}
            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: `${s.confidence}%` }}
              ></div>
            </div>

            <span className="percent">{s.confidence}% match</span>

            {!s.eligible && (
              <ul className="reasons">
                {s.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}