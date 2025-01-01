<?php

namespace App\Models;

use Illuminate\Support\Str;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;

use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Support\Facades\Log;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getAvatar()
    {
        return Str::isUrl($this->avatar) ? $this->avatar : Storage::url("avatars/{$this->avatar}");
    }

    public function updateAvatar($file)
    {
        $avatarPath = 'avatars';
        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();

        try {
            $file->storeAs($avatarPath, $fileName, 'public');
        } catch (\Throwable $th) {
            Log::error("Failed to upload avatar: " . $th->getMessage());
            return false;
        }

        if ($this->avatar) {
            Storage::disk('public')->delete("$avatarPath/{$this->avatar}");
        }
        $this->update(['avatar' => $fileName]);
        return true;
    }
}
