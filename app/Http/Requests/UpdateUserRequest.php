<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                // 'lowercase',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->user),
            ],
            'password' => [
                'nullable',
                'confirmed',
                Password::min(8)->letters()->symbols(),
            ],
            'avatar' => [
                'nullable',
                'image',
                'max:1024',
            ],
            'roles' => [
                'array',
                'nullable',
                Rule::exists('roles', 'id'),
            ],
            'permissions' => [
                'array',
                'nullable',
                Rule::exists('permissions', 'id'),
            ],
        ];
    }

    public function messages()
    {
        return [
            'password.confirmed' => "Passwords don't match",
        ];
    }
}
