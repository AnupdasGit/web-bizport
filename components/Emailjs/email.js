import React, { Component } from "react";
import axios from "axios";
import { Box, Heading, Stack } from "@chakra-ui/layout";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPhone = this.onChangeUserPhone.bind(this);
    this.onChangeUserMessage = this.onChangeUserMessage.bind(this);
    this.onChangeUserAddress = this.onChangeUserAddress.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      nameofcompany: "",
      name: "",
      email: "",
      phoneno: "",
      message: "",
      address: "",
    };
  }

  onChangeCompanyName(e) {
    this.setState({ nameofcompany: e.target.value });
  }

  onChangeUserName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeUserEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeUserPhone(e) {
    this.setState({ phoneno: e.target.value });
  }

  onChangeUserMessage(e) {
    this.setState({ message: e.target.value });
  }
  onChangeUserAddress(e) {
    this.setState({ address: e.target.value });
  }

  handleClick() {
    const emailObject = {
      nameofcompany: this.state.nameofcompany,
      name: this.state.name,
      email: this.state.email,
      phoneno: this.state.phoneno,
      address: this.state.address,
      message: this.state.message,
    };

    axios
      .post("http://localhost:3000/send", emailObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      nameofcompany: "",
      name: "",
      email: "",
      phoneno: "",
      message: "",
      addresss: "",
    });

    //console.log("click");
  }

  render() {
    return (
      <div  > 
     
        <section className="my-5 py-5" id="contactus">  
         <Box w="100%" height="150px" p={4} color="white"></Box>
         <Stack align="center" justify="space-between"  >
        <Heading>Contact Us</Heading>
      </Stack>
          <div className="container"  >
            <div className="well well-sm">
              <h3>
                <strong className=" text-center">Our Location</strong>
              </h3>
            </div>

            <div className="row">
              <div className="col-md-7">
                <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1GEa8aqwbeV238GbeFyILqO4qvimDH5lD"
                style={{
                    border: "0",
                    width: "100%",
                    height: "315px",
                    frameborder: "0",
                  }}
                  allowFullscreen
                />
              </div>

              <div className="col-md-4 ">
                <h4>
                  <strong>Contact Us</strong>
                </h4>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name of Company"
                    value={this.state.nameofcompany}
                    onChange={this.onChangeCompanyName}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onChangeUserName}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChangeUserEmail}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone"
                    value={this.state.phoneno}
                    onChange={this.onChangeUserPhone}
                  />
                </div>{" "}
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Address"
                    value={this.state.addresss}
                    onChange={this.onChangeUserAddress}
                  />
                </div>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="3"
                  placeholder="Message"
                  value={this.state.message}
                  onChange={this.onChangeUserMessage}
                />
                <br />
                <button
                  value="Send"
                  className="btn btn-warning btn-lg "
                  onClick={this.handleClick}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Contact;
