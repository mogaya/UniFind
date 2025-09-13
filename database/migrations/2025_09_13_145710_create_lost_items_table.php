<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lost_items', function (Blueprint $table) {
            $table->id();
            $table->string('item_name');
            $table->text('description')->nullable();
            $table->string('last_seen_location')->nullable();
            $table->date('date_lost');
            $table->string('contact_info');
            $table->string('photo_url')->nullable();
            $table->enum('status', ['pending', 'found', 'resolved'])->default('pending');

            // "pending" → still lost
            // "found" → matched with a found item
            // "resolved" → owner confirmed recovered

            // Foreign Keys
             $table->foreignId('user_id')->constrained()->onDelete('cascade');
             $table->foreignId('category_id')->constrained()->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lost_items');
    }
};
