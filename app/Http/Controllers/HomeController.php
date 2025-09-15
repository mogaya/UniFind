<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use function Termwind\render;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $recentFoundItems = DB::table('found_items')->join('categories', 'found_items.category_id', '=', 'categories.id')->select(
            'found_items.id',
            'found_items.item_name',
            'found_items.description',
            'found_items.where_found',
            'found_items.date_found',
            'found_items.photo_url',
            'categories.category_name as category_name'
        )->latest('found_items.date_found')->limit(6)->get();
        return Inertia::render("home/index", ['recentFoundItems' => $recentFoundItems]);
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
