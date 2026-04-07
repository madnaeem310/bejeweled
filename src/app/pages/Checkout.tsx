import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { Check } from "lucide-react";
import { api } from "../lib/api";

export function Checkout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await api.getCart();
        setCartItems(data.items || []);
      } catch {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const shippingCost = shippingMethod === 'express' ? 25 : shippingMethod === 'overnight' ? 50 : 0;
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0), [cartItems]);
  const total = subtotal + shippingCost;

  const steps = [
    { number: 1, name: "Address" },
    { number: 2, name: "Shipping" },
    { number: 3, name: "Payment" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitting(true);
      try {
        await api.createOrder({
          shippingAddress: {
            street: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zipCode: shippingAddress.zipCode,
            country: shippingAddress.country,
          },
          shippingMethod,
          paymentMethod,
        });
        navigate("/");
      } catch (err) {
        console.error('Failed to place order:', err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Title */}
        <h1 
          className="text-3xl md:text-4xl mb-8 md:mb-12 text-center"
          style={{ 
            fontFamily: 'Georgia, serif',
            color: '#4A1942'
          }}
        >
          Checkout
        </h1>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      currentStep >= step.number ? 'text-white' : 'border-2 text-current'
                    }`}
                    style={{
                      backgroundColor: currentStep >= step.number ? '#4A1942' : 'transparent',
                      borderColor: currentStep >= step.number ? '#4A1942' : '#E6D5F0',
                      color: currentStep >= step.number ? 'white' : '#5C3A5E'
                    }}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <span 
                    className="text-sm text-center"
                    style={{ color: currentStep >= step.number ? '#4A1942' : '#5C3A5E' }}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className="h-0.5 flex-1 mx-2 mb-8"
                    style={{ 
                      backgroundColor: currentStep > step.number ? '#4A1942' : '#E6D5F0'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Left Side - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Address */}
              {currentStep === 1 && (
                <div>
                  <h2 
                    className="text-2xl mb-6"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      color: '#4A1942'
                    }}
                  >
                    Shipping Address
                  </h2>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <input
                          type="text"
                          id="firstName"
                          value={shippingAddress.firstName}
                          onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                          className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                          style={{ borderColor: '#E6D5F0' }}
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="firstName"
                          className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                          style={{ color: '#5C3A5E' }}
                        >
                          First Name
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          id="lastName"
                          value={shippingAddress.lastName}
                          onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                          className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                          style={{ borderColor: '#E6D5F0' }}
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="lastName"
                          className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                          style={{ color: '#5C3A5E' }}
                        >
                          Last Name
                        </label>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                        className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                        style={{ borderColor: '#E6D5F0' }}
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                        style={{ color: '#5C3A5E' }}
                      >
                        Email Address
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                        style={{ borderColor: '#E6D5F0' }}
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                        style={{ color: '#5C3A5E' }}
                      >
                        Phone Number
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                        className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                        style={{ borderColor: '#E6D5F0' }}
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="address"
                        className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                        style={{ color: '#5C3A5E' }}
                      >
                        Street Address
                      </label>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="relative">
                        <input
                          type="text"
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                          style={{ borderColor: '#E6D5F0' }}
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="city"
                          className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                          style={{ color: '#5C3A5E' }}
                        >
                          City
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          id="state"
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                          style={{ borderColor: '#E6D5F0' }}
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="state"
                          className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                          style={{ color: '#5C3A5E' }}
                        >
                          State
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          id="zipCode"
                          value={shippingAddress.zipCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                          className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                          style={{ borderColor: '#E6D5F0' }}
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="zipCode"
                          className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                          style={{ color: '#5C3A5E' }}
                        >
                          ZIP Code
                        </label>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id="country"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                        className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                        style={{ borderColor: '#E6D5F0' }}
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="country"
                        className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                        style={{ color: '#5C3A5E' }}
                      >
                        Country
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Method */}
              {currentStep === 2 && (
                <div>
                  <h2 
                    className="text-2xl mb-6"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      color: '#4A1942'
                    }}
                  >
                    Shipping Method
                  </h2>

                  <div className="space-y-4">
                    <label 
                      className="flex items-center justify-between p-4 border cursor-pointer transition-colors"
                      style={{ 
                        borderColor: shippingMethod === 'standard' ? '#4A1942' : '#E6D5F0',
                        backgroundColor: shippingMethod === 'standard' ? 'rgba(74, 25, 66, 0.05)' : 'transparent'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4"
                          style={{ accentColor: '#4A1942' }}
                        />
                        <div>
                          <p style={{ color: '#4A1942' }}>Standard Shipping</p>
                          <p className="text-sm" style={{ color: '#5C3A5E' }}>5-7 business days</p>
                        </div>
                      </div>
                      <span style={{ color: '#4A1942' }}>Free</span>
                    </label>

                    <label 
                      className="flex items-center justify-between p-4 border cursor-pointer transition-colors"
                      style={{ 
                        borderColor: shippingMethod === 'express' ? '#4A1942' : '#E6D5F0',
                        backgroundColor: shippingMethod === 'express' ? 'rgba(74, 25, 66, 0.05)' : 'transparent'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4"
                          style={{ accentColor: '#4A1942' }}
                        />
                        <div>
                          <p style={{ color: '#4A1942' }}>Express Shipping</p>
                          <p className="text-sm" style={{ color: '#5C3A5E' }}>2-3 business days</p>
                        </div>
                      </div>
                      <span style={{ color: '#4A1942' }}>$25</span>
                    </label>

                    <label 
                      className="flex items-center justify-between p-4 border cursor-pointer transition-colors"
                      style={{ 
                        borderColor: shippingMethod === 'overnight' ? '#4A1942' : '#E6D5F0',
                        backgroundColor: shippingMethod === 'overnight' ? 'rgba(74, 25, 66, 0.05)' : 'transparent'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value="overnight"
                          checked={shippingMethod === 'overnight'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4"
                          style={{ accentColor: '#4A1942' }}
                        />
                        <div>
                          <p style={{ color: '#4A1942' }}>Overnight Shipping</p>
                          <p className="text-sm" style={{ color: '#5C3A5E' }}>Next business day</p>
                        </div>
                      </div>
                      <span style={{ color: '#4A1942' }}>$50</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div>
                  <h2 
                    className="text-2xl mb-6"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      color: '#4A1942'
                    }}
                  >
                    Payment Information
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-4 mb-6">
                      <label 
                        className="flex items-center p-4 border cursor-pointer transition-colors"
                        style={{ 
                          borderColor: paymentMethod === 'card' ? '#4A1942' : '#E6D5F0',
                          backgroundColor: paymentMethod === 'card' ? 'rgba(74, 25, 66, 0.05)' : 'transparent'
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 mr-3"
                          style={{ accentColor: '#4A1942' }}
                        />
                        <span style={{ color: '#4A1942' }}>Credit / Debit Card</span>
                      </label>

                      <label 
                        className="flex items-center p-4 border cursor-pointer transition-colors"
                        style={{ 
                          borderColor: paymentMethod === 'paypal' ? '#4A1942' : '#E6D5F0',
                          backgroundColor: paymentMethod === 'paypal' ? 'rgba(74, 25, 66, 0.05)' : 'transparent'
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 mr-3"
                          style={{ accentColor: '#4A1942' }}
                        />
                        <span style={{ color: '#4A1942' }}>PayPal</span>
                      </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-6">
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                            style={{ borderColor: '#E6D5F0' }}
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="cardNumber"
                            className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                            style={{ color: '#5C3A5E' }}
                          >
                            Card Number
                          </label>
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            id="cardName"
                            className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                            style={{ borderColor: '#E6D5F0' }}
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="cardName"
                            className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                            style={{ color: '#5C3A5E' }}
                          >
                            Name on Card
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="relative">
                            <input
                              type="text"
                              id="expiry"
                              className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                              style={{ borderColor: '#E6D5F0' }}
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="expiry"
                              className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                              style={{ color: '#5C3A5E' }}
                            >
                              Expiry (MM/YY)
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              type="text"
                              id="cvv"
                              className="peer w-full px-4 py-3 border outline-none focus:border-current transition-colors"
                              style={{ borderColor: '#E6D5F0' }}
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="cvv"
                              className="absolute left-4 top-3 transition-all peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-white"
                              style={{ color: '#5C3A5E' }}
                            >
                              CVV
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-8 py-3 border transition-all hover:bg-opacity-10"
                    style={{ 
                      borderColor: '#4A1942',
                      color: '#4A1942'
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: '#4A1942' }}
                >
                  {submitting ? 'Placing Order...' : currentStep === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div 
              className="p-6 md:p-8 sticky top-24"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              <h2 
                className="text-xl mb-6"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#4A1942'
                }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span style={{ color: '#5C3A5E' }}>
                      {item.product?.name} x {item.quantity}
                    </span>
                    <span style={{ color: '#4A1942' }}>
                      ${((item.product?.price || 0) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div 
                className="border-t pt-4 space-y-3 mb-4"
                style={{ borderColor: '#E6D5F0' }}
              >
                <div className="flex justify-between">
                  <span style={{ color: '#5C3A5E' }}>Subtotal</span>
                  <span style={{ color: '#4A1942' }}>
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#5C3A5E' }}>Shipping</span>
                  <span style={{ color: '#4A1942' }}>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                  </span>
                </div>
              </div>

              <div 
                className="border-t pt-4"
                style={{ borderColor: '#E6D5F0' }}
              >
                <div className="flex justify-between text-lg">
                  <span 
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      color: '#4A1942'
                    }}
                  >
                    Total
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      color: '#4A1942'
                    }}
                  >
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
