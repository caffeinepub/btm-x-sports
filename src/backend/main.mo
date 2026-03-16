import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type EventId = Nat;
  type AthleteId = Nat;
  type NewsId = Nat;
  type SportId = Nat;

  // Main types
  type SportsEvent = {
    id : EventId;
    title : Text;
    sportType : Text;
    date : Time.Time;
    location : Text;
    description : Text;
    status : Status;
  };

  type Athlete = {
    id : AthleteId;
    name : Text;
    sport : Text;
    position : Text;
    bio : Text;
    achievements : [Text];
  };

  type NewsHighlight = {
    id : NewsId;
    title : Text;
    summary : Text;
    category : Text;
    date : Time.Time;
  };

  type SportsCategory = {
    id : SportId;
    name : Text;
    description : Text;
    iconLabel : Text;
  };

  type Status = { #upcoming; #live; #completed };

  module SportsEvent {
    public func compare(a : SportsEvent, b : SportsEvent) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  module Athlete {
    public func compare(a : Athlete, b : Athlete) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  module NewsHighlight {
    public func compare(a : NewsHighlight, b : NewsHighlight) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  module SportsCategory {
    public func compare(a : SportsCategory, b : SportsCategory) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  var nextEventId = 1;
  var nextAthleteId = 1;
  var nextNewsId = 1;
  var nextSportId = 1;

  let events = Map.empty<EventId, SportsEvent>();
  let athletes = Map.empty<AthleteId, Athlete>();
  let newsItems = Map.empty<NewsId, NewsHighlight>();
  let sportsCategories = Map.empty<SportId, SportsCategory>();

  // CRUD for Sports Events
  public shared ({ caller }) func createEvent(
    title : Text,
    sportType : Text,
    date : Time.Time,
    location : Text,
    description : Text,
    status : Status,
  ) : async EventId {
    let event : SportsEvent = {
      id = nextEventId;
      title;
      sportType;
      date;
      location;
      description;
      status;
    };
    events.add(nextEventId, event);
    nextEventId += 1;
    event.id;
  };

  public shared ({ caller }) func updateEvent(
    eventId : EventId,
    title : Text,
    sportType : Text,
    date : Time.Time,
    location : Text,
    description : Text,
    status : Status,
  ) : async () {
    switch (events.get(eventId)) {
      case (null) { Runtime.trap("Event not found!") };
      case (?_) {
        let updatedEvent : SportsEvent = {
          id = eventId;
          title;
          sportType;
          date;
          location;
          description;
          status;
        };
        events.add(eventId, updatedEvent);
      };
    };
  };

  public shared ({ caller }) func deleteEvent(eventId : EventId) : async () {
    if (not events.containsKey(eventId)) {
      Runtime.trap("Event not found!");
    };
    events.remove(eventId);
  };

  // CRUD for Athletes
  public shared ({ caller }) func createAthlete(
    name : Text,
    sport : Text,
    position : Text,
    bio : Text,
    achievements : [Text],
  ) : async AthleteId {
    let athlete : Athlete = {
      id = nextAthleteId;
      name;
      sport;
      position;
      bio;
      achievements;
    };
    athletes.add(nextAthleteId, athlete);
    nextAthleteId += 1;
    athlete.id;
  };

  public shared ({ caller }) func updateAthlete(
    athleteId : AthleteId,
    name : Text,
    sport : Text,
    position : Text,
    bio : Text,
    achievements : [Text],
  ) : async () {
    switch (athletes.get(athleteId)) {
      case (null) { Runtime.trap("Athlete not found!") };
      case (?_) {
        let updatedAthlete : Athlete = {
          id = athleteId;
          name;
          sport;
          position;
          bio;
          achievements;
        };
        athletes.add(athleteId, updatedAthlete);
      };
    };
  };

  public shared ({ caller }) func deleteAthlete(athleteId : AthleteId) : async () {
    if (not athletes.containsKey(athleteId)) {
      Runtime.trap("Athlete not found!");
    };
    athletes.remove(athleteId);
  };

  // CRUD for News Highlights
  public shared ({ caller }) func createNews(
    title : Text,
    summary : Text,
    category : Text,
    date : Time.Time,
  ) : async NewsId {
    let news : NewsHighlight = {
      id = nextNewsId;
      title;
      summary;
      category;
      date;
    };
    newsItems.add(nextNewsId, news);
    nextNewsId += 1;
    news.id;
  };

  public shared ({ caller }) func updateNews(
    newsId : NewsId,
    title : Text,
    summary : Text,
    category : Text,
    date : Time.Time,
  ) : async () {
    switch (newsItems.get(newsId)) {
      case (null) { Runtime.trap("News item not found!") };
      case (?_) {
        let updatedNews : NewsHighlight = {
          id = newsId;
          title;
          summary;
          category;
          date;
        };
        newsItems.add(newsId, updatedNews);
      };
    };
  };

  public shared ({ caller }) func deleteNews(newsId : NewsId) : async () {
    if (not newsItems.containsKey(newsId)) {
      Runtime.trap("News item not found!");
    };
    newsItems.remove(newsId);
  };

  // CRUD for Sports Categories
  public shared ({ caller }) func createSportsCategory(
    name : Text,
    description : Text,
    iconLabel : Text,
  ) : async SportId {
    let category : SportsCategory = {
      id = nextSportId;
      name;
      description;
      iconLabel;
    };
    sportsCategories.add(nextSportId, category);
    nextSportId += 1;
    category.id;
  };

  public shared ({ caller }) func updateSportsCategory(
    categoryId : SportId,
    name : Text,
    description : Text,
    iconLabel : Text,
  ) : async () {
    switch (sportsCategories.get(categoryId)) {
      case (null) { Runtime.trap("Sports category not found!") };
      case (?_) {
        let updatedCategory : SportsCategory = {
          id = categoryId;
          name;
          description;
          iconLabel;
        };
        sportsCategories.add(categoryId, updatedCategory);
      };
    };
  };

  public shared ({ caller }) func deleteSportsCategory(categoryId : SportId) : async () {
    if (not sportsCategories.containsKey(categoryId)) {
      Runtime.trap("Sports category not found!");
    };
    sportsCategories.remove(categoryId);
  };

  // Public queries
  public query ({ caller }) func getAllEvents() : async [SportsEvent] {
    events.values().toArray().sort();
  };

  public query ({ caller }) func getEventsByStatus(status : Status) : async [SportsEvent] {
    let filtered = events.values().toArray().filter(
      func(e) { e.status == status }
    );
    filtered.sort();
  };

  public query ({ caller }) func getAllAthletes() : async [Athlete] {
    athletes.values().toArray().sort();
  };

  public query ({ caller }) func getAllNews() : async [NewsHighlight] {
    newsItems.values().toArray().sort();
  };

  public query ({ caller }) func getAllSportsCategories() : async [SportsCategory] {
    sportsCategories.values().toArray().sort();
  };

  public query ({ caller }) func getAllData() : async {
    events : [SportsEvent];
    athletes : [Athlete];
    news : [NewsHighlight];
    sportsCategories : [SportsCategory];
  } {
    {
      events = events.values().toArray().sort();
      athletes = athletes.values().toArray().sort();
      news = newsItems.values().toArray().sort();
      sportsCategories = sportsCategories.values().toArray().sort();
    };
  };
};
