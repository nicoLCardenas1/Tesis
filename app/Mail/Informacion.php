<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;


class Informacion extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $mensaje;
    public $title;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mensaje, $subject, $title)
    {
        $this->mensaje = $mensaje;
        $this->subject = $subject;
        $this->title = $title;
    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('example@example.com')->view('mails.Informacion1');
    }
}
