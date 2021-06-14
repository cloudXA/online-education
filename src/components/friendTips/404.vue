<template>
  <div>
    <div class="ErrorPage">
      <div class="ErrorPage-container">
        <div class="ErrorPage-text">
          <h1 class="ErrorPage-title">404</h1>
          <p class="ErrorPage-subtitle">你似乎来到了没有知识存在的荒原</p>
          <a
            class="Button Button--primary Button--blue ErrorPage-primaryButton"
            href="http://localhost:8080/#/homepage"
          >
            去往首页
          </a>
        </div>
        <div class="ErrorPage-errorImageContainer">
          <img
            class="ErrorPage-errorImage"
            width="200px"
            height="200px"
            src="/src/image/404.jpg"
            alt="page error"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notFound",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.Button {
  background: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  padding: 0;
  text-align: center;
}
.Button:focus {
  outline: none;
  transition: box-shadow 0.3s;
}
/* 暂时没有用 focus visiable */
.Button:focus {
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px rgba(0, 132, 255, 0.3);
}
html[data-theme="dark"] .Button:focus {
  box-shadow: 0 0 0 2px #1a1a1a, 0 0 0 4px rgba(58, 118, 208, 0.6);
}
.Button--primary {
  border: 1px solid;
  border-radius: 3px;
  line-height: 32px;
  padding: 0 16px;
}
.Button--primary.Button--blue {
  background-color: #0084ff;
  border-color: #0084ff;
  color: #fff;
}
html[data-theme="dark"] .Button--primary.Button--blue {
  background-color: #3a76d0;
  border-color: #3a76d0;
  color: #fff;
}
.Button--primary.Button--blue:hover {
  background-color: #0077e6;
  border-color: #0077e6;
}
html[data-theme="dark"] .Button--primary.Button--blue:hover {
  background-color: #2e69c2;
  border-color: #2e69c2;
}
.Button--plain.Button--blue {
  color: #0084ff;
}
html[data-theme="dark"] .Button--plain.Button--blue {
  color: #3a76d0;
}
.Button--plain.Button--blue:hover {
  color: #0077e6;
}
html[data-theme="dark"] .Button--plain.Button--blue:hover {
  color: #2e69c2;
}
</style>
<style>
body {
  /* cc(GBK99A) */
  background: #fff;
}
html[data-theme="dark"] body {
  background: #1a1a1a;
}
.ErrorPage-container {
  display: flex;
  justify-content: center;
  margin-top: 180px;
}
@media (max-width: 690px) {
  .ErrorPage-container {
    align-items: center;
    flex-direction: column-reverse;
    margin-top: 60px;
  }
}
.ErrorPage-title,
.ErrorPage-subtitle {
  /* cc(GBK04A) */
  color: #646464;
  line-height: 1.4;
}
html[data-theme="dark"] .ErrorPage-title,
html[data-theme="dark"] .ErrorPage-subtitle {
  color: #999;
}
.ErrorPage-title {
  font-size: 40px;
  /* @mixin bold; */
  font-synthesis: style;
  font-weight: 600;
}
html[data-ios] .ErrorPage-title {
  font-weight: 500;
}
html[data-android] .ErrorPage-title {
  font-weight: 700;
}
@media (max-width: 690px) {
  .ErrorPage-title {
    font-size: 30px;
  }
}
.ErrorPage-subtitle {
  font-size: 18px;
  margin-top: 10px;
}
.ErrorPage-text {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 384px;
}
@media (max-width: 690px) {
  .ErrorPage-text {
    align-items: center;
    min-width: auto;
  }
}
.ErrorPage-primaryButton {
  margin-top: 20px;
}
.ErrorPage-otherButtonContainer {
  align-items: center;
  /* cc(GBL01A) */
  color: #0084ff;
  display: flex;
  font-size: 14px;
  margin-top: 20px;
  /* @mixin bold; */
  font-synthesis: style;
  font-weight: 600;
}
html[data-theme="dark"] .ErrorPage-otherButtonContainer {
  color: #3a76d0;
}
html[data-ios] .ErrorPage-otherButtonContainer {
  font-weight: 500;
}
html[data-android] .ErrorPage-otherButtonContainer {
  font-weight: 700;
}
.ErrorPage-otherButton {
  align-items: center;
  display: flex;
  margin-left: 0.5em;
  /* @mixin bold; */
  font-synthesis: style;
  font-weight: 600;
}
html[data-ios] .ErrorPage-otherButton {
  font-weight: 500;
}
html[data-android] .ErrorPage-otherButton {
  font-weight: 700;
}
.ErrorPage-errorImageContainer {
  align-items: center;
  display: flex;
  height: 250px;
  justify-content: center;
  margin-left: 20px;
  width: 250px;
}
@media (max-width: 690px) {
  .ErrorPage-errorImageContainer {
    margin-left: 0;
  }
}
</style>
