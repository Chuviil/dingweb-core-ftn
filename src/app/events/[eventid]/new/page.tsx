import React from 'react';
import {NewActivityForm} from "@/app/events/[eventid]/new/activity-form";

const NewActivityPage = ({params}: { params: { eventid: string } }) => {
    return (
        <div className={"flex justify-center items-center h-screen"}>
            <NewActivityForm event_id={params.eventid}/>
        </div>
    );
};

export default NewActivityPage;