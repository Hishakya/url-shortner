// import { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";
import "tailwindcss/tailwind.css";
import dbConnect from "@/utils/connectMongo";
import URL from "@/models/urls";

export default function Home({ result }: any) {
  const [shortenedLink, setShortenedLink] = useState("");
  const [userInput, setUserInput] = useState("");

  // console.log("rslltt..", result);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${userInput}`
      );
      setShortenedLink(response.data.result.full_short_link);
      const shorturl = response.data.result.full_short_link;
      console.log("www", response.data);
      const dataa = {
        longUrl: userInput,
        shortUrl: shorturl,
      };
      console.log(11111, dataa);
      if (response.data.ok) {
        console.log(shorturl, "nbb");
        const { data } = await axios.post("/api/url", {
          longUrl: userInput,
          shortUrl: shorturl,
        });
        console.log("rgstr..pg..", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" container py-20  flex justify-center items-center">
        {/* <div className=" container h-screen flex justify-center items-center"> */}
        <div className=" text-center">
          <h1 className=" text-2xl font-medium text-blue-500 mb-4">
            WELCOME TO OUR
            {/* <span className=" text-yellow-400">URL Shortener</span> */}
          </h1>
          <form onSubmit={submitHandler}>
            <div>
              <input
                className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3"
                type="text"
                placeholder="Enter link to be shortened"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />
              <button
                className=" bg-blue-500 text-white px-8 py-3 ml-4 rounded-md"
                // onClick={() => {
                //   fetchData();
                // }}
              >
                Submit URL
              </button>
              <div className=" mt-5">
                {shortenedLink}
                <CopyToClipboard text={shortenedLink}>
                  <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
                    Copy URL to Clipboard
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </form>
        </div>
        {/* hh */}
      </div>
      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          {/* <div className="sm:-mx-6 lg:-mx-8"> */}
          {/* <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8"> */}
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light ">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Clicked
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Long Url
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Short Url
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((val: any, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {/* {val.clicked} */}
                            {index}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {val.longUrl}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {val.shortUrl}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <CopyToClipboard text={val.shortUrl}>
                              <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
                                Copy URL to Clipboard
                              </button>
                            </CopyToClipboard>
                          </td>
                          {/* <td className="px-6 py-4">
                            <a
                              href="#"
                              className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                            >
                              Edit
                            </a>
                          </td> */}
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps() {
//   dbConnect();
//   const res = await URL.find().sort({ createdAt: "desc" });
//   // console.log(res);
//   return {
//     props: {
//       result: JSON.parse(JSON.stringify(res)),
//     },
//   };
// }
export async function getStaticProps() {
  dbConnect();
  const res = await URL.find().sort({ createdAt: "desc" });
  // console.log(res);
  return {
    props: {
      result: JSON.parse(JSON.stringify(res)),
    },
  };
}
