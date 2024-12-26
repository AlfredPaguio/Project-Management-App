<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            //details
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image_path' => $this->formatImagePaths($this->image_path),
            //time
            'created_at' => $this->formatDate($this->created_at),
            'updated_at' => $this->formatDate($this->updated_at),
            'due_date' => $this->formatDate($this->due_date),
            //project
            'status' => $this->status,
            'priority' => $this->priority,
            'project' => $this->whenLoaded('project', fn() => new ProjectResource($this->project)),
            //user
            'assignedUser' => $this->whenLoaded('assignedUser', fn() => new UserResource($this->assignedUser)),
            'createdBy' => $this->whenLoaded('createdBy', fn() => new UserResource($this->createdBy)),
            'updatedBy' => $this->whenLoaded('updatedBy', fn() => new UserResource($this->updatedBy)),
        ];
    }

    /**
     * Format image paths.
     *
     * @param string|null $imagePaths
     * @return array|null
     */
    private function formatImagePaths(?string $imagePaths): ?array
    {
        if (!$imagePaths) {
            return null;
        }

        //collect all images
        return collect(explode(',', $imagePaths))
            // check if it's a url or a file from server
            ->map(fn($path) => Str::isUrl($path) ? $path : Storage::url("task/{$this->id}/{$path}"))
            ->toArray();
    }

    /**
     * Format dates.
     *
     * @param string|null $date
     * @return string|null
     */
    private function formatDate(?string $date): ?string
    {
        if (!$date) {
            return null;
        }

        return Carbon::parse($date)->format('Y-m-d');
    }
}
