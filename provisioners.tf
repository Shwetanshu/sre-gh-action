
resource "null_resource" "kubernetes" {
  provisioner "local-exec" {
    command = "aws eks --region $(terraform output -raw region) update-kubeconfig --name $(terraform output -json cluster_name |awk {'print $14'}|cut -d '\\' -f 1|cut -d '_' -f 2)"
  }

  provisioner "local-exec" {
    command = "helm install crypto-nodeapp ./helm"
  }
  depends_on = [module.eks_example_basic]
}
