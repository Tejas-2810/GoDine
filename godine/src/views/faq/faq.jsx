import React from 'react';
import './faq.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Faq = () => {

    return (
        <div class="accordion accordion-flush pcontainer faq container" id="accordionFlushExample">
            <h1 className='text-center'> Frequently Asked Questions </h1>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        How can I make a reservation at your restaurant?
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">You can make a reservation online through our website or by calling us at (phone number). We recommend booking in advance to secure your preferred date and time.</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        What is your cancellation policy?
                    </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">We understand that plans can change. If you need to cancel or modify your reservation, please do so at least 24 hours before your scheduled time. You can cancel or change your reservation online through our website or by calling us at (phone number). If you fail to show up or cancel within 24 hours, you may be charged a cancellation fee of (amount).</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Do you accept walk-ins?
                    </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">We welcome walk-ins, but we cannot guarantee availability. We suggest making a reservation online through our website or by calling us at (phone number) to ensure your table.</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFour">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        Do you have a dress code?
                    </button>
                </h2>
                <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">We do not have a formal dress code, but we appreciate our guests dressing smart casual. Please avoid wearing flip-flops, shorts, tank tops, or hats.</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFive">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                        How can I make a reservation at your restaurant?
                    </button>
                </h2>
                <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">You can make a reservation online through our website 1 or by calling us at (phone number). We recommend booking in advance to secure your preferred date and time.</div>
                </div>
            </div>
        </div>
    );
};

export default Faq;

