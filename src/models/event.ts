import {Activity} from "@/models/activity";
import {Tag} from "@/models/tag";
import {Registration} from "@/models/registration";
import {User} from "@/models/user";

export class Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    locationLat?: number;
    locationLon?: number;
    activities: Activity[];
    tags: Tag[];
    registrations: Registration[];
    organizer: User;
    createdAt: Date;
    updatedAt: Date;


    constructor(id: number, title: string, description: string, date: Date, location: string, activities: Activity[], tags: Tag[], registrations: Registration[], organizer: User, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.activities = activities;
        this.tags = tags;
        this.registrations = registrations;
        this.organizer = organizer;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
