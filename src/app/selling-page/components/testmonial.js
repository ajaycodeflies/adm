import Image from "next/image";

function Testmonial() {
  return (
    <div className="testimonial-container">
      <h2>People love ADM Digital</h2>
      <div className="testimonial-single">
        <div className="name-block">
          <Image
            src="/images/users/user-review_staring-emoji-11.jpg"
            width={32}
            height={32}
            alt="img"
          />
          <p>@der_kennndy1</p>
        </div>
        <div className="box-item">
          <p>
            &quot; The learning is stratightforward and has all the necessary
            information! It serves as a great starting point if you are new to
            AI. &quot;
          </p>
          <Image
            src="/images/users/migrated_d2vm05b1botqyl_images_wealth-growth-funnel_selling-page_rating-icon.svg"
            width={120}
            height={30}
            alt="img"
          />
        </div>
      </div>
      <div className="testimonial-single">
        <div className="name-block">
          <Image
            src="/images/users/user-review_staring-emoji-11.jpg"
            width={32}
            height={32}
            alt="img"
          />
          <p>@dexter_brechtefeld</p>
        </div>
        <div className="box-item">
          <p>
            &quot; ADM Digital&#39;s wide range of educational materials and
            interactive features enables users of all levels to easily
            understand complicated AI principles. Kudos to ADM digital for
            pioneering a new approach to AI learning! &quot;
          </p>
          <Image
            src="/images/users/migrated_d2vm05b1botqyl_images_wealth-growth-funnel_selling-page_rating-icon.svg"
            width={120}
            height={30}
            alt="img"
          />
        </div>
      </div>
      <div className="testimonial-single">
        <div className="name-block">
          <Image
            src="/images/users/user-review_staring-emoji-11.jpg"
            width={32}
            height={32}
            alt="img"
          />
          <p>@pattykivuva</p>
        </div>
        <div className="box-item">
          <p>
            &quot; ADM Digital&#39;s has simplified understanding complex topics
            and enhancing my skills across subjects. The customized learning
            tailored to my needs has significantly boosted my progress towards
            achieving my goals. &quot;
          </p>
          <Image
            src="/images/users/migrated_d2vm05b1botqyl_images_wealth-growth-funnel_selling-page_rating-icon.svg"
            width={120}
            height={30}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default Testmonial;
