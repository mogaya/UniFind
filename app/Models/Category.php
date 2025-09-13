<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['category_name',];

    public function lostItems(){return $this->hasMany(LostItem::class);}

    public function foundItems(){return $this->hasMany(FoundItem::class);}
}
