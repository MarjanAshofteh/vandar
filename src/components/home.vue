<template>
  <div class="main-container">
    <div class="title">ثبت کسب و کار جدید</div>
    <div class="tabs">
      <md-tabs class="md-transparent" md-alignment="fixed" md-active-tab="tab-pages">
        <md-tab id="tab-home" md-label="نوع کسب‌و‌کار"></md-tab>
        <md-tab id="tab-pages" md-label="اطلاعات کسب‌و‌کار"></md-tab>
        <md-tab id="tab-posts" md-label="بارگزاری"></md-tab>
      </md-tabs>
    </div>
    <form novalidate class="form" @submit.prevent="validateUser">

      <md-field :class="getValidationClass('Name')" class="big" md-inline required>
        <span class="label">نام حقوقی</span>
        <md-input
          name="name"
          placeholder="نامی که در روزنامه رسمی شما آمده است"
          id="name"
          v-model="form.Name"
          :disabled="sending" required/>
        <i>i</i>
        <span class="md-error" v-if="!$v.form.Name.required">نام حقوقی ضروری است</span>
      </md-field>

      <md-field :class="getValidationClass('BrandName')" md-inline required>
        <span class="label">نام برند</span>
        <md-input
          name="brandName"
          placeholder="نام کوتاه و اختصاری"
          id="brand-name"
          v-model="form.BrandName"
          :disabled="sending" required/>
        <i>i</i>
        <span class="md-error" v-if="!$v.form.BrandName.required">نام برند اجباری می باشد</span>
      </md-field>

      <md-field :class="getValidationClass('eBrandName')" md-inline required>
        <span class="label">نام انگلیسی برند</span>
        <md-input
          name="eBrandName"
          placeholder="مثل Vandar"
          id="e-brand-name"
          v-model="form.eBrandName"
          :disabled="sending" required/>
        <i>i</i>
        <span class="md-error" v-if="!$v.form.eBrandName.required">نام انگلیسی برند اجباری می باشد</span>
      </md-field>

      <md-field :class="getValidationClass('NationalCode')" md-inline required>
        <span class="label">شناسه ملی</span>
        <md-input
          name="NationalCode"
          placeholder="نام کوتاه و اختصاری"
          id="NationalCode"
          v-model="form.NationalCode"
          :disabled="sending" required/>

        <span class="md-error" v-if="!$v.form.NationalCode.required">شناسه ملی اجباری می باشد</span>
        <span class="md-error" v-else-if="!$v.form.NationalCode.minLength">شناسه ملی باید حداقل 10 باشد</span>
        <span class="md-error" v-else-if="!$v.form.NationalCode.NationalCodeValidator">شناسه ملی درست نیست</span>
      </md-field>

      <md-field :class="getValidationClass('Shaba')" md-inline required>
        <span class="label">شماره شبا</span>
        <md-input
          name="Shaba"
          placeholder=""
          id="Shaba"
          v-model="form.Shaba"
          :disabled="sending" required/>

        <span class="md-error" v-if="!$v.form.Shaba.required">شماره شبا اجباری می باشد</span>
      </md-field>

      <md-field :class="getValidationClass('Category')" class="big" md-inline required>
        <span class="label">حوزه فعالیت</span>
        <md-input
          name="Category"
          placeholder=""
          id="Category"
          v-model="form.Category"
          :disabled="sending" required/>

        <span class="md-error" v-if="!$v.form.Category.required">حوزه فعالیت اجباری می باشد</span>
      </md-field>

      <md-field :class="getValidationClass('ostan')" class="select-list" md-inline required>
        <span class="label">استان</span>
        <label>انتخاب کنید</label>
        <md-select
          v-model="form.ostan"
          name="city"
          id="city"
          :md-selected="clearOstan()">

          <md-option
            v-for="{name} in country"
            :value="name">
            {{name}}
          </md-option>
        </md-select>
      </md-field>

      <md-field :class="getValidationClass('city')" class="select-list" md-inline required>
        <span class="label">شهر</span>
        <label>انتخاب کنید</label>
        <md-select
          v-model="form.city"
          name="city"
          id="city">
          <md-option
            v-for="{name} in cities[0].Cities"
            :value="name">
            {{name}}
          </md-option>
        </md-select>
      </md-field>

      <md-field :class="getValidationClass('Address')" class="big" md-inline required>
        <span class="label">آدرس</span>
        <md-input
          name="Address"
          placeholder=""
          id="Address"
          v-model="form.Address"
          :disabled="sending" required/>

        <span class="md-error" v-if="!$v.form.Address.required">آدرس اجباری می باشد</span>
      </md-field>

      <md-field :class="getValidationClass('zipCode')" md-inline required>
        <span class="label">کد پستی</span>
        <md-input
          name="zipCode"
          placeholder=""
          id="zipCode"
          v-model="form.zipCode"
          :disabled="sending" required/>
        <span class="md-error" v-if="!$v.form.zipCode.required">کد پستی اجباری می باشد</span>
      </md-field>

      <md-field :class="getValidationClass('Phone')" md-inline required>
        <span class="label">تلفن ثابت</span>
        <md-input
          name="Phone"
          placeholder="مثل: 22886644"
          id="Phone"
          v-model="form.Phone"
          :disabled="sending" required/>

        <span class="md-error" v-if="!$v.form.Phone.required">تلفن اجباری می باشد</span>
      </md-field>

      <div class="bottom">
        <md-button type="submit" class="md-primary" :disabled="sending">مرحله بعد</md-button>
        <div class="left">
          <a href="">انصراف</a>
          <span class="devider"></span>
          <a href="">مرحله قبل</a>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
  import {NationalCodeValidator} from '@/validator/NationalCodeValidator'
  import provience from '@/assets/Province.json'

  export default {
  name: 'home',
  mixins: [validationMixin],
  data () {
    return {
      form: {
        Name: null,
        BrandName: null,
        eBrandName: null,
        NationalCode: null,
        Shaba: 'IR430550011480005587452001',
        activity: null,
        ostan: null,
        city:null,
        Address:null,
        zipCode:null,
        Phone:null,
        Category:null
      },
      country:provience,
      sending:false
    }
  },
  computed:{
      cities : function(){
        return this.form.ostan != null ? this.country.filter(item => item.name == this.form.ostan) : [{Cities:{}}]
      }
    },
  validations: {
    form: {
      Name: {
        required,
      },
      BrandName: {
        required,
      },
      eBrandName: {
        required,
      },
      NationalCode: {
        required,
        minLength: minLength(10),
        NationalCodeValidator
      },
      Shaba: {
        required,
        minLength: minLength(26)
      },
      zipCode: {
        required
      },
      Address: {
        required
      },
      Phone: {
        required
      },
      Category: {
        required
      },
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    saveUser() {
      this.sending = true
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.sending = false
      }, 1500)
    },
    validateUser() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveUser()
      }
    },
    clearOstan(){
      this.form.city = null
    },
  }
}
</script>

<style lang="less">
  .main-container{
    display: flex;
    max-width: 620px;
    justify-content: center;
    min-height: calc( 100vh - 50px );
    margin: auto;
    flex-direction: column;
    padding: 80px 20px 0 20px;
    .title{
      font-size: 20px;
      text-align: right;
      margin: 0 0 20px 0;
      font-weight: bold;
    }
    .tabs{
      height: 60px;
      button.md-button{
        height: 40px;
        border-radius: 0;
        &:last-of-type{
          border-radius: 0 4px 4px 0;
        }
        &:last-of-type{
          border-radius: 4px 0 0 4px;
        }
        &.md-theme-default.md-active {
          background-color: #A14e69;
          z-index: 1;
        }
      }
    }
    .form{
      background-color: white;
      border-radius: 4px;
      box-shadow: 0px 10px 15px #0000000d;
      min-height:720px;
      margin:10px 0 72px 0;
      padding: 40px;
    }
  }
  .md-tabs-navigation {
    align-items: center;
  }
  .tabs{
    button.md-button{
      height: 30px;
      margin: 10px 0;
      border-radius: 4px;
      background-color: #BBBBBB;
      color: white;
    }
    button.md-button.md-theme-default.md-active {
      background-color: #A14e69;
      height: 60px;
      margin: 0;
      border-radius: 8px;
      box-shadow: 0px 0px 10px #00000029;
    }
  }
  .md-field {
    display: flex;
    align-items: center;
    margin: 0 0 10px auto;
    padding: 0;
    &:not(.big) input.md-input{
      width: 220px !important;
      flex: inherit;
    }

    input.md-input {
      border: 1px solid #eee;
      height: 40px;
      padding: 11px 15px 10px 0;
      border-radius: 4px;
      font-size: 12px !important;
    }
    label {
      font-size: 12px;
    }
  }
  i {
    text-decoration: none;
    font-style: initial;
    border: 1px solid;
    height: 16px;
    width: 16px;
    line-height: 16px;
    border-radius: 50%;
    color: #BBBBBB;
    font-size: 12px;
    margin-right: 10px;
    font-weight: bold;
  }
  span.label{
    width: 94px;
    font-size: 12px;
    text-align: right;
    &:after {
      content: "*";
      color: #F44336;
    }
  }
  ::placeholder {
    color: #e1e1e1;
    font-size: 12px !important;
  }
  span.md-error,
  .error{
    color: red;
    font-size: 9px !important;
    position: absolute;
    right: 95px;
    top: 41px;
    text-align: right;
  }
  .md-menu.md-select {
    flex: inherit;
    &:not(.md-disabled) .md-icon {
      border: none;
      margin-right: -24px;
    }
  }
  .md-menu-content.md-select-menu {
    background: #fff;
    min-height: 250px;
    border-radius: 4px;
    ul.md-list {
      padding: 0;
    }
    .md-list-item-content:hover {
      background: #f5f5f5;
    }
    .md-list-item-text {
      font-family: irans;
      font-weight: normal !important;
      font-size: 12px;
    }
  }
  .bottom {
    border-top: 1px solid #f5f5f5;
    margin-top: 30px;
    display: flex;
    padding: 30px 0 0;
    justify-content: space-between;

    .md-button {
      height: 40px;
      margin: 0;
      padding: 10px 42px;
      background: #4C9F87;
      color: #fff;
      border-radius: 50px;
      font-size: 12px;
    }
    .left {
      display: flex;
      align-items: center;
      font-size: 12px;
      span.devider {
        width: 2px;
        margin: 0 15px;
        height: 10px;
        background: #666666;
      }
      a {
        color: #666;
        text-decoration: none !important;
      }
    }
  }
  .select-list label {
    right: 95px;
    top: 5px;
    width: 220px;
    text-align: right;
    padding: 10px 15px;
  }
  @media (max-width:479px) {
    .main-container {
      padding-top: 30px;
      .form{
        padding: 20px;
      }
    }
    .tabs button.md-button {
      font-size: 12px;
    }
    span.label {
      display: block;
      width: 100%;
      margin-bottom: 10px;
    }
    i{
      margin-right: 9px;
    }
    .md-field {
      flex-wrap: wrap;
      margin-bottom: 20px;
      &:not(.big) input.md-input,
      input.md-input{
        max-width:316px;
        min-width: 255px;
        width: calc(100% - 26px) !important;
      }
    }
    .bottom{
      .md-button {
        padding: 11px 36px;
      }
      .left{
        font-size: 10px;
      }
    }
    .select-list label {
      right: 0;
      top: 30px;
    }
  }
</style>

