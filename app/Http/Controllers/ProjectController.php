<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
        // dd($data);

        if ($request->hasFile('image')) {
            $imagePaths = [];
            foreach ($request->file('image') as $index => $file) {

                $imagePath = $file->store('project/' . Str::random(), 'public');
                // $imagePath = $file->store('project/'.$data["name"], 'public');
                $imagePaths[] = $imagePath;
            }
            $data['image_path'] = implode(',', $imagePaths);
        }

        Project::create($data);
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
        if ($request->hasFile('image')) {
            // $oldImages = explode(',', $project->image_path);
            // foreach ($oldImages as $oldImagePath) {
            //     if (Storage::disk('public')->exists($oldImagePath)) {
            //         Storage::disk('public')->delete($oldImagePath);
            //     }
            // }

            // $oldImageFolder = 'project/' . Str::after($project->image_path, '/project/');

            // if (Storage::disk('public')->exists($oldImageFolder)) {
            //     Storage::disk('public')->deleteDirectory($oldImageFolder);
            // }

            $oldImageFolder = Str::between($project->image_path, 'project/', '/');
            if (Storage::disk('public')->exists("project/".$oldImageFolder)) {
                Storage::disk('public')->deleteDirectory("project/".$oldImageFolder);
            }

            $imagePaths = [];
            foreach ($request->file('image') as $index => $file) {
                $imagePath = $file->store('project/' . Str::random(), 'public');
                // $imagePath = $file->store('project/'.$data["name"], 'public');
                $imagePaths[] = $imagePath;
            }
            $data['image_path'] = implode(',', $imagePaths);
        }

        $project->update($data);
        return to_route("project.index")->with("success", "Project \"$project->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $image = $project->image_path;

        try {
            $project->tasks()->delete();
            $project->delete();
        } catch (\Throwable $th) {
            return to_route("project.index")->with("error", "Project \"$name\" not found \n \'$th\'");
        }


        // the above project is successfully deleted, so it's safe to delete those files
        // $oldImages = explode(',', $images);
        // foreach ($oldImages as $oldImagePath) {
        //     if (Storage::disk('public')->exists($oldImagePath)) {
        //         Storage::disk('public')->delete($oldImagePath);
        //     }
        // }

        $oldImageFolder = Str::between($image, 'project/', '/');
        if (Storage::disk('public')->exists("project/".$oldImageFolder)) {
            Storage::disk('public')->deleteDirectory("project/".$oldImageFolder);
        }

        return to_route("project.index")->with("success", "Project \"$name\" was deleted");
    }
}
