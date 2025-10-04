import { FC, useEffect, useState } from "react";
import { DayPlanner } from "@routes/ProjectEditor/DayPlanner";
import { MapView } from "@routes/ProjectEditor/MapView";

interface ProjectEditorProps {}

export const ProjectEditor: FC<ProjectEditorProps> = () => {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const places = [
        { img_url: "https://overhere-media.s3.amazonaws.com/images/krakow_travel_guides.max-1280x768.jpg" },
        { img_url: "https://overhere-media.s3.amazonaws.com/images/krakow_travel_guides.max-1280x768.jpg" },
        { img_url: "https://overhere-media.s3.amazonaws.com/images/krakow_travel_guides.max-1280x768.jpg" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % places.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [places.length]);

    return (
        <div className="flex flex-col w-full min-h-[88vh]">
            <section className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        Plan Your Perfect Trip
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-white max-w-2xl">
                        Create day-by-day itineraries and share your adventures with friends
                    </p>
                </div>

                <div className="relative w-full h-full">
                    <div
                        className="flex h-full transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {places.map((place, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-full h-full bg-cover bg-center relative"
                                style={{ backgroundImage: `url(${place.img_url})` }}
                            >
                                <div className="absolute inset-0 bg-black/50" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="w-full mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DayPlanner selectedDay={selectedDay} onSelectDay={setSelectedDay} />
                <MapView selectedDay={selectedDay} />
            </div>
        </div>
    );
};
