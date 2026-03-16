import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SportsCategory {
    id: SportId;
    name: string;
    description: string;
    iconLabel: string;
}
export type Time = bigint;
export type SportId = bigint;
export type NewsId = bigint;
export interface NewsHighlight {
    id: NewsId;
    title: string;
    date: Time;
    summary: string;
    category: string;
}
export type EventId = bigint;
export interface SportsEvent {
    id: EventId;
    status: Status;
    title: string;
    date: Time;
    description: string;
    sportType: string;
    location: string;
}
export interface Athlete {
    id: AthleteId;
    bio: string;
    name: string;
    sport: string;
    achievements: Array<string>;
    position: string;
}
export type AthleteId = bigint;
export enum Status {
    upcoming = "upcoming",
    live = "live",
    completed = "completed"
}
export interface backendInterface {
    createAthlete(name: string, sport: string, position: string, bio: string, achievements: Array<string>): Promise<AthleteId>;
    createEvent(title: string, sportType: string, date: Time, location: string, description: string, status: Status): Promise<EventId>;
    createNews(title: string, summary: string, category: string, date: Time): Promise<NewsId>;
    createSportsCategory(name: string, description: string, iconLabel: string): Promise<SportId>;
    deleteAthlete(athleteId: AthleteId): Promise<void>;
    deleteEvent(eventId: EventId): Promise<void>;
    deleteNews(newsId: NewsId): Promise<void>;
    deleteSportsCategory(categoryId: SportId): Promise<void>;
    getAllAthletes(): Promise<Array<Athlete>>;
    getAllData(): Promise<{
        news: Array<NewsHighlight>;
        athletes: Array<Athlete>;
        events: Array<SportsEvent>;
        sportsCategories: Array<SportsCategory>;
    }>;
    getAllEvents(): Promise<Array<SportsEvent>>;
    getAllNews(): Promise<Array<NewsHighlight>>;
    getAllSportsCategories(): Promise<Array<SportsCategory>>;
    getEventsByStatus(status: Status): Promise<Array<SportsEvent>>;
    updateAthlete(athleteId: AthleteId, name: string, sport: string, position: string, bio: string, achievements: Array<string>): Promise<void>;
    updateEvent(eventId: EventId, title: string, sportType: string, date: Time, location: string, description: string, status: Status): Promise<void>;
    updateNews(newsId: NewsId, title: string, summary: string, category: string, date: Time): Promise<void>;
    updateSportsCategory(categoryId: SportId, name: string, description: string, iconLabel: string): Promise<void>;
}
