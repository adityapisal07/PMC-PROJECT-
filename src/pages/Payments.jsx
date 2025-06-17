import React from 'react';
import { motion } from 'framer-motion';

function PaymentPage() {

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    const options = {
      key: "rzp_test_YourTestKeyHere", // Replace with your Razorpay test/live key
      amount: 50000, // Example: 500 rupees in paise
      currency: "INR",
      name: "PMC Tanker Booking",
      description: "Water Tanker Payment",
      image: "https://yourlogo.url/logo.png", // Optional: your logo url
      handler: function (response) {
        alert(`Payment successful! Razorpay ID: ${response.razorpay_payment_id}`);
        // You can redirect to a success page or save the payment ID in DB
      },
      prefill: {
        name: "Your Name", // You can pass real data from form
        email: "email@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Pune, India"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-black dark:to-black p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          Secure Payment via Razorpay
        </h1>

        <div className="text-center mb-6">
          <img 
            src="https://razorpay.com/images/logo.svg" 
            alt="Razorpay"
            className="mx-auto w-32"
          />
        </div>

        <button 
          onClick={handleRazorpayPayment}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Pay with Razorpay
        </button>
      </motion.div>
    </div>
  );
}

export default PaymentPage;
