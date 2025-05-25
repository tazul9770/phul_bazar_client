import React from 'react';
import { useState } from 'react';

const Skills = () => {

    const [skills, setSkills] = useState(["java", "python", "react"])

    const handleSkills = () => {
        // remove
        //const newSkills = skills.filter(item => item != "java")

        //update
        const newSkills = skills.map(item => item == "java" ? item = "c++":item)
        setSkills(newSkills)
    }

    return (
        <div>
            <ul className='m-5 list-disc'>
                {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>
            <button onClick={handleSkills}>add skill</button>
        </div>
    );
};

export default Skills;