<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite('resources/css/output.css')
    <title>Store Inventory</title>
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    <!-- As you can see, we will use vite with jsx syntax for React-->
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>
