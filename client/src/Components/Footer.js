import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
	return (
		<MDBFooter color="blue" className="font-small pt-4 mt-4 footer-container">
			<MDBContainer fluid className="text-center text-md-left">
				<MDBRow>
					<MDBCol md="6">
						<h5 className="title">WASTr</h5>
						<ul>
							<li className="list-unstyled">
								<a href="/">Home</a>
							</li>
							<li className="list-unstyled">
								<a href="/waste">Log waste</a>
							</li>
							<li className="list-unstyled">
								<a href="/profile">Profile</a>
							</li>
							<li className="list-unstyled">
								<a href="/news">News</a>
							</li>
							<li className="list-unstyled">
								<a href="/tips">Tips</a>
							</li>
							<li className="list-unstyled">
								<a href="/about">About</a>
							</li>
							<li className="list-unstyled">
								<a href="/contact">Contact us</a>
							</li>
						</ul>
					</MDBCol>
					<MDBCol md="6">
						<h5 className="title">Sources:</h5>
						<ul>
							<li className="list-unstyled">
								<a href="https://learn.compactappliance.com/recycling-tips/">compactappliance.com</a>
							</li>
							<li className="list-unstyled">
								<a href="https://www.reusethisbag.com/articles/top-23-best-recycling-tips/">reusethisbag.com</a>
							</li>
							<li className="list-unstyled">
								<a href="https://learn.eartheasy.com/articles/plastics-by-the-numbers/">eartheasy.com</a>
							</li>
							<li className="list-unstyled">
								<a href="https://ourworldindata.org/plastic-pollution">ourworldindata.org</a>
							</li>
						</ul>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
			<div className="footer-copyright text-center py-3">
				<MDBContainer fluid>
					&copy; {new Date().getFullYear()} Copyright: <a href="www.google.com"> Rad Rubber Ducks </a>
				</MDBContainer>
			</div>
		</MDBFooter>
	);
}

export default Footer;