<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AddPhotoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [GuestController::class,'home'])->name('homepage');
Route::get('/livepresent', [GuestController::class,'livepresent'])->name('livepresent');
Route::get('/katalog',[GuestController::class,'katalogpage'])->name('katalogpage');
Route::get('/perumahan/{nama}',[GuestController::class,'show'])->name('perumahanpage');

Route::middleware(['auth','admin'])->prefix('admin')->group(function(){
    Route::get('/',[AdminController::class,'index']);
    Route::get('/dashboard',[AdminController::class,'index'])->name('dashboard');
    Route::get('/perumahan/{nama}',[AdminController::class,'PreviewData'])->name('dashboard.perumahan');
    Route::get('/createdata',[AdminController::class,'create'])->name('createdata');
    Route::post('/createdata',[AdminController::class,'store']);
    Route::get('/editdata',[AdminController::class,'show'])->name('editdata');
    Route::get('/editdata/{nama}',[AdminController::class,'edit'])->name('editperumahan');
    Route::post('/editdata/{id_perumahan}',[AdminController::class,'update'])->name('editperumahan.update');
    Route::post('/deletedata/{id}',[AdminController::class,'destroy'])->name('delete.data');
    Route::delete('/deletefotoperumahan/{id}',[AdminController::class,'deleteimageperumahan'])->name('delete.imageperumahan');
    Route::delete('/deletefotositeplan/{id}',[AdminController::class,'deleteimagesiteplan'])->name('delete.imagesiteplan');
    Route::post('/addimageperumahan',[AdminController::class,'AddImagePerumahan'])->name('editImage.perumahan');
    Route::post('/addimagesiteplan',[AdminController::class,'AddImageSiteplan'])->name('editImage.siteplan');
    Route::get('/exportdata',[AdminController::class,'ExportData'])->name('exportdata');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
