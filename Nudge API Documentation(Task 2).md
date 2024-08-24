# Nudge API
#### Object Data Model of an event

``` sh
Type: Nudge,
_Id: MongoDB ObjectId,
event_tag: String,
title: String,
cover_image: File(image),
scheduled_time: Date-Time Srting (RFC3339 Format),
description: String,
icon: File(image),
invitation_line: String,
```
### Create a Nudge
- **Endpoint**: `POST /api/v1/nudges`

- **Description**: Allows the user to create a new nudge with specific details.

- **Payload**:  
```sh
{
  "title": "string",
  "cover_image": "image",
  "scheduled_time": "date-time srting",
  "description": "string",
  "icon": "image",
  "invitation_line": "string"
}
```
- **Response**: 
```sh
 {
  "success": true,
  "data": {
    "nudge_id": "string",        
    "created_at": "date-time srting",      
    "message": "Nudge created successfully"
  }
}
```
### Get Nudge Details
#### Get Specific Nudge
- **Endpoint**: `GET api/v1/nudges/:id`
- **Description**: Retrieves details of a specific nudge.

**Response**: 
```sh
{
  "_id": "string",
  "event_tag": "string",
  "title": "string",
  "cover_image": "image url",
  "scheduled_time": "date-time srting",
  "description": "string",
  "icon": "image url",
  "invitation_line": "string",
  "created_at": "date-time srting",
  "updated_at": "date-time srting"
}
```
#### Get All Nudge
- **Endpoint**: `GET api/v1/nudges/`
- **Description**: Retrieves all of a nudges.

**Response**: 
```sh
[
  {
      nudge: 1
  },
  {
      nudge: 2
  },
  .....
]
```
### Update a Nudge
- **Endpoint**: `PUT api/v1/nudges/:id`
- **Description**: Updates the details of an existing nudge.

- **Payload**:
```sh
{
  "title": "string",
  "cover_image": "image url",
  "scheduled_time": "date-time srting",
  "description": "string",
  "icon": "image url",
  "invitation_line": "string",
}
```
- **Response**: 
```sh
{
  "success": true,
  "message": "Nudge updated successfully"
}
```
### Delete a Nudge
- **Endpoint**: `DELETE api/v1/nudges/:id`
- **Description**: Deletes a specific nudge.

**Response**:
```sh
{
  "success": true,
  "message": "Nudge deleted successfully"
}
```
