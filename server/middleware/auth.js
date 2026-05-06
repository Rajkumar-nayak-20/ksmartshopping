import jwt from "jsonwebtoken";

const auth = (request, response, next) => {
  try {
    let token = null;

    const authHeader = request.headers.authorization;// Get the Authorization header

    //  Check Header First
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    //  Then Check Cookie
    else if (request.cookies?.accessToken) {
      token = request.cookies.accessToken;
    }

    //Debug
    console.log("HEADER:", request.headers.authorization);
    console.log("COOKIE:", request.cookies);

    if (!token) {
      return response.status(401).json({
        message: "Access token required",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );

    request.userId = decoded.id;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    return response.status(401).json({
      message: "Invalid or expired token",
      error: true,
      success: false,
    });
  }
};

export default auth;