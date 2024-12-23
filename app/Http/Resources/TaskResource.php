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
            // similar to what I did on ProjectResource
            // 'image_path' => Str::isUrl($this->image_path) ? $this->image_path : Storage::url($this->image_path),
            'image_path' => $this->image_path
                //collect all images
                ? collect(explode(',', $this->image_path))
                // check if it's a url or a file from server
                ->map(fn($path) => Str::isUrl($path) ? $path : Storage::url("task/{$this->id}/{$path}"))
                ->toArray()
                // handle no image
                : null,
            //time
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            //project
            'status' => $this->status,
            'priority' => $this->priority,
            'project' => new ProjectResource($this->project),
            //user
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
