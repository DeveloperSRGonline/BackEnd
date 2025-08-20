import React from 'react'
import "../styles/Hero.css"

const Hero = () => {
    return (
        <div className="hero">
            <h1>I'm <span className='italic'>Shivam</span><span> <img src="/images/person.png" alt="" /> </span>     a fullstack <span><img src="/images/person.png" alt="" /></span><span className='italic'>Developer</span> based in Gondia <span><img src="/images/person.png" alt="" /></span></h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, iure ipsa. Eos illo totam, mollitia architecto iusto dignissimos dolor id quibusdam nobis quisquam autem sit ad enim delectus earum et!</p>
            <button>Let's Connect</button>
        </div>
    )
}

export default Hero