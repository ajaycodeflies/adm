"use client";

import { useRouter } from 'next/navigation';

export default function GenderSelector() {
  const router = useRouter();

  const handleGenderSelect = (gender) => {
    router.push(`/start-quiz?utm_gender=${gender}`);
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-6 mb-4">
        <div className="card border-primary">
          <img
            src="/images/picker_male_18-24.webp"
            className="card-img-top"
            alt="Male"
          />
          <div className="card-body">
            <button
              className="btn btn-primary w-100"
              onClick={() => handleGenderSelect('m')}
            >
              MALE <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-6 mb-4">
        <div className="card border-primary">
          <img
            src="/images/picker_female_18-24.webp"
            className="card-img-top"
            alt="Female"
          />
          <div className="card-body">
            <button
              className="btn btn-primary w-100"
              onClick={() => handleGenderSelect('f')}
            >
              FEMALE <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
