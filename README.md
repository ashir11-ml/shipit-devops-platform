# ShipIt: 3-Tier Application on AWS EKS

A 3-tier application (React, Node.js, PostgreSQL) deployed on AWS EKS with
Terraform, Docker, Kubernetes and GitHub Actions.

> Status: in progress

## Planned stack
- **Cloud:** AWS (VPC, EKS, RDS, ECR, ALB)
- **IaC:** Terraform (S3 remote state with native locking)
- **Containers:** Docker, Kubernetes
- **CI/CD:** GitHub Actions (OIDC)
- **Automation:** Bash scripts
- **Monitoring:** Prometheus, Grafana

## Repository layout
| Folder | Purpose |
|---|---|
| `app/` | Frontend, backend and local docker-compose |
| `k8s/` | Kubernetes manifests (base + dev/prod overlays) |
| `terraform/` | Bootstrap, reusable modules and environments |
| `scripts/` | Bootstrap, deploy and cleanup scripts |
| `.github/workflows/` | CI/CD pipelines |
| `docs/` | Architecture diagram and notes |
