<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = Todo::orderByDesc('created_at')->get();
        return response()->json($todos, 200);
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
        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);

        $todo = new Todo();
        $todo->title = $request->title;
        $todo->description = $request->description;

        if ($todo->save()) {
          return response()->json($todo, 201);
        } else {
          return response()->json($todo, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);

        $todo->title = $request->title;
        $todo->description = $request->description;

        if ($todo->save()) {
          return response()->json($todo, 200);
        } else {
          return response()->json($todo, 500);
        }
    }

    public function markedAsCompleted($id)
    {
       $todo = Todo::findOrfail($id);
       $todo->is_completed = 1;
        if ($todo->save()) {
          return response()->json($todo, 200);
        }
        else{
          return response()->json($todo, 500);
        }
    }

    public function repeatTask($id)
    {
       $todo = Todo::findOrfail($id);
       $todo->is_completed = 0;
        if ($todo->save()) {
          return response()->json($todo, 200);
        }
        else{
          return response()->json($todo, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        if ($todo->delete()) {
          return response()->json([
              'message' => 'task successfully deleted.'
          ], 200);
        } else {
          return response()->json($todo, 500);
        }
    }
}
