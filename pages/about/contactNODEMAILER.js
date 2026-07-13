import { useState } from "react";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");

    let data = {
      name,
      email,
      message,
      companyname,
      phoneno,
      address,
    };
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
     axios.post("/api/contact", data, axiosConfig) 
      .then((res) => {
        console.log("Response received");
        if (res.status === 200) {
          console.log("Response succeeded!");
          setSubmitted(true);
          setName("");
          setEmail("");
          setMessage("");
          setCompanyName("");
          setPhoneno("");
          setAddress("");
        }
      });
  };
  const content = (
    <div>
      <section className="my-5 py-5" id="contactus">
        <Box w="100%" height="30px" p={4} color="white"></Box>
        <Stack align="center" justify="space-between">
          <Heading>Contact Us</Heading>
        </Stack>
        <div className="container">
          <div className="well well-sm">
            <h3>
              <strong className="text-center">Our Location</strong>
            </h3>
          </div>

          <div className="row">
            <Box className="col-md-7  " pt="10">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1GEa8aqwbeV238GbeFyILqO4qvimDH5lD"
                style={{
                  border: "0",
                  width: "100%",
                  height: "315px",
                  frameborder: "0",
                }}
                allowFullScreen
              />
            </Box>

            <div className="col-md-4 ">
              <h4>
                <strong>Contact Us</strong>
              </h4>
              <div className="form-group">
                <label htmlFor="nameofcompany">Name of Company</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name of Company"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="nameofcompany"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  name="message"
                />
              </div>{" "}
              <div className="form-group">
                <label htmlFor="phoneno">Phone No</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="phoneno"
                  onChange={(e) => {
                    setPhoneno(e.target.value);
                  }}
                  name="phoneno"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  className="form-control"
                  type="text"
                  cols="30"
                  rows="3"
                  placeholder="Message"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  name="address"
                />
              </div>
              <br />
              <button
                value="Send"
                className="btn btn-warning btn-lg "
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  return <div>{content}</div>;
}
