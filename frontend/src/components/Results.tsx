import { useEffect, useState } from "react";

const Results = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/eligibility/");

        if (!response.ok) {
          throw new Error("API error");
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
    <div className="mt-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-textDark mb-10 text-center">
        Your Eligibility Results
      </h2>

      {/* FULL MATCHES */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6 text-sage">
          Eligible Schemes
        </h3>

        <div className="grid gap-6">
          {data.full_matches?.length > 0 ? (
            data.full_matches.map((sch: any, index: number) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md border border-sageLight rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold text-textDark mb-2">
                  {sch.name}
                </h4>

                <p className="text-sm text-gray-600 mb-2">
                  {sch.ministry}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sage font-medium">
                    ₹ {sch.amount}
                  </span>

                  <span className="text-green-600 font-semibold">
                    {sch.eligibility?.confidence}% match
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No eligible schemes</p>
          )}
        </div>
      </div>

      {/* PARTIAL MATCHES */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-yellow-600">
          Partially Eligible
        </h3>

        <div className="grid gap-6">
          {data.partial_matches?.length > 0 ? (
            data.partial_matches.map((sch: any, index: number) => (
              <div
                key={index}
                className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <h4 className="text-lg font-semibold text-textDark mb-2">
                  {sch.name}
                </h4>

                <p className="text-sm text-gray-600 mb-2">
                  {sch.ministry}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sage font-medium">
                    ₹ {sch.amount}
                  </span>

                  <span className="text-yellow-600 font-semibold">
                    {sch.eligibility?.confidence}% match
                  </span>
                </div>

                <div className="text-sm text-red-500">
                  {sch.eligibility?.reasons?.join(", ")}
                </div>
              </div>
            ))
          ) : (
            <p>No partial matches</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;