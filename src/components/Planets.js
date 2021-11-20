import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Planet from "./Planet";

const fetchPlanets = (page = 0) =>
  fetch("https://swapi.dev/api/planets?page=" + page).then((res) => res.json());

export default function Planets() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  // react-query gives states of api call - isLoading, isError, isSuccess, isIdle
  // plus we get - error, data, isFetching
  const { status, error, data, isFetching, isPreviousData } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["planets", page + 1], () =>
        fetchPlanets(page + 1)
      );
    }
  }, [data, page, queryClient]);

  return (
    <div>
      <div className="title">
        <h2>Planets</h2>
        <div style={{ textAlign: "right" }}>
          <p className="page">Current Page: {page}</p>
          <div style={{ margin: 0 - 10 }}>
            <button
              disabled={page === 1}
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
            >
              Prev Page
            </button>
            <button
              disabled={isPreviousData || page === 6}
              onClick={() => setPage((old) => old + 1)}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.results?.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
      {isFetching ? <span>Loading...</span> : null}
    </div>
  );
}
