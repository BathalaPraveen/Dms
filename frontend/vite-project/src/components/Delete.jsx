import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Delete = ({ title = "Delete", message = "Are you sure?", onConfirm }) => {
    const DeleteToast = () => (
        <div
            className="p-3"
            style={{
                minWidth: "280px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                color: "#333",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                className="mb-2"
                style={{ fontWeight: "600", fontSize: "16px", color: "#dc3545" }}
            >
                {title}
            </div>
            <div className="mb-3" style={{ fontSize: "14px" }}>
                {message}
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        if (onConfirm) onConfirm();
                        toast.dismiss();
                        toast.success(`${title} successfully!`);
                    }}
                >
                    Yes
                </button>
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => toast.dismiss()}
                >
                    No
                </button>
            </div>
        </div>
    );

    toast.info(<DeleteToast />, {
        autoClose: false,
        closeButton: false,
        hideProgressBar: true,
    });
};

export default Delete;
