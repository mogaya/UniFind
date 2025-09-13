<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LostItem extends Model
{
    use HasFactory;

    protected $fillable = [ 
        'item_name',
        'description',
        'last_seen_location',
        'date_lost',
        'contact_info',
        'photo_url',
        'status',
        'user_id',
        'category_id',];

        public function user(){return $this->belongsTo(User::class);}

        public function category(){return $this->belongsTo(Category::class);}

        public function claims(){return $this->hasMany(Claim::class);}
}
