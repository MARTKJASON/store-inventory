<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Specify the table name if it's not the plural form of the model name
    // protected $table = 'products';  // This line is optional as Laravel uses the plural form by default

    // The attributes that are mass assignable
    protected $fillable = [
        'product_name', // Product name
        'category_id',
        'pricing',
        'stocks'
    ];

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get the supplier that owns the product.
     */
}
