export class Registration {
    id: number;
    userId: number;
    eventId: number;
    activityId: number;
    createdAt: Date;


    constructor(id: number, userId: number, eventId: number, activityId: number, createdAt: Date) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.activityId = activityId;
        this.createdAt = createdAt;
    }
}
