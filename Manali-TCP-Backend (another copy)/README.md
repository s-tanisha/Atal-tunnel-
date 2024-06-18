# This application is the backend server for the Grant Management Webapp


## Installation

#### Clone this repo using:
```bash
  git clone https://github.com/antiers-solutions/gmw-backend.git
```
```bash
  cd gmw-backend/
```
#### Running project in development mode using docker compose:
- Note: docker and docker compose must be installed in your local system before running this software using docker 
```bash
  docker-compose up -d
```
**You can start all the required backend services using docker by using the docker-compose file in the repo. Otherwise, this can also be done manually by following the steps mentioned below.** 
#### Install the dependencies with npm:
- Configure the env.example file with the right environment variable values as:
```bash
  /src/config/local.env
``` 

- Recommended node version: v16
```bash
  npm i 
```

#### Running project using npm:

- First, setup mongoDB in your local system using the [mongoDB installation guide](https://www.mongodb.com/docs/manual/installation/) (Recommended mongo version: v3.6.8)
- Second, install Redis using the [redis setup guide](https://redis.io/docs/getting-started/) (Recommended redis version: v4.6.7)
After successfully setting up and running the required services:

```bash
  npm start 
```
- While setting up the repo for the first time, the services will automatically start to load data into local database after you run the `npm start` command. It will take around 30-45 minutes for the data to get processed.
- Upon a successfull data dump, the application will print a log with message "Data Successfully Stored".

## Testing Guide
#### Run unit tests:
```bash
  npm run test 
```
#### Run test cases for APIs:
```bash
  npm run test:api
```
#### For unit test coverage:
```bash
  npm run test:coverage
```
#### For test case coverage for APIs:
```bash
  npm run test:api:coverage
```

## API Reference

#### api/graphs is an open API and does not require logging in. This is done so because api/graphs is a GET API that returns data required for the landing page. Rest all the API have access control implemented into them.
### This file contains documentation for the following API endpoints
- api/project
- api/team
- api/graph
- api/dynamic-cards
- api/user
- api/milestone

### api/project
get data for projects

#### 1. Get all projects

```
  GET /project/get-all
```

#### Request qureyParams
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `pageLimit` | `number` | number of projects to be displayed on one page |
| `pageNo` | `number` | Index of current page |

#### Response 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Id of of the project |
| `start_date`      | `date` | date when the project was started (application was accepted) |
| `project_name`      | `string` | name of project |
| `status`      | `string` | status of projects |
| `total_cost`      | `{ amount: string; currency: string }` | billing information of the project as a whole (amount and denom) |
| `total_duration`      | `string` | estimated time for the project to be completed |
| `team_id`      | `string` | Id of of the team working on this project |
| `level`      | `string` | level of project |
| `milestones`      | `string` | ndex of the current milestones in the project |
| `totalMilestones`      | `string` | total number of milestones in this project |
| `totalCount`      | `string` | length of the array of data |

#### 2. Get project by id

```
  GET project/get-by-id/:projectId
```
#### Request Params
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `projectId`      | `string` | **Required**. id of the project to be searched |

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | id of of the project |
| `user_github_id`     | `string` | id of the user who first submitted the application for a grant |
| `file_name`      | `string` | name of the project MD file (from the github repo) |
| `start_date`      | `date` | date when the project was started (application was accepted) |
| `payment_details`      | `string` | payment address of the team mentioned in the project MD file |
| `md_content`      | `string` | content of the project MD file |
| `md_link`      | `string` | link used to download the RAW MD file contents from github |
| `html_url`      | `string` | this link will redirect the user to the page on github that displays all the contents of the MD file |
| `project_name`      | `string` | name of project |
| `status`      | `string` | status of projects |
| `total_cost`      | `{ amount: string; currency: string }` | billing information of the project as a whole (amount and denom) |
| `total_duration`      | `string` | estimated time for the project to be completed |
| `team_id`      | `string` | Id of of the team working on this project |
| `level`      | `string` | level of project |
| `legal_structure`      | `{ registered_address: string, registered_legal_entity: string }` | the address and legal entity of the team working on this project |
| `milestones`      | `string` | ndex of the current milestones in the project |
| `totalMilestones`      | `string` | total number of milestones in this project |



#### 3.  Get groject by name

```
  GET project/get-by-name
```
#### Request queryParams
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `searchedName` | `string` | **Required**. Name of the project |

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | id of of the project |
| `start_date`      | `date` | date when the project was started (application was accepted) |
| `payment_details`      | `string` | payment address of the team mentioned in the project MD file |
| `html_url`      | `string` | this link will redirect the user to the page on github that displays all the contents of the MD file |
| `project_name`      | `string` | name of project |
| `status`      | `string` | status of projects |
| `total_cost`      | `{ amount: string; currency: string }` | billing information of the project as a whole (amount and denom) |
| `total_duration`      | `string` | estimated time for the project to be completed |
| `team_id`      | `string` | Id of of the team working on this project |
| `level`      | `string` | level of project |
| `milestones`      | `string` | ndex of the current milestones in the project |
| `totalMilestones`      | `string` | total number of milestones in this project |
| `file_name`      | `string` | name of the MD file of the project |

#### 4. Get filtered data for projects by their level/status

```
  GET /api/items/${id}
```

#### Request queryParams 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pageLimit`      | `number` | number of projects to be displayed on one page |
| `pageNo`      | `number` | index of the current page |
| `level`      | `string` | level criteria for filtering projects |
| `status`      | `string` | status critera for filtering projects |

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | id of of the project |
| `start_date`      | `date` | date when the project was started (application was accepted) |
| `project_name`      | `string` | name of project |
| `status`      | `string` | status of projects |
| `total_cost`      | `{ amount: string; currency: string }` | billing information of the project as a whole (amount and denom) |
| `total_duration`      | `string` | estimated time for the project to be completed |
| `team_id`      | `string` | Id of of the team working on this project |
| `level`      | `string` | level of project |
| `milestones`      | `string` | ndex of the current milestones in the project |
| `totalMilestones`      | `string` | total number of milestones in this project |

#### 5. Update a project's status

```
  PUT project/update-status
```
#### Request Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `updatedStatus`      | `string` | **Required**. the new status of the project |
| `id`      | `string` | **Required**. the id of the project |

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `status`      | `string` | "success" is returned |

### api/teams
Get data for teams

#### 1. Get list of all teams

```
  GET teams/get-all
```
#### Request Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pageLimit` | `number` | number of projects to be displayed on one page |
| `pageNo` | `number` | Index of current page |

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `totalCount`      | `number` | total number of teams |
| `id`      | `string` | id of team |
| `name`      | `string` | name of team |
| `projects`      | `[{ projectId : string, status : string }]` | array containing all the projectIds and their respective status for this team |

#### 2. Get data of a team by it's id

```
  GET teams/get-by-id/:teamId
```
#### Request Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `teamId` | `string` | id of the team to be searched |

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `team data` |  |  |
| `id`      | `string` | id of team |
| `name`      | `string` | name of team |
| `projects`      | `[{ projectId : string, status : string }]` | array containing all the projectIds and their respective status for this team |
| `project data` |  |  |
| `id`      | `string` | id of of the project |
| `start_date`      | `date` | date when the project was started (application was accepted) |
| `project_name`      | `string` | name of project |
| `status`      | `string` | status of projects |
| `total_cost`      | `{ amount: string; currency: string }` | billing information of the project as a whole (amount and denom) |
| `total_duration`      | `string` | estimated time for the project to be completed |
| `team_id`      | `string` | Id of of the team working on this project |
| `level`      | `string` | level of project |
| `milestones`      | `string` | ndex of the current milestones in the project |
| `totalMilestones`      | `string` | total number of milestones in this project |

#### 3. Get data of teams by it's name

```
  GET teams/search-by-name
```
#### Request Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `searchedName` | `string` | number of team to be searched |

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `totalCount`      | `number` | total number of teams |
| `id`      | `string` | id of team |
| `name`      | `string` | name of team |
| `projects`      | `[{ projectId : string, status : string }]` | array containing all the projectIds and their respective status for this team |

#### 4. Merge data of selected teams under one name

```
  PUT team/merge-team
```
#### Request Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `updatedName` | `string` | new name of the selected teams |
| `teamIds` | `[string]` | array of team ids to be merged |

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `newTeamId`      | `string` | id of the new team |

### api/user

#### 1. Sign in to github and for login session and security using user-agent

```
  POST user/signup
```

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | name of the github user who logged in |
| `gitId`      | `string` | username of the github user who logged in |
| `image_url`      | `string` | url to the profile picture of the github user who logged in |

#### 2. Log out user out of session

```
  DELETE user/logout
```
#### Request Cookies Param
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | name of the github user who logged in |


#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `data`      | `null` | "null" is returned upon successful logout |

### api/dynamic-cards

#### 1. Get data for cards on front-end

```
  GET /dynamic-cards
```

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `totalProposals`      | `number` | all applications in the grants program |
| `totalProjects`      | `number` | all applications that were accepted |
| `totalRejectedProposals`      | `number` | all applications that were rejected |
| `totalCompletedProjects`      | `number` | all projects that were completed |

### api/graphs

#### 1. Get number of projects per each status

```
  GET graph/get-projects-count-by-status
```

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `active`      | `number` | count of projects that have the status “active” |
| `hold`      | `number` | count of projects that have the status “hold” |
| `complete`      | `number` | count of projects that have the status “complete” |

#### 2. Get number of projects per each level

```
  GET graph/get-projects-count-by-level
```

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `level1`      | `number` | count of projects at level1 |
| `level2`      | `number` | count of projects at level2 |
| `level3`      | `number` | count of projects at level3 |

#### 3. Get number of applications accepted/rejected (month-wise)

```
  GET graph/get-rejected-accepted-projects-year
```

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `string` | name of month |
| `accepted`      | `number` | count of accepted applications |
| `rejected`      | `number` | count of rejected applications |

### api/milestone

#### 1. Get the milestone data for project ID

```
  GET graph/get-projects-count-by-status
```

#### Request Params
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `projectId`      | `string` | ID of project |

#### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | ID of milestone |
| `file_name`      | `string` | Name of the delivery MD file |
| `project_id`      | `string` | ID of project |
| `project_md_link`      | `string` | link to the project MD file |
| `status`      | `string` | current status of project |
| `cost`      | `string` | cost of the project |
| `milestoneNo`      | `number` | Number of current milestone |
| `merged_at`      | `string` | Date when this milestone was merged |

### Webhook API integration
This API will listen to the events triggered by github
```
  POST /github/save-pull-merge-data
```