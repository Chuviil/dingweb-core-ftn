export class AnalyzeEventDto {
    title: string;
    description: string;
    locationLat: number;
    locationLon: number;
    tags: string[];


    constructor(title: string, description: string, locationLat: number, locationLon: number, tags: string[]) {
        this.title = title;
        this.description = description;
        this.locationLat = locationLat;
        this.locationLon = locationLon;
        this.tags = tags;
    }
}