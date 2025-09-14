<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\LostItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LostItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->only([
            'create', 'store', 'edit', 'update', 'destroy',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $lostItems = LostItem::all();
        return response()->json($lostItems);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $categories = Category::all(["id", "category_name"]);
        return Inertia::render('lost-items/create', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);

        $validate = $request->validate([
            'item_name'          => 'required|string|max:255',
            'category_id'        => 'required|exists:categories,id',
            'description'        => 'nullable|string',
            'last_seen_location' => 'nullable|string',
            'date_lost'          => 'required|date',
            'contact_info'       => 'required|string',
            'photo'              => 'nullable|image|max:2048',
        ]);

        $imageUrl = null;

        if ($request->hasFile('photo')) {
            $imagePath = $request->file('photo')->store('lost_items', 'public');
            $imageUrl  = asset('storage/' . $imagePath);
        }

        $lostItem = LostItem::create([
            'user_id'            => auth()->id(),
            'item_name'          => $request->item_name,
            'category_id'        => $request->category_id,
            'description'        => $request->description,
            'last_seen_location' => $request->last_seen_location,
            'date_lost'          => $request->date_lost,
            'contact_info'       => $request->contact_info,
            'photo_url'          => $imageUrl,
        ]);

        return redirect()->route('home')->with('success', 'Lost item reported successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(LostItem $lostItem)
    {
        //
        return response()->json($lostItem);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LostItem $lostItem)
    {
        //
        return view('lost-items.edit', compact('lostItem'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LostItem $lostItem)
    {
        //
        $validated = $request->validate([
            'item_name'           => 'required|string|max:255',
            'category'            => 'required|string',
            'description'         => 'nullable|string',
            'last_seen_location'  => 'nullable|string',
            'date_lost'           => 'required|date',
            'contact_information' => 'required|string',
            'photo'               => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('lost_items', 'public');
        }

        $lostItem->update($validated);

        return response()->json($lostItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LostItem $lostItem)
    {
        //
        $lostItem->delete();
        return response()->json(null, 204);
    }
}
