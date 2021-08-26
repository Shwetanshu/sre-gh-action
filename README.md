#Deploying helm Chart in Kubernetes Cluster

helm install crypto-nodeapp ./helm

# Terraform execution

terraform init -backend-config="key=bucket-shwetanshu/my_app_sre.tfstate" -backend-config="region=ap-south-1"
terraform plan -out plan.out
terraform apply plan.out

Note: Profile should be configured under default. EKS module is by default spinning cluster in us-west-2

Provisioners are kicked of in terraform provisioning , which is deploying helm chart in cluster. Pre-req is kubectl & helm3 must be installed in local-exec
