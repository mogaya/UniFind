<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FoundItem;
use App\Models\LostItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $lostItemsCount  = LostItem::count();
        $foundItemsCount = FoundItem::count();

        $resolvedCount = LostItem::where('status', 'resolved')->count();
        $claimedCount  = FoundItem::where('status', 'claimed')->count();

        // users data

        $users = User::withCount(['foundItems', 'lostItems'])->get();

        $userData = $users->map(function ($user) {
            return [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'role'       => $user->role,
                'found'      => $user->found_items_count,
                'lost'       => $user->lost_items_count,
                'created_at' => $user->created_at->toDateString(),
            ];
        });

        // lost_items data
        $lostItems = LostItem::with(['user:id,name,email', 'category:id,category_name'])->get();

        $lostItemsData = $lostItems->map(function ($lostItem) {
            return [
                'id'                 => $lostItem->id,
                'item_name'          => $lostItem->item_name,
                'category'           => $lostItem->category->category_name,
                'last_seen_location' => $lostItem->last_seen_location,
                'user_email'         => $lostItem->user->email ?? 'N/A',
                'user_name'          => $lostItem->user->name ?? 'N/A',
                'date'               => $lostItem->created_at->toDateString(),
                'time'               => $lostItem->created_at->format('h:i A'),
                'status'             => $lostItem->status,

            ];
        });

        // found_items data
        $foundItems = FoundItem::with(['user:id,name,email', 'category:id,category_name'])->get();

        $foundItemsData = $foundItems->map(function ($foundItem) {
            return [
                'id'          => $foundItem->id,
                'item_name'   => $foundItem->item_name,
                'category'    => $foundItem->category->category_name,
                'where_found' => $foundItem->where_found,
                'user_email'  => $foundItem->user->email ?? 'N/A',
                'user_name'   => $foundItem->user->name ?? 'N/A',
                'date'        => $foundItem->created_at->toDateString(),
                'time'        => $foundItem->created_at->format('h:i A'),
                'status'      => $foundItem->status,

            ];
        });

        return Inertia::render("admin-dashboard/index", [
            'lostItemsCount'  => $lostItemsCount,
            'foundItemsCount' => $foundItemsCount,
            'users'           => $userData,
            'lostItems'       => $lostItemsData,
            'foundItems'      => $foundItemsData,
            'resolvedCount'   => $resolvedCount,
            'claimedCount'    => $claimedCount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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

    public function destroyUser(Request $request, $id)
    {
        $admin = $request->user();

        if (! $admin->is_admin) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'password' => ['required', 'string'],
        ]);

        if (! Hash::check($request->password, $admin->password)) {
            return back()->withErrors(['password' => 'The provided password is incorrect.']);
        }

        $user = User::find($id);

        if (! $user) {
            return back()->withErrors(['message' => 'User not found.']);
        }

        if ($user->id === $admin->id || $user->is_admin) {
            return back()->withErrors(['message' => 'You cannot delete an admin account.']);
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }

}
