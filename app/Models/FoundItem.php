<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoundItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'item_name',
        'description',
        'where_found',
        'date_found',
        'contact_info',
        'photo_url',
        'status',
    ];

    public function user()
    {return $this->belongsTo(User::class);}

    public function category()
    {return $this->belongsTo(Category::class);}

    public function claims()
    {return $this->hasMany(Claim::class);}
}
