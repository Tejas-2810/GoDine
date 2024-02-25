import React, { useState } from "react";
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("John Doe");
    const [age, setAge] = useState("25");
    const [email, setEmail] = useState("John@gamil.com");
    const [phone, setPhone] = useState("1234567890");
    const [address, setAddress] = useState("123, New York");

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    return (
        <div className="text-white">
            <div className="background">
            <div className="row d-flex my-5">
            <div className="col-md-4 ">
                <div className="card display m-5 glass">
                    <div className="card-body">
                        <div>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar" />
                        </div>
                        <div>
                            <h5 className="card-title text-center text-light">{name}</h5>
                            <div className="social-accounts text-center ">
                                <a href="#" className="social-link px-4">
                                    <Icon.Facebook
                                        iconName="Facebook"
                                        color="royalblue"
                                        size={30}
                                        className="align-left"
                                    />
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="#" className="social-link px-4">
                                    <Icon.Twitter
                                        iconName="Twitter"
                                        color="#1DA1F2"
                                        size={30}
                                        className="align-left"
                                    />
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="social-link px-4">
                                    <Icon.Instagram
                                        iconName="Instagram"
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
                <div className="info m-5 glass">
                    <h4 className="text-center m-3">Personal Information</h4>
                    <div className="d-flex justify-content-center my-5">
                        <div className=" row col-md-7 align-items-end">
                                <div className="form-label fw-bolder text-center">Name</div>
                                <div className="form-label fw-bolder text-center">Age</div>
                                <div className="form-label fw-bolder text-center">Email</div>
                                <div className="form-label fw-bolder text-center">Phone</div>
                                <div className="form-label fw-bolder text-center">Address</div>
                        </div>
                        <div className="col-md-5">
                            {isEditing ? (
                                <>
                                    <input type="text-dark" className="form-control form-control-p" value={name} onChange={(e) => setName(e.target.value)} />
                                    <input type="text-dark" className="form-control form-control-p" value={age} onChange={(e) => setAge(e.target.value)} />
                                    <input type="text-dark" className="form-control form-control-p" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input type="text-dark" className="form-control form-control-p" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <input type="text-dark" className="form-control form-control-p" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </>
                            ) : (
                                <>
                                    <div className="form-control form-control-p">{name}</div>
                                    <div className="form-control form-control-p">{age}</div>
                                    <div className="form-control form-control-p">{email}</div>
                                    <div className="form-control form-control-p">{phone}</div>
                                    <div className="form-control form-control-p">{address}</div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="text-center">
                    {isEditing ?(
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
