<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePlayerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|alpha|min:4|max:32|unique:players,name',
            'vocation' => 'required|in:1,2,3,4',
            'sex' => 'required|in:0,1',
            'town' => 'required|in:1,2,4,5'
        ];
    }
}
