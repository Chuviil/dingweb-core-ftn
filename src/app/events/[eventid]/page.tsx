import React from 'react';
import ActivitiesTable from './activities-table';
import { getActivitiesByEventId } from "@/controllers/activities.controller";

const ActivitiesPage = async ({params}: { params: { eventid: string } }) => {
    const activities = await getActivitiesByEventId(params.eventid);

    return (
        <div className="container mx-auto py-8">
            <ActivitiesTable activities={activities} eventId={params.eventid} />
        </div>
    );
};

export default ActivitiesPage;