import {NewActivityForm} from "@/app/events/[eventid]/new/activity-form";

type Params = Promise<{eventid: string}>

const NewActivityPage = async ({params}: { params: Params}) => {
    const {eventid} = await params;

    return (
        <div className={"flex justify-center items-center h-screen"}>
            <NewActivityForm event_id={eventid}/>
        </div>
    );
};

export default NewActivityPage;