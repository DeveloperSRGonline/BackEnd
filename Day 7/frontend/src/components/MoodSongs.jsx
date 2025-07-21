import React, { useState, useRef } from 'react';
import './MoodSongs.css';

const MoodSongs = ({ Songs }) => {
    const [isPlaying, setIsPlaying] = useState(null);
    const [progress, setProgress] = useState(0);
    const audioRefs = useRef([]);

    const handlePlayPause = (index) => {
        const currentAudio = audioRefs.current[index];
        if (!currentAudio) return;

        if (isPlaying === index) {
            currentAudio.pause();
            setIsPlaying(null);
        } else {
            audioRefs.current.forEach((audio, i) => {
                if (audio && i !== index) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
            currentAudio.play();
            setIsPlaying(index);
        }
    };

    const handleTimeUpdate = (index) => {
        const currentAudio = audioRefs.current[index];
        if (!currentAudio) return;
        const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
        setProgress(percentage || 0);
    };

    const handleEnded = () => {
        setIsPlaying(null);
        setProgress(0);
    };

    const handleProgressClick = (e, index) => {
        const currentAudio = audioRefs.current[index];
        if (!currentAudio) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = clickX / width;
        currentAudio.currentTime = currentAudio.duration * percent;
    };

    return (
        <div className='mood-songs'>
            <h2>Recommended Songs</h2>
            {Songs.map((song, index) => (
                <div className='song-card' key={index}>
                    <div className='info'>
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                    </div>

                    <div className='player'>
                        <audio
                            ref={(el) => (audioRefs.current[index] = el)}
                            src={song.audio}
                            onTimeUpdate={() => handleTimeUpdate(index)}
                            onEnded={handleEnded}
                        />

                        <div className='controls'>
                            <button onClick={() => handlePlayPause(index)}>
                                {isPlaying === index ? (
                                    <i className="ri-pause-line"></i>
                                ) : (
                                    <i className="ri-play-circle-fill"></i>
                                )}
                            </button>
                            {isPlaying === index && (
                                <div
                                    className="progress-bar"
                                    onClick={(e) => handleProgressClick(e, index)}
                                >
                                    <div className="progress" style={{ width: `${progress}%` }}></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MoodSongs;
