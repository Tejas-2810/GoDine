import React, { useState, useEffect, useRef } from "react";
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
import { dateStringToMillis, millisToDateString } from '../../utils/DateUtils'
import useAuth from '../../hooks/useAuth';
import axios, { isAxiosError } from 'axios';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [initialValues, setInitialValues] = useState({});

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(true);

    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);

    const [phone, setPhone] = useState("");
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);

    const [address, setAddress] = useState("");

    const { getUserId } = useAuth();
    const cancelRequestRef = useRef(null);

    function checkAllFieldsPresent() {
        if (name == null || name === ""
            || email == null || email === ""
            || phone == null || phone === ""
            || dob == null || dob === ""
            || address == null || address === "") {
            return false;
        }
        return true;
    }

    function validateNameAndSet(name) {
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (nameRegex.test(name)) {
            setValidName(true);
        } else {
            setValidName(false);
        }
        setName(name);
    }

    function validateEmailAndSet(inputEmail) {
        const email = inputEmail.trim();
        // email is an email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (emailRegex.test(email)) {
            setValidEmail(true);
        }
        else {
            setValidEmail(false);
        }
        setEmail(email);
    }

    function validatePhoneNumberAndSet(number) {
        const phoneNumber = number;
        const phoneNumberRegex = /^(\+[1]\s?)?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/;

        if (phoneNumberRegex.test(phoneNumber)) {
            setValidPhoneNumber(true);
        }
        else {
            setValidPhoneNumber(false);
        }
        setPhone(phoneNumber);
    }

    function updateDobAndAge(dobString) {
        setDob(dobString);
        if (dobString) {
            const dobDate = new Date(dobString);
            const currentDate = new Date();
            const diffInMillis = currentDate - dobDate;
            const duration = new Date(diffInMillis);
            setAge(Math.abs(duration.getUTCFullYear() - 1970));
        }
        else {
            setAge("");
        }
    }

    useEffect(() => {
        // fetch profile endpoint
        const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
        const profile_endpoint = process.env.REACT_APP_PROFILE_ENDPOINT || "users";
        const userId = getUserId();

        const endpoint = `${server_url}/${profile_endpoint}/${userId}`;

        cancelRequestRef.current?.abort();
        cancelRequestRef.current = new AbortController();

        const fetchUserProfile = async () => {
            const response = await axios.get(endpoint, { signal: cancelRequestRef.current?.signal, withCredentials: true })
                .then((response) => response)
                .catch((err) => err);

            if (axios.isCancel(response)) {
                return;
            }
            else if (axios.isAxiosError(response)) {
                const err = response.response;
                if (err.status === 400 || err.status === 404) {
                    alert("Invalid user or user not found!!");
                    return;
                }
                if (err.status === 401 || err.status === 403) {
                    alert("Session has expired please log in again!");
                    window.location.reload();
                    return;
                }
                if (err.status === 500) {
                    alert("Internal server error, please try again after sometime");
                    return;
                }
            }
            else if (response.status === 200 && response.data) {

                const { name, email, phoneNumber, dateOfBirth, address } = response.data;
                const initialValues = { name, email, phoneNumber, dateOfBirth, address };
                setInitialValues(initialValues);

                setName(name);
                setEmail(email);
                setPhone(phoneNumber);
                setDob(dateOfBirth);

                if (dateOfBirth != null) {
                    const dobDate = new Date(dateOfBirth);
                    const currentDate = new Date();
                    const diffInMillis = currentDate - dobDate;
                    const duration = new Date(diffInMillis);

                    setAge(Math.abs(duration.getUTCFullYear() - 1970));
                }
                setAddress(address);
            }
            else {
                alert("Internal server error, please try again after sometime");
            }
        }

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setInitialValues({ name, email, phone, dob, address });
        setIsEditing(true);
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();

        if (!validName || !validEmail || !validPhoneNumber) {
            alert("Please enter valid details");
            return;
        }

        const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
        const profile_edit_endpoint = process.env.PROFILE_EDIT_ENDPOINT || "users/edit";
        const userId = getUserId();

        // cancel old request
        cancelRequestRef.current?.abort();
        cancelRequestRef.current = new AbortController();

        const endpoint = `${server_url}/${profile_edit_endpoint}/${userId}`;

        const data = {
            name: name,
            email: email,
            phoneNumber: phone,
            dateOfBirth: dob,
            address: address
        };

        const response = await axios.put(endpoint, data, { signal: cancelRequestRef.current?.signal, withCredentials: true })
            .then((response) => response)
            .catch((err) => err);

        if (axios.isCancel(response)) {
            console.log("Profile update aborted");
            return;
        }
        else if (axios.isAxiosError(response)) {
            if (response.status === 401 || response.status === 403) {
                alert("Session has expired please log in again!");
                window.location.reload();
                return;
            }
            if (response.status === 404) {
                alert("User not found, please verify account!!");
            }
            else {
                alert("Please try again, could not save due to some issue");
            }
            return;
        }
        else if (response.status === 200 && response.data) {
            alert("Details successfully saved in database");
        }
        else {
            alert("Something went wrong, could not save");
        }

        setIsEditing(false);
        window.location.reload();
    };

    const handleCancelClick = () => {
        validateNameAndSet(initialValues.name);
        validateEmailAndSet(initialValues.email);
        validatePhoneNumberAndSet(initialValues.phone);
        updateDobAndAge(initialValues.dob);
        setAddress(initialValues.address);
        setIsEditing(false);
    };

    return (
        <div className="text-white">
            <div className="background">
                <div className="row d-flex pcontainer">
                    <div className="col-md-4 ">
                        <div className="card display glass">
                            <div className="card-body">
                                <div>
                                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar" />
                                </div>
                                <div>
                                    <h5 className="card-title text-center text-light">{name}</h5>
                                    <div className="social-accounts text-center ">
                                        <a href="#" className="social-link px-4">
                                            <Icon.Facebook
                                                iconname="Facebook"
                                                color="royalblue"
                                                size={30}
                                                className="align-left"
                                            />
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                        <a href="#" className="social-link px-4">
                                            <Icon.Twitter
                                                iconname="Twitter"
                                                color="#1DA1F2"
                                                size={30}
                                                className="align-left"
                                            />
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="#" className="social-link px-4">
                                            <Icon.Instagram
                                                iconname="Instagram"
                                                color=" #cd486b"
                                                size={30}
                                                className="align-left"
                                            />
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="info mx-5 glass">
                            <h4 className="text-center m-3">Personal Information</h4>
                            {
                                checkAllFieldsPresent() ? null : <div style={{ textAlign: "center", color: 'red' }}>Some fields missing, kindly update your information</div>
                            }
                            <div className="d-flex justify-content-center my-5">
                                <div className=" row col-md-7 align-items-end">
                                    <div className="form-label fw-bolder text-center">Name</div>
                                    <div className="form-label fw-bolder text-center">Date of birth</div>
                                    <div className="form-label fw-bolder text-center">Age</div>
                                    <div className="form-label fw-bolder text-center">Email</div>
                                    <div className="form-label fw-bolder text-center">Phone</div>
                                    <div className="form-label fw-bolder text-center">Address</div>
                                </div>
                                <div className="col-md-5">
                                    {isEditing ? (
                                        <>
                                            <input type="text-dark" className="form-control form-control-p" value={name} onChange={(e) => validateNameAndSet(e.target.value)} />
                                            {validName ? null : <small style={{ color: 'red' }}>Enter a valid name</small>}
                                            <input type="text-dark" className="form-control form-control-p" value={dob} onChange={(e) => updateDobAndAge(e.target.value)} />
                                            <div className="form-control form-control-p" style={{ "background-color": "#f2f2f2", "opacity": "0.7" }}>{age}</div>
                                            <input type="text-dark" className="form-control form-control-p" value={email} onChange={(e) => validateEmailAndSet(e.target.value)} />
                                            {validEmail ? null : <small style={{ color: 'red' }}>Enter valid email</small>}
                                            <input type="text-dark" className="form-control form-control-p" value={phone} onChange={(e) => validatePhoneNumberAndSet(e.target.value)} />
                                            {validPhoneNumber ? null : <small style={{ color: 'red' }}>Enter valid phone number</small>}
                                            <input type="text-dark" className="form-control form-control-p" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-control form-control-p">{name}</div>
                                            <div className="form-control form-control-p">{dob}</div>
                                            <div className="form-control form-control-p">{age}</div>
                                            <div className="form-control form-control-p">{email}</div>
                                            <div className="form-control form-control-p">{phone}</div>
                                            <div className="form-control form-control-p">{address}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="text-center">
                                {isEditing ? (
                                    <>
                                        <button className="btn btn-primary m-3" onClick={handleSaveClick}>Save</button>
                                        <button className="btn btn-primary m-3" onClick={handleCancelClick}>Cancel</button>
                                    </>
                                ) : (
                                    <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                                )}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
