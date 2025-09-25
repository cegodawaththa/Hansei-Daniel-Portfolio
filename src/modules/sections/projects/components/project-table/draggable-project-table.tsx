"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import Image from "next/image";

import { CellAction } from "./cell-action";
import { useReorderProjects } from "../../queries/use-reorder-projects";

// Type that matches the API response
type ProjectItem = {
  id: string;
  name: string;
  description?: string | null;
  thumbnails?: string[] | null;
  projectType?: string | null;
  status?: "completed" | "ongoing" | "future" | null | undefined;
  location?: string | null;
  client?: string | null;
  projectValue?: string | null;
  orderIndex?: number | null;
  createdAt: string;
  updatedAt: string | null;
};

interface DraggableRowProps {
  project: ProjectItem;
}

function DraggableRow({ project }: DraggableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const thumbnail = project.thumbnails?.[0];

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`${
        isDragging ? "relative z-50" : ""
      } hover:bg-muted/50 border-b`}
    >
      <td className="w-12 p-2">
        <div
          className="flex items-center justify-center w-8 h-8 hover:bg-muted rounded cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center justify-center w-12 h-12 overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="Thumbnail"
              width={64}
              height={64}
              className="rounded-md object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
              No Image
            </div>
          )}
        </div>
      </td>
      <td className="p-4 font-medium">{project.name}</td>
      <td className="p-4 text-muted-foreground">
        {project.projectType || "Not specified"}
      </td>
      <td className="p-4 text-muted-foreground capitalize">
        {project.status || "Not specified"}
      </td>
      <td className="p-4 text-muted-foreground">
        {project.location || "Not specified"}
      </td>
      <td className="p-4 text-muted-foreground">
        {project.client || "Not specified"}
      </td>
      <td className="p-4">
        <CellAction data={project} />
      </td>
    </tr>
  );
}

interface DraggableProjectTableProps {
  data: ProjectItem[];
}

export function DraggableProjectTable({ data }: DraggableProjectTableProps) {
  const [items, setItems] = React.useState(data);
  const { mutate: reorderProjects, isPending } = useReorderProjects();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  // Update items when data changes
  React.useEffect(() => {
    setItems(data);
  }, [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update the order indices and send to server
        const reorderedItems = newItems.map((item, index) => ({
          id: item.id,
          orderIndex: index
        }));

        reorderProjects({ items: reorderedItems });

        return newItems;
      });
    }
  };

  return (
    <div className="relative">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="w-full overflow-x-auto">
          <div className="border rounded-lg overflow-hidden min-w-[800px]">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="w-12 p-2"></th>
                  <th className="text-left p-4 font-medium min-w-[80px]">
                    Thumbnail
                  </th>
                  <th className="text-left p-4 font-medium min-w-[200px]">
                    Project Name
                  </th>
                  <th className="text-left p-4 font-medium min-w-[120px]">
                    Type
                  </th>
                  <th className="text-left p-4 font-medium min-w-[100px]">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium min-w-[120px]">
                    Location
                  </th>
                  <th className="text-left p-4 font-medium min-w-[120px]">
                    Client
                  </th>
                  <th className="text-left p-4 font-medium min-w-[100px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <SortableContext
                  items={items}
                  strategy={verticalListSortingStrategy}
                >
                  {items.map((project) => (
                    <DraggableRow key={project.id} project={project} />
                  ))}
                </SortableContext>
              </tbody>
            </table>
          </div>
        </div>
      </DndContext>
      {isPending && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
          <div className="text-sm text-muted-foreground">Reordering...</div>
        </div>
      )}
    </div>
  );
}
