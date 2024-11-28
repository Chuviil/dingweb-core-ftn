import {User} from "@/models/user";

export async function getUsers(): Promise<User[]> {
    const activities = await fetch(`${process.env.BACKEND_BASE_URL}/users`, {cache: "no-store"});
    const activitiesData = await activities.json() as User[];
    return activitiesData.map((activity: User) => ({
        ...activity,
        createdAt: new Date(activity.createdAt),
        updatedAt: new Date(activity.updatedAt),
    }));
}