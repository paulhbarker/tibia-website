<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;

class ApiController extends Controller
{

	/**
	 * Response status code.
	 * @var int
	 */
	protected $statusCode = 200;

	/**
	 * @return int
	 */
	public function getStatusCode()
	{
		return $this->statusCode;
	}

	/**
	 * @param mixed $statusCode
	 * @return $this
	 */
	public function setStatusCode($statusCode)
	{
		$this->statusCode = $statusCode;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function respondNotFound()
	{
		return $this->setStatusCode(404)->respond();
	}

	/**
	 * @return mixed
	 */
	public function respondInternalError()
	{
		return $this->setStatusCode(500)->respond();
	}

	/**
	 * @return mixed
	 */
	public function respondUnauthorized()
	{
		return $this->setStatusCode(401)->respondWithError('Unauthorized');
	}

	/**
	 * @param string $message
	 * @return mixed
	 */
	public function respondBadRequest($message = 'Bad Request')
	{
		return $this->setStatusCode(400)->respond($message);
	}

	/**
	 * @return mixed
	 */
	public function respondOk()
	{
		return $this->setStatusCode(200)->respond();
	}

	/**
	 * @param $item
	 * @return mixed
	 */
	public function respondUpdated($item)
	{
		return $this->setStatusCode(200)->respond($item);
	}

	/**
	 * @param $item
	 * @return mixed
	 */
	public function respondCreated($item)
	{
		return $this->setStatusCode(201)->respond($item);
	}

	/**
	 * @param $data
	 * @param array $headers
	 * @return mixed
	 */
	public function respond($data = null, $headers = [])
	{
		return Response::json($data, $this->getStatusCode(), $headers);
	}

	/**
	 * @param $item
	 * @return mixed
	 */
	public function respondWithItem($item)
	{
		return $this->respond($item);
	}

	/**
	 * @param string $message
	 * @return mixed
	 */
	public function respondWithError($message)
	{
		return $this->respond([
			'error' => [
				'message' => $message,
				'status_code' => $this->getStatusCode(),
			],
		]);
	}
}
