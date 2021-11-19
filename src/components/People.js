import { useQuery } from "react-query";
import Person from "./Person";

export default function People() {
  const fetchPeople = async () => {
    const res = await fetch("https://swapi.dev/api/people");
    return res.json();
  };

  const { data: people, status } = useQuery("people", fetchPeople);

  return (
    <div>
      <h2>People</h2>
      {status === "error" && <div>Error fetching data...</div>}
      {status === "isLoading" && <div>Loading data...</div>}
      {status === "success" && (
        <div>
          {people.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}
