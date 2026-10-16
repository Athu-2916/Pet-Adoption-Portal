import React from 'react';

import BackButton
    from '../components/BackButton';

import PetCareCard
    from '../components/PetCareCard';


function PetCare() {

    const careData = [

        {
            icon: '🍖',

            title: 'Feeding',

            description:
                'Provide your pet with a balanced and nutritious diet suitable for its age, breed and health condition.',

            tips: [

                'Give fresh food and clean drinking water.',

                'Feed pets according to their age and size.',

                'Avoid chocolate, onions and other harmful foods.',

                'Do not overfeed your pet.'

            ]
        },


        {
            icon: '🛁',

            title: 'Grooming',

            description:
                'Regular grooming keeps your pet clean, comfortable and healthy.',

            tips: [

                'Brush your pet regularly.',

                'Keep nails trimmed.',

                'Clean ears carefully.',

                'Give baths when necessary.'

            ]
        },


        {
            icon: '🏃',

            title: 'Exercise',

            description:
                'Regular physical activity helps pets stay healthy and reduces stress and boredom.',

            tips: [

                'Take dogs for daily walks.',

                'Provide toys for indoor pets.',

                'Allow pets to play regularly.',

                'Adjust exercise according to age and health.'

            ]
        },


        {
            icon: '💉',

            title: 'Vaccination',

            description:
                'Vaccinations protect pets from several serious infectious diseases.',

            tips: [

                'Maintain a vaccination schedule.',

                'Consult a veterinarian for required vaccines.',

                'Keep vaccination records safely.',

                'Do not skip booster vaccinations.'

            ]
        },


        {
            icon: '❤️',

            title: 'Health & Hygiene',

            description:
                'Good hygiene and regular health checks can help detect problems early.',

            tips: [

                'Keep sleeping areas clean.',

                'Check your pet regularly.',

                'Watch for changes in eating habits.',

                'Contact a vet if unusual symptoms appear.'

            ]
        },


        {
            icon: '🏠',

            title: 'Safe Environment',

            description:
                'Create a safe and comfortable environment where your pet can rest and play.',

            tips: [

                'Keep harmful chemicals away.',

                'Provide a comfortable sleeping area.',

                'Keep electrical wires away from pets.',

                'Use a safe collar and identification tag.'

            ]
        }

    ];


    return (

        <div className="container mt-5 mb-5">

            <BackButton
                destination="/"
            />


            {/* HEADER */}

            <div className="text-center mb-5">

                <h1>
                    🐾 Pet Care
                </h1>

                <p className="text-muted mt-3">
                    Helpful information to keep your
                    pets healthy, happy and safe.
                </p>

            </div>


            {/* CARE CARDS */}

            <div className="row g-4">

                {careData.map(
                    (care, index) => (

                    <div
                        className="col-lg-4 col-md-6 col-12"
                        key={index}
                    >

                        <PetCareCard
                            icon={care.icon}
                            title={care.title}
                            description={
                                care.description
                            }
                            tips={care.tips}
                        />

                    </div>

                ))}

            </div>


            {/* VET SECTION */}

            <div
                className="card shadow border-0 mt-5"
            >

                <div className="card-body text-center p-5">

                    <h2>
                        🩺 Need Professional Help?
                    </h2>

                    <p className="text-muted mt-3">

                        If your pet is sick or requires
                        professional medical attention,
                        book an appointment with a
                        veterinarian.

                    </p>

                    <a
                        href="/vets"
                        className="btn btn-success mt-3"
                    >
                        Book a Vet Appointment
                    </a>

                </div>

            </div>

        </div>
    );
}

export default PetCare;