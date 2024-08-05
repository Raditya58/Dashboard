<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <!-- Font awesome cdn font icon css -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <style>
        /* Additional styles to show disabled button state */
        button:disabled {
            cursor: not-allowed;
            background-color: grey; /* Grey color to indicate disabled state */
        }
    </style>
</head>
<body>
    <div id="activity-buttons">
        <button onclick="handleButtonClick('jamMasuk')">Jam Masuk</button>
        <button onclick="handleButtonClick('jamKeluar')">Jam Keluar</button>
    </div>
    <ul id="log-list">
        <!-- Activities will be added here -->
    </ul>
    <div class="hero-header">
        <div class="wrapper">
            <header></header>
            <div class="container">
                <div class="hero-pic">
                    <img src="{{ asset('images/account.png') }}" alt="profile pic">
                </div>
                <div class="hero-text">
                    <h5>Suma<span class="">nto</span></h5>
                    <h1>Jam Sekolah</h1>
                    <h2>08:00 - 17:00</h2>
                    <h4>1234567890</h4>
                    <div id="clock">
                        <span class="hours">00</span>
                        <span class="minutes">00</span>
                        <span class="period">AM</span>
                    </div>
                </div>
                <div class="logout">
                    <a href="#" class="material-symbols-outlined"> keyboard_return </a>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
