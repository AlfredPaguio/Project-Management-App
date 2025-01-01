<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with(['roles', 'permissions'])
            ->whereNot('id', Auth::user()->id)
            ->get();

        return inertia("User/Index", [
            "users" => UserResource::collection($users),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        $permissions = Permission::all();

        return inertia("User/Create", [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        $newUser = User::create($data);

        if ($request->hasFile('avatar')) {
            // $newUser->updateAvatar($request->file('avatar'));

            if (!$newUser->updateAvatar($request->file('avatar'))) {
                return back()->with('error', 'Failed to upload avatar.');
            }
        }

        $roles = Role::whereIn('id', $request->input('roles', []))->get();
        $permissions = Permission::whereIn('id', $request->input('permissions', []))->get();

        $newUser->syncRoles($roles);
        $newUser->syncPermissions($permissions);


        return to_route('user.index')
            ->with('success', 'User was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('roles', 'permissions');
        return inertia("User/Show", [
            "user" => new UserResource($user),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('roles', 'permissions');
        $roles = Role::all();
        $permissions = Permission::all();

        return inertia("User/Edit", [
            "user" => new UserResource($user),
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        if ($request->hasFile('avatar')) {
            // $user->updateAvatar($request->file('avatar'));

            if (!$user->updateAvatar($request->file('avatar'))) {
                return back()->with('error', 'Failed to upload avatar.');
            }
        }


        $roles = Role::whereIn('id', $request->input('roles', []))->get();
        $permissions = Permission::whereIn('id', $request->input('permissions', []))->get();

        $user->syncRoles($roles);
        $user->syncPermissions($permissions);

        return to_route("user.index")->with("success", "User \"$user->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;

        try {
            $user->delete();
        } catch (\Throwable $th) {
            return to_route("user.index")->with("error", "User \"$name\" not found \n \'$th\'");
        }

        return to_route("user.index")->with("success", "User \"$name\" was deleted");
    }
}
