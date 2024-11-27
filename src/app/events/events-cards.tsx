"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button, buttonVariants} from "@/components/ui/button";
import {deleteEvent} from "@/controllers/events.controller";
import {Event} from "@/models/event";
import Link from "next/link";

const EventsCards = ({events}: { events: Event[] }) => {
    return (
        <>
            {events.map((event) => (
                <Card key={event.id} className={"w-[350px]"}>
                    <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Date: {event.date.toLocaleDateString('es-EC')}</p>
                    </CardContent>
                    <CardFooter className={"flex gap-3"}>
                        <Button variant={"destructive"} onClick={() => deleteEvent(event.id)}>Delete</Button>
                        <Link href={`/events/${event.id}`} className={buttonVariants({variant: "outline"})}>
                            Details
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
};

export default EventsCards;