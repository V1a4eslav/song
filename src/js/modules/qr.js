export function qr() {
   const link = 'https://github.com/V1a4eslav/';

   let typeNumber = 3;
   let errorLevel = 'L';
   let qrDiv = document.querySelector('[data-qr]');
   if (!qrDiv) return;

   let qr1 = qrcode(typeNumber, errorLevel);

   qr1.addData(link);
   qr1.make();
   qrDiv.innerHTML = qr1.createImgTag(6, 10);
}
