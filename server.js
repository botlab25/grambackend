require("dotenv").config();
const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

const accountSid = "AC1dae4c12842289f635f488f533070d33";
const authToken = "bc39892cd7e1705185558a57e2dfbfe9";
const twilioNumber = +12186585527;

const client = twilio(accountSid, authToken);

app.post("/send-otp", async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  const msgOption = {
    from: twilioNumber,
    to: phoneNumber,
    body: `Your OTP is: ${otp}`,
  };

  try {
    const message = await client.messages.create(msgOption);
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
