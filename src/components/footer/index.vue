<template>
    <div class="footer">
        <div class="logo-container">
            <span class="logo">爱题网</span>
            <ul class="about">
                <li>我的文章</li>
                <li>联系我</li>
                <li>关于我</li>
            </ul>
        </div>
        <div class="qrCode">
            <span class="weChat"></span>
            <span class="tips">扫一扫&nbsp;加我微信</span>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'footer',
    data() {
        return {
            
        }
    }
}
</script>

<style scoped lang="scss">
    .footer {
        width: 100%;
        height: 298px;
        background: #3A3A3A;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .logo-container {
            .logo {
                font-size: 32px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #586AEA;
                line-height: 45px;
                margin-bottom: 69px;
            }
            display: flex;
            flex-direction: column;
            .about {
                display: flex;
                font-size: 14px;
                font-family: STHeitiSC-Medium, STHeitiSC;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 14px;
                li {
                    margin-right: 21px;
                    cursor: pointer;
                }
                
            }
        }

        .qrCode {
            display: flex;
            flex-direction: column;
            .weChat {
                width: 120px;
                height: 120px;
                background-image: url("../../image/code.jpg");
                background-size: 120px 120px;
                background-position: 2px 0;
            }
            .tips {
                font-size: 14px;
                font-family: STHeitiSC-Medium, STHeitiSC;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 20px;
                text-align: center;
            }
        }
        
    }
</style>