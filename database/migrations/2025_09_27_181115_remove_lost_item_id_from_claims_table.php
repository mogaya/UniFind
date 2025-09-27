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
        Schema::table('claims', function (Blueprint $table) {
            //
            $table->dropForeign(['lost_item_id']);

            $table->dropColumn('lost_item_id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('claims', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('lost_item_id')->nullable();

            $table->foreign('lost_item_id')->references('id')->on('lost_items')->onDelete('cascade');

        });
    }
};
