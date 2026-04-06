// API endpoint - update this with your actual backend URL
const API_BASE_URL = "https://jbd1szydoc.execute-api.ap-south-1.amazonaws.com/payments";

export interface CreateOrderPayload {
  amount: number; // Amount in rupees (will be converted to paise by backend for Razorpay)
  currency: string;
  email: string; // Must be a valid email
  fullName: string; // Student's full name
  phoneNumber: string; // Formatted as +91XXXXXXXXXX or 10-digit number
  description: string; // Course name/description
  courseId: string; // Course ID for tracking
  userId?: string; // User ID from idToken sub claim
}

export interface CreateOrderResponse {
  message: string;
  order: {
    id: string;
    entity: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
    notes: {
      courseId: string;
      email: string;
      fullName: string;
      phoneNumber: string;
      [key: string]: any;
    };
    paymentDetails: {
      email: string;
      fullName: string;
      phoneNumber: string;
      courseId: string;
      keyId: string;
    };
  };
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  studentEmail: string;
  courseId: string;
}

export interface VerifyPaymentResponse {
  valid: boolean;
  success?: boolean; // Fallback for compatibility
  message: string;
  payment?: {
    paymentId: string;
    orderId: string;
    amount: number;
    currency: string;
    status: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    courseId: string;
    [key: string]: any;
  };
}

/**
 * Create a payment order on the backend
 */
export async function createPaymentOrder(
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> {
  try {
    console.log(`📡 Calling API: ${API_BASE_URL}/create-order`);
    console.log("📨 Request Payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(`${API_BASE_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(`📍 API Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error("❌ API Error Response (JSON):", errorData);
        throw new Error(`API error: ${response.status}\n${JSON.stringify(errorData)}`);
      } catch (parseError) {
        const errorText = await response.text();
        console.error("❌ API Error Response (Text):", errorText);
        throw new Error(`API error: ${response.status}\n${errorText}`);
      }
    }

    const data: CreateOrderResponse = await response.json();
    console.log("✅ API Response Data:", data);
    return data;
  } catch (error) {
    console.error("❌ Error creating order:", error);
    throw error;
  }
}

/**
 * Verify payment on the backend
 */
export async function verifyPayment(
  payload: VerifyPaymentPayload
): Promise<VerifyPaymentResponse> {
  try {
    console.log(`📡 Calling API: ${API_BASE_URL}/verify`);
    console.log("📨 Verification Payload:", payload);

    const response = await fetch(`${API_BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(`📍 API Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error Response:", errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const data: VerifyPaymentResponse = await response.json();
    console.log("✅ API Verification Response:", data);
    return data;
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    throw error;
  }
}

/**
 * Load Razorpay checkout script
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (script) {
      console.log("✅ Razorpay script already loaded");
      resolve(true);
      return;
    }

    console.log("📥 Loading Razorpay script...");
    
    // Disable Razorpay biometric tracking to avoid localhost errors
    (window as any).RazorpayConfig = {
      trackingEnabled: false,
    };

    const newScript = document.createElement("script");
    newScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    newScript.async = true;
    // Skip tracker JS to prevent biometric collection errors
    newScript.setAttribute("data-skiptrackerjs", "true");
    newScript.onload = () => {
      console.log("✅ Razorpay script loaded successfully");
      resolve(true);
    };
    newScript.onerror = () => {
      console.error("❌ Failed to load Razorpay script");
      resolve(false);
    };
    document.head.appendChild(newScript);
  });
}

/**
 * Open Razorpay checkout with payment options
 */
export function openRazorpayCheckout(options: any): void {
  // Check if Razorpay is available
  if (typeof window === "undefined" || !(window as any).Razorpay) {
    console.error("❌ Razorpay script not loaded");
    throw new Error("Razorpay script not loaded");
  }

  console.log("🎯 Opening Razorpay Checkout");
  console.log("🔑 Order ID:", options.order_id);
  console.log("💰 Amount:", options.amount);
  console.log("🏢 Key:", options.key.substring(0, 10) + "...");

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}

/**
 * Format amount for display (convert paisa to rupees)
 */
export function formatCurrency(amount: number): string {
  return (amount / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
}
