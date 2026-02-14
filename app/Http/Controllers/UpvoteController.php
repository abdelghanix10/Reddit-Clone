<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpvoteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Post $post)
    {
        $data = $request->validate([
            'upvote' => 'required|boolean',
        ]);

        $userId = Auth::id();
        $vote = $post->upvotes()->where('user_id', $userId)->first();

        if ($vote && $vote->upvote == $data['upvote']) {
            $vote->delete();
        } else {
            $post->upvotes()->updateOrCreate(
                ['user_id' => $userId],
                ['upvote' => $data['upvote']]
            );
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->upvotes()->where('user_id', Auth::id())->delete();

        return back();
    }
}