<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'content' => 'required|string|max:2000',
        ]);

        $feature->comments()->create([
            'content' => $data['content'],
            'user_id' => Auth::id(),
        ]);

        return back()->with('success', 'Comment added successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature, Comment $comment)
    {
        if ($comment->feature_id !== $feature->id) {
            abort(404);
        }

        if ($comment->user_id !== Auth::id()) {
            abort(403);
        }

        $comment->delete();

        return back()->with('success', 'Comment deleted successfully.');
    }
}
