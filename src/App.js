import React from "react";
import firebase from "./firebase";
import img1 from "./images/undraw_remotely_2j6y.svg";
import "./css/style.css";


class App extends React.Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "visible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptca verified");
        },
        defaultCountry: "IN",
      }
    );
  };
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+91" + this.state.mobile
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });
  }
  onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = this.state.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("User is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  
  render() {
    return (
      <div className="content" style={{ paddingTop: "7rem" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={img1} alt="backgroung" className="img-fluid" />
            </div>
            <div className="col-md-6 contents">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <marquee
                      width="60%"
                      direction="left"
                      height="100px"
                      
                    >
                      <b>
                        <i>
                          please Login with your mobile Number and the OTP !!!
                        </i>
                      </b>
                    </marquee>
                    <h3>
                      <b> Sign In Continue</b>
                    </h3>
                    <p className="mb-4" style={{ fontSize: "20px" }}>
                      <p class="text-success">
                        To keep connected with us please login with your
                        personal info
                      </p>
                    </p>
                  </div>
                  <form onSubmit={this.onSignInSubmit}>
                    <div id="sign-in-button"></div>
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Mobile number"
                      required
                      onChange={this.handleChange}
                    />
                    <button type="submit">
                      <span class="border border-danger">Submit</span>
                    </button>
                  </form>

                  <h2>Enter OTP</h2>
                  <form onSubmit={this.onSubmitOTP}>
                    <input
                      type="number"
                      name="otp"
                      placeholder="OTP Number"
                      required
                      onChange={this.handleChange}
                    />
                    <button type="submit">
                      <span class="border border-danger">Submit</span>
                    </button>
                    <input
                      type="submit"
                      value="Log In"
                      className="btn btn-block btn-primary my-2"
                      style={{ height: "48px", width: "420px" }}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
