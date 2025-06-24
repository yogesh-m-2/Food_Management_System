import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/orderstatus/OrderSuccess.css";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderHistoryRedirect = "/", orderedUserId = "", orderedRole = "" } = location.state || {};

    useEffect(() => {
        const timer = setTimeout(() => {
            if (orderedUserId === "Public") {
                // Redirect to a different route if orderedUserId is "Public"
                navigate("/patient/order");
            } else {
                // Otherwise, redirect to the normal orderHistoryRedirect route
                navigate(orderHistoryRedirect, { state: { orderedUserId, orderedRole } });
            }
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
