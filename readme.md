# cafe-reservation

Contoh sederhana aplikasi Node JS

## Kebutuhan Sistem
- Node JS 8.8.1+
- MySql

## Cara Setup di Local
- Buat database bernama `cafe-reservation` di MySQL
- Import file `cafe-reservation.sql` ke database tersebut
- Pada file `./src/database.js` ubah kode ini sesuai user dan password MySQL di local
```javascript
var sequelize = new Sequelize('cafe-reservation', 'your_user', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

```
- Install dependencies `npm install`
- Jalankan aplikasi `npm run dev`
- Coba kunjungi `http://localhost:3000`