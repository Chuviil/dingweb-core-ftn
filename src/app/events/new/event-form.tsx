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
import {createEvent} from "@/controllers/events.controller";
import {APIProvider, Map, Marker} from "@vis.gl/react-google-maps";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon, Check, ChevronsUpDown} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {User} from "@/models/user";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";

export function NewEventForm({users}: { users: User[] }) {

    const form = useForm<z.infer<typeof newEventDto>>({
        resolver: zodResolver(newEventDto),
        defaultValues: {
            date: new Date()
        },
    })

    const [marketLocation, setMarketLocation] = useState<{ lat: number, lng: number }>({
        lat: -0.16259808795660025,
        lng: -78.45934828532707
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(createEvent)}>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Create event</CardTitle>
                        <CardDescription>Create your new event in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                        <Textarea
                                            placeholder="Tell us a little bit about your event"
                                            {...field}
                                        />
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
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"locationLat"}
                            render={() => (
                                <FormItem>
                                    <FormLabel>Exact Location</FormLabel>
                                    <FormControl>
                                        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
                                            <Map
                                                style={{width: '100%', height: '200px'}}
                                                defaultCenter={{lat: -0.16259808795660025, lng: -78.45934828532707}}
                                                defaultZoom={15}
                                                gestureHandling={'greedy'}
                                                disableDefaultUI={true}
                                                mapId={'dingweb-core'}
                                                onClick={(ev) => {
                                                    setMarketLocation((prev) => ({
                                                        ...prev,
                                                        lat: ev.detail.latLng?.lat || 0,
                                                        lng: ev.detail.latLng?.lng || 0
                                                    }))
                                                    form.setValue('locationLat', ev.detail.latLng?.lat || 0)
                                                    form.setValue('locationLon', ev.detail.latLng?.lng || 0)
                                                }}
                                            >
                                                <Marker position={marketLocation}/>
                                            </Map>
                                        </APIProvider>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
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
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="ia, ml, nlp, festival, music, party"
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
                                <FormItem className="flex flex-col">
                                    <FormLabel>Language</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? users.find(
                                                            (user) => user.id === field.value
                                                        )?.name
                                                        : "Select user"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search language..."/>
                                                <CommandList>
                                                    <CommandEmpty>No language found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {users.map((user) => (
                                                            <CommandItem
                                                                value={user.name}
                                                                key={user.id}
                                                                onSelect={() => {
                                                                    form.setValue("organizerId", user.id)
                                                                }}
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
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button type={"submit"}>Create</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
