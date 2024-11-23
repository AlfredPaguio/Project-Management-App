<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Carbon\Carbon;


class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $recentProjects = Project::latest()->take(5)->get();
        $recentTasks = Task::latest()->where('assigned_user_id', $user->id)->take(5)->get();

        $projectCount = Project::count();
        $taskCount = Task::count();
        $userCount = User::count();
        $completedTaskCount = Task::where('status', 'completed')->count();

        $projectStatusCounts = Project::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->get();

        $taskStatusCounts = Task::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->get();

        //math
        // please help me :(

        $now = Carbon::now();
        $lastMonth = $now->subMonth();
        $lastWeek = $now->subWeek();

        $projectCountLastMonth = Project::where('created_at', '<', $lastMonth)->count();
        $projectCountChange = $projectCount - $projectCountLastMonth;

        $taskCountLastWeek = Task::where('created_at', '<', $lastWeek)->count();
        $taskCountChange = $taskCount - $taskCountLastWeek;

        $userCount = User::count();
        $userCountLastMonth = User::where('created_at', '<', $lastMonth)->count();
        $userCountChange = $userCount - $userCountLastMonth;

        $completedTaskCount = Task::where('status', 'completed')->count();
        $completedTaskCountLastMonth = Task::where('status', 'completed')
            ->where('updated_at', '<', $lastMonth)
            ->count();
        $completedTaskCountChange = $completedTaskCount > 0
            ? round(($completedTaskCount - $completedTaskCountLastMonth) / $completedTaskCount * 100)
            : 0;



        return inertia('Dashboard', [
            "dashboardData" => [
                'recentProjects' => ProjectResource::collection($recentProjects),
                'recentTasks' => TaskResource::collection($recentTasks),
                'projectCount' => $projectCount,
                'taskCount' => $taskCount,
                'userCount' => $userCount,
                'completedTaskCount' => $completedTaskCount,
                'projectStatusCounts' => $projectStatusCounts,
                'taskStatusCounts' => $taskStatusCounts,
                //changes
                'projectCountChange' => $projectCountChange,
                'taskCountChange' => $taskCountChange,
                'userCountChange' => $userCountChange,
                'completedTaskCountChange' => $completedTaskCountChange,
            ]
        ]);
    }
}
