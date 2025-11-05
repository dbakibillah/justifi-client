import React from 'react';
import { useParams } from 'react-router';

const PaymentSuccess = () => {
    const {tran_id}=useParams(); 
    return (
        <div>
            <h1>Payment Success and ID: {tran_id}</h1>
            <p>Nice! Your payment was processed successfully.</p>
            
            {/* White div 20x20px with h1 text */}
            <div style={{
                width: '230px',
                height: '230px',
                backgroundColor: 'white',
                border: '1px solid #ccc', // Added border to make it visible
                marginTop:'800px',
            }}>
                <h1 style={{
                    fontSize: '4px', // Very small font size to fit
                    margin: 0,
                    padding: 0,
                    whiteSpace: 'nowrap',
                    transform: 'scale(0.3)' // Scaling down the text
                }}>
                    Success page
                </h1>
            </div>
        </div>
    );
};

export default PaymentSuccess;