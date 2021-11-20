import { useQuery } from "react-query";

export default function usePeople() {
  
  const fetchPeople = () =>
    fetch("https://swapi.dev/api/people").then((res) => res.json());

  return useQuery("people", fetchPeople);
}
