const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const csp = require("express-csp");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const viewsRouter = require("./routes/viewsRoutes");

const app = express();

// 1) GLOBAL MIDDLEWARE
// Set security HTTP headers
// npm i helmet
// app.use(helmet({ contentSecurityPolicy: false }));
// app.use(helmet());
// const scriptSrcUrls = [
//   "https://api.tiles.mapbox.com/",
//   "https://api.mapbox.com/",
//   "https://js.stripe.com/v3/",
// ];
// const styleSrcUrls = [
//   "https://api.mapbox.com/",
//   "https://api.tiles.mapbox.com/",
//   "https://fonts.googleapis.com/",
// ];
// const connectSrcUrls = [
//   "https://api.mapbox.com/",
//   "https://a.tiles.mapbox.com/",
//   "https://b.tiles.mapbox.com/",
//   "https://events.mapbox.com/",
//   "https://js.stripe.com/v3/",
// ];
// const fontSrcUrls = ["fonts.googleapis.com", "fonts.gstatic.com"];
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", "blob:"],
//       objectSrc: [],
//       imgSrc: ["'self'", "blob:", "data:"],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   })
// );

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body Parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution || what it does clear up the query string
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

//
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

// Serving Staic files
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Test middleware
app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

// Routes
app.use("/", viewsRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

// Error handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
