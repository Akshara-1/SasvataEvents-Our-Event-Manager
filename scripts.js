let events = [
    {
            id: 1,
            name: "Cyber pulse concert",
            type: "Concert",
            date: "2025-05-01T20:00",
            price: 50,
            ticketsAvailable: 100,
            image: "https://images.stockcake.com/public/2/4/2/24216587-34a9-4a17-946a-ff9427afe708_large/neon-concert-future-stockcake.jpg",
            audio: "audio/cyber_pulse_preview.mp3",
            video: "https://www.youtube.com/embed/inWWhr5tnEA?si=9B0RZQQsCLOWXbHi" 
        },
        
    {
        id: 2,
        name: "Neon Hack Workshop",
        type: "Workshop",
        date: "2025-06-15T10:00",
        price: 30,
        ticketsAvailable: 50,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        audio: "audio/neon_hack_preview.mp3",
        video: "https://www.youtube.com/embed/c-I5S_zTwAc?si=zWJnNkNHAyby5VCb"
    },
    {
        id: 3,
        name: "Quantum Clash Show",
        type: "Show",
        date: "2025-07-20T12:00",
        price: 75,
        ticketsAvailable: 200,
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        audio: "audio/quantum_clash_preview.mp3",
        video: "https://www.youtube.com/embed/Z4pCqK-V_Wo?si=NGxNMu8-0oZhFtp-"
    },
    {
        id: 4,
        name: "Synthwave Nights",
        type: "Concert",
        date: "2025-08-10T21:00",
        price: 60,
        ticketsAvailable: 150,
        image: "https://thumbs.dreamstime.com/b/neon-synthwave-city-night-seen-rooftop-glowing-signs-rain-futuristic-synthwave-cityscape-viewed-rooftop-373703165.jpg",
        audio: "audio/synthwave_nights_preview.mp3",
        video: "https://www.youtube.com/embed/4xDzrJKXOOY"
    }

];

const merch = [
    {
        id: 1,
        name: "Cyber Pulse Tee",
        price: 25,
        eventId: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrp36-o1P_H4EgH_BW4RG1x8LnvevvPkqOqQ&s"
    },
    {
        id: 2,
        name: "Neon Hack Cap",
        price: 20,
        eventId: 2,
        image: "https://m.media-amazon.com/images/I/61MQULfsDGL._AC_UY1100_.jpg"
    },
    {
        id: 3,
        name: "Quantum Clash Poster",
        price: 15,
        eventId: 3,
        image: "https://static.vecteezy.com/system/resources/previews/014/036/541/non_2x/neon-rhombus-on-retro-background-landscape-glowing-rhombus-cosmos-poster-neon-light-box-cube-light-future-purple-80s-sci-fi-poster-vector.jpg"
    },
    {
        id: 4,
        name: "Synthwave Vinyl",
        price: 30,
        eventId: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh1P6aSaiewKbXHnNYQH7z6Cw2-89UISMs7g&s"
    }
];

const newsletters = [
    {
        id: "NL-001",
        title: "Cyber Pulse Concert Preview",
        date: "2025-04-01",
        summary: "Get ready for the electrifying Cyber Pulse Concert!",
        content: "Join us for an unforgettable night of music and lights at the Cyber Pulse Concert. Exclusive ticket discounts available for subscribers!"
    },
    {
        id: "NL-002",
        title: "Neon Hack Workshop Tips",
        date: "2025-04-10",
        summary: "Prepare for the Neon Hack Workshop with our expert tips.",
        content: "Learn the basics of coding and hacking at our Neon Hack Workshop. Check out our beginner's guide and early bird offers!"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let posts = JSON.parse(localStorage.getItem("posts")) || [
    {
        id: "POST-XYZ123",
        title: "Excited for Cyber Pulse!",
        author: "Jane Doe",
        content: "Can't wait to attend the Cyber Pulse Concert. Who's going?",
        timestamp: "2025-04-01T10:00:00Z"
    },
    {
        id: "POST-ABC456",
        title: "Neon Hack Tips",
        author: "John Smith",
        content: "Any tips for the Neon Hack Workshop? I'm a beginner in coding.",
        timestamp: "2025-04-02T12:00:00Z"
    }
];

// Load events from localStorage if available
function loadEvents() {
    const savedEvents = JSON.parse(localStorage.getItem("events"));
    if (savedEvents) {
        events = savedEvents;
        console.log("Loaded events from localStorage:", events);
    }
}

// Save events to localStorage
function saveEvents() {
    try {
        localStorage.setItem("events", JSON.stringify(events));
        console.log("Saved events to localStorage:", events);
    } catch (error) {
        console.error("Error saving events to localStorage:", error);
        showNotification("Error saving event data", "error");
        alert("Critical error: Unable to save event data. Please try again later.");
    }
}

function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`Saved ${key} to localStorage`);
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
        showNotification(`Error saving ${key}`, "error");
        alert(`Critical error: Unable to save ${key}. Please try again later.`);
    }
}

function showNotification(message, type) {
    const notification = document.getElementById("notification");
    if (!notification) {
        console.warn("Notification element not found");
        alert(message);
        return;
    }
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = "block";
    console.log(`Showing ${type} notification: ${message}`);
    setTimeout(() => {
        notification.style.display = "none";
        console.log(`Hiding notification: ${message}`);
    }, 3000);
}

function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");
    if (cartCounter) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = count;
        console.log(`Updated cart counter: ${count}`);
    } else {
        console.warn("Cart counter element not found");
    }
}

function renderCountdown(event, container) {
    const eventDate = new Date(event.date).getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    if (distance > 0 && distance < 30 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        container.innerHTML = `<p class="countdown">${sanitizeHTML(event.name)} starts in ${days}d ${hours}h</p>`;
    } else {
        container.innerHTML = "";
    }
}

function sanitizeHTML(str) {
    if (window.DOMPurify && str) {
        return DOMPurify.sanitize(str, { ALLOWED_TAGS: ['p', 'strong', 'em'] });
    }
    const div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
}

function debounce(fn, ms) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), ms);
    };
}

function renderEvents(containerId) {
    const eventList = document.getElementById(containerId);
    if (!eventList) {
        console.error(`Event container ${containerId} not found`);
        showNotification("Error displaying events", "error");
        alert("Critical error: Event display container missing.");
        return;
    }
    const search = (document.getElementById("search")?.value || "").toLowerCase().trim();
    const type = document.getElementById("type")?.value || "";
    const startDate = document.getElementById("start-date")?.value;
    const endDate = document.getElementById("end-date")?.value;
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(search);
        const matchesType = !type || event.type === type;
        const eventDate = new Date(event.date).getTime();
        const matchesStart = !startDate || eventDate >= new Date(startDate).getTime();
        const matchesEnd = !endDate || eventDate <= new Date(endDate).setHours(23, 59, 59, 999);
        return matchesSearch && matchesType && matchesStart && matchesEnd;
    });
    eventList.innerHTML = filteredEvents.length === 0 ? "<p>No events match your criteria.</p>" : "";
    const fragment = document.createDocumentFragment();
    filteredEvents.forEach(event => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${sanitizeHTML(event.image)}" alt="${sanitizeHTML(event.name)}" loading="lazy">
            <h3>${sanitizeHTML(event.name)}</h3>
            <p>Type: ${sanitizeHTML(event.type)}</p>
            <p>Date: ${new Date(event.date).toLocaleString()}</p>
            <p>Price: $${event.price}</p>
            <p>Tickets Available: ${event.ticketsAvailable}</p>
            <div class="countdown"></div>
            <audio controls src="${sanitizeHTML(event.audio)}" aria-label="Preview of ${event.name}"></audio>
            <input type="number" min="1" max="${event.ticketsAvailable}" value="1" style="width:60px;padding:5px;margin:10px;" aria-label="Ticket quantity for ${event.name}">
            <button class="btn" ${event.ticketsAvailable <= 0 ? "disabled" : ""} onclick="addToCart(${event.id}, 'ticket', this.previousElementSibling.value)">Add Tickets</button>
        `;
        fragment.appendChild(card);
        const countdown = card.querySelector(".countdown");
        renderCountdown(event, countdown);
    });
    eventList.appendChild(fragment);
    setInterval(() => {
        const countdowns = eventList.querySelectorAll(".countdown");
        countdowns.forEach((countdown, index) => renderCountdown(filteredEvents[index], countdown));
    }, 60000);
}

function renderMerch(containerId) {
    const merchList = document.getElementById(containerId);
    if (!merchList) {
        console.error(`Merch container ${containerId} not found`);
        showNotification("Error displaying merch", "error");
        alert("Critical error: Merch display container missing.");
        return;
    }
    const fragment = document.createDocumentFragment();
    merch.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${sanitizeHTML(item.image)}" alt="${sanitizeHTML(item.name)}" loading="lazy">
            <h3>${sanitizeHTML(item.name)}</h3>
            <p>Event: ${sanitizeHTML(events.find(e => e.id === item.eventId)?.name || 'Unknown')}</p>
            <p>Price: $${item.price}</p>
            <input type="number" min="1" value="1" style="width:60px;padding:5px;margin:10px;" aria-label="Quantity for ${item.name}">
            <button class="btn" onclick="addToCart(${item.id}, 'merch', this.previousElementSibling.value)">Add to Cart</button>
        `;
        fragment.appendChild(card);
    });
    merchList.innerHTML = "";
    merchList.appendChild(fragment);
}

function renderCart(containerId, totalId, toggleId) {
    try {
        const cartItems = document.getElementById(containerId);
        const cartTotal = document.getElementById(totalId);
        const toggleCart = document.getElementById(toggleId);
        if (!cartItems || !cartTotal || !toggleCart) {
            throw new Error(`Cart elements missing: ${containerId}, ${totalId}, ${toggleId}`);
        }
        cartItems.innerHTML = cart.length === 0 ? "<p>Your cart is empty.</p>" : "";
        let total = 0;
        const fragment = document.createDocumentFragment();
        cart.forEach((item, index) => {
            if (!item.name || !item.price || !item.quantity) {
                console.warn(`Invalid cart item at index ${index}:`, item);
                return;
            }
            total += item.price * item.quantity;
            const div = document.createElement("div");
            div.className = "flex justify-between items-center mb-4";
            div.innerHTML = `
                <div>
                    <p>${sanitizeHTML(item.name)} (${sanitizeHTML(item.type)})</p>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <div class="flex items-center">
                    <input type="number" value="${item.quantity}" min="1" onchange="debouncedUpdateQuantity(${index}, this.value)" style="width:60px;padding:5px;" aria-label="Update quantity for ${item.name}">
                    <button class="btn remove-btn" onclick="removeFromCart(${index})" aria-label="Remove ${item.name} from cart">Remove</button>
                </div>
            `;
            fragment.appendChild(div);
        });
        cartItems.appendChild(fragment);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        toggleCart.textContent = `Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`;
        saveToStorage("cart", cart);
        updateCartCounter();
        console.log("Cart rendered with remove buttons");
    } catch (error) {
        console.error(error);
        showNotification("Error displaying cart", "error");
        alert("Critical error: Unable to display cart. Please refresh the page.");
    }
}

const debouncedUpdateQuantity = debounce((index, value) => updateQuantity(index, value), 300);

function addToCart(id, type, quantity) {
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity < 1) {
        showNotification("Invalid quantity", "error");
        return;
    }
    const source = type === "ticket" ? events : merch;
    const item = source.find(i => i.id === id);
    if (!item) {
        console.error(`Item ${id} (${type}) not found`);
        showNotification("Item not found", "error");
        return;
    }
    if (type === "ticket" && item.ticketsAvailable < quantity) {
        showNotification(`Only ${item.ticketsAvailable} tickets left for ${sanitizeHTML(item.name)}`, "error");
        return;
    }
    const cartItem = cart.find(ci => ci.id === id && ci.type === type);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ ...item, type, quantity });
    }
    if (type === "ticket") {
        item.ticketsAvailable -= quantity;
        saveEvents();
        if (document.getElementById("event-list")) {
            renderEvents("event-list");
        }
    }
    saveToStorage("cart", cart);
    showNotification(`${sanitizeHTML(item.name)} added to cart!`, "success");
    updateCartCounter();
    if (document.getElementById("cart-items")) {
        renderCart("cart-items", "cart-total", "cart-counter");
    }
}

function removeFromCart(index) {
    if (index < 0 || index >= cart.length) {
        console.error(`Invalid cart index: ${index}`);
        showNotification("Error removing item", "error");
        return;
    }
    const item = cart[index];
    const itemName = item.name;
    console.log(`Removing item: ${itemName} at index ${index}`);
    if (item.type === "ticket") {
        const event = events.find(e => e.id === item.id);
        if (event) {
            event.ticketsAvailable += item.quantity;
            saveEvents();
            if (document.getElementById("event-list")) {
                renderEvents("event-list");
            }
        }
    }
    cart.splice(index, 1);
    saveToStorage("cart", cart);
    if (document.getElementById("cart-items")) {
        renderCart("cart-items", "cart-total", "cart-counter");
    }
    showNotification(`${sanitizeHTML(itemName)} removed from cart`, "success");
}

function saveOrder(order) {
    orders.unshift(order);
    if (orders.length > 100) orders.pop();
    saveToStorage("orders", orders);
}

function renderOrders(containerId) {
    const orderList = document.getElementById(containerId);
    if (!orderList) {
        console.error(`Order container ${containerId} not found`);
        showNotification("Error displaying orders", "error");
        alert("Critical error: Order display container missing.");
        return;
    }
    orderList.innerHTML = orders.length === 0 ? "<p>No orders found.</p>" : `
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="order-table-body"></tbody>
        </table>
    `;
    const tbody = document.getElementById("order-table-body");
    if (!tbody) return;
    const fragment = document.createDocumentFragment();
    orders.forEach(order => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td data-label="Order ID">${sanitizeHTML(order.id)}</td>
            <td data-label="Date">${new Date(order.timestamp).toLocaleString()}</td>
            <td data-label="Total">$${order.total}</td>
            <td data-label="Actions"><button class="btn" onclick="showOrderDetails('${order.id}')">View Details</button></td>
        `;
        fragment.appendChild(tr);
    });
    tbody.innerHTML = "";
    tbody.appendChild(fragment);
}

function showOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        showNotification("Order not found", "error");
        return;
    }
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Order ${sanitizeHTML(order.id)}</h3>
            <p><strong>Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
            <p><strong>Total:</strong> $${order.total}</p>
            <p><strong>Name:</strong> ${sanitizeHTML(order.billing.name)}</p>
            <p><strong>Email:</strong> ${sanitizeHTML(order.billing.email)}</p>
            <p><strong>Postal Code:</strong> ${sanitizeHTML(order.billing.postalCode)}</p>
            <h4>Items:</h4>
            <ul>
                ${order.items.map(item => `
                    <li>${sanitizeHTML(item.name)} (${sanitizeHTML(item.type)}) - ${item.quantity} x $${item.price}</li>
                `).join("")}
            </ul>
            <button class="btn" onclick="this.closest('.modal').remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity < 1) {
        removeFromCart(index);
        return;
    }
    const item = cart[index];
    if (item.type === "ticket") {
        const event = events.find(e => e.id === item.id);
        if (event) {
            const delta = quantity - item.quantity;
            if (delta > 0 && event.ticketsAvailable < delta) {
                showNotification(`Only ${event.ticketsAvailable} tickets left for ${sanitizeHTML(item.name)}`, "error");
                return;
            }
            event.ticketsAvailable -= delta;
            saveEvents();
            if (document.getElementById("event-list")) {
                renderEvents("event-list");
            }
        }
    }
    cart[index].quantity = quantity;
    saveToStorage("cart", cart);
    renderCart("cart-items", "cart-total", "cart-counter");
    showNotification("Quantity updated", "success");
}

function generateOrderId() {
    return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function savePost(post) {
    posts.unshift(post);
    if (posts.length > 100) posts.pop();
    saveToStorage("posts", posts);
}

function renderPosts(containerId) {
    const postList = document.getElementById(containerId);
    if (!postList) {
        console.error(`Post container ${containerId} not found`);
        showNotification("Error displaying posts", "error");
        alert("Critical error: Post display container missing.");
        return;
    }
    postList.innerHTML = posts.length === 0 ? "<p>No posts found.</p>" : `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody id="post-table-body"></tbody>
        </table>
    `;
    const tbody = document.getElementById("post-table-body");
    if (!tbody) return;
    const fragment = document.createDocumentFragment();
    posts.forEach(post => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td data-label="Title">${sanitizeHTML(post.title)}</td>
            <td data-label="Author">${sanitizeHTML(post.author)}</td>
            <td data-label="Date">${new Date(post.timestamp).toLocaleString()}</td>
        `;
        tr.onclick = () => showPostDetails(post.id);
        fragment.appendChild(tr);
    });
    tbody.innerHTML = "";
    tbody.appendChild(fragment);
}

function showPostDetails(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) {
        showNotification("Post not found", "error");
        return;
    }
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${sanitizeHTML(post.title)}</h3>
            <p><strong>Author:</strong> ${sanitizeHTML(post.author)}</p>
            <p><strong>Date:</strong> ${new Date(post.timestamp).toLocaleString()}</p>
            <p><strong>Content:</strong> ${sanitizeHTML(post.content)}</p>
            <button class="btn" onclick="this.closest('.modal').remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function generatePostId() {
    return "POST-" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function renderGalleries() {
    const photoGallery = document.getElementById("photo-gallery");
    const videoGallery = document.getElementById("video-gallery");
    if (!photoGallery || !videoGallery) return;
    const photoFragment = document.createDocumentFragment();
    const videoFragment = document.createDocumentFragment();
    events.forEach(event => {
        const img = document.createElement("img");
        img.src = sanitizeHTML(event.image);
        img.alt = sanitizeHTML(event.name);
        img.loading = "lazy";
        img.onclick = () => {
            const modal = document.createElement("div");
            modal.className = "modal";
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${img.src}" alt="${img.alt}" style="max-width:90%;max-height:90%;border-radius:8px;">
                    <button class="btn" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
        };
        photoFragment.appendChild(img);
        const iframe = document.createElement("iframe");
        iframe.src = sanitizeHTML(event.video);
        iframe.title = sanitizeHTML(event.name);
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.onclick = () => {
            const modal = document.createElement("div");
            modal.className = "modal";
            modal.innerHTML = `
                <div class="modal-content">
                    <iframe src="${iframe.src}" title="${iframe.title}" style="width:90%;height:500px;border-radius:8px;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <button class="btn" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
        };
        videoFragment.appendChild(iframe);
    });
    photoGallery.innerHTML = "";
    videoGallery.innerHTML = "";
    photoGallery.appendChild(photoFragment);
    videoGallery.appendChild(videoFragment);
}
function updateSubscriberCount() {
    const total = document.getElementById("subscriber-total");
    if (total) {
        const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
        total.textContent = subscribers.length;
        console.log(`Updated subscriber count: ${subscribers.length}`);
    }
}

function renderNewsletters(containerId) {
    const newsletterList = document.getElementById(containerId);
    if (!newsletterList) {
        console.error(`Newsletter container ${containerId} not found`);
        showNotification("Error displaying newsletters", "error");
        alert("Critical error: Newsletter display container missing.");
        return;
    }
    newsletterList.innerHTML = newsletters.length === 0 ? "<p>No newsletters found.</p>" : `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody id="newsletter-table-body"></tbody>
        </table>
    `;
    const tbody = document.getElementById("newsletter-table-body");
    if (!tbody) return;
    const fragment = document.createDocumentFragment();
    newsletters.forEach(nl => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td data-label="Title">${sanitizeHTML(nl.title)}</td>
            <td data-label="Date">${sanitizeHTML(nl.date)}</td>
            <td data-label="Summary">${sanitizeHTML(nl.summary)}</td>
        `;
        tr.onclick = () => showNewsletterDetails(nl.id);
        fragment.appendChild(tr);
    });
    tbody.innerHTML = "";
    tbody.appendChild(fragment);
}

function showNewsletterDetails(newsletterId) {
    const nl = newsletters.find(n => n.id === newsletterId);
    if (!nl) {
        showNotification("Newsletter not found", "error");
        return;
    }
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${sanitizeHTML(nl.title)}</h3>
            <p><strong>Date:</strong> ${sanitizeHTML(nl.date)}</p>
            <p><strong>Summary:</strong> ${sanitizeHTML(nl.summary)}</p>
            <p><strong>Content:</strong> ${sanitizeHTML(nl.content)}</p>
            <button class="btn" onclick="this.closest('.modal').remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function shareNewsletter(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Join the SasvataEvents Newsletter for exclusive event updates and offers!");
    let shareUrl;
    if (platform === "twitter") {
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === "facebook") {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}"e=${text}`;
    }
    window.open(shareUrl, "_blank");
}

function initializeNewsletter() {
    const form = document.getElementById("newsletter-form");
    const unsubscribeForm = document.getElementById("unsubscribe-form");
    const emailInput = document.getElementById("email");
    const unsubscribeEmailInput = document.getElementById("unsubscribe-email");
    const emailError = document.getElementById("email-error");
    const unsubscribeEmailError = document.getElementById("unsubscribe-email-error");
    const confirmation = document.getElementById("newsletter-confirmation");

    if (!form || !unsubscribeForm || !emailInput || !unsubscribeEmailInput || !emailError || !unsubscribeEmailError || !confirmation) {
        console.error("Newsletter form elements not found");
        alert("Critical error: Newsletter form elements missing. Please refresh the page.");
        return;
    }
    console.log("Newsletter initialized");

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const showSpinner = (button) => {
        const spinner = button.querySelector(".spinner");
        if (spinner) spinner.style.display = "inline-block";
        button.disabled = true;
    };

    const hideSpinner = (button) => {
        const spinner = button.querySelector(".spinner");
        if (spinner) spinner.style.display = "none";
        button.disabled = false;
    };

    emailInput.addEventListener("input", () => {
        const email = emailInput.value.trim();
        emailInput.classList.remove("invalid", "valid");
        emailError.textContent = "";
        if (email && !validateEmail(email)) {
            emailInput.classList.add("invalid");
            emailError.textContent = "Invalid email address";
            showNotification("Invalid email address", "error");
        } else if (email) {
            emailInput.classList.add("valid");
        }
    });

    unsubscribeEmailInput.addEventListener("input", () => {
        const email = unsubscribeEmailInput.value.trim();
        unsubscribeEmailInput.classList.remove("invalid", "valid");
        unsubscribeEmailError.textContent = "";
        if (email && !validateEmail(email)) {
            unsubscribeEmailInput.classList.add("invalid");
            unsubscribeEmailError.textContent = "Invalid email address";
            showNotification("Invalid email address", "error");
        } else if (email) {
            unsubscribeEmailInput.classList.add("valid");
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const button = form.querySelector("button");
        showSpinner(button);
        const email = sanitizeHTML(emailInput.value.trim());
        const preferences = Array.from(form.querySelectorAll("input[name='preferences']:checked")).map(cb => cb.value);

        if (!email) {
            emailError.textContent = "Please enter an email address";
            emailInput.classList.add("invalid");
            showNotification("Please enter an email address", "error");
            hideSpinner(button);
            return;
        }

        if (!validateEmail(email)) {
            emailError.textContent = "Invalid email address";
            emailInput.classList.add("invalid");
            showNotification("Invalid email address", "error");
            hideSpinner(button);
            return;
        }

        const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
        if (subscribers.some(sub => sub.email === email)) {
            emailError.textContent = "This email is already subscribed";
            emailInput.classList.add("invalid");
            showNotification("This email is already subscribed", "error");
            hideSpinner(button);
            return;
        }

        try {
            subscribers.push({ email, preferences });
            saveToStorage("subscribers", subscribers);
            form.reset();
            emailInput.classList.remove("valid", "invalid");
            emailError.textContent = "";
            confirmation.style.display = "block";
            showNotification("Subscribed successfully!", "success");
            console.log(`Subscription alert for ${email}`);
            alert("You have successfully subscribed to the SasvataEvents newsletter!");
            updateSubscriberCount();
            setTimeout(() => (confirmation.style.display = "none"), 5000);
        } catch (error) {
            showNotification("Error subscribing to newsletter", "error");
            alert("Critical error: Unable to subscribe. Please try again later.");
        } finally {
            hideSpinner(button);
        }
    });

    unsubscribeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const button = unsubscribeForm.querySelector("button");
        showSpinner(button);
        const email = sanitizeHTML(unsubscribeEmailInput.value.trim());

        if (!email) {
            unsubscribeEmailError.textContent = "Please enter an email address";
            unsubscribeEmailInput.classList.add("invalid");
            showNotification("Please enter an email address", "error");
            hideSpinner(button);
            return;
        }

        if (!validateEmail(email)) {
            unsubscribeEmailError.textContent = "Invalid email address";
            unsubscribeEmailInput.classList.add("invalid");
            showNotification("Invalid email address", "error");
            hideSpinner(button);
            return;
        }

        let subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
        if (!subscribers.some(sub => sub.email === email)) {
            unsubscribeEmailError.textContent = "This email is not subscribed";
            unsubscribeEmailInput.classList.add("invalid");
            showNotification("This email is not subscribed", "error");
            hideSpinner(button);
            return;
        }

        try {
            subscribers = subscribers.filter(sub => sub.email !== email);
            saveToStorage("subscribers", subscribers);
            unsubscribeForm.reset();
            unsubscribeEmailInput.classList.remove("valid", "invalid");
            unsubscribeEmailError.textContent = "";
            showNotification("Unsubscribed successfully!", "success");
            console.log(`Unsubscription alert for ${email}`);
            alert("You have successfully unsubscribed from the SasvataEvents newsletter!");
            updateSubscriberCount();
        } catch (error) {
            showNotification("Error unsubscribing from newsletter", "error");
            alert("Critical error: Unable to unsubscribe. Please try again later.");
        } finally {
            hideSpinner(button);
        }
    });
}

// Initialize page-specific logic
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded, initializing pages");
    loadEvents();
    if (document.getElementById("event-list")) {
        console.log("Initializing events page");
        updateCartCounter();
        renderEvents("event-list");
        const filterForm = document.getElementById("filter-form");
        if (filterForm) {
            filterForm.addEventListener("submit", (e) => {
                e.preventDefault();
                renderEvents("event-list");
            });
        }
    }
    if (document.getElementById("cart-items")) {
        console.log("Initializing cart page");
        updateCartCounter();
        renderCart("cart-items", "cart-total", "cart-counter");
    }
    if (document.getElementById("newsletter-form")) {
        console.log("Initializing newsletter page");
        updateCartCounter();
        initializeNewsletter();
        renderNewsletters("newsletter-list");
        updateSubscriberCount();
    }
});