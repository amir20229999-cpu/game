import tkinter as tk
from tkinter import messagebox, colorchooser, simpledialog
from random import randint, choice
import time
import json
import os

# =============================
# تنظیمات گرافیک و رزولوشن
# =============================
graphics_settings = {
    "background_color": "#e0f2fe",
    "button_bg": "#34d399",
    "button_fg": "white",
    "button_active_bg": "#059669",
    "button_active_fg": "white",
    "width": 480,
    "height": 480,
}

FONT_LARGE = ("Tahoma", 14, "normal")
FONT_MEDIUM = ("Tahoma", 12, "normal")
FONT_SMALL = ("Tahoma", 10, "normal")

# =============================
# کنترل FPS واقعی
# =============================
show_fps = False
last_time = time.time()
fps_value = 0

def toggle_fps(fps_label):
    global show_fps
    show_fps = not show_fps
    if show_fps:
        fps_label.place(x=10, y=10)
    else:
        fps_label.place_forget()

def update_fps(fps_label, root):
    global last_time, fps_value
    now = time.time()
    fps_value = int(1 / (now - last_time + 0.000001))
    last_time = now
    if show_fps:
        fps_label.config(text=f"FPS: {fps_value}")
    root.after(50, update_fps, fps_label, root)

# =============================
# سیستم تایمر
# =============================
class GameTimer:
    def __init__(self):
        self.start_time = 0
        self.elapsed_time = 0
        self.running = False
    
    def start(self):
        self.start_time = time.time()
        self.running = True
    
    def stop(self):
        if self.running:
            self.elapsed_time = time.time() - self.start_time
            self.running = False
        return self.elapsed_time
    
    def get_elapsed_time(self):
        if self.running:
            return time.time() - self.start_time
        return self.elapsed_time

# =============================
# سیستم امتیازدهی و ذخیره امتیازات
# =============================
HIGH_SCORES_FILE = "high_scores.json"

def load_high_scores():
    if os.path.exists(HIGH_SCORES_FILE):
        try:
            with open(HIGH_SCORES_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_high_score(name, score, max_range):
    scores = load_high_scores()
    key = f"range_{max_range}"
    
    if key not in scores or score > scores[key]["score"]:
        scores[key] = {"name": name, "score": score}
        try:
            with open(HIGH_SCORES_FILE, 'w', encoding='utf-8') as f:
                json.dump(scores, f, ensure_ascii=False, indent=2)
        except:
            pass

def show_high_scores():
    scores = load_high_scores()
    if not scores:
        return "هنوز رکوردی ثبت نشده است! 🏆"
    
    result = "🏆 بهترین امتیازات:\n\n"
    for key, data in scores.items():
        range_num = key.replace("range_", "")
        result += f"محدوده ۱-{range_num}: {data['name']} - امتیاز: {data['score']}\n"
    
    return result

# =============================
# راهنمای هوشمند
# =============================
def smart_hint(guess, number, previous_guesses):
    difference = abs(guess - number)
    percentage = (difference / number) * 100
    
    if difference == 0:
        return "آفرین! درست حدس زدی! 🎉"
    elif difference <= 3:
        return "خیلی نزدیک شدی! 🔥 تقریباً رسیدی!"
    elif difference <= 7:
        return "نزدیک شدی! 💫 کمی بیشتر تلاش کن"
    elif difference <= 15:
        return "هنوز راه داری... 📏"
    elif percentage <= 20:
        return "در محدوده ۲۰٪ عدد هدفی! 🎯"
    else:
        if guess > number:
            return "خیلی بالاست! 📉"
        else:
            return "خیلی پایین است! 📈"

# =============================
# پنجره حدس عدد پیشرفته
# =============================
def open_guess_window(number, max_num, root):
    width = graphics_settings["width"]
    height = graphics_settings["height"]
    win = tk.Toplevel(root)
    win.title("🎯 حدس عدد - نسخه پیشرفته")
    win.geometry(f"{width}x{height}")
    win.config(bg="#f3f4f6")

    # سیستم امتیازدهی و تایمر
    timer = GameTimer()
    timer.start()
    base_score = 1000
    attempts = 0
    previous_guesses = []

    tk.Label(win, text=f"یک عدد بین ۱ تا {max_num} حدس بزن:",
             font=FONT_LARGE, bg="#f3f4f6", fg="#333").pack(pady=10)

    # نمایش اطلاعات بازی
    info_frame = tk.Frame(win, bg="#f3f4f6")
    info_frame.pack(pady=5)

    lbl_timer = tk.Label(info_frame, text="زمان: 0 ثانیه", font=FONT_SMALL, bg="#f3f4f6", fg="#666")
    lbl_timer.pack(side="left", padx=10)

    lbl_attempts = tk.Label(info_frame, text="تعداد تلاش: 0", font=FONT_SMALL, bg="#f3f4f6", fg="#666")
    lbl_attempts.pack(side="left", padx=10)

    lbl_score = tk.Label(info_frame, text="امتیاز: 1000", font=FONT_SMALL, bg="#f3f4f6", fg="#666")
    lbl_score.pack(side="left", padx=10)

    entry_guess = tk.Entry(win, font=FONT_MEDIUM, justify="center", width=10)
    entry_guess.pack(pady=10)
    entry_guess.focus()

    lbl_hint = tk.Label(win, text="", font=FONT_SMALL, bg="#f3f4f6", fg="#555")
    lbl_hint.pack(pady=5)

    lbl_smart_hint = tk.Label(win, text="", font=FONT_SMALL, bg="#f3f4f6", fg="#dc2626")
    lbl_smart_hint.pack(pady=2)

    # تاریخچه حدس‌ها
    history_frame = tk.Frame(win, bg="#f3f4f6")
    history_frame.pack(pady=5)
    
    tk.Label(history_frame, text="تاریخچه حدس‌ها:", font=FONT_SMALL, bg="#f3f4f6", fg="#333").pack()
    lbl_history = tk.Label(history_frame, text="", font=FONT_SMALL, bg="#f3f4f6", fg="#666")
    lbl_history.pack()

    def update_timer():
        if win.winfo_exists():
            elapsed = int(timer.get_elapsed_time())
            lbl_timer.config(text=f"زمان: {elapsed} ثانیه")
            win.after(1000, update_timer)

    def calculate_final_score():
        time_penalty = int(timer.get_elapsed_time()) * 2
        attempt_penalty = attempts * 50
        final_score = max(100, base_score - time_penalty - attempt_penalty)
        return final_score

    def check_guess():
        nonlocal attempts
        try:
            guess = int(entry_guess.get())
            attempts += 1
            
            # اضافه کردن به تاریخچه
            previous_guesses.append(guess)
            history_text = ", ".join(map(str, previous_guesses[-5:]))
            lbl_history.config(text=history_text)
            
            # به‌روزرسانی اطلاعات
            lbl_attempts.config(text=f"تعداد تلاش: {attempts}")
            current_score = calculate_final_score()
            lbl_score.config(text=f"امتیاز: {current_score}")
            
            if guess == number:
                timer.stop()
                final_score = calculate_final_score()
                
                # ذخیره امتیاز اگر خوب باشد
                if final_score > 500:
                    save_high_score("بازیکن", final_score, max_num)
                
                messagebox.showinfo(
                    "تبریک 🎉", 
                    f"آفرین! درست حدس زدی 👏\n\n"
                    f"عدد: {number}\n"
                    f"تعداد تلاش: {attempts}\n"
                    f"زمان: {int(timer.elapsed_time)} ثانیه\n"
                    f"امتیاز نهایی: {final_score}\n\n"
                    f"🏆 بازی عالی بود!"
                )
                win.destroy()
            else:
                # راهنمای معمولی
                if guess > number:
                    lbl_hint.config(text="🔻 عدد کوچکتر حدس بزن!")
                else:
                    lbl_hint.config(text="🔺 عدد بزرگتر حدس بزن!")
                
                # راهنمای هوشمند
                smart = smart_hint(guess, number, previous_guesses)
                lbl_smart_hint.config(text=smart)
                
        except ValueError:
            messagebox.showwarning("خطا ⚠️", "لطفاً عدد وارد کن!")

    def give_up():
        timer.stop()
        # فقط سوال بپرس که مطمئنی می‌خوای تسلیم بشی؟
        if messagebox.askyesno("تسلیم 😔", "مطمئنی می‌خوای تسلیم بشی؟"):
            # اگر کاربر تایید کرد، جواب را نشان بده
            messagebox.showinfo(
                "پایان بازی", 
                f"متاسفانه تسلیم شدی! 😔\n\n"
                f"عدد مورد نظر: {number}\n"
                f"تعداد تلاش: {attempts}\n"
                f"زمان: {int(timer.elapsed_time)} ثانیه\n"
                f"امتیاز نهایی: {calculate_final_score()}\n\n"
                f"دفعه بعدی حتما برنده میشی! 💪"
            )
            win.destroy()

    # دکمه‌ها
    button_frame = tk.Frame(win, bg="#f3f4f6")
    button_frame.pack(pady=10)

    tk.Button(button_frame, text="بررسی 🔍", command=check_guess,
              font=FONT_MEDIUM, bg="#60a5fa", fg="white",
              activebackground="#3b82f6", relief="flat", padx=10, pady=5, cursor="hand2").pack(side="left", padx=5)

    tk.Button(button_frame, text="تسلیم 😔", command=give_up,
              font=FONT_MEDIUM, bg="#f87171", fg="white",
              activebackground="#dc2626", relief="flat", padx=10, pady=5, cursor="hand2").pack(side="left", padx=5)

    # شروع تایمر
    update_timer()

    # کلید Enter برای بررسی
    win.bind('<Return>', lambda event: check_guess())

# =============================
# منوی اصلی بازی
# =============================
def main_menu():
    root = tk.Tk()
    root.title("🎮 بازی حدس عدد - نسخه پیشرفته")

    def update_geometry():
        root.geometry(f"{graphics_settings['width']}x{graphics_settings['height']}")

    update_geometry()
    root.config(bg=graphics_settings["background_color"])

    # FPS Label
    fps_label = tk.Label(root, text="FPS: 0", font=FONT_SMALL, bg="#f3f4f6", fg="red")
    fps_label.place_forget()
    update_fps(fps_label, root)

    tk.Label(root, text="به بازی حدس عدد پیشرفته خوش اومدی! 🎯",
             font=FONT_LARGE,
             bg=graphics_settings["background_color"], fg="#1e3a8a").pack(pady=10)

    menu_frame = tk.Frame(root, bg=graphics_settings["background_color"])
    menu_frame.pack(pady=5)

    tk.Label(menu_frame, text="عدد بالای محدوده را وارد کن:",
             font=FONT_MEDIUM, bg=graphics_settings["background_color"], fg="#1e3a8a").pack(pady=5)
    entry_range = tk.Entry(menu_frame, font=FONT_MEDIUM, justify="center", width=8)
    entry_range.pack(pady=5)
    entry_range.insert(0, "100")  # مقدار پیش‌فرض

    def start_game():
        try:
            max_num = int(entry_range.get())
            if max_num < 2:
                raise ValueError
        except ValueError:
            messagebox.showwarning("خطا ⚠️", "لطفاً عدد صحیح بزرگتر از ۱ وارد کن!")
            return
        number = randint(1, max_num)
        messagebox.showinfo("شروع بازی 🎮", f"عدد بین ۱ تا {max_num} انتخاب شد!\n\n⏰ زمانت رو مدیریت کن!\n🏆 امتیاز بیشتر کسب کن!")
        open_guess_window(number, max_num, root)

    tk.Button(menu_frame, text="شروع بازی 🕹️", command=start_game,
              font=FONT_MEDIUM,
              bg=graphics_settings["button_bg"], fg=graphics_settings["button_fg"],
              activebackground=graphics_settings["button_active_bg"],
              activeforeground=graphics_settings["button_active_fg"],
              relief="flat", width=15, cursor="hand2").pack(pady=5)

    def show_info():
        info_text = ("📘 راهنمای بازی حدس عدد پیشرفته:\n\n"
                     "🎯 **سیستم امتیازدهی:**\n"
                     "• امتیاز اولیه: 1000\n"
                     "• هر ثانیه: ۲- امتیاز\n"
                     "• هر تلاش: ۵۰- امتیاز\n\n"
                     "⏰ **تایمر:**\n"
                     "• زمان بازی محاسبه می‌شود\n"
                     "• هرچه سریع‌تر، امتیاز بیشتر\n\n"
                     "💡 **راهنمای هوشمند:**\n"
                     "• پس از هر حدس راهنمایی می‌گیرید\n"
                     "• می‌فهمید چقدر به جواب نزدیکید\n\n"
                     "🏆 **سیستم رکورد:**\n"
                     "• بهترین امتیازات ذخیره می‌شود\n"
                     "• برای هر محدوده عددی جداگانه")
        messagebox.showinfo("📘 توضیحات بازی پیشرفته", info_text)

    tk.Button(menu_frame, text="توضیحات ℹ️", command=show_info,
              font=FONT_SMALL, bg="#60a5fa", fg="white",
              activebackground="#2563eb", relief="flat", width=15, cursor="hand2").pack(pady=3)

    def show_high_scores_dialog():
        scores_text = show_high_scores()
        messagebox.showinfo("🏆 بهترین امتیازات", scores_text)

    tk.Button(menu_frame, text="بهترین امتیازات 🏆", command=show_high_scores_dialog,
              font=FONT_SMALL, bg="#a78bfa", fg="white",
              activebackground="#7c3aed", relief="flat", width=15, cursor="hand2").pack(pady=3)

    def open_settings():
        settings_win = tk.Toplevel(root)
        settings_win.title("⚙️ تنظیمات")
        settings_win.geometry(f"{graphics_settings['width']//2}x{graphics_settings['height']//2}")
        settings_win.config(bg="#f1f5f9")

        tk.Label(settings_win, text="🎨 تنظیمات گرافیک و رزولوشن", font=FONT_MEDIUM,
                 bg="#f1f5f9", fg="#1e3a8a").pack(pady=5)

        def change_bg():
            color = colorchooser.askcolor(title="انتخاب رنگ پس‌زمینه")[1]
            if color:
                graphics_settings["background_color"] = color
                root.config(bg=color)
                menu_frame.config(bg=color)
                for widget in menu_frame.winfo_children():
                    if isinstance(widget, tk.Label):
                        widget.config(bg=color)

        tk.Button(settings_win, text="تغییر رنگ پس‌زمینه 🌈", command=change_bg,
                  font=FONT_SMALL, bg="#38bdf8", fg="white",
                  activebackground="#0284c7", relief="flat", width=15).pack(pady=3)

        def change_button_color():
            color = colorchooser.askcolor(title="انتخاب رنگ دکمه")[1]
            if color:
                graphics_settings["button_bg"] = color
                for widget in menu_frame.winfo_children():
                    if isinstance(widget, tk.Button):
                        widget.config(bg=color)

        tk.Button(settings_win, text="تغییر رنگ دکمه‌ها 🎨", command=change_button_color,
                  font=FONT_SMALL, bg="#a78bfa", fg="white",
                  activebackground="#7c3aed", relief="flat", width=15).pack(pady=3)

        def change_resolution():
            w = simpledialog.askinteger("عرض", "عرض پنجره را وارد کنید:", minvalue=200, maxvalue=10000)
            h = simpledialog.askinteger("ارتفاع", "ارتفاع پنجره را وارد کنید:", minvalue=200, maxvalue=10000)
            if w and h:
                graphics_settings["width"] = w
                graphics_settings["height"] = h
                root.geometry(f"{w}x{h}")

        tk.Button(settings_win, text="تغییر رزولوشن 🖥️", command=change_resolution,
                  font=FONT_SMALL, bg="#facc15", fg="#1e293b",
                  activebackground="#ca8a04", relief="flat", width=15).pack(pady=3)

        tk.Button(settings_win, text="FPS 🔁", command=lambda: toggle_fps(fps_label),
                  font=FONT_SMALL, bg="#f87171", fg="white",
                  activebackground="#dc2626", relief="flat", width=15).pack(pady=3)

    tk.Button(menu_frame, text="⚙️ تنظیمات", command=open_settings,
              font=FONT_SMALL,
              bg="#facc15", fg="#1e293b",
              activebackground="#ca8a04", relief="flat",
              width=15, cursor="hand2").pack(pady=3)

    tk.Button(menu_frame, text="خروج 🚪", command=root.destroy,
              font=FONT_SMALL, bg="#f87171", fg="white",
              activebackground="#dc2626", relief="flat", width=15, cursor="hand2").pack(pady=3)

    tk.Label(root, text="سازنده و کارگردان: امیر محمد زکی‌زاده",
             font=FONT_SMALL, bg=graphics_settings["background_color"], fg="#1e3a8a").pack(side="bottom")
    tk.Label(root, text="نویسنده کد: امیر محمد زکی زاده",
             font=FONT_SMALL, bg=graphics_settings["background_color"], fg="#1e3a8a").pack(side="bottom")

    root.mainloop()

# =============================
# Splash Screen
# =============================
def splash_screen():
    splash = tk.Tk()
    splash.title("🎮 بازی حدس عدد - نسخه پیشرفته")
    width = graphics_settings["width"]
    height = graphics_settings["height"]
    splash.geometry(f"{width}x{height}")
    splash.configure(bg="#0B0C10")

    canvas = tk.Canvas(splash, width=width, height=height, bg="#0B0C10", highlightthickness=0)
    canvas.pack()

    lines = []
    for _ in range(30):
        x1, y1 = randint(0, width), randint(0, height)
        x2, y2 = randint(0, width), randint(0, height)
        color = choice(["#FF3C38", "#FFDD59", "#32FF7E", "#34ace0"])
        line = canvas.create_line(x1, y1, x2, y2, fill=color, width=2)
        lines.append(line)

    canvas.create_text(width//2, height//4, text="🎯 بازی حدس عدد پیشرفته",
                       fill="#FFD93D", font=FONT_LARGE)
    canvas.create_text(width//2, height//2, text="حالا با امتیاز، تایمر و راهنمای هوشمند!",
                       fill="#32FF7E", font=FONT_MEDIUM)

    btn_enter = tk.Button(splash, text="ورود به بازی 🚀",
                          font=FONT_MEDIUM,
                          bg="#4D96FF", fg="white",
                          activebackground="#1E90FF",
                          relief="flat", padx=10, pady=5, cursor="hand2",
                          command=lambda: [splash.destroy(), main_menu()])
    canvas.create_window(width//2, height*3//4, window=btn_enter)

    def animate_lines():
        for line in lines:
            dx, dy = randint(-2, 2), randint(-2, 2)
            canvas.move(line, dx, dy)
        splash.after(50, animate_lines)

    animate_lines()
    splash.mainloop()

# =============================
# شروع بازی
# =============================
if __name__ == "__main__":
    splash_screen()
