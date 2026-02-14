<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Upvote;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\HomePostResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentUserId = Auth::id();
        $paginatedPosts = Post::query()
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
        return Inertia::render('posts/index', [
            'posts' => Inertia::scroll(HomePostResource::collection($paginatedPosts)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        Post::create($data);
        return to_route('posts.index')->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->upvotes_count = Upvote::where('post_id', $post->id)
            ->sum(DB::raw('CASE WHEN upvote THEN 1 ELSE -1 END'));

        $currentUserId = Auth::id();
        $post->user_has_upvoted = Upvote::where('post_id', $post->id)
            ->where('user_id', $currentUserId)
            ->where('upvote', true)
            ->exists();

        $post->user_has_downvoted = Upvote::where('post_id', $post->id)
            ->where('user_id', $currentUserId)
            ->where('upvote', false)
            ->exists();

        $post->load('comments.user');
        

        $post->comments_count = $post->comments()->count();

        return Inertia::render('posts/show', [
            'post' => new PostResource($post),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('posts/edit', [
            'post' => new PostResource($post),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, Post $post)
    {
        $data = $request->validated();
        $post->update($data);

        return to_route('posts.index')->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return to_route('posts.index')->with('success', 'Post deleted successfully.');
    }
}