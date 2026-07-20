# Cloudee — AI Persona for LivingOS Sentinel

## Background

### Problem (As-Is)

เจ้าหน้าที่นิติฯ และบัญชีต้องจำและจัดการตารางงานซับซ้อนด้วยตัวเอง ทั้งรอบจดมิเตอร์ การออกใบแจ้งหนี้ และการตรวจสอบยอดโอนเงิน ส่งผลให้เกิด:

- **Human Error** — จดมิเตอร์ผิด คำนวณบิลคลาดเคลื่อน
- **Late Collection** — ออกบิลล่าช้า กระทบกระแสเงินสดโครงการ
- **Operational Stress** — ความเครียดจากงานซ้ำซ้อนและการร้องเรียนของลูกบ้าน

### Solution (To-Be)

**LivingOS Sentinel** — ระบบ notification อัจฉริยะที่มี AI persona "Cloudee" ทำหน้าที่เป็น Co-Pilot คอยช่วยให้เจ้าหน้าที่ทำงานได้ถูกต้อง ครบถ้วน และทันเวลา โดยไม่ต้องจำตารางงานเอง

---

## Cloudee — AI Persona

### ชื่อและบุคลิก

- **ชื่อ:** Cloudee
- **บทบาท:** เลขาฯ ส่วนตัวอัจฉริยะของเจ้าหน้าที่ รอบคอบ กระฉับกระเฉง แต่สุภาพ
- **Tone of Voice:** ภาษามนุษย์ ไม่ใช่ภาษาคอมพิวเตอร์ — แทนที่จะบอก "Error 404" ให้บอกว่า "Cloudee หาข้อมูลส่วนนี้ไม่เจอค่ะ"

### AI ทำอะไรใน Sentinel

Cloudee ไม่ได้เป็นแค่ชื่อบน notification copy แต่เป็น persona ที่ห่อหุ้ม AI logic ข้างหลังทั้งหมด ได้แก่:

1. **Tooltip Priority Engine** — ตัดสินใจว่าจะแสดง tooltip อะไรเมื่อมี notification pending หลายรายการพร้อมกัน โดยดู context ของ user ณ เวลานั้น ไม่ใช่ rule-based ตายตัว
2. **Anomaly Detection** — ขณะกรอกค่ามิเตอร์ เปรียบเทียบกับ historical data 6 เดือน แล้วตัดสินใจว่าค่านี้ผิดปกติพอที่จะเตือนหรือไม่
3. **Discrepancy Analysis** — เมื่อยอดโอนไม่ตรงกับบิล วิเคราะห์และ suggest สาเหตุ เช่น "น่าจะเป็นค่าธรรมเนียมธนาคาร" หรือ "ตรงกับยอดของเดือนก่อน"
4. **Behavioral Learning** — เรียนรู้พฤติกรรมของ user แต่ละคน เช่น มักจดมิเตอร์วันไหน เวลาไหน แล้วปรับเวลาเตือนให้ตรงกับนิสัยจริง ไม่ใช่แค่วันที่ที่ admin ตั้งไว้

---

## Solution Components

### 1. Notification Button

- Animated mascot (Cloudee) อยู่กลาง button
- มีหลาย state เพื่อสื่อสถานะและ trigger ให้ user สนใจก่อนกด
- มี tooltip แสดงข้อความสำคัญโดยไม่ต้องเปิด drawer

### 2. Notification Drawer

แบ่งเป็น 3 ส่วน:

| ส่วน | เนื้อหา |
|---|---|
| Top | Title / Mark all as read / Settings |
| Middle | Important cards — priority สูง ต้องการ action |
| Bottom | Notification list ทั้งหมด |

### 3. Notification Settings

ให้ user ควบคุมได้ว่าจะรับ notification topic ไหน เพื่อป้องกัน notification fatigue

### 4. Notification Topics

| # | Topic | ประเภท | แสดงใน |
|---|---|---|---|
| 1 | เตือนจดมิเตอร์ | Reminder | Tooltip + Drawer list |
| 2 | เตือนคำนวณใบแจ้งหนี้ | Reminder | Tooltip + Drawer list |
| 3 | คำนวณใบแจ้งหนี้เสร็จแล้ว | In-task (background completion) | Tooltip + Drawer list |
| 4 | เตือนตรวจสอบเงินโอน | In-task | Tooltip + Drawer list |
| 5 | พบการชำระเงิน — ลงทะเบียนได้เลย | In-task | Tooltip + Drawer list |

---

## Notification Types

### Reminder
แจ้งเตือนก่อนเริ่มงาน — user ยังไม่ได้เริ่มทำอะไร ระบบเตือนให้รู้ว่ามีงานต้องทำ

ต้องการ: push notification + deep link พาไปถึงหน้างานทันที

### In-task Notification
แจ้งเตือนระหว่างหรือหลัง task ที่ user เป็นคน trigger — ช่วยให้งานเสร็จถูกต้อง

ต้องการ: inline UI (toast, warning card, highlighted row) ไม่พา user ออกจากหน้าที่ทำอยู่

---

## Tooltip Priority Logic

Tooltip แสดงได้ครั้งละ **1 ข้อความ** จึงต้องมี priority ชัดเจนเมื่อมี notification pending หลายรายการพร้อมกัน

Cloudee จะแสดง topic ที่มี **impact ต่อ cash flow สูงที่สุด** ก่อนเสมอ:

| Priority | Topic | เหตุผล |
|---|---|---|
| 1 | เงินโอนรอตรวจสอบ | มีเงินเข้าแล้วแต่ยังไม่ match — กระทบรายรับโดยตรง |
| 2 | พบการชำระเงิน รอลงทะเบียน | ลูกบ้านจ่ายแล้วแต่ระบบยังไม่ปิดยอด |
| 3 | คำนวณใบแจ้งหนี้เสร็จแล้ว | งานที่ user trigger ไว้เสร็จแล้ว รอ review ก่อนส่ง |
| 4 | เตือนคำนวณใบแจ้งหนี้ | มิเตอร์ครบแล้ว รอ user กดเริ่ม |
| 5 | เตือนจดมิเตอร์ | งาน recurring ที่มี lead time มากที่สุด ไม่เร่งเท่ารายการบน |

**หลักการ:** tooltip แสดงเมื่อมี topic ที่ยังไม่ได้ดำเนินการอยู่ และหายไปเมื่องานนั้นเสร็จแล้ว ไม่ใช่เมื่ออ่านแล้ว

---

## UX Principles (จาก Research 2025–2026)

- **ส่งน้อย แต่ทุกอันมีค่า** — batch payment notifications รวมกัน ไม่เด้งทีละห้อง
- **Urgency ต้องจริง** — อย่าใช้ urgent tone กับ info ทั่วไป เพราะทำลาย trust ถาวร
- **Positive framing** — เน้นความคืบหน้า ไม่ใช่ความล้มเหลว เช่น "จด 185 ยูนิตแล้วค่ะ เหลืออีก 15" แทนที่จะบอกว่า "ยังค้าง 15 ยูนิต"
- **User control** — Settings ให้ user ปรับได้ว่าอยากรับ topic ไหน เพื่อไม่ให้รู้สึกสูญเสีย control
- **Behavior-triggered** — Cloudee เรียนนิสัยการทำงานของแต่ละ user แล้วเตือนตาม pattern จริง
