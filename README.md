#Deploying helm Chart in Kubernetes Cluster

helm install crypto-nodeapp ./helm

# Terraform execution

terraform init {s3_bucket_config}
terraform plan -out plan.out
terraform apply plan.out

Note: Profile should be configured under default. EKS module is by default spinning cluster in us-west-2

Provisioners are kicked of in terraform provisioning , which is deploying helm chart in cluster. Pre-req is kubectl & helm3 must be installed in local-exec
