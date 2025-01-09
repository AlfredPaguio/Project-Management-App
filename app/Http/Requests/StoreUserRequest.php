<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:255"],
            // "email" => ["required", "string", "email", "unique:users,email"],
            "email" => [
                'required',
                'string',
                // 'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
                //ignore logged-in user's email address
                //https://laravel.com/docs/11.x/validation#rule-unique
            ],
            "password" => [
                "required",
                'confirmed',
                Password::min(8)->letters()->symbols(),
            ],
        ];
    }
}
