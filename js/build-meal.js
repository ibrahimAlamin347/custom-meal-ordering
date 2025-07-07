const meals = {
    "Jollof Rice": ["Long-grain parboiled rice", "Tomatoes", "Red bell peppers", "Onions", "Scotch bonnet peppers", "Vegetable oil", "Garlic", "Ginger", "Thyme", "Curry powder", "Bay leaves", "Chicken or vegetable stock", "Smoked paprika", "White pepper", "Green peas", "Carrots", "Salt"],
    "Fried Rice": ["Long-grain rice", "Carrots", "Green beans", "Peas", "Sweet corn", "Green bell peppers", "Onions", "Vegetable oil", "Soy sauce", "Garlic", "Ginger", "White pepper", "Spring onions", "Mushrooms", "Cabbage", "Sesame seeds", "Salt"],
    "Ofada Rice": ["Ofada rice", "Unripe plantains", "Red bell peppers", "Scotch bonnet peppers", "Tomatoes", "Onions", "Palm oil", "Locust beans (iru)", "Smoked fish", "Assorted meats", "Crayfish", "Uziza leaves", "Bitter leaf", "Dried shrimp", "Salt"],
    "Ayamase (Ofada Stew)": ["Green bell peppers", "Scotch bonnet peppers", "Onions", "Palm oil", "Locust beans (iru)", "Assorted meats", "Smoked fish", "Crayfish", "Garlic", "Ginger", "Uziza seeds", "Green onions", "Basil leaves", "Dried prawns", "Salt"],
    "Chinese Fried Rice": ["Long-grain rice", "Carrots", "Peas", "Sweet corn", "Green onions", "Eggs", "Soy sauce", "Sesame oil", "Garlic", "Ginger", "White pepper", "Bamboo shoots", "Shiitake mushrooms", "Bean sprouts", "Cashew nuts", "Salt"],
    "Gbegiri (Bean Soup)": ["Black-eyed peas or honey beans", "Palm oil", "Onions", "Scotch bonnet peppers", "Crayfish", "Locust beans (iru)", "Smoked fish", "Ugwu leaves", "Dried catfish", "Ground melon seeds (egusi)", "Uziza leaves", "Salt"],
    "Fish Stew": ["Fish", "Tomatoes", "Red bell peppers", "Scotch bonnet peppers", "Onions", "Vegetable oil", "Garlic", "Ginger", "Thyme", "Curry powder", "Coconut milk", "Green bell peppers", "Parsley", "Lemon zest", "Salt"],
    "Meat Stew": ["Assorted meats", "Tomatoes", "Red bell peppers", "Scotch bonnet peppers", "Onions", "Vegetable oil", "Garlic", "Ginger", "Thyme", "Curry powder", "Smoked paprika", "Green beans", "Potatoes", "Basil leaves", "Salt"],
    "Chicken Stew": ["Chicken", "Tomatoes", "Red bell peppers", "Scotch bonnet peppers", "Onions", "Vegetable oil", "Garlic", "Ginger", "Thyme", "Curry powder", "Coconut cream", "Sweet potatoes", "Cilantro", "Turmeric", "Salt"],
    "Shawarma": ["Chicken or beef", "Flatbread", "Cabbage", "Carrots", "Tomatoes", "Onions", "Cucumber", "Garlic", "Yogurt", "Tahini", "Lemon juice", "Paprika", "Cumin", "Coriander", "Pickled turnips", "Sumac", "Parsley", "Salt"],
    "Concoction Rice": ["Long-grain rice", "Palm oil", "Onions", "Tomatoes", "Scotch bonnet peppers", "Smoked fish", "Crayfish", "Locust beans (iru)", "Spinach or ugwu leaves", "Dried prawns", "Green beans", "Scent leaf", "Ground egusi", "Salt"],
    "Stir Fry Pasta": ["Pasta", "Bell peppers", "Carrots", "Onions", "Chicken or shrimp", "Vegetable oil", "Garlic", "Ginger", "Soy sauce", "Oyster sauce", "Sesame oil", "Broccoli", "Snap peas", "Mushrooms", "Red chili flakes", "Salt"]
};

// Meal prices (you can adjust these)
const mealPrices = {
    "Jollof Rice": 25000,
    "Fried Rice": 23000,
    "Ofada Rice": 30000,
    "Ayamase (Ofada Stew)": 27000,
    "Chinese Fried Rice": 25000,
    "Gbegiri (Bean Soup)": 20000,
    "Fish Stew": 28000,
    "Meat Stew": 32000,
    "Chicken Stew": 27000,
    "Shawarma": 22000,
    "Concoction Rice": 23000,
    "Stir Fry Pasta": 25000
};

document.addEventListener('DOMContentLoaded', function() {
    const mealSelect = document.getElementById("meal");
    const ingredientsSection = document.getElementById("ingredients");
    const summarySection = document.getElementById("summary");
    const form = document.querySelector('form');

    // Update ingredients when meal is selected
    mealSelect.addEventListener("change", function() {
        const selectedMeal = this.value;
        const ingredients = meals[selectedMeal] || [];
        
        if (ingredients.length > 0) {
            const ingredientsList = ingredients.map(item => `
                <li>
                    <label class="ingredient-checkbox">
                        <input type="checkbox" name="ingredients[]" value="${item}" checked>
                        <span class="checkmark"></span>
                        ${item}
                    </label>
                </li>
            `).join("");
            
            ingredientsSection.innerHTML = `
                <h3>Ingredients included:</h3>
                <ul class="ingredients-list">${ingredientsList}</ul>
                <div class="add-ingredient-section">
                    <h4>Add Extra Ingredients:</h4>
                    <div class="add-ingredient-form">
                        <input type="text" id="newIngredient" placeholder="Enter ingredient name">
                        <button type="button" id="addIngredientBtn" class="add-ingredient-btn">Add</button>
                    </div>
                </div>
            `;
            ingredientsSection.style.display = 'block';
            
            // Add event listeners for ingredient checkboxes
            const ingredientCheckboxes = ingredientsSection.querySelectorAll('input[name="ingredients[]"]');
            ingredientCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateSummary);
            });
            
            // Add event listener for adding new ingredients
            const addIngredientBtn = document.getElementById('addIngredientBtn');
            const newIngredientInput = document.getElementById('newIngredient');
            
            addIngredientBtn.addEventListener('click', function() {
                const newIngredient = newIngredientInput.value.trim();
                if (newIngredient) {
                    addExtraIngredient(newIngredient);
                    newIngredientInput.value = '';
                }
            });
            
            newIngredientInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const newIngredient = this.value.trim();
                    if (newIngredient) {
                        addExtraIngredient(newIngredient);
                        this.value = '';
                    }
                }
            });
            
        } else {
            ingredientsSection.style.display = 'none';
        }
        
        updateSummary();
    });

    // Update summary when spices are selected
    const spiceCheckboxes = document.querySelectorAll('input[name="spice[]"]');
    spiceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSummary);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedMeal = mealSelect.value;
        const selectedSpices = Array.from(spiceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Get customer information
        const customerName = document.getElementById('customerName').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const postalCode = document.getElementById('postalCode').value.trim();
        const deliveryInstructions = document.getElementById('deliveryInstructions').value.trim();
        
        if (!selectedMeal) {
            alert('Please select a meal first!');
            return;
        }
        
        // Validate required customer information
        if (!customerName) {
            alert('Please enter your full name!');
            document.getElementById('customerName').focus();
            return;
        }
        
        if (!phoneNumber) {
            alert('Please enter your phone number!');
            document.getElementById('phoneNumber').focus();
            return;
        }
        
        if (!address) {
            alert('Please enter your delivery address!');
            document.getElementById('address').focus();
            return;
        }
        
        if (!city) {
            alert('Please enter your city!');
            document.getElementById('city').focus();
            return;
        }
        
        // Show order summary with customer information
        showOrderSummary(selectedMeal, selectedSpices, customerName, phoneNumber, email, address, city, postalCode, deliveryInstructions);
    });

    function updateSummary() {
        const selectedMeal = mealSelect.value;
        const selectedSpices = Array.from(spiceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Get selected ingredients (both original and extra)
        const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredients[]"]:checked'))
            .map(checkbox => checkbox.value);
        
        if (selectedMeal) {
            showOrderSummary(selectedMeal, selectedSpices, selectedIngredients);
        }
    }

    function addExtraIngredient(ingredientName) {
        const ingredientsList = document.querySelector('.ingredients-list');
        const ingredientId = 'extra_' + Date.now();
        
        // Create new list item for the ingredient
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <label class="ingredient-checkbox extra-ingredient">
                <input type="checkbox" name="ingredients[]" value="${ingredientName}" checked>
                <span class="checkmark"></span>
                ${ingredientName}
            </label>
        `;
        listItem.id = ingredientId;
        
        // Add to the main ingredients list
        ingredientsList.appendChild(listItem);
        
        // Add event listener for the new checkbox
        const newCheckbox = listItem.querySelector('input[name="ingredients[]"]');
        newCheckbox.addEventListener('change', updateSummary);
        
        updateSummary();
    }

    function showOrderSummary(meal, spices, customerName, phoneNumber, email, address, city, postalCode, deliveryInstructions) {
        // Get selected ingredients (both original and extra)
        const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredients[]"]:checked'))
            .map(checkbox => checkbox.value);
        
        const basePrice = mealPrices[meal] || 0;
        const spicePrice = spices.length * 2500; // ₦2,500 per spice
        const ingredientModificationPrice = calculateIngredientModificationPrice(meal, selectedIngredients);
        const totalPrice = basePrice + spicePrice + ingredientModificationPrice;
        
        const summaryHTML = `
            <h3>Order Summary</h3>
            <div class="summary-details">
                <div class="order-details">
                    <h4>Meal Details</h4>
                    <p><strong>Selected Meal:</strong> ${meal}</p>
                    <p><strong>Base Price:</strong> ₦${basePrice.toLocaleString()}</p>
                    <p><strong>Selected Ingredients:</strong> ${selectedIngredients.join(', ')}</p>
                    ${spices.length > 0 ? `<p><strong>Selected Spices:</strong> ${spices.join(', ')}</p>` : ''}
                    ${spices.length > 0 ? `<p><strong>Spice Add-ons:</strong> ₦${spicePrice.toLocaleString()}</p>` : ''}
                    ${ingredientModificationPrice > 0 ? `<p><strong>Ingredient Modifications:</strong> ₦${ingredientModificationPrice.toLocaleString()}</p>` : ''}
                    <p><strong>Total Price:</strong> ₦${totalPrice.toLocaleString()}</p>
                </div>
                
                <div class="customer-details">
                    <h4>Delivery Information</h4>
                    <p><strong>Name:</strong> ${customerName}</p>
                    <p><strong>Phone:</strong> ${phoneNumber}</p>
                    ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
                    <p><strong>Address:</strong> ${address}</p>
                    <p><strong>City:</strong> ${city}</p>
                    ${postalCode ? `<p><strong>Postal Code:</strong> ${postalCode}</p>` : ''}
                    ${deliveryInstructions ? `<p><strong>Delivery Instructions:</strong> ${deliveryInstructions}</p>` : ''}
                </div>
            </div>
            <div class="summary-actions">
                <button type="button" class="btn-modify" onclick="resetForm()">Modify Order</button>
                <button type="button" class="btn-confirm" onclick="confirmOrder()">Confirm Order</button>
            </div>
        `;
        
        summarySection.innerHTML = summaryHTML;
        summarySection.style.display = 'block';
    }
});

// Global functions for buttons
function calculateIngredientModificationPrice(meal, selectedIngredients) {
    const originalIngredients = meals[meal] || [];
    const removedIngredients = originalIngredients.filter(ingredient => !selectedIngredients.includes(ingredient));
    const addedIngredients = selectedIngredients.filter(ingredient => !originalIngredients.includes(ingredient));
    
    // ₦1,000 for each removed ingredient (refund)
    const removalRefund = removedIngredients.length * -1000;
    // ₦1,500 for each added ingredient
    const additionCost = addedIngredients.length * 1500;
    
    return removalRefund + additionCost;
}
function resetForm() {
    document.getElementById("meal").value = "";
    document.getElementById("ingredients").style.display = 'none';
    document.getElementById("summary").style.display = 'none';
    
    // Clear customer information fields
    document.getElementById("customerName").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("city").value = "";
    document.getElementById("postalCode").value = "";
    document.getElementById("deliveryInstructions").value = "";
    
    // Uncheck all spice checkboxes
    document.querySelectorAll('input[name="spice[]"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Clear extra ingredients from the main list
    const extraIngredients = document.querySelectorAll('.extra-ingredient');
    extraIngredients.forEach(ingredient => {
        ingredient.closest('li').remove();
    });
}

function removeExtraIngredient(ingredientId) {
    const ingredientElement = document.getElementById(ingredientId);
    if (ingredientElement) {
        ingredientElement.remove();
        // Trigger update summary if meal is selected
        const mealSelect = document.getElementById("meal");
        if (mealSelect.value) {
            // Find the updateSummary function in the current scope
            const event = new Event('change');
            mealSelect.dispatchEvent(event);
        }
    }
}

function confirmOrder() {
    console.log('confirmOrder function called');
    
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
        console.error('Firebase is not loaded');
        alert('Error: Firebase is not loaded. Please refresh the page and try again.');
        return;
    }
    
    if (typeof db === 'undefined') {
        console.error('Firestore database is not initialized');
        alert('Error: Database is not initialized. Please refresh the page and try again.');
        return;
    }
    
    const selectedMeal = document.getElementById("meal").value;
    const selectedSpices = Array.from(document.querySelectorAll('input[name="spice[]"]:checked'))
        .map(checkbox => checkbox.value);
    const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredients[]"]:checked'))
        .map(checkbox => checkbox.value);
    
    // Get customer information
    const customerName = document.getElementById('customerName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const deliveryInstructions = document.getElementById('deliveryInstructions').value.trim();
    
    console.log('Order data:', {
        meal: selectedMeal,
        spices: selectedSpices,
        ingredients: selectedIngredients,
        customerName: customerName,
        phoneNumber: phoneNumber
    });
    
    // Calculate prices
    const basePrice = mealPrices[selectedMeal] || 0;
    const spicePrice = selectedSpices.length * 2500;
    const ingredientModificationPrice = calculateIngredientModificationPrice(selectedMeal, selectedIngredients);
    const totalPrice = basePrice + spicePrice + ingredientModificationPrice;
    
    // Create order object
    const orderData = {
        meal: selectedMeal,
        ingredients: selectedIngredients,
        spices: selectedSpices,
        customerInfo: {
            name: customerName,
            phone: phoneNumber,
            email: email,
            address: address,
            city: city,
            postalCode: postalCode,
            deliveryInstructions: deliveryInstructions
        },
        pricing: {
            basePrice: basePrice,
            spicePrice: spicePrice,
            ingredientModificationPrice: ingredientModificationPrice,
            totalPrice: totalPrice
        },
        status: 'pending',
        orderDate: firebase.firestore.FieldValue.serverTimestamp(),
        orderId: generateOrderId()
    };
    
    console.log('Saving order to Firebase:', orderData);
    
    // Save order to Firebase
    db.collection('orders').add(orderData)
        .then((docRef) => {
            console.log('Order saved with ID: ', docRef.id);
            
            // Show success message
            const summarySection = document.getElementById("summary");
            summarySection.innerHTML = `
                <div class="success-message">
                    <h3>🎉 Order Confirmed!</h3>
                    <p>Your custom ${selectedMeal} order has been placed successfully.</p>
                    <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                    <p>We'll start preparing your meal with the selected ingredients and spices.</p>
                    <p>Estimated delivery time: 30-45 minutes</p>
                    <p>You will receive a confirmation call shortly.</p>
                    <button type="button" class="btn-new-order" onclick="resetForm()">Place Another Order</button>
                </div>
            `;
            
            // Add success styling
            summarySection.style.background = 'rgba(76, 175, 80, 0.1)';
            summarySection.style.borderLeftColor = '#4caf50';
        })
        .catch((error) => {
            console.error('Error saving order: ', error);
            alert('There was an error saving your order. Please try again.');
        });
}

function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `GF${timestamp}${random}`;
}

// Add some additional CSS for the summary buttons
const additionalStyles = `
    .summary-details {
        margin: 15px 0;
        line-height: 1.6;
    }
    
    .order-details,
    .customer-details {
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid rgba(212, 27, 39, 0.1);
    }
    
    .order-details h4,
    .customer-details h4 {
        color: #d41b27;
        margin-bottom: 15px;
        font-size: 1.1rem;
        border-bottom: 2px solid rgba(212, 27, 39, 0.2);
        padding-bottom: 8px;
    }
    
    .order-details p,
    .customer-details p {
        margin: 8px 0;
        padding: 5px 0;
    }
    
    .customer-details p {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .customer-details p:last-child {
        border-bottom: none;
    }
    
    .summary-actions {
        display: flex;
        gap: 15px;
        margin-top: 20px;
    }
    
    .btn-modify, .btn-confirm, .btn-new-order {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .btn-modify {
        background: #f0f0f0;
        color: #333;
    }
    
    .btn-confirm {
        background: #4caf50;
        color: white;
    }
    
    .btn-new-order {
        background: #d41b27;
        color: white;
        width: 100%;
        margin-top: 15px;
    }
    
    .btn-modify:hover, .btn-confirm:hover, .btn-new-order:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .success-message {
        text-align: center;
    }
    
    .success-message h3 {
        color: #4caf50;
        margin-bottom: 15px;
    }
    
    /* Ingredient Checkbox Styles */
    .ingredients-list {
        list-style: none;
        padding: 0;
        margin: 15px 0;
    }
    
    .ingredients-list li {
        margin: 8px 0;
    }
    
    .ingredient-checkbox {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 6px;
        transition: all 0.3s ease;
        position: relative;
    }
    
    .ingredient-checkbox:hover {
        background: rgba(212, 27, 39, 0.1);
    }
    
    .ingredient-checkbox input[type="checkbox"] {
        margin-right: 10px;
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
    
    .ingredient-checkbox input[type="checkbox"]:checked {
        accent-color: #d41b27;
    }
    
    /* Extra Ingredient Styles */
    .ingredient-checkbox.extra-ingredient {
        background: rgba(76, 175, 80, 0.1);
        border: 1px solid rgba(76, 175, 80, 0.3);
        position: relative;
    }
    
    .ingredient-checkbox.extra-ingredient::before {
        content: "➕";
        position: absolute;
        left: -25px;
        color: #4caf50;
        font-size: 14px;
    }
    
    .remove-ingredient-btn {
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        transition: all 0.3s ease;
        margin-left: auto;
    }
    
    .remove-ingredient-btn:hover {
        background: #cc0000;
        transform: scale(1.1);
    }
    
    /* Add Ingredient Section */
    .add-ingredient-section {
        margin-top: 20px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(212, 27, 39, 0.2);
    }
    
    .add-ingredient-section h4 {
        margin: 0 0 15px 0;
        color: #d41b27;
        font-size: 1.1rem;
    }
    
    .add-ingredient-form {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }
    
    .add-ingredient-form input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
    }
    
    .add-ingredient-form input:focus {
        outline: none;
        border-color: #d41b27;
        box-shadow: 0 0 0 2px rgba(212, 27, 39, 0.1);
    }
    
    .add-ingredient-btn {
        padding: 8px 16px;
        background: #d41b27;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .add-ingredient-btn:hover {
        background: #b31b23;
        transform: translateY(-1px);
    }
    
    /* Responsive Design for Ingredients */
    @media (max-width: 768px) {
        .add-ingredient-form {
            flex-direction: column;
        }
        
        .add-ingredient-btn {
            width: 100%;
        }
        
        .ingredient-checkbox.extra-ingredient::before {
            left: -20px;
            font-size: 12px;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 