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
            //pls help
            // 'image_path' => Str::isUrl($this->image_path) ? $this->image_path : Storage::url($this->image_path),
            'image_path' => $this->image_path
                //collect all images
                ? collect(explode(',', $this->image_path))
                // check if it's a url or a file from server
                ->map(fn($path) => Str::isUrl($path) ? $path : Storage::url("projects/{$this->id}/{$path}"))
                ->toArray()
                // no image aaaa
                : null,
            //time
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            //
            'status' => $this->status,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
