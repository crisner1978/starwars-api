import Person from "./Person";
import usePeople from "../queryHooks/usePeople";

export default function People() {
  const { data: people, status } = usePeople()

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
