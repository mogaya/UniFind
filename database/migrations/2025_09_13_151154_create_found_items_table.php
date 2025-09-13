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
        Schema::create('found_items', function (Blueprint $table) {
            $table->id();
            $table->string('item_name');
            $table->text('description')->nullable();
            $table->string('where_found')->nullable();
            $table->date('date_found');
            $table->string('contact_info');
            $table->string('photo_url')->nullable();
            $table->enum('status', ['unclaimed', 'claimed', 'returned'])->default('unclaimed');

            // "unclaimed" → reported but not yet claimed
            // "claimed" → someone has claimed it
            // "returned" → item given back to rightful owner

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
        Schema::dropIfExists('found_items');
    }
};
