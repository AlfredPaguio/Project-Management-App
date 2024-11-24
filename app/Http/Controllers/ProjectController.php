<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::query()->get();

        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        $newProject = Project::create(Arr::except($data, ["image_path"]));

        if ($request->hasFile('image')) {
            $imagePaths = [];
            foreach ($request->file('image') as $index => $file) {
                $name = $file->hashName();
                Storage::disk('public')->putFileAs('projects/' . $newProject->id, $file, $name);
                // similar to
                // $imagePath = $file->store('project/'.$newProject->id, $name);
                $imagePaths[] = $name;
            }
            //it should be image_filenames but whatever
            $newProject->image_path = implode(',', $imagePaths);
            $newProject->save();
        }

        return to_route("project.index")->with("success", "Project was created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $tasks = $project->tasks()->orderBy('id', 'desc')->get();
        return inertia("Project/Show", [
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia("Project/Edit", [
            "project" => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $data["updated_by"] = Auth::id();

        $project->update(Arr::except($data, ['image_path']));

        if ($request->hasFile('image')) {
            // Delete existing images
            $imageFolder = 'projects/' . $project->id;
            if (Storage::disk('public')->exists($imageFolder)) {
                Storage::disk('public')->deleteDirectory($imageFolder);
            }

            $imagePaths = [];
            foreach ($request->file('image') as $index => $file) {
                $name = $file->hashName();
                Storage::disk('public')->putFileAs($imageFolder, $file, $name);
                $imagePaths[] = $name;
            }
            $project->image_path = implode(',', $imagePaths);
            $project->save();
        }

        return to_route("project.index")->with("success", "Project \"$project->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $projectID = $project->id;

        try {
            $project->tasks()->delete();
            $project->delete();
        } catch (\Throwable $th) {
            return to_route("project.index")->with("error", "Failed to delete project \"$name\": {$th->getMessage()}");
        }

        $imageFolder = 'projects/' . $projectID;
        if (Storage::exists($imageFolder)) {
            Storage::deleteDirectory($imageFolder);
        }

        return to_route("project.index")->with("success", "Project \"$name\" was deleted");
    }
}
