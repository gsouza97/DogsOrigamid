import React from "react";
import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import { STATS_GET } from "../../api";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
import UserStatsGraphs from "./UserStatsGraphs";

const UserStats = () => {
  const fetchHook = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await fetchHook.request(url, options);
    }
    getData();
  }, [fetchHook.request]);

  if (fetchHook.loading) return <Loading />;
  if (fetchHook.error) return <Error error={fetchHook.error} />;
  if (fetchHook.data) {
    return (
      <div>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={fetchHook.data} />
      </div>
    );
  } else {
    return null;
  }
};

export default UserStats;
