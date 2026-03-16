import { useQuery } from "@tanstack/react-query";
import type {
  Athlete,
  NewsHighlight,
  SportsCategory,
  SportsEvent,
} from "../backend.d";
import { Status } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllData() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allData"],
    queryFn: async () => {
      if (!actor)
        return { news: [], athletes: [], events: [], sportsCategories: [] };
      return actor.getAllData();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllEvents() {
  const { actor, isFetching } = useActor();
  return useQuery<SportsEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllAthletes() {
  const { actor, isFetching } = useActor();
  return useQuery<Athlete[]>({
    queryKey: ["athletes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAthletes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllNews() {
  const { actor, isFetching } = useActor();
  return useQuery<NewsHighlight[]>({
    queryKey: ["news"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllSportsCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<SportsCategory[]>({
    queryKey: ["sportsCategories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSportsCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export { Status };
