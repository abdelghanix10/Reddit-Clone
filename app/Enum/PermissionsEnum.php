<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManagePosts = 'manage_posts';
    case ManageUsers = 'manage_users';
    case ManageComments = 'manage_comments';
    case UpvoteDownvote = 'upvote_downvote';
}