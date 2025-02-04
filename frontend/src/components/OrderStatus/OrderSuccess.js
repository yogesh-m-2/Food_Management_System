import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/orderstatus/OrderSuccess.css";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderHistoryRedirect, orderedUserId, orderedRole } = location.state || { 
        orderHistoryRedirect: "/",
        orderedUserId: "",
        orderedRole: ""
    };

    useEffect(() => {
        // Redirect after 5 seconds, passing state instead of query parameters
        const timer = setTimeout(() => {
            navigate(orderHistoryRedirect, { 
                state: { orderedUserId, orderedRole } 
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate, orderHistoryRedirect, orderedUserId, orderedRole]);

    return (
        <div className="success-container">
            <div className="success-message">
                <h2>Order Successfully Placed!</h2>
                <p>Your order is being processed. Thank you for choosing us!</p>
                <div className="success-animation">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
