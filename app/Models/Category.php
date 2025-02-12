<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_name',
        'notes',
        'description'

    ];


    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public static function bulkDestroy(array $ids)
    {
        $validIds = self::whereIn('id', $ids)->pluck('id')->toArray();

        if(empty($validIds))
        {
            return;
        }

        $categories = self::with('products')->whereIn('id', $validIds)->get();

        foreach($categories as $category)
        {
            $category->products()->delete();
        }

        self::whereIn('id', $validIds)->delete();

    }
}
