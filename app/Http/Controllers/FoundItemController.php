<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\FoundItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FoundItemController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth")->only(['create', 'store', 'edit', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $categories = Category::all(['id', 'category_name']);
        return Inertia::render("found-items/create", ["categories" => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);

        $validate = $request->validate([
            'item_name'    => 'required|string|max:255',
            'category_id'  => 'required|exists:categories,id',
            'description'  => 'nullable|string',
            'where_found'  => 'nullable|string',
            'date_found'   => 'required|date',
            'contact_info' => 'required|string',
            'photo'        => 'nullable|image|max:2048',

        ]);

        $imageUrl = null;

        if ($request->hasFile('photo')) {
            $imagePath = $request->file('photo')->store('found_items', 'public');
            $imageUrl  = asset('storage/' . $imagePath);
        }

        $foundItem = FoundItem::create(['user_id' => auth()->id(),
            'item_name'                               => $request->item_name,
            'category_id'                             => $request->category_id,
            'description'                             => $request->description,
            'where_found'                             => $request->where_found,
            'date_found'                              => $request->date_found,
            'contact_info'                            => $request->contact_info,
            'photo_url'                               => $imageUrl,
        ]);

        return redirect()->route('home')->with('success', 'Lost item reported successfully.');

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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
