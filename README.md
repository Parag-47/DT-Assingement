<<<<<<< HEAD
# DT-Assignment
**Note:** This project uses cloudinary to stored uploaded images so you'll need to sign-up (it's free) on cloudniary and enter the API key and secret into an .env file.

## Installation

**Step 1:** One a Terminal in the root directory and run command npm i to install all the dependencies.

**Step 2:** Use the .env-sample file to recreate the environment variables like `MongoDB` connection string and more importantly `Cloudinary` Configuration variables

**Step 3:** Then run npm start to start the server.

**Optionally:** You can also import the `DT Assignment.postman_collection.json` into your postman app to get all the endpoints with their payloads and responses.

## Usage

**There are 5 EndPoints**
- `GET	/api/v3/app/events?id=event_id` : Gets an event by its unique id.	

- `GET	/api/v3/app/events?type=latest&limit=5&page=1` : Gets an event by its recency & paginate results by page number and limit of events per page

- `POST	/api/v3/app/events` : Creates an event and returns the Id of the created event `Payload` : name, images(file), tagline, schedule, description, moderator, category, sub_category, rigor_rank, attendees

- `PUT	/api/v3/app/events/:id` :  Updates the details of an existing event `Payload` : Same as the POST payload.

- `DELETE	/api/v3/app/events/:id` : Deletes a specific event
=======
# DT-Assingement
**Note:** This project uses cloudinary to stored uploaded images so you'll need to sign-up (it's free) on cloudniary and enter the API key and secret into an .env file.

## Installation

**Step 1:** One a Terminal in the root directory and run command npm i to install all the dependencies.

**Step 2:** Use the .env-sample file to recreate the environment variables like `MongoDB` connection string and more importantly `Cloudinary` Configuration variables

**Step 3:** Then run npm start to start the server.

**Optionally:** You can also import the `DT Assingement.postman_collection.json` into your postman app to get all the endpoints with their payloads and responses.

## Usage

**There are 5 EndPoints**
- `GET	/api/v3/app/events?id=event_id` : Gets an event by its unique id.	

- `GET	/api/v3/app/events?type=latest&limit=5&page=1` : Gets an event by its recency & paginate results by page number and limit of events per page

- `POST	/api/v3/app/events` : Creates an event and returns the Id of the created event `Payload` : name, images(file), tagline, schedule, description, moderator, category, sub_category, rigor_rank

- `PUT	/api/v3/app/events/:id` :  Updates the details of an existing event `Payload` : Same as the POST payload.

- `DELETE	/api/v3/app/events/:id` : Deletes a specific event
>>>>>>> 8511e14165228936264690d512c59b9ccfd84cf8
