import Heading from '@theme/Heading';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.css';

import 'swiper/css';

const FeatureList = [
  {
    title: 'GUIでGoogleシートを操作',
    imgSrc: 'img/torai_gui.jpg',
    description: (
      <>
        「Googleシートでセルを編集する」沢山の投稿があれば編集作業が大変です。でもGUIなら画像の設定もクリックだけ。今までの自動投稿ツールの全てが過去のものに。
      </>
    ),
  },
  {
    title: 'Googleシート、Googleドライブ、Apps Scriptをフル活用',
    imgSrc: 'img/torai_exp.jpg',
    description: (
      <>
        Googleシートがデータ保存、Googleドライブが画像保存、Apps
        Scriptが自動投稿を担当。全ての機能をフル活用して、あなたのアカウントを育てます。
      </>
    ),
  },
  {
    title: 'AIでキーワードからポストを自動作成',
    imgSrc: 'img/torai_ai.jpg',
    description: (
      <>
        「なにを投稿すればよいのか？・・・」もう、悩みません。AIがキーワードからポストを自動作成します。あなたのアカウントを育てるための最適な投稿をAIが提案します。
      </>
    ),
  },
  {
    title: 'スレッド投稿も予約できる',
    imgSrc: 'img/torai_thread.jpg',
    description: (
      <>
        スレッド投稿で過去の投稿にも予約で作成。スレッド投稿でポストのチカラを最大限に引き出します。埋もれた投稿もスレッドで再利用。過去の投稿を最大限に活用します。
      </>
    ),
  },
];

function Feature({ imgSrc, title, description }) {
  return (
    <div>
      <div className="text--center">
        <img className={styles.featureSvg} src={imgSrc} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p className={styles.featureBox}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            speed={800}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {FeatureList.map((props, idx) => (
              <SwiperSlide key={idx}>
                <Feature key={idx} {...props} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
