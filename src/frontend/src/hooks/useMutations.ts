import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AthleteId, EventId, NewsId, SportId } from "../backend.d";
import { Status } from "../backend.d";
import { useActor } from "./useActor";

export { Status };

export function useCreateAthlete() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      sport: string;
      position: string;
      bio: string;
      achievements: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createAthlete(
        args.name,
        args.sport,
        args.position,
        args.bio,
        args.achievements,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["athletes"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("Athlete created");
    },
    onError: () => toast.error("Failed to create athlete"),
  });
}

export function useUpdateAthlete() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: AthleteId;
      name: string;
      sport: string;
      position: string;
      bio: string;
      achievements: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAthlete(
        args.id,
        args.name,
        args.sport,
        args.position,
        args.bio,
        args.achievements,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["athletes"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("Athlete updated");
    },
    onError: () => toast.error("Failed to update athlete"),
  });
}

export function useDeleteAthlete() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: AthleteId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteAthlete(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["athletes"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("Athlete deleted");
    },
    onError: () => toast.error("Failed to delete athlete"),
  });
}

export function useCreateEvent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      title: string;
      sportType: string;
      date: bigint;
      location: string;
      description: string;
      status: Status;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createEvent(
        args.title,
        args.sportType,
        args.date,
        args.location,
        args.description,
        args.status,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("Event created");
    },
    onError: () => toast.error("Failed to create event"),
  });
}

export function useUpdateEvent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: EventId;
      title: string;
      sportType: string;
      date: bigint;
      location: string;
      description: string;
      status: Status;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateEvent(
        args.id,
        args.title,
        args.sportType,
        args.date,
        args.location,
        args.description,
        args.status,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("Event updated");
    },
    onError: () => toast.error("Failed to update event"),
  });
}

export function useDeleteEvent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: EventId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteEvent(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("Event deleted");
    },
    onError: () => toast.error("Failed to delete event"),
  });
}

export function useCreateNews() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      title: string;
      summary: string;
      category: string;
      date: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createNews(
        args.title,
        args.summary,
        args.category,
        args.date,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("News created");
    },
    onError: () => toast.error("Failed to create news"),
  });
}

export function useUpdateNews() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: NewsId;
      title: string;
      summary: string;
      category: string;
      date: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateNews(
        args.id,
        args.title,
        args.summary,
        args.category,
        args.date,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("News updated");
    },
    onError: () => toast.error("Failed to update news"),
  });
}

export function useDeleteNews() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: NewsId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteNews(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("News deleted");
    },
    onError: () => toast.error("Failed to delete news"),
  });
}

export function useCreateSportsCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      description: string;
      iconLabel: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createSportsCategory(
        args.name,
        args.description,
        args.iconLabel,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sportsCategories"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("Sport category created");
    },
    onError: () => toast.error("Failed to create sport category"),
  });
}

export function useUpdateSportsCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: SportId;
      name: string;
      description: string;
      iconLabel: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSportsCategory(
        args.id,
        args.name,
        args.description,
        args.iconLabel,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sportsCategories"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("Sport category updated");
    },
    onError: () => toast.error("Failed to update sport category"),
  });
}

export function useDeleteSportsCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: SportId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSportsCategory(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sportsCategories"] });
      qc.invalidateQueries({ queryKey: ["allData"] });
      toast.success("Sport category deleted");
    },
    onError: () => toast.error("Failed to delete sport category"),
  });
}
