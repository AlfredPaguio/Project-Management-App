<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('tasks.manage') || $user->can('tasks.manage.own') || $user->can('tasks.view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task): bool
    {

        if ($user === null) {
            return false;
        }

        if ($user->can('tasks.view')) {
            return true;
        }

        // can view their own task
        // return $user->id === $task->assignedUser->id;
        return $this->isOwner($user, $task);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('tasks.manage');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task): bool
    {
        if ($user->can('tasks.manage')) {
            return true;
        }

        // if ($user->can('tasks.manage.own')) {
        //     return $user->id === $task->assignedUser->id;
        // }
        // return $user->id === $task->assignedUser->id;
        return $this->isOwner($user, $task);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task): bool
    {
        if ($user->can('tasks.manage')) {
            return true;
        }

        return $this->isOwner($user, $task);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Task $task): bool
    {
        if ($user->can('tasks.manage')) {
            return true;
        }

        return $this->isOwner($user, $task);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Task $task): bool
    {
        if ($user->can('tasks.manage')) {
            return true;
        }

        return $this->isOwner($user, $task);
    }

    /**
     * Check if the user is the owner of the task.
     */
    private function isOwner(User $user, Task $task): bool
    {
        return $user->id === $task->assignedUser->id;
    }
}
