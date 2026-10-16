import React from 'react';

function PetCareCard({
    icon,
    title,
    description,
    tips
}) {

    return (

        <div className="card h-100 shadow-sm border-0">

            <div className="card-body p-4">

                <div
                    className="text-center mb-3"
                    style={{
                        fontSize: '50px'
                    }}
                >
                    {icon}
                </div>

                <h4 className="text-center mb-3">
                    {title}
                </h4>

                <p className="text-muted">
                    {description}
                </p>

                <h6 className="mt-4">
                    Important Tips
                </h6>

                <ul className="mt-3">

                    {tips.map(
                        (tip, index) => (

                            <li
                                key={index}
                                className="mb-2"
                            >
                                {tip}
                            </li>

                        )
                    )}

                </ul>

            </div>

        </div>
    );
}

export default PetCareCard;