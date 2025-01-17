import Image from "next/image";

function SellingFirst() {
  return (
    <div className="selling-first">
      <div className="now-goal">
        <div>Now</div>
        <hr />
        <div>Goal</div>
      </div>
      <div
        className="image-blocks"
        style={{
          background: "url('/images/users/page_now-goal_background.webp')",
          backgroundSize: "cover",
        }}
      >
        <Image
          src="/images/users/migrated_d2vm05b1botqyl_images_c13_v3_adigp_nt_v2_selling-page_now-goal_male_18-24_1.webp"
          className="image"
          width={183}
          height={225}
          alt="img"
        />
        <Image
          src="/images/users/migrated_d2vm05b1botqyl_images_c13_v3_adigp_nt_v2_selling-page_now-goal_male_18-24_2.webp"
          className="image"
          width={183}
          height={225}
          alt="img"
        />
      </div>
      <div className="ai-skills">
        <div className="ai-skill-left-block">
          <p>AI Skills</p>
          <Image
            src="/images/users/migrated_d2vm05b1botqyl_images_wealth-growth-funnel_selling-page_skills-now.webp"
            className="image mb-3"
            width={159}
            height={67}
            alt="img"
          />
          <p>Income Potential</p>
          <Image
            src="/images/users/migrated_d2vm05b1botqyl_images_wealth-growth-funnel_selling-page_power-now.svg"
            className="image"
            width={159}
            height={28}
            alt="img"
          />
          <p>Limited</p>
        </div>
        <hr />
        <div className="ai-skill-right-block">
          <p>AI Skills</p>
          <Image
            src="/images/users/migrated_d2vm05b1botqyl_images_wealth-growth-funnel_selling-page_skills-goal.webp"
            className="image mb-3"
            width={159}
            height={67}
            alt="img"
          />
          <p>Income Potential</p>
          <Image
            src="/images/users/migrated_d2vm05b1botqyl_images_wealth-growth-funnel_selling-page_power-goal.svg"
            className="image"
            width={159}
            height={28}
            alt="img"
          />
          <p>High</p>
        </div>
      </div>
    </div>
  );
}

export default SellingFirst;
