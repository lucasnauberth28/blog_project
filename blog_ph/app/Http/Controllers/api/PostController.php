<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('status', 'published')
            ->where('visibility', 'public')
            ->with(['author:id,name', 'tags:id,name,slug'])
            ->latest('published_at')
            ->paginate(10);

        return response()->json($posts);
    }

    public function show(Post $post)
    {
        if ($post->status !== 'published' || $post->visibility !== 'public') {
            abort(404);
        }

        $post->load(['author:id,name', 'tags']);
        return response()->json($post);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'summary' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . uniqid(),
            'body' => $validated['body'],
            'summary' => $validated['summary'] ?? null,
            'status' => 'draft',
        ]);

        if (!empty($validated['tags'])) {
            $post->tags()->sync($validated['tags']);
        }

        return response()->json($post, 201);
    }

    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Acesso não autorizado.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'summary' => 'nullable|string',
            'status' => 'sometimes|in:draft,published,archived',
            'tags' => 'nullable|array',
        ]);

        $post->update($validated);
        
        if ($request->has('tags')) {
            $post->tags()->sync($validated['tags']);
        }

        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Acesso não autorizado.'], 403);
        }
        
        $post->delete();

        return response()->json(null, 204);
    }
}