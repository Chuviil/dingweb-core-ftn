import {NewEventForm} from "@/app/events/new/event-form";
import {getUsers} from "@/controllers/users.controller";

const NewEventPage = async () => {
    const users = await getUsers();

    return (
            <NewEventForm users={users}/>
    );
};

export default NewEventPage;