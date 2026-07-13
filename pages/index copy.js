import { useState } from "react";
import emailjs from "emailjs-com";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

export default function ContactPage() {
  const [message, setMessage] = useState(false);
  const [button, setButton] = useState(false);

  // Fungsi saat form di submit
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_thc7ljo",
        "template_je6ta2h",
        e.target,
        "user_9oKOxPKSJxeofT9BLB48N"
      )
      .then(
        (result) => {
          // Pesan yang muncul saat sukses
          setMessage(
            <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-indigo-500">
              <span className="inline-block align-middle mr-8">
                Your message has been sent!
              </span>
            </div>
          );
          setButton("SEND MESSAGE");
        },
        (error) => {
          setMessage(
            <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-indigo-500">
              <span className="inline-block align-middle mr-8">
                {error.text}
              </span>
            </div>
          );
          setButton("SEND MESSAGE");
        }
      );
  }

  return (
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
                src="https://www.google.com/maps/d/embed?mid=1oryS2JEslZ2ByybZzh31Q81tVPSZcUaO"
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
              <form onSubmit={sendEmail}>
                <div className="form-group">
                  <label htmlFor="nameofcompany">Name Of Company</label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_nameofcompanay"
                    className="form-control"
                  />
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    className="form-control"
                  />
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="from_Email"
                    name="from_Email"
                    className="form-control"
                    required
                  />
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="phoneno">Phone No</label>
                  <input
                    type="text"
                    id="from_phoneno"
                    name="from_phoneno"
                    className="form-control"
                    required
                  />
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="from_address"
                    name="from_address"
                    className="form-control"
                  />
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="message">Message</label>

                  <div>
                    {" "}
                    <textarea
                      id="message"
                      name="message"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <br />
                <Button className="flex mx-auto text-black bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  {!button ? "SEND MESSAGE" : button}
                </Button>
                <div
                  id="form-result"
                  className="lg:w-1/2 md:w-2/3 mx-auto mt-10"
                >
                  {message}
                </div>
              </form>
            </div>
            <div id="form-result" className="lg:w-1/2 md:w-2/3 mx-auto mt-10">
              {message}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
