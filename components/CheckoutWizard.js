import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {['UserLogin', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <div
           key={step}
           className={`flex-1 border-b-2 text-center
           ${
            index<= activeStep
            ? 'border-orange-600 text-orange-500'
            : 'border-gray-300 text-gray-300'
           }`}
           >{step}</div>
        )
      )}
    </div>
  );
}
