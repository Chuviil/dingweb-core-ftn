import React from 'react';
import ActivitiesTable from './activities-table';
import { getActivitiesByEventId } from "@/controllers/activities.controller";

type Params = Promise<{eventid: string}>

const ActivitiesPage = async ({params}: { params: Params }) => {
    const {eventid} = await params;
    const activities = await getActivitiesByEventId(eventid);

    return (
        <div className="container mx-auto py-8">
            <ActivitiesTable activities={activities} eventId={eventid} />
        </div>
    );
};

export default ActivitiesPage;