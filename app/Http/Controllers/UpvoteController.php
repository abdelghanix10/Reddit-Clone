<?php

namespace App\Http\Controllers;

use App\Models\Upvote;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpvoteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'upvote' => 'required|boolean',
        ]);

        $userId = Auth::id();
        $vote = $feature->upvotes()->where('user_id', $userId)->first();

        if ($vote && $vote->upvote == $data['upvote']) {
            $vote->delete();
        } else {
            $feature->upvotes()->updateOrCreate(
                ['user_id' => $userId],
                ['upvote' => $data['upvote']]
            );
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->upvotes()->where('user_id', Auth::id())->delete();

        return back();
    }
}