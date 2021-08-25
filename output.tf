
output "region" {
  description = "Endpoint for EKS control plane."
  value       = module.eks_example_basic.region
}

output "cluster_name"{
    description = "Getting Cluster Name"
    value = module.eks_example_basic.kubectl_config
}