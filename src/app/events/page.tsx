import {getEvents} from "@/controllers/events.controller";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import EventsCards from "@/app/events/events-cards";

const EventsPage = async () => {
    const events = await getEvents();

    return (
        <div className={"flex flex-col gap-3"}>
            <Link href={"/events/new"} className={buttonVariants({variant: "default"})}>
                Create new
            </Link>
            <div className={"flex gap-3 flex-wrap justify-center"}>
                <EventsCards events={events}/>
            </div>
        </div>
    );
};

export default EventsPage;