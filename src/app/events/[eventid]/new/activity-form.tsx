"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Textarea} from "@/components/ui/textarea";
import newActivityDto from "@/models/new_activity.dto";
import {createActivity} from "@/controllers/activities.controller";

export function NewActivityForm({event_id}: { event_id: string }) {

    const form = useForm<z.infer<typeof newActivityDto>>({
        resolver: zodResolver(newActivityDto),
        defaultValues: {
            event_id: event_id
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(createActivity)}>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Create activity</CardTitle>
                        <CardDescription>Create your new activity in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
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
                                            placeholder="Tell us a little bit about your activity"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="start_date"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <Input {...field} type={"datetime-local"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="end_date"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                        <Input {...field} type={"datetime-local"}/>
                                    </FormControl>
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
