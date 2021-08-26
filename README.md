# OVERVIEW

This source code is written to perform some basic API calls and implementing the same with Github Action.

## Code Overview

Implemented Nodejs to call remote API and performed testing using chaijs & mochajs to call API and expect/assert values that returns.

## Github Action

There are two environments created in github action :
1. DEV - Performing docker build and push to docker repository. Slack notification to channel after completing docker push to docker hub.
   
2. TEST - Running test script to check the return value and types

## Terraform scripts

Terraform script is written to create EKS cluster. It executes provisioners at end of EKS cluster creation that change the context to deployed EKS and running helm chart to provision deployment & services from a container created in above github action.
Deployment create with the name ```crypto-nodeapp```

For terraform execution : 

```bash
terraform init -backend-config="key=bucket-shwetanshu/my_app_sre.tfstate" -backend-config="region=ap-south-1"
terraform plan -out plan.out
terraform apply plan.out
```

Note: AWS profile should be configured under default. EKS module is by default spinning cluster in us-west-2

Pre-req is kubectl & helm3 must be installed locally where terraform is executing.

### Deploying Helm chart individually

If need to deploy helm chart seprately, it can be executed by following command:

```bash
helm install crypto-nodeapp ./helm
```

Testing Api calls from deployed helm chart, spin up a test pod and make call with: 

Spinning test container in default namespace
```
kubectl run -it --rm  --image=centos testapp -- /bin/bash
```

Testing with curl command inside test pod shell :

```
curl localhost:4000/health
curl localhost:4000/USD
```
