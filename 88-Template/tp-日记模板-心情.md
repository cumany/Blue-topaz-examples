---
UID: <% tp.date.now("YYYYMMDDHHmm")%> 
alias:
banner: "<% tp.user.getrandomImage("99-Attachment/banner")%>"
Banner style: Solid
banner_icon:  <% tp.system.suggester(["ๅผๅฟ๐", "ไฝ่ฝ๐", "็ฒๆซ๐ช","็ฝ๐","ๅนณ้๐ถ"], ["๐", "๐", "๐ช", "๐", "๐ถ"],false,'ไปๅคฉๅฟๆๅฆไฝ๏ผ') %>
cssclass: mynote,noyaml
---
> [!blank] 
> [timeline{{date:DDD}}::timeline]
```ad-flex
(Weather::<% tp.user.getweather("") %>)
> [!infobox|noicon]- ๐ ๅฝๅคฉๅๅปบ็ๆไปถ
> ```dataviewjs 
const filename=dv.current().file.name;
dv.list(dv.pages().where(p => p.file.cday.toISODate() === filename).sort(p => p.file.ctime, 'desc').file.link) 
>```
```
## โ้็ฌๆๆ

