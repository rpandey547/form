import React, { Component } from "react";
import "./Form.css";
class Form extends Component {
  userData;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phoneNo: "",
      name: "",
      bio: "",
      dob: "",
      gender: "",
      error: {
        nameErr: "",
        phoneNoErr: "",
        emailErr: "",
        bioErr: "",
        dobErr: "",
        genErr: "Please select gender type"
      },
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneNoChange = this.handlePhoneNoChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }


  handleNameChange(e) {
    const { value } = e.target;
    if (/^[a-zA-Z]*$/g.test(value)) {
      this.setState({ name: value });
    }
    if (value.length > 20) {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          nameErr: "Allowd only 20 character",
        },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          nameErr: "",
        },
      }));
    }
  };

  handlePhoneNoChange(e) {
    const { value } = e.target;
    if (/^\d+$/.test(value) || value === '') {
      this.setState({ phoneNo: value });
    }
    if (value.length > 10) {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          phoneNoErr: "Allowd only 10 digits",
        },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          phoneNoErr: "",
        },
      }));
    }
  };
  handleBioChange(e) {
    const { value } = e.target;
    if (/^[a-zA-Z- ]*$/g.test(value)) {
      this.setState({ bio: value });
    }
    const words = value.split(" ");
    if (words.length > 60) {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          bioErr: "Allowd only 60 words",
        },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          bioErr: "",
        },
      }));
    }
  };

  handleEmailChange(e) {
    const { value } = e.target;
    let emailRegix = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
    if (value.trim().length > 0|| value === '') {
      this.setState({ email: value });
    }
    if (!emailRegix.test(value)) {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          emailErr: "Email not valid",
        },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          emailErr: "",
        },
      }));
    }
  };

  sameDate = (d1, d2) =>
    d1.getFullYear() >= d2.getFullYear() &&
    d1.getMonth() >= d2.getMonth() &&
    d1.getDate() >= d2.getDate();

  handleDateChange(e) {
    const { value } = e.target;
    this.setState({ dob: value });
    let resultDate = this.sameDate(new Date(value), new Date())
    if (resultDate) {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          dobErr: "Please input valid Date of birth",
        },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          dobErr: "",
        },
      }));
    }
  };

  onGenderChange = (e) => {
    let genValue = e.currentTarget.value;
    this.setState((prevState) => ({
      ...prevState,
      gender: genValue,
      error: {
        ...prevState.error,
        genErr: "",
      },
    }));
  }
  checkSubmitBtnDisabled = () => {
    const { name, phoneNo, email, dob, bio, error, gender } = this.state;
    let objValues = Object.values(error);
    let result = objValues.some((value) => value.length > 0);
    if (!result && name && email && dob && gender) {
      if (phoneNo.length > 10 && bio.split(' ').length > 60) return true;
      return false;
    }
    return true;
  };
handleSubmitChange=event=>{
  alert(`${this.state.name} 
  ${this.state.phoneNo} 
  ${this.state.email}
  ${this.state.dob}
  ${this.state.gender}`)
  event.preventDefault();
  this.handleReset()
}
  handleReset = () => {
    this.setState({
      email: "",
      phoneNo: "",
      name: "",
      bio: "",
      dob: "",
      gender: "",
      error: {
        nameErr: "",
        phoneNoErr: "",
        emailErr: "",
        bioErr: "",
        dobErr: "",
        genErr: "Please select gender type"
      }
    })
  }
componentDidMount(){
  this.userData=JSON.parse(localStorage.getItem("user"));
  if(localStorage.getItem("user")){
    this.setState({
      name: this.userData.name,
      email: this.userData.email,
      phoneNo: this.userData.phoneNo,
      gender: this.userData.gender,
      dob:this.userData.dob,
      bio: this.userData.bio

    })
  }else{
    this.setState({
      name: "",
      email: "",
      phoneNo: "",
      gender: "",
      dob: "",
      bio: "",
    })
  }
}
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem("user",JSON.stringify(nextState));
}

  render() {
    const { phoneNo, name, email, bio, dob, gender } = this.state;
    const { nameErr, phoneNoErr, emailErr, bioErr, dobErr, genErr } = this.state.error;
    return (
      <div className="container">
        <div className="header">
          <h2>Registration Form</h2>
        </div>
        <form className="form" id="form">
          <div className="form-control">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={name}
              onChange={this.handleNameChange}
            />
            {nameErr.length > 0 && <small className="error">{nameErr}</small>}
          </div>
          <div className="form-control">
            <label>Phone</label>
            <input
              type="number"
              value={phoneNo}
              name="phoneNo"
              onChange={this.handlePhoneNoChange}
            />
            {phoneNoErr.length > 0 &&
              <small className="error">{phoneNoErr}</small>
            }

          </div>
          <div className="form-control">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={this.handleEmailChange}
            />
            {emailErr.length > 0 &&
              <small className="error">{emailErr}</small>
            }
          </div>
          <div className="form-control ">
            <label htmlFor="Bio">Bio:</label>
            <textarea
              type="text"
              name="bio"
              value={bio}
              onChange={this.handleBioChange}
              rows="10"
            ></textarea>
            {bioErr.length > 0 &&
              <small className="error">{bioErr}</small>
            }
          </div>
          <div className="form-control ">
            <label>DOB:</label>
            <input
              type="date"
              name="dob"
              id="dob"
              required="required"
              value={dob}
              onChange={this.handleDateChange}
            />
            {dobErr.length > 0 &&
              <small className="error">{dobErr}</small>
            }
          </div>
          <div className="form-control ">
            <label>Gender:</label>
            <br></br>
            <label>
              Female
              <input
                type="radio"
                name="gender"
                value={'female'}
                checked={gender === "female"}
                onChange={this.onGenderChange}
              />
            </label>{' '}
            <label>
              Male
              <input
                type="radio"
                name="gender"
                value={'male'}
                checked={gender === "male"}
                onChange={this.onGenderChange}
              />
            </label>
            {genErr.length > 0 && <><br></br><small className="error">{genErr}</small></>}
          </div>
          <button
            disabled={this.checkSubmitBtnDisabled()}
            type="submit"
            className={this.checkSubmitBtnDisabled() ? "btn-disabled" : "btn" 
           }  onClick={this.handleSubmitChange}
           >
            Submit
          </button>
          <input type="reset" defaultValue="reset" className="btn" onClick={this.handleReset}/>
        </form>
      </div>
    );
  }
};
export default Form;
