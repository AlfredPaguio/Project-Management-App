<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectResource extends JsonResource
{
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image_path' => $this->formatImagePaths($this->image_path),
            //time
            'created_at' => $this->formatDate($this->created_at),
            'updated_at' => $this->formatDate($this->updated_at),
            'due_date' => $this->formatDate($this->due_date),
            //
            'status' => $this->status,
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
            ->map(fn($path) => Str::isUrl($path) ? $path : Storage::url("projects/{$this->id}/{$path}"))
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
