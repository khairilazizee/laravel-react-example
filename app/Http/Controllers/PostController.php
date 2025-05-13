<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('posts/index', [
            'posts' => Post::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('posts/create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'title' => 'required|string|max:255',
            'post' => 'required|string',
            'image' => 'required|mimes:pdf'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = Storage::disk('public')->put('posts', $request->file('image'));
        }

        Post::create([
            'title' => $request->title,
            'post' => $request->post,
            'image' => $imagePath
        ]);
        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $post = Post::find($id);
        return Inertia::render('posts/edit', [
            'post' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'post' => 'required|string',
        ]);
        $post = Post::find($id);
        $post->update([
            'title' => $request->title,
            'post' => $request->post,
        ]);

        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // dd($id);
        $post = Post::find($id);
        if ($post) {
            $post->delete();
        }

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }
}
