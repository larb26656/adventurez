---
title: Docker
description: A cheatsheet of docker
---

## Docker Commands

### System info

```bash
# แสดงเวอร์ชันของ Docker
docker version

# แสดงข้อมูลระบบ Docker ทั้งหมด
docker info

# แสดงการใช้พื้นที่ของ Docker
docker system df

# ลบ container, image, network ที่ไม่ได้ใช้งาน
docker system prune
```

### Image

```bash
# ดึง image จาก Docker Hub
docker pull <image>

# สร้าง image จาก Dockerfile
docker build -t <name>:<tag> .

# แสดง image ทั้งหมด
docker images

# ลบ image
docker rmi <image_id>

# ตั้งชื่อ tag ใหม่ให้ image
docker tag <image> <new_name:tag>
```

### Container

```bash
# แสดง container ที่กำลังรัน
docker ps

# แสดง container ทั้งหมด
docker ps -a
# สร้างและรัน container
docker run -it --name <name> <image>

# เริ่ม container
docker start <container>

# หยุด container
docker stop <container>

# รีสตาร์ท container
docker restart <container>

# ลบ container
docker rm <container>

# ดู log ของ container
docker logs <container>

# เข้า shell ของ container
docker exec -it <container> bash
```

### Network & Volume

```bash
# แสดง network ทั้งหมด
docker network ls

# สร้าง network
docker network create <name>

# ลบ network
docker network rm <name>
```

## Docker Compose Commands

### พื้นฐาน

```bash
# รัน service ตาม docker-compose.yml
docker-compose up

# รัน service แบบ background
docker-compose up -d

# ปิดและลบ container, network ที่สร้างโดย compose
docker-compose down

# รีสตาร์ท service
docker-compose restart

# แสดง container ของ compose
docker-compose ps
```

> Docker Compose จะสร้าง network แยกสำหรับแต่ละ project โดยอัตโนมัติ

### จัดการ Service

```bash
# build image ตาม service
docker-compose build

# ดู log ของ service
docker-compose logs

# ดู log แบบ realtime
docker-compose logs -f

# หยุด service
docker-compose stop

# เริ่ม service
docker-compose start

# ลบ container ของ service
docker-compose rm
```

### ตัวเลือกเพิ่มเติม

```bash
# รันคำสั่งใน service
docker-compose run <service> <cmd>

# เข้า shell ของ service
docker-compose exec <service> bash

# ดึง image ของ service
docker-compose pull

# ตรวจสอบ config ของ compose
docker-compose config
```
