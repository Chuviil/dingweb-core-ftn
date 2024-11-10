export class Event {
    constructor(public id: number,
                public title: string,
                public description: string,
                public start_date: Date,
                public end_date: Date) {
    }
}
