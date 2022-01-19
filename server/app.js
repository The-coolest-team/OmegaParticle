require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
// JOHN ADDED THIS
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
module.exports = app;

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

// ADDED BY JOHN
app.post("/create-checkout-session", async (req, res) => {
  // res.json({ url: "HI" });
  try {
    const session = await stripe.checkout.sessions.create({
      // Information for all the items we're purchasing goes into this function
      payment_method_types: ["card"],
      mode: "payment", // One time payment
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/failure.html`,
    });
    console.log(session);
    res.json({ url: session.url }); // Returns the URL from our session
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
