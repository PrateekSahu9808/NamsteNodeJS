# Dev Tinder API's

authRouter
-POST /signup
-POST/login
-POST/logout

profileRoute
-GET/profile/view
-PATCH / profile/edit
-PATCH/profile/password
connectionRequestTouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId
userRouter
-GET /user/connection
-GET /user/requests
-GET /user/feed
Status :ignore,interested,accepted,rejected
