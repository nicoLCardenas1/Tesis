<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Favorite;
use App\Ofert;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = $request->input('user_id');
        $offer = $request->input('id');

        $validate = Favorite::where('user_id', $user_id)
            ->where('offer_id', $offer)
            ->get();

        if (count($validate)) {
            $response = [
                'status' => 0,
                'favorite' => [],
                'message' => 'Ya lo añadiste a los favoritos',
                'validate' => $validate
            ];
        } else {
            $favorite = new Favorite();
            $favorite->user_id = $user_id;
            $favorite->offer_id = $offer;
            $favorite->save();

            $response = [
                'status' => 1,
                'favorite' => $favorite,
                'message' => 'Guardado exitoso',
                'validate' => $validate
            ];
        }

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $favorites = Favorite::select('offer_id')->where('user_id', $id)->get();
        $offers = Ofert::whereIn('id', $favorites)->get();
        return response()->json($offers, 200);
    }

    public function postuados($id)
    {
        $favorites = Favorite::select('offer_id')->get();
        $offers = DB::table('oferts')
            ->join('users', 'oferts.user_id', '=', 'users.id')
            ->select('users.*', 'oferts.*')
            // ->whereIn('id', $favorites)
            ->where('oferts.user_id', $id)
            ->get();

            return response()->json($offers, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function edit(Favorite $favorite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Favorite $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function destroy($user, $id)
    {
        $result = Favorite::where("user_id", $user)->where("offer_id", $id)->delete();
        return response()->json($result ? true : false, 200);
    }
}
