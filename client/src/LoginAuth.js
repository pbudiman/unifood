const LoginAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      LoginAuth.isAuthenticated = true;
      console.log(this.isAuthenticated)
      setTimeout(cb, 100); 
    },
    signout(cb) {
      LoginAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

export default(LoginAuth);