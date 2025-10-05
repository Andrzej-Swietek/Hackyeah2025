import { FC, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    ProjectControllerApiFactory,
    ProjectRequest,
    ProjectRequestTripTypeEnum,
    Tag,
    TagControllerApiFactory
} from '@/api';
import {useUserProfile} from "@context/UserProfileProvider.tsx";

interface CreateProjectModalProps {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

export const CreateProjectModal: FC<CreateProjectModalProps> = ({ open, onClose, onCreated }) => {
    const { profile } = useUserProfile();
    const queryClient = useQueryClient();

    const tripTypes = Object.values(ProjectRequestTripTypeEnum);
    const randomTripType = tripTypes[Math.floor(Math.random() * tripTypes.length)];

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [numberOfTravelers, setNumberOfTravelers] = useState<number>(1);
    const [tripType, setTripType] = useState<ProjectRequestTripTypeEnum>(randomTripType);
    const [numberOfEatingBreaks, setNumberOfEatingBreaks] = useState<number>(1);
    const [intensivenessLevel, setIntensivenessLevel] = useState<number>(1);
    const [activeHoursStart, setActiveHoursStart] = useState<string>('08:00');
    const [activeHoursEnd, setActiveHoursEnd] = useState<string>('20:00');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    const { data: tags } = useQuery<Tag[]>({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await TagControllerApiFactory().getAllTags();
            return res.data || [];
        },
    });

    const createProjectMutation = useMutation({
        mutationFn: async () => {
            const req: ProjectRequest = {
                name,
                description,
                numberOfTravelers,
                tripType,
                numberOfEatingBreaks,
                intensivenessLevel,
                activeHours: { startHour: activeHoursStart, endHour: activeHoursEnd },
                tagIds: selectedTagIds,
                participants: [profile?.id]
            };
            const res = await ProjectControllerApiFactory().createProject(req);
            return res.data;
        },
        onSuccess: (data) => {
            const newProjectId = data?.id;
            onCreated?.(newProjectId);
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !description) return;
        createProjectMutation.mutate();
    };

    const isSubmitDisabled = !name || !description || createProjectMutation.isLoading;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Name */}
                    <div className="grid gap-1">
                        <Label htmlFor="name">Project Name *</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="grid gap-1">
                        <Label htmlFor="description">Description *</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Number of Travelers */}
                    <div className="grid gap-1">
                        <Label htmlFor="travelers">Number of Travelers</Label>
                        <Input
                            id="travelers"
                            type="number"
                            min={1}
                            value={numberOfTravelers}
                            onChange={(e) => setNumberOfTravelers(Number(e.target.value))}
                        />
                    </div>

                    {/* Trip Type */}
                    <div className="grid gap-1">
                        <Label htmlFor="tripType">Trip Type</Label>
                        <Select value={tripType} onValueChange={(v) => setTripType(v as ProjectRequestTripTypeEnum)}>
                            <SelectTrigger id="tripType">
                                <SelectValue placeholder="Select trip type" />
                            </SelectTrigger>
                            <SelectContent>
                                {tripTypes.map(value => (
                                    <SelectItem key={value} value={value}>{value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Number of Eating Breaks */}
                    <div className="grid gap-1">
                        <Label htmlFor="eatingBreaks">Number of Eating Breaks</Label>
                        <Input
                            id="eatingBreaks"
                            type="number"
                            min={0}
                            value={numberOfEatingBreaks}
                            onChange={(e) => setNumberOfEatingBreaks(Number(e.target.value))}
                        />
                    </div>

                    {/* Intensiveness Level */}
                    <div className="grid gap-1">
                        <Label htmlFor="intensiveness">Intensiveness Level</Label>
                        <Input
                            id="intensiveness"
                            type="number"
                            min={1}
                            max={10}
                            value={intensivenessLevel}
                            onChange={(e) => setIntensivenessLevel(Number(e.target.value))}
                        />
                    </div>

                    {/* Active Hours */}
                    <div className="grid gap-1">
                        <Label>Active Hours</Label>
                        <div className="flex gap-2">
                            <Input
                                type="time"
                                value={activeHoursStart}
                                onChange={(e) => setActiveHoursStart(e.target.value)}
                            />
                            <span className="flex items-center px-1">to</span>
                            <Input
                                type="time"
                                value={activeHoursEnd}
                                onChange={(e) => setActiveHoursEnd(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tags as Chips */}
                    <div className="grid gap-1">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2">
                            {tags?.map(tag => {
                                const isSelected = selectedTagIds.includes(tag.id);
                                return (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => {
                                            if (isSelected) setSelectedTagIds(prev => prev.filter(id => id !== tag.id));
                                            else setSelectedTagIds(prev => [...prev, tag.id]);
                                        }}
                                        className={`px-3 py-1 rounded-full border transition-colors ${
                                            isSelected
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-muted text-foreground border-border hover:bg-primary/20'
                                        }`}
                                    >
                                        {tag.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </form>

                <DialogFooter className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
                        {createProjectMutation.isLoading ? 'Creating...' : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
