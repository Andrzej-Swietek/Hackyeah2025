import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Plus, Clock, MapPin, Trash2, GripVertical } from "lucide-react"

interface Activity {
    id: string
    time: string
    title: string
    location: string
    notes: string
}

interface Day {
    id: string
    date: string
    activities: Activity[]
}

export function DayPlanner() {
    const [days, setDays] = useState<Day[]>([
        {
            id: "1",
            date: "2024-03-15",
            activities: [],
        },
    ])
    const [activeDay, setActiveDay] = useState("1")

    const addDay = () => {
        const newDay: Day = {
            id: Date.now().toString(),
            date: "",
            activities: [],
        }
        setDays([...days, newDay])
        setActiveDay(newDay.id)
    }

    const addActivity = (dayId: string) => {
        const newActivity: Activity = {
            id: Date.now().toString(),
            time: "",
            title: "",
            location: "",
            notes: "",
        }
        setDays(days.map((day) => (day.id === dayId ? { ...day, activities: [...day.activities, newActivity] } : day)))
    }

    const updateActivity = (dayId: string, activityId: string, field: keyof Activity, value: string) => {
        setDays(
            days.map((day) =>
                day.id === dayId
                    ? {
                        ...day,
                        activities: day.activities.map((activity) =>
                            activity.id === activityId ? { ...activity, [field]: value } : activity,
                        ),
                    }
                    : day,
            ),
        )
    }

    const deleteActivity = (dayId: string, activityId: string) => {
        setDays(
            days.map((day) =>
                day.id === dayId ? { ...day, activities: day.activities.filter((a) => a.id !== activityId) } : day,
            ),
        )
    }

    const currentDay = days.find((d) => d.id === activeDay)

    return (
        <div className="flex h-full flex-col">
            {/* Day tabs */}
            <div className="flex items-center gap-2 border-b border-border bg-card px-6 py-4">
                <div className="flex flex-1 gap-2 overflow-x-auto">
                    {days.map((day, index) => (
                        <button
                            key={day.id}
                            onClick={() => setActiveDay(day.id)}
                            className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                activeDay === day.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                        >
                            Day {index + 1}
                        </button>
                    ))}
                </div>
                <Button onClick={addDay} size="sm" variant="outline" className="flex-shrink-0 bg-transparent">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Day
                </Button>
            </div>

            {/* Day content */}
            <div className="flex-1 overflow-y-auto p-6">
                {currentDay && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={currentDay.date}
                                onChange={(e) => {
                                    setDays(days.map((d) => (d.id === activeDay ? { ...d, date: e.target.value } : d)))
                                }}
                                className="max-w-xs"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-foreground">Activities</h3>
                                <Button onClick={() => addActivity(activeDay)} size="sm" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Activity
                                </Button>
                            </div>

                            {currentDay.activities.length === 0 ? (
                                <Card className="p-8 text-center">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                        <Clock className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        No activities yet. Add your first activity to start planning your day.
                                    </p>
                                </Card>
                            ) : (
                                <div className="space-y-4">
                                    {currentDay.activities.map((activity) => (
                                        <Card key={activity.id} className="p-4">
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <button className="mt-2 cursor-grab text-muted-foreground hover:text-foreground">
                                                        <GripVertical className="h-5 w-5" />
                                                    </button>
                                                    <div className="flex-1 space-y-4">
                                                        <div className="grid gap-4 sm:grid-cols-2">
                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">Time</Label>
                                                                <div className="relative">
                                                                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                                    <Input
                                                                        type="time"
                                                                        value={activity.time}
                                                                        onChange={(e) => updateActivity(activeDay, activity.id, "time", e.target.value)}
                                                                        className="pl-10"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">Activity</Label>
                                                                <Input
                                                                    placeholder="e.g., Visit Eiffel Tower"
                                                                    value={activity.title}
                                                                    onChange={(e) => updateActivity(activeDay, activity.id, "title", e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-xs text-muted-foreground">Location</Label>
                                                            <div className="relative">
                                                                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                                <Input
                                                                    placeholder="Enter location"
                                                                    value={activity.location}
                                                                    onChange={(e) => updateActivity(activeDay, activity.id, "location", e.target.value)}
                                                                    className="pl-10"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-xs text-muted-foreground">Notes</Label>
                                                            <Textarea
                                                                placeholder="Add any notes or details..."
                                                                value={activity.notes}
                                                                onChange={(e) => updateActivity(activeDay, activity.id, "notes", e.target.value)}
                                                                rows={2}
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => deleteActivity(activeDay, activity.id)}
                                                        className="text-muted-foreground hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}