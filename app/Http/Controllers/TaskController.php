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
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $tasks = Task::query()->get();
        $tasks = Task::with(['assignedUser', 'createdBy', 'updatedBy', 'project'])->get();

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            "isMyTasks" => false,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $projectId = $request->query('project_id');
        $projects = Project::with(['tasks', 'createdBy', 'updatedBy'])->select('id', 'name')->orderBy('name', 'asc')->get();
        $users = User::select('id', 'name')->orderBy('name', 'asc')->get();

        return inertia("Task/Create", [
            'projects' => $projects,
            'projectId' => $projectId,
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        $newTask = Task::create(Arr::except($data, ["image_path"]));

        if ($request->hasFile('image')) {
            $imagePaths = [];
            foreach ($request->file('image') as $index => $file) {
                $filename = $file->hashName();
                Storage::disk('public')->putFileAs('task/' . $newTask->id, $file, $filename);
                $imagePaths[] = $filename;
            }
            //it should be image_filenames but whatever
            $newTask->image_path = implode(',', $imagePaths);
            $newTask->save();
        }

        return to_route("task.index")->with("success", "Task was created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load(['assignedUser', 'createdBy', 'updatedBy', 'project']);
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $task->load(['assignedUser', 'createdBy', 'updatedBy', 'project']);
        $projects = Project::with(['tasks', 'createdBy', 'updatedBy'])->orderBy('name', 'asc')->get();
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

        $task->update(Arr::except($data, ['image_path']));

        if ($request->hasFile('image')) {
            // Delete existing images
            $imageFolder = 'task/' . $task->id;
            if (Storage::disk('public')->exists($imageFolder)) {
                Storage::disk('public')->deleteDirectory($imageFolder);
            }

            $imagePaths = [];
            foreach ($request->file('image') as $index => $file) {
                $name = $file->hashName();
                Storage::disk('public')->putFileAs($imageFolder, $file, $name);
                $imagePaths[] = $name;
            }
            $task->image_path = implode(',', $imagePaths);
            $task->save();
        }

        return to_route("task.index")->with("success", "Task \"$task->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $taskID = $task->id;

        try {
            $task->delete();
        } catch (\Throwable $th) {
            return to_route("task.index")->with("error", "Failed to delete task \"$name\": {$th->getMessage()}");
        }

        $imageFolder = 'task/' . $taskID;
        if (Storage::exists($imageFolder)) {
            Storage::deleteDirectory($imageFolder);
        }

        return to_route("task.index")->with("success", "Task \"$name\" was deleted");
    }

    public function myTasks()
    {
        $user = Auth::user();
        // $tasks = Task::query()->where('assigned_user_id', $user->id)->get();
        $tasks = Task::with(['project', 'assignedUser', 'createdBy', 'updatedBy'])
            ->where('assigned_user_id', $user->id)
            ->get();

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            "isMyTasks" => true,
        ])->with("success", "You have tasks");
    }
}
