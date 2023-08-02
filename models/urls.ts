const { Schema, model, models } = require("mongoose");

const UrlSchemaNew = new Schema({
  longUrl: {
    type: String,
    // unique: true,
  },
  shortUrl:{
    type:String,
  },
  clicked: { type: Number, default: 0 },
});

const Urls = models.dummyurl || model("dummyurl", UrlSchemaNew);

export default Urls;
