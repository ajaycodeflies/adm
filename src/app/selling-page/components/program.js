import Image from "next/image";

function Program() {
  return (
    <>
      <div className="info-container">
        <h3>
          Your readiness: <span>83%</span>
        </h3>
        <div className="info-box">
          <p>
            <span>4-week</span> program is enough for you to start your AI
            journey
          </p>
          <Image
            src="/images/users/bulb.png"
            width={32}
            height={40}
            alt="img"
          />
        </div>
      </div>
      <div className="bg-light-blue">
        <h2>AI is easier than you think</h2>
        <div className="photo-block">
          <Image
            src="/images/users/migrated_d2vm05b1botqyl_images_p15_v3_hrg_nt_age-picker_male_18-24.webp"
            width={150}
            height={210}
            alt="img"
          />
          <div></div>
          <Image
            src="/images/users/migrated_d14fbcf1p6wyzn_funnel-images_c13_v3_adigp_nt_selling-page_daily-challenge_1.webp"
            width={150}
            height={210}
            alt="img"
          />
        </div>
        <ul className="points-block">
          <li>
            <Image
              src="/images/users/investingcondition_emoji-13.webp"
              width={32}
              height={40}
              alt="img"
            />{" "}
            No prior AI knowledge is required
          </li>
          <li>
            <Image
              src="/images/users/investingcondition_emoji-13.webp"
              width={32}
              height={40}
              alt="img"
            />{" "}
            No need for a university degree
          </li>
          <li>
            <Image
              src="/images/users/investingcondition_emoji-13.webp"
              width={32}
              height={40}
              alt="img"
            />{" "}
            Work at your own pace and terms
          </li>
        </ul>
      </div>
    </>
  );
}

export default Program;
