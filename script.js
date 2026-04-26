const PRODUCTS = [
    // ATASAN PRIA
    {
        id: 1,
        name: "Kemeja Linen Lengan Panjang",
        category: "Atasan Pria",
        price: 349000,
        description: "Kemeja berbahan linen premium dengan potongan regular fit. Tekstur ringan dan breathable, cocok untuk tampilan kasual maupun semi-formal pria.",
        image_url: "aset/kemejalinen.png"
    },
    {
        id: 2,
        name: "Polo Shirt Pique Cotton",
        category: "Atasan Pria",
        price: 229000,
        description: "Polo shirt berbahan pique cotton berkualitas tinggi. Potongan slim fit yang rapi, tersedia dalam warna-warna netral yang mudah dipadukan.",
        image_url: "aset/poloshirt.png"
    },
    {
        id: 3,
        name: "Kaos Oversized Washed",
        category: "Atasan Pria",
        price: 179000,
        description: "Kaos oversized dengan efek washed yang memberikan kesan vintage. Bahan cotton combed 30s yang lembut dan nyaman dipakai seharian.",
        image_url: "aset/kaosoversized.png"
    },

    // BAWAHAN PRIA
    {
        id: 4,
        name: "Celana Chino Slim-Fit",
        category: "Bawahan Pria",
        price: 299000,
        description: "Celana chino berbahan katun stretch dengan potongan slim-fit modern. Tersedia dalam berbagai warna netral, cocok untuk casual maupun semi-formal.",
        image_url: "aset/celanachino.png"
    },
    {
        id: 5,
        name: "Jogger Pants Fleece",
        category: "Bawahan Pria",
        price: 259000,
        description: "Jogger pants berbahan fleece tebal yang hangat dan nyaman. Dilengkapi tali pinggang adjustable dan dua kantong samping beresleting.",
        image_url: "aset/jogger.png"
    },

    // ATASAN WANITA
    {
        id: 6,
        name: "Blouse Chiffon Flowy",
        category: "Atasan Wanita",
        price: 269000,
        description: "Blouse berbahan chiffon ringan dengan siluet flowy yang feminin. Cocok untuk acara kasual hingga semi-formal.",
        image_url: "aset/blousechiffon.png"
    },
    {
        id: 7,
        name: "Crop Top Rajut",
        category: "Atasan Wanita",
        price: 199000,
        description: "Crop top berbahan rajut lembut yang stretchy dan nyaman. Desain minimalis dengan ribbed texture yang stylish untuk tampilan sehari-hari.",
        image_url: "aset/croptop.png"
    },
    {
        id: 8,
        name: "Tunik Batik Modern",
        category: "Atasan Wanita",
        price: 319000,
        description: "Tunik bermotif batik dengan bahan katun voile yang adem. Perpaduan corak tradisional dan potongan modern yang elegan.",
        image_url: "aset/tunik.png"
    },

    // BAWAHAN WANITA
    {
        id: 9,
        name: "Rok Midi Plisket",
        category: "Bawahan Wanita",
        price: 289000,
        description: "Rok midi plisket berbahan satin lembut yang jatuh dengan cantik. Elastis di pinggang untuk kenyamanan maksimal, cocok untuk berbagai kesempatan.",
        image_url: "aset/rok.png"
    },
    {
        id: 10,
        name: "Celana Kulot Linen",
        category: "Bawahan Wanita",
        price: 249000,
        description: "Celana kulot berbahan linen yang ringan dan breathable. Potongan wide-leg yang trendi dan nyaman untuk aktivitas seharian.",
        image_url: "aset/celanakulot.png"
    },

    // OUTERWEAR
    {
        id: 11,
        name: "Jaket Bomber Unisex",
        category: "Outerwear",
        price: 459000,
        description: "Jaket bomber klasik dengan bahan polyester water-resistant. Desain unisex dengan ribbed collar dan cuffs, tersedia dalam warna-warna bold.",
        image_url: "aset/jaket.png"
    },
    {
        id: 12,
        name: "Blazer Structured Unisex",
        category: "Outerwear",
        price: 549000,
        description: "Blazer dengan struktur yang tegas namun tetap nyaman dipakai. Bahan premium blend wool, cocok untuk kesan profesional maupun smart casual.",
        image_url: "aset/blazer.png"
    },
    {
        id: 13,
        name: "Cardigan Oversize Knit",
        category: "Outerwear",
        price: 389000,
        description: "Cardigan oversized berbahan rajut tebal yang hangat dan cozy. Desain open-front yang mudah dipadukan dengan berbagai outfit.",
        image_url: "aset/cardigan.png"
    },

    // AKSESORIS
    {
        id: 14,
        name: "Tote Bag Canvas Premium",
        category: "Aksesoris",
        price: 189000,
        description: "Tote bag berbahan canvas tebal yang kuat dan tahan lama. Kapasitas besar dengan internal pocket, cocok untuk kuliah maupun belanja.",
        image_url: "aset/totebag.png"
    },
    {
        id: 15,
        name: "Topi Bucket Hat Corduroy",
        category: "Aksesoris",
        price: 149000,
        description: "Bucket hat berbahan corduroy lembut dengan tekstur yang unik. Desain unisex yang trendi, cocok untuk berbagai aktivitas outdoor.",
        image_url: "aset/topi.png"
    }
];

/*UTILITY FUNCTIONS*/

/**
 * Format angka ke format Rupiah
 * @param {number} amount
 * @returns {string}
 */
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
    }).format(amount);
}

/**
 * Debounce function untuk optimasi input search
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay) {
    let timer;
    return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
    };
}

/*STATE MANAGEMENT*/
const STATE = {
    cart: JSON.parse(localStorage.getItem('shopping_cart') || '[]'),
    activeCategory: 'Semua',
    searchQuery: '',
    sortOrder: 'default',
    openProductId: null
};

function saveCart() {
    localStorage.setItem('shopping_cart', JSON.stringify(STATE.cart));
}

function getTotalCartCount() {
    return STATE.cart.reduce((sum, item) => sum + item.qty, 0);
}

/*CART — Add & Update*/
function addToCart(productId) {
    const existing = STATE.cart.find(i => i.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        STATE.cart.push({ id: productId, qty: 1 });
    }
    saveCart();
    updateCartBadge();
    animateCartBounce();
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar.classList.contains('open')) {
        renderCartSidebar();
    } else {
        showToast('Produk ditambahkan ke keranjang ✓');
    }
}

function updateCartBadge() {
    const count = getTotalCartCount();
    const badge = document.getElementById('cartBadge');
    badge.textContent = count;
    if (count > 0) {
    badge.classList.add('visible');
    } else {
    badge.classList.remove('visible');
    }
}

/*TOAST NOTIFICATION */
let toastTimer = null;

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/*RENDER — Products Grid */

/**
 * @param {string} categoryName
 * @returns {string} HTML string
 */
function buildNoImagePlaceholder(categoryName) {
    const icons = {
    'Fashion':    '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>',
    'Elektronik': '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    'Kecantikan': '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
    'Sepatu':     '<path d="M10 17c-5.07-.5-7-2.5-7-3.5 0-1 2.03-1.5 5-1.5m11 5.5c0 1.1-.9 2-2 2H4a2 2 0 01-2-2V8.5c0-1.13.47-2.2 1.3-2.95l4-3.55A3 3 0 019.27 2h.46A3 3 0 0112 3l2 2.09 3 2.91c.72.7 1 1.66 1 2.5V19z"/>'
    };
    const svgPath = icons[categoryName] || icons['Fashion'];
    return `
    <div class="card__no-image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg>
        <span>Gambar segera hadir</span>
    </div>`;
}

/**
 * @param {Object[]} products
 */
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (products.length === 0) {
    grid.innerHTML = `
        <div class="empty-state" role="status">
        <div class="empty-state__icon">🔍</div>
        <p class="empty-state__title">Produk tidak ditemukan</p>
        <p class="empty-state__sub">Coba kata kunci atau kategori yang berbeda</p>
        </div>`;
    return;
    }

    const fragment = document.createDocumentFragment();

    products.forEach((product, index) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.setAttribute('role', 'listitem');
    article.setAttribute('aria-label', product.name);
    article.dataset.productId = product.id;

    const isNew   = product.id % 5 === 0;
    const isPopular = product.id % 3 === 0;
    const badgeHtml = isNew
        ? `<span class="card__badge card__badge--gold">Baru</span>`
        : isPopular
        ? `<span class="card__badge">Populer</span>`
        : '';

    const imageContent = product.image_url
        ? `<img src="${product.image_url}" alt="${product.name}" loading="lazy" />`
        : buildNoImagePlaceholder(product.category);

    article.innerHTML = `
        <div class="card__image-wrap">
        ${imageContent}
        ${badgeHtml}
        </div>
        <div class="card__body">
        <p class="card__category">${product.category}</p>
        <h3 class="card__name">${product.name}</h3>
        <p class="card__price">${formatRupiah(product.price)}</p>
        <button class="card__add-btn" data-add-id="${product.id}" aria-label="Tambah ${product.name} ke keranjang">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Tambah
        </button>
        </div>`;

    fragment.appendChild(article);
    });

    grid.appendChild(fragment);

    bindCardEvents();
    applyCardEntrance();
}

/*RENDER - Category Tabs*/
function renderTabs() {
    const container = document.getElementById('tabsContainer');
    const categories = ['Semua', ...new Set(PRODUCTS.map(p => p.category))];

    categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (cat === STATE.activeCategory ? ' active' : '');
    btn.textContent = cat;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', cat === STATE.activeCategory ? 'true' : 'false');
    btn.addEventListener('click', () => onCategoryChange(cat));
    container.appendChild(btn);
    });
}

/*
    FILTER LOGIC */
function getFilteredProducts() {
    let filtered = PRODUCTS.filter(p => {
        const matchCat    = STATE.activeCategory === 'Semua' || p.category === STATE.activeCategory;
        const matchSearch = p.name.toLowerCase().includes(STATE.searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    if (STATE.sortOrder === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (STATE.sortOrder === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
}

function onCategoryChange(category) {
    STATE.activeCategory = category;

    // Update tab active states
    document.querySelectorAll('.tab-btn').forEach(btn => {
    const isActive = btn.textContent === category;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    renderProducts(getFilteredProducts());
}

/*
    MODAL — Toggle & Populate */
function openModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    STATE.openProductId = productId;

    const cartItem = STATE.cart.find(i => i.id === productId);
    const currentQty = cartItem ? cartItem.qty : 0;

    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalPrice').textContent = formatRupiah(product.price);
    document.getElementById('modalDesc').textContent = product.description;

    const imageWrap = document.getElementById('modalImageWrap');
    imageWrap.innerHTML = product.image_url 
        ? `<img src="${product.image_url}" alt="${product.name}" />`
        : `<div class="modal__no-image"><span>Gambar segera hadir</span></div>`;

    const modalContent = document.querySelector('.modal__content');
    const existingActions = document.querySelector('.modal__custom-actions');
    if (existingActions) existingActions.remove();

    const actionDiv = document.createElement('div');
    actionDiv.className = 'modal__custom-actions';
    actionDiv.style = "display: flex; align-items: center; gap: 15px; margin-top: 20px;";
    
    actionDiv.innerHTML = `
        <button onclick="removeFromCart(${product.id}); openModal(${product.id})" class="btn-qty">-</button>
        <span style="font-weight: bold; font-size: 1.2rem;">${currentQty}</span>
        <button onclick="addToCart(${product.id}); openModal(${product.id})" class="btn-qty">+</button>
    `;

    const addBtn = document.getElementById('modalAddBtn');
    modalContent.insertBefore(actionDiv, addBtn);

    const overlay = document.getElementById('modalOverlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    STATE.openProductId = null;
}

/*EVENT BINDING*/
function bindCardEvents() {
    // Open modal
    document.querySelectorAll('.card__image-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
        const card = wrap.closest('.card');
        openModal(Number(card.dataset.productId));
    });
    });

    // Add to cart
    document.querySelectorAll('.card__add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(Number(btn.dataset.addId));
    });
    });
}

function bindStaticEvents() {
    // Close modal
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
    });

    // Modal add to cart
    document.getElementById('modalAddBtn').addEventListener('click', () => {
    if (STATE.openProductId) {
        addToCart(STATE.openProductId);
        closeModal();
    }
    });

    // ESC to close modal
    document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    });

    // Search
    document.getElementById('searchInput').addEventListener(
    'input',
    debounce((e) => {
        STATE.searchQuery = e.target.value.trim();
        renderProducts(getFilteredProducts());
    }, 250)
    );

    // Cart button buka sidebar
    document.getElementById('cartBtn').addEventListener('click', openCartModal);

    // Sort dropdown
document.getElementById('sortSelect').addEventListener('change', (e) => {
        STATE.sortOrder = e.target.value;
        renderProducts(getFilteredProducts());
    });

    // Cart button buka sidebar
    document.getElementById('cartBtn').addEventListener('click', openCartModal);
}
/*ANIME.JS ANIMATIONS*/

/** Staggered card entrance animation */
function applyCardEntrance() {
    const cards = document.querySelectorAll('.card');
    if (!cards.length) return;

    anime({
    targets: cards,
    opacity:     [0, 1],
    easing:      'easeOutExpo'
    });
}

/** Hero section fade-in on load */
function applyHeroEntrance() {
    anime({
    targets:    '#hero',
    opacity:    [0, 1],
    easing:     'easeOutExpo',
    });
}

/** Cart icon bounce on item added */
function animateCartBounce() {
    anime({
    targets:  '#cartBtn',
    scale:    [1, 1.35, 0.9, 1.1, 1],
    duration: 480,
    easing:   'easeInOutSine'
    });
}

/*APP INITIALIZER */
function initApp() {
    renderTabs();
    renderProducts(getFilteredProducts());
    updateCartBadge();
    bindStaticEvents();
    applyHeroEntrance();
}

/*CORE LOGIC UPDATES */
function syncCart() {
    localStorage.setItem('shopping_cart', JSON.stringify(STATE.cart));
    updateCartBadge();
}
document.addEventListener('DOMContentLoaded', initApp);

/*CART SIDEBAR*/

// Buka sidebar keranjang
function openCartModal() {
    renderCartSidebar();
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartBackdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartBackdrop').classList.remove('open');
    document.body.style.overflow = '';
}

function removeFromCart(productId) {
    STATE.cart = STATE.cart.filter(i => i.id !== productId);
    saveCart();
    updateCartBadge();
    renderCartSidebar();
    showToast('Produk dihapus dari keranjang');
}

function decreaseQty(productId) {
    const item = STATE.cart.find(i => i.id === productId);
    if (!item) return;
    if (item.qty <= 1) {
        removeFromCart(productId);
    } else {
        item.qty -= 1;
        saveCart();
        updateCartBadge();
        renderCartSidebar();
    }
}

function renderCartSidebar() {
    const body = document.getElementById('cartSidebarBody');
    const footer = document.getElementById('cartSidebarFooter');

    if (STATE.cart.length === 0) {
        body.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty__icon">🛍️</div>
                <p class="cart-empty__title">Keranjang kosong</p>
                <p class="cart-empty__sub">Yuk, tambah produk dulu!</p>
            </div>`;
        footer.innerHTML = '';
        return;
    }

    body.innerHTML = STATE.cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return '';
        return `
        <div class="cart-item">
            <div class="cart-item__info">
                <p class="cart-item__name">${product.name}</p>
                <p class="cart-item__price-unit">${formatRupiah(product.price)}</p>
            </div>
            <div class="cart-item__right">
                <p class="cart-item__subtotal">${formatRupiah(product.price * item.qty)}</p>
                <div class="cart-item__qty-control">
                    <button class="qty-btn" onclick="decreaseQty(${item.id})" aria-label="Kurangi">
                        ${item.qty === 1
                            ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
                            : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`
                        }
                    </button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" onclick="addToCart(${item.id})" aria-label="Tambah">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');

    const total = STATE.cart.reduce((sum, item) => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);

    footer.innerHTML = `
        <div class="cart-total">
            <span>Total</span>
            <span>${formatRupiah(total)}</span>
        </div>
        <button class="cart-checkout-btn">Checkout Sekarang</button>`;
}