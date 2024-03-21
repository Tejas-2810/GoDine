import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import 'bootstrap/dist/css/bootstrap.min.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Dashboard extends Component {
    render() {
        const bar= {
            backgroundColor: null,
            title: {
                text: "Income chart"
            },
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                        { label: "January", y: 10 },
                        { label: "February", y: 15 },
                        { label: "March", y: 25 },
                        { label: "April", y: 30 },
                        { label: "May", y: 28 }
                    ]
                }
            ]
        }
        const pie = {

            backgroundColor: null,
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Booking Type"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 45, label: "Free Bookings" },
					{ y: 55, label: "Paid Bookings" }
				]
			}]
		}
        const line = {
			backgroundColor: null,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Number of Bookings"
			},
			axisY: {
				title: "Number of Bookings",
			},
			data: [
			{
				type: "area",
				xValueFormatString: "YYYY",
				yValueFormatString: "#,##0.## Million",
				dataPoints: [
					{ x: new Date(2017, 0), y: 7.6},
					{ x: new Date(2016, 0), y: 7.3},
					{ x: new Date(2015, 0), y: 6.4},
					{ x: new Date(2014, 0), y: 5.3},
					{ x: new Date(2013, 0), y: 4.5},
					{ x: new Date(2012, 0), y: 3.8},
					{ x: new Date(2011, 0), y: 3.2}
				]
			}
			]
		}

        return (
            <div className='cb'>
                <div className='row'>
                    <div className='col-md-6 '>
                        <div className='row my-auto justify-content-center'>
                        <div className='card col-md-3 mx-5 '>
                            <div className='card-body text-center'>
                                <h5 className='card-title'>Average Order Value</h5>
                                <p className='card-text'>$ 50</p>
                            </div>
                        </div>
                        <div className='card col-md-3 mx-5'>
                            <div className='card-body text-center'>
                                <h5 className='card-title'>Total Revenu</h5>
                                <p className='card-text'>$ 3000</p>
                            </div>
                        </div>
                        <div className='card col-md-3 mx-5'>
                            <div className='card-body text-center'>
                                <h5 className='card-title'>Average Ratings</h5>
                                <p className='card-text '>3.9⭐</p>
                            </div>
                        </div>
                        </div>

                        <div className='my-2'> <CanvasJSChart options={bar}/></div>
                        <div className='my-2'> <CanvasJSChart options={pie}/></div>
                        <div className='my-2'> <CanvasJSChart options={line}/></div>
                    </div>
                    <div className='col-md-6'>
                        <form className='form'>
                            <h1 className='text-center'>Add A Restaurant</h1>
                            <div className='form-group'>
                                <label htmlFor='restaurantName'>Restaurant Name</label>
                                <input type='text' className='form-control' id='restaurantName' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='address'>Address</label>
                                <input type='text' className='form-control' id='address' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='cuisines'>Cuisines</label>
                                <input type='text' className='form-control' id='cuisines' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='workingHours'>Working Hours</label>
                                <input type='text' className='form-control' id='workingHours' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='contactNumber'>Contact Number</label>
                                <input type='text' className='form-control' id='contactNumber' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='seatingCapacity'>Seating Capacity</label>
                                <input type='text' className='form-control' id='seatingCapacity' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='menu'>Upload Menu</label>
                                <input type='file' className='form-control-file' id='menu' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='photos'>Upload Photos</label>
                                <input type='file' className='form-control-file' id='photos' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
}

export default Dashboard;