"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {deleteEvent} from "@/controllers/events.controller";
import {Event} from "@/models/event";

const EventsCards = ({events}: {events: Event[]}) => {
    return (
        <>
            {events.map((event) => (
                <Card key={event.id} className={"w-[350px]"}>
                    <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>From: {event.start_date.toLocaleDateString('es-EC')} To: {event.end_date.toLocaleDateString('es-EC')}</p>
                    </CardContent>
                    <CardFooter className={"flex gap-3"}>
                        <Button variant={"destructive"} onClick={() => deleteEvent(event.id)}>Delete</Button>
                        <Button variant={"outline"}>Details</Button>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
};

export default EventsCards;