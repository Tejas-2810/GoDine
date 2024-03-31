import React, { useState, useEffect, useRef } from "react";
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
import { dateStringToMillis, millisToDateString } from '../../utils/DateUtils'
import useAuth from '../../hooks/useAuth';
import axios, { isAxiosError } from 'axios';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const { getUserId } = useAuth();
    const cancelRequestRef = useRef(null);

    function updateDobAndAge(dobString) {
        setDob(dobString);
        const dobDate = new Date(dobString);
        const currentDate = new Date();
        const diffInMillis = currentDate - dobDate;
        const duration = new Date(diffInMillis);
        setAge(Math.abs(duration.getUTCFullYear() - 1970));
    }

    useEffect(() => {
        // fetch profile endpoint
        const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost";
        const server_port = process.env.REACT_APP_SERVER_PORT || "8080";
        const profile_endpoint = process.env.REACT_APP_PROFILE_ENDPOINT || "users";
        const userId = getUserId();

        const endpoint = `${server_url}:${server_port}/${profile_endpoint}/${userId}`;

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
                if (err.status === 500) {
                    alert("Internal server error, please try again after sometime");
                    return;
                }
            }
            else if (response.status && response.data?.name
                && response.data?.email && response.data?.phoneNumber
                && response.data?.dateOfBirth && response.data?.address) {

                const { name, email, phoneNumber, dateOfBirth, address } = response.data;

                setName(name);
                setEmail(email);
                setPhone(phoneNumber);
                setDob(dateOfBirth);

                const dobDate = new Date(dateOfBirth);
                const currentDate = new Date();
                const diffInMillis = currentDate - dobDate;
                const duration = new Date(diffInMillis);

                setAge(Math.abs(duration.getUTCFullYear() - 1970));
                setAddress(address);
            }
            else {
                alert("Internal server error, please try again after sometime");
            }
        }

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const server_url = process.env.SERVER_URL || "http://localhost";
        const server_port = process.env.SERVER_PORT || "8080";
        const profile_edit_endpoint = process.env.PROFILE_EDIT_ENDPOINT || "users/edit";
        const userId = getUserId();

        // cancel old request
        cancelRequestRef.current?.abort();
        cancelRequestRef.current = new AbortController();

        const endpoint = `${server_url}:${server_port}/${profile_edit_endpoint}/${userId}`;

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
            if (response.status === 403) {
                console.log("token gone");
                window.location.reload();
                return;
            }
            if (response.status === 404) {
                alert("User not found, please verify account!!");
            }
            else {
                alert("Something went wrong, could not save");
            }
        }
        else if (response.status === 200 && response.data?.name
            && response.data?.email && response.data?.phoneNumber
            && response.data?.dateOfBirth && response.data?.address) {
            alert("Details successfully saved in database");
        }
        else {
            alert("Something went wrong, could not save");
        }

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
                                            <input type="text-dark" className="form-control form-control-p" value={name} onChange={(e) => setName(e.target.value)} />
                                            <input type="text-dark" className="form-control form-control-p" value={dob} onChange={(e) => updateDobAndAge(e.target.value)} />
                                            <div className="form-control form-control-p">{age}</div>
                                            <input type="text-dark" className="form-control form-control-p" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <input type="text-dark" className="form-control form-control-p" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                                    <button className="btn btn-primary" onClick={handleSaveClick}>Save</button>
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
