import React from 'react';

export default function Age_info() {
  return (
    <div>
      <section className="text-gray-600 body-font" style={{backgroundColor:"#99FFFF"}}>
        <div className="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
        <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Top NGOs working for disaster management in India</h1>
      </div>
          <div className="row flex flex-wrap -m-4">
            <div className="w-25 p-4" style={{backgroundColor:"white"}}>
              <div className="bg-gray-100 p-6 w-100 rounded-lg">
                <img
                  className="w-75 rounded object-cover object-center mb-6"
                  src="../rr.png"
                  alt="content"
                />
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Rapid Response
                </h2>
                <p className="leading-relaxed text-base">
                  Rapid Response, India’s top and award-winning organisation,
                  offers disaster response and preparedness services all
                  throughout India. As a disaster relief organisation, they
                  provide food, education, healthcare, livelihood, and housing
                  programmes to help people survive and restore their lives.
                </p>
              </div>
            </div>
            <div className="w-25 p-4" style={{backgroundColor:"white"}}>
              <div className="bg-gray-100 p-6 w-100 rounded-lg">
                <img
                  className="w-75 rounded object-cover object-center mb-6"
                  src="../sakal.png"
                  alt="content"
                />
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Sakal Relief Fund
                </h2>
                <p className="leading-relaxed text-base">
                  An NGO that has gained much traction over the last decade.
                  The Sakal Relief fund is an initiative that was undertaken by
                  a local Maharashtrian newspaper to help and support the
                  underprivileged and unfortunate in this country and within
                  their own state.
                </p>
              </div>
            </div>
            <div className="w-25 p-4" style={{backgroundColor:"white"}}>
              <div className="bg-gray-100 p-6 w-100 rounded-lg">
                <img
                  className="w-75 rounded object-cover object-center mb-6"
                  src="../care.png"
                  alt="content"
                />
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Care India
                </h2>
                <p className="leading-relaxed text-base">
                  Care India is a non-profit organisation that helps communities
                  create capacity in order to empower women and girls who are
                  underprivileged or marginalized. Our long-term and
                  comprehensive interventions in Health, Livelihood, Education,
                  and Disaster Relief & Resilience offer creative answers to
                  long-standing development issues.
                </p>
              </div>
            </div>
            <div className="w-25 p-4" style={{backgroundColor:"white"}}>
              <div className="bg-gray-100 p-6 w-100 rounded-lg">
                <img
                  className="w-75 rounded object-cover object-center mb-6"
                  src="../smile.png"
                  alt="content"
                />
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Smile Foundation
                </h2>
                <p className="leading-relaxed text-base">
                  Every year, the monsoons wreak havoc on Assam. However, the
                  region is currently experiencing flooding and landslides as a
                  result of exceptionally heavy pre-monsoon rainfall. The Smile
                  Foundation has taken the initiative to offer dry meals,
                  hygiene and sanitation kits, and critical kits to individuals
                  in need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
