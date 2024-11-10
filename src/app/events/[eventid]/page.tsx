import React from 'react';
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {getActivitiesByEventId} from "@/controllers/activities.controller";

const ActivitiesPage = async ({params}: { params: { eventid: string } }) => {
    const activities = await getActivitiesByEventId(params.eventid);
    return (
        <div>
            <Link href={`/events/${params.eventid}/new`} className={buttonVariants({variant: "default"})}>New
                Activity</Link>
            {JSON.stringify(activities)}
        </div>
    );
};

export default ActivitiesPage;