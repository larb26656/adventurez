---
title: Kubernetes
description: A cheatsheet of kubectl commands
---

import ChatMessage from '../../../components/ChatMessage.astro';

ระบบจัดการ container orchestration ที่ช่วยให้จัดการ container หลายตัวใน cluster ได้อย่างมีประสิทธิภาพ รองรับการ scale, deploy, และ manage applications อัตโนมัติ

## Pod

Pod คือ smallest deployable unit ใน Kubernetes โดยแต่ละ Pod จะ contain หนึ่งหรือหลาย containers ที่ใช้ shared storage และ network

```bash
# แสดง pods ทั้งหมดใน namespace ปัจจุบัน
kubectl get pods

# แสดง pods พร้อม detail เพิ่มเติม
kubectl get pods -o wide

# แสดง pods ทั้งหมดในทุก namespace
kubectl get pods --all-namespaces

# ดูข้อมูล detail ของ pod
kubectl describe pod <pod-name>

# ดู logs ของ pod
kubectl logs <pod-name>

# ดู logs แบบ follow
kubectl logs -f <pod-name>

# exec เข้าไปใน container
kubectl exec -it <pod-name> -- /bin/sh

# ลบ pod
kubectl delete pod <pod-name>
```

<ChatMessage message="ถ้าต้องการ exec เข้า container ที่มีหลายตัว ให้ระบุ -c <container-name> ด้วย" avatarKey="blackCat" />

## Deployment

Deployment คือ abstraction layer ที่อยู่บน Pod ช่วยให้จัดการ scaling, rolling updates, และ rollback ได้ง่ายขึ้น

```bash
# แสดง deployments ทั้งหมด
kubectl get deployments

# ดูข้อมูล detail ของ deployment
kubectl describe deployment <deployment-name>

# สร้าง deployment จาก yaml file
kubectl apply -f <deployment.yaml>

# ดู rollout status
kubectl rollout status deployment/<deployment-name>

# rollback deployment กลับไป version ก่อนหน้า
kubectl rollout undo deployment/<deployment-name>

# ดู history ของ rollout
kubectl rollout history deployment/<deployment-name>
```

<ChatMessage message="Deployment เป็นตัวที่ทำให้ Pod มี self-healing อัตโนมัติ ถ้า Pod ตายมันจะสร้างใหม่ให้ทันที" avatarKey="blackCat" />

## Scaling

```bash
# scale deployment ไปที่จำนวน replicas ที่ต้องการ
kubectl scale deployment <deployment-name> --replicas=3

# scale แบบ horizontal pod autoscaler
kubectl autoscale deployment <deployment-name> --min=2 --max=10 --cpu-percent=80
```

## ReplicaSet

```bash
# แสดง replicasets ทั้งหมด
kubectl get replicasets

# ดูข้อมูล detail ของ replicaset
kubectl describe replicaset <replicaset-name>
```

## Services

Service คือ abstraction ที่ defines logical set of pods และ policy สำหรับเข้าถึง pods นั้นๆ

```bash
# แสดง services ทั้งหมด
kubectl get services
kubectl get svc

# ดูข้อมูล detail ของ service
kubectl describe service <service-name>

# สร้าง service แบบ LoadBalancer
kubectl expose deployment <deployment-name> --port=80 --type=LoadBalancer

# สร้าง service แบบ ClusterIP (internal)
kubectl expose deployment <deployment-name> --port=80 --type=ClusterIP

# สร้าง service แบบ NodePort
kubectl expose deployment <deployment-name> --port=80 --type=NodePort
```

<ChatMessage message="Service types มี 3 แบบ: ClusterIP (internal), NodePort (expose ผ่าน port ของ node), LoadBalancer (external cloud provider)" avatarKey="blackCat" />

### Port Forwarding

```bash
# forward port จาก local ไปยัง pod
kubectl port-forward pod/<pod-name> 8080:80

# forward port จาก local ไปยัง service
kubectl port-forward svc/<service-name> 8080:80
```

## ConfigMaps

ConfigMap ใช้เก็บ configuration ที่ไม่เป็น secret เช่น environment variables, command-line arguments, config files

```bash
# สร้าง configmap จาก literal
kubectl create configmap <configmap-name> --from-literal=key=value

# สร้าง configmap จาก file
kubectl create configmap <configmap-name> --from-file=<file-path>

# สร้าง configmap จาก env file
kubectl create configmap <configmap-name> --from-env-file=<env-file-path>

# ดู configmap
kubectl get configmaps
kubectl describe configmap <configmap-name>
```

<ChatMessage message="ConfigMap เหมาะสำหรับ config ที่ไม่ sensitive ถ้าเป็น secret ต้องใช้ Secret แทน" avatarKey="blackCat" />

## Secrets

Secret ใช้เก็บข้อมูลที่ sensitive เช่น passwords, tokens, keys

```bash
# สร้าง secret จาก literal
kubectl create secret generic <secret-name> --from-literal=key=value

# สร้าง secret จาก file
kubectl create secret generic <secret-name> --from-file=<file-path>

# สร้าง secret แบบ docker registry
kubectl create secret docker-registry <secret-name> --docker-server=<server> --docker-username=<user> --docker-password=<pass>

# ดู secrets
kubectl get secrets

# ดู secret value (base64 decode)
kubectl get secret <secret-name> -o jsonpath='{.data.key}' | base64 -d
```

<ChatMessage message="Secret ใน k8s ไม่ได้ encrypted โดย default! ต้อง enable encryption หรือใช้ external secrets manager อย่าง Vault" avatarKey="blackCat" />

## Namespaces

Namespace ช่วยให้แบ่ง cluster ออกเป็นหลาย virtual clusters

```bash
# แสดง namespaces ทั้งหมด
kubectl get namespaces
kubectl get ns

# สร้าง namespace
kubectl create namespace <namespace-name>

# เปลี่ยน namespace ปัจจุบัน
kubectl config set-context --current --namespace=<namespace-name>

# แสดง resources ใน namespace ที่ระบุ
kubectl get pods -n <namespace-name>
```

<ChatMessage message="ถ้าไม่ระบุ namespace คำสั่งจะใช้ namespace ปัจจุบัน (default) ตลอด" avatarKey="blackCat" />

## Ingress

```bash
# แสดง ingresses ทั้งหมด
kubectl get ingress

# ดู ingress detail
kubectl describe ingress <ingress-name>

# apply ingress from yaml
kubectl apply -f <ingress.yaml>
```

## Nodes

```bash
# แสดง nodes ทั้งหมด
kubectl get nodes

# ดูข้อมูล detail ของ node
kubectl describe node <node-name>

# แสดง node resource usage
kubectl top nodes
```

## Events

```bash
# แสดง events ทั้งหมด sort by time
kubectl get events --sort-by='.lastTimestamp'

# แสดง events ใน namespace ที่ระบุ
kubectl get events -n <namespace-name>

# แสดง events แบบ watch
kubectl get events --watch
```

<ChatMessage message="Events เป็นตัวช่วยสำคัญในการ troubleshoot ปัญหา เพราะมันจะบอกว่าเกิดอะไรใน cluster" avatarKey="blackCat" />

## Logging & Debugging

```bash
# แสดง pods ที่มีปัญหา
kubectl get pods | grep -v Running

# ดู logs ของ pod ที่มีหลาย containers
kubectl logs <pod-name> -c <container-name>

# ดู logs จาก previous container instance (ถ้า container restart แล้ว)
kubectl logs <pod-name> --previous

# describe pod ดูสาเหตุ
kubectl describe pod <pod-name>

# เข้าไปใน container เพื่อ debug
kubectl exec -it <pod-name> -c <container-name> -- /bin/sh

# ตรวจสอบ endpoint
kubectl get endpoints <service-name>
```

## Resources

```bash
# แสดง resources ทั้งหมดใน cluster
kubectl api-resources

# แสดง resources ที่มีใน namespace
kubectl api-resources --namespaced=true

# แสดง resources ที่ไม่มีใน namespace (cluster-wide)
kubectl api-resources --namespaced=false

# แสดง API version ของ resource
kubectl api-resources -o wide
```

## YAML Operations

```bash
# แสดง yaml ของ resource (ไม่ apply)
kubectl get pod <pod-name> -o yaml

# สร้าง resource จาก yaml
kubectl apply -f <file.yaml>

# สร้างหลาย resources จาก directory
kubectl apply -f <directory>/

# ลบ resource จาก yaml
kubectl delete -f <file.yaml>

# ดู difference ก่อน apply
kubectl diff -f <file.yaml>
```

## Context & Configuration

```bash
# แสดง contexts ทั้งหมด
kubectl config get-contexts

# เปลี่ยน context
kubectl config use-context <context-name>

# แสดง current context
kubectl config current-context

# แสดง clusters ทั้งหมด
kubectl config get-clusters

# ดู config ทั้งหมด
kubectl config view
```

## Common Options

```bash
# -n : ระบุ namespace
kubectl get pods -n <namespace>

# -o : กำหนด output format (yaml, json, wide)
kubectl get pods -o yaml
kubectl get pods -o json
kubectl get pods -o wide

# -l : filter ด้วย label
kubectl get pods -l app=myapp

# -f : ระบุ filename
kubectl apply -f deployment.yaml

# --dry-run : ทดสอบคำสั่งโดยไม่ apply
kubectl apply -f deployment.yaml --dry-run

# -w : watch mode
kubectl get pods -w
```

<ChatMessage message="kubectl มี shorthand หลายตัว เช่น: pods=po, services=svc, deployments=deploy, namespaces=ns" avatarKey="blackCat" />

## Cheat Sheet Quick Reference

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `kubectl get pods` | แสดง pods ทั้งหมด |
| `kubectl get svc` | แสดง services ทั้งหมด |
| `kubectl get ns` | แสดง namespaces ทั้งหมด |
| `kubectl get all` | แสดง resources หลักทั้งหมด |
| `kubectl apply -f` | apply yaml file |
| `kubectl delete -f` | delete จาก yaml file |
| `kubectl describe` | ดู detail ของ resource |
| `kubectl logs` | ดู logs ของ pod |
| `kubectl exec` | exec เข้า container |
| `kubectl port-forward` | forward port |
| `kubectl scale` | scale deployment |
| `kubectl rollout` | manage rollout |
| `kubectl top` | ดู resource usage |
| `kubectl config` | จัดการ kubeconfig |
| `kubectl api-resources` | แสดง resource types ทั้งหมด |