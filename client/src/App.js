import React, { Component } from "react"
import BeforeLogin from './Pages/BeforeLogin'
import UserAfterLogin from './Pages/UserAfterLogin'
import KontratadoAfterLogin from './Pages/KontratadoAfterLogin'
import API from './utils/API'

class App extends Component {

  constructor() {
    super();
    this.state = {
      isFacebookAuthenticated: false,
      isKontratadoAuthenticated: false,
      facebookUser: null,
      token: '',
      kontratadoUser: null,
      favorites:[],
      messages:[],
      favProfession:''
    };
  }

  facebookLogout = () => {
    this.setState({
      isFacebookAuthenticated: false,
      token: '',
      facebookUser: null
    });
  }

  onFailure = (error) => {
    alert(error);
  }



  
  facebookResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
   
    fetch('/api/v1/auth/facebook', options).then(r => {
      console.log(r);
      const token = r.headers.get('x-auth-token');
      r.json().then(facebookUser => {
        if (token) {
          this.setState({ isFacebookAuthenticated: true, facebookUser, token })
            this.state.facebookUser.favourites.map(favourite=>{
              API.getFavourite(favourite).then(result=>{
                console.log(result)
                let pushing=[];
                pushing.push(result)
                this.setState({favorites: pushing})

                
                
              }).then(  this.state.favorites.data.profession.map(profession=>{
                API.getProfession(profession).then(res=>{
                  console.log("we received a profession", res);
                  let pushing=[];
                  pushing.push(res);
                  this.setState({favProfession: res})
                })
                }))
        })
      }
    })
  });
}

  logKontratado = (idKontratado) => {
    let kontratadoUser;
    API.getKontratado(idKontratado)
      .then(result=>{
        kontratadoUser = result.data;
        this.setState({
          kontratadoUser,
          isKontratadoAuthenticated : true
        });
      })
  }

  logOutKontratado = () => {
    this.setState({
      isKontratadoAuthenticated : false
    });
  }

  kontratadoUpdate = kontratado => {
    this.setState({
      kontratadoUser : kontratado
    })
  }

  chooseRender = () => {
    if (this.state.isFacebookAuthenticated || this.state.isKontratadoAuthenticated){
      if (this.state.isFacebookAuthenticated){
        return <UserAfterLogin userId={this.state.facebookUser._id} addFavs={this.addFavs} myFavs={this.state.favorites} favProfession={this.state.favProfession} facebookLogout = {this.facebookLogout} />
      } else {
        return <div>
          <KontratadoAfterLogin kontratadoUpdate={this.kontratadoUpdate} kontratado = {this.state.kontratadoUser} logOutKontratado={this.logOutKontratado} />
        </div>
      }
    } else {
      return <BeforeLogin logKontratado = {this.logKontratado} facebookResponse={this.facebookResponse} />
    }
  }

  render() {
    return (
      <div className="App">
        {this.chooseRender()}
      </div>
    )
  }
}

export default App;
