<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎮 بازی حدس عدد - نسخه پیشرفته</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-color: #e0f2fe;
            --primary-color: #34d399;
            --primary-dark: #059669;
            --secondary-color: #60a5fa;
            --secondary-dark: #3b82f6;
            --danger-color: #f87171;
            --danger-dark: #dc2626;
            --warning-color: #facc15;
            --warning-dark: #ca8a04;
            --purple-color: #a78bfa;
            --purple-dark: #7c3aed;
            --text-dark: #1e3a8a;
            --text-light: #f3f4f6;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Tahoma', 'Segoe UI', sans-serif;
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            width: 100%;
            max-width: 480px;
            background-color: white;
            border-radius: 20px;
            box-shadow: var(--shadow);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            font-size: 24px;
            margin-bottom: 5px;
        }

        .header p {
            font-size: 14px;
            opacity: 0.9;
        }

        .main-content {
            padding: 20px;
            background-color: var(--bg-color);
        }

        .game-area {
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: var(--shadow);
        }

        .section-title {
            color: var(--text-dark);
            margin-bottom: 15px;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .input-group {
            margin-bottom: 20px;
        }

        .input-group label {
            display: block;
            margin-bottom: 8px;
            color: var(--text-dark);
            font-weight: bold;
        }

        input[type="number"] {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 16px;
            text-align: center;
            transition: border-color 0.3s;
        }

        input[type="number"]:focus {
            border-color: var(--primary-color);
            outline: none;
        }

        .btn {
            display: inline-block;
            padding: 12px 25px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
            width: 100%;
            margin-bottom: 10px;
        }

        .btn:hover {
            background-color: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn-secondary {
            background-color: var(--secondary-color);
        }

        .btn-secondary:hover {
            background-color: var(--secondary-dark);
        }

        .btn-warning {
            background-color: var(--warning-color);
            color: #1e293b;
        }

        .btn-warning:hover {
            background-color: var(--warning-dark);
        }

        .btn-danger {
            background-color: var(--danger-color);
        }

        .btn-danger:hover {
            background-color: var(--danger-dark);
        }

        .btn-purple {
            background-color: var(--purple-color);
        }

        .btn-purple:hover {
            background-color: var(--purple-dark);
        }

        .game-info {
            display: flex;
            justify-content: space-between;
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 15px;
        }

        .info-item {
            text-align: center;
            flex: 1;
        }

        .info-label {
            font-size: 12px;
            color: #64748b;
            margin-bottom: 5px;
        }

        .info-value {
            font-size: 20px;
            font-weight: bold;
            color: var(--text-dark);
        }

        .hint-box {
            background-color: #fef3c7;
            border-right: 4px solid var(--warning-color);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 15px;
            color: #92400e;
        }

        .smart-hint {
            background-color: #fee2e2;
            border-right: 4px solid var(--danger-color);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 15px;
            color: #991b1b;
        }

        .history-box {
            background-color: #f1f5f9;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 15px;
        }

        .history-title {
            font-size: 14px;
            color: #475569;
            margin-bottom: 10px;
        }

        .history-items {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .history-item {
            background-color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
            color: var(--text-dark);
            box-shadow: var(--shadow);
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background-color: white;
            width: 90%;
            max-width: 500px;
            border-radius: 15px;
            padding: 25px;
            box-shadow: var(--shadow);
            animation: modalFade 0.3s;
        }

        @keyframes modalFade {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .modal-title {
            font-size: 20px;
            color: var(--text-dark);
        }

        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #94a3b8;
        }

        .fps-display {
            position: fixed;
            top: 10px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: red;
            padding: 5px 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 14px;
            z-index: 999;
        }

        .footer {
            text-align: center;
            padding: 15px;
            color: var(--text-dark);
            font-size: 14px;
            background-color: white;
            border-top: 1px solid #e5e7eb;
        }

        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        .button-group .btn {
            flex: 1;
            margin-bottom: 0;
        }

        /* اسپلش اسکرین */
        .splash-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0B0C10 0%, #1a1a2e 100%);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
        }

        .splash-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .splash-content {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 20px;
        }

        .splash-title {
            font-size: 32px;
            margin-bottom: 20px;
            color: #FFD93D;
            text-shadow: 0 0 10px rgba(255, 217, 61, 0.5);
        }

        .splash-subtitle {
            font-size: 18px;
            margin-bottom: 40px;
            color: #32FF7E;
        }

        .splash-btn {
            padding: 15px 30px;
            font-size: 18px;
            background: linear-gradient(to right, #4D96FF, #1E90FF);
            border: none;
            border-radius: 50px;
            color: white;
            cursor: pointer;
            transition: all 0.3s;
        }

        .splash-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(77, 150, 255, 0.5);
        }

        /* تنظیمات ریسپانسیو */
        @media (max-width: 600px) {
            .container {
                border-radius: 10px;
            }
            
            .header h1 {
                font-size: 20px;
            }
            
            .game-info {
                flex-direction: column;
                gap: 15px;
            }
            
            .button-group {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <!-- اسپلش اسکرین -->
    <div id="splashScreen" class="splash-screen">
        <canvas id="splashCanvas" class="splash-canvas"></canvas>
        <div class="splash-content">
            <h1 class="splash-title">🎯 بازی حدس عدد پیشرفته</h1>
            <p class="splash-subtitle">حالا با امتیاز، تایمر و راهنمای هوشمند!</p>
            <button id="enterGame" class="splash-btn">ورود به بازی 🚀</button>
        </div>
    </div>

    <!-- منوی اصلی (در ابتدا مخفی) -->
    <div id="mainContainer" class="container" style="display: none;">
        <!-- هدر -->
        <div class="header">
            <h1>🎮 بازی حدس عدد - نسخه پیشرفته</h1>
            <p>به بازی حدس عدد پیشرفته خوش اومدی! 🎯</p>
        </div>

        <!-- محتوای اصلی -->
        <div class="main-content">
            <div class="game-area">
                <div class="section-title">
                    <i class="fas fa-gamepad"></i>
                    <span>شروع بازی جدید</span>
                </div>
                
                <div class="input-group">
                    <label for="maxRange">عدد بالای محدوده را وارد کن:</label>
                    <input type="number" id="maxRange" value="100" min="2" max="10000">
                </div>
                
                <button id="startGame" class="btn">
                    <i class="fas fa-play"></i> شروع بازی 🕹️
                </button>
            </div>

            <!-- دکمه‌های منو -->
            <div class="game-area">
                <div class="section-title">
                    <i class="fas fa-bars"></i>
                    <span>منوی بازی</span>
                </div>
                
                <button id="showInstructions" class="btn btn-secondary">
                    <i class="fas fa-info-circle"></i> توضیحات ℹ️
                </button>
                
                <button id="showHighScores" class="btn btn-purple">
                    <i class="fas fa-trophy"></i> بهترین امتیازات 🏆
                </button>
                
                <button id="openSettings" class="btn btn-warning">
                    <i class="fas fa-cog"></i> تنظیمات ⚙️
                </button>
                
                <button id="exitGame" class="btn btn-danger">
                    <i class="fas fa-door-open"></i> خروج 🚪
                </button>
            </div>
        </div>

        <!-- فوتر -->
        <div class="footer">
            <p>سازنده و کارگردان: امیر محمد زکی‌زاده</p>
            <p>نویسنده کد: امیر محمد زکی زاده</p>
        </div>
    </div>

    <!-- پنجره بازی (در ابتدا مخفی) -->
    <div id="gameWindow" class="container" style="display: none;">
        <div class="header">
            <h1>🎯 حدس عدد - نسخه پیشرفته</h1>
            <p id="gameRange">یک عدد بین ۱ تا ۱۰۰ حدس بزن:</p>
        </div>

        <div class="main-content">
            <!-- اطلاعات بازی -->
            <div class="game-info">
                <div class="info-item">
                    <div class="info-label">زمان</div>
                    <div id="gameTimer" class="info-value">۰ ثانیه</div>
                </div>
                <div class="info-item">
                    <div class="info-label">تعداد تلاش</div>
                    <div id="gameAttempts" class="info-value">۰</div>
                </div>
                <div class="info-item">
                    <div class="info-label">امتیاز</div>
                    <div id="gameScore" class="info-value">۱۰۰۰</div>
                </div>
            </div>

            <!-- ورودی حدس -->
            <div class="input-group">
                <label for="guessInput">حدس خود را وارد کنید:</label>
                <input type="number" id="guessInput" placeholder="عدد را وارد کن...">
            </div>

            <!-- دکمه‌های بازی -->
            <div class="button-group">
                <button id="checkGuess" class="btn btn-secondary">
                    <i class="fas fa-search"></i> بررسی 🔍
                </button>
                <button id="giveUp" class="btn btn-danger">
                    <i class="fas fa-flag"></i> تسلیم 😔
                </button>
            </div>

            <!-- راهنماها -->
            <div id="hintBox" class="hint-box" style="display: none;">
                <i class="fas fa-lightbulb"></i> <span id="hintText"></span>
            </div>

            <div id="smartHintBox" class="smart-hint" style="display: none;">
                <i class="fas fa-brain"></i> <span id="smartHintText"></span>
            </div>

            <!-- تاریخچه حدس‌ها -->
            <div class="history-box">
                <div class="history-title">تاریخچه حدس‌ها:</div>
                <div id="historyItems" class="history-items">
                    <!-- حدس‌ها اینجا نمایش داده می‌شوند -->
                </div>
            </div>

            <!-- دکمه بازگشت -->
            <button id="backToMenu" class="btn">
                <i class="fas fa-arrow-right"></i> بازگشت به منو
            </button>
        </div>
    </div>

    <!-- FPS نمایش (در ابتدا مخفی) -->
    <div id="fpsDisplay" class="fps-display" style="display: none;">FPS: 0</div>

    <!-- مودال امتیازات بالا -->
    <div id="highScoresModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">🏆 بهترین امتیازات</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div id="highScoresContent">
                <!-- محتوای امتیازات اینجا لود می‌شود -->
            </div>
        </div>
    </div>

    <!-- مودال تنظیمات -->
    <div id="settingsModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">⚙️ تنظیمات</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div>
                <div class="input-group">
                    <label>🎨 رنگ پس‌زمینه:</label>
                    <input type="color" id="bgColorPicker" value="#e0f2fe">
                </div>
                
                <div class="input-group">
                    <label>🎨 رنگ دکمه اصلی:</label>
                    <input type="color" id="btnColorPicker" value="#34d399">
                </div>
                
                <div class="input-group">
                    <label>🖥️ عرض پنجره:</label>
                    <input type="number" id="windowWidth" value="480" min="200" max="10000">
                </div>
                
                <div class="input-group">
                    <label>🖥️ ارتفاع پنجره:</label>
                    <input type="number" id="windowHeight" value="480" min="200" max="10000">
                </div>
                
                <button id="toggleFPS" class="btn btn-warning">
                    <i class="fas fa-tachometer-alt"></i> نمایش FPS 🔁
                </button>
                
                <button id="applySettings" class="btn">
                    <i class="fas fa-check"></i> اعمال تنظیمات
                </button>
            </div>
        </div>
    </div>

    <!-- مودال توضیحات -->
    <div id="instructionsModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">📘 توضیحات بازی پیشرفته</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div>
                <h4>🎯 سیستم امتیازدهی:</h4>
                <p>• امتیاز اولیه: 1000</p>
                <p>• هر ثانیه: ۲- امتیاز</p>
                <p>• هر تلاش: ۵۰- امتیاز</p>
                
                <h4>⏰ تایمر:</h4>
                <p>• زمان بازی محاسبه می‌شود</p>
                <p>• هرچه سریع‌تر، امتیاز بیشتر</p>
                
                <h4>💡 راهنمای هوشمند:</h4>
                <p>• پس از هر حدس راهنمایی می‌گیرید</p>
                <p>• می‌فهمید چقدر به جواب نزدیکید</p>
                
                <h4>🏆 سیستم رکورد:</h4>
                <p>• بهترین امتیازات ذخیره می‌شود</p>
                <p>• برای هر محدوده عددی جداگانه</p>
            </div>
        </div>
    </div>

    <script>
        // =============================
        // متغیرهای جهانی بازی
        // =============================
        let gameState = {
            secretNumber: 0,
            maxRange: 100,
            attempts: 0,
            previousGuesses: [],
            timer: 0,
            timerInterval: null,
            score: 1000,
            gameStarted: false,
            showFPS: false,
            lastFPSTime: 0,
            fps: 0,
            highScores: {}
        };

        // =============================
        // سیستم امتیازات بالا
        // =============================
        function loadHighScores() {
            const saved = localStorage.getItem('guessGameHighScores');
            if (saved) {
                try {
                    gameState.highScores = JSON.parse(saved);
                } catch {
                    gameState.highScores = {};
                }
            }
        }

        function saveHighScore(name, score, maxRange) {
            const key = `range_${maxRange}`;
            if (!gameState.highScores[key] || score > gameState.highScores[key].score) {
                gameState.highScores[key] = { name, score };
                localStorage.setItem('guessGameHighScores', JSON.stringify(gameState.highScores));
            }
        }

        function showHighScores() {
            const content = document.getElementById('highScoresContent');
            const scores = gameState.highScores;
            
            if (Object.keys(scores).length === 0) {
                content.innerHTML = '<p style="text-align: center; padding: 20px;">هنوز رکوردی ثبت نشده است! 🏆</p>';
                return;
            }
            
            let html = '<div style="max-height: 300px; overflow-y: auto;">';
            for (const [key, data] of Object.entries(scores)) {
                const rangeNum = key.replace('range_', '');
                html += `
                    <div style="background: #f8fafc; padding: 10px; margin: 5px 0; border-radius: 8px;">
                        <strong>محدوده ۱-${rangeNum}:</strong> ${data.name} - امتیاز: ${data.score}
                    </div>
                `;
            }
            html += '</div>';
            content.innerHTML = html;
        }

        // =============================
        // راهنمای هوشمند
        // =============================
        function smartHint(guess, number, previousGuesses) {
            const difference = Math.abs(guess - number);
            const percentage = (difference / number) * 100;
            
            if (difference === 0) {
                return "آفرین! درست حدس زدی! 🎉";
            } else if (difference <= 3) {
                return "خیلی نزدیک شدی! 🔥 تقریباً رسیدی!";
            } else if (difference <= 7) {
                return "نزدیک شدی! 💫 کمی بیشتر تلاش کن";
            } else if (difference <= 15) {
                return "هنوز راه داری... 📏";
            } else if (percentage <= 20) {
                return "در محدوده ۲۰٪ عدد هدفی! 🎯";
            } else {
                return guess > number ? "خیلی بالاست! 📉" : "خیلی پایین است! 📈";
            }
        }

        // =============================
        // سیستم تایمر
        // =============================
        function startTimer() {
            gameState.timer = 0;
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = setInterval(() => {
                gameState.timer++;
                document.getElementById('gameTimer').textContent = `${gameState.timer} ثانیه`;
                updateScore();
            }, 1000);
        }

        function stopTimer() {
            clearInterval(gameState.timerInterval);
        }

        function updateScore() {
            const timePenalty = gameState.timer * 2;
            const attemptPenalty = gameState.attempts * 50;
            gameState.score = Math.max(100, 1000 - timePenalty - attemptPenalty);
            document.getElementById('gameScore').textContent = gameState.score;
        }

        // =============================
        // سیستم FPS
        // =============================
        function updateFPS() {
            const now = performance.now();
            gameState.fps = Math.round(1000 / (now - gameState.lastFPSTime));
            gameState.lastFPSTime = now;
            
            if (gameState.showFPS) {
                document.getElementById('fpsDisplay').textContent = `FPS: ${gameState.fps}`;
            }
            
            requestAnimationFrame(updateFPS);
        }

        function toggleFPS() {
            gameState.showFPS = !gameState.showFPS;
            document.getElementById('fpsDisplay').style.display = gameState.showFPS ? 'block' : 'none';
        }

        // =============================
        // مدیریت بازی
        // =============================
        function startGame() {
            try {
                const maxRange = parseInt(document.getElementById('maxRange').value);
                if (isNaN(maxRange) || maxRange < 2) {
                    alert('⚠️ لطفاً عدد صحیح بزرگتر از ۱ وارد کن!');
                    return;
                }
                
                gameState.maxRange = maxRange;
                gameState.secretNumber = Math.floor(Math.random() * maxRange) + 1;
                gameState.attempts = 0;
                gameState.previousGuesses = [];
                gameState.score = 1000;
                gameState.gameStarted = true;
                
                document.getElementById('gameRange').textContent = `یک عدد بین ۱ تا ${maxRange} حدس بزن:`;
                document.getElementById('gameAttempts').textContent = '۰';
                document.getElementById('gameScore').textContent = '۱۰۰۰';
                document.getElementById('hintBox').style.display = 'none';
                document.getElementById('smartHintBox').style.display = 'none';
                document.getElementById('historyItems').innerHTML = '';
                document.getElementById('guessInput').value = '';
                
                document.getElementById('mainContainer').style.display = 'none';
                document.getElementById('gameWindow').style.display = 'block';
                
                startTimer();
                
                setTimeout(() => {
                    alert(`🎮 بازی شروع شد!\n\nعدد بین ۱ تا ${maxRange} انتخاب شد!\n⏰ زمانت رو مدیریت کن!\n🏆 امتیاز بیشتر کسب کن!`);
                }, 100);
                
            } catch (error) {
                alert('⚠️ خطا در شروع بازی!');
            }
        }

        function checkGuess() {
            if (!gameState.gameStarted) return;
            
            const input = document.getElementById('guessInput');
            const guess = parseInt(input.value);
            
            if (isNaN(guess) || guess < 1 || guess > gameState.maxRange) {
                alert('⚠️ لطفاً عدد معتبر وارد کن!');
                return;
            }
            
            gameState.attempts++;
            gameState.previousGuesses.push(guess);
            
            // به‌روزرسانی نمایش
            document.getElementById('gameAttempts').textContent = gameState.attempts;
            updateScore();
            updateHistory();
            
            if (guess === gameState.secretNumber) {
                stopTimer();
                const finalScore = gameState.score;
                
                // ذخیره امتیاز اگر خوب باشد
                if (finalScore > 500) {
                    saveHighScore('بازیکن', finalScore, gameState.maxRange);
                }
                
                setTimeout(() => {
                    const message = `آفرین! درست حدس زدی 👏\n\n` +
                                  `عدد: ${gameState.secretNumber}\n` +
                                  `تعداد تلاش: ${gameState.attempts}\n` +
                                  `زمان: ${gameState.timer} ثانیه\n` +
                                  `امتیاز نهایی: ${finalScore}\n\n` +
                                  `🏆 بازی عالی بود!`;
                    
                    if (confirm(message + '\n\nآیا می‌خواهید دوباره بازی کنید؟')) {
                        startGame();
                    } else {
                        backToMenu();
                    }
                }, 100);
                
            } else {
                // راهنمای معمولی
                const hintBox = document.getElementById('hintBox');
                const hintText = document.getElementById('hintText');
                hintBox.style.display = 'block';
                hintText.textContent = guess > gameState.secretNumber ? 
                    '🔻 عدد کوچکتر حدس بزن!' : '🔺 عدد بزرگتر حدس بزن!';
                
                // راهنمای هوشمند
                const smartHintBox = document.getElementById('smartHintBox');
                const smartHintText = document.getElementById('smartHintText');
                smartHintBox.style.display = 'block';
                smartHintText.textContent = smartHint(guess, gameState.secretNumber, gameState.previousGuesses);
            }
            
            input.value = '';
            input.focus();
        }

        function giveUp() {
            if (!gameState.gameStarted) return;
            
            if (confirm('مطمئنی می‌خوای تسلیم بشی؟')) {
                stopTimer();
                
                setTimeout(() => {
                    const message = `متاسفانه تسلیم شدی! 😔\n\n` +
                                  `عدد مورد نظر: ${gameState.secretNumber}\n` +
                                  `تعداد تلاش: ${gameState.attempts}\n` +
                                  `زمان: ${gameState.timer} ثانیه\n` +
                                  `امتیاز نهایی: ${gameState.score}\n\n` +
                                  `دفعه بعدی حتما برنده میشی! 💪`;
                    
                    if (confirm(message + '\n\nآیا می‌خواهید دوباره بازی کنید؟')) {
                        startGame();
                    } else {
                        backToMenu();
                    }
                }, 100);
            }
        }

        function updateHistory() {
            const historyDiv = document.getElementById('historyItems');
            const recentGuesses = gameState.previousGuesses.slice(-5);
            
            historyDiv.innerHTML = recentGuesses.map(guess => 
                `<div class="history-item">${guess}</div>`
            ).join('');
        }

        function backToMenu() {
            stopTimer();
            gameState.gameStarted = false;
            document.getElementById('gameWindow').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
        }

        // =============================
        // مدیریت مودال‌ها
        // =============================
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'flex';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        function applySettings() {
            const bgColor = document.getElementById('bgColorPicker').value;
            const btnColor = document.getElementById('btnColorPicker').value;
            const width = document.getElementById('windowWidth').value;
            const height = document.getElementById('windowHeight').value;
            
            document.querySelector('.main-content').style.backgroundColor = bgColor;
            document.querySelectorAll('.btn').forEach(btn => {
                if (btn.id !== 'toggleFPS' && btn.id !== 'applySettings') {
                    btn.style.backgroundColor = btnColor;
                }
            });
            
            document.querySelector('.container').style.maxWidth = `${width}px`;
            
            alert('✅ تنظیمات اعمال شد!');
            closeModal('settingsModal');
        }

        // =============================
        // اسپلش اسکرین و انیمیشن
        // =============================
        function animateSplashScreen() {
            const canvas = document.getElementById('splashCanvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const lines = [];
            const colors = ['#FF3C38', '#FFDD59', '#32FF7E', '#34ace0'];
            
            // ایجاد خطوط
            for (let i = 0; i < 30; i++) {
                lines.push({
                    x1: Math.random() * canvas.width,
                    y1: Math.random() * canvas.height,
                    x2: Math.random() * canvas.width,
                    y2: Math.random() * canvas.height,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    dx: (Math.random() - 0.5) * 4,
                    dy: (Math.random() - 0.5) * 4
                });
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                lines.forEach(line => {
                    // حرکت خطوط
                    line.x1 += line.dx;
                    line.y1 += line.dy;
                    line.x2 += line.dx;
                    line.y2 += line.dy;
                    
                    // برگرداندن خطوط به صفحه
                    if (line.x1 < 0 || line.x1 > canvas.width) line.dx *= -1;
                    if (line.y1 < 0 || line.y1 > canvas.height) line.dy *= -1;
                    if (line.x2 < 0 || line.x2 > canvas.width) line.dx *= -1;
                    if (line.y2 < 0 || line.y2 > canvas.height) line.dy *= -1;
                    
                    // رسم خط
                    ctx.beginPath();
                    ctx.moveTo(line.x1, line.y1);
                    ctx.lineTo(line.x2, line.y2);
                    ctx.strokeStyle = line.color;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                });
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }

        function enterGame() {
            document.getElementById('splashScreen').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
        }

        // =============================
        // راه‌اندازی بازی
        // =============================
        document.addEventListener('DOMContentLoaded', () => {
            // بارگذاری امتیازات
            loadHighScores();
            
            // راه‌اندازی اسپلش اسکرین
            animateSplashScreen();
            
            // شروع FPS
            gameState.lastFPSTime = performance.now();
            updateFPS();
            
            // رویدادهای دکمه‌ها
            document.getElementById('enterGame').addEventListener('click', enterGame);
            document.getElementById('startGame').addEventListener('click', startGame);
            document.getElementById('checkGuess').addEventListener('click', checkGuess);
            document.getElementById('giveUp').addEventListener('click', giveUp);
            document.getElementById('backToMenu').addEventListener('click', backToMenu);
            document.getElementById('exitGame').addEventListener('click', () => {
                if (confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
                    window.close();
                }
            });
            
            // رویدادهای منو
            document.getElementById('showInstructions').addEventListener('click', () => openModal('instructionsModal'));
            document.getElementById('showHighScores').addEventListener('click', () => {
                showHighScores();
                openModal('highScoresModal');
            });
            document.getElementById('openSettings').addEventListener('click', () => openModal('settingsModal'));
            
            // رویدادهای مودال‌ها
            document.querySelectorAll('.close-modal').forEach(btn => {
                btn.addEventListener('click', function() {
                    closeModal(this.closest('.modal').id);
                });
            });
            
            document.getElementById('applySettings').addEventListener('click', applySettings);
            document.getElementById('toggleFPS').addEventListener('click', toggleFPS);
            
            // کلید Enter برای بررسی حدس
            document.getElementById('guessInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') checkGuess();
            });
            
            // کلید Enter برای شروع بازی از منو
            document.getElementById('maxRange').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') startGame();
            });
            
            // بستن مودال با کلیک خارج از آن
            window.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    closeModal(e.target.id);
                }
            });
        });
    </script>
</body>
</html>
