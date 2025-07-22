// Product data with stock tracking - This array serves as the default fallback.
// It will be replaced by Odoo data if a successful connection and product fetch occurs.
let products = [
    {
        id: 1,
        name: "Bamboo Fiber Tank Top",
        price: 29.99,
        image: "https://bamboahome.com/cdn/shop/files/white_bamboo_womens_tank_top_1.png?v=1741327353",
        stock: 20,
        initialStock: 20
    },
    {
        id: 2,
        name: "Crochet Beach Cover-Up Dress",
        price: 45.99,
        image: "https://www.bsubseach.com/cdn/shop/files/sheer-bikini-coverup-fringe-tassel-tops-for-beach-white-564623.jpg?v=1717811982",
        stock: 8,
        initialStock: 8
    },
    {
        id: 3,
        name: "Hibiscus Print Hawaiian Shirt",
        price: 44.99,
        originalPrice: 49.99,
        image: "https://www.lowes.com.au/media/catalog/product/4/2/42445_f_3.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=550&width=413&canvas=413:550",
        stock: 8,
        initialStock: 8
    },
    {
        id: 4,
        name: "Men's Linen Beach Pants",
        price: 49.99,
        originalPrice: 55.99,
        image: "https://coofandy.com/cdn/shop/products/AP4A3026_ce070af4-d4df-42f1-97d3-a8f63b581b9a_1800x1800.jpg?v=1750742972",
        stock: 14,
        initialStock: 14
    },
    {
        id: 5,
        name: "Palm Tree Beach Cover-Up",
        price: 39.99,
        image: "https://shop-confete.com/cdn/shop/products/WillaBeachCoverUp_750x1000_crop_center_7ac921f8-6cfd-4199-acc4-84596865ebf4.jpg?v=1646671194&width=5000",
        stock: 15,
        initialStock: 15
    },
    {
        id: 6,
        name: "Raffia Sun Hat with Bow",
        price: 34.99,
        originalPrice: 39.99,
        image: "https://i.etsystatic.com/23159430/r/il/fde051/4813819435/il_794xN.4813819435_exv5.jpg",
        stock: 10,
        initialStock: 10
    },
    {
        id: 7,
        name: "Seashell Print Bikini Set",
        price: 49.99,
        originalPrice: 59.99,
        image: "https://media.cupshe.com/cdn-review.cupshe.com/cmc-admin/2024_07_18/19_30_2315/53abf8ea-3462-46e7-8268-368dc2fed299/CAA12C4G103UC/4.jpg?speedsize=mxw_1500",
        stock: 15,
        initialStock: 15
    },
    {
        id: 8,
        name: "Tie-Dye Beach Sarong",
        price: 32.99,
        originalPrice: 37.99,
        image: "https://i.etsystatic.com/13139247/r/il/cd9bf9/1761765432/il_794xN.1761765432_gd2i.jpg",
        stock: 18,
        initialStock: 18
    },
    {
        id: 9,
        name: "Tropical Floral Maxi Dress",
        price: 59.99,
        originalPrice: 69.99,
        image: "https://petalandpup.com.au/cdn/shop/files/0L6A2485.jpg?v=1733742092&width=240",
        stock: 12,
        initialStock: 12
    },
    {
        id: 10,
        name: "Tropical Print Swim Shorts",
        price: 36.99,
        originalPrice: 42.99,
        image: "https://www.uptheir.co.uk/media/catalog/product/cache/92a89721a3bc3cca31ca1daa4fdb902d/t/u/tumbnail_06431cfb-fd67-4097-a144-6866e7d9a9b3.jpg",
        stock: 10,
        initialStock: 10
    },
    {
        id: 11,
        name: "Women's Strappy Sandals",
        price: 38.99,
        image: "https://d1q03ajwgi7cv2.cloudfront.net/media/catalog/product/cache/81d16df11efc363de1f31fe51afcad0e/d/u/duu-luci-0079506840086487_front.jpg",
        stock: 25,
        initialStock: 25
    },
    {
        id: 12,
        name: "Woven Straw Beach Bag",
        price: 39.99,
        image: "https://elenahandbags.com/cdn/shop/products/130cmx33cm_800x.jpg?v=1651806740",
        stock: 12,
        initialStock: 12
    }
];

let cart = []; // Array to store items in the cart
let stockPollingInterval; // Variable to hold the polling interval ID

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartIcon = document.getElementById('cart-icon');
const cartCountElement = document.querySelector('.cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutContainer = document.getElementById('checkout-container');
const closeModalButtons = document.querySelectorAll('.close-modal');
const notificationContainer = document.getElementById('notification-container');
const orderTrackingModal = document.getElementById('order-tracking-modal');     // Order Tracking Modal
const orderTrackingForm = document.getElementById('order-tracking-form');       // Order Tracking Form
const orderTrackingResults = document.getElementById('order-tracking-results'); // Order Tracking Results Div
const productAdminToggle = document.getElementById('product-admin-toggle');     // Product Admin Toggle
const productAdminModal = document.getElementById('product-admin-modal');       // Product Admin Modal
const productAddForm = document.getElementById('product-add-form');             // Product Add Form
const productAddStatus = document.getElementById('product-add-status');         // Product Add Status Div
const productAdminLoginForm = document.getElementById('product-admin-login-form'); // Product Admin Login Form
const productAdminLoginStatus = document.getElementById('product-admin-login-status'); // Product Admin Login Status
const productAdminLoginSection = document.getElementById('product-admin-login-section'); // Product Admin Login Section
const productAddFormSection = document.getElementById('product-add-form-section'); // Product Add Form Section

// NEW MFA DOM Elements
const mfaCodeGroup = document.getElementById('mfa-code-group');
const mfaCodeInput = document.getElementById('mfa-code');
const mfaSetupSection = document.getElementById('mfa-setup-section');
const mfaSetupBtn = document.getElementById('mfa-setup-btn');
const mfaDisableBtn = document.getElementById('mfa-disable-btn');
const mfaQrCodeDisplay = document.getElementById('mfa-qr-code-display');
const mfaQrCodeImg = document.getElementById('mfa-qr-code-img');
const mfaSetupStatus = document.getElementById('mfa-setup-status');


// Configuration for Render Proxy
const config = {
  // IMPORTANT: Replace 'https://odoo-proxy-server-final.onrender.com' with your actual Render proxy URL
  // and 's0m3R4nd0mStR1ngF0rMyPr0xyS3cur1ty_xyz123' with your actual API key from Render's environment variables.
  proxyUrl: 'https://odoo-proxy-server-final.onrender.com', // <--- Your Render Proxy URL (NO trailing slash)
  apiKey: 's0m3R4nd0mStR1ngF0rMyPr0xyS3cur1ty_xyz123' // <--- Your API Key (must match Render API_KEY env var)
};

// Odoo API Configuration (will be populated from Admin Panel)
let odooConfig = {
    url: '',
    db: '',
    username: '',
    password: ''
};

// Variable to store the Odoo User ID after successful login
let odooUid = null;
// Variable to store the Odoo User ID for the product admin (separate login)
let productAdminUid = null;


// Function to load config from Local Storage (if saved)
function loadOdooConfig() {
    const savedConfig = localStorage.getItem('odooConfig');
    if (savedConfig) {
        odooConfig = JSON.parse(savedConfig);
        // Update the admin panel fields if they exist
        if (document.getElementById('odoo-url')) {
            document.getElementById('odoo-url').value = odooConfig.url;
            document.getElementById('odoo-db').value = odooConfig.db;
            // Corrected: Add autocomplete attribute to username and password fields
            const usernameInput = document.getElementById('odoo-username');
            if (usernameInput) {
                usernameInput.value = odooConfig.username;
                usernameInput.setAttribute('autocomplete', 'username');
            }
            const passwordInput = document.getElementById('odoo-password');
            if (passwordInput) {
                passwordInput.value = odooConfig.password;
                passwordInput.setAttribute('autocomplete', 'current-password');
            }
        }
        updateApiStatus();
    }
}

// Function to save config to Local Storage
function saveOdooConfig(url, db, username, password) {
    odooConfig = { url, db, username, password };
    localStorage.setItem('odooConfig', JSON.stringify(odooConfig));
    updateApiStatus();
    // Show saved confirmation
    const configSavedElement = document.getElementById('config-saved');
    if (configSavedElement) {
        configSavedElement.style.display = 'block';
        setTimeout(() => {
            configSavedElement.style.display = 'none';
        }, 3000);
    }
}

// Update API Status display
function updateApiStatus() {
    const apiStatusElement = document.getElementById('api-status');
    const productAdminToggle = document.getElementById('product-admin-toggle');

    if (apiStatusElement) {
        if (odooConfig.url && odooConfig.db && odooConfig.username && odooConfig.password) {
            apiStatusElement.textContent = 'API Status: Configured (not yet connected)';
            apiStatusElement.classList.remove('disconnected');
            apiStatusElement.classList.add('connected');
        } else {
            apiStatusElement.textContent = 'API Status: Not Configured';
            apiStatusElement.classList.remove('connected');
            apiStatusElement.classList.add('disconnected');
        }
    }

    // Hide product admin toggle if main API is not configured/connected
    if (productAdminToggle) {
        if (odooUid) { // Only show if main Odoo login is successful
            productAdminToggle.style.display = 'flex'; // Use flex to align icon and text
        } else {
            productAdminToggle.style.display = 'none';
        }
    }
}

/**
 * Makes a request to the Render proxy to interact with Odoo.
 * This function abstracts the communication with your Render proxy,
 * which in turn handles the JSON-RPC 2.0 calls to Odoo's /web/session/authenticate or /web/dataset/call_kw.
 * @param {string} proxyEndpointType The type of Odoo call for the proxy ('login', 'odoo_call', 'mfa_setup', 'mfa_disable').
 * @param {Object} payload The specific payload to send to the proxy.
 * @returns {Promise<any>} The response data from Odoo via the proxy, or null on error.
 */
async function odooProxyFetch(proxyEndpointType, payload) {
    const apiStatusElement = document.getElementById('api-status');

    // --- DEBUGGING LOGS ---
    console.log('--- odooProxyFetch DEBUG ---');
    console.log('config.proxyUrl:', config.proxyUrl);
    console.log('config.apiKey:', config.apiKey);
    console.log('Proxy Endpoint Type:', proxyEndpointType);
    // --- END DEBUGGING LOGS ---

    if (!config.proxyUrl || config.proxyUrl === 'YOUR_RENDER_PROXY_URL_HERE') {
        console.error('Render Proxy URL is not configured. Please set config.proxyUrl in script.js.');
        apiStatusElement.textContent = 'API Status: Proxy URL not set';
        apiStatusElement.classList.remove('connected');
        apiStatusElement.classList.add('disconnected');
        return null;
    }
    if (!config.apiKey || config.apiKey === 'YOUR_API_KEY_HERE') {
        console.error('Render API Key is not configured. Please set config.apiKey in script.js.');
        apiStatusElement.textContent = 'API Status: API Key not set';
        apiStatusElement.classList.remove('connected');
        apiStatusElement.classList.add('disconnected');
        return null;
    }

    let endpoint = '';
    if (proxyEndpointType === 'login') {
        endpoint = '/api/login';
    } else if (proxyEndpointType === 'odoo_call') {
        endpoint = '/api/odoo'; // This is the endpoint for general Odoo API calls
    } else if (proxyEndpointType === 'mfa_setup') { // NEW MFA Endpoint
        endpoint = '/api/mfa/setup';
    } else if (proxyEndpointType === 'mfa_disable') { // NEW MFA Endpoint
        endpoint = '/api/mfa/disable';
    }
    else {
        console.error(`Unsupported Odoo proxy call type: ${proxyEndpointType}`);
        apiStatusElement.textContent = `API Status: Unsupported Odoo call type`;
        apiStatusElement.classList.remove('connected');
        apiStatusElement.classList.add('disconnected');
        return null;
    }

    // --- DEBUGGING LOG ---
    const fullUrl = `${config.proxyUrl}${endpoint}`;
    console.log('Constructed Full URL:', fullUrl);
    // --- END DEBUGGING LOGS ---

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': config.apiKey
            },
            body: JSON.stringify(payload) // Send the entire payload directly
        });

        if (!response.ok) {
            const errorData = await response.json(); // Proxy sends JSON error
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        if (data.error) {
            // Check if the error is specifically about authentication/session
            if (data.error.message && (data.error.message.includes('Session expired') || data.error.message.includes('Authentication failed'))) {
                console.error('Odoo session expired or authentication failed. Stopping polling.');
                stopStockPolling(); // Only stop polling for clear auth issues
            }
            throw new Error(`Odoo Error via Proxy: ${data.error.message || JSON.stringify(data.error)}`);
        }
        // For login and MFA endpoints, the proxy directly returns the result/message
        if (proxyEndpointType === 'login' || proxyEndpointType === 'mfa_setup' || proxyEndpointType === 'mfa_disable') {
            return data; // Return the whole data object from proxy for these
        }
        return data.result; // For odoo_call, assuming the proxy returns Odoo's 'result' directly
    } catch (error) {
        console.error('Error during Odoo fetch via proxy:', error);
        // Do NOT stop polling here for generic errors. Let polling continue.
        // The specific logic in odooLogin handles initial auth and start/stop.
        // If this fails, it means the *method* failed, not necessarily the session.
        // The next poll will re-attempt.
        return null;
    }
}


/**
 * Attempts to log in to the Odoo instance using the configured credentials via Render proxy.
 * Stores the Odoo User ID (UID) on success.
 * Now includes MFA code if required.
 * @param {string|null} mfaCode - The MFA code entered by the user, if MFA is enabled.
 * @returns {boolean} True if login is successful, false otherwise.
 */
async function odooLogin(mfaCode = null) {
    const apiStatusElement = document.getElementById('api-status');
    
    // Ensure initial state of MFA elements is hidden
    if (mfaCodeGroup) mfaCodeGroup.style.display = 'none';
    if (mfaSetupSection) mfaSetupSection.style.display = 'none';
    if (mfaSetupStatus) {
        mfaSetupStatus.style.display = 'none'; // Hide MFA setup status
        mfaSetupStatus.textContent = '';
        mfaSetupStatus.classList.remove('success', 'error');
    }
    if (mfaQrCodeDisplay) mfaQrCodeDisplay.style.display = 'none'; // Hide QR code display

    // Clear main login status message
    if (apiStatusElement) {
        apiStatusElement.textContent = 'API Status: Logging in...';
        apiStatusElement.classList.remove('disconnected', 'success', 'error');
        apiStatusElement.classList.add('connected'); // Show as 'connecting'
    }

    if (!odooConfig.url || !odooConfig.db || !odooConfig.username || !odooConfig.password) {
        if (apiStatusElement) {
            apiStatusElement.textContent = 'API Status: Not Configured';
            apiStatusElement.classList.remove('connected');
            apiStatusElement.classList.add('disconnected');
        }
        stopStockPolling(); // Ensure polling is stopped if config is incomplete
        if (productAdminToggle) productAdminToggle.style.display = 'none'; // Hide product admin toggle
        return false;
    }

    try {
        const loginPayload = {
            odooConfig: odooConfig, // Send the full odooConfig
            mfaCode: mfaCode // Pass the MFA code
        };
        // Call odooProxyFetch with 'login' type
        const result = await odooProxyFetch('login', loginPayload);

        if (result && result.result) { // result directly contains uid on successful authentication
            odooUid = result.result; // Store the user ID as UID
            if (apiStatusElement) {
                apiStatusElement.textContent = 'API Status: Connected';
                apiStatusElement.classList.remove('disconnected', 'error');
                apiStatusElement.classList.add('success');
            }
            console.log('Odoo login successful. UID:', odooUid);
            
            // Show MFA setup options after successful login
            if (mfaSetupSection) mfaSetupSection.style.display = 'block';

            // After successful login, try to fetch products immediately
            await fetchOdooProducts(); 
            // Start polling for stock updates
            startStockPolling();
            if (productAdminToggle) productAdminToggle.style.display = 'flex'; // Show product admin toggle
            
            return true;
        } else {
            // This case should ideally be handled by proxyFetch throwing an error
            throw new Error('Authentication failed: No user ID returned.');
        }
    } catch (error) {
        console.error('Odoo login failed:', error);
        odooUid = null;
        if (apiStatusElement) {
            apiStatusElement.textContent = `API Status: Disconnected (${error.message})`;
            apiStatusElement.classList.remove('connected', 'success');
            apiStatusElement.classList.add('error');
        }
        stopStockPolling(); // Stop polling if login fails
        if (productAdminToggle) productAdminToggle.style.display = 'none'; // Hide product admin toggle
        
        // If MFA is required, show the MFA input field
        if (error.message.includes('MFA required') || error.message.includes('MFA code is required')) {
            if (mfaCodeGroup) mfaCodeGroup.style.display = 'block';
            if (mfaCodeInput) mfaCodeInput.focus();
        } else {
             if (mfaCodeGroup) mfaCodeGroup.style.display = 'none'; // Hide MFA if not required
        }
        if (mfaSetupSection) mfaSetupSection.style.display = 'none'; // Hide MFA setup options if login failed
        return false;
    }
}

/**
 * Generic function to call any Odoo model method using call_kw via Render proxy.
 * Automatically attempts to log in if not already authenticated.
 * @param {string} model - The Odoo model name (e.g., 'product.product').
 * @param {string} method - The method to call on the model (e.g., 'search_read', 'create', 'write').
 * @param {Array} args - Positional arguments for the method.
 * @param {Object} kwargs - Keyword arguments (dictionary) for the method.
 * @param {number|null} [specificUid=null] - Optional UID to use for this specific call (e.g., for product admin login).
 * @returns {Promise<any|null>} The result of the Odoo call, or null if an error occurs.
 */
async function callOdooMethod(model, method, args = [], kwargs = {}, specificUid = null) {
    const targetUid = specificUid || odooUid; // Use specificUid if provided, else main odooUid

    if (!targetUid) {
        console.warn('Not logged in to Odoo. Attempting to log in automatically before calling Odoo method...');
        const loggedIn = await odooLogin(); // This will try to log in with main credentials
        if (!loggedIn) {
            showNotification('Failed to connect to Odoo for data retrieval. Please check configuration.');
            return null;
        }
    }

    // CORRECTED PAYLOAD STRUCTURE for /web/dataset/call_kw as expected by Render proxy
    const callKwPayload = {
        odooConfig: odooConfig, // Pass odooConfig for proxy context (contains db, etc.)
        uid: targetUid, // Use the determined UID
        model: model,   // Direct 'model' parameter for Odoo's call_kw
        method: method, // Direct 'method' parameter for Odoo's call_kw
        args: args,     // Positional arguments (e.g., domain)
        kwargs: kwargs  // Keyword arguments for the Odoo method
    };

    // Call odooProxyFetch with 'odoo_call' type and the new payload
    const result = await odooProxyFetch('odoo_call', callKwPayload);

    if (result === null) {
        console.error(`Odoo API error for ${model}.${method} via proxy.`);
        // odooProxyFetch already handles stopping polling for session errors.
        // For other generic Odoo errors, we want polling to continue.
        return null;
    }
    return result;
}

/**
 * Fetches product data from Odoo via the Render proxy.
 * Updates the 'products' array only if the fetch is successful.
 */
async function fetchOdooProducts() {
    if (!odooUid) {
        console.warn('Not logged in to Odoo. Cannot fetch products. Polling will continue to try after login.');
        return; // Don't try to fetch if not logged in
    }

    try {
        console.log('Fetching products from Odoo...'); // Added log for polling
        const productData = await callOdooMethod('product.template', 'search_read', [], {
            fields: ['name', 'list_price', 'standard_price', 'image_1920', 'qty_available'],
            limit: 20 // Limit to 20 products for example
        });

        if (productData) {
            // Map Odoo product data to your local 'products' array format
            // Only update 'products' if data is successfully fetched
            products = productData.map(odooProduct => ({
                id: odooProduct.id,
                name: odooProduct.name,
                price: odooProduct.list_price || 0, // Sale price
                originalPrice: odooProduct.standard_price || odooProduct.list_price || 0, // Cost price or sale price
                // Odoo returns base64 image data, prepend data URI for direct use
                image: odooProduct.image_1920 ? `data:image/png;base64,${odooProduct.image_1920}` : 'https://placehold.co/250x250/cccccc/000000?text=No+Image',
                stock: odooProduct.qty_available || 0,
                initialStock: odooProduct.qty_available || 0 // Assuming initial stock is current stock
            }));
            displayProducts(); // Re-render products with fetched Odoo data
            console.log('Products fetched from Odoo and displayed.'); // Added log for polling success
        }
    } catch (error) {
        console.error('Failed to fetch products from Odoo during polling:', error);
        // The error handling in callOdooMethod will stop polling if it's a session issue.
    }
}

/**
 * Starts the stock polling interval.
 */
function startStockPolling() {
    // Clear any existing interval to prevent multiple polls running
    if (stockPollingInterval) {
        clearInterval(stockPollingInterval);
        console.log('Existing stock polling interval cleared.');
    }
    // Poll every 15 seconds (15000 milliseconds)
    stockPollingInterval = setInterval(() => {
        console.log('--- Polling Odoo for stock updates (every 15s) ---'); // Clearer log
        fetchOdooProducts();
    }, 15000); 
    console.log('Stock polling started with 15-second interval.');
}

/**
 * Stops the stock polling interval.
 */
function stopStockPolling() {
    if (stockPollingInterval) {
        clearInterval(stockPollingInterval);
        stockPollingInterval = null;
        console.log('Stock polling stopped.');
    }
}


// Display products with stock information
function displayProducts() {
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const isOutOfStock = product.stock <= 0;
        const stockClass = isOutOfStock ? 'out-of-stock' : (product.stock < 5 ? 'low-stock' : 'in-stock');
        const stockText = isOutOfStock ? 'Out of Stock' :
                         (product.stock < 5 ? `Only ${product.stock} left!` : `In Stock (${product.stock})`);

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/250x250/cccccc/000000?text=No+Image';">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice && product.originalPrice > product.price ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <p class="stock-info ${stockClass}">${stockText}</p>
                <button class="add-to-cart" data-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>
                    ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart with stock validation
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    if (!product || product.stock <= 0) {
        showNotification(`Sorry, ${product.name} is out of stock.`);
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    // Update stock
    product.stock -= 1;
    updateCart();
    displayProducts(); // Refresh product display
    showNotification(`${product.name} added to cart!`);
}

// Update cart UI and totals
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;

    // Update cart items display
    renderCartItems();
}

// Render cart items with remove functionality
function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5" style="text-align: center;">Your cart is empty</td></tr>';
        return;
    }

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id); // Ensure product is found in the current 'products' array
        const cartItemRow = document.createElement('tr');
        cartItemRow.innerHTML = `
            <td>
                <div class="product-info">
                    <img src="${item.image}" class="product-img" alt="${item.name}">
                    <span>${item.name}</span>
                </div>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}" ${product && product.stock <= 0 ? 'disabled' : ''}>+</button>
                </div>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button></td>
        `;
        cartItemsContainer.appendChild(cartItemRow);
    });

    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

// Decrease quantity
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);

    if (item && product) {
        if (item.quantity > 1) {
            item.quantity -= 1;
            product.stock += 1; // Return one to stock
        } else {
            // Remove item completely
            product.stock += item.quantity; // Return all to stock
            cart = cart.filter(i => i.id !== productId);
        }

        updateCart();
        displayProducts(); // Refresh product display
    }
}

// Increase quantity
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);

    if (item && product && product.stock > 0) {
        item.quantity += 1;
        product.stock -= 1;
        updateCart();
        displayProducts(); // Refresh product display
    } else if (product && product.stock <= 0) {
        showNotification(`Cannot add more of ${product.name}, out of stock.`);
    }
}

// Remove item completely
function removeItem(e) {
    const productId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);

    if (item && product) {
        product.stock += item.quantity; // Return all to stock
        cart = cart.filter(i => i.id !== productId);
        updateCart();
        displayProducts(); // Refresh product display
        showNotification(`${item.name} removed from cart!`);
    }
}

// Show checkout window
function showCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    checkoutContainer.innerHTML = `
        <div class="checkout-summary">
            <h3>Order Summary</h3>
            <div class="checkout-items">
                ${cart.map(item => `
                    <div class="checkout-item">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="checkout-total">
                <span>Total:</span>
                <span>$${calculateCartTotal().toFixed(2)}</span>
            </div>

            <form id="checkout-form">
                <h4>Customer Information</h4>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="address">Shipping Address</label>
                    <textarea id="address" required></textarea>
                </div>

                <h4>Payment Method</h4>
                <div class="payment-methods">
                    <label>
                        <input type="radio" name="payment" value="credit-card" checked> Credit Card
                    </label>
                    <label>
                        <input type="radio" name="payment" value="paypal"> PayPal
                    </label>
                </div>

                <div id="credit-card-fields">
                    <div class="form-group">
                        <label for="card-type">Card Type</label>
                        <select id="card-type" required>
                            <option value="">Select Card Type</option>
                            <option value="visa">Visa</option>
                            <option value="mastercard">Mastercard</option>
                            <option value="amex">American Express</option>
                            <option value="discover">Discover</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="card-number">Card Number</label>
                        <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="card-expiry">Expiry Date (MM/YY)</label>
                            <input type="text" id="card-expiry" placeholder="MM/YY" maxlength="5" required>
                        </div>
                        <div class="form-group">
                            <label for="card-cvc">CVC</label>
                            <input type="text" id="card-cvc" placeholder="123" maxlength="4" required>
                        </div>
                    </div>
                </div>

                <div id="paypal-fields" style="display: none;">
                    <p>You will be redirected to PayPal to complete your payment</p>
                    <div class="paypal-logo">
                        <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal">
                    </div>
                </div>

                <button type="submit" class="btn">Place Order</button>
            </form>
        </div>
    `;

    // Auto-format card number with spaces
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) { // Check if element exists
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '');
            if (value.length > 0) {
                value = value.match(/.{1,4}/g).join(' ');
            }
            e.target.value = value.substring(0, 19);

            // Detect card type
            const cardTypeSelect = document.getElementById('card-type');
            if (cardTypeSelect) { // Check if element exists
                const firstDigits = value.replace(/\s+/g, '').substring(0, 2);

                if (/^4/.test(firstDigits)) {
                    cardTypeSelect.value = 'visa';
                } else if (/^5[1-5]/.test(firstDigits)) {
                    cardTypeSelect.value = 'mastercard';
                } else if (/^3[47]/.test(firstDigits)) {
                    cardTypeSelect.value = 'amex';
                } else if (/^6(?:011|5)/.test(firstDigits)) {
                    cardTypeSelect.value = 'discover';
                }
            }
        });
    }


    // Auto-format expiry date with slash
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) { // Check if element exists
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value.substring(0, 5);
        });
    }


    // Handle payment method toggle
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const creditCardFields = document.getElementById('credit-card-fields');
            const paypalFields = document.getElementById('paypal-fields');
            if (creditCardFields) creditCardFields.style.display =
                this.value === 'credit-card' ? 'block' : 'none';
            if (paypalFields) paypalFields.style.display =
                this.value === 'paypal' ? 'block' : 'none';
        });
    });

    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        placeOrder();
    });

    cartModal.style.display = 'none';
    checkoutModal.style.display = 'flex';
}

// Place order function
async function placeOrder() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    let paymentDetails = {};

    if (paymentMethod === 'credit-card') {
        const cardType = document.getElementById('card-type') ? document.getElementById('card-type').value : '';
        const cardNumber = document.getElementById('card-number') ? document.getElementById('card-number').value.replace(/\s+/g, '') : '';
        const cardExpiry = document.getElementById('card-expiry') ? document.getElementById('card-expiry').value : '';
        const cardCvc = document.getElementById('card-cvc') ? document.getElementById('card-cvc').value : '';

        if (!cardType) {
            showNotification('Please select a card type');
            return;
        }

        const cardLengthValid = (cardType === 'amex' && cardNumber.length === 15) ||
                              (cardType !== 'amex' && cardNumber.length === 16);

        if (!cardLengthValid || !/^\d+$/.test(cardNumber)) {
            showNotification('Please enter a valid card number');
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            showNotification('Please enter expiry date in MM/YY format');
            return;
        }

        const cvcLength = cardType === 'amex' ? 4 : 3;
        if (!new RegExp(`^\\d{${cvcLength}}$`).test(cardCvc)) {
            showNotification(`Please enter a valid ${cvcLength}-digit CVC`);
            return;
        }

        paymentDetails = {
            method: 'credit-card',
            cardType,
            cardLast4: cardNumber.slice(-4),
            cardExpiry
        };
    } else {
        paymentDetails = {
            method: 'paypal'
        };
    }

    showNotification('Processing your order...');

    const isOdooConnected = !!odooUid; // Check if odooUid exists (implies successful login)
    const apiStatusElement = document.getElementById('api-status');
    const isOdooConfigured = odooConfig.url && odooConfig.db && odooConfig.username && odooConfig.password;

    let odooInteractionSuccessful = false;
    let saleOrderId = 'N/A'; // Default to N/A if Odoo interaction is skipped or fails
    let odooMessage = '';

    if (isOdooConnected && isOdooConfigured) {
        // --- Odoo Connected Path ---
        try {
            // 1. Find or Create Customer (res.partner)
            let customerId;
            console.log('Attempting to find or create customer in Odoo...');
            const existingPartners = await callOdooMethod('res.partner', 'search_read', [[['email', '=', email]]], { fields: ['id', 'name'] }); // Added 'name' to fields
            
            if (existingPartners && existingPartners.length > 0) {
                customerId = existingPartners[0].id;
                console.log('Found existing customer in Odoo. ID:', customerId);
            } else {
                console.log('Customer not found, creating new one...');
                const newPartner = await callOdooMethod('res.partner', 'create', [{
                    name: name,
                    email: email,
                    street: address,
                    customer_rank: 1 // Mark as a customer
                }]);
                if (newPartner) {
                    customerId = newPartner; // Odoo create returns the ID of the new record
                    console.log('Created new customer in Odoo. ID:', customerId);
                } else {
                    throw new Error('Failed to create customer in Odoo.');
                }
            }

            if (!customerId) {
                throw new Error('Customer ID could not be determined for Odoo order.');
            }

            // 2. Create Sales Order (sale.order)
            console.log('Attempting to create sales order in Odoo...');
            const orderLines = cart.map(item => [0, 0, {
                product_id: item.id, // This is the Odoo product ID
                product_uom_qty: item.quantity,
                price_unit: item.price,
            }]);

            const saleOrderData = {
                partner_id: customerId,
                order_line: orderLines,
            };

            saleOrderId = await callOdooMethod('sale.order', 'create', [saleOrderData]);

            if (!saleOrderId) {
                throw new Error('Failed to create sales order in Odoo.');
            }
            console.log('Created Sales Order in Odoo. ID:', saleOrderId);

            // 3. Confirm Sales Order to trigger stock movements
            console.log('Attempting to confirm sales order in Odoo...');
            const confirmResult = await callOdooMethod('sale.order', 'action_confirm', [[saleOrderId]]);

            if (!confirmResult) {
                console.warn('Failed to confirm sales order in Odoo. Stock might not be deducted automatically. Check Odoo logs/configuration.');
                showNotification('Order placed, but failed to confirm in Odoo. Check Odoo manually.');
            } else {
                console.log('Sales Order confirmed in Odoo. Result:', confirmResult);
            }

            // --- NEW STEP: Find and Validate the Picking (Delivery Order) ---
            console.log('Attempting to find associated picking for sales order:', saleOrderId);
            const salesOrderDetails = await callOdooMethod('sale.order', 'read', [saleOrderId], { fields: ['picking_ids'] });
            
            let pickingId = null;
            if (salesOrderDetails && salesOrderDetails.length > 0 && salesOrderDetails[0].picking_ids && salesOrderDetails[0].picking_ids.length > 0) {
                pickingId = salesOrderDetails[0].picking_ids[0]; // Get the first picking ID
                console.log('Found picking ID:', pickingId, 'for Sales Order:', saleOrderId);

                console.log('Attempting to assign quantities to picking:', pickingId);
                const assignResult = await callOdooMethod('stock.picking', 'action_assign', [[pickingId]]);

                if (!assignResult) {
                    console.warn('Failed to assign quantities for picking. Proceeding to validate anyway, but stock might not deduct.');
                    showNotification('Order placed, but failed to reserve stock. Check Odoo manually.');
                } else {
                    console.log('Quantities assigned successfully. Result:', assignResult);
                }

                console.log('Attempting to validate picking using button_validate:', pickingId);
                const validatePickingResult = await callOdooMethod('stock.picking', 'button_validate', [[pickingId]], {
                    context: {
                        'skip_immediate': true, // Skip the "immediate transfer" wizard
                        'skip_backorder': true  // Skip the "create backorder" wizard
                    }
                });

                if (!validatePickingResult) {
                    console.error('Failed to validate picking in Odoo. Stock might not have been deducted.');
                    showNotification('Order placed, but failed to deduct stock in Odoo. Please check Odoo manually.');
                } else {
                    console.log('Picking validated successfully. Result:', validatePickingResult);
                    odooInteractionSuccessful = true; // Mark Odoo interaction as successful
                }
            } else {
                console.warn('No picking found for sales order:', saleOrderId, '. Stock might not be deducted automatically. This might indicate an Odoo configuration issue (e.g., no delivery route defined for products).');
                showNotification('Order placed, but no picking found to deduct stock. Check Odoo configuration.');
            }
            // --- END NEW STEP ---

            console.log('Order process completed: Success path with Odoo interaction.');
            odooMessage = `<p>Odoo Sales Order ID: <strong>${saleOrderId}</strong></p>`;

        } catch (odooError) {
            console.error('Error during Odoo order processing:', odooError);
            showNotification(`Odoo connection active, but failed to process order: ${odooError.message || 'An unexpected Odoo error occurred.'}`);
            if (apiStatusElement) {
                apiStatusElement.textContent = `API Status: Connected (Order Error)`;
                apiStatusElement.classList.add('disconnected'); // Show as disconnected due to order error
            }
            odooInteractionSuccessful = false; // Ensure this is false if Odoo part failed
            odooMessage = `<p class="warning-message">Odoo connection active, but order processing failed. Stock not deducted from Odoo. Please check Odoo manually.</p>`;
        }
    } else {
        // --- Odoo NOT Connected Path ---
        console.warn('Odoo is not connected or configured. Proceeding with local checkout only. Stock will not be deducted from Odoo.');
        showNotification('Odoo not connected. Order placed locally. Stock not deducted from Odoo.');
        if (apiStatusElement) {
            apiStatusElement.textContent = 'API Status: Not Connected (Local Checkout)';
            apiStatusElement.classList.remove('connected');
            apiStatusElement.classList.add('disconnected');
        }
        odooInteractionSuccessful = false; // Explicitly set to false
        if (!isOdooConfigured) {
            odooMessage = `<p class="warning-message">Odoo not configured. Order placed locally, stock not deducted from Odoo.</p>`;
        } else {
            odooMessage = `<p class="warning-message">Odoo connection failed. Order placed locally, stock not deducted from Odoo.</p>`;
        }
    }

    // --- Common Checkout Confirmation Path ---
    // This part runs regardless of Odoo connection status and Odoo interaction success,
    // as long as local form validation passes.

    // Show confirmation modal
    checkoutModal.style.display = 'none';
    document.getElementById('order-confirmation-modal').style.display = 'flex';

    // Clear cart immediately after order is placed and confirmation modal is shown
    cart = [];
    updateCart(); // Update cart display to reflect empty cart

    const orderDetailsElement = document.getElementById('order-details');
    if (orderDetailsElement) {
        orderDetailsElement.innerHTML = `
            <i class="fas fa-check-circle success-icon"></i>
            <h3>Order Confirmed!</h3>
            <p>Thank you for your purchase, ${name}.</p>
            <p>A confirmation has been sent to ${email}.</p>
            ${odooMessage}
            <button class="btn" id="return-to-shop-btn">Return to Shop</button>
        `;
    }

    const returnToShopBtn = document.getElementById('return-to-shop-btn');
    if (returnToShopBtn) {
        returnToShopBtn.addEventListener('click', () => {
            document.getElementById('order-confirmation-modal').style.display = 'none';

            // If Odoo was connected and its interaction was successful, re-fetch products.
            // Otherwise, reset to initial hardcoded stock.
            if (isOdooConnected && odooInteractionSuccessful) {
                setTimeout(() => {
                    console.log('Re-fetching products after order to update stock display...');
                    fetchOdooProducts();
                }, 2000); // Increased delay to 2 seconds for more safety
            } else {
                // Reset products to initial hardcoded stock if Odoo was not involved or failed
                products.forEach(p => p.stock = p.initialStock);
                displayProducts();
            }
        });
    }

    // Ensure polling restarts even if the order placement had an error
    console.log('Order process finished. Ensuring stock polling is active.');
    startStockPolling(); 
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Show cart notification (renamed from showCartNotification to be consistent with showNotification)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notificationContainer.appendChild(notification); // Append to notificationContainer

    // Changed delay to 5000 milliseconds (5 seconds)
    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => notification.remove());
    }, 5000); // Display for 5 seconds
}

/**
 * Initiates the MFA setup process by requesting a QR code URL from the proxy.
 */
async function setupMfa() {
    // Clear previous status and hide QR code display
    if (mfaSetupStatus) {
        mfaSetupStatus.style.display = 'none';
        mfaSetupStatus.textContent = '';
        mfaSetupStatus.classList.remove('error', 'success');
    }
    if (mfaQrCodeDisplay) mfaQrCodeDisplay.style.display = 'none';


    if (!odooConfig.username || !odooConfig.db) {
        if (mfaSetupStatus) {
            mfaSetupStatus.textContent = 'Error: Odoo username and database are required to set up MFA.';
            mfaSetupStatus.classList.add('error');
            mfaSetupStatus.style.display = 'block';
        }
        return;
    }

    try {
        if (mfaSetupStatus) {
            mfaSetupStatus.textContent = 'Initiating MFA setup...';
            mfaSetupStatus.classList.remove('error', 'success');
            mfaSetupStatus.style.display = 'block';
        }

        const result = await odooProxyFetch('mfa_setup', {
            username: odooConfig.username,
            db: odooConfig.db
        });

        if (result && result.qrCodeUrl) {
            if (mfaQrCodeImg) mfaQrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(result.qrCodeUrl)}`;
            if (mfaQrCodeDisplay) mfaQrCodeDisplay.style.display = 'block';
            if (mfaSetupStatus) {
                mfaSetupStatus.textContent = 'MFA setup successful! Scan the QR code with your authenticator app.';
                mfaSetupStatus.classList.remove('error');
                mfaSetupStatus.classList.add('success');
            }
        } else {
            throw new Error(result.error || 'Failed to get QR code URL from proxy.');
        }
    } catch (error) {
        console.error('MFA setup failed:', error);
        if (mfaSetupStatus) {
            mfaSetupStatus.textContent = `MFA setup failed: ${error.message || 'An unexpected error occurred.'}`;
            mfaSetupStatus.classList.remove('success');
            mfaSetupStatus.classList.add('error');
        }
    }
    if (mfaSetupStatus) mfaSetupStatus.style.display = 'block';
}

/**
 * Disables MFA for the current configured Odoo user via the proxy.
 */
async function disableMfa() {
    // Clear previous status and hide QR code display
    if (mfaSetupStatus) {
        mfaSetupStatus.style.display = 'none';
        mfaSetupStatus.textContent = '';
        mfaSetupStatus.classList.remove('error', 'success');
    }
    if (mfaQrCodeDisplay) mfaQrCodeDisplay.style.display = 'none';

    if (!odooConfig.username || !odooConfig.db) {
        if (mfaSetupStatus) {
            mfaSetupStatus.textContent = 'Error: Odoo username and database are required to disable MFA.';
            mfaSetupStatus.classList.add('error');
            mfaSetupStatus.style.display = 'block';
        }
        return;
    }

    // Custom confirmation message (as per instructions, avoid alert/confirm)
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'modal';
    confirmationModal.innerHTML = `
        <div class="modal-content admin-modal">
            <span class="close-modal">&times;</span>
            <h3>Disable MFA</h3>
            <p>Are you sure you want to disable MFA for this user?</p>
            <button class="btn" id="confirm-disable-mfa">Confirm</button>
            <button class="btn btn-secondary" id="cancel-disable-mfa">Cancel</button>
        </div>
    `;
    document.body.appendChild(confirmationModal);
    confirmationModal.style.display = 'flex';

    return new Promise(resolve => {
        document.getElementById('confirm-disable-mfa').addEventListener('click', async () => {
            confirmationModal.remove();
            try {
                if (mfaSetupStatus) {
                    mfaSetupStatus.textContent = 'Disabling MFA...';
                    mfaSetupStatus.classList.remove('error', 'success');
                    mfaSetupStatus.style.display = 'block';
                }

                const result = await odooProxyFetch('mfa_disable', {
                    username: odooConfig.username,
                    db: odooConfig.db
                });

                if (result && result.message) {
                    if (mfaSetupStatus) {
                        mfaSetupStatus.textContent = result.message;
                        mfaSetupStatus.classList.remove('error');
                        mfaSetupStatus.classList.add('success');
                    }
                    // Hide MFA code input after disabling
                    if (mfaCodeGroup) mfaCodeGroup.style.display = 'none';
                } else {
                    throw new Error(result.error || 'Failed to disable MFA via proxy.');
                }
            } catch (error) {
                console.error('MFA disable failed:', error);
                if (mfaSetupStatus) {
                    mfaSetupStatus.textContent = `MFA disable failed: ${error.message || 'An unexpected error occurred.'}`;
                    mfaSetupStatus.classList.remove('success');
                    mfaSetupStatus.classList.add('error');
                }
            }
            if (mfaSetupStatus) mfaSetupStatus.style.display = 'block';
            resolve();
        });

        document.getElementById('cancel-disable-mfa').addEventListener('click', () => {
            confirmationModal.remove();
            if (mfaSetupStatus) {
                mfaSetupStatus.textContent = 'MFA disable cancelled.';
                mfaSetupStatus.classList.remove('success', 'error');
                mfaSetupStatus.style.display = 'block';
            }
            resolve();
        });

        // Close modal if clicking outside
        confirmationModal.addEventListener('click', (e) => {
            if (e.target === confirmationModal) {
                confirmationModal.remove();
                if (mfaSetupStatus) {
                    mfaSetupStatus.textContent = 'MFA disable cancelled.';
                    mfaSetupStatus.classList.remove('success', 'error');
                    mfaSetupStatus.style.display = 'block';
                }
                resolve();
            }
        });
    });
}


// Initialize the app
function init() {
    // Always display products initially from the hardcoded array.
    // Odoo products will override this if successfully fetched.
    displayProducts();

    // Cart icon click
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    // Close modals
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                // If closing the order confirmation modal, ensure cart is cleared
                if (modal.id === 'order-confirmation-modal') {
                    // Cart is already cleared in placeOrder(), just refresh product display
                    const isOdooConnected = !!odooUid;
                    const odooInteractionSuccessful = true; // Assume success if manually closing after confirmation
                    if (isOdooConnected && odooInteractionSuccessful) {
                        setTimeout(() => {
                            console.log('Re-fetching products after order to update stock display...');
                            fetchOdooProducts();
                        }, 2000);
                    } else {
                        products.forEach(p => p.stock = p.initialStock);
                        displayProducts();
                    }
                }
            }
        });
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            // If closing the order confirmation modal by clicking outside, ensure cart is cleared
            if (e.target.id === 'order-confirmation-modal') {
                // Cart is already cleared in placeOrder(), just refresh product display
                 const isOdooConnected = !!odooUid;
                 const odooInteractionSuccessful = true; // Assume success if manually closing after confirmation
                 if (isOdooConnected && odooInteractionSuccessful) {
                     setTimeout(() => {
                         console.log('Re-fetching products after order to update stock display...');
                         fetchOdooProducts();
                     }, 2000);
                 } else {
                     products.forEach(p => p.stock = p.initialStock);
                     displayProducts();
                 }
            }
        }
    });

    // Checkout button (now has ID in HTML)
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) { // Check if element exists
        checkoutBtn.addEventListener('click', showCheckout);
    }


    // Smooth scroll for "Shop Now" button
    const shopNowBtn = document.getElementById('shop-now');
    if (shopNowBtn) { // Check if element exists
        shopNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to products
            const productsSection = document.querySelector('.products');
            if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }


    // Smooth scroll for "View Lookbook" button
    const viewLookbookBtn = document.getElementById('view-lookbook');
    if (viewLookbookBtn) { // Check if element exists
        viewLookbookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const heroSection = document.querySelector('.hero');
            if (heroSection) heroSection.scrollIntoView({ behavior: 'smooth' });
        });
    }


    // Odoo API Admin Panel Toggle
    const adminToggle = document.getElementById('admin-toggle');
    if (adminToggle) { // Check if element exists
        adminToggle.addEventListener('click', () => {
            const adminModal = document.getElementById('admin-panel-modal');
            if (adminModal) { // Check if element exists
                adminModal.style.display = adminModal.style.display === 'block' ? 'none' : 'block';
                // Reset MFA section visibility on toggle
                if (mfaCodeGroup) mfaCodeGroup.style.display = 'none';
                if (mfaSetupSection) mfaSetupSection.style.display = 'none'; // Hide by default until login
                if (mfaSetupStatus) mfaSetupStatus.style.display = 'none';
                if (mfaQrCodeDisplay) mfaQrCodeDisplay.style.display = 'none';
                
                // Clear login status message on opening
                const apiStatusElement = document.getElementById('api-status');
                if (apiStatusElement) {
                    apiStatusElement.textContent = 'API Status: Not Configured'; // Reset to default
                    apiStatusElement.classList.remove('success', 'error', 'connected', 'disconnected');
                    apiStatusElement.classList.add('disconnected');
                }
            }
        });
    }


    // Odoo API Admin Panel Form Submission (Login)
    const apiConfigForm = document.getElementById('api-config-form');
    if (apiConfigForm) { // Check if element exists
        apiConfigForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const urlInput = document.getElementById('odoo-url');
            const dbInput = document.getElementById('odoo-db');
            const usernameInput = document.getElementById('odoo-username');
            const passwordInput = document.getElementById('odoo-password');
            // MFA code input is already globally referenced as mfaCodeInput

            const url = urlInput ? urlInput.value : '';
            const db = dbInput ? dbInput.value : '';
            const username = usernameInput ? usernameInput.value : '';
            const password = passwordInput ? passwordInput.value : '';
            const mfaCode = mfaCodeInput ? mfaCodeInput.value : null;

            saveOdooConfig(url, db, username, password); // Save config to local storage
            await odooLogin(mfaCode); // Attempt to log in with MFA code
        });
    }

    // New: Event listener for the Order Tracking link in the header
    const trackOrderLink = document.getElementById('track-order-link');
    if (trackOrderLink) {
        trackOrderLink.addEventListener('click', (e) => {
            e.preventDefault();
            showOrderTrackingModal();
        });
    }

    // New: Event listener for the Order Tracking form
    if (orderTrackingForm) {
        orderTrackingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await trackOrder();
        });
    }

    // New: Event listener for the Product Admin Toggle
    if (productAdminToggle) {
        productAdminToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Reset product admin login status and show login form
            productAdminUid = null;
            if (productAddFormSection) productAddFormSection.style.display = 'none';
            if (productAdminLoginSection) productAdminLoginSection.style.display = 'block';
            if (productAdminLoginStatus) productAdminLoginStatus.innerHTML = '';
            
            productAdminModal.style.display = productAdminModal.style.display === 'block' ? 'none' : 'flex'; // Use flex to center modal
            productAddStatus.innerHTML = ''; // Clear status message when opening
        });
    }

    // New: Event listener for the Product Admin Login Form submission
    if (productAdminLoginForm) {
        productAdminLoginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await handleProductAdminLogin();
        });
    }

    // New: Event listener for the Product Add Form submission
    if (productAddForm) {
        productAddForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await createProductInOdoo();
        });
    }

    // NEW: MFA Setup Button
    if (mfaSetupBtn) {
        mfaSetupBtn.addEventListener('click', setupMfa);
    }

    // NEW: MFA Disable Button
    if (mfaDisableBtn) {
        mfaDisableBtn.addEventListener('click', disableMfa);
    }

    // Load Odoo config on startup
    loadOdooConfig();
}

/**
 * Displays the Order Tracking modal.
 */
function showOrderTrackingModal() {
    orderTrackingResults.innerHTML = ''; // Clear results when opening
    orderTrackingModal.style.display = 'flex';
}

/**
 * Searches for an order in Odoo and displays its status.
 */
async function trackOrder() {
    const orderNumber = document.getElementById('track-order-number').value.trim();
    const email = document.getElementById('track-email').value.trim();
    orderTrackingResults.innerHTML = '<p>Searching for order...</p>';

    if (!orderNumber || !email) {
        orderTrackingResults.innerHTML = '<p class="warning-message">Please enter both order number and email address.</p>';
        return;
    }

    const isOdooConnected = !!odooUid;
    if (!isOdooConnected) {
        orderTrackingResults.innerHTML = '<p class="warning-message">Cannot connect to Odoo. Please check API configuration.</p>';
        return;
    }

    try {
        // Search for partner (customer) by email
        const partners = await callOdooMethod('res.partner', 'search_read', [[['email', '=', email]]], { fields: ['id', 'name'] });

        if (!partners || partners.length === 0) {
            orderTrackingResults.innerHTML = '<p class="warning-message">No customer found with this email address.</p>';
            return;
        }
        const customerId = partners[0].id;

        // Search for the sales order by order number and customer ID
        const orders = await callOdooMethod('sale.order', 'search_read', [
            [['name', '=', orderNumber], ['partner_id', '=', customerId]]
        ], {
            fields: ['name', 'state', 'partner_id', 'order_line', 'picking_ids']
        });

        if (!orders || orders.length === 0) {
            orderTrackingResults.innerHTML = '<p class="warning-message">Order not found or does not match the email address.</p>';
            return;
        }

        const order = orders[0];
        let orderStatusText = '';
        let statusClass = '';

        // Map Odoo order states to user-friendly text and a class for styling
        switch (order.state) {
            case 'draft':
                orderStatusText = 'Draft';
                statusClass = 'status-draft';
                break;
            case 'sent':
                orderStatusText = 'Sent';
                statusClass = 'status-sent';
                break;
            case 'sale':
                orderStatusText = 'Confirmed';
                statusClass = 'status-sale';
                break;
            case 'done':
                orderStatusText = 'Completed';
                statusClass = 'status-done';
                break;
            case 'cancel':
                orderStatusText = 'Cancelled';
                statusClass = 'status-cancel';
                break;
            default:
                orderStatusText = order.state;
                statusClass = '';
        }

        let pickingStatusText = 'Not yet shipped';
        let pickingStatusClass = 'status-waiting';

        if (order.picking_ids && order.picking_ids.length > 0) {
            // Fetch details of the picking(s)
            const pickings = await callOdooMethod('stock.picking', 'read', order.picking_ids, { fields: ['name', 'state'] });
            if (pickings && pickings.length > 0) {
                const picking = pickings[0]; // Assume the first picking
                switch (picking.state) {
                    case 'draft':
                        pickingStatusText = 'Delivery: Draft';
                        pickingStatusClass = 'status-draft';
                        break;
                    case 'waiting':
                        pickingStatusText = 'Delivery: Waiting for availability';
                        pickingStatusClass = 'status-waiting';
                        break;
                    case 'confirmed':
                        pickingStatusText = 'Delivery: Confirmed';
                        pickingStatusClass = 'status-sent';
                        break;
                    case 'assigned':
                        pickingStatusText = 'Delivery: Ready for shipment';
                        pickingStatusClass = 'status-assigned';
                        break;
                    case 'done':
                        pickingStatusText = 'Delivery: Shipped';
                        pickingStatusClass = 'status-done';
                        break;
                    case 'cancel':
                        pickingStatusText = 'Delivery: Cancelled';
                        pickingStatusClass = 'status-cancel';
                        break;
                    default:
                        pickingStatusText = `Delivery: ${picking.state}`;
                        pickingStatusClass = '';
                }
            }
        }

        // Fetch product details for order lines
        const orderLineProductIds = order.order_line.map(lineId => lineId); // order_line contains IDs of sale.order.line
        const orderLinesDetails = await callOdooMethod('sale.order.line', 'read', orderLineProductIds, { fields: ['product_id', 'product_uom_qty', 'price_unit'] });

        let productsInOrder = '';
        if (orderLinesDetails && orderLinesDetails.length > 0) {
            for (const line of orderLinesDetails) {
                // Fetch product name using product_id[1] which is the name in Odoo's many2one field
                const productName = line.product_id[1];
                productsInOrder += `<li>${productName} (x${line.product_uom_qty}) - $${line.price_unit.toFixed(2)}</li>`;
            }
        } else {
            productsInOrder = '<li>No products found for this order.</li>';
        }


        orderTrackingResults.innerHTML = `
            <h4>Order: ${order.name}</h4>
            <p>Status: <span class="status-indicator ${statusClass}">${orderStatusText}</span></p>
            <p>Delivery Status: <span class="status-indicator ${pickingStatusClass}">${pickingStatusText}</span></p>
            <h4>Ordered Products:</h4>
            <ul>
                ${productsInOrder}
            </ul>
        `;

    } catch (error) {
        console.error('Error tracking order:', error);
        orderTrackingResults.innerHTML = `<p class="warning-message">An error occurred while tracking the order. Please ensure Odoo API is configured correctly and the order number and email are valid.</p>`;
    }
}

/**
 * Handles the login for the product administration panel.
 * Uses separate credentials for a privileged Odoo user.
 */
async function handleProductAdminLogin() {
    const username = document.getElementById('product-admin-username').value.trim();
    const password = document.getElementById('product-admin-password').value.trim();

    productAdminLoginStatus.innerHTML = ''; // Clear previous status
    productAdminLoginStatus.classList.remove('success', 'error');

    if (!odooConfig.url || !odooConfig.db) {
        productAdminLoginStatus.innerHTML = '<p class="warning-message">Main Odoo API configuration is missing. Please configure it first.</p>';
        productAdminLoginStatus.classList.add('error');
        return;
    }
    if (!username || !password) {
        productAdminLoginStatus.innerHTML = '<p class="warning-message">Please enter username and password.</p>';
        productAdminLoginStatus.classList.add('error');
        return;
    }

    productAdminLoginStatus.innerHTML = '<p>Logging in...</p>';
    productAdminLoginStatus.classList.add('success'); // Use success color for "processing"

    try {
        const loginPayload = {
            odooConfig: { ...odooConfig, username, password } // Use provided credentials for this login
        };
        const result = await odooProxyFetch('login', loginPayload);

        if (result && result.result) {
            productAdminUid = result.result; // Store the UID for the product admin session
            productAdminLoginStatus.innerHTML = '<p>Login successful! You can now add products.</p>';
            productAdminLoginStatus.classList.remove('error');
            productAdminLoginStatus.classList.add('success');
            
            // Show product add form and hide login form
            if (productAdminLoginSection) productAdminLoginSection.style.display = 'none';
            if (productAddFormSection) productAddFormSection.style.display = 'block';
        } else {
            throw new Error('Authentication failed for product admin.');
        }
    } catch (error) {
        console.error('Product admin login failed:', error);
        productAdminUid = null;
        productAdminLoginStatus.innerHTML = `<p class="warning-message">Login failed: ${error.message || 'Invalid credentials.'}</p>`;
        productAdminLoginStatus.classList.remove('success');
        productAdminLoginStatus.classList.add('error');
    }
}

/**
 * Creates a new product in Odoo via the admin panel.
 */
async function createProductInOdoo() {
    const productName = document.getElementById('product-name').value.trim();
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const productImage = document.getElementById('product-image-url').value.trim();
    const productStock = parseInt(document.getElementById('product-stock').value);

    productAddStatus.innerHTML = ''; // Clear previous status
    productAddStatus.classList.remove('success', 'error');

    if (!productAdminUid) { // Check if product admin is logged in
        productAddStatus.innerHTML = '<p class="warning-message">You are not logged in for product administration. Please log in above.</p>';
        productAddStatus.classList.add('error');
        return;
    }

    if (!productName || isNaN(productPrice) || isNaN(productStock)) {
        productAddStatus.innerHTML = '<p class="warning-message">Please fill in all required fields (Name, Price, Initial Stock) with valid values.</p>';
        productAddStatus.classList.add('error');
        return;
    }

    try {
        productAddStatus.innerHTML = '<p>Adding product to Odoo...</p>';
        productAddStatus.classList.add('success'); // Use success color for "processing"

        const productData = {
            name: productName,
            list_price: productPrice, // Sale price
            standard_price: productPrice, // Cost price (can be same as sale price for simplicity)
            qty_available: productStock, // Initial stock
            type: 'product', // 'product' for storable products
            // If you want to upload image, you'd need to convert it to base64
            // For now, we'll just store the URL or leave it blank if no URL provided
            image_1920: await convertImageUrlToBase64(productImage) // Convert image URL to base64
        };

        // Use productAdminUid for this specific Odoo call
        const newProductId = await callOdooMethod('product.template', 'create', [productData], {}, productAdminUid);

        if (newProductId) {
            productAddStatus.innerHTML = `<p>Product "${productName}" added to Odoo with ID: ${newProductId}.</p>`;
            productAddStatus.classList.remove('error');
            productAddStatus.classList.add('success');
            // Clear form
            productAddForm.reset();
            // Refresh product list on main page
            fetchOdooProducts();
        } else {
            throw new Error('Failed to get new product ID from Odoo.');
        }

    } catch (error) {
        console.error('Error adding product to Odoo:', error);
        productAddStatus.innerHTML = `<p class="warning-message">Failed to add product: ${error.message || 'An unexpected error occurred.'}</p>`;
        productAddStatus.classList.remove('success');
        productAddStatus.classList.add('error');
    }
}

/**
 * Converts an image URL to a base64 string.
 * This is needed because Odoo's image_1920 field expects base64 data.
 * @param {string} url The URL of the image.
 * @returns {Promise<string>} A base64 encoded string of the image.
 */
async function convertImageUrlToBase64(url) {
    if (!url) return false; // Return false or empty string if no URL is provided

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for image URL: ${url}`);
        }
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Remove the "data:image/jpeg;base64," prefix
                const base64data = reader.result.split(',')[1];
                resolve(base64data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error converting image URL to base64:', error);
        showNotification('Failed to load product image. Please check the URL.');
        return false; // Return false on error
    }
}


// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
