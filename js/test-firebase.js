// Test Firebase Connection and Database Operations
// Include this in any HTML file to test your Firebase setup

// Test Firebase connection
function testFirebaseConnection() {
    console.log('Testing Firebase connection...');
    
    // Test if Firebase is initialized
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase SDK not loaded');
        return;
    }
    
    console.log('✅ Firebase SDK loaded');
    
    // Test if Firestore is available
    if (typeof firebase.firestore === 'undefined') {
        console.error('❌ Firestore not available');
        return;
    }
    
    console.log('✅ Firestore available');
    
    // Test database write
    const testData = {
        test: true,
        message: 'Firebase connection test',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('test').add(testData)
        .then((docRef) => {
            console.log('✅ Database write successful. Document ID:', docRef.id);
            
            // Clean up test document
            return db.collection('test').doc(docRef.id).delete();
        })
        .then(() => {
            console.log('✅ Test document cleaned up');
            console.log('🎉 Firebase setup is working correctly!');
        })
        .catch((error) => {
            console.error('❌ Database test failed:', error);
        });
}

// Run test when page loads
if (typeof firebase !== 'undefined' && typeof db !== 'undefined') {
    testFirebaseConnection();
} else {
    console.log('Waiting for Firebase to load...');
    // Wait for Firebase to load
    setTimeout(() => {
        if (typeof firebase !== 'undefined' && typeof db !== 'undefined') {
            testFirebaseConnection();
        } else {
            console.error('❌ Firebase not loaded after timeout');
        }
    }, 2000);
} 