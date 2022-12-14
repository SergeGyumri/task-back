import createError from "http-errors";
import express from "express";
import path from "path";
import logger from "morgan";
import indexRouter from "./routes/index";
import headers from "./middlewares/headers";
import authorization from "./middlewares/authorization";

const app = express();

// view engine setup

app.use(headers)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authorization);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // render the error page
  // err.status || 500
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    stack: !err.status || err.status >= 500 ? err.stack : undefined,
    errors: err.errors
  });
});

export default app;
