<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    private const MAX_IMAGE_SIZE = 4; //In MegaBytes
    private const ACCEPTED_IMAGE_TYPES = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2'],
            'image' => [
                'nullable',
                'array',
                function ($attribute, $value, $fail) {
                    foreach ($value as $file) {
                        // Check file size
                        if ($file->getSize() / (1024 * 1024) > self::MAX_IMAGE_SIZE) {
                            $fail("The $attribute exceeds the maximum size of " . self::MAX_IMAGE_SIZE . "MB.");
                        }

                        // Check file type
                        if (!in_array($file->getMimeType(), self::ACCEPTED_IMAGE_TYPES)) {
                            $fail("The $attribute must be a file of type: " . implode(', ', self::ACCEPTED_IMAGE_TYPES) . ".");
                        }
                    }
                },
            ],
            'status' => ['required', Rule::in(['pending', 'in_progress', 'completed', 'cancelled'])],
            'description' => ['nullable', 'string', 'min:2'],
            'due_date' => ['nullable', 'date'],
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'The name is required.',
            'name.min' => 'The name must be at least 2 characters.',
            'status.required' => 'The status is required.',
            'status.in' => 'The selected status is invalid.',
            'description.string' => 'The description must be a string.',
            'description.min' => 'The description must be at least 2 characters.',
            'due_date.date' => 'The due date is not a valid date.',
        ];
    }
}
