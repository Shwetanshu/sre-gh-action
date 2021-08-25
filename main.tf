terraform {
  required_version = ">= 0.13.1"
  backend "s3" {
    bucket = "bucket-shwetanshu"
  }
}

provider "aws" {
  version = ">= 3.22.0"
  region  = var.region
  profile = "default"
}

provider "random" {
  version = "~> 2.1"
}

provider "local" {
  version = "~> 1.4"
}

provider "null" {
  version = "~> 2.1"
}

provider "template" {
  version = "~> 2.1"
}

# Creating EKS cluster
module "eks_example_basic" {
  source  = "terraform-aws-modules/eks/aws//examples/basic"
  version = "17.1.0"
}

