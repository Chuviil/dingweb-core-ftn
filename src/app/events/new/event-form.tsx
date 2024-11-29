"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Textarea} from "@/components/ui/textarea";
import newEventDto from "@/models/new_event.dto";
import {createEvent, getEventSimilarity} from "@/controllers/events.controller";
import {APIProvider, Map, Marker} from "@vis.gl/react-google-maps";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon, Check, ChevronsUpDown} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {User} from "@/models/user";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {AnalyzedEvent} from "@/models/analyzed-event";

export function NewEventForm({users}: { users: User[] }) {

    const form = useForm<z.infer<typeof newEventDto>>({
        resolver: zodResolver(newEventDto),
        defaultValues: {
            date: new Date(),
            tags: []
        },
    })

    const [marketLocation, setMarketLocation] = useState<{ lat: number, lng: number }>({
        lat: -0.16259808795660025,
        lng: -78.45934828532707
    });

    const [mostSimilarEvent, setMostSimilarEvent] = useState<AnalyzedEvent | null>(null);

    const onClickAnalyze = async () => {
        if (!form.getValues('title') || !form.getValues('description') || !form.getValues('locationLat') || !form.getValues('locationLon')) {
            alert('Please fill in all required fields.');
            return;
        }

        setMostSimilarEvent(null);

        const mostSimilarEvent = await getEventSimilarity({
            title: form.getValues('title'),
            description: form.getValues('description'),
            locationLat: form.getValues('locationLat'),
            locationLon: form.getValues('locationLon'),
            tags: form.getValues('tags')
        });
        setMostSimilarEvent(mostSimilarEvent);
        if (!mostSimilarEvent) {
            alert("No similar event found, your odds of success are high!");
        }
    }

    return (
        <div className="max-w-screen-lg mx-auto py-8 px-4 space-y-8">
            <Card className="border border-gray-300 shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Create Event</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        Start by filling out the form below to create a new event.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(createEvent)}>
                        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Event title"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Event description"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Location Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="E.g., Conference Center"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="locationLat"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Exact Location</FormLabel>
                                        <FormControl>
                                            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
                                                <Map
                                                    style={{width: "100%", height: "200px"}}
                                                    defaultCenter={{
                                                        lat: marketLocation.lat,
                                                        lng: marketLocation.lng,
                                                    }}
                                                    defaultZoom={15}
                                                    onClick={(ev) => {
                                                        const lat = ev.detail.latLng?.lat || 0;
                                                        const lng = ev.detail.latLng?.lng || 0;
                                                        setMarketLocation({lat, lng});
                                                        form.setValue("locationLat", lat);
                                                        form.setValue("locationLon", lng);
                                                    }}
                                                >
                                                    <Marker position={marketLocation}/>
                                                </Map>
                                            </APIProvider>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full text-left pl-3 font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? format(field.value, "PPP")
                                                            : "Select a date"}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Comma-separated tags (e.g., tech, innovation)"
                                                onChange={(e) => {
                                                    const tags = e.target.value.split(",").map((tag) => tag.trim());
                                                    form.setValue("tags", tags);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="organizerId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Organizer</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="w-full justify-between"
                                                    >
                                                        {field.value
                                                            ? users.find((user) => user.id === field.value)?.name
                                                            : "Select organizer"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Command>
                                                    <CommandInput placeholder="Search organizer..."/>
                                                    <CommandList>
                                                        <CommandEmpty>No organizers found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {users.map((user) => (
                                                                <CommandItem
                                                                    key={user.id}
                                                                    value={user.name}
                                                                    onSelect={() => field.onChange(user.id)}
                                                                >
                                                                    {user.name}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            user.id === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-4">
                            <Button variant="outline">Cancel</Button>
                            <Button type="submit">Create</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            <Card className="border border-gray-300 shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800">Analyze Event</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        Discover the most similar event and its popularity.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {mostSimilarEvent ? (
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-md font-semibold text-gray-700">Most Similar Event</h3>
                                <p className="text-sm text-gray-600">
                                    <span
                                        className="font-semibold">Title:</span> {mostSimilarEvent.mostSimilarEvent.title}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Description:</span>{" "}
                                    {mostSimilarEvent.mostSimilarEvent.description}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Date:</span>{" "}
                                    {new Date(mostSimilarEvent.mostSimilarEvent.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Location:</span>{" "}
                                    {mostSimilarEvent.mostSimilarEvent.location}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold text-gray-700">Tags</h3>
                                <ul className="flex flex-wrap gap-2">
                                    {mostSimilarEvent.mostSimilarEvent.tags.map((tag) => (
                                        <li
                                            key={tag.id}
                                            className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-md"
                                        >
                                            {tag.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold text-gray-700">Similarity Score</h3>
                                <p className="text-sm text-gray-600">
                                    {(mostSimilarEvent.similarityScore * 100).toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">No similar event found. Click analyze to start.</p>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={onClickAnalyze}>
                        Analyze
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
