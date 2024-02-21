import React, { useState, useEffect, useRef } from "react";
import "./contact.css";

const Contact = () => {
    const [activeTab, setActiveTab] = useState("user");
    const taebRef = useRef(null);
    const [userFormValues, setUserFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    });
    const [restaurantFormValues, setRestaurantFormValues] = useState({
        restaurantName: "",
        email: "",
        phone: "",
        message: ""
    });
    const [userFormErrors, setUserFormErrors] = useState({});
    const [restaurantFormErrors, setRestaurantFormErrors] = useState({});

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleUserFormChange = (e) => {
        setUserFormValues({
            ...userFormValues,
            [e.target.name]: e.target.value
        });
    };

    const handleRestaurantFormChange = (e) => {
        setRestaurantFormValues({
            ...restaurantFormValues,
            [e.target.name]: e.target.value
        });
    };

    const validateUserForm = () => {
        let errors = {};

        if (!userFormValues.firstName) {
            errors.firstName = "First Name is required";
        } else if (/\d/.test(userFormValues.firstName)) {
            errors.firstName = "First Name should not contain numbers";
        }

        if (!userFormValues.lastName) {
            errors.lastName = "Last Name is required";
        } else if (/\d/.test(userFormValues.lastName)) {
            errors.lastName = "Last Name should not contain numbers";
        }

        if (!userFormValues.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(userFormValues.email)) {
            errors.email = "Email is invalid";
        }

        if (!userFormValues.phone) {
            errors.phone = "Phone is required";
        } else if (!/^\d+$/.test(userFormValues.phone)) {
            errors.phone = "Phone should only contain numbers";
        }

        if (!userFormValues.message) {
            errors.message = "Message is required";
        }

        setUserFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const validateRestaurantForm = () => {
        let errors = {};

        if (!restaurantFormValues.restaurantName) {
            errors.restaurantName = "Restaurant Name is required";
        }

        if (!restaurantFormValues.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(restaurantFormValues.email)) {
            errors.email = "Email is invalid";
        }

        if (!restaurantFormValues.phone) {
            errors.phone = "Phone is required";
        } else if (!/^\d+$/.test(restaurantFormValues.phone)) {
            errors.phone = "Phone should only contain numbers";
        }

        if (!restaurantFormValues.message) {
            errors.message = "Message is required";
        }

        setRestaurantFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleUserFormSubmit = (e) => {
        e.preventDefault();

        if (validateUserForm()) {
            // Perform form submission logic here
            console.log("User form submitted successfully");
        }
    };

    const handleRestaurantFormSubmit = (e) => {
        e.preventDefault();

        if (validateRestaurantForm()) {
            // Perform form submission logic here
            console.log("Restaurant form submitted successfully");
        }
    };

    useEffect(() => {
        const taeb = taebRef.current;
        const taebButtons = taeb.querySelectorAll(".taeb");

        taebButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (button.classList.contains("active")) return;

                const direction = button.getAttribute("taeb-direction");

                taeb.classList.remove("left", "right");
                taebButtons.forEach((btn) => btn.classList.remove("active"));

                button.classList.add("active");
                taeb.classList.add(direction);
            });
        });
    }, []);

    const renderUserForm = () => {
        return (
            <form onSubmit={handleUserFormSubmit}>
                <h2 className="text-center py-3">User Form</h2>
                <div className="form-group text-center">
                    <input
                        type="text"
                        className={`form-control contact-form my-4 ${userFormErrors.firstName ? "is-invalid" : ""}`}
                        placeholder="First Name"
                        name="firstName"
                        value={userFormValues.firstName}
                        onChange={handleUserFormChange}
                    />
                    {userFormErrors.firstName && <div className="invalid-feedback">{userFormErrors.firstName}</div>}
                </div>
                <div className="form-group text-center">
                    <input
                        type="text"
                        className={`form-control contact-form my-4 ${userFormErrors.lastName ? "is-invalid" : ""}`}
                        placeholder="Last Name"
                        name="lastName"
                        value={userFormValues.lastName}
                        onChange={handleUserFormChange}
                    />
                    {userFormErrors.lastName && <div className="invalid-feedback">{userFormErrors.lastName}</div>}
                </div>
                <div className="form-group text-center">
                    <input
                        type="email"
                        className={`form-control contact-form my-4 ${userFormErrors.email ? "is-invalid" : ""}`}
                        placeholder="Email"
                        name="email"
                        value={userFormValues.email}
                        onChange={handleUserFormChange}
                    />
                    {userFormErrors.email && <div className="invalid-feedback">{userFormErrors.email}</div>}
                </div>
                <div className="form-group text-center">
                    <input
                        type="text"
                        className={`form-control contact-form my-4 ${userFormErrors.phone ? "is-invalid" : ""}`}
                        placeholder="Phone"
                        name="phone"
                        value={userFormValues.phone}
                        onChange={handleUserFormChange}
                    />
                    {userFormErrors.phone && <div className="invalid-feedback">{userFormErrors.phone}</div>}
                </div>
                <div className="form-group text-center">
                    <textarea
                        className={`form-control contact-form my-4 ${userFormErrors.message ? "is-invalid" : ""}`}
                        placeholder="Message"
                        name="message"
                        value={userFormValues.message}
                        onChange={handleUserFormChange}
                    />
                    {userFormErrors.message && <div className="invalid-feedback">{userFormErrors.message}</div>}
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        );
    };

    const renderRestaurantForm = () => {
        return (
            <form onSubmit={handleRestaurantFormSubmit}>
                <h2 className="text-center py-3">Restaurant Owner Form</h2>
                <div className="form-group text-center">
                    <input
                        type="text"
                        className={`form-control contact-form my-4 ${restaurantFormErrors.restaurantName ? "is-invalid" : ""}`}
                        placeholder="Restaurant Name"
                        name="restaurantName"
                        value={restaurantFormValues.restaurantName}
                        onChange={handleRestaurantFormChange}
                    />
                    {restaurantFormErrors.restaurantName && <div className="invalid-feedback">{restaurantFormErrors.restaurantName}</div>}
                </div>
                <div className="form-group text-center">
                    <input
                        type="email"
                        className={`form-control contact-form my-4 ${restaurantFormErrors.email ? "is-invalid" : ""}`}
                        placeholder="Email"
                        name="email"
                        value={restaurantFormValues.email}
                        onChange={handleRestaurantFormChange}
                    />
                    {restaurantFormErrors.email && <div className="invalid-feedback">{restaurantFormErrors.email}</div>}
                </div>
                <div className="form-group text-center">
                    <input
                        type="text"
                        className={`form-control contact-form my-4 ${restaurantFormErrors.phone ? "is-invalid" : ""}`}
                        placeholder="Phone"
                        name="phone"
                        value={restaurantFormValues.phone}
                        onChange={handleRestaurantFormChange}
                    />
                    {restaurantFormErrors.phone && <div className="invalid-feedback">{restaurantFormErrors.phone}</div>}
                </div>
                <div className="form-group text-center">
                    <textarea
                        className={`form-control contact-form my-4 ${restaurantFormErrors.message ? "is-invalid" : ""}`}
                        placeholder="Message"
                        name="message"
                        value={restaurantFormValues.message}
                        onChange={handleRestaurantFormChange}
                    />
                    {restaurantFormErrors.message && <div className="invalid-feedback">{restaurantFormErrors.message}</div>}
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        );
    };

    return (
        <div className="pcontainer ">
            <main>
                <div className="wrapper">
                    <div ref={taebRef} className="taeb-switch left text-center">
                        <div className={`taeb ${activeTab === "user" ? "active" : ""}`} taeb-direction="left" onClick={() => handleTabChange("user")}>
                            User
                        </div>
                        <div className={`taeb ${activeTab === "restaurant" ? "active" : ""}`} taeb-direction="right" onClick={() => handleTabChange("restaurant")}>
                            Restaurant Owner
                        </div>
                    </div>
                    {activeTab === "user" ? renderUserForm() : renderRestaurantForm()}
                </div>
            </main>
        </div>
    );
};

export default Contact;