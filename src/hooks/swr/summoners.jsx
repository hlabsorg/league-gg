import useSWR from "swr";
import qs from "qs";
import { fetcher } from "./fetcher";

const API_PREFIX = "/api/v1.0";

export const useSummoners = (gameName, tagLine, regionId) => {
  const params = qs.stringify({
    gameName,
    tagLine,
    regionId,
  });
  const { data, error, isLoading } = useSWR(`${API_PREFIX}/summoners?${params}`);

  return {
    data,
    error,
    isLoading,
  };
};
