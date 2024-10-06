<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::query()->get();

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::select('id', 'name')->orderBy('name', 'asc')->get();
        $users = User::select('id', 'name')->orderBy('name', 'asc')->get();

        return inertia("Task/Create", [
            'projects' => $projects,
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        dd($data, $request);
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        if ($request->hasFile('image')) {
            $imagePaths = [];
            foreach ($request->file('image') as $index => $file) {

                $imagePath = $file->store('task/' . Str::random(), 'public');
                $imagePaths[] = $imagePath;
            }
            $data['image_path'] = implode(',', $imagePaths);
        }

        Project::create($data);
        return to_route("task.index")->with("success", "Task was created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Edit", [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data["updated_by"] = Auth::id();
        if ($request->hasFile('image')) {
            $oldImageFolder = Str::between($task->image_path, 'task/', '/');
            if (Storage::disk('public')->exists("task/" . $oldImageFolder)) {
                Storage::disk('public')->deleteDirectory("task/" . $oldImageFolder);
            }

            $imagePaths = [];
            foreach ($request->file('image') as $index => $file) {
                $imagePath = $file->store('task/' . Str::random(), 'public');
                $imagePaths[] = $imagePath;
            }
            $data['image_path'] = implode(',', $imagePaths);
        }

        $task->update($data);
        return to_route("task.index")->with("success", "Task \"$task->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $image = $task->image_path;

        try {
            $task->tasks()->delete();
            $task->delete();
        } catch (\Throwable $th) {
            return to_route("task.index")->with("error", "Task \"$name\" not found \n \'$th\'");
        }

        $oldImageFolder = Str::between($image, 'task/', '/');
        if (Storage::disk('public')->exists("task/" . $oldImageFolder)) {
            Storage::disk('public')->deleteDirectory("task/" . $oldImageFolder);
        }

        return to_route("task.index")->with("success", "Task \"$name\" was deleted");
    }
}
