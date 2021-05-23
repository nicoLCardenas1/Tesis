<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
    <link rel="manifest" href="/manifest.json" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://embed.ex.co/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'playbuzz-sdk'));
    </script>
</head>
<input type="hidden" id="user" value="{{ Auth::user()->id }}" />
<input type="hidden" id="role" value="{{ Auth::user()->role }}" />
<input type="hidden" id="name" value="{{ Auth::user()->name }}" />
<input type="hidden" id="ies" value="{{ Auth::user()->ies }}" />
<input type="hidden" id="snies" value="{{ Auth::user()->snies }}" />
<div id="example"></div>
<script src="{{ asset('js/app.js') }}"></script>
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/worker.js').then(function(registration) {
                console.log('Worker registration successful', registration.scope);
            }, function(err) {
                console.log('Worker registration failed', err);
            }).catch(function(err) {
                console.log(err);
            });
        });
    } else {
        console.log('Service Worker is not supported by browser.');
    }
</script>