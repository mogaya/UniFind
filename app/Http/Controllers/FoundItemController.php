<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\FoundItem;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $foundItems = FoundItem::with('category:id,category_name', 'user:id')->get();

        $foundItemsData = $foundItems->map(function ($foundItem) {
            return [
                'id'            => $foundItem->id,
                'user_id'       => $foundItem->user_id,
                'item_name'     => $foundItem->item_name,
                'description'   => $foundItem->description,
                'where_found'   => $foundItem->where_found,
                'date_found'    => $foundItem->date_found,
                'photo_url'     => $foundItem->photo_url,
                'category_name' => $foundItem->category->category_name,
            ];
        });

        $categories = Category::all(['id', 'category_name']);
        return Inertia::render('found-items/index', ['foundItems' => $foundItemsData
            , 'categories' => $categories,
        ]);
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

        return redirect()->route('home.index')->with('success', 'Lost item reported successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $foundItem = DB::table('found_items')
            ->join('categories', 'found_items.category_id', '=', 'categories.id')
            ->join('users', 'found_items.user_id', '=', 'users.id')
            ->select(
                'found_items.id',
                'found_items.user_id',
                'found_items.item_name',
                'found_items.description',
                'found_items.where_found',
                'found_items.date_found',
                'found_items.photo_url',
                'found_items.contact_info',
                'found_items.status',
                'categories.category_name as category_name',
                'users.name as user_name',
                'users.email as user_email',
                'found_items.created_at',
                'found_items.updated_at'
            )
            ->where('found_items.id', $id)
            ->first();

        if (! $foundItem) {
            abort(404, 'Item not found');
        }

        // check if logged in user has claimed this item
        $user          = Auth::user();
        $existingClaim = null;

        if ($user) {
            $existingClaim = DB::table('claims')
                ->where('found_item_id', $id)
                ->where('user_id', $user->id)
                ->first();
        }

        return Inertia::render('found-items/show', [
            'item'  => $foundItem,
            'claim' => $existingClaim,
            'auth'  => [
                'user' => $user,
            ],
        ]);

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
