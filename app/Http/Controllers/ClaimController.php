<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Claim;
use App\Models\FoundItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClaimController extends Controller
{
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        if (! Auth::check()) {
            return redirect()->route("login")->with("error", "You must be logged in to claim an item");
        }

        $request->validate(['found_item_id' => 'required|exists:found_items,id']);

        $userId    = Auth::id();
        $foundItem = FoundItem::findOrFail($request->found_item_id);

        if ($foundItem->status === 'claimed') {
            return back()->with('error', 'Item Already Claimed');
        }

        Claim::create([
            'user_id'       => $userId,
            'found_item_id' => $foundItem->id,
            'claim_status'  => 'pending',
        ]);

        $foundItem->update(['status' => 'claimed']);
        return back()->with('success', 'Item claimed successfully');
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
        if (! Auth::check()) {
            return redirect()->route('login')->with('error', 'You must be logged in to unclaim an item');
        }

        $userId = Auth::id();
        $claim  = Claim::findOrFail($id);

        if ($claim->user_id !== $userId) {return back()->with('error', 'you can not unclaim an item you did not claim');}

        $foundItem = $claim->foundItem;
        if ($foundItem) {
            $foundItem->update(['status' => 'unclaimed']);
        }

        $claim->delete();
        return back()->with('success', 'Item unclaimed successfully');
    }
}
