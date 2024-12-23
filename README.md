# DAZN Coding Challenge

## The app was created using:
- Node.js
- Express
- Mongodb
- Render

## URL for the API
The deployed version can be accessed through this link:
https://dazn-coding-challenge-api.onrender.com 

## Building the local version:
- Pull the repo unto your machine.
- Open with a code editor.
- Install the dependencies using `npm install`.
- Run the server using `node app.js`.

## Using the api:
You can access the users and their information in the database by sending a request with Postman unto the local or deployed app url.

## Requests:

- GET `localhost:3000/users`
  Gets all the users in the database along with the number of current streams and id's.
  
- GET `localhost:3000/users/*ID OF USER*`
  Gets the user along with the number of his current streams from the database based on the id passed in the url after `/users`.
  
- POST `localhost:3000/users`
  Creates a new user using the template:
  ```js
  {
    "username": "*USERNAME FOR THE USER",
    "numberOfCurrentStreams": *NUMBER OF STREAMS FOR THE USER*
  }
  ```
  The value `numberOfCurrentStreams` can be omitted. When doing so it will default to 0.
  
- DELETE `localhost:3000/users/*ID OF USER*`
  Finds the user and deletes him from the database based on the id passed in the url after `/users`.
  
- PATCH `localhost:3000/users/*ID OF USER*`
  Updates the number fo current streams the user has, using the `updateNumberOfStreams`.

  Example:
  We can change the number of current streams down by 1 for the user `user_1` by sending a request to `localhost:3000/users/*ID OF USER_1*`:
  ```js
  {
    "updateNumberOfStreams": -1
  }
  ```

## Database:
For the database I decided on using Mongodb. Not only is it quite popular, it also has a great time with managing and sorting through large sets of data. I personally think this was a good choice, looking at the fact that it would be storing massive amouts of small pieces of data like usernames of the people accessing a site as well as their current streams which are a simple whole number.

## Scalability: 
Although the app doesn't throw around big amounts of data and the database I used is heavily skewed towards leveraging large amounts of small data, I think the app would have to be heavily optimised to receive and act upon large amounts of requests at the same time. And of course it would have to be deployed on a better service than Render.

## My experience:
Building an API was something I always wanted to try but never got the time to, so learning the ins and outs of API's was a very fun experience. This challenge broadened my knowledge of JavaScript as well. There were some very fun error's I had to solve and I really enjoyed coming up with a solution to this project.
