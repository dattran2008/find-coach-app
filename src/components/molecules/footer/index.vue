<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :xs="5" :lg="10">
        <div class="subscribe mb-5">
          <el-form action="#" class="subscribe-form">
            <div class="form-group d-flex">
              <input
                type="text"
                class="form-control rounded-left"
                placeholder="Enter email address"
              />
              <input
                type="submit"
                value="Subscribe"
                class="form-control submit px-3"
              />
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :md="8" :lg="10">
        <el-row>
          <el-col :md="12" :lg="8">
            <h2 class="footer-heading">
              <a href="#" class="logo">FindCoach.com</a>
            </h2>
            <p>
              Our service simply supply your needs with all the best coaches
            </p>
            <a href="#">
              read more
              <i class="el-icon-right"></i>
            </a>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="12" :lg="14">
        <el-row>
          <el-col :md="6" class="border-left">
            <h2 class="footer-heading">Discover</h2>
            <ul class="list-unstyled">
              <li><a href="#" class="py-1 d-block">Buy &amp; Sell</a></li>
              <li><a href="#" class="py-1 d-block">Merchant</a></li>
              <li><a href="#" class="py-1 d-block">Giving back</a></li>
              <li><a href="#" class="py-1 d-block">Help &amp; Support</a></li>
            </ul>
          </el-col>
          <el-col :md="6" class="border-left">
            <h2 class="footer-heading">About</h2>
            <ul class="list-unstyled">
              <li><a href="#" class="py-1 d-block">Staff</a></li>
              <li><a href="#" class="py-1 d-block">Team</a></li>
              <li><a href="#" class="py-1 d-block">Careers</a></li>
              <li><a href="#" class="py-1 d-block">Blog</a></li>
            </ul>
          </el-col>
          <el-col :md="6" class="border-left">
            <h2 class="footer-heading">Resources</h2>
            <ul class="list-unstyled">
              <li><a href="#" class="py-1 d-block">Security</a></li>
              <li><a href="#" class="py-1 d-block">Global</a></li>
              <li><a href="#" class="py-1 d-block">Charts</a></li>
              <li><a href="#" class="py-1 d-block">Privacy</a></li>
            </ul>
          </el-col>
          <el-col :md="6" class="border-left">
            <h2 class="footer-heading">Social</h2>
            <ul class="list-unstyled">
              <li><a href="#" class="py-1 d-block">Facebook</a></li>
              <li><a href="#" class="py-1 d-block">Twitter</a></li>
              <li><a href="#" class="py-1 d-block">Instagram</a></li>
              <li><a href="#" class="py-1 d-block">Googleplus</a></li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" class="partner-wrap mt-5">
      <el-col :md="24">
        <el-row style="align-items: center">
          <el-col :md="3">
            <h3 class="mb-0">Our Partner:</h3>
          </el-col>
          <el-col :md="18">
            <p class="partner-name mb-0">
              <a href="#">
                <span class="ion-logo-ionic mr-2"></span>
                Company 01
              </a>
              <a href="#">
                <span class="ion-logo-ionic mr-2"></span>
                Company 02
              </a>
              <a href="#">
                <span class="ion-logo-ionic mr-2"></span>
                Company 03
              </a>
              <a href="#">
                <span class="ion-logo-ionic mr-2"></span>
                Company 04
              </a>
              <a href="#">
                <span class="ion-logo-ionic mr-2"></span>
                Company 05
              </a>
              <a href="#">
                <span class="ion-logo-ionic mr-2"></span>
                Company 06
              </a>
            </p>
          </el-col>
          <el-col :md="3" style="text-align: right">
            <p class="mb-0">
              <a href="#" class="btn-custom">
                See All
                <i class="el-icon-right"></i>
              </a>
            </p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" :gutter="20" class="mt-5">
      <el-col :md="12" :lg="16">
        <p class="copyright">
          Copyright &copy;2021 All rights reserved | This website is made by
          @dattran2008
          <a href="#" target="_blank">Findcoach.com.vn</a>
        </p>
      </el-col>
      <el-col :md="12" :lg="8" style="text-align: right">
        <p class="mb-0 list-unstyled">
          <a class="mr-md-3" href="#">Terms</a>
          <a class="mr-md-3" href="#">Privacy</a>
          <a class="mr-md-3" href="#">Compliances</a>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background: #131719;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  .mr-md-3 {
    margin-right: 1rem;
  }

  .mt-5 {
    margin-top: 3rem;
  }

  .footer-heading {
    font-size: 19px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 20px;

    .logo {
      color: $white;
      text-transform: uppercase;
    }
  }

  a {
    color: $primary;
  }

  p {
    color: rgba(255, 255, 255, 0.3);
  }

  .copyright {
    color: rgba(255, 255, 255, 0.4);
    font-size: 14px;
  }

  .list-unstyled {
    li {
      a {
        color: rgba(255, 255, 255, 0.4);
        &:hover {
          color: $white;
        }
      }
    }

    a {
      text-decoration: none;
      color: rgba(255, 255, 255, 0.4);
      &:hover {
        color: $white;
      }
    }
  }

  .subscribe {
    margin-top: -105px;

    &.mb-5 {
      margin-bottom: 3rem;
    }

    .d-flex {
      display: flex;
    }
  }

  .subscribe-form {
    border-radius: 40px;
    background: $white;
    padding: 3px;
    -webkit-box-shadow: 0px -12px 21px -15px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px -12px 21px -15px rgba(0, 0, 0, 0.1);
    box-shadow: 0px -12px 21px -15px rgba(0, 0, 0, 0.1);
    .form-group {
      position: relative;
      margin-bottom: 0;
      border-radius: 0px;
      input {
        background: transparent !important;
        border: none !important;
        outline: none !important;
        color: rgba(0, 0, 0, 0.3) !important;
        font-size: 16px;
        height: 56px;
        border-radius: 0px;
        &::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: rgba(0, 0, 0, 0.3) !important;
        }
        &::-moz-placeholder {
          /* Firefox 19+ */
          color: rgba(0, 0, 0, 0.3) !important;
        }
        &:-ms-input-placeholder {
          /* IE 10+ */
          color: rgba(0, 0, 0, 0.3) !important;
        }
        &:-moz-placeholder {
          /* Firefox 18- */
          color: rgba(0, 0, 0, 0.3) !important;
        }
        &:focus {
          outline: none !important;
          box-shadow: none;
        }
      }
      .submit {
        color: $white !important;
        display: block;
        width: 150px;
        height: 56px;
        font-size: 14px;
        background: lighten($primary, 2%) !important;
        border: none;
        letter-spacing: 1px;
        text-transform: uppercase;
        border-radius: 40px;
        &:hover,
        &:focus {
          text-decoration: none !important;
          outline: none !important;
        }
      }
    }
  }

  .partner-wrap {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 1em 0;

    h3 {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
    }

    .partner-name {
      a {
        margin-right: 10px;
        font-size: 13px;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
        span {
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .btn-custom {
      font-size: 14px;
    }
  }

  .border-left {
    border-left: 1px solid #dee2e6;
    border-color: rgba(255, 255, 255, 0.05);
    // @include media-breakpoint-down(lg) {
    //   border: none;
    // }
  }
}
</style>
