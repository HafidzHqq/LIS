# Product Requirements Document (PRD)

## 1. Ringkasan Produk

### Nama Produk

**LIMY (Laboratory Information Management System)**

### Visi

Membangun platform manajemen laboratorium modern yang membantu laboratorium klinik, kampus, penelitian, dan industri dalam mengelola sampel, pengujian, inventaris, kualitas, pelaporan, dan operasional laboratorium secara terpusat.

### Misi

Menghilangkan pencatatan manual, mengurangi kesalahan manusia, meningkatkan efisiensi operasional, dan menyediakan data laboratorium yang akurat secara real-time.

---

# 2. Masalah yang Diselesaikan

### Sebelum LIMY

* Data sampel dicatat di Excel.
* Sulit melacak status sampel.
* Hasil pemeriksaan terlambat.
* Inventaris reagen tidak terkontrol.
* Tidak ada audit trail.
* Sulit membuat laporan.
* Sulit mengetahui produktivitas laboratorium.

### Setelah LIMY

* Semua data tersimpan terpusat.
* Tracking sampel real-time.
* Dashboard operasional.
* Notifikasi otomatis.
* Audit log lengkap.
* Laporan instan.
* Monitoring kualitas laboratorium.

---

# 3. Target Pengguna

## Internal

### Administrator

Mengelola seluruh sistem.

### Manajer Laboratorium

Melihat kinerja laboratorium.

### Analis Laboratorium

Melakukan pengujian sampel.

### Petugas Registrasi

Mendaftarkan sampel.

### Quality Control Officer

Mengelola kontrol kualitas.

### Teknisi Laboratorium

Mengelola alat laboratorium.

---

## Eksternal

### Klien

Melihat hasil pengujian.

### Peneliti

Mengakses data penelitian.

### Institusi

Melihat laporan laboratorium.

---

# 4. Platform

## Mobile

* Android
* iPhone

## Web

* Desktop
* Tablet
* Mobile Browser

---

# 5. User Roles

## Super Admin

Akses penuh.

## Admin Lab

Mengelola operasional laboratorium.

## Analis

Input hasil pengujian.

## QC Officer

Validasi kualitas.

## Teknisi

Maintenance alat.

## Customer

Melihat hasil.

---

# 6. Modul Utama

## Modul 1 — Authentication

### Fitur

* Login
* Logout
* Register
* Reset Password
* OTP Email
* OTP WhatsApp
* MFA / Two Factor Authentication
* Session Management
* Device Management
* Login History
* Single Sign-On

---

# Modul 2 — User Management

### Fitur

* CRUD User
* Role Management
* Permission Management
* Department Management
* Shift Management
* Employee Management

---

# Modul 3 — Sample Management

### Fungsi

Pusat seluruh proses laboratorium.

### Data Sampel

* Sample ID
* Barcode
* QR Code
* Nama Sampel
* Kategori
* Jenis Sampel
* Lokasi Pengambilan
* Pengirim
* Tanggal Ambil
* Status

### Status Sampel

* Registered
* Received
* Processing
* Testing
* QC Review
* Approved
* Rejected
* Archived

### Fitur

* Registrasi sampel
* Tracking sampel
* Cetak barcode
* Cetak QR
* Riwayat pergerakan sampel
* Chain of Custody

---

# Modul 4 — Test Management

### Fitur

* Test Template
* Test Package
* Parameter Test
* Test Workflow
* Test Assignment
* Test Result Entry
* Result Verification
* Result Approval

### Contoh

Pemeriksaan Air:

* pH
* TDS
* Nitrat
* Bakteri

---

# Modul 5 — Laboratory Workflow

### Workflow Builder

Drag & Drop Workflow.

Contoh:

Registrasi
↓
Penerimaan
↓
Preparasi
↓
Analisis
↓
QC
↓
Approval
↓
Report

---

# Modul 6 — Result Management

### Fitur

* Input hasil
* Upload file
* Upload PDF
* Upload foto mikroskop
* Grafik hasil
* Approval berjenjang

---

# Modul 7 — Report Generator

### Jenis Laporan

* Harian
* Mingguan
* Bulanan
* Tahunan

### Export

* PDF
* Excel
* CSV

---

# Modul 8 — Inventory Management

### Kelola

* Reagen
* Bahan Kimia
* Alat
* Consumable

### Fitur

* Stok Masuk
* Stok Keluar
* Minimum Stock Alert
* Expired Alert
* Batch Tracking

---

# Modul 9 — Procurement

### Fitur

* Supplier
* Purchase Order
* Approval
* Receiving Goods
* Invoice

---

# Modul 10 — Equipment Management

### Fitur

* Data Alat
* Jadwal Kalibrasi
* Jadwal Maintenance
* Riwayat Kerusakan
* Sparepart

### Notifikasi

* Maintenance Due
* Calibration Due

---

# Modul 11 — Quality Control

### Fitur

* QC Samples
* QC Result
* QC Trend
* QC Monitoring

### Dashboard

* Pass Rate
* Failure Rate
* Error Analysis

---

# Modul 12 — Audit Trail

### Catat

* Login
* Edit Data
* Hapus Data
* Approval

### Data

* User
* Timestamp
* Device
* IP Address

---

# Modul 13 — Dashboard

## Dashboard Admin

### Widget

* Total Sampel
* Sampel Hari Ini
* Sampel Diproses
* Sampel Selesai
* Revenue
* QC Status

---

## Dashboard Analis

### Widget

* Assigned Test
* Pending Test
* Completed Test

---

## Dashboard Manager

### Widget

* Productivity
* Revenue
* Equipment Status
* QC Performance

---

# Modul 14 — Notification Center

### Channel

* Email
* WhatsApp
* Push Notification
* In-App Notification

### Event

* Sampel baru
* Hasil selesai
* Stok habis
* Maintenance alat

---

# Modul 15 — Customer Portal

### Fitur

* Login Klien
* Tracking Sampel
* Download Hasil
* Riwayat Pengujian

---

# Modul 16 — Document Management

### Fitur

* SOP
* Sertifikat
* Dokumen QC
* Manual Alat

---

# Modul 17 — AI Assistant

### Fitur

* Ringkasan hasil
* Deteksi anomali
* Prediksi kegagalan alat
* Rekomendasi stok
* Chatbot laboratorium

---

# Modul 18 — Business Intelligence

### Analitik

* Revenue
* Turnaround Time
* Sample Trend
* Popular Tests
* Staff Productivity

---

# Modul 19 — Multi Branch

### Fitur

* Cabang Laboratorium
* Sinkronisasi Data
* Dashboard Pusat

---

# Modul 20 — API & Integrasi

### Integrasi

* SIMRS
* ERP
* Google Drive
* Email SMTP
* WhatsApp API

---

# 7. Non Functional Requirements

## Performance

* Response < 2 detik
* 10.000+ sampel per hari

## Security

* JWT
* OAuth
* MFA
* RBAC
* Encryption

## Availability

* Uptime 99.9%

## Backup

* Backup otomatis harian

---

# 8. Teknologi

## Frontend

* Flutter

## Backend

* NestJS

## Database

* PostgreSQL

## Cache

* Redis

## Storage

* S3 Compatible Storage

## Container

* Docker

## Reverse Proxy

* Nginx

---

# 9. Roadmap

## V1 MVP

* Auth
* User Management
* Sample Management
* Test Management
* Result Management
* Dashboard

## V2

* Inventory
* Equipment
* Notification
* Report

## V3

* Customer Portal
* Multi Branch
* Audit Trail

## V4

* AI Assistant
* Business Intelligence
* Advanced Analytics

---

# 10. Future Enterprise Features

* Offline Mode
* Blockchain Audit
* AI Predictive Analytics
* IoT Laboratory Devices
* OCR Dokumen
* Voice Input
* Digital Signature
* Face Recognition
* Smart Scheduling
* Auto Report Generation
* Data Warehouse
* Data Lake Integration

## Target Akhir

LIMY menjadi platform laboratorium modern yang dapat digunakan oleh:

* Rumah Sakit
* Klinik
* Kampus
* Balai Penelitian
* Laboratorium Lingkungan
* Laboratorium Industri
* Farmasi
* Food Testing Laboratory
* Laboratorium Pemerintah
