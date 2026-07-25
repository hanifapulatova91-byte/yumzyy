// All UI strings for YumZy in EN / RU / UZ.
// Any string shown to the user should live here — never hardcode text in JSX.

export const translations = {
  en: {
    // Brand
    app_name: "YumZy",
    tagline: "Eat safely, anywhere.",
    smart_assistant: "Your allergy-safe food assistant",

    // Landing
    get_started: "Get Started",
    have_account: "I already have an account",
    continue_as: "Continue as",
    switch_account: "Switch account",
    log_in: "Log In",
    sign_up: "Sign Up",
    continue_guest: "Continue without an account",

    // Auth
    email_label: "Email",
    password_label: "Password",
    name_label: "Name",
    creating_account: "Creating account...",
    logging_in: "Logging in...",
    fill_fields: "Please fill in all fields.",
    already_exists: "Account already exists. Please log in.",
    incorrect_credentials: "Incorrect email or password.",
    signup_failed: "Registration failed. Please try again.",
    no_account_yet: "Don't have an account?",
    already_have_account: "Already have an account?",

    // Allergen setup
    setup_title: "What are you allergic to?",
    setup_subtitle: "Add every allergen so we can keep you safe.",
    add_new: "Add allergen (e.g. Walnuts)",
    common_suspects: "Common allergens",
    save_finish: "Save & continue",
    moderate: "Moderate",
    medium: "Medium",
    severe: "Severe",
    not_sure_link: "Not sure what you're allergic to? Try the symptom checker →",
    back: "Back",
    at_least_one_allergen: "Add at least one allergen to continue.",

    // Allergen names (canonical English keys — storage stays English)
    allergen_peanuts: "Peanuts",
    allergen_soy: "Soy",
    allergen_seafood: "Seafood",
    allergen_dairy: "Dairy",
    allergen_fish: "Fish",
    allergen_gluten: "Gluten",
    allergen_eggs: "Eggs",
    allergen_sesame: "Sesame",
    allergen_nuts: "Tree nuts",
    allergen_wheat: "Wheat",
    allergen_shellfish: "Shellfish",
    allergen_milk: "Milk",

    // Symptom checker
    checker_title: "Symptom checker",
    checker_desc: "Describe what you ate and how you reacted...",
    check_prob: "Check probability",
    analyzing: "Analyzing...",
    add_profile: "Add to my allergens",
    likely: "likely",
    please_describe_symptoms: "Please describe your symptoms first.",
    close: "Close",

    // Profile
    profile_title: "My Profile",
    profile_desc: "Your account and allergy details.",
    allergens_label: "Allergens",
    edit_allergens: "Edit allergens",
    not_set: "Not set",
    no_allergens_saved: "No allergens saved yet.",
    edit: "Edit",
    cancel: "Cancel",
    save: "Save",
    log_out: "Log out",

    // Dashboard
    greeting: "Hello",
    scanner: "Scanner",
    recipes: "Recipes",
    chat: "Chat",
    notes: "Grocery list",
    articles: "Health articles",
    emergency: "Emergency",
    profile: "Profile",
    scan_short_desc: "Scan a barcode or ingredients",
    chat_short_desc: "Ask our AI nutritionist",

    // Scanner
    scan_product: "Scan a product",
    scan_desc: "Point your camera at a barcode, snap the ingredients, or type a code.",
    open_cam: "Open camera",
    cancel_cam: "Cancel",
    manual_code: "Enter barcode",
    submit_code: "Submit",
    back_home: "Back to home",
    processing: "Processing...",
    upload_photo: "Upload photo",
    or: "or",
    go: "Go",
    camera_error: "Could not access the camera. Please grant permission and try again.",
    no_barcode_in_image: "Couldn't find a barcode in this image. Try a clearer, well-lit photo.",

    // Scan result
    scan_result_title: "Scan result",
    safe: "Safe",
    caution: "Caution",
    dangerous: "Dangerous",
    ingredients: "Ingredients",
    allergen_flags: "Detected allergens",
    not_found: "Product not found",
    scan_another: "Scan another product",
    none: "None",
    not_listed: "Not listed",
    no_matched_allergens: "No matched allergens were detected.",
    product_contains_allergens: "This product contains one of your allergens.",
    product_not_loaded: "We couldn't find this product in our database.",
    no_scan_result: "No scan result yet.",
    safe_alternatives: "Safe alternatives",
    photo_ingredients_title: "Snap the ingredient list",
    photo_ingredients_desc: "Our AI will read the ingredients and check for your allergens.",
    upload_ingredient_photo: "Upload ingredient photo",
    analyzing_ingredients: "Analyzing ingredients...",
    photo_upload_failed: "Failed to analyze that image. Try again.",

    // Recipes
    recipe_title: "Recipe generator",
    recipe_subtitle: "Tell us what's in your fridge — we'll cook up ideas.",
    recipe_prompt: "Enter your ingredients (comma-separated) and we'll generate allergen-safe recipes just for you.",
    recipe_placeholder: "e.g. Chicken, rice, broccoli, garlic, olive oil, lemon...",
    generate_recipes: "Generate recipes",
    generating_recipes: "Generating recipes...",
    please_enter_ingredients: "Please enter some ingredients.",
    recipes_generated: "Recipes generated",
    recipe_ingredients: "Ingredients",
    recipe_instructions: "Instructions",
    view_full_recipe: "View full recipe",
    hide_details: "Hide details",
    servings: "servings",
    recipe_failed: "Couldn't generate recipes. Try again.",

    // Chat
    chat_title: "YumZy Assistant",
    chat_subtitle: "Your AI food expert",
    chat_greeting: "Hi! I'm YumZy — your personal AI nutritionist. Ask me anything about food, ingredients, or recipes!",
    ask_yumzy: "Ask about ingredients, recipes, or diet...",
    chat_error: "Oops — something went wrong. Please try sending that again.",

    // Notes / grocery list
    grocery_list: "Grocery list",
    items_left: "items left",
    add_new_item: "Add new item...",

    // Articles
    articles_title: "Health tips & research",
    article_reading: "Reading",
    article_by: "By",
    article_references: "References",

    // Emergency
    emergency_help: "Emergency help",
    emergency_desc: "If you're having a severe allergic reaction, get medical help now.",
    call_103: "Call 103",
    call_doctor: "Call doctor",
    call: "Call",
    watch_symptoms: "Watch for severe symptoms",
    symptoms_list: "Trouble breathing, swelling of the lips or throat, fainting, severe dizziness, repeated vomiting, or collapse.",
    immediate_steps: "Immediate steps",
    step1: "1. Stop eating the food.",
    step2: "2. Use your prescribed emergency medicine if you have it.",
    step3: "3. Call emergency services (103) immediately.",
    step4: "4. Stay with a trusted person until help arrives.",
    your_allergens: "Your allergens",
    no_allergens_saved_short: "None saved",
    contact_1: "Close contact 1",
    contact_2: "Close contact 2",
    doctor_number: "Doctor's number",
    doctor_number_placeholder: "Doctor's phone number",
    contact_name: "Name",
    contact_number: "Phone number",
    save_contacts: "Save emergency contacts",
    contacts_saved: "Emergency contacts saved.",

    // Generic
    loading: "Loading...",
    finish: "Finish",
    go_back: "Go back",
  },

  ru: {
    // Brand
    app_name: "YumZy",
    tagline: "Ешь безопасно, где бы ты ни был.",
    smart_assistant: "Твой помощник для безопасной еды",

    // Landing
    get_started: "Начать",
    have_account: "У меня уже есть аккаунт",
    continue_as: "Продолжить как",
    switch_account: "Сменить аккаунт",
    log_in: "Войти",
    sign_up: "Регистрация",
    continue_guest: "Продолжить без аккаунта",

    // Auth
    email_label: "Электронная почта",
    password_label: "Пароль",
    name_label: "Имя",
    creating_account: "Создаём аккаунт...",
    logging_in: "Входим...",
    fill_fields: "Пожалуйста, заполните все поля.",
    already_exists: "Такой аккаунт уже есть. Пожалуйста, войдите.",
    incorrect_credentials: "Неверная почта или пароль.",
    signup_failed: "Не удалось зарегистрироваться. Попробуйте ещё раз.",
    no_account_yet: "Нет аккаунта?",
    already_have_account: "Уже есть аккаунт?",

    // Allergen setup
    setup_title: "На что у вас аллергия?",
    setup_subtitle: "Добавьте все аллергены, чтобы мы вас берегли.",
    add_new: "Добавить аллерген (напр. Грецкий орех)",
    common_suspects: "Частые аллергены",
    save_finish: "Сохранить и продолжить",
    moderate: "Лёгкая",
    medium: "Средняя",
    severe: "Сильная",
    not_sure_link: "Не знаете, на что аллергия? Пройдите проверку симптомов →",
    back: "Назад",
    at_least_one_allergen: "Добавьте хотя бы один аллерген, чтобы продолжить.",

    // Allergen names
    allergen_peanuts: "Арахис",
    allergen_soy: "Соя",
    allergen_seafood: "Морепродукты",
    allergen_dairy: "Молочное",
    allergen_fish: "Рыба",
    allergen_gluten: "Глютен",
    allergen_eggs: "Яйца",
    allergen_sesame: "Кунжут",
    allergen_nuts: "Орехи",
    allergen_wheat: "Пшеница",
    allergen_shellfish: "Моллюски",
    allergen_milk: "Молоко",

    // Symptom checker
    checker_title: "Проверка симптомов",
    checker_desc: "Опишите, что вы ели и как отреагировал организм...",
    check_prob: "Проверить вероятность",
    analyzing: "Анализируем...",
    add_profile: "Добавить в мои аллергены",
    likely: "вероятно",
    please_describe_symptoms: "Пожалуйста, сначала опишите симптомы.",
    close: "Закрыть",

    // Profile
    profile_title: "Мой профиль",
    profile_desc: "Ваш аккаунт и данные об аллергии.",
    allergens_label: "Аллергены",
    edit_allergens: "Изменить аллергены",
    not_set: "Не задано",
    no_allergens_saved: "Аллергены ещё не добавлены.",
    edit: "Изменить",
    cancel: "Отмена",
    save: "Сохранить",
    log_out: "Выйти",

    // Dashboard
    greeting: "Привет",
    scanner: "Сканер",
    recipes: "Рецепты",
    chat: "Чат",
    notes: "Список покупок",
    articles: "Полезные статьи",
    emergency: "SOS",
    profile: "Профиль",
    scan_short_desc: "Сканируйте штрихкод или состав",
    chat_short_desc: "Спросите ИИ-нутрициолога",

    // Scanner
    scan_product: "Сканирование продукта",
    scan_desc: "Наведите камеру на штрихкод, сфотографируйте состав или введите код вручную.",
    open_cam: "Открыть камеру",
    cancel_cam: "Отмена",
    manual_code: "Введите штрихкод",
    submit_code: "Отправить",
    back_home: "На главную",
    processing: "Обрабатываем...",
    upload_photo: "Загрузить фото",
    or: "или",
    go: "Ок",
    camera_error: "Нет доступа к камере. Разрешите доступ и попробуйте снова.",
    no_barcode_in_image: "Штрихкод не найден на фото. Попробуйте более чёткое изображение.",

    // Scan result
    scan_result_title: "Результат",
    safe: "Безопасно",
    caution: "Осторожно",
    dangerous: "Опасно",
    ingredients: "Состав",
    allergen_flags: "Найденные аллергены",
    not_found: "Продукт не найден",
    scan_another: "Сканировать ещё",
    none: "Нет",
    not_listed: "Не указано",
    no_matched_allergens: "Совпадений с вашими аллергенами не найдено.",
    product_contains_allergens: "Этот продукт содержит один из ваших аллергенов.",
    product_not_loaded: "Мы не нашли этот продукт в базе.",
    no_scan_result: "Ещё нет результата сканирования.",
    safe_alternatives: "Безопасные альтернативы",
    photo_ingredients_title: "Сфотографируйте состав",
    photo_ingredients_desc: "ИИ прочитает ингредиенты и проверит их на ваши аллергены.",
    upload_ingredient_photo: "Загрузить фото состава",
    analyzing_ingredients: "Анализируем ингредиенты...",
    photo_upload_failed: "Не удалось проанализировать фото. Попробуйте ещё раз.",

    // Recipes
    recipe_title: "Генератор рецептов",
    recipe_subtitle: "Расскажите, что есть в холодильнике — мы придумаем блюдо.",
    recipe_prompt: "Введите ингредиенты через запятую — мы предложим безопасные рецепты.",
    recipe_placeholder: "напр. Курица, рис, брокколи, чеснок, оливковое масло, лимон...",
    generate_recipes: "Сгенерировать рецепты",
    generating_recipes: "Генерируем рецепты...",
    please_enter_ingredients: "Пожалуйста, введите ингредиенты.",
    recipes_generated: "Рецепты готовы",
    recipe_ingredients: "Ингредиенты",
    recipe_instructions: "Приготовление",
    view_full_recipe: "Показать полностью",
    hide_details: "Скрыть",
    servings: "порций",
    recipe_failed: "Не удалось сгенерировать рецепты. Попробуйте ещё раз.",

    // Chat
    chat_title: "Помощник YumZy",
    chat_subtitle: "ИИ-эксперт по еде",
    chat_greeting: "Привет! Я YumZy — твой личный ИИ-нутрициолог. Спрашивай что угодно о еде, ингредиентах и рецептах!",
    ask_yumzy: "Спросите о продуктах, рецептах, диете...",
    chat_error: "Ой — что-то пошло не так. Попробуйте отправить сообщение ещё раз.",

    // Notes
    grocery_list: "Список покупок",
    items_left: "осталось",
    add_new_item: "Добавить пункт...",

    // Articles
    articles_title: "Здоровье и исследования",
    article_reading: "Читаем",
    article_by: "Автор:",
    article_references: "Источники",

    // Emergency
    emergency_help: "Экстренная помощь",
    emergency_desc: "При тяжёлой аллергической реакции немедленно обратитесь за медицинской помощью.",
    call_103: "Позвонить 103",
    call_doctor: "Позвонить врачу",
    call: "Позвонить",
    watch_symptoms: "Следите за тяжёлыми симптомами",
    symptoms_list: "Затруднённое дыхание, отёк губ или горла, обморок, сильное головокружение, повторная рвота или потеря сознания.",
    immediate_steps: "Что делать сразу",
    step1: "1. Прекратите есть этот продукт.",
    step2: "2. Используйте назначенный экстренный препарат, если он у вас есть.",
    step3: "3. Немедленно вызовите скорую (103).",
    step4: "4. Оставайтесь с кем-то, кому доверяете, до приезда помощи.",
    your_allergens: "Ваши аллергены",
    no_allergens_saved_short: "Не сохранены",
    contact_1: "Близкий контакт 1",
    contact_2: "Близкий контакт 2",
    doctor_number: "Номер врача",
    doctor_number_placeholder: "Телефон врача",
    contact_name: "Имя",
    contact_number: "Телефон",
    save_contacts: "Сохранить экстренные контакты",
    contacts_saved: "Экстренные контакты сохранены.",

    // Generic
    loading: "Загрузка...",
    finish: "Готово",
    go_back: "Назад",
  },

  uz: {
    // Brand
    app_name: "YumZy",
    tagline: "Qayerda bo'lsangiz ham xavfsiz ovqatlaning.",
    smart_assistant: "Allergiyaga qarshi ovqat yordamchingiz",

    // Landing
    get_started: "Boshlash",
    have_account: "Menda allaqachon akkaunt bor",
    continue_as: "Davom etish:",
    switch_account: "Akkauntni almashtirish",
    log_in: "Kirish",
    sign_up: "Ro'yxatdan o'tish",
    continue_guest: "Akkauntsiz davom etish",

    // Auth
    email_label: "Elektron pochta",
    password_label: "Parol",
    name_label: "Ism",
    creating_account: "Akkaunt yaratilmoqda...",
    logging_in: "Kirilmoqda...",
    fill_fields: "Iltimos, barcha maydonlarni to'ldiring.",
    already_exists: "Bunday akkaunt allaqachon mavjud. Iltimos, kiring.",
    incorrect_credentials: "Elektron pochta yoki parol noto'g'ri.",
    signup_failed: "Ro'yxatdan o'tishda xatolik. Qayta urinib ko'ring.",
    no_account_yet: "Akkauntingiz yo'qmi?",
    already_have_account: "Akkauntingiz bormi?",

    // Allergen setup
    setup_title: "Sizda nimaga allergiya bor?",
    setup_subtitle: "Sizni himoya qilishimiz uchun barcha allergenlarni qo'shing.",
    add_new: "Allergen qo'shish (mas. Yong'oq)",
    common_suspects: "Ko'p uchraydigan allergenlar",
    save_finish: "Saqlash va davom etish",
    moderate: "Yengil",
    medium: "O'rta",
    severe: "Kuchli",
    not_sure_link: "Nimaga allergiya ekanini bilmaysizmi? Simptom tekshiruvidan foydalaning →",
    back: "Orqaga",
    at_least_one_allergen: "Davom etish uchun kamida bitta allergen qo'shing.",

    // Allergen names
    allergen_peanuts: "Yeryong'oq",
    allergen_soy: "Soya",
    allergen_seafood: "Dengiz mahsulotlari",
    allergen_dairy: "Sut mahsulotlari",
    allergen_fish: "Baliq",
    allergen_gluten: "Glyuten",
    allergen_eggs: "Tuxum",
    allergen_sesame: "Kunjut",
    allergen_nuts: "Yong'oqlar",
    allergen_wheat: "Bug'doy",
    allergen_shellfish: "Qisqichbaqasimonlar",
    allergen_milk: "Sut",

    // Symptom checker
    checker_title: "Simptom tekshiruvi",
    checker_desc: "Nima yeganingiz va qanday ta'sir qilganini yozing...",
    check_prob: "Ehtimolni tekshirish",
    analyzing: "Tahlil qilinmoqda...",
    add_profile: "Allergenlarimga qo'shish",
    likely: "ehtimol",
    please_describe_symptoms: "Iltimos, avval simptomlaringizni yozing.",
    close: "Yopish",

    // Profile
    profile_title: "Mening profilim",
    profile_desc: "Akkaunt va allergiya ma'lumotlaringiz.",
    allergens_label: "Allergenlar",
    edit_allergens: "Allergenlarni tahrirlash",
    not_set: "Ko'rsatilmagan",
    no_allergens_saved: "Hozircha allergen saqlanmagan.",
    edit: "Tahrirlash",
    cancel: "Bekor qilish",
    save: "Saqlash",
    log_out: "Chiqish",

    // Dashboard
    greeting: "Assalomu alaykum",
    scanner: "Skaner",
    recipes: "Retseptlar",
    chat: "Chat",
    notes: "Xarid ro'yxati",
    articles: "Foydali maqolalar",
    emergency: "SOS",
    profile: "Profil",
    scan_short_desc: "Shtrix-kod yoki tarkibni skanerlang",
    chat_short_desc: "AI ovqatlanish maslahatchisi bilan gaplashing",

    // Scanner
    scan_product: "Mahsulotni skanerlash",
    scan_desc: "Kamerani shtrix-kodga qarating, tarkibni suratga oling yoki kodni qo'lda kiriting.",
    open_cam: "Kamerani ochish",
    cancel_cam: "Bekor qilish",
    manual_code: "Shtrix-kodni kiriting",
    submit_code: "Yuborish",
    back_home: "Bosh sahifaga",
    processing: "Qayta ishlanmoqda...",
    upload_photo: "Rasm yuklash",
    or: "yoki",
    go: "Ok",
    camera_error: "Kameraga kira olmadik. Iltimos, ruxsat bering va qayta urinib ko'ring.",
    no_barcode_in_image: "Rasmda shtrix-kod topilmadi. Yorug'roq va aniqroq rasmni sinab ko'ring.",

    // Scan result
    scan_result_title: "Natija",
    safe: "Xavfsiz",
    caution: "Ehtiyot bo'ling",
    dangerous: "Xavfli",
    ingredients: "Tarkibi",
    allergen_flags: "Topilgan allergenlar",
    not_found: "Mahsulot topilmadi",
    scan_another: "Yana skanerlash",
    none: "Yo'q",
    not_listed: "Ko'rsatilmagan",
    no_matched_allergens: "Sizning allergenlaringiz aniqlanmadi.",
    product_contains_allergens: "Bu mahsulotda sizning allergenlaringizdan biri bor.",
    product_not_loaded: "Bu mahsulot bizning bazamizda topilmadi.",
    no_scan_result: "Hali skanerlash natijasi yo'q.",
    safe_alternatives: "Xavfsiz alternativalar",
    photo_ingredients_title: "Tarkib ro'yxatini suratga oling",
    photo_ingredients_desc: "AI tarkibni o'qib, sizning allergenlaringizga tekshiradi.",
    upload_ingredient_photo: "Tarkib rasmini yuklash",
    analyzing_ingredients: "Tarkib tahlil qilinmoqda...",
    photo_upload_failed: "Rasmni tahlil qila olmadik. Qayta urinib ko'ring.",

    // Recipes
    recipe_title: "Retsept generatori",
    recipe_subtitle: "Muzlatgichda nima borligini ayting — g'oyalar tayyorlaymiz.",
    recipe_prompt: "Ingrediyentlarni vergul bilan ajratib yozing — biz xavfsiz retseptlarni tavsiya qilamiz.",
    recipe_placeholder: "mas. Tovuq, guruch, brokkoli, sarimsoq, zaytun moyi, limon...",
    generate_recipes: "Retseptlar yaratish",
    generating_recipes: "Retseptlar yaratilmoqda...",
    please_enter_ingredients: "Iltimos, ingrediyentlarni kiriting.",
    recipes_generated: "Retseptlar tayyor",
    recipe_ingredients: "Ingrediyentlar",
    recipe_instructions: "Tayyorlash",
    view_full_recipe: "To'liq ko'rish",
    hide_details: "Yopish",
    servings: "porsiya",
    recipe_failed: "Retseptlarni yarata olmadik. Qayta urinib ko'ring.",

    // Chat
    chat_title: "YumZy yordamchisi",
    chat_subtitle: "Ovqat bo'yicha AI ekspert",
    chat_greeting: "Salom! Men YumZy — sizning shaxsiy AI nutritsiologingiz. Ovqat, tarkib va retseptlar haqida bemalol so'rang!",
    ask_yumzy: "Tarkib, retseptlar yoki parhez haqida so'rang...",
    chat_error: "Uf — nimadir noto'g'ri ketdi. Iltimos, xabarni yana yuboring.",

    // Notes
    grocery_list: "Xarid ro'yxati",
    items_left: "qoldi",
    add_new_item: "Yangi qo'shish...",

    // Articles
    articles_title: "Sog'liq bo'yicha maslahatlar",
    article_reading: "O'qilyapti",
    article_by: "Muallif:",
    article_references: "Manbalar",

    // Emergency
    emergency_help: "Shoshilinch yordam",
    emergency_desc: "Og'ir allergik reaksiya bo'lsa, darhol tibbiy yordamga murojaat qiling.",
    call_103: "103 ga qo'ng'iroq qilish",
    call_doctor: "Shifokorga qo'ng'iroq",
    call: "Qo'ng'iroq",
    watch_symptoms: "Og'ir simptomlarga e'tibor bering",
    symptoms_list: "Nafas olishning qiyinlashishi, lab yoki tomoqning shishishi, hushdan ketish, kuchli bosh aylanishi, qayta qusish yoki yiqilish.",
    immediate_steps: "Darhol nima qilish kerak",
    step1: "1. Bu mahsulotni yeyishni to'xtating.",
    step2: "2. Agar buyurilgan shoshilinch dori bo'lsa, foydalaning.",
    step3: "3. Darhol tez yordamga (103) qo'ng'iroq qiling.",
    step4: "4. Yordam kelguncha ishonchli odam bilan qoling.",
    your_allergens: "Sizning allergenlaringiz",
    no_allergens_saved_short: "Saqlanmagan",
    contact_1: "Yaqin odam 1",
    contact_2: "Yaqin odam 2",
    doctor_number: "Shifokor raqami",
    doctor_number_placeholder: "Shifokor telefoni",
    contact_name: "Ism",
    contact_number: "Telefon raqami",
    save_contacts: "Shoshilinch kontaktlarni saqlash",
    contacts_saved: "Shoshilinch kontaktlar saqlandi.",

    // Generic
    loading: "Yuklanmoqda...",
    finish: "Tayyor",
    go_back: "Orqaga",
  },
};

// Language display names for the switcher
export const LANG_NAMES = {
  en: "EN",
  ru: "РУ",
  uz: "UZ",
};

export const LANG_ORDER = ["en", "ru", "uz"];

// Return t(key) for a given language, falling back to EN, then key itself.
export const makeT = (lang) => (key) => {
  const dict = translations[lang] || translations.en;
  return dict[key] ?? translations.en[key] ?? key;
};

// Localized display name for an allergen. Storage stays canonical English;
// only presentation is translated. Custom user-entered names fall through unchanged.
export const localizeAllergen = (name, t) => {
  if (!name) return '';
  const key = `allergen_${String(name).trim().toLowerCase().replace(/\s+/g, '_')}`;
  const translated = t(key);
  return translated === key ? name : translated;
};
