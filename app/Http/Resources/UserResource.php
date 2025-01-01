<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserResource extends JsonResource
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
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            // "avatar" => $this->avatar,
            "avatar" => $this->formatImagePaths($this->avatar),
            'roles' => $this->roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                ];
            }),
            'permissions' => $this->permissions->map(function ($permission) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                ];
            }),
            'created_at' => $this->formatDate($this->created_at),
            'updated_at' => $this->formatDate($this->updated_at),
        ];
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
            ->map(fn($path) => Str::isUrl($path) ? $path : Storage::url("avatars/{$path}"))
            ->toArray();
    }
}
