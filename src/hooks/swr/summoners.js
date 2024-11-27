"use client";

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

  let apiUrl;
  if (!gameName || !tagLine) {
    apiUrl = null;
  } else {
    apiUrl = `${API_PREFIX}/summoners?${params}`;
  }
  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};
