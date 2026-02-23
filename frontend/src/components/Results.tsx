import { useEffect, useState } from "react";

const Results = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await fetch("http://127.0.0.1:8000/api/eligibility/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized or API error");
        }

        const result = await response.json();
        console.log("API RESPONSE:", result);

        setData(result);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch eligibility data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  if (!data) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="mt-16 px-6">
      <h2 className="text-3xl font-semibold text-textDark mb-6 text-center">
        Your Eligibility Results
      </h2>

      {/* FULL MATCHES */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-green-700">
          Eligible Schemes
        </h3>

        {data.full_matches && data.full_matches.length > 0 ? (
          data.full_matches.map((sch: any) => (
            <div key={sch.id} className="bg-white p-4 rounded-xl shadow mb-4">
              <h4 className="font-semibold">{sch.name}</h4>
              <p>Confidence: {sch.confidence}%</p>
            </div>
          ))
        ) : (
          <p>No eligible schemes</p>
        )}
      </div>

      {/* PARTIAL MATCHES */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-yellow-600">
          Partially Eligible
        </h3>

        {data.partial_matches && data.partial_matches.length > 0 ? (
          data.partial_matches.map((sch: any) => (
            <div key={sch.id} className="bg-white p-4 rounded-xl shadow mb-4">
              <h4 className="font-semibold">{sch.name}</h4>
              <p>Confidence: {sch.confidence}%</p>
              <p className="text-sm text-red-500">
                {sch.reasons?.join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p>No partial matches</p>
        )}
      </div>
    </div>
  );
};

export default Results;