let allOrders = [];
let filteredOrders = [];

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            document.getElementById('adminEmail').textContent = user.email;
            loadOrders();
        } else {
            // User is signed out, redirect to login
            window.location.href = 'admin-login.html';
        }
    });
});

function loadOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">Loading orders...</div>';
    
    // Get orders from Firestore
    db.collection('orders')
        .orderBy('orderDate', 'desc')
        .get()
        .then((querySnapshot) => {
            allOrders = [];
            querySnapshot.forEach((doc) => {
                const orderData = doc.data();
                orderData.id = doc.id;
                allOrders.push(orderData);
            });
            
            filteredOrders = [...allOrders];
            displayOrders();
        })
        .catch((error) => {
            console.error('Error loading orders:', error);
            ordersList.innerHTML = '<div style="text-align: center; padding: 40px; color: #f44336;">Error loading orders. Please refresh the page.</div>';
        });
}

function displayOrders() {
    const ordersList = document.getElementById('ordersList');
    
    if (filteredOrders.length === 0) {
        ordersList.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No orders found.</div>';
        return;
    }
    
    ordersList.innerHTML = filteredOrders.map(order => createOrderHTML(order)).join('');
}

function createOrderHTML(order) {
    const orderDate = order.orderDate ? new Date(order.orderDate.toDate()).toLocaleString() : 'N/A';
    const statusClass = order.status || 'pending';
    
    return `
        <div class="order-item" data-order-id="${order.id}">
            <div class="order-header">
                <div>
                    <div class="order-id">${order.orderId || 'N/A'}</div>
                    <div class="order-date">${orderDate}</div>
                </div>
                <span class="order-status ${statusClass}">${statusClass}</span>
            </div>
            
            <div class="order-details">
                <div class="meal-info">
                    <h4>Meal Details</h4>
                    <p><strong>Meal:</strong> ${order.meal}</p>
                    <p><strong>Ingredients:</strong> ${order.ingredients ? order.ingredients.join(', ') : 'N/A'}</p>
                    <p><strong>Spices:</strong> ${order.spices ? order.spices.join(', ') : 'None'}</p>
                    <p><strong>Total Price:</strong> ₦${order.pricing ? order.pricing.totalPrice.toLocaleString() : 'N/A'}</p>
                </div>
                
                <div class="customer-info">
                    <h4>Customer Information</h4>
                    <p><strong>Name:</strong> ${order.customerInfo ? order.customerInfo.name : 'N/A'}</p>
                    <p><strong>Phone:</strong> ${order.customerInfo ? order.customerInfo.phone : 'N/A'}</p>
                    <p><strong>Email:</strong> ${order.customerInfo ? order.customerInfo.email : 'N/A'}</p>
                    <p><strong>Address:</strong> ${order.customerInfo ? order.customerInfo.address : 'N/A'}</p>
                    <p><strong>City:</strong> ${order.customerInfo ? order.customerInfo.city : 'N/A'}</p>
                    ${order.customerInfo && order.customerInfo.deliveryInstructions ? 
                        `<p><strong>Instructions:</strong> ${order.customerInfo.deliveryInstructions}</p>` : ''}
                </div>
            </div>
            
            <div class="order-actions">
                ${getActionButtons(order.status, order.id)}
            </div>
        </div>
    `;
}

function getActionButtons(status, orderId) {
    switch (status) {
        case 'pending':
            return `
                <button class="action-btn primary" onclick="updateOrderStatus('${orderId}', 'preparing')">Start Preparing</button>
                <button class="action-btn danger" onclick="updateOrderStatus('${orderId}', 'cancelled')">Cancel Order</button>
            `;
        case 'preparing':
            return `
                <button class="action-btn success" onclick="updateOrderStatus('${orderId}', 'ready')">Mark Ready</button>
                <button class="action-btn danger" onclick="updateOrderStatus('${orderId}', 'cancelled')">Cancel Order</button>
            `;
        case 'ready':
            return `
                <button class="action-btn success" onclick="updateOrderStatus('${orderId}', 'delivered')">Mark Delivered</button>
                <button class="action-btn primary" onclick="updateOrderStatus('${orderId}', 'preparing')">Back to Preparing</button>
            `;
        case 'delivered':
            return `
                <button class="action-btn primary" onclick="updateOrderStatus('${orderId}', 'ready')">Back to Ready</button>
            `;
        case 'cancelled':
            return `
                <button class="action-btn primary" onclick="updateOrderStatus('${orderId}', 'pending')">Restore Order</button>
            `;
        default:
            return `
                <button class="action-btn primary" onclick="updateOrderStatus('${orderId}', 'preparing')">Start Preparing</button>
                <button class="action-btn danger" onclick="updateOrderStatus('${orderId}', 'cancelled')">Cancel Order</button>
            `;
    }
}

function updateOrderStatus(orderId, newStatus) {
    // Update order status in Firestore
    db.collection('orders').doc(orderId).update({
        status: newStatus,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log('Order status updated successfully');
        
        // Update local data
        const orderIndex = allOrders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
            allOrders[orderIndex].status = newStatus;
            filteredOrders = [...allOrders];
            displayOrders();
        }
        
        // Show success message
        showNotification(`Order status updated to ${newStatus}`, 'success');
    })
    .catch((error) => {
        console.error('Error updating order status:', error);
        showNotification('Error updating order status', 'error');
    });
}

function filterOrders() {
    const statusFilter = document.getElementById('statusFilter').value;
    
    if (statusFilter === 'all') {
        filteredOrders = [...allOrders];
    } else {
        filteredOrders = allOrders.filter(order => order.status === statusFilter);
    }
    
    displayOrders();
}

function sortOrders() {
    const sortFilter = document.getElementById('sortFilter').value;
    
    switch (sortFilter) {
        case 'newest':
            filteredOrders.sort((a, b) => {
                if (!a.orderDate || !b.orderDate) return 0;
                return b.orderDate.toDate() - a.orderDate.toDate();
            });
            break;
        case 'oldest':
            filteredOrders.sort((a, b) => {
                if (!a.orderDate || !b.orderDate) return 0;
                return a.orderDate.toDate() - b.orderDate.toDate();
            });
            break;
        case 'price-high':
            filteredOrders.sort((a, b) => {
                const priceA = a.pricing ? a.pricing.totalPrice : 0;
                const priceB = b.pricing ? b.pricing.totalPrice : 0;
                return priceB - priceA;
            });
            break;
        case 'price-low':
            filteredOrders.sort((a, b) => {
                const priceA = a.pricing ? a.pricing.totalPrice : 0;
                const priceB = b.pricing ? b.pricing.totalPrice : 0;
                return priceA - priceB;
            });
            break;
    }
    
    displayOrders();
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = 'admin-login.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #4caf50;' : 'background: #f44336;'}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const notificationStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet); 