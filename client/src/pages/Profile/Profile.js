// will require components
import "./Profile.css";
import React from  "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PortflowioCard from "../../components/Cards";
import Header from "../../components/Header";
import GlobalNav from "../../components/GlobalNav";
import axios from "axios";
import SideNavBar from "../../components/SideNavBar";
import API from "../../utils/API.js";
import { withAuth } from '@okta/okta-react';


export default withAuth(class Profile extends React.Component{
  constructor(props){

super(props);
    this.state ={
      user:{},
      authenticated: true,
      userposts: [],
      profile: true
    }

    console.log(props);
    console.log (this.state.authenticated);
}







componentDidMount (){

if(this.state.authenticated === true){
  var tokenstuff = (JSON.parse((localStorage.getItem("okta-token-storage")), null, 2));

  var email= tokenstuff.idToken.claims.email;


  API.userFindByEmail(email)
  .then(res => {
    this.setState({user: res.data});
  })
  .catch(err => console.log(err));

}
}

componentDidUpdate (){
  API.getPostsById(this.state.user._id)
  .then(res => this.setState({userposts: [res.data]}))
  .catch(err=>console.log(err));

}


authButton() {
  if (this.state.authenticated){
  return(
    <button type="button" className="btn btn-info right auth" onClick={this.props.auth.logout}>Logout</button>);
  }
  else{
    return(<button type="button" className="btn btn-info right auth" onClick={this.props.auth.login}>Login</button>);

  }
}

  loadProfileCards () {
 if (this.state.userposts.postImage){
    var userposty2= this.state.userposts.slice(0).reverse().map(posty =>
      (<PortflowioCard
        postImage ={posty.postImage}
        website={posty.website}
        creator={posty.creator}
        project={posty.project}
        description = {posty.description}
        title= {posty.title}
      />)
    );
    return userposty2;
}
}


  render(){
    return(
      <div className="profileholder">
        <Header id="headerHome" />
        <GlobalNav
          button= {this.authButton}
          authenticated = {this.state.authenticated}
          creator = {this.state.user._id}

          >

        </GlobalNav>

        {this.authButton()}
        <SideNavBar
          firstName={this.state.user.firstName}
          lastName={this.state.user.lastName}
          email={this.state.user.email}
          image={this.state.user.userImage}
          bio= {this.state.user.bio}
          linkedin= {this.state.user.linkedin}
          website={this.state.user.website}
          github={this.state.user.github}
          username= {this.state.user.username}
          authenticated = {this.state.authenticated}
          id={this.state.user._id}

        />

      <div className = "profilecards">
      {this.loadProfileCards()}
    </div>

  </div>

  );

  }
});
