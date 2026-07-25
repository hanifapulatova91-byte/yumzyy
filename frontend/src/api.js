const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Demo-mode fallbacks are used when the real backend can't be reached
// (e.g. GitHub Pages deploy without a hosted server). Any endpoint that
// throws / times out will fall back to canned data flagged _demo: true.

let demoMode = false;

const getLang = () => (typeof window !== 'undefined' && window.localStorage.getItem('yumzy_lang')) || 'en';

const getHeaders = () => {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('yumzy_token') : null;
  return {
    'Content-Type': 'application/json',
    'Accept-Language': getLang(),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- Demo data (localized) ----

const pick = (lang, dict) => dict[lang] || dict.en;

const demoScanResult = (barcode, allergens) => {
  const lang = getLang();
  const hasDairy = allergens.some((a) => /dairy|milk|молоч|sut/i.test(a));
  const risky = hasDairy || String(barcode).endsWith('7');
  return {
    _demo: true,
    found: true,
    barcode,
    product: {
      name: pick(lang, {
        en: 'Chocolate Milk Cookies',
        ru: 'Шоколадное молочное печенье',
        uz: "Sutli shokoladli pechene",
      }),
      brand: 'DemoBrand',
      image: null,
      ingredients: pick(lang, {
        en: 'Wheat flour, sugar, cocoa, milk powder, palm oil, salt, baking soda.',
        ru: 'Пшеничная мука, сахар, какао, сухое молоко, пальмовое масло, соль, сода.',
        uz: "Bug'doy uni, shakar, kakao, quruq sut, palma yog'i, tuz, soda.",
      }),
    },
    analysis: {
      riskLevel: risky ? 'dangerous' : 'safe',
      safe: !risky,
      allergenFlags: risky ? [pick(lang, { en: 'Milk powder', ru: 'Сухое молоко', uz: 'Quruq sut' })] : [],
      safeAlternatives: risky
        ? [
            pick(lang, { en: 'Oat cookies', ru: 'Овсяное печенье', uz: 'Suli pecheneye' }),
            pick(lang, { en: 'Rice crackers', ru: 'Рисовые крекеры', uz: 'Guruch krakerlari' }),
          ]
        : [],
      summary: risky
        ? pick(lang, {
            en: 'This product contains milk powder, which matches your dairy allergy.',
            ru: 'В этом продукте есть сухое молоко — совпадает с вашей аллергией.',
            uz: "Bu mahsulotda quruq sut bor — sizning allergiyangizga to'g'ri keladi.",
          })
        : pick(lang, {
            en: 'No matches with your allergens were found in the ingredients.',
            ru: 'Совпадений с вашими аллергенами в составе не найдено.',
            uz: 'Tarkibda sizning allergenlaringiz aniqlanmadi.',
          }),
    },
  };
};

const demoVisionResult = (allergens) => {
  const lang = getLang();
  const hasPeanut = allergens.some((a) => /peanut|арахис|yeryong/i.test(a));
  return {
    _demo: true,
    found: true,
    product: {
      name: pick(lang, { en: 'Photo scan', ru: 'Фото-скан', uz: 'Foto-skan' }),
      brand: pick(lang, { en: 'Analyzed from photo', ru: 'Прочитано с фото', uz: "Rasmdan o'qildi" }),
      image: null,
      ingredients: pick(lang, {
        en: 'Sugar, wheat flour, peanuts, cocoa butter, vanilla, emulsifier (soy lecithin).',
        ru: 'Сахар, пшеничная мука, арахис, какао-масло, ваниль, эмульгатор (соевый лецитин).',
        uz: "Shakar, bug'doy uni, yeryong'oq, kakao yog'i, vanil, emulgator (soya letsitini).",
      }),
    },
    analysis: {
      riskLevel: hasPeanut ? 'dangerous' : 'caution',
      safe: false,
      allergenFlags: hasPeanut
        ? [pick(lang, { en: 'Peanuts', ru: 'Арахис', uz: "Yeryong'oq" })]
        : [pick(lang, { en: 'Soy lecithin', ru: 'Соевый лецитин', uz: 'Soya letsitini' })],
      safeAlternatives: [
        pick(lang, { en: 'Rice cakes', ru: 'Рисовые хлебцы', uz: 'Guruch nonlari' }),
        pick(lang, { en: 'Fresh fruit', ru: 'Свежие фрукты', uz: 'Yangi mevalar' }),
      ],
      summary: hasPeanut
        ? pick(lang, {
            en: 'Peanuts are listed in the ingredients — this matches your allergy.',
            ru: 'В составе есть арахис — совпадает с вашей аллергией.',
            uz: "Tarkibda yeryong'oq bor — sizning allergiyangizga to'g'ri keladi.",
          })
        : pick(lang, {
            en: 'Contains soy lecithin — check the label if you avoid soy.',
            ru: 'Содержит соевый лецитин — проверьте этикетку, если избегаете сою.',
            uz: 'Soya letsitini bor — soyadan qochsangiz, yorliqni tekshiring.',
          }),
    },
  };
};

const demoChatReply = () => {
  const lang = getLang();
  return {
    _demo: true,
    reply: pick(lang, {
      en: "Hi! 🦥 Great question. Since you may be avoiding dairy, try oat milk in your smoothie — it froths nicely and has no lactose. If you'd like a full recipe, I've got you covered! 🥤",
      ru: "Привет! 🦥 Хороший вопрос. Раз вы избегаете молочное, попробуйте овсяное молоко в смузи — оно отлично взбивается и без лактозы. Если хотите полный рецепт, я подкину! 🥤",
      uz: "Salom! 🦥 Ajoyib savol. Sut mahsulotlaridan qochsangiz, smuzida suli sutini sinab ko'ring — u yaxshi ko'piradi va laktozasiz. Agar to'liq retsept kerak bo'lsa, tayyor turibman! 🥤",
    }),
  };
};

const demoRecipes = (ingredients) => {
  const lang = getLang();
  const main = ingredients[0] || (lang === 'ru' ? 'курица' : lang === 'uz' ? 'tovuq' : 'chicken');
  const R = (en, ru, uz) => pick(lang, { en, ru, uz });
  return {
    _demo: true,
    recipes: [
      {
        recipeName: R(`Simple ${main} bowl`, `Простая миска с ${main}`, `Sodda ${main} kosasi`),
        description: R(
          'A quick allergen-safe bowl with roasted vegetables and lemon dressing.',
          'Быстрая безопасная миска с запечёнными овощами и лимонной заправкой.',
          "Tez va allergensiz kosa: pishirilgan sabzavotlar va limon souslari bilan."
        ),
        cookingTime: '25 min',
        servings: 2,
        safetyNote: R(
          'Uses no dairy, no gluten, no peanuts — safe for your listed allergens.',
          'Без молочного, без глютена, без арахиса — безопасно для ваших аллергенов.',
          "Sut mahsulotlarisiz, glyutensiz, yeryong'oqsiz — allergenlaringiz uchun xavfsiz."
        ),
        ingredients: [
          { amount: R('1 cup', '1 стакан', '1 stakan'), name: main },
          { amount: R('2 tbsp', '2 ст.л.', '2 osh.q.'), name: R('olive oil', 'оливковое масло', 'zaytun moyi') },
          { amount: R('1', '1', '1'), name: R('lemon', 'лимон', 'limon') },
          { amount: R('to taste', 'по вкусу', "ta'bga qarab"), name: R('salt & pepper', 'соль и перец', 'tuz va murch') },
        ],
        steps: [
          R('Chop the main ingredient into bite-size pieces.', 'Нарежьте основной ингредиент кусочками.', "Asosiy mahsulotni kichik bo'laklarga bo'ling."),
          R('Toss with olive oil, salt and pepper.', 'Смешайте с оливковым маслом, солью и перцем.', 'Zaytun moyi, tuz va murch bilan aralashtiring.'),
          R('Bake at 200°C for 20 minutes.', 'Запекайте при 200°C 20 минут.', "200°C da 20 daqiqa pishiring."),
          R('Finish with a squeeze of lemon and serve.', 'Полейте лимонным соком и подавайте.', "Limon suvi sepib, dasturxonga tortishing."),
        ],
      },
      {
        recipeName: R('Warm veggie salad', 'Тёплый овощной салат', 'Iliq sabzavot salati'),
        description: R('Colorful, filling, and naturally free from top allergens.', 'Яркий, сытный, без основных аллергенов.', "Rang-barang, to'yimli, asosiy allergenlarsiz."),
        cookingTime: '15 min',
        servings: 2,
        safetyNote: R('Naturally allergen-safe.', 'Естественно безопасен от аллергенов.', 'Tabiiy ravishda xavfsiz.'),
        ingredients: [
          { amount: R('2', '2', '2'), name: R('carrots', 'моркови', 'sabzi') },
          { amount: R('1', '1', '1'), name: R('zucchini', 'кабачок', 'kabachok') },
          { amount: R('a handful', 'горсть', 'bir hovuch'), name: R('spinach', 'шпинат', 'ismaloq') },
        ],
        steps: [
          R('Slice all vegetables thinly.', 'Тонко нарежьте овощи.', 'Barcha sabzavotlarni yupqa to\'g\'rang.'),
          R('Sauté in a pan with olive oil for 10 minutes.', 'Обжарьте на оливковом масле 10 минут.', "Zaytun moyida 10 daqiqa qovuring."),
          R('Season and serve warm.', 'Приправьте и подавайте тёплым.', "Ziravorlab, issiq holda taqdim eting."),
        ],
      },
      {
        recipeName: R('Rice comfort bowl', 'Уютная миска с рисом', 'Guruchli qulay kosa'),
        description: R('Cozy rice dish, safe for most allergens.', 'Уютное рисовое блюдо, безопасно для большинства аллергенов.', "Qulay guruchli taom, ko'p allergenlar uchun xavfsiz."),
        cookingTime: '30 min',
        servings: 3,
        safetyNote: R('Contains no wheat, dairy, nuts.', 'Без пшеницы, молочного и орехов.', "Bug'doy, sut, yong'oqsiz."),
        ingredients: [
          { amount: R('1 cup', '1 стакан', '1 stakan'), name: R('white rice', 'белый рис', 'oq guruch') },
          { amount: R('2 cups', '2 стакана', '2 stakan'), name: R('water or broth', 'вода или бульон', "suv yoki qaynatma") },
          { amount: R('1', '1', '1'), name: R('onion', 'луковица', 'piyoz') },
        ],
        steps: [
          R('Rinse the rice under cold water.', 'Промойте рис холодной водой.', "Guruchni sovuq suvda yuving."),
          R('Sauté onion until translucent.', 'Обжарьте лук до прозрачности.', "Piyozni tiniqlashguncha qovuring."),
          R('Add rice and liquid, simmer covered for 20 minutes.', 'Добавьте рис и жидкость, тушите под крышкой 20 минут.', "Guruch va suyuqlik qo'shing, yopiq holda 20 daqiqa qaynating."),
          R('Fluff with a fork and serve.', 'Взбейте вилкой и подавайте.', "Vilka bilan yumshating va taqdim eting."),
        ],
      },
    ],
  };
};

const demoSymptom = () => {
  const lang = getLang();
  return {
    _demo: true,
    name: pick(lang, { en: 'Dairy', ru: 'Молочное', uz: 'Sut mahsulotlari' }),
    percent: '72%',
    note: pick(lang, {
      en: 'The reaction pattern is consistent with lactose intolerance or a mild dairy allergy. Please consult a doctor for a definitive diagnosis.',
      ru: 'Симптомы похожи на непереносимость лактозы или лёгкую аллергию на молочное. Для точного диагноза обратитесь к врачу.',
      uz: "Simptomlar laktoza chidamsizligi yoki yengil sut allergiyasiga o'xshaydi. Aniq tashxis uchun shifokorga murojaat qiling.",
    }),
  };
};

// ---- Wrapper: try real API, fall back to demo ----

const tryFetch = async (url, options, demoFn) => {
  if (demoMode) {
    await wait(400);
    return demoFn();
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const body = await res.json();
        throw new Error(body.message || `Request failed (${res.status})`);
      }
      throw new Error(`Server error (${res.status})`);
    }
    return res.json();
  } catch (err) {
    // Network / CORS / timeout → drop into demo mode from now on
    if (
      err.name === 'AbortError' ||
      err.name === 'TypeError' ||
      /Failed to fetch|NetworkError/.test(err.message || '')
    ) {
      demoMode = true;
      if (typeof window !== 'undefined') window.__yumzyDemoMode = true;
      await wait(400);
      return demoFn();
    }
    throw err;
  }
};

export const api = {
  auth: {
    login: (username, password) =>
      tryFetch(
        `${API_URL}/auth/login`,
        { method: 'POST', headers: getHeaders(), body: JSON.stringify({ username, password }) },
        () => ({ _demo: true, token: 'demo-token', name: username.split('@')[0], username, email: username })
      ),
    register: (username, password, name) =>
      tryFetch(
        `${API_URL}/auth/register`,
        { method: 'POST', headers: getHeaders(), body: JSON.stringify({ username, password, name }) },
        () => ({ _demo: true, token: 'demo-token', name, username, email: username })
      ),
    getMe: () =>
      tryFetch(`${API_URL}/auth/me`, { headers: getHeaders() }, () => ({ _demo: true, name: 'Demo User' })),
    updateName: (name) =>
      tryFetch(
        `${API_URL}/auth/name`,
        { method: 'PUT', headers: getHeaders(), body: JSON.stringify({ name }) },
        () => ({ _demo: true, name })
      ),
  },
  profile: {
    getProfile: () =>
      tryFetch(`${API_URL}/profile`, { headers: getHeaders() }, () => ({ _demo: true, allergens: [] })),
    saveQuiz: (payload) =>
      tryFetch(
        `${API_URL}/profile/quiz`,
        { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) },
        () => ({ _demo: true, ok: true })
      ),
  },
  scan: {
    processBarcode: (barcode, allergens = []) =>
      tryFetch(
        `${API_URL}/scan`,
        { method: 'POST', headers: getHeaders(), body: JSON.stringify({ barcode, allergens }) },
        () => demoScanResult(barcode, allergens)
      ),
    analyzeImage: (imageBase64, allergens = [], productName = '') =>
      tryFetch(
        `${API_URL}/scan/analyze-image`,
        { method: 'POST', headers: getHeaders(), body: JSON.stringify({ image: imageBase64, allergens, productName }) },
        () => demoVisionResult(allergens)
      ),
  },
  chat: {
    sendMessage: (message, allergens = []) =>
      tryFetch(
        `${API_URL}/chat`,
        { method: 'POST', headers: getHeaders(), body: JSON.stringify({ message, allergens }) },
        () => demoChatReply()
      ),
  },
  recipes: {
    generate: (ingredients, allergens = [], language) => {
      const lang = language || getLang();
      return tryFetch(
        `${API_URL}/recipes/generate`,
        { method: 'POST', headers: getHeaders(), body: JSON.stringify({ ingredients, allergens, language: lang }) },
        () => demoRecipes(ingredients)
      );
    },
  },
  checker: {
    analyze: (symptoms) =>
      tryFetch(
        `${API_URL}/checker/analyze`,
        { method: 'POST', headers: getHeaders(), body: JSON.stringify({ symptoms }) },
        () => demoSymptom()
      ),
  },
};

export const isDemoMode = () => demoMode;
