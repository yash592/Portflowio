// Static Sidenav

import "./SideNavBar.css";

import React from "react";
import {SideNav, Button, SideNavItem} from "react-materialize";
import ModalProfile from "../ModalProfile";
class SideNavBar extends React.Component {

	constructor(props){
		super(props);
		this.state ={
			authenticated: this.props.authenticated
		};
		console.log(props);
	}
	render (){
		return(
			<SideNav id="slide-out"
				className= "fixed side-nav black"
				trigger = {<Button className="profileButton">Open Profile</Button>}
				options={{
					 closeOnClick: true,
					 draggable: true,

				  }}
				>
				<SideNavItem id="user-info" userView
					user={
						{
						background:  '',
						image: this.props.image,
						name: this.props.firstName + " " + this.props.lastName,
						email: this.props.email
					}}
					/>
				<ModalProfile
					firstName= {this.props.firstName}
          lastName={this.props.lastName}
          email={this.props.email}
          image={this.props.userImage}
          bio= {this.props.bio}
          linkedin= {this.props.linkedin}
          website={this.props.website}
          github={this.props.github}
          username= {this.props.username}
          authenticated = {this.props.authenticated}
					id={this.props.id}/>
					<hr className="style13"/>
				<SideNavItem  id="linkedin" href={this.props.linkedin}><i className="fa fa-linkedin-square" aria-hidden="true"></i>LinkedIn</SideNavItem>
				<SideNavItem id="github" href={this.props.github}><i className="fa fa-github-alt" aria-hidden="true"></i>Github</SideNavItem>
				<SideNavItem id="portfolio" href={this.props.website}><i className="fa fa-link" aria-hidden="true"></i>Portfolio</SideNavItem> <hr className="style13"/>
				<SideNavItem id="about"><h5 className="center-align">About</h5><p className="center">{this.props.bio}</p></SideNavItem>
				</SideNav>

);
}
}
	export default SideNavBar;
