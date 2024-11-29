import {Event} from "@/models/event";

export class AnalyzedEvent {
    mostSimilarEvent: Event;
    similarityScore: number;


    constructor(mostSimilarEvent: Event, similarityScore: number) {
        this.mostSimilarEvent = mostSimilarEvent;
        this.similarityScore = similarityScore;
    }
}