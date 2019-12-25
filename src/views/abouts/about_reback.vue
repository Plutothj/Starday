<template>
  <div>
    <van-nav-bar :title="$t('supply.aboutreturn')" class="nav" left-arrow @click-left="onClickLeft" />
    <div class="main">
  
	<p style="margin-left:0cm;background:white;">
		<b>自販商品の返品・交換の条件<span></span></b>
	</p>
	<p style="margin-left:0cm;background:white;">
		▶お客様都合の返品・交換
	</p>
	<p style="background:white;">
		未開封・未使用のもので、商品ご到着後<span>30</span>日以内に予めメールで御連絡いただいたもののみお受けいたします。ご連絡前にお客様ご自身で返送の手配を行われた場合はご対応いたしかねます。ご連絡なしで着払い等でご返送された商品の送料は、返金額より差し引いて対応することがありますので、あらかじめご了承ください。商品が到着後<span>30</span>日以内に返品・交換を完了してください。<span><br />
</span>※当社倉庫と事務所は別の住所となりますので、返品・交換をご希望の方は必ず一度ご連絡下さい。<span>&nbsp;</span>
	</p>
	<p style="background:white;">
		次の場合は、返品・交換がお受けできません。
	</p>
	<p style="background:white;">
		※いずれの場合も、不良品を除きます。
	</p>
	<p style="background:white;">
		×一度ご使用またはご着用になられた商品
	</p>
	<p style="background:white;">
		×お客様の元で、キズまたは汚損が生じた商品
	</p>
	<p style="background:white;">
		×名入れ、オーダー商品および受注生産品
	</p>
	<p style="background:white;">
		×パッケージの破損、紛失やラベルのはずされた商品
	</p>
	<p style="background:white;">
		×組み立て途中あるいは組み立て後の商品
	</p>
	<p style="background:white;">
		×下着・水着等・化粧品等の衛生商品、福袋・福箱・セール商品（中古商品でのセールも含みます。）・アウトレット商品・予約商品である場合
	</p>
	<p style="background:white;">
		×メーカー既成の外装に直接出荷伝票が貼られているという理由の返品
	</p>
	<p style="background:white;">
		下記のケースでは、お客様都合による返品・交換を承りません。
	</p>
	<p style="background:white;">
		×使用済みまたは開封済みの消耗品
	</p>
	<p style="background:white;">
		×メーカーが初期不良と認定していない場合（液晶パネルのズレ、ドット抜け、使用後の外観の傷など）
	</p>
	<p style="background:white;">
		×拡張機器の増設や、パーツの取り替え、商品自体を改造、調整した商品
	</p>
	<p style="background:white;">
		×お客様のご要請でメーカーから鑑定書・鑑別書の発行を受けている商品
	</p>
	<p style="background:white;">
		×その他、商品詳細ページに返品できない旨の記載がある商品
	</p>
	<p style="margin-left:0cm;background:white;">
		▶商品の初期不良や破損について
	</p>
	<p style="background:white;">
		商品に瑕疵があった場合には、商品ご到着後<span>30</span>日以内に速やかにメールで弊社までご連絡ください。不良品のご返送および商品の再送にかかる送料は、弊社が負担いたします。
	</p>
	<p style="background:white;">
		※商品不良がございましたら、不良箇所の写真をメールでお送りください。
	</p>
	<p style="margin-left:0cm;background:white;">
		▶返品・交換の送料
・手数料負担について<span></span>
	</p>
	<p style="background:white;">
		お客様都合による返品・交換の際、発生する送料・手数料につきましては、お客様のご負担になります。
	</p>
	<p style="margin-left:0cm;background:white;">
		▶返金について
	</p>
	<p style="background:white;">
		返品商品到着確認後<span>3</span>営業日以内にご指定口座にお振込いたしま す。<span> &nbsp;</span>いかなる場合でも売買成立後<span>30</span>日以内に返金をしなければなりません。
	</p>
	<h2 style="margin-left:0cm;background:white;">
		出品者商品の返品について
	</h2>
	<p style="margin-left:0cm;background:white;">
		▶ 返品の可否や返品条件を確認<span></span>
	</p>
	<p style="background:white;">
		商品が返品対象かどうか、出品者の返品条件を確認します。出品者が独自の返品条件を設定している場合もあります。出品者が独自の返品条件を設定している場合は、条件に従って出品者に返品の依頼をしてください。ご不明な点がある場合は、出品者に直接お問い合わせください。出品者との間で問題が解決しなかった場合は、<span>STARDAY</span>カスタマサービスまだお問い合わせください。<span><br />
STARDAY</span>カスタマサービス問い合わせ先：<span> csc-1@starday.shop<br />
</span>受付時間<span>&nbsp;</span>：<span>10:00</span>～<span>16:00</span>（土日祝を除く）<span>&nbsp;<br />
</span>※お問い合わせは上記の営業時間でお願い致します。
	</p>
	<p style="background:white;">
		<strong>▶出品者へ返品を依頼</strong>
	</p>
	<p style="background:white;">
		出品者に返品の依頼をします。注文履歴より、返品したい商品の横にある返品返金ボタンをクリックします。返品の理由や商品の状態などの詳細内容を入力し、出品者に返品リクエストを送ります。<span></span>
	</p>
	<p style="background:white;">
		<br />
	</p>
	<p style="background:white;">
		<strong>▶出品者が承諾</strong>
	</p>
	<p style="background:white;">
		出品者が内容を確認のうえ返品の可否を判断し、<span>E</span>メールにてご連絡いたします。
	</p>
	<p style="background:white;">
		返品を受け付けない場合でもご連絡をいたしますので、出品者の返答をお待ちください。出品者によっては土日および祝日の営業をしていない場合があり、返答までに時間がかかる場合がありますのであらかじめご了承ください。出品者が返品を受け付けると承諾した場合は、返送先住所や返送手順が記載されている返品用ラベルが発行されます。<span>2</span>営業日経過しても出品者から連絡がない場合は、直接出品者にご連絡いただくか、<span>STARDAY</span>まだお問い合わせください。
	</p>
	<p style="margin-left:0cm;background:white;">
		<strong>▶ 商品の返送</strong>
	</p>
	<p style="background:white;">
		商品は、お届けしたときの梱包状態のままで返送してください。メーカー既成の梱包で届いた商品を返品する場合は、箱を開封せずにお送りください。独自の返品条件を設定している出品者以外は、お客様都合の返品で使用済みまたは開封済みの場合、商品のカテゴリーにより商品代金の<span>50%</span>を返金または全額返金することができなくなります。また、商品に付属品や冊子がある場合は、必ず商品と一緒に返品してください。
	</p>
	<p style="margin-left:0cm;background:white;">
		<strong>▶返金について</strong>
	</p>
	<p style="background:white;">
		出品者が返送した商品を受け取り次第、出品者が返金処理をします。通常、返品商品到着確認後<span>3</span>営業日以内にご指定口座にお振込いたします。<span> &nbsp;</span>
	</p>
	<p style="background:white;">
		出品者の手元に在庫がないため商品を発送できない場合や、購入者が商品を返品した場合など、返金手続きが必要な際の責任は、出品者にあります。返金は、出品者への返品がなされてから<span>3</span>営業日以内に速やかに行わなければなりませんが、いかなる場合でも売買成立後<span>30</span>日以内に返金をしなければなりません。<span></span>
	</p>
	<p class="MsoNormal">
		<b></b>
	</p>
 
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {NavBar} from 'vant'
Vue.use(NavBar)
export default {
  name: "about_reback",
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  width: 400px;
  height: 44px;
  position: fixed;
  top: 0;
  .van-ellipsis {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
    margin-left: 60px;
  }
  .van-nav-bar__left i {
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.main {
  margin-top: 48px;
  padding: 15px;
  font-size: 16px;
}
</style>
