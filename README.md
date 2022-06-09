# WEB server on docker

## Description
This project consist to build a simple node.js web server on docker and push it to AWS ECR. It uses DynamoDB as database.

### Chosen technologies
- Cloud: [AWS](https://aws.amazon.com)
- CI/CD : [Github Actions](https://docs.github.com/en/actions)
- Container : [Docker](https://docs.docker.com)
- Web server : [Node.js](https://nodejs.org/en/docs)

## Prerequisites
- to have an [AWS](https://portal.aws.amazon.com/billing/signup#/start/email) account
- to have a [Github](https://github.com/join) account

## Running manual

1. Create your own Github repository
2. Go to [AWS IAM console](https://us-east-1.console.aws.amazon.com/iamv2/home#/users). If you already ran the [Infrastructure](https://github.com/DonBogdan/infrastructure) repository, then you cat see `ecr-user` in your IAM users list. Click on it, go to `Security credentials` tab and click on `Create access key`:
    - Go to your Github repository, click on Settings -> Secrets -> Actions -> New repository secret and create 2 secrets
    - Name = `AWS_ACCESS_KEY_ID` | Value = `Access key ID` from precedent step  
      Name = `AWS_SECRET_ACCESS_KEY` | Value = `Secret access key` from precedent step
3. Clone this repository to yours and push the code to `main` branch, Github Actions will be automatically launched and will push your Docker image to the ECR.

## How to use
After that your container is up and running, go to your localhost or ALB URL. There is 3 endpoints:
- GET `/` : will show you a welcome message
- GET `cities` : will show you the list of cities
- POST `add` : allows you to add a new city to the list

You can add a new city by this command line or by Postman:
```
curl -X POST <YOUR_ALB_URL>/add \
   -H 'Content-Type: application/json' \
   -H 'Accept: application/json' \
   -d '{"name": "Paris"}'
```
> <YOUR_ALB_URL> must be something like `utk-alb-1527458695.eu-west-1.elb.amazonaws.com`
