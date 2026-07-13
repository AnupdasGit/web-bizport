import { useState } from "react";
import emailjs from "emailjs-com";
import { Button } from "@chakra-ui/button";

export default function IndexPage() {
  const [message, setMessage] = useState(false); // set kondisi untuk pesan
  const [button, setButton] = useState(false); // set kondisi untuk tombol

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
          // Pesan yang muncul saat error
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
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
          </div>
          <form onSubmit={sendEmail}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label> <br/>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="nameofcompany"
                      className="leading-7 text-sm text-gray-600"
                    >
                     Company Name
                    </label> <br/>
                    <input
                      type="text"
                      id="from_nameofcompany"
                      name="from_nameofcompany"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label> <br/>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="phoneno"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Mobile Number
                    </label> <br/>
                    <input
                      type="text"
                      id="from_phoneno"
                      name="from_phoneno"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="address"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Address
                    </label> <br/>
                    <input
                      type="text"
                      id="from_address"
                      name="from_address"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Message
                    </label>
                    <br/>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <Button>{!button ? "SEND MESSAGE" : button}</Button>
                </div>
              </div>
            </div>
          </form>
          <div id="form-result" className="lg:w-1/2 md:w-2/3 mx-auto mt-10">
            {message}
          </div>
        </div>
      </section>
    </div>
  );
}
