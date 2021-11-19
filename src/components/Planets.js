import { useQuery } from "react-query";
import Planet from "./Planet";

export default function Planets() {
  const fetchPlanets = async () => {
    const res = await fetch("https://swapi.dev/api/planets");
    return res.json();
  };

  const { data: planets, status } = useQuery("planets", fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
      {status === "error" && <div>Error fetching data...</div>}
      {status === "isLoading" && <div>Loading data...</div>}
      {status === "success" && (
        <div>
          {planets.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
}
