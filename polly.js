const { Polly } = require("aws-sdk"),
  Stream = require("stream"),
  fs = require("fs");
const polly = new Polly({
  signatureVersion: "v4",
  region: "sa-east-1",
});

module.exports = polly;
