"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
export default function GenderSelector() {
  const router = useRouter();

  const handleGenderSelect = (gender) => {
    router.push(`/start-quiz?utm_gender=${gender}`);
  };

  const genders = [
    {
      img: "/images/picker_male_18-24.webp",
      label: "Male",
      value: "m",
    },
    {
      img: "/images/picker_female_18-24.webp",
      label: "Female",
      value: "f",
    },
    {
      img: "/images/7326558.png",
      label: "Prefer Not To Say",
      value: "other",
    },
  ];

  return (
    <div className="row justify-content-center mt-4">
      {genders.map((gender) => (
        <div
          className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3"
          key={gender.value}
        >
          <div className="card">
            <Image src="/images/picker_male_18-24.webp" alt="Male" className="card-img" width={100} height={100} />
            <div className="card-body">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                className="d-none"
              />
              <button
                className="btn btn-blue"
                // onClick={() => handleGenderSelect(gender.value)}
              >
                Male <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
