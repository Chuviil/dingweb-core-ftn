import {NewEventForm} from "@/app/events/new/event-form";
import {getUsers} from "@/controllers/users.controller";

const NewEventPage = async () => {
    const users = await getUsers();

    return (
        <div className={"flex justify-center items-center min-h-screen"}>
            <NewEventForm users={users}/>
        </div>
    );
};

export default NewEventPage;