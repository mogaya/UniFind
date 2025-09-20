<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $lostReports = \DB::table("lost_items")->join("categories", "lost_items.category_id", "=", "categories.id")->select('lost_items.id',
            'lost_items.item_name',
            'categories.category_name as category_name',
            'lost_items.description',
            'lost_items.last_seen_location',
            'lost_items.date_lost',
            'lost_items.contact_info',
            'lost_items.photo_url',
            'lost_items.status',
            'lost_items.created_at',
        )->where('lost_items.user_id', auth()->id())->get();

        $foundReports = \DB::table("found_items")->join("categories", "found_items.category_id", "=", "categories.id")->select('found_items.id',
            'found_items.item_name',
            'categories.category_name as category_name',
            'found_items.description',
            'found_items.where_found',
            'found_items.date_found',
            'found_items.contact_info',
            'found_items.photo_url',
            'found_items.status',
            'found_items.created_at',
        )->where('found_items.user_id', auth()->id())->get();

        return Inertia::render("my-reports/index", ['lostReports' => $lostReports, 'foundReports' => $foundReports]);

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
}
