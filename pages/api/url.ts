// import Urls from "../../models/urls";
import Urls from "@/models/urls";
import dbConnect from "../../utils/connectMongo";

export default async function handler(req: any, res: any) {
  // get data
  // if (req.method == "GET") {
  //   dbConnect();
  //   const user = await Urls.find();
  //   res.status(200).json({abc: "aaaa",user} );
  // }

  if (req.method == "POST") {
    dbConnect();
    const { longUrl, shorturl } = req.body;
    console.log("aab", req.body);
    // console.log("aacc",longUrl,shorturl);
    const user = await Urls.create(req.body);
    // console.log("enterd",user);
    res.status(200).json({ user, message: "donee succfully" });
  }
  // res.status(200).json({abc: "aaaa"} );
}
