<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "lost_item_id",
        "found_item_id",
        "status",
    ] ;

    public function user(){return $this->belongsTo(User::class);}

    public function lostItem(){return $this->belongsTo(LostItem::class);}

    public function foundItem(){return $this->belongsTo(FoundItem::class);}
}
