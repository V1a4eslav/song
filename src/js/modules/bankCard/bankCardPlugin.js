export class CardBank {
   constructor(selector, options) {
      let defaultOptions = {
         isChanged: () => { }
      }
      this.options = Object.assign(defaultOptions, options);
      this.selector = selector;
      this.$card = document.querySelector(`[data-card=${selector}]`);
      if (this.$card) {
         this.$cardFront = this.$card.querySelector('[data-card="front"]');
         this.$cardBack = this.$card.querySelector('[data-card="back"]');
         this.$cvvInput = this.$cardBack.querySelector('[data-card="cardBackCvv"]');
         this.$inputNumber = this.$card.querySelector('#card-number');
         this.$inputMonth = this.$card.querySelector('#card-month');
         this.$inputYear = this.$card.querySelector('#card-year');
         this.$logoWrapper = this.$card.querySelector('[data-card="logo"]');
         this.$logoImg = this.$logoWrapper.querySelector('[data-card="defaultLogoImg"]');
         this.$payBrandWrapper = this.$card.querySelector('[data-card="payBrand"]');
         this.$payImg = this.$payBrandWrapper.querySelector('[data-card="defaultPayImg"]');
         this.$cardReqField = this.$card.querySelectorAll('[data-ccard="req"]');


         this.defaultCard = {};
         this.banksDB = [
            {
               'ua-mono': {
                  'nameRu': 'Монобанк',
                  'nameEn': 'Monobank',
                  'lastNameRu': 'Юниверсал банк',
                  'lastNameEn': 'Universal bank',
                  'backgroundPath': '',
                  'backgroundColor': '#000000',
                  'text': [
                     '#1B1B1B',
                     '#F6F6F6',
                  ],
                  'logoPath': './img/source/logoCard/ua-mono.png',
               }
            },
            {
               'ua-privat': {
                  'nameRu': 'Приватбанк',
                  'nameEn': 'Privatbank',
                  'lastNameRu': '',
                  'lastNameEn': '',
                  'backgroundPath': './img/source/backgroundCard/ua-privat.png',
                  'backgroundColor': '#1B1B1B',
                  'text': [
                     '#F6F6F6',
                  ],
                  'logoPath': './img/source/logoCard/ua-privat.png',
               }
            },
            {
               'ua-alfa': {
                  'nameRu': 'Альфабанк',
                  'nameEn': 'Alfabank',
                  'lastNameRu': '',
                  'lastNameEn': '',
                  'backgroundPath': './img/source/backgroundCard/ua-alfa.jpg',
                  'backgroundColor': '#EE3124',
                  'text': [
                     '#F6F6F6',
                  ],
                  'logoPath': './img/source/logoCard/alfa-bank.png',
               }
            },
            {
               'ua-abank': {
                  'nameRu': 'А-Банк',
                  'nameEn': 'A-Bank',
                  'lastNameRu': '',
                  'lastNameEn': '',
                  'backgroundPath': './img/source/backgroundCard/ua-abank.jpg',
                  'backgroundColor': '#EE3124',
                  'text': [
                     '#F6F6F6',
                  ],
                  'logoPath': './img/source/logoCard/a-bank.svg',
               }
            }
         ];
         this.brandsDB = [
            {
               alias: 'visa',
               name: 'Visa',
               codeName: 'CVV',
               codeLength: 3,
               gaps: [4, 8, 12],
               lengths: [16],
               pattern: /^4\d*$/,
               icon: './img/source/brandCard/visa.svg'
            },
            {
               alias: 'master-card',
               name: 'MasterCard',
               codeName: 'CVC',
               codeLength: 3,
               gaps: [4, 8, 12],
               lengths: [16],
               pattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/,
               icon: './img/source/brandCard/master-card.svg'
            },
            {
               alias: 'american-express',
               name: 'American Express',
               codeName: 'CID',
               codeLength: 4,
               gaps: [4, 10],
               lengths: [15],
               pattern: /^3[47]\d*$/,
               icon: './img/source/brandCard/american-express.svg'
            },
            {
               alias: 'diners-club',
               name: 'Diners Club',
               codeName: 'CVV',
               codeLength: 3,
               gaps: [4, 10],
               lengths: [14],
               pattern: /^3(0[0-5]|[689])\d*$/,
               icon: './img/source/brandCard/diners-club.svg'
            },
            {
               alias: 'discover',
               name: 'Discover',
               codeName: 'CID',
               codeLength: 3,
               gaps: [4, 8, 12],
               lengths: [16, 19],
               pattern: /^(6011|65|64[4-9])\d*$/,
               icon: './img/source/brandCard/discover.svg'
            },
            {
               alias: 'jcb',
               name: 'JCB',
               codeName: 'CVV',
               codeLength: 3,
               gaps: [4, 8, 12],
               lengths: [16],
               pattern: /^(2131|1800|35)\d*$/,
               icon: './img/source/brandCard/jcb.svg'
            },
            {
               alias: 'unionpay',
               name: 'UnionPay',
               codeName: 'CVN',
               codeLength: 3,
               gaps: [4, 8, 12],
               lengths: [16, 17, 18, 19],
               pattern: /^62[0-5]\d*$/,
               icon: './img/source/brandCard/unionpay.svg'
            },
            {
               alias: 'maestro',
               name: 'Maestro',
               codeName: 'CVC',
               codeLength: 3,
               gaps: [4, 8, 12],
               lengths: [12, 13, 14, 15, 16, 17, 18, 19],
               pattern: /^(5[0678]|6304|6390|6054|6271|67)\d*$/,
               icon: './img/source/brandCard/maestro.svg'
            },
            {
               alias: 'mir',
               name: 'MIR',
               codeName: 'CVC',
               codeLength: 3,
               gaps: [4, 8, 12],
               lengths: [16],
               pattern: /^22\d*$/,
               icon: './img/source/brandCard/mir.svg'
            }
         ];
         this.prefixesDB = [
            { '539557': 'ua-alfa' },

            { '402889': 'ua-mono' },
            { '438383': 'ua-mono' },
            { '444036': 'ua-mono' },
            { '444037': 'ua-mono' },
            { '444038': 'ua-mono' },
            { '444039': 'ua-mono' },
            { '444040': 'ua-mono' },
            { '444041': 'ua-mono' },
            { '444042': 'ua-mono' },
            { '444411': 'ua-mono' },
            { '472931': 'ua-mono' },
            { '472932': 'ua-mono' },
            { '521398': 'ua-mono' },
            { '537541': 'ua-mono' },
            { '537571': 'ua-mono' },
            { '538808': 'ua-mono' },

            { '413051': 'ua-privat' },
            { '414939': 'ua-privat' },
            { '414960': 'ua-privat' },
            { '414962': 'ua-privat' },
            { '417649': 'ua-privat' },
            { '423396': 'ua-privat' },
            { '424600': 'ua-privat' },
            { '424657': 'ua-privat' },
            { '432575': 'ua-privat' },
            { '434156': 'ua-privat' },
            { '440509': 'ua-privat' },
            { '440535': 'ua-privat' },
            { '440588': 'ua-privat' },
            { '458121': 'ua-privat' },
            { '462705': 'ua-privat' },
            { '462708': 'ua-privat' },
            { '473117': 'ua-privat' },
            { '473118': 'ua-privat' },
            { '473121': 'ua-privat' },
            { '476339': 'ua-privat' },
            { '516874': 'ua-privat' },
            { '516875': 'ua-privat' },

            { '432338': 'ua-abank' },
            { '516915': 'ua-abank' },
            { '537523': 'ua-abank' },

            { '535466': 'ua-sportbank' },

            { '428651': 'ua-megabank' },
            { '445583': 'ua-megabank' },
            { '445584': 'ua-megabank' },
            { '445585': 'ua-megabank' },

            { '401856': 'ua-pumb' },
            { '403021': 'ua-pumb' },
            { '404170': 'ua-pumb' },
            { '406659': 'ua-pumb' },
            { '406660': 'ua-pumb' },
            { '412717': 'ua-pumb' },
            { '416926': 'ua-pumb' },
            { '419313': 'ua-pumb' },
            { '419314': 'ua-pumb' },
            { '419315': 'ua-pumb' },
            { '419316': 'ua-pumb' },
            { '428337': 'ua-pumb' },
            { '431403': 'ua-pumb' },
            { '431414': 'ua-pumb' },
            { '431435': 'ua-pumb' },
            { '431436': 'ua-pumb' },
            { '431437': 'ua-pumb' },
            { '482415': 'ua-pumb' },
            { '486819': 'ua-pumb' },
            { '486820': 'ua-pumb' },
            { '487424': 'ua-pumb' },
            { '511782': 'ua-pumb' },
            { '516089': 'ua-pumb' },
            { '516807': 'ua-pumb' },
            { '516864': 'ua-pumb' },
            { '516865': 'ua-pumb' },
            { '516866': 'ua-pumb' },
            { '521762': 'ua-pumb' },
            { '535862': 'ua-pumb' },
            { '537478': 'ua-pumb' },
            { '538178': 'ua-pumb' },
            { '542435': 'ua-pumb' },
            { '544044': 'ua-pumb' },

            { '407360': 'ua-ukrsib' },
            { '407361': 'ua-ukrsib' },
            { '407362': 'ua-ukrsib' },
            { '407363': 'ua-ukrsib' },
            { '407364': 'ua-ukrsib' },
            { '407365': 'ua-ukrsib' },
            { '407366': 'ua-ukrsib' },
            { '417232': 'ua-ukrsib' },
            { '407367': 'ua-ukrsib' },
            { '407368': 'ua-ukrsib' },
            { '427830': 'ua-ukrsib' },
         ];

         this.number = false;
         this.getBank = false;
         this.prefix = false;
         this.getBrand = false;


         this.init();
         this.events();

      }
   }
   init() {
      return this.defaultCard = {
         'logo': `<img src='${this.$logoImg.src}' alt='logo-bank'>`,
         'payBrand': `<img src='${this.$payImg.src}' alt='brand-bank'>`,
         'backgroundFront': window.getComputedStyle(this.$cardFront).getPropertyValue('background-color'),
         'backgroundBack': window.getComputedStyle(this.$cardBack).getPropertyValue('background-color'),

      }
   }

   events() {
      this.$inputNumber.addEventListener('input', (e) => {
         this._getValues(e);
      });
      this.$inputMonth.addEventListener('input', (e) => {
         this._checkInputMonth(e);
      });
      this.$inputYear.addEventListener('input', (e) => {
         this._checkInputYear(e);
      });
      this.$cvvInput.addEventListener('input', (e) => {
         this._checkCVV(e);
         // this._checkValidField(this.$cardReqField);
         this.options.isChanged(this);
      });
      this.$inputNumber.addEventListener('blur', (e) => {
         this._checkNumberCard(this.getBrand, this.number);
         // this._checkValidField(this.$cardReqField);
         this.options.isChanged(this);
      });
      this.$inputMonth.addEventListener('blur', (e) => {
         e.target.value = this._addZero(e.target.value);
         this._checkDate(this.$inputMonth, this.$inputYear);
         // this._checkValidField(this.$cardReqField);
         this.options.isChanged(this);
      });
      this.$inputYear.addEventListener('blur', (e) => {
         this._checkDate(this.$inputMonth, this.$inputYear);
         this.options.isChanged(this);
      });
   }

   _checkDate(month, year) {
      if (month.value && year.value) {
         const monthValue = +(month.value);
         const yearValue = +(year.value);
         const currentMonth = new Date().getMonth() + 1;
         const currentYear = +((new Date().getFullYear() + '').slice(-2));

         if ((monthValue < currentMonth && yearValue <= currentYear) || (yearValue > (+(String(currentYear).slice(-2)) + 3))) {
            this.$inputMonth.classList.add('_notvalid');
            this.$inputYear.classList.add('_notvalid');
            this.$inputMonth.classList.remove('_valid');
            this.$inputYear.classList.remove('_valid');
         } else {
            this.$inputMonth.classList.remove('_notvalid');
            this.$inputYear.classList.remove('_notvalid');
            this.$inputMonth.classList.add('_valid');
            this.$inputYear.classList.add('_valid');
         }

         //==================== Этот для тестов==================================д
         function mmonth() {
            return console.log(`monthValue < currentMonth ${monthValue < currentMonth}`);
         }

         function yyear() {
            return console.log(`yearValue <= currentYear ${yearValue <= currentYear}`);
         }
         function b() {
            let a = mmonth()
            let c = yyear()
            return (a === c);
         }
         console.log('b' + ' ' + b());
      }
   }
   //==================== Этот для проверок==================================д


   _checkInputMonth(e) {
      e.target.value = this._onlyNumber(e.target.value).substr(0, 2);
      if (e.target.value > 12 || e.target.value == 0) {
         e.target.value = '';
      }
   }

   _checkInputYear(e) {
      e.target.value = this._onlyNumber(e.target.value).substr(0, 2);
      const currentYear = new Date().getFullYear() + '';
      if (+e.target.value < +currentYear.slice(-2) || +e.target.value > (+(currentYear.slice(-2)) + 3)) {
         this.$inputYear.classList.add('_notvalid');
      } else {
         this.$inputYear.classList.remove('_notvalid');
      }
   }

   _addZero(number) {
      if (number.length > 0 && number < 10 && number.length < 2) {
         return number = '0' + number;
      }
      return number;
   }

   _getValues(e) {
      e.target.value = this._onlyNumber(e.target.value);
      this.getBrand = this._getBrand(e.target.value);
      this._getCVV(this.getBrand)
      this.prefix = this._getPrefix(e.target.value);
      const maxNumberLength = this._getMaxNumberLength(e.target.value)
      maxNumberLength ? e.target.value = maxNumberLength : '';
      e.target.value = this._renderSpaces(e.target.value);
      this.getBank = this._getBankObject(this._getBankName(this.prefix));
      this.number = e.target.value.replace(/\s/g, '');
      this._renderDataCard(this.getBank, this.number, this.getBrand);
   }

   _checkNumberCard(brand, number) {
      if (brand) {
         if (!number.length || !brand.lengths.includes(number.length)) {
            this.$inputNumber.classList.add('_notvalid');
            this.$inputNumber.classList.remove('_valid');
            this.$cvvInput.disabled = true;
            this.$inputMonth.disabled = true;
            this.$inputYear.disabled = true;
         } else {
            this.$inputNumber.classList.remove('_notvalid');
            this.$inputNumber.classList.add('_valid');
            this.$cvvInput.disabled = false;
            this.$inputMonth.disabled = false;
            this.$inputYear.disabled = false;
         }
      }
   }

   _checkCVV(e) {
      e.target.value = this._onlyNumber(e.target.value);
      const maxCvvLength = this._getCvvLength(e.target.value);
      const codeLength = this.getBrand.codeLength;

      if (maxCvvLength) {
         e.target.value = maxCvvLength;
         if (e.target.value.length > maxCvvLength) return;
         if (e.target.value.length < codeLength) {
            this.$cvvInput.classList.add('_notvalid');
            this.$cvvInput.classList.remove('_valid');
         } else {
            this.$cvvInput.classList.remove('_notvalid');
            this.$cvvInput.classList.add('_valid');
         }
      }
   }

   _renderDataCard(bankObject, number, brand) {
      if (bankObject && number.length > 5) {
         this._getLogo(bankObject);
         this._getBgBank(bankObject);
      } else {
         this.$logoWrapper.innerHTML = this.defaultCard.logo;

         if (window.getComputedStyle(this.$cardFront).getPropertyValue('background')) {
            this.$cardFront.style.removeProperty('background');
         }
         this.$cardFront.style.setProperty('background-color', `${this.defaultCard.backgroundFront}`)
      }

      if (brand) {
         this._getBrandImg(brand);
      } else {
         this.$payBrandWrapper.innerHTML = this.defaultCard.payBrand;
      }
   }

   _onlyNumber(number) {
      return number.replace(/\D/g, "");
   }

   _getBrand(number) {
      let brands = [];
      this.brandsDB.forEach(element => {
         if (element.pattern.test(number)) brands.push(element)
      });
      if (brands.length === 1) return brands[0]
   }

   _getPrefix(number) {
      if (number.length < 6) return undefined
      return number.substr(0, 6);
   }

   _getMaxNumberLength(number) {
      if (this.getBrand) {
         const maxNumberLength = this.getBrand.lengths[this.getBrand.lengths.length - 1];
         return number.substr(0, maxNumberLength);
      }
   }

   _getCvvLength(number) {
      if (this.getBrand) {
         const valueLength = this.getBrand.codeLength;
         if (valueLength) {
            return number.substr(0, valueLength);
         }
      }
   }

   _renderSpaces(number) {
      return number.replace(/(.{4})/g, "$1 ").trim();
   }

   _getBankName(prefix) {
      if (prefix) {
         const item = this.prefixesDB.find(item => item[prefix]);
         return item ? item[prefix] : '';
      }
   }

   _getBankObject(name) {
      if (!name) return;
      const itemBank = this.banksDB.find(item => item[name]);
      return itemBank[name];
   }

   _getLogo(object) {
      if (!object) return;
      this.$logoWrapper.innerHTML = `<img src='${object.logoPath}' alt='logo-bank' > `;
   }

   _getBrandImg(brand) {
      if (!brand) return;
      this.$payBrandWrapper.innerHTML = `<img src='${brand.icon}' alt='brand' > `;
   }

   _getBgBank({ backgroundPath, backgroundColor }) {
      if (backgroundPath) {
         this.$cardFront.style.setProperty('background', `url("${backgroundPath}")`);
         this.$cardFront.style.setProperty('background-size', 'cover');
         this.$cardFront.style.setProperty('background-repeat', 'no-repeat');
      } else {
         this.$cardFront.style.setProperty('background-color', `${backgroundColor}`)
      }
   }

   _getCVV(brand) {
      if (brand) {
         this.$cvvInput.setAttribute('placeholder', brand.codeName);
      } else {
         this.$cvvInput.removeAttribute('placeholder');
      }
   }
}
