<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeatureRequest;
use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginatedFeatures = Feature::query()
            ->with('user')
            ->withCount(['comments', 'upvotes'])
            ->latest()
            ->orderBy('id', 'desc')
            ->paginate(10);
        return Inertia::render('features/index', [
            'features' => Inertia::scroll(FeatureResource::collection($paginatedFeatures)),
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
        $feature->load('user', 'comments.user', 'upvotes');
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