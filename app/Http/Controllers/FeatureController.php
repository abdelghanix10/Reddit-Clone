<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Upvote;
use App\Models\Feature;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\FeatureRequest;
use App\Http\Resources\FeatureResource;
use App\Http\Resources\HomeFeatureResource;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentUserId = Auth::id();
        $paginatedFeatures = Feature::query()
            ->latest()
            ->with('user')
            ->withCount('comments as comments_count')
            ->withCount(['upvotes as upvotes_count' => function ($query) {
                $query->select(DB::raw('SUM(CASE WHEN upvote THEN 1 ELSE -1 END)'));
            }])
            ->withExists([
                'upvotes as user_has_upvoted' => function ($query) use ($currentUserId) {
                    $query->where('user_id', $currentUserId)->where('upvote', true);
                },
                'upvotes as user_has_downvoted' => function ($query) use ($currentUserId) {
                    $query->where('user_id', $currentUserId)->where('upvote', false);
                },
            ])
            ->paginate();
        return Inertia::render('features/index', [
            'features' => Inertia::scroll(HomeFeatureResource::collection($paginatedFeatures)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('features/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FeatureRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        Feature::create($data);
        return to_route('features.index')->with('success', 'Feature created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        $feature->upvotes_count = Upvote::where('feature_id', $feature->id)
            ->sum(DB::raw('CASE WHEN upvote THEN 1 ELSE -1 END'));

        $currentUserId = Auth::id();
        $feature->user_has_upvoted = Upvote::where('feature_id', $feature->id)
            ->where('user_id', $currentUserId)
            ->where('upvote', true)
            ->exists();

        $feature->user_has_downvoted = Upvote::where('feature_id', $feature->id)
            ->where('user_id', $currentUserId)
            ->where('upvote', false)
            ->exists();

        $feature->with('comments.user');

        $feature->comments_count = $feature->comments()->count();

        return Inertia::render('features/show', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('features/edit', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FeatureRequest $request, Feature $feature)
    {
        $data = $request->validated();
        $feature->update($data);

        return to_route('features.index')->with('success', 'Feature updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();

        return to_route('features.index')->with('success', 'Feature deleted successfully.');
    }
}