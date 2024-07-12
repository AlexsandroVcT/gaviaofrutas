function getUserLogged(){ 
    const user = JSON.parse(localStorage.getItem("userData"));
    return user
}

function logout() {
    localStorage.setItem("userData", null)
    
    window.location.href='/'
  }