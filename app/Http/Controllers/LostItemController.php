<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\LostItem;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LostItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->only([
            'create', 'store', 'edit', 'update', 'destroy', 'show',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $lostItems = DB::table('lost_items')->join('categories', 'lost_items.category_id', '=', 'categories.id')->select(
            'lost_items.id',
            'lost_items.item_name',
            'categories.category_name as category_name',
            'lost_items.description',
            'lost_items.last_seen_location',
            'lost_items.date_lost',
            'lost_items.photo_url',
        )->get();

        $categories = Category::all(['id', 'category_name']);
        return Inertia::render('lost-items/index', ['lostItems' => $lostItems, 'categories' => $categories,
        ]);

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
        // dd($request->all(), $request->file('photo'));

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

        return redirect()->route('home.index')->with('success', 'Lost item reported successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $lostItem
        = DB::table('lost_items')
            ->join('categories', 'lost_items.category_id', '=', 'categories.id')->join('users', 'lost_items.user_id', '=', 'users.id')->select(
            'lost_items.id',
            'lost_items.user_id',
            'lost_items.item_name',
            'lost_items.description',
            'lost_items.last_seen_location',
            'lost_items.date_lost',
            'lost_items.photo_url',
            'lost_items.contact_info',
            'lost_items.status',
            'categories.category_name as category_name',
            'users.name as user_name',
            'users.email as user_email',
            'lost_items.created_at',
            'lost_items.updated_at'
        )
            ->where('lost_items.id', $id)
            ->first();

        if (! $lostItem) {
            abort(404, 'Item not found');
        }

        return Inertia::render('lost-items/show', ['item' => $lostItem]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $lostItem = LostItem::findOrFail($id);

        if ($lostItem->user_id !== auth()->id()) {abort(403, 'Unauthorised');}

        $categories = Category::all(['id', 'category_name']);

        return Inertia::render('lost-items/edit', ['categories' => $categories, 'lostItem' => $lostItem]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        // dd($request);
        // dd($request->all(), $request->file('photo'));

        $lostItem = LostItem::findOrFail($id);

        if ($lostItem->user_id !== auth()->id()) {abort(403, 'Unauthorized');}

        $validated = $request->validate([
            'item_name'          => 'required|string|max:255',
            'category_id'        => 'required|exists:categories,id',
            'description'        => 'nullable|string',
            'last_seen_location' => 'nullable|string|max:255',
            'date_lost'          => 'required|date',
            'contact_info'       => 'required|string|max:255',
            'photo'              => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $imagePath              = $request->file('photo')->store('lost_items', 'public');
            $validated['photo_url'] = asset('storage/' . $imagePath);
        }

        $lostItem->update($validated);

        return redirect()->route('lost-items.show', $lostItem->id)->with('success', 'Lost item updated successfully');
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
